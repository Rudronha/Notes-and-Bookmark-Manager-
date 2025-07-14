import { validationResult } from 'express-validator';
import Note from '../models/Note.js';

export async function createNote(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) { next(err); }
}

export async function listNotes(req, res, next) {
  try {
    const { q, tags } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } }
    ];
    if (tags) filter.tags = { $all: tags.split(',') };

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
}

export async function getNote(req, res, next) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) { next(err); }
}

export async function updateNote(req, res, next) {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) { next(err); }
}

export async function deleteNote(req, res, next) {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(204).end();
  } catch (err) { next(err); }
}
