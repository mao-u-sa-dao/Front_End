import axiosClient from "../../../api/axiosClient";

const END_POINT = {
  USER: "v1/api/AdminAccountUser",
};
export const GetAllUser = (page) => {
  return axiosClient.get(`${END_POINT.USER}/page=${page}`);
};
export const GetUserById = (id) => {
  return axiosClient.get(`${END_POINT.USER}/${id}`);
};
export const putUserApi = (UserData) => {
  return axiosClient.put(`${END_POINT.USER}/`, UserData);
};
