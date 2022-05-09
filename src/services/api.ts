import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
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
