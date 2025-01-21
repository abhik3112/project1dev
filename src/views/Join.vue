<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

function Join (event) {
  const firstname = document.getElementById('firstname').value
  const lastname = document.getElementById('lastname').value
  const email = document.getElementById('email').value
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const confirmpassword = document.getElementById('confirmpassword').value

  if(firstname == "" || lastname == "" || email == "" || username == "" || password == "" || confirmpassword == "") {
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
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" required>
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" required>
        <label for="email">Email</label>
        <input type="email" id="email" required>
        <label for="username">User Name</label>
        <input type="text" id="username" required>
        <label for="password">Password</label>
        <input type="password" id="password" required>
        <label for="confirmpassword">Confirm Password</label>
        <input type="password" id="confirmpassword" required>
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
