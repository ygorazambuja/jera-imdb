<script lang="ts">
import { reactive } from "vue";
import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";
import { doLogin } from "@/services/api";
import { useToast } from "@/composables/useToast";
import { useUserStore } from "@/stores/user";
import type { User } from "@/stores/user";
import { useRouter } from "vue-router";
export default {
  components: {
    VInput,
    VButton,
  },
  setup() {
    const self = reactive({
      login: "",
      password: "",
    });

    const { setUser } = useUserStore();
    const { push } = useRouter();

    const { errorToast, successToast } = useToast();
    async function handleSubmit() {
      try {
        const data = await doLogin(self.login, self.password);
        if (data) handleSaveUserStore(data);
      } catch (error: any) {
        errorToast(error.message);
      }
    }

    function handleSaveUserStore(data: User) {
      setUser(data);
      redirectToProfilesView();
    }

    function redirectToProfilesView() {
      successToast("Bem vindo, redirecionando para a pagina de Perfis");
      push({ name: "ProfilesView" });
    }

    function handleCreateAccount() {
      push({ name: "CreateNewAccountView" });
    }

    return {
      self,
      handleSubmit,
      handleCreateAccount,
    };
  },
};
</script>

<template>
  <div class="loginContainer">
    <VInput label="Login" v-model="self.login" data-cy="login" />
    <VInput
      label="Senha"
      type="password"
      v-model="self.password"
      data-cy="password"
    />
    <VButton content="Entrar" @click="handleSubmit" data-cy="loginButton">
    </VButton>
    <VButton content="Criar conta" @click="handleCreateAccount"> </VButton>
  </div>
</template>

<style lang="scss" scoped>
.loginContainer {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;

  button {
    margin-top: 16px;
  }
}
</style>
