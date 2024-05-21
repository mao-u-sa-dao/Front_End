import axiosClient from "../../../api/axiosClient";

const END_POINT = {
  MOVIELIST: "v1/api/AdminListMovie",
};
export const GetAllMovieList = (page) => {
  return axiosClient.get(`${END_POINT.MOVIELIST}/page=${page}`);
};
