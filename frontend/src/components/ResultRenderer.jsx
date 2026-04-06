export default function ResultRenderer({ data, intent, confidence }) {
  if (!data) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">🎯 النية: {intent}</h2>
        <span className="text-sm bg-green-900 text-green-300 px-2 py-1 rounded">دقة: {confidence}%</span>
      </div>

      {data.type === "products" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {data.data.map((p) => (
            <div key={p.id} className="p-4 bg-gray-900 rounded-lg hover:ring-1 hover:ring-blue-500 transition">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <div className="flex justify-between mt-2">
                <span className="text-blue-400 font-mono">{p.price} ر.س</span>
                <span className="text-yellow-400">⭐ {p.rating}</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">{p.specs}</p>
              <div className="mt-3 text-xs text-gray-500">Tags: {p.tags}</div>
            </div>
          ))}
        </div>
      )}

      {data.type === "steps" && (
        <ol className="mt-4 space-y-3">
          {data.data.map((step, i) => (
            <li key={i} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
              <span className="bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full font-bold">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
