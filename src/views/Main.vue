<script setup>
import Header from '@/components/Header.vue'
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router'

const errormsg = ref("")
const router = useRouter()

async function Prfl() {
  router.push({
    name: 'user'
  })
}

async function Prflback() {
  router.push({
    name: 'normal'
  })
}
async function signOut() {

  const token = localStorage.getItem("token")

  const url = 'https://hap-app-api.azurewebsites.net/user/logout'

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.ok) {
    if (response.status === 200) {
      localStorage.removeItem('token')
      localStorage.removeItem("userName")

      router.push({
        name: 'home'
      })
    }
  } else {
    console.log("HTTP-Error: " + response.status)
  }
}

async function dlt() {
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }

  const token = localStorage.getItem("token")

  if (!token) {
    errormsg.value = "No token found"
    return
  }

  const url = 'https://hap-app-api.azurewebsites.net/user'

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)

  if (response.status === 200) {
    localStorage.clear();

    router.push({
      name: 'home'
    })
  }
  else if (response.status === 401) {
    errormsg.value = "Unauthorized"
    console.log("Unauthorized")
  }
  else if (response.status === 500) {
    errormsg.value = "Internal Server Error"
    console.log("Internal Server Error")
  }
}

</script>

<template>
  <Header>
    <nav>
      <div class="dropdown">
        <button>Options</button>
        <div class="opt">
          <a @click="signOut">Sign out</a>
          <a @click="dlt">Delete</a>
          <a @click="Prfl">Profile</a>
          <a @click="Prflback">Default</a>
        </div>
      </div>
    </nav>
  </Header>

  <main>
    <RouterView name="LeftSidebar" class="grid-panel line"></RouterView>
    <RouterView name="Middle" class="grid-panel"></RouterView>
    <RouterView name="RightSidebar" class="grid-panel vline"></RouterView>
  </main>

</template>

<style scoped>
a {
  cursor: pointer;
}

.grid-panel {
  padding-left: 10px;
}

.view {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100%;
}


@media (min-width: 50em) {
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }

  .line {
    border-right: 3px black solid;
  }

  .vline {
    border-left: 3px black solid;
  }
}

.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown button {
  background-color: white;
  color: black;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

.dropdown .opt {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 120px;
  box-shadow: 2px 2px 5px black;
  z-index: 10;
}

.dropdown:hover .opt {
  display: block;
}

.dropdown a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black;
}

.dropdown a:hover {
  background-color: lightgray;
}
</style>
