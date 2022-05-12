<script lang="ts">
import { useUserStore } from "@/stores/user";
import { defineComponent } from "vue";
import { MenuIcon } from "@vue-icons/feather";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NavigationBar",
  components: {
    MenuIcon,
  },
  setup() {
    const { loggedProfile } = useUserStore();

    const { push } = useRouter();

    function handleRedirectToProfile() {
      push("/perfis");
    }

    return {
      loggedProfile,

      handleRedirectToProfile,
    };
  },
});
</script>

<template>
  <nav class="navigation-list">
    <div class="navigation-list__title">
      <span>
        <MenuIcon size="24" />
      </span>
      <span>Jera-IMDB</span>
    </div>
    <div class="navigation-list__profile">
      <span>{{ loggedProfile.name }}</span>
      <img src="https://i.pravatar.cc/300" alt="Avatar" @click="handleRedirectToProfile" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navigation-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  width: 100%;

  background-color: var(--jera-green);

  .navigation-list__title {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0 12px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;

      &:hover {
        cursor: pointer;
      }
    }
  }

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
      margin-right: 8px;
      padding: 8px;

      transition: all 0.2s;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
        transform: scale(1.1);
      }
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
