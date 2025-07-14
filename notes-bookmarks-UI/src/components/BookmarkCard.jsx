import TagPill from './TagPill';
import { Pencil, Trash2 } from 'lucide-react';   // icons

export default function BookmarkCard({ bm, onEdit, onDelete }) {
  return (
    <div className="relative rounded shadow-card p-4 bg-white">
      {/* Edit */}
      <button
        onClick={() => onEdit(bm)}
        className="absolute top-2 right-9 p-1 rounded hover:bg-slate-100"
        aria-label="Edit bookmark"
      >
        <Pencil size={16} />
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(bm)}
        className="absolute top-2 right-2 p-1 rounded hover:bg-red-50"
        aria-label="Delete bookmark"
      >
        <Trash2 size={16} className="text-red-600" />
      </button>

      <a
        href={bm.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-blue-600 hover:underline break-all"
      >
        {bm.title || bm.url}
      </a>

      <p className="text-sm mt-1 mb-2 whitespace-pre-line">{bm.description}</p>

      <div className="flex flex-wrap gap-2">
        {bm.tags.filter(Boolean).map(t => (
          <TagPill key={t} tag={t} />
        ))}
      </div>
    </div>
  );
}
