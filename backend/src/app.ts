import AWS from 'aws-sdk';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import addAuthContext from './middleware/addAuthContext';

// Configure environment variables
dotenv.config();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: process.env.AWS_REGION,
});

// Declare a new express app
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all methods
app.use(cors({ credentials: true, origin: true }));

// Enable json for all methods
app.use(express.json());

// Add auth context
app.use(addAuthContext);

// Route
app.use('/v1/users', require('./api/v1/users').router);
app.use('/v1/tutorials', require('./api/v1/tutorials').router);

app.listen(port, () => {
  console.log(chalk.green(`[server] Server running on port ${port}...`));

  const { SERVER_MODE } = process.env;
  if (SERVER_MODE === 'dev') {
    const { DEV_MODE_USER_ID } = process.env;
    const DEV_MODE_USER_GROUPS = process.env.DEV_MODE_USER_GROUPS?.split(',') || [];
    console.warn(chalk.red('[warning] Server is currently running in DEV mode'));
    console.log(chalk.blue('[info] Mocking authentication with the following credentials:\n'));
    console.log(chalk.blue(`${chalk.bold('\tUser ID: ')}${DEV_MODE_USER_ID}`));
    console.log(chalk.blue(`${chalk.bold('\tUser Groups: ')}${DEV_MODE_USER_GROUPS}\n`));
  }
});

export default app;
