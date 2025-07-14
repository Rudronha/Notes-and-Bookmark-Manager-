import TagPill from './TagPill';

export default function NoteCard({ note }) {
  return (
    <div className="rounded shadow-card p-4 bg-white">
      <h3 className="font-semibold">{note.title}</h3>
      <p className="text-sm mt-1 mb-2">{note.content}</p>
      <div className="flex flex-wrap gap-2">
        {note.tags.map(t => <TagPill key={t} tag={t} />)}
      </div>
    </div>
  );
}
