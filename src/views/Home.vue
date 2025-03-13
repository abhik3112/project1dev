<script setup>
import Header from '../components/Header.vue'
import { RouterLink } from 'vue-router';
</script>

<template class="temp">
    <Header>
        <nav>
          <RouterLink to="/signin">Sign In</RouterLink>
          <RouterLink to="/join">Join</RouterLink>
        </nav>
    </Header>

    <main>
      <section class="hm">
        <h1>Spider App Home</h1>
        <p>This is the home of the Spider App</p>
      </section>
    </main>
</template>

<style scoped>

:deep(a) {
    text-decoration: none;
}
.hm {
  color: white;
  background-color: black;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 10px 10px 5px #007fd7;
}
</style>
