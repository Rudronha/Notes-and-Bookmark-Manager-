import { Router } from 'express';
import {
  createNote, listNotes, getNote, updateNote, deleteNote
} from '../controllers/notesController.js';
import { noteCreate, noteIdParam, noteQuery } from '../validators/notesValidator.js';

const router = Router();

router.post('/', noteCreate, createNote);
router.get('/', noteQuery, listNotes);
router.get('/:id', noteIdParam, getNote);
router.put('/:id', [...noteIdParam, ...noteCreate], updateNote);
router.delete('/:id', noteIdParam, deleteNote);

export default router;
