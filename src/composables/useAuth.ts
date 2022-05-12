import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export function useAuth() {
  const { loggedProfile } = useUserStore();

  const isLogged = !!loggedProfile.id;
  const { replace } = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    replace("/login");
  };

  return { isLogged, logout };
}
