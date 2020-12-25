# Alexa skill functions

## Development

### Add new RequestHandler

#### As a ASK-SDK request handler

```bash
$ yarn talky:g:handler NewHandler

$ yarn talky:g:handler NewHandlerWithJSX --ssml=tsx

$ yarn talky:g:handler NewHandlerNoTest --no-test
```

#### As a Tallyjs Router


```bash
$ yarn talky:g:router NewRoute

$ yarn talky:g:router NewRouteWithJSX --ssml=tsx

$ yarn talky:g:router NewRouteNoTest --no-test
```

### Unit test

```bash
$ yarn test

# Watch mode
$ yarn test:dev
```

### Build code

We have to build the project before deploy to AWS Lambda

```
$ yarn build
```

### Lambda entrypoint
By the default, the Lambda function information is in `<%= buildDir %>/index.js`.
And the handler name is `handler`.