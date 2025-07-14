import TagPill from './TagPill';

export default function BookmarkCard({ bm }) {
  return (
    <div className="rounded shadow-card p-4 bg-white">
      <a href={bm.url} target="_blank" rel="noopener noreferrer"
         className="font-semibold text-blue-600 hover:underline">
        {bm.title || bm.url}
      </a>
      <p className="text-sm mt-1 mb-2">{bm.description}</p>
      <div className="flex flex-wrap gap-2">
        {bm.tags.map(t => <TagPill key={t} tag={t} />)}
      </div>
    </div>
  );
}
