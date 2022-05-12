<script lang="ts">
import { defineComponent, reactive } from "vue";
import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";
import { createNewUser } from "@/services/api";
import { useToast } from "@/composables/useToast";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreateNewAccountView",
  components: { VInput, VButton },
  setup() {
    const self = reactive({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    const { successToast } = useToast();

    const { push } = useRouter();

    async function handleSubmit() {
      if (self.password !== self.confirmPassword) {
        alert("As senhas não conferem");
        return;
      }

      await createNewUser({
        name: self.name,
        username: self.username,
        password: self.password,
      });

      successToast("Usuário criado com sucesso");
      push({ name: "LoginView" });
    }

    return {
      self,
      handleSubmit,
    };
  },
});
</script>

<template>
  <div class="container">
    <h1>Criar nova conta</h1>

    <form @submit.prevent="handleSubmit">
      <VInput label="Nome" v-model="self.name" />
      <VInput label="Login" v-model="self.username" />
      <VInput label="Senha" type="password" v-model="self.password" />
      <VInput label="Confirmar senha" type="password" v-model="self.confirmPassword" />
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
  max-width: 400px;
  margin: 0 auto;
}
</style>
