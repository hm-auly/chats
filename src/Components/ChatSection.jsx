import { useEffect, useState } from "react";

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // ইউজার আইডি চেক করা, না থাকলে নতুন আইডি তৈরি করা
    let storedUserId = localStorage.getItem("chat_user_id");
    if (!storedUserId) {
      storedUserId = "user-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("chat_user_id", storedUserId);
    }
    setUserId(storedUserId);

    // লোকাল ডাটাবেজ থেকে মেসেজ লোড করা
    const storedMessages = JSON.parse(localStorage.getItem("chat_messages")) || [];
    setMessages(storedMessages);
  }, []);

  const sendMessage = () => {
    if (!input.trim() && !image) return;
    
    const newMessage = {
      id: Date.now(),
      user: userId,
      text: input,
      image: image,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("chat_messages", JSON.stringify(updatedMessages));
    setInput("");
    setImage(null);
  };

  const clearChat = () => {
    localStorage.removeItem("chat_messages");
    setMessages([]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
     
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-3">Chat Section</h2>
      <div className="h-64 overflow-y-auto border p-3 mb-3 bg-gray-100 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 p-2 rounded ${msg.user === userId ? "bg-blue-500 text-white text-right" : "bg-gray-300 text-black text-left"}`}>
            <span className="block text-sm font-semibold">{msg.user}</span>
            <span>{msg.text}</span>
            {msg.image && <img src={msg.image} alt="Sent" className="mt-2 w-32 h-32 rounded" />}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
        <label htmlFor="imageUpload" className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer">📷</label>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded w-full" onClick={clearChat}>Clear Chat</button>
    </div>
  );
};

export default ChatSection;