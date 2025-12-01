import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";

async function recomputeEventCounters() {
  const eventsSnapshot = await getDocs(collection(db, "Events"));
  
  for (const eventDoc of eventsSnapshot.docs) {
    const eventId = eventDoc.id;

    const votesSnapshot = await getDocs(query(collection(db, "Votes"), where("eventId", "==", eventId)));

    let yes = 0;
    let no = 0;
    votesSnapshot.forEach(v => {
      const vote = v.data().vote;
      if (vote === "yes") yes++;
      else if (vote === "no") no++;
    });

    await updateDoc(doc(db, "Events", eventId), { yesVotes: yes, noVotes: no });
    console.log(`Event ${eventId}: yes=${yes}, no=${no}`);
  }

  console.log("Tous les compteurs ont été recalculés !");
}

recomputeEventCounters()
  .then(() => console.log("Script terminé"))
  .catch(err => console.error(err));
