import { useUserStore } from "@/stores/user";

export function useAuth() {
  const { loggedProfile } = useUserStore();

  const isLogged = !!loggedProfile.id;

  const logout = () => {
    localStorage.removeItem("user");
  };

  return { isLogged, logout };
}
