<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({ userId: String })

const textMessage = ref('')
const errormsg = ref('')
const mess = ref([

])

async function getMessages() {
  const token = localStorage.getItem("token")

const url = `https://hap-app-api.azurewebsites.net/messages/${props.userId}`

const response = await fetch(url, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
if(response.status === 200) {
  errormsg.value = "OK"

  const data = await response.json()
  data.reverse()

  console.log(data)

  mess.value = data
}
if(response.status === 401) {
  errormsg.value = "Unauthorized"
}
if(response.status === 500) {
  errormsg.value = "Internal Server Error"
}
}

async function postMessage() {
  const token = localStorage.getItem("token")

  const url = `https://hap-app-api.azurewebsites.net/message/${props.userId}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      text: textMessage.value
    })
  })
  if(response.status === 201) {
    errormsg.value = "Created"

    const data = await response.json()

    console.log(data)

    mess.value.push(data)
  }
  if(response.status === 400) {
    errormsg.value = "Bad Request"
  }
  if(response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  if(response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}
onMounted(()=>{
  getMessages()
})

function send() {
  console.log(`Pretending message sent to ${props.userId}`)
  textMessage.value = ''
}
</script>

<template>
  <div class="card">
    <p v-for = "message in mess">{{ message.text }}</p>
    <img @click="$router.back()" class="close" src="@/assets/CloseDotted.svg" />
    <label class="secondary-heading label" for="message">Private Message</label>
    <input type="text" @keyup.enter="postMessage" v-model="textMessage" id="message" />

  </div>
</template>

<style scoped>
.card {
  border: 2px solid beige;
  background-color: black;
  color: white;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.label {
  margin-bottom: 40px;
}

.close {
  align-self: self-end;
}

@media (min-width: 50em) {
  .card {
    width: 100%;
  }
}
</style>
