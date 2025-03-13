<script setup>
import { defineProps } from 'vue';
defineProps({ userId: String });
</script>

<template>
  <div class="card">
    <h2>Private Messages</h2>
    <p>Chat between you and user: {{ userId }}</p>
  </div>
</template>

<style scoped>
.card {
  border: 2px solid beige;
  background-color: black;
  color: white;
  width: 50%;
  padding: 20px;
  margin: 0px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
}

@media (min-width: 50em) {
  .card {
    width: 100%;
  }
}
</style>
