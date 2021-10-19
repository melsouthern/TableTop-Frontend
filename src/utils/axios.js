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
