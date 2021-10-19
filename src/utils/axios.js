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

export const getReviewCreatorInfo = async (username) => {
  const { data } = await gamesApi.get(`/users/${username}`);
  return data.user;
};
