import { body, param, query } from 'express-validator';

export const noteCreate = [
  body('title').notEmpty().withMessage('Title required'),
  body('content').notEmpty().withMessage('Content required'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
];

export const noteIdParam = [
  param('id').isMongoId().withMessage('Invalid note ID')
];

export const noteQuery = [
  query('q').optional().isString(),
  query('tags').optional().isString()
];
