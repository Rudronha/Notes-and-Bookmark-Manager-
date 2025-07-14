import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema(
  {
    url:         { type: String, required: true },
    title:       { type: String, default: '' },
    description: { type: String, default: '' },
    tags:        { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Bookmark', BookmarkSchema);
