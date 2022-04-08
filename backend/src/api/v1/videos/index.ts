import express from 'express';

import protect from '../../../middleware/protect';

import { getRoot, postNew } from './endpoints';

const router = express.Router();

router.route('/:course/:videoId').get(protect(getRoot));
router.route('/new').post(protect(postNew));

export { router };
