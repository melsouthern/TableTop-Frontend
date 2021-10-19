import { getAllReviewedGames } from "../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllReviewedGames = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllReviewedGames().then((allReviewsFromApi) => {
      setReviews(allReviewsFromApi);
      setIsLoading(false);
    });
  }, [setReviews]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <p>All reviewed games</p>
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
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default AllReviewedGames;
