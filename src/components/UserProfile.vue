
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({ id: String });
const route = useRoute();
const name = ref('');
const showChatLink = ref(false);

watch(route, (route) => {
  if (route.query.hasOwnProperty('name')) {
    name.value = route.query.name;
    showChatLink.value = true;
  } else {
    showChatLink.value = false;
  }
}, { immediate: true });
</script>

<template>
  <div class="card">
    <h1>{{ name }}</h1>
    <span>id: {{ id }}</span>
    <RouterLink v-show="showChatLink" :to="`/user/${id}/chat`">Send Private Message</RouterLink>
  </div>
</template>

<style scoped>
.card {
  background-color: black;
  color: wheat;
  width: 50%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (min-width: 50em) {
  .card {
    width: 100%;
  }
}
</style>
