<script lang="ts">
import type { ComponentPropsOptions, SetupContext } from "vue";

type Props = {
  label: string;
  type?: string;
  modelValue: string;
} & ComponentPropsOptions;

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "text",
      validator: (value: string) => ["text", "password"].includes(value),
    },
  },

  setup(props: Props, { emit }: SetupContext) {
    const updateInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return {
      props,
      updateInput,
    };
  },
};
</script>

<template>
  <div class="container">
    <label class="container_label">{{ props.label }} </label>
    <input
      class="container_input"
      :type="props.type"
      :value="props.modelValue"
      @input="updateInput"
    />
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  &_label {
    font-size: 1.1rem;
  }

  &_input {
    font-size: 1rem;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
}
</style>
