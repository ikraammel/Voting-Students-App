<template>
  <div class="events-container">
    <h2>Événements</h2>

    <div v-for="e in events" :key="e.id" class="card">
      <img v-if="e.img" :src="e.img" alt="" />
      <h3>{{ e.title }}</h3>
      <p>{{ e.description }}</p>
      <p>Date : {{ formatDate(e.date) }}</p>
      <p>
        <span class="yes">Yes: {{ e.yesVotes || 0 }}</span> —
        <span class="no">No: {{ e.noVotes || 0 }}</span>
      </p>
      <button @click="vote(e.id, 'yes')" :disabled="loading[e.id]" class="yes-btn">Yes</button>
      <button @click="vote(e.id, 'no')" :disabled="loading[e.id]" class="no-btn">No</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { voteEvent } from "../utils/vote";
import { onAuthStateChanged } from "firebase/auth";

const events = ref([]);
const loading = ref({});
let unsub = null;

// 🔹 Récupération des events après authentification
onAuthStateChanged(auth, (user) => {
  if (user) {
    const q = query(collection(db, "Events"), orderBy("date", "desc"));
    unsub = onSnapshot(q, (snap) => {
      events.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }, (err) => {
      console.error("Erreur Firestore :", err);
      alert("Impossible de récupérer les événements : " + err.message);
    });
  } else {
    alert("Vous devez être connecté pour voir les événements !");
  }
});

onUnmounted(() => {
  if (unsub) unsub();
});

// 🔹 Formatage des dates
function formatDate(ts) {
  try {
    if (!ts) return "";
    return ts.toDate ? ts.toDate().toLocaleString() : new Date(ts).toLocaleString();
  } catch { return ""; }
}

// 🔹 Fonction de vote
async function vote(eventId, v) {
  loading.value = { ...loading.value, [eventId]: true };
  try {
    await voteEvent(eventId, v);

    // ⚡ Mise à jour immédiate du compteur côté UI
    const idx = events.value.findIndex(e => e.id === eventId);
    if (idx !== -1) {
      if (v === "yes") events.value[idx].yesVotes = (events.value[idx].yesVotes || 0) + 1;
      else events.value[idx].noVotes = (events.value[idx].noVotes || 0) + 1;
    }

    alert("Vote enregistré !");
  } catch (err) {
    alert(err.message || "Erreur lors du vote");
  } finally {
    loading.value = { ...loading.value, [eventId]: false };
  }
}
</script>

<style>
.events-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 25px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.card img {
  max-width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}

.card h3 {
  margin: 8px 0;
  font-size: 18px;
}

.card p {
  margin: 5px 0;
  font-size: 14px;
}

button.yes-btn {
  background-color: #28a745;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.no-btn {
  background-color: #dc3545;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

span.yes { color: #28a745; font-weight: bold; }
span.no { color: #dc3545; font-weight: bold; }

@media (max-width: 480px) {
  .events-container {
    margin: 20px;
    padding: 20px;
  }

  .card h3 {
    font-size: 16px;
  }

  .card p {
    font-size: 13px;
  }

  button.yes-btn, button.no-btn {
    font-size: 14px;
  }
}
</style>
