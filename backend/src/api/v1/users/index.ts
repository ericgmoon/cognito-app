import express from 'express';

import { getValidate } from './endpoints';

const router = express.Router();

router.route('/validate').get(getValidate);

export { router };
