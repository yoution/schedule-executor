# Schedule Executor

This module sets up the state machine and lambda functions to process events. This module is responsibile for actually executing the api calls registered with the [Schedule API](https://github.com/topcoder-platform/scheduler-api). The registration of the events has to be done through the API. This executor only runs the events after they have been registered.

## Development status

[![Total alerts](https://img.shields.io/lgtm/alerts/g/topcoder-platform/schedule-executor.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/topcoder-platform/schedule-executor/alerts/)[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/topcoder-platform/schedule-executor.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/topcoder-platform/schedule-executor/context:javascript)

### Deployment status

Dev: [![CircleCI](https://circleci.com/gh/topcoder-platform/schedule-executor/tree/develop.svg?style=svg)](https://circleci.com/gh/topcoder-platform/schedule-executor/tree/develop) Prod: [![CircleCI](https://circleci.com/gh/topcoder-platform/schedule-executor/tree/master.svg?style=svg)](https://circleci.com/gh/topcoder-platform/schedule-executor/tree/master)

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
