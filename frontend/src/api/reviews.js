import API from "./api";

export const ReviewAPI = {
  getMovieReviews: (movieId) => API.get(`/api/reviews/${movieId}`),

  create: (movieId, data) => API.post(`/api/reviews/${movieId}`, data),

  edit: (reviewId, data) => API.put(`/api/reviews/${reviewId}`, data),

  delete: (reviewId) => API.delete(`/api/reviews/${reviewId}`),

  like: (reviewId) => API.post(`/api/reviews/${reviewId}/like`),

  dislike: (reviewId) => API.post(`/api/reviews/${reviewId}/dislike`),

  reply: (reviewId, data) => API.post(`/api/reviews/${reviewId}/reply`, data),
};
