import express from 'express';

import { validate } from './endpoints';

const router = express.Router();

router.route('/validate').get(validate);

export { router };
