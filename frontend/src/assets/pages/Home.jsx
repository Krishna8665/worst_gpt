import { useState, useEffect, useRef } from "react";
import { ArrowUp, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const reduxToken = useSelector((state) => state.auth.token);
  const token = reduxToken || localStorage.getItem("authToken");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/gpt/gpt",
        { prompt: input },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const { response: botText } = response.data;

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Try again later.";
      setError(message);
    } finally {
      setLoading(false);
      setInput("");
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 pt-20 pb-32">
        {!hasMessages && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">WorstGPT</h1>
              <p className="text-gray-600 mb-8">
                Say something stupid — I dare you. I'll respond worse.
              </p>
            </div>
          </div>
        )}

        {hasMessages && (
          <div className="space-y-6 mb-8">
            {messages.map((input, i) => (
              <div
                key={i}
                className={`rounded-lg p-4 ${
                  input.sender === "user"
                    ? "bg-blue-50 text-blue-900"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {input.sender === "user" ? (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      Y
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      W
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {input.sender === "user" ? "You" : "WorstGPT"}
                    </div>
                    <div className="whitespace-pre-wrap">{input.text}</div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="rounded-lg p-4 bg-white border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    D
                  </div>
                  <div className="font-medium">WorstGPT is thinking...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white py-4 shadow-lg">
          <div className="max-w-3xl mx-auto px-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 w-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
            >
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition disabled:opacity-50"
                aria-label="Send"
                disabled={!input.trim() || loading}
              >
                <ArrowUp size={20} />
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              WorstGPT is proudly inaccurate and unapologetically offensive.
              Trust it at your own risk.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
