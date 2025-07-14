import { useState } from 'react';
let seed = 1;
export default function useItems() {
  const [notes, setNotes]         = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  function addNote({ title, content, tags }) {
    setNotes(ns => [...ns, { id: ++seed, title, content, tags }]);
  }
  function addBookmark({ title, url, description, tags }) {
    setBookmarks(bs => [...bs, { id: ++seed, title, url, description, tags }]);
  }
  return { notes, bookmarks, addNote, addBookmark };
}
