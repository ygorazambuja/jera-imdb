<script lang="ts">
import { useUserStore } from "@/stores/user";
import { computed, Ref } from "vue";
import ProfileCard from "../components/ProfileCard.vue";
import VButton from "../components/VButton.vue";
import type { Profile } from "@/stores/user";
import { useRouter } from "vue-router";
export default {
  name: "ProfilesView",
  components: { ProfileCard, VButton },
  setup() {
    const { getProfiles, setLoggedProfile } = useUserStore();
    const { push } = useRouter();

    function createNewProfile() {
      console.log("createNewProfile");
    }

    function redirectToEditProfiles() {
      push({ name: "EditProfileView" });
    }

    function redirectToHomeView(event: Ref<Profile>) {
      console.log(event);
      setLoggedProfile(event);
    }

    const canCreateNewProfile = computed(() => getProfiles.length <= 4);
    return {
      getProfiles,
      canCreateNewProfile,
      createNewProfile,
      redirectToEditProfiles,

      redirectToHomeView,
    };
  },
};
</script>

<template>
  <div>
    <div class="title">
      <h1>Quem está assistindo ?</h1>
    </div>

    <div class="container">
      <div v-for="profile in getProfiles" :key="profile.id">
        <ProfileCard :profile="profile" @on-card-click="redirectToHomeView" />
      </div>
    </div>

    <div class="footer">
      <VButton
        :disabled="canCreateNewProfile"
        content="Criar Novo Perfil"
        @click="createNewProfile"
      />
      <VButton content="Editar Perfis" @click="redirectToEditProfiles" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 1.8rem;
  text-align: center;
}

.container {
  display: grid;
  padding: 24px;
}

.footer {
  display: flex;
  justify-content: center;
}
</style>
