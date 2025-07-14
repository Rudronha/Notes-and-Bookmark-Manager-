import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Drawer({ mode, editing = {}, onClose, onSave }) {
  /* ───── derive flags from mode ───── */
  if (!mode) return null;
  const isNote = mode.includes('note');
  const isEdit = mode.startsWith('edit');

  /* ───── local form state ───── */
  const [form, setForm] = useState({
    title: editing?.title || '',
    url: editing?.url || '',
    description: editing?.description || '',
    content: editing?.content || '',
    tags: (editing?.tags || []).join(',')
  });

  /* when editing prop changes (open another record) */
  useEffect(() => {
    if (editing && editing._id) {
      setForm({
        title: editing.title || '',
        url: editing.url || '',
        description: editing.description || '',
        content: editing.content || '',
        tags: (editing.tags || []).join(',')
      });
    }else {
        // Reset form when switching from edit → new
        setForm({ title: '', url: '', description: '', content: '', tags: '' });
    }
  }, [editing]);

  const titleLabel = isNote ? 'Note title' : 'Bookmark title';
  const mainLabel = isNote ? 'Content' : 'Description';
  const mainKey   = isNote ? 'content' : 'description';

  /* ───── save handler ───── */
  function handleSave() {
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t.length), 
    };
    if (isEdit) payload._id = editing._id;  // keep id if needed by caller
    onSave(payload);

    // reset local state
    setForm({ title: '', url: '', description: '', content: '', tags: '' });
  }

  return (
    <AnimatePresence>
      {/* overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* slide‑over panel */}
      <motion.aside
        className="fixed right-0 top-0 h-full w-full sm:max-w-sm md:max-w-md
                   bg-white p-6 overflow-y-auto z-50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
      >
        <h2 className="text-lg font-semibold mb-4">
          {isNote
            ? isEdit ? 'Edit Note'      : 'New Note'
            : isEdit ? 'Edit Bookmark'  : 'New Bookmark'}
        </h2>

        {/* Title */}
        <label className="block text-sm font-medium">
          {titleLabel}
          <input
            className="mt-1 w-full border rounded p-2"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </label>

        {/* URL – only for bookmark */}
        {!isNote && (
          <label className="block text-sm font-medium mt-4">
            URL
            <input
              className="mt-1 w-full border rounded p-2"
              value={form.url}
              onChange={e => setForm({ ...form, url: e.target.value })}
            />
          </label>
        )}

        {/* Content / Description */}
        <label className="block text-sm font-medium mt-4">
          {mainLabel}
          <textarea
            rows="4"
            className="mt-1 w-full border rounded p-2 resize-none"
            value={form[mainKey]}
            onChange={e => setForm({ ...form, [mainKey]: e.target.value })}
          />
        </label>

        {/* Tags */}
        <label className="block text-sm font-medium mt-4">
          Tags (comma‑separated)
          <input
            className="mt-1 w-full border rounded p-2"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
          />
        </label>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
