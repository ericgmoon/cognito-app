import express from 'express';

import {
  book, create, get, remove, root, unbook,
} from './endpoints';

const router = express.Router();

router.route('/query').get(root);
router.route('/new').post(create);
router.route('/:course/:startDatetimeIdentifier').get(get);
router.route('/:course/:startDatetimeIdentifier').delete(remove);
router.route('/:course/:startDatetimeIdentifier/book').put(book);
router.route('/:course/:startDatetimeIdentifier/unbook').put(unbook);

export { router };
