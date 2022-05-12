import type { User } from "@/stores/user";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function doLogin(username: string, password: string) {
  const { data } = await api.get(`/users?username=${username}`);

  if (data.length === 0) {
    throw new Error("User not found");
  }

  const user = data[0];

  if (user.password !== password) {
    throw new Error("Password is incorrect");
  }

  return user;
}

export async function createNewUser(user: Partial<User>) {
  const initialData = {
    ...user,
    id: uuidv4(),
    profiles: [
      {
        id: uuidv4(),
        name: "Default",
        description: "Default profile",
        watchedList: [],
        watchList: [],
      },
    ],
  };

  return await api.post("/users", initialData);
}
