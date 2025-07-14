import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Drawer({ mode, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', url: '', description: '', content: '', tags: '' });

  if (!mode) return null;

  const isNote      = mode === 'note';
  const titleLabel  = isNote ? 'Note title'      : 'Bookmark title';
  const mainLabel   = isNote ? 'Content'         : 'Description';
  const mainKey     = isNote ? 'content'         : 'description';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 z-50"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="fixed right-0 top-0 h-full w-full sm:max-w-sm md:max-w-md bg-white p-6 overflow-y-auto z-50"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      >
        <h2 className="text-lg font-semibold mb-4">{isNote ? 'New Note' : 'New Bookmark'}</h2>

        <label className="block text-sm font-medium"> {titleLabel}
          <input className="mt-1 w-full border rounded p-2"
                 value={form.title}
                 onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </label>

        {!isNote && (
          <label className="block text-sm font-medium mt-4">URL
            <input className="mt-1 w-full border rounded p-2"
                   value={form.url}
                   onChange={e => setForm({ ...form, url: e.target.value })}
            />
          </label>
        )}

        <label className="block text-sm font-medium mt-4">{mainLabel}
          <textarea rows="4"
                    className="mt-1 w-full border rounded p-2 resize-none"
                    value={form[mainKey]}
                    onChange={e => setForm({ ...form, [mainKey]: e.target.value })}
          />
        </label>

        <label className="block text-sm font-medium mt-4">Tags (comma‑separated)
          <input className="mt-1 w-full border rounded p-2"
                 value={form.tags}
                 onChange={e => setForm({ ...form, tags: e.target.value })}
          />
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn-primary"
                  onClick={() => {
                    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
                    onSave({ ...form, tags });
                    setForm({ title:'', url:'', description:'', content:'', tags:'' });
                  }}
          >
            Save
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
