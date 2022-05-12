<script lang="ts">
import { defineComponent, type SetupContext } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    dataCy: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
      validator: (value: string) => ["text", "password"].includes(value),
    },
  },

  setup(props, { emit }: SetupContext) {
    const updateInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return {
      props,
      updateInput,
    };
  },
});
</script>

<template>
  <div class="input-container">
    <label class="input-container_label">{{ props.label }} </label>
    <input
      :data-cy="props.dataCy"
      class="input-container_input"
      :type="props.type"
      :value="props.modelValue"
      @input="updateInput"
    />
  </div>
</template>

<style lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;

  &_label {
    font-size: 1.1rem;
    font-weight: bold;
    color: #999;
    margin-bottom: 0.5rem;
  }

  &_input {
    font-size: 1rem;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
}
</style>
