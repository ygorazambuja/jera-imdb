<script lang="ts">
import { defineComponent, reactive } from "vue";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { useUserStore } from "@/stores/user";

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreateNewProfileView",
  components: {
    VButton,
    VInput,
  },
  setup() {
    const self = reactive({
      name: "",
      description: "",
    });

    const { addNewProfile } = useUserStore();
    const { push } = useRouter();

    function handleSubmit() {
      addNewProfile({
        id: uuidv4(),
        name: self.name,
        description: self.description,
        watchList: [],
        watchedList: [],
      });

      redirectToProfilesView();
    }

    function redirectToProfilesView() {
      push({ name: "ProfilesView" });
    }

    return {
      handleSubmit,
      self,
    };
  },
});
</script>

<template>
  <div class="container">
    <h1>Criar novo Perfil</h1>

    <form @submit.prevent="handleSubmit">
      <VInput label="Nome" v-model="self.name" />
      <VInput label="Descrição" v-model="self.description" />
      <VButton content="Criar conta" @submit="handleSubmit" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;

  & form {
    margin-top: 20px;
  }
}
</style>
