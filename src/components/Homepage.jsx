import "../componentsCSS/homepage.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCategories } from "../utils/axios";
import AllReviewedGames from "./AllReviewedGames";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryToSubmit, setCategoryToSubmit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let history = useHistory();

  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
      setIsLoading(false);
    });
  }, [setCategories]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="Homepage">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/reviews/${categoryToSubmit}`);
        }}
      >
        <label htmlFor="category-select">Reviews by category</label>
        <div>
          <select
            onChange={(e) => setCategoryToSubmit(e.target.value)}
            name="categories"
            id="category-select"
          >
            <option value="">select category</option>
            {categories.map((category) => {
              return (
                <option key={category.slug} value={category.slug}>
                  {category.slug}
                </option>
              );
            })}
          </select>
          <button type="submit">Submit</button>
        </div>
      </form>
      <AllReviewedGames />
    </section>
  );
};

export default Homepage;
