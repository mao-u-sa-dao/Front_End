import axiosClient from "./axiosClient";

const END_POINT = {
  USER: "v1/api/Auth",
  INFORACCOUNT: "v1/api/InforAccount",
};
export const UserLogin = (userName, passWord) => {
  const params = new URLSearchParams({
    userName: userName,
    passWord: passWord,
  });

  return axiosClient.post(`${END_POINT.USER}/Login?${params}`);
};
export const UserInfor = (id) => {
  return axiosClient.get(`${END_POINT.INFORACCOUNT}/${id}`);
};
export const putInforUserApi = (id, InforUserData) => {
  return axiosClient.put(`${END_POINT.INFORACCOUNT}/${id}`, InforUserData);
};
