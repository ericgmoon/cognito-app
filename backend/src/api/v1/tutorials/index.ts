import express from 'express';

import {
  create, get, remove, root,
} from './endpoints';

const router = express.Router();

router.route('/').get(root);
router.route('/create').post(create);
router.route('/get').get(get);
router.route('/remove').delete(remove);

export { router };
