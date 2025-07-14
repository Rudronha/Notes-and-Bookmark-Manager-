import express from 'express';
import cors from 'cors';

import notesRoutes from './routes/notes.js';
import bookmarksRoutes from './routes/bookmarks.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRoutes);
app.use('/api/bookmarks', bookmarksRoutes);

app.use(errorHandler); // last

export default app;
