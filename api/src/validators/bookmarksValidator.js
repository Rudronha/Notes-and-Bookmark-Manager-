import { body, param, query } from 'express-validator';

export const bmCreate = [
  body('url')
    .isURL({ require_protocol: true })
    .withMessage('Valid URL required'),
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('tags').optional().isArray()
];

export const bmIdParam = [
  param('id').isMongoId().withMessage('Invalid bookmark ID')
];

export const bmQuery = [
  query('q').optional().isString(),
  query('tags').optional().isString()
];
