# Schedule Executor

This module setup the state machine and lambda functions to process events. This module is responsibile for actually executing the api calls registered with the [Schedule API](https://github.com/topcoder-platform/scheduler-api)

## Requirements

- node v10
- cdk:
  - `npm i -g aws-cdk`

## Deploy

```bash
yarn
yarn run build
cdk bootstrap
cdk deploy
```

## Lint

Run `yarn run lint`

## Destory instances

Run `cdk destroy` to clean up AWS resources.
