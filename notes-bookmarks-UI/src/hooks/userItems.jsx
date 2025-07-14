// src/hooks/useItems.js
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' }
});

export default function useItems() {
  const [notes, setNotes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ───── fetch all once ───── */
  useEffect(() => {
    (async () => {
      try {
        const [nRes, bRes] = await Promise.all([
          api.get('/notes'),
          api.get('/bookmarks')
        ]);
        setNotes(nRes.data);
        setBookmarks(bRes.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ───── CRUD helpers ───── */
  const addNote = useCallback(async ({ title, content, tags }) => {
    const { data } = await api.post('/notes', { title, content, tags });
    setNotes(prev => [data, ...prev]);
  }, []);

  const addBookmark = useCallback(async ({ url, title, description, tags }) => {
    const { data } = await api.post('/bookmarks', {
      url,
      title,
      description,
      tags
    });
    setBookmarks(prev => [data, ...prev]);
  }, []);

  const updateNote = useCallback(async (id, payload) => {
    const { data } = await api.put(`/notes/${id}`, payload);
    setNotes(prev => prev.map(n => (n._id === id ? data : n)));
  }, []);

  const updateBookmark = useCallback(async (id, payload) => {
    const { data } = await api.put(`/bookmarks/${id}`, payload);
    setBookmarks(prev => prev.map(b => (b._id === id ? data : b)));
  }, []);

  const deleteNote = useCallback(async id => {
    await api.delete(`/notes/${id}`);
    setNotes(prev => prev.filter(n => n._id !== id));
  }, []);

  const deleteBookmark = useCallback(async id => {
    await api.delete(`/bookmarks/${id}`);
    setBookmarks(prev => prev.filter(b => b._id !== id));
  }, []);

  return {
    notes,
    bookmarks,
    loading,
    error,
    addNote,
    addBookmark,
    updateNote,
    updateBookmark,
    deleteNote,
    deleteBookmark
  };
}
