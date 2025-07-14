import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Sidebar    from './components/Sidebar';
import Header     from './components/Header';
import SearchBar  from './components/SearchBar';
import Drawer     from './components/Drawer';
import NoteCard   from './components/NoteCard';
import BookmarkCard from './components/BookmarkCard';
import useItems   from './hooks/userItems';

export default function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

function InnerApp() {
  const [drawer, setDrawer] = useState(null);
  const [search, setSearch] = useState('');
  const { notes, bookmarks, addNote, addBookmark } = useItems();

  return (
    <div className="h-screen flex flex-col">
      {/* Header now contains navigation links */}
      <Header openDrawer={setDrawer} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <SearchBar value={search} onChange={setSearch} />

          <Routes>
            <Route
              path="/notes"
              element={
                <Section title="Notes">
                  {notes
                    .filter(n => matches(n, search))
                    .map(n => <NoteCard key={n.id} note={n} />)}
                </Section>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <Section title="Bookmarks">
                  {bookmarks
                    .filter(b => matches(b, search))
                    .map(b => <BookmarkCard key={b.id} bm={b} />)}
                </Section>
              }
            />
            {/* fallback → redirect to /notes */}
            <Route path="*" element={<RedirectToNotes />} />
          </Routes>
        </main>
      </div>

      <Drawer
        mode={drawer}
        onClose={() => setDrawer(null)}
        onSave={data => {
          drawer === 'note' ? addNote(data) : addBookmark(data);
          setDrawer(null);
        }}
      />
    </div>
  );
}

/* keeps your existing Section + matches helpers */
function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {children}
      </div>
    </section>
  );
}

function matches(item, term) {
  if (!term.trim()) return true;
  const t = term.toLowerCase();
  return Object.values(item).some(
    v => typeof v === 'string' && v.toLowerCase().includes(t),
  );
}

/* redirect component */
function RedirectToNotes() {
  const navigate = useNavigate();
  navigate('/notes', { replace: true });
  return null;
}
