<script lang="ts">
import type { Profile } from "@/stores/user";
import { toRefs, defineComponent, type SetupContext } from "vue";

export default defineComponent({
  name: "ProfileCard",
  props: {
    profile: {
      type: Object as () => Profile,
    },
  },
  setup(props, { emit }: SetupContext) {
    function handleCardClick() {
      emit("onCardClick", props.profile);
    }

    return {
      ...toRefs(props),
      handleCardClick,
    };
  },
});
</script>

<template>
  <div class="profile-card">
    <div class="profile-card__avatar" @click="handleCardClick">
      <img src="https://i.pravatar.cc/300" alt="" />
    </div>
    <span class="profile-card__title"> {{ profile?.name }}</span>
  </div>
</template>

<style scoped lang="scss">
.profile-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__avatar {
    & img {
      border-radius: 25%;
      width: 300px;
      height: 300px;

      transition: all 0.5s ease;

      &:hover {
        cursor: pointer;
        filter: brightness(0.5);
        transform: translateY(-5px);
      }
    }
  }

  &__title {
    font-size: 2rem;
  }
}
</style>
