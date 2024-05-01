import axiosClient from "./axiosClient";

const END_POINT = {
  LISTSMOVIE: "/v1/api/MoviesList",
  LISTSMOVIE_BY_CATEGORY: "/v1/api/MoviesList/category",
  MOVIE: "/v1/api/Movie",
};
export const getMoviesListApi = () => {
  return axiosClient.get(`${END_POINT.LISTSMOVIE}`);
};
export const getMoviesListApiById = (id) => {
  return axiosClient.get(`${END_POINT.LISTSMOVIE}/${id}`);
};
export const getMoviesListByCategoryApi = (categoryId) => {
  return axiosClient.get(`${END_POINT.LISTSMOVIE_BY_CATEGORY}/${categoryId}`);
};
export const getMovieByIdApi = (id) => {
  return axiosClient.get(`${END_POINT.MOVIE}/${id}`);
};
export const getMovieByPartApi = (id, part) => {
  return axiosClient.get(`${END_POINT.MOVIE}/${id}/${part}`);
};
