import { validationResult } from 'express-validator';
import Bookmark from '../models/Bookmark.js';
import { fetchTitle } from '../services/fetchTitle.js';

export async function createBookmark(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let { url, title, description = '', tags = [] } = req.body;
    if (!title) title = (await fetchTitle(url)) || '';

    const bm = await Bookmark.create({ url, title, description, tags });
    res.status(201).json(bm);
  } catch (err) { next(err); }
}

export async function listBookmarks(req, res, next) {
  try {
    const { q, tags } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { url: { $regex: q, $options: 'i' } },
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
    if (tags) filter.tags = { $all: tags.split(',') };

    const bms = await Bookmark.find(filter).sort({ createdAt: -1 });
    res.json(bms);
  } catch (err) { next(err); }
}

export async function getBookmark(req, res, next) {
  try {
    const bm = await Bookmark.findById(req.params.id);
    if (!bm) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bm);
  } catch (err) { next(err); }
}

export async function updateBookmark(req, res, next) {
  try {
    const bm = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!bm) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bm);
  } catch (err) { next(err); }
}

export async function deleteBookmark(req, res, next) {
  try {
    const bm = await Bookmark.findByIdAndDelete(req.params.id);
    if (!bm) return res.status(404).json({ error: 'Bookmark not found' });
    res.status(204).end();
  } catch (err) { next(err); }
}
