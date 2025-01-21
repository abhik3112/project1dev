<script setup>
import Header from '../components/Header.vue'
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/signin">Sign In</RouterLink>
            <RouterLink to="/join">Join</RouterLink>
        </nav>
    </Header>
</template>

<style scoped>

:deep(a) {
    text-decoration: none;
}

</style>
