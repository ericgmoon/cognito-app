export {};

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event: any, context: any) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
