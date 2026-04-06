export default function SearchBar({ onSearch, loading }) {
  const submit = (e) => {
    e.preventDefault();
    const query = e.target.query.value.trim();
    if (query && !loading) {
      onSearch(query);
      e.target.reset();
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-2xl relative">
      <input name="query" disabled={loading}
        className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-lg"
        placeholder="اكتب طلبك... (مثال: أريد لابتوب للبرمجة بسعر متوسط)"
      />
      <button type="submit" disabled={loading}
        className="absolute left-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
        🔍
      </button>
    </form>
  );
}
