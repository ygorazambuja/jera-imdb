<script lang="ts">
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationBar",
  setup() {
    const { loggedProfile } = useUserStore();
    return {
      loggedProfile,
    };
  },
});
</script>

<template>
  <nav class="navigation-list">
    <div>Jera-IMDB</div>
    <div class="navigation-list__profile">
      <span>{{ loggedProfile.name }}</span>
      <img src="https://i.pravatar.cc/300" alt="Avatar" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navigation-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  &__profile {
    display: flex;
    align-items: center;

    & span {
      font-size: 1.2rem;
      font-weight: bold;
      margin-right: 12px;
    }

    & img {
      border-radius: 25%;
      width: 50px;
      height: 50px;
    }
  }

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
