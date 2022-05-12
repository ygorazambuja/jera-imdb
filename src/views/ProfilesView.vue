<script lang="ts">
import { useUserStore } from "@/stores/user";
import { computed, defineComponent } from "vue";
import ProfileCard from "../components/ProfileCard.vue";
import VButton from "../components/VButton.vue";
import { useRouter } from "vue-router";

import type { Profile } from "@/stores/user";
import type { Ref } from "vue";

export default defineComponent({
  name: "ProfilesView",
  components: { ProfileCard, VButton },
  setup() {
    const { getProfiles, setLoggedProfile } = useUserStore();
    const { push } = useRouter();

    function createNewProfile() {
      push({ name: "CreateNewProfileView" });
    }

    function redirectToEditProfiles() {
      push({ name: "EditProfileView" });
    }

    function redirectToHomeView(event: Profile) {
      setLoggedProfile(event);

      push({ name: "HomeView" });
    }

    const canCreateNewProfile = computed(() => getProfiles.length < 4);

    return {
      getProfiles,
      canCreateNewProfile,
      createNewProfile,
      redirectToEditProfiles,
      redirectToHomeView,
    };
  },
});
</script>

<template>
  <div>
    <div class="title">
      <span>Quem está assistindo ?</span>
    </div>

    <div class="profile-container">
      <template v-for="profile in getProfiles" :key="profile.id">
        <ProfileCard :profile="profile" @on-card-click="redirectToHomeView" />
      </template>
    </div>

    <div class="footer">
      <VButton
        :disabled="!canCreateNewProfile"
        content="Criar Novo Perfil"
        @click="createNewProfile"
      />
      <VButton content="Editar Perfis" @click="redirectToEditProfiles" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin: 12px;
  font-size: 1.5rem;
  text-align: center;
}

.profile-container {
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  justify-content: space-around;
}

.footer {
  display: flex;
  justify-content: space-around;
}
</style>
