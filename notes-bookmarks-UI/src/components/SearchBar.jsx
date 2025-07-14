export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search notes and bookmarks"
      className="w-full px-3 py-2 border rounded shadow-sm"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
