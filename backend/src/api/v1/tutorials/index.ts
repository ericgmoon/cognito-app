import express from 'express';

import {
  book, create, get, remove, root, unbook,
} from './endpoints';

const router = express.Router();

router.route('/').get(root);
router.route('/create').post(create);
router.route('/get').get(get);
router.route('/remove').delete(remove);
router.route('/book').put(book);
router.route('/unbook').put(unbook);

export { router };
