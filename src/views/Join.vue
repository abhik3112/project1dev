<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router';
import { userUserStore } from '@/router/user';

const router = useRouter()
const userStore = userUserStore()

const firstName = ref("")
const lastName = ref("")
const email = ref("")
const userName = ref("")
const password = ref("")
const confirmpassword = ref("")
const errormsg = ref("")

async function Join(event) {
  event.preventDefault()

  if (!firstName.value || !lastName.value || !email.value || !userName.value || !password.value || !confirmpassword.value) {
    errormsg.value = "Fill out all the fields"
    return
  }
  if (password.value !== confirmpassword.value) {
    errormsg.value = "Password does not match"
    return
  }
  if (password.value.length < 8) {
    errormsg.value = "Atleast 8 characters"
    return
  }

  const data = {
    email: email.value,
    userName: userName.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value
  }
  console.log(data)

  const url = 'https://hap-app-api.azurewebsites.net/user'

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  let response = await fetch(url, options)

  if (response.status === 201) {
    const data = await response.json()

    userStore.setUser('firstName', data.user.firstName)
    userStore.setUser("userName", data.user.userName)
    userStore.setUser('lastName', data.user.lastName)
    userStore.setUser('firstName', data.user.firstName)
    userStore.setUser('email', data.user.email)

    router.push({
      name: 'normal'
    })
  }
  else if (response.status === 400) {
    errormsg.value = "Invalid email or password"
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}
</script>

<template>
  <Header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </Header>

  <main>
    <div class="wrapper">
      <form @submit.prevent="Join">
        <h1>Join</h1>
        <p v-if="errormsg" class="err">{{ errormsg }}</p>
        <div class="input-box">
          <input type="text" v-model="firstName" placeholder="First Name" unique required>
        </div>
        <div class="input-box">
          <input type="text" v-model="lastName" placeholder="Last Name" required>
        </div>
        <div class="input-box">
          <input type="email" v-model="email" placeholder="Email" required>
        </div>
        <div class="input-box">
          <input type="text" v-model="userName" placeholder="Username" required>
        </div>
        <div class="input-box">
          <input type="password" v-model="password" placeholder="Password" required>
        </div>
        <div class="input-box">
          <input type="password" v-model="confirmpassword" placeholder="Confirm Password" required>
        </div>
        <button class="btn" type="submit">Join</button>
        <div class="join-link">
          <p>Already have a account? <RouterLink to="/signin">Sign in</RouterLink></p>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
:deep(a) {
  text-decoration: none;
}

.err {
  color: brown;
}
</style>
