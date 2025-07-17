import { useLocation } from 'react-router-dom';

export default function Header({ openDrawer }) {
  const { pathname } = useLocation();

  return (
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b bg-white">
      <h1 className="font-bold text-lg sm:text-xl">
        Notes&nbsp;and&nbsp;Bookmark&nbsp;Manager
      </h1>

      <div>
        {pathname === '/notes' && (
          <button
            onClick={() => openDrawer('note')}
            className="px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm rounded border hover:bg-slate-100"
          >
            New Note
          </button>
        )}

        {pathname === '/bookmarks' && (
          <button
            onClick={() => openDrawer('bookmark')}
            className="px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm rounded border bg-blue-600 text-white hover:bg-blue-700"
          >
            New Bookmark
          </button>
        )}
      </div>
    </header>
  );
}
