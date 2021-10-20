import { useHistory, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../componentsCSS/reviewsbycategory.css";
import { getReviewsByCategory } from "../utils/axios";

const ReviewsByCategory = () => {
  const history = useHistory();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();
  const [sortBy, setSortBy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReviewsByCategory(category, sortBy)
      .then((reviewsFromApi) => {
        setReviews(reviewsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.message);
        }
      });
  }, [sortBy, category]);

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="ReviewsByCategory">
      <form
        className="BackButton"
        onSubmit={(e) => {
          e.preventDefault();
          history.push("/reviews");
        }}
      >
        <button type="submit">Back</button>
      </form>
      <p>Game reviews under</p>
      <p>{category}</p>
      <div className="SortBy">sort by</div>
      <div className="SortByButtons">
        <button onClick={() => setSortBy("created_at")}>date created</button>
        <button onClick={() => setSortBy("comment_count")}>
          comment count
        </button>
        <button onClick={() => setSortBy("votes")}>like count</button>
      </div>
      {reviews.map((review) => {
        const dateOnly = review.created_at.substring(0, 10);
        return (
          <Link
            to={`/reviews/${review.category}/${review.review_id}`}
            key={review.review_id}
          >
            <div key={review.review_id} className="AllReviewedGames">
              <p>Game Title: {review.title}</p>
              <p>Category: {review.category}</p>
              <p>Review Date: {dateOnly}</p>
              <p>Comments: {review.comment_count}</p>
              <p>Likes: {review.votes}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default ReviewsByCategory;
