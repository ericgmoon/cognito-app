export {};

// const AWS = require('aws-sdk');
// const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

// Declare a new express app
const app = express();
const port = process.env.PORT || 3000;

// Use AWS serverless middleware if being run remotely
dotenv.config();
// if (process.env.ENV === 'dev') {
//   AWS.config.update({
//     region: 'ap-southeast-2',
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   });
// } else {
//   console.log(
//     'Warning: You do not have ENV=dev, which is required for local execution!',
//   );
//   AWS.config.update({ region: 'ap-southeast-2' });
//   app.use(awsServerlessExpressMiddleware.eventContext());
// }

// Enable CORS for all methods
app.use(cors({ credentials: true, origin: true }));

// Route
// app.use('/v1/users', require('./api/v1/users').router);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
