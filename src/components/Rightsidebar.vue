<script setup>
import router from '@/router'
import { ref } from 'vue'

const message = ref("")
const errormsg = ref("")

async function postMessage(e) {
  e.preventDefault()

  errormsg.value = ""

  if (!message.value) {
    errormsg.value = "Empty Empty Empty Empty"
    return
  }
  if (message.value.length > 280) {
    errormsg.value = "Max length exceeded"
    return
  }

  const token = localStorage.getItem("token")

  const dt = {
    text: message.value
  }

  const url = 'https://hap-app-api.azurewebsites.net/message'

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dt),
  }

  let response = await fetch(url, options)

  if (response.status === 201) {
    const data = await response.json()
    localStorage.setItem("message", data.message)

    router.push({
      name: 'normal'
    })
  }
  else if (response.status === 400) {
    errormsg.value = "Invalid email or password"
  }
  else if (response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="postMessage">
      <h2>Bulletin Board</h2>
      <div>
        <input type="text"  v-model="message" placeholder="Enter your message..." required>
        <button @click="postMessage">Post</button>
      </div>
      <p class= "err" v-if="errormsg">{{ errormsg }}</p>
    </form>

  </main>
</template>

<style scoped>
.err{
  color: greenyellow;
  animation: shake 0.5s ease-in-out;
}
@keyframes shake {

0% { transform: translateX(0); }

25% { transform: translateX(-5px); }

50% { transform: translateX(5px); }

75% { transform: translateX(-5px); }

100% { transform: translateX(0); }

}

</style>
