import clsx from 'clsx';

export default function Sidebar({ filter, setFilter }) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'notes', label: 'Notes' },
    { key: 'bookmarks', label: 'Bookmarks' }
  ];

  return (
    <aside className="hidden lg:block lg:w-56 border-r px-4 py-6 bg-white shrink-0">
      {tabs.map(t => (
        <button
          key={t.key}
          className={clsx(
            'w-full text-left rounded px-3 py-2',
            filter === t.key
              ? 'bg-blue-600 text-white'
              : 'hover:bg-slate-100'
          )}
          onClick={() => setFilter(t.key)}
        >
          {t.label}
        </button>
      ))}
    </aside>
  );
}
