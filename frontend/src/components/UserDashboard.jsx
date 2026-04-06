export default function UserDashboard({ preferences, userId }) {
  return (
    <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold mb-3">👤 لوحة المستخدم</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">ID: {userId}</span>
        {preferences.length > 0 ? (
          preferences.map((p, i) => <span key={i} className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm">🔹 {p}</span>)
        ) : (
          <span className="text-gray-500 text-sm">ابدأ البحث لتخصيص تفضيلاتك</span>
        )}
      </div>
    </div>
  );
}
