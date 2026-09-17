import { useState, useRef, useEffect } from 'react';
import { sendUserChatMessage, sendCaptainChatMessage } from '../api/support.api';

const SupportChat = ({ role = 'user', rideId, token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const sendFn = role === 'captain' ? sendCaptainChatMessage : sendUserChatMessage;
      const { reply } = await sendFn(input, rideId, token);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-96 w-80 border rounded-lg shadow-lg bg-white">
      <div className="p-3 border-b font-semibold bg-black text-white rounded-t-lg">
        Support Chat
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === 'user'
                ? 'bg-black text-white ml-auto'
                : 'bg-gray-100 text-black mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SupportChat;