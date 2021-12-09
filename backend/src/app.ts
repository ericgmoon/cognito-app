import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Configure environment variables
dotenv.config();

// Declare a new express app
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all methods
app.use(cors({ credentials: true, origin: true }));

// Route
app.use('/v1/users', require('./api/v1/users').router);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

export default app;
