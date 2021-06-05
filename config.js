module.exports = {
  rest: {
    port: +(process.env.PORT || 3000),
    host: process.env.HOST,
    // The `gracePeriodForClose` provides a graceful close for http/https
    // servers with keep-alive clients. The default value is `Infinity`
    // (don't force-close). If you want to immediately destroy all sockets
    // upon stop, set its value to `0`.
    // See https://www.npmjs.com/package/stoppable
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_URI,
    defaultHandlerError: parseInt(process.env.RABBITMQ_HANDLER_ERROR),
    exchanges: [{name: 'dlx.amq.topic', type: 'topic'}],
    queues: [
      {
        name: 'dlx.sync-videos',
        options: {
          deadLetterExchange: 'amq.topic',
          messageTtl: 20000,
        },
        exchange: {
          name: 'dlx.amq.topic',
          routingKey: 'model.*.*',
        },
      },
    ],
  },
  jwt: {
    secret:
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx1BwufOtYWIh54C1xoru4lyqfnoarACe9b9grnIASE+KKNHthXc1KU9b64DjneIakfdn/6DsCm85hsFdOCI1OnAgs1u/5ujKK5gHwNkcMYJMYGIh+lPxUTcP32D5cRQ0DricO5mVt0kgz2deSaoQqV4cq+ev0FakdCmXK4lW7+mGTAbD3X0w5FfJpD+uHV42sZJFJSJ5mPDaOO9rDvAzT7w1SHYqkwQbRlDnj/7Yw/dFOXuTo124rueu6+z1Xkh112zp+eVp+cpxDzZTL6JoZvHMYfCD7I38NYNLRefbdUoWWdllUkx0WYBerI9IrC+Y2yxGIUW6lC6ZDgXgm8qE+wIDAQAB\n-----END PUBLIC KEY-----',
  },
};
