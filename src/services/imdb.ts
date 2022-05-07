import { API_KEY, BASE_URL, IMAGE_URL } from "../utils/constants";
import axios from "axios";

export async function getMoviesByTitle(title: string) {
  const url = `${BASE_URL}/search/movie?${API_KEY}&query=${title}`;

  const { data } = await axios.get(url);
  return data;
}

export async function getMovieById(id: string) {
  const url = `${BASE_URL}/movie/${id}?${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getRecommendedMovies(ids: number[]) {
  const url = `${BASE_URL}/movie/${ids.join(",")}/recommendations?${API_KEY}`;

  const { data } = await axios.get(url);
  return data;
}

export function getImageFullURL(path: string) {
  return `${IMAGE_URL}${path}`;
}
