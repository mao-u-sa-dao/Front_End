import axiosClient from "./axiosClient";

const END_POINT = {
  COMMENT: "v1/api/comment",
};
export const getCommentByIdApi = (id) => {
  return axiosClient.get(`${END_POINT.COMMENT}/${id}`);
};
export const postCommentApi = (commentData) => {
  return axiosClient.post(END_POINT.COMMENT, commentData);
};
