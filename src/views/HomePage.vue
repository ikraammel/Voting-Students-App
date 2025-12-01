<script setup>
import { ref, onUnmounted } from "vue";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { voteEvent } from "../utils/vote";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

// États
const events = ref([]);
const loading = ref({});
const userVotes = ref({});
const user = ref(null);
const loadingAuth = ref(true); // 🔹 Etat de chargement de l'auth

let unsub = null;

//Déconnexion
function logout() {
  signOut(auth)
    .then(() => {
      router.push('/login');
    })
    .catch((err) => {
      console.error("Erreur lors de la déconnexion :", err);
      alert("Impossible de se déconnecter : " + err.message);
    });
}

// 🔹 Authentification et récupération des events
onAuthStateChanged(auth, (u) => {
  user.value = u;
  loadingAuth.value = false;

  if (!u) {
    router.replace("/login");
    return;
  }

  // Récupération des événements
  const q = query(collection(db, "Events"), orderBy("date", "desc"));
  unsub = onSnapshot(q, (snap) => {
    events.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }, (err) => {
    console.error("Erreur Firestore :", err);
    alert("Impossible de récupérer les événements : " + err.message);
  });
});

onUnmounted(() => {
  if (unsub) unsub();
});

// 🔹 Formatage des dates
function formatDate(ts) {
  try {
    if (!ts) return "";
    return ts.toDate ? ts.toDate().toLocaleString() : new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

// 🔹 Fonction de vote
async function vote(eventId, v) {
  loading.value = { ...loading.value, [eventId]: true };
  try {
    await voteEvent(eventId, v);

    // Mise à jour immédiate côté UI
    const idx = events.value.findIndex(e => e.id === eventId);
    if (idx !== -1) {
      if (v === "yes") events.value[idx].yesVotes = (events.value[idx].yesVotes || 0) + 1;
      else events.value[idx].noVotes = (events.value[idx].noVotes || 0) + 1;

      userVotes.value[eventId] = v; // Bloquer le vote pour cet event
    }

    alert("Vote enregistré !");
  } catch (err) {
    alert(err.message || "Erreur lors du vote");
  } finally {
    loading.value = { ...loading.value, [eventId]: false };
  }
}
</script>

<template>
  <div v-if="loadingAuth" style="text-align:center; margin-top:50px;">
    Chargement de vos événements...
  </div>

  <div v-else class="home-container">
    <header>
      <h1>Événements ENSA</h1>
      <button @click="logout">Déconnexion</button>
    </header>

    <div v-for="e in events" :key="e.id" class="card">
      <img v-if="e.img" :src="e.img" alt="" />
      <h3>{{ e.title }}</h3>
      <p>{{ e.description }}</p>
      <p>Date : {{ formatDate(e.date) }}</p>
      <p>
        <span class="yes">Yes: {{ e.yesVotes || 0 }}</span> —
        <span class="no">No: {{ e.noVotes || 0 }}</span>
      </p>
      <button @click="vote(e.id, 'yes')" :disabled="loading[e.id] || userVotes[e.id]" class="yes-btn">Yes</button>
      <button @click="vote(e.id, 'no')" :disabled="loading[e.id] || userVotes[e.id]" class="no-btn">No</button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fefefe;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

header h1 {
  font-size: 28px;
  color: #333;
}

header button {
  background-color: #ff4d4f;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

header button:hover {
  background-color: #e04344;
}

.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.card img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.card h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #111;
}

.card p {
  font-size: 15px;
  margin-bottom: 8px;
  color: #555;
}

button.yes-btn, button.no-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;
  margin-right: 10px;
}

button.yes-btn {
  background-color: #28a745;
  color: white;
}

button.yes-btn:hover {
  background-color: #218838;
  transform: translateY(-1px);
}

button.no-btn {
  background-color: #dc3545;
  color: white;
}

button.no-btn:hover {
  background-color: #c82333;
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

span.yes {
  color: #28a745;
  font-weight: bold;
}

span.no {
  color: #dc3545;
  font-weight: bold;
}

@media (max-width: 600px) {
  .home-container {
    margin: 20px;
    padding: 15px;
  }

  header h1 {
    font-size: 22px;
  }

  .card h3 {
    font-size: 18px;
  }

  .card p {
    font-size: 14px;
  }

  button.yes-btn, button.no-btn {
    padding: 6px 12px;
    font-size: 14px;
  }
}

</style>
