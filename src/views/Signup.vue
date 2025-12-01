<template>
  <div class="auth-container">
    <h2>Inscription</h2>

    <form @submit.prevent="handleSignup" class="auth-form">
      <input v-model="email" type="email" placeholder="Email ENSA" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit" class="btn-primary">S'inscrire</button>
    </form>

    <button class="btn-google" @click="signInWithGoogle">
      <font-awesome-icon icon="fa-brands fa-google" /> S'inscrire avec Google
    </button>

    <p v-if="error" class="error">{{ error }}</p>
    <p class="switch-link">
      Déjà inscrit ? <router-link to="/login">Connexion</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

async function handleSignup() {
  error.value = "";
  if (!email.value.endsWith("@uca.ac.ma")) {
    error.value = "Vous devez utiliser votre email ENSA (@uca.ac.ma)";
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push({ name: "Events" });
  } catch (e) {
    error.value = e.message;
  }
}

const provider = new GoogleAuthProvider();
async function signInWithGoogle() {
  error.value = "";
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (!user.email.endsWith("@uca.ac.ma")) {
      alert("Vous devez utiliser votre compte ENSA (@uca.ac.ma)");
      await auth.signOut();
      return;
    }
    router.push({ name: "Events" });
  } catch (e) {
    error.value = e.message;
  }
}
</script>

<style scoped>
/* Réutiliser exactement le même style que Login.vue */
.auth-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  text-align: center;
}

.auth-container h2 {
  margin-bottom: 20px;
  color: #333;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-form input {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.btn-primary {
  padding: 10px;
  border: none;
  background-color: #1a73e8;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #1558b0;
}

.btn-google {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
}

.btn-google img {
  width: 18px;
  height: 18px;
}

.btn-google:hover {
  background-color: #f5f5f5;
}

.error {
  color: red;
  margin-top: 10px;
}

.switch-link {
  margin-top: 15px;
  font-size: 14px;
}
</style>
