import { collection, doc, getDocs, query, where, addDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore";
import { db, auth } from "../firebase";

export async function voteEvent(eventId, voteValue) {
  const user = auth.currentUser;
  if (!user) throw new Error("Vous devez être connecté.");

  const uid = user.uid;
  const votesRef = collection(db, "Votes");

  // Vérifier si l'utilisateur a déjà voté pour cet événement
  const q = query(votesRef, where("eventId", "==", eventId), where("userId", "==", uid));
  const existingVotes = await getDocs(q);
  if (!existingVotes.empty) throw new Error("Vous avez déjà voté pour cet événement !");

  // Ajouter le vote dans la collection Votes
  await addDoc(votesRef, {
    eventId,
    userId: uid,
    vote: voteValue,
    createdAt: serverTimestamp()
  });

  // Mettre à jour le compteur dans Events atomiquement
  const eventRef = doc(db, "Events", eventId);

  if (voteValue === "yes") {
    await updateDoc(eventRef, { yesVotes: increment(1), updatedAt: serverTimestamp() });
  } else {
    await updateDoc(eventRef, { noVotes: increment(1), updatedAt: serverTimestamp() });
  }
}
