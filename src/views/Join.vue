<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

function Join (event) {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  if(username == "" || password == "") {
    alert('Please fill out all the empty spaces to join')
    return;
  }

  localStorage.setItem('username', username)

  router.push({
		name: 'main'
	})
}
</script>

<template>
  <Header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </Header>

  <main class="home-block">
    <section class="container center">
      <form @submit="Join">
        <label for="username">Username</label>
        <input type="text" id="username" required>
        <label for="password">Password</label>
        <input type="password" id="password" required>
        <button class="button" type="submit">Join</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
:deep(a) {
  text-decoration: none;
}
</style>

<style scoped>
</style>
