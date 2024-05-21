import axiosClient from "./axiosClient";

const END_POINT = {
  CATEGORY: "v1/api/moviecategory",
};
export const getCategory = () => {
  return axiosClient.get(END_POINT.CATEGORY);
};
