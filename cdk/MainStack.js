/**
 * Create a stack using CDK framework.
 */

const lambda = require('@aws-cdk/aws-lambda');
const sfn = require('@aws-cdk/aws-stepfunctions');
const cdk = require('@aws-cdk/core');
const tasks = require('@aws-cdk/aws-stepfunctions-tasks');

class MainStack extends cdk.Stack {
  constructor(app, id) {
    super(app, id);

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

    // tslint:disable-next-line:no-unused-expression
    new cdk.CfnOutput(this, 'StateMachineARN', { value: state.stateMachineArn });
  }
}

const cdkApp = new cdk.App();
// tslint:disable-next-line:no-unused-expression
new MainStack(cdkApp, 'scheduler');
cdkApp.synth();
