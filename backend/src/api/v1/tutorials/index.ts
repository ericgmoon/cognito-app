import express from 'express';

import protect from '../../../middleware/protect';

import {
  deleteRoot, getQuery, getRoot, postNew, putBook, putUnbook,
} from './endpoints';

const router = express.Router();

router.route('/query').get(protect(getQuery));
router.route('/new').post(protect(postNew));
router.route('/:course/:startDatetimeIdentifier').get(protect(getRoot));
router.route('/:course/:startDatetimeIdentifier').delete(protect(deleteRoot));
router.route('/:course/:startDatetimeIdentifier/book').put(protect(putBook));
router.route('/:course/:startDatetimeIdentifier/unbook').put(protect(putUnbook));

export { router };
