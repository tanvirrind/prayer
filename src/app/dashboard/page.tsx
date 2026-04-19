"use client";

import { useAuth } from "@/components/FirebaseProvider"; // Adjust import path
import { signInWithGoogle, db, handleFirestoreError, OperationType } from "@/lib/firebase"; // Adjust import path
import { doc, getDoc } from "firebase/firestore";

export default function UserDashboard() {
  const { user, loading, isAuthReady } = useAuth();

  const executeLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login aborted or failed.");
    }
  };

  const readUserDocument = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(docRef);
      console.log(snapshot.data());
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
    }
  };

  if (!isAuthReady || loading) {
    return <div>Initializing Auth State...</div>;
  }

  if (!user) {
    return <button onClick={executeLogin}>Authenticate</button>;
  }

  return (
    <div>
      <div>Active User: {user.email}</div>
      <button onClick={readUserDocument}>Test Firestore Read</button>
    </div>
  );
}