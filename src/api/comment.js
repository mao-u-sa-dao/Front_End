import axiosClient from "./axiosClient";

const END_POINT = {
  COMMENT: "v1/api/comment",
};
export const getCommentByIdApi = (id, page) => {
  return axiosClient.get(`${END_POINT.COMMENT}/${id}/page=${page}`);
};
export const postCommentApi = (commentData) => {
  return axiosClient.post(END_POINT.COMMENT, commentData);
};
