<script setup>
import { ref, onMounted } from 'vue';

defineProps({ senderName: String, updatedAt: String, text: String });
const messages = ref([]);
const hasNewMessages = ref(false);
const newMessageCount = ref(0);

async function fetchMessages(after = null) {
  let url = 'https://hap-app-api.azurewebsites.net/messages?limit=5';
  const token = localStorage.getItem("token")
  if (after) {
    url += `&after=${after}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();

  messages.value.splice(0, 0, ...data);
}

async function checkNewMessages() {
  const lastMessageTime = messages.value[0]?.updatedAt || new Date().toISOString();
  let url = `https://hap-app-api.azurewebsites.net/messages/count?after=${lastMessageTime}`;
  const token = localStorage.getItem("token")
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const count = await response.json();
  newMessageCount.value = count;
  hasNewMessages.value = count > 0;
}

async function loadNewMessages() {
  const lastMessageTime = messages.value[0]?.updatedAt || new Date().toISOString();
  await fetchMessages(lastMessageTime);
  hasNewMessages.value = false;
}

// function activateAutoLoad() {
//   const intersectionObserver = new IntersectionObserver((arr) => {
//     for (let entry of arr) {
//       if (entry.isIntersecting) {
//         console.log('button is in view')

//         for (let i = 0; i < 5; i++) {
//           console.log('loading section')
//           let main = document.querySelector("main")
//           main.insertBefore(document.createElement("section"), main.lastElementChild)
//         }
//       }
//       else {
//         console.log('button is out of view')
//       }
//     }
//   },
//     {
//       root: document.querySelector("main"),
//       threshold: [0, 1],
//       rootMargin: "-40px"
//     })

//   intersectionObserver.observe(document.querySelector("#autoLoadButton"))
// }

onMounted(() => {
  fetchMessages();
  setInterval(checkNewMessages, 5000);
});
</script>

<template>
  <div class="backgr">
    <button @click="loadNewMessages">
      Load {{ newMessageCount }} New Messages
    </button>
    <div v-for="msg in messages" :key="msg.updatedAt" class="card">
      <h1>{{ msg.senderName }}</h1>
      <span>{{ new Date(msg.updatedAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" }) }}</span>
      <p>{{ msg.text }}</p>
    </div>
  </div>
</template>

<style scoped>

.card {
  background-color: white;
  color: black;
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.backgr {
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  height: auto;
}

button {
  background-color: #007fd7;
  color: white;
  padding: 10px;
  border: solid;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #de0606;
}
</style>
