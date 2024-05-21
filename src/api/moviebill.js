import axiosClient from "./axiosClient";

const END_POINT = {
  MOVIEBILL: "v1/api/MovieBill",
};
export const postBill = (billData) => {
  return axiosClient.post(END_POINT.MOVIEBILL, billData);
};
