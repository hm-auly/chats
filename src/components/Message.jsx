import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Message = ({ msg, currentUser }) => {
  // ✅ চেক করা হচ্ছে ইউজার অ্যাডমিন কিনা
  const isAdmin = currentUser?.uid === "8gj9xBE2r0YlypXK9IaPA299ge22";

  // ✅ মেসেজ ডিলিট করার ফাংশন (শুধু অ্যাডমিনের জন্য)
  const deleteMessage = async () => {
    try {
      await deleteDoc(doc(db, "messages", msg.id));
      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className={`p-2 my-2 rounded-lg flex justify-between items-center ${msg.userId === currentUser?.uid ? "bg-blue-500 text-white self-end" : "bg-gray-300"}`}>
      <span>{msg.text}</span>

      {/* ✅ শুধুমাত্র অ্যাডমিন "Delete" বাটন দেখতে পারবে */}
      {isAdmin && (
        <button 
          onClick={deleteMessage} 
          className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Message;