export default function VoiceBtn({ onVoice }) {
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("المتصفح لا يدعم البحث الصوتي");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.interimResults = false;
    recognition.onresult = (e) => onVoice(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <button onClick={startListening}
      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-4 rounded-xl transition text-2xl">
      🎤
    </button>
  );
}
