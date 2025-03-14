<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import { userUserStore } from '@/router/user';

const userStore = userUserStore()
//const {firstName, lastName}

const errormsg = ref("")
const userName = localStorage.getItem("userName");

const users = ref([])
const search = ref("")

async function getusers() {
  const token = localStorage.getItem("token")

  const url = `https://hap-app-api.azurewebsites.net/users?search=userName:${search.value}&sortBy=userName:asc`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(response.status === 200) {
    errormsg.value = "Ok"

    const data = await response.json()

    console.log(data)

    users.value = data
  }
  if(response.status === 401) {
    errormsg.value = "Unauthorized"
  }
  if(response.status === 500) {
    errormsg.value = "Internal Server Error"
  }
}

</script>

<template>
  <main>
    <div>

      <h1>Welcome to the page {{ userName }}</h1>
      <p class="Searchp">Search for usernames here:</p>
      <input v-model="search" placeholder="Search here..."><br>
      <button @click="getusers">Search</button> <br>
      <RouterLink class = "names"v-for="user in users" :to="`/user/${user._id}?name=${user.userName}`">
        {{ user.userName }} <br>
      </RouterLink>

    </div>
  </main>
</template>

<style scoped>
.names{
  color: chartreuse;
}
h1{
  background-color: wheat;
  padding: 10px 30px 10px 5px;
  border-radius: 2%;
}
.Searchp {
  color: white;
  padding-top: 10px;
}

</style>
