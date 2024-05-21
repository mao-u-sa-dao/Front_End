import axiosClient from "../../../api/axiosClient";

const END_POINT = {
  AUTHOR: "v1/api/AdminAuthor",
};
export const GetAllAuthor = (page) => {
  return axiosClient.get(`${END_POINT.AUTHOR}/page=${page}`);
};
