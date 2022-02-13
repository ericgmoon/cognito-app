import express from 'express';

import { getRoot } from './endpoints';

const router = express.Router();

router.route('/:staffId').get(getRoot);

export { router };
