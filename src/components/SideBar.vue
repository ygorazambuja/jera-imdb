<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { GENRES } from "@/utils/constants";
import { useSideBarStore } from "@/stores/sidebar";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "SideBar",
  setup() {
    const { push } = useRouter();

    const { toggleSideBar } = useSideBarStore();
    const { isOpen } = storeToRefs(useSideBarStore());

    function handleRedirectToGenre(genre: string | number) {
      push(`/genero/${genre}`);
      toggleSideBar();
    }

    return { GENRES, handleRedirectToGenre, isOpen, toggleSideBar };
  },
});
</script>

<template>
  <div class="sidebar" v-if="isOpen">
    <h1>Jera-IMDB</h1>

    <ul class="sidebar-list">
      <li class="sidebar-list__item">
        <router-link to="/recomendados" @click="toggleSideBar"> Recommended </router-link>
      </li>
      <li class="sidebar-list__item">
        <router-link to="/assistidos" @click="toggleSideBar"> Watched </router-link>
      </li>
      <li class="sidebar-list__item">
        <router-link to="/para-assistir" @click="toggleSideBar"> Watch List </router-link>
      </li>

      <li class="sidebar-list__item" v-for="(item, index) in GENRES" :key="index">
        <a class="sidebar-list__link" @click="handleRedirectToGenre(item.id)">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 200px;
  background-color: var(--jera-green);
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 100;

  h1 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      margin-bottom: 10px;

      transition: all 0.3s ease;

      &:hover {
        cursor: pointer;
        border-bottom: 1px solid white;
        border-radius: 8%;
      }

      a {
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 10px;

        transition: all 0.3s ease;

        &:hover {
          cursor: pointer;
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
