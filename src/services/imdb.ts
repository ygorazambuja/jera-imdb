import { API_KEY, BASE_URL, IMAGE_URL } from "../utils/constants";
import axios from "axios";
import type { IMovie } from "@/interfaces";

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

export async function asyncFetchMoviesById(ids: number[]) {
  const movies: IMovie[] = [];
  await new Promise((resolve) => {
    ids.forEach(async (movieId) => {
      const data = (await getMovieById(String(movieId))) as IMovie;
      movies.push(data);
    });
    return resolve(movies);
  });
}
