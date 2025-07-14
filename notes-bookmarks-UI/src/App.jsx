import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Drawer from './components/Drawer';
import NoteCard from './components/NoteCard';
import BookmarkCard from './components/BookmarkCard';
import useItems from './hooks/userItems';        // ✅ correct file name

export default function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

function InnerApp() {
  const [drawer, setDrawer] = useState(null);     // 'new-note' | 'edit-note' | 'new-bm' | 'edit-bm'
  const [editing, setEditing] = useState(null);   // record being edited
  const [search, setSearch] = useState('');

  const {
    notes,
    bookmarks,
    addNote,
    addBookmark,
    updateNote,
    updateBookmark,
    deleteNote,
    deleteBookmark
  } = useItems();

  /* ---------- helpers ---------- */
  const openNewNote      = () => setDrawer('new-note');
  const openNewBookmark  = () => setDrawer('new-bm');

  const openEditNote = note => {
    setEditing(note);
    setDrawer('edit-note');
  };

  const requestDeleteNote = id => {
    if (window.confirm('Delete this Note permanently?')) {
      deleteNote(id);
    }
  };

  const openEditBookmark = bm => {
    setEditing(bm);
    setDrawer('edit-bm');
  };

  const requestDeleteBm = id => {
    if (window.confirm('Delete this bookmark permanently?')) {
      deleteBookmark(id);
    }
  };

  const closeDrawer = () => {
    setDrawer(null);
    setEditing(null);
  };

  const handleSave = data => {
    switch (drawer) {
      case 'new-note':
        addNote(data);
        break;
      case 'edit-note':
        updateNote(editing._id, data);
        break;
      case 'new-bm':
        addBookmark(data);
        break;
      case 'edit-bm':
        updateBookmark(editing._id, data);
        break;
      default:
    }
    closeDrawer();
  };

  /* ---------- UI ---------- */
  return (
    <div className="h-screen flex flex-col">
      <Header
        openDrawer={type => {
          type === 'note' ? openNewNote() : openNewBookmark();
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <SearchBar value={search} onChange={setSearch} />

          <Routes>
            {/* Notes page */}
            <Route
              path="/notes"
              element={
                <Section title="Notes">
                  {notes
                    .filter(n => matches(n, search))
                    .map(n => (
                      <NoteCard
                        key={n._id}
                        note={n}
                        onEdit={openEditNote}
                        onDelete={() => requestDeleteNote(n._id)}
                      />
                    ))}
                </Section>
              }
            />

            {/* Bookmarks page */}
            <Route
              path="/bookmarks"
              element={
                <Section title="Bookmarks">
                  {bookmarks
                    .filter(b => matches(b, search))
                    .map(b => (
                      <BookmarkCard
                        key={b._id}
                        bm={b}
                        onEdit={openEditBookmark}
                        onDelete={() => requestDeleteBm(b._id)}
                      />
                    ))}
                </Section>
              }
            />

            {/* fallback → /notes */}
            <Route path="*" element={<RedirectToNotes />} />
          </Routes>
        </main>
      </div>

      <Drawer
        mode={drawer}          // controls new/edit + note/bookmark
        editing={editing}      // record to pre‑fill (or undefined)
        onClose={closeDrawer}
        onSave={handleSave}
      />
    </div>
  );
}

/* ---------- helpers ---------- */

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
    v => typeof v === 'string' && v.toLowerCase().includes(t)
  );
}

function RedirectToNotes() {
  return <Navigate to="/notes" replace />;
}
