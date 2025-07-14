import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Drawer from './components/Drawer';
import NoteCard from './components/NoteCard';
import BookmarkCard from './components/BookmarkCard';
import useItems from './hooks/userItems';

export default function App() {
  const [drawer, setDrawer] = useState(null);     
  const [filter, setFilter] = useState('all');   
  const [search, setSearch] = useState('');
  const { notes, bookmarks, addNote, addBookmark } = useItems();

  const filteredNotes     = notes.filter(n   => matches(n,   search));
  const filteredBookmarks = bookmarks.filter(bm => matches(bm, search));

  return (
    <div className="h-screen flex flex-col">
      <Header openDrawer={setDrawer} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar filter={filter} setFilter={setFilter} />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <SearchBar value={search} onChange={setSearch} />

          {(filter === 'all' || filter === 'notes') && (
            <Section title="Notes">
              {filteredNotes.map(n => <NoteCard key={n.id} note={n} />)}
            </Section>
          )}

          {(filter === 'all' || filter === 'bookmarks') && (
            <Section title="Bookmarks">
              {filteredBookmarks.map(b => <BookmarkCard key={b.id} bm={b} />)}
            </Section>
          )}
        </main>
      </div>

      <Drawer mode={drawer}
              onClose={() => setDrawer(null)}
              onSave={(data) => {
                drawer === 'note' ? addNote(data) : addBookmark(data);
                setDrawer(null);
              }}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{children}</div>
    </section>
  );
}

function matches(item, term) {
  if (!term.trim()) return true;
  const t = term.toLowerCase();
  return Object.values(item).some(v =>
    typeof v === 'string' && v.toLowerCase().includes(t)
  );
}
