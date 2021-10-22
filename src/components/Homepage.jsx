import "../componentsCSS/homepage.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCategories } from "../utils/axios";
import LoggedIn from "./LoggedIn";
import AllReviewedGames from "./AllReviewedGames";
import loading from "../loading.gif";
import boardGameIllustration from "../boardgame.jpg";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryToSubmit, setCategoryToSubmit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let history = useHistory();

  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
      setIsLoading(false);
    });
  }, [setCategories]);

  if (isLoading)
    return (
      <section>
        <div className="LoadingSection">
          <img className="LoadingImg" src={loading} alt="loading"></img>
        </div>
      </section>
    );

  return (
    <section>
      <LoggedIn />
      <div className="Homepage">
        <p className="HomepageOpeningMainHeader">
          Hey there, <br></br> welcome to TableTop.
        </p>
        <p className="HomepageOpeningText">
          The go-to spot for board game reviews.
        </p>
        <img
          className="BoardGameIllustration"
          src={boardGameIllustration}
          alt="board game"
        ></img>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !categoryToSubmit
              ? setError("...Oops, you didn't submit a category!")
              : history.push(`reviews/${categoryToSubmit}`);
          }}
        >
          <div className="ReviewsByCategoryText">
            <label htmlFor="category-select">Find a review by category</label>
          </div>
          <div className="CategorySelectContainer">
            <select
              className="custom-select"
              onChange={(e) => setCategoryToSubmit(e.target.value)}
              name="categories"
              id="category-select"
            >
              <option value="">select category</option>
              {categories.map((category) => {
                return (
                  <option
                    className="SelectCategoryOptions"
                    key={category.slug}
                    value={category.slug}
                  >
                    {category.slug}
                  </option>
                );
              })}
            </select>
            <button className="SearchButton" type="submit">
              Search
            </button>
            <p className="SubmitError">{error}</p>
          </div>
        </form>
      </div>
      <AllReviewedGames />
    </section>
  );
};

export default Homepage;
