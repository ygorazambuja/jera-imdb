<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
* {
  font-family: "Nunito", sans-serif;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-color);
}

span {
  color: var(--text-color);
}

:root {
  --jera-green: #0db551;
  --bg-color: #333;
  --text-color: #fff;
}
</style>
