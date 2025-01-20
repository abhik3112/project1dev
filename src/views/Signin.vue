<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function signIn (event) {
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

	<main class="padding-block-700">
		<section class="container center">
			<button class="button" @click="signIn">Sign In</button>
		</section>
	</main>
</template>

<style scoped>
:deep(a) {
	text-decoration: none;
}
</style>
