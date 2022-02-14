import express from 'express';

import protect from '../../../middleware/protect';

import { getRoot } from './endpoints';

const router = express.Router();

router.route('/:staffId').get(protect(getRoot));

export { router };
