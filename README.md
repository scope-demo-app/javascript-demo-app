[![Scope](https://app.scope.dev/api/badge/50bc7622-9b17-4cde-a936-bb4cdd02d522/default)](https://app.scope.dev/external/v1/inspect/f0a213f0-b550-4bb0-a651-c1d5b9eff041/50bc7622-9b17-4cde-a936-bb4cdd02d522/default)

# Javascript Demo App

Demo project for web application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for developing and testing purposes.

### Prerequisites

1. You’ll need to have Node 8.16.0 or Node 10.16.0 or later version.

### Installing

1. Clone repository

```bash
$ git clone git@github.com:scope-demo-app/javascript-demo-app.git
```

2. Access the repository folder

```bash
$ cd javascript-demo-app
```

3. Install dependencies

```bash
$ yarn
```

## Run locally

To run the web app locally:

```bash
$ yarn start
```

## Run tests

### Unit tests

To run unit tests:

```bash
$ yarn test:unit
```

### E2E tests

To run e2e tests you need to have the web app running in http://localhost:3000. When it is up and running simply run:

```bash
$ yarn test:e2e
```

## Report results to Scope

If you want to report your test results to Scope you need to run your tests with the `SCOPE_DSN` env variable. An option would be:

```bash
$ SCOPE_DSN=<your_namespace_dsn> yarn test:unit
```

or

```bash
$ SCOPE_DSN=<your_namespace_dsn> yarn test:e2e
```

### How to obtain SCOPE_DSN

Go to [Scope](https://app.scope.dev/) for more information about how to get your SCOPE_DSN.

## Reviewing the tests

After the tests run, you'll get a URL in the console with a direct link to the test results:

```bash
** Scope Test Report **
Access the detailed test report for this build at:
   https://app.scope.dev/external/v1/results/...
```

Alternatively, the `Scope for Mac` and `Scope for Windows` applications will also show recent runs. Clicking on these will take you directly to the test reports.

When reviewing the tests in Scope, filter by `demotest` in the search bar to find the most interesting tests. Other tests, particularly those tagged as `dummy` may not contain useful information.
