import { useState, useEffect, useRef } from "react";
import { ArrowUp, Search } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: generateResponse(input) },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (query) => {
    // Simulate a more comprehensive search-like response
    return `Here’s your nonsense on "${query}":\n\n1. First result related to ${query}\n2. Second source discussing ${query}\n3. Additional information about ${query}`;
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
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-lg p-4 ${
                  msg.from === "user"
                    ? "bg-blue-50 text-blue-900"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {msg.from === "user" ? (
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
                      {msg.from === "user" ? "You" : "WorstGPT"}
                    </div>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="rounded-lg p-4 bg-white border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    D
                  </div>
                  <div className="font-medium">Worstgpt is thinking...</div>
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
                disabled={!input.trim() || isLoading}
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
