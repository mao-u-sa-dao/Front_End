import axiosClient from "./axiosClient";

const END_POINT = {
  LISTSMOVIE: "/v1/api/MoviesList",
  MOVIE: "/v1/api/Movie",
};
export const getMoviesListApi = () => {
  return axiosClient.get(`${END_POINT.LISTSMOVIE}`);
};
export const getMoviesListByCategoryApi = (id) => {
  return axiosClient.get(`${END_POINT.LISTSMOVIE}/${id}`);
};
export const getMovieByIdApi = (id) => {
  return axiosClient.get(`${END_POINT.MOVIE}/${id}`);
};
