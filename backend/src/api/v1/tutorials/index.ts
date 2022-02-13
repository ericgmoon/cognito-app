import express from 'express';

import protect from '../../../middleware/protect';

import {
  deleteRoot, getQuery, getRoot, postNew, putBook, putUnbook,
} from './endpoints';

const router = express.Router();

router.route('/query').get(getQuery);
router.route('/new').post(postNew);
router.route('/:course/:startDatetimeIdentifier').get(protect(getRoot));
router.route('/:course/:startDatetimeIdentifier').delete(protect(deleteRoot));
router.route('/:course/:startDatetimeIdentifier/book').put(putBook);
router.route('/:course/:startDatetimeIdentifier/unbook').put(putUnbook);

export { router };
