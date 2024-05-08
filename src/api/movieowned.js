import axiosClient from "./axiosClient";

const END_POINT = {
  MOVIE_OWNED: "/v1/api/MoviesUserOwned",
};
export const GetMovieOwnedByIdAccount = (id) => {
  return axiosClient.get(`${END_POINT.MOVIE_OWNED}/${id}`);
};
export const AddMovieOwned = (data) => {
  return axiosClient.post(END_POINT.MOVIE_OWNED, data);
};
