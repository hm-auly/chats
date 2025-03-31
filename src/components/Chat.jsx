import { useEffect, useState } from "react";
import { db, auth, signInUser } from "../firebase/firebase";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import Message from "./Message"; // ✅ Message.js ইমপোর্ট করা হয়েছে

const Chat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 🔥 Anonymous লগইন করানো হচ্ছে
    signInUser();
    auth.onAuthStateChanged(setUser);

    // 🔥 Firestore থেকে মেসেজগুলো রিয়েল-টাইম আপডেট করা হচ্ছে
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  // ✅ মেসেজ পাঠানোর ফাংশন
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      userId: user.uid,
      createdAt: new Date(),
    });

    setMessage("");
  };

  return (
    <div className="p-4">
      {/* ✅ মেসেজ লিস্ট */}
      <div className="border p-4 h-80 overflow-auto">
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} currentUser={user} />
        ))}
      </div>

      {/* ✅ মেসেজ ইনপুট */}
      <form onSubmit={sendMessage} className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;