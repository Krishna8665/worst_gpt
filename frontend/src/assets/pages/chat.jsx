import { useState, useRef, useEffect } from 'react';

export default function chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sent: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Hide welcome slider after first message
    if (showWelcome) {
      setShowWelcome(false);
    }

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        text: "Thanks for your message! How can I help you?",
        sent: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold text-center">Chat App</h1>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Welcome Slider (shown only initially) */}
        {showWelcome && (
          <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
            <h2 className="text-2xl font-medium text-green-800 mb-4">Welcome to our Chat</h2>
            <p className="text-gray-600 max-w-md">
              Send your first message to start the conversation. Your messages will appear here.
            </p>
          </div>
        )}

        {/* Messages Container */}
        <div className={`flex-1 overflow-y-auto p-4 ${showWelcome ? 'hidden' : 'block'}`}>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 ${
                    message.sent
                      ? 'bg-green-700 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sent ? 'text-green-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Message Input */}
      <footer className="bg-white border-t border-gray-200 p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full transition-colors"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}