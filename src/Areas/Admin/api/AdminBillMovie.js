import axiosClient from "../../../api/axiosClient";

const END_POINT = {
  COMMENT: "v1/api/AdminBillMovie",
};
export const GetAllBillMovie = (page) => {
  return axiosClient.get(`${END_POINT.COMMENT}/page=${page}`);
};
