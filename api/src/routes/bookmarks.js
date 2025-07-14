import { Router } from 'express';
import {
  createBookmark, listBookmarks, getBookmark, updateBookmark, deleteBookmark
} from '../controllers/bookmarksController.js';
import { bmCreate, bmIdParam, bmQuery } from '../validators/bookmarksValidator.js';

const router = Router();

router.post('/', bmCreate, createBookmark);
router.get('/', bmQuery, listBookmarks);
router.get('/:id', bmIdParam, getBookmark);
router.put('/:id', [...bmIdParam, ...bmCreate], updateBookmark);
router.delete('/:id', bmIdParam, deleteBookmark);

export default router;
