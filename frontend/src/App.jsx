import { useState } from "react";
import SearchBar from "./components/SearchBar";
import VoiceBtn from "./components/VoiceBtn";
import ResultRenderer from "./components/ResultRenderer";
import UserDashboard from "./components/UserDashboard";
import { analyzeRequest } from "./api";

const USER_ID = localStorage.getItem("userId") || "user_" + Math.random().toString(36).substr(2, 9);
localStorage.setItem("userId", USER_ID);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await analyzeRequest(query, USER_ID);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          🧠 Universal AI Life OS
        </h1>
        <p className="text-gray-400 mt-2">عقلك الرقمي الشامل - بدون وسائط خارجية</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <SearchBar onSearch={handleSearch} loading={loading} />
        <VoiceBtn onVoice={handleSearch} />
      </div>

      {loading && <div className="text-center text-blue-400 animate-pulse">🔍 يحلل الطلب ويبني الحل...</div>}
      
      <ResultRenderer data={result?.result} intent={result?.intent} confidence={result?.confidence} />
      <UserDashboard preferences={result?.preferences || []} userId={USER_ID} />
    </div>
  );
}
