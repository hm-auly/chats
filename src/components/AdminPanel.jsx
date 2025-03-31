// import { db } from "../firebase";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// const AdminPanel = () => {
//   const deleteAllMessages = async () => {
//     const querySnapshot = await getDocs(collection(db, "messages"));
//     querySnapshot.forEach(async (document) => {
//       await deleteDoc(doc(db, "messages", document.id));
//     });
//   };

//   return (
//     <button className="bg-red-500 text-white p-2 mt-4" onClick={deleteAllMessages}>
//       Delete All Messages
//     </button>
//   );
// };

// export default AdminPanel;