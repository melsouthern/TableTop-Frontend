import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://mels-board-games-api.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  return data.categories;
};

export const getAllReviewedGames = async () => {
  const { data } = await gamesApi.get("/reviews?sort_by=created_at");
  return data.reviews;
};

export const getReviewsByCategory = async (category, sortBy) => {
  const { data } = await gamesApi.get("/reviews", {
    params: { category: category, sort_by: sortBy },
  });
  return data.reviews;
};

export const getSpecificReview = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}`);
  return data.review;
};

export const patchSpecificReviewVotes = async (review_id) => {
  const { data } = await gamesApi.patch(`/reviews/${review_id}`, {
    inc_votes: 1,
  });
  return data;
};

export const getSpecificReviewComments = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}/comments`);
  return data.comments;
};

export const getUsers = async (username) => {
  const { data } = await gamesApi.get(`/users/${username}`);
  return data.user;
};

export const postComment = async (review_id, username, comment) => {
  const { data } = await gamesApi.post(`/reviews/${review_id}/comments`, {
    username: username,
    body: comment,
  });
  return data;
};
