<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    return {
      props,
    };
  },
});
</script>

<template>
  <button class="container" :disabled="props.disabled">
    <slot />
    {{ props.content }}
  </button>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;

  background-color: var(--jera-green);
  border: 0px;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(0.96);
    transform: translateY(-2px);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
}
</style>
