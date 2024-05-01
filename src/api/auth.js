import axiosClient from "./axiosClient";

const END_POINT = {
  USER: "v1/api/Auth",
};
export const UserLogin = (userName, passWord) => {
  const params = new URLSearchParams({
    userName: userName,
    passWord: passWord,
  });

  return axiosClient.post(`${END_POINT.USER}/Login?${params}`);
};
