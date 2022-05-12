<script lang="ts">
import { useUserStore, type Profile } from "@/stores/user";
import { defineComponent } from "vue";
import VInput from "../components/VInput.vue";
import VButton from "../components/VButton.vue";
import { useToast } from "@/composables/useToast";
import { ArrowLeftIcon } from "@vue-icons/feather";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EditProfilesView",
  components: { VInput, VButton, ArrowLeftIcon },
  setup() {
    const { getProfiles, updateProfile, removeProfile } = useUserStore();

    const { successToast } = useToast();
    const { back } = useRouter();

    function saveProfile(profile: Profile) {
      updateProfile(profile);
      successToast("Perfil atualizado com sucesso!");
    }

    function handleRemoveProfile(profile: Profile) {
      removeProfile(profile.id);
      successToast("Perfil removido com sucesso!");
    }

    function handleGoBack() {
      back();
    }
    return {
      getProfiles,
      saveProfile,
      handleRemoveProfile,
      handleGoBack,
    };
  },
});
</script>

<template>
  <div class="edit-profile-container">
    <div class="title">
      <VButton content="Voltar" @click="handleGoBack">
        <ArrowLeftIcon size="24" />
      </VButton>
      <span>Edição de Perfis</span>
    </div>

    <div v-for="profile in getProfiles" :key="profile.id">
      <VInput label="Nome" :value="profile.name" v-model="profile.name" />
      <VInput
        label="Descrição"
        :value="profile.description"
        v-model="profile.description"
      />

      <div class="footer">
        <VButton content="Salvar" @click="saveProfile(profile)" />
        <VButton content="Excluir" @click="handleRemoveProfile(profile)" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  margin: 24px 0;

  span {
    font-size: 1.5rem;
    margin-left: 20px;
  }
}

.footer {
  display: flex;
  flex-direction: row;
}

.edit-profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
