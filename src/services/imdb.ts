import { API_KEY, BASE_URL } from "../utils/constants";
import axios from "axios";

export async function getMoviesByTitle(title: string) {
  const url = `${BASE_URL}/search/movie?${API_KEY}&query=${title}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
}
