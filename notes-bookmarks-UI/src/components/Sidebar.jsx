import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // icon library

export default function Sidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const tabs = [
    { to: '/notes',      label: 'Notes' },
    { to: '/bookmarks',  label: 'Bookmarks' },
  ];

  return (
    <>
      {/* ▸ Toggle button – visible only below lg */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-16 left-2 z-40 flex lg:hidden h-8 w-8 items-center justify-center
              rounded-full bg-white shadow border hover:bg-slate-50"
        aria-label="Open sidebar"
      >
        <ChevronRight size={20} />
      </button>

      {/* ⬅️ Slide‑over sidebar for mobile */}
      <AnimatePresence>
        {open && (
          <>
            {/* dark overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* panel */}
            <motion.aside
              className="fixed inset-y-0 left-0 w-64 bg-white p-6 z-40 flex flex-col space-y-2 overflow-y-auto lg:hidden"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            >
              {/* close button */}
              <button
                onClick={() => setOpen(false)}
                className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border hover:bg-slate-100"
                aria-label="Close sidebar"
              >
                <ChevronLeft size={20} />
              </button>

              {tabs.map(t => (
                <Link
                  key={t.to}
                  to={t.to}
                  onClick={() => setOpen(false)}
                  className={`block rounded px-3 py-2 ${
                    pathname === t.to
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </Link>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ⬅️ Regular sidebar stays visible on ≥ lg */}
      <aside className="hidden lg:block lg:w-56 border-r px-4 py-6 bg-white shrink-0">
        {tabs.map(t => (
          <Link
            key={t.to}
            to={t.to}
            className={`block rounded px-3 py-2 mb-2 ${
              pathname === t.to ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </aside>
    </>
  );
}
