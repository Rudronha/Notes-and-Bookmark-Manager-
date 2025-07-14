import TagPill from './TagPill';
import { Pencil, Trash2 } from 'lucide-react';   // npm i lucide-react

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="relative rounded shadow-card p-4 bg-white">
      {/* Edit */}
      <button
        onClick={() => onEdit(note)}
        className="absolute top-2 right-9 p-1 rounded hover:bg-slate-100"
        aria-label="Edit note"
      >
        <Pencil size={16} />
      </button>

      {/* Delete */}
      <button
        onClick={() => onDelete(note)}
        className="absolute top-2 right-2 p-1 rounded hover:bg-red-50"
        aria-label="Delete note"
      >
        <Trash2 size={16} className="text-red-600" />
      </button>

      <h3 className="font-semibold">{note.title}</h3>
      <p className="text-sm mt-1 mb-2 whitespace-pre-line">{note.content}</p>

      <div className="flex flex-wrap gap-2">
        {note.tags.filter(Boolean).map(t => (
          <TagPill key={t} tag={t} />
        ))}
      </div>
    </div>
  );
}
