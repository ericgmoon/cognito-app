import express from 'express';

import { getRoot } from './endpoints';

const router = express.Router();

router.route('/:gradYear/:studentId').get(getRoot);

export { router };
