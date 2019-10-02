/**
 * Create a stack using CDK framework.
 */

const apigateway = require('@aws-cdk/aws-apigateway');
const lambda = require('@aws-cdk/aws-lambda');
const sfn = require('@aws-cdk/aws-stepfunctions');
const cdk = require('@aws-cdk/core');
const tasks = require('@aws-cdk/aws-stepfunctions-tasks');
const dynamodb = require('@aws-cdk/aws-dynamodb');

class MainStack extends cdk.Stack {
  constructor(app, id) {
    super(app, id);

    // dynamo table for historical records
    const table = new dynamodb.Table(this, 'Scheduler', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const lambdaCode = new lambda.AssetCode('dist');

    // lambda for processing after waiting
    const processLambda = new lambda.Function(this, `process-lambda`, {
      code: lambdaCode,
      handler: 'process-lambda.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 256,
    });

    // step function
    const waitX = new sfn.Wait(this, 'Wait for timestamp', {
      time: sfn.WaitTime.timestampPath('$.scheduleTime'),
    });

    const processTask = new sfn.Task(this, 'Process url', {
      task: new tasks.InvokeFunction(processLambda),
    });

    const definition = waitX.next(processTask);

    const state = new sfn.StateMachine(this, 'StateMachine', {
      definition,
    });

    // submit lambda connected with api gateway
    const submitLambda = new lambda.Function(this, `submit-lambda`, {
      code: lambdaCode,
      handler: 'submit-lambda.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        STATE_MACHINE_ARN: state.stateMachineArn,
        TABLE_NAME: table.tableName,
      },
    });
    table.grantReadWriteData(submitLambda);
    state.grantStartExecution(submitLambda);
    const api = new apigateway.RestApi(this, 'api', {
      restApiName: `api`,
    });

    const resource = api.root.addResource('schedule');

    const apiLambdaIntegration = new apigateway.LambdaIntegration(submitLambda);
    resource.addMethod('POST', apiLambdaIntegration);
  }
}

const app = new cdk.App();
new MainStack(app, 'scheduler');
app.synth();
