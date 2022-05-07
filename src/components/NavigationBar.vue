<script lang="ts">
export default {};
</script>

<template>
  <nav class="navigation-list">
    <router-link to="/">Home</router-link>
    <router-link to="/recomendados">Recomendados</router-link>
    <router-link to="/favoritos">Para Assistir</router-link>
    <router-link to="/assistidos">Assistidos</router-link>
  </nav>
</template>

<style lang="scss">
.navigation-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  a {
    color: white;
    text-decoration: none;
    padding: 12px;
    transition: all 0.4s;

    &:hover {
      color: #ff0000;
    }
  }
}
</style>
