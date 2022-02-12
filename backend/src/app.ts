import AWS from 'aws-sdk';
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
  console.log(`Server running on port ${port}...`);
});

export default app;
