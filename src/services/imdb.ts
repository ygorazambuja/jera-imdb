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

export async function asyncFetchAllMovieGender() {
  const url = `${BASE_URL}/genre/movie/list?${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
}

export async function asyncFetchGetAllTrendingMovies() {
  const url = `${BASE_URL}/trending/movie/day?${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
}

export async function asyncFetchGetAllMoviesByGenres(
  genderId: number | string,
  page = 1
) {
  const url = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${genderId}&page=${page}`;
  const { data } = await axios.get(url);
  return data;
}

export async function asyncFetchAllRecommendations(id: number | string) {
  const url = `${BASE_URL}/movie/${id}/recommendations?${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
}
