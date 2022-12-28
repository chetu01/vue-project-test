<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Edit</RouterLink> |
        <RouterLink to="/render">Render</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
