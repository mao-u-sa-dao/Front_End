import axiosClient from "../../../api/axiosClient";

const END_POINT = {
  CATEGORY: "v1/api/AdminCategory",
};
export const GetAllCategory = (page) => {
  return axiosClient.get(`${END_POINT.CATEGORY}/page=${page}`);
};
