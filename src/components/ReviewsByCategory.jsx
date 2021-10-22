import { useHistory, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../componentsCSS/reviewsbycategory.css";
import { getReviewsByCategory } from "../utils/axios";
import loading from "../loading.gif";
import dice from "../dice.png";
import upvote from "../up-arrow.png";

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
  if (isLoading)
    return (
      <section>
        <div className="LoadingSection">
          <img className="LoadingImg" src={loading} alt="loading"></img>;
        </div>
      </section>
    );

  return (
    <section className="ReviewsByCategory">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push("/reviews");
        }}
      >
        <div className="BackButtonContainer">
          {" "}
          <button className="BackButton" type="submit">
            Back
          </button>
        </div>
      </form>
      <p className="GameReviewsUnder">Game reviews under</p>
      <p className="Category">{category}</p>
      <div className="SortByDivider">
        <div className="SortBy">sort by</div>
      </div>
      <div className="SortByButtons">
        <button className="CreatedAt" onClick={() => setSortBy("created_at")}>
          date created
        </button>
        <button
          className="CommentCount"
          onClick={() => setSortBy("comment_count")}
        >
          comment count
        </button>
        <button className="LikeCount" onClick={() => setSortBy("votes")}>
          dice votes
        </button>
      </div>
      <div className="AllReviewedGamesByCategory">
        {reviews.map((review) => {
          const dateOnly = review.created_at.substring(0, 10);
          return (
            <Link
              to={`/reviews/${review.category}/${review.review_id}`}
              key={review.review_id}
            >
              <div
                key={review.review_id}
                className="AllIndividualReviewedGamesByCategory"
              >
                <p className="IndividualReviewTitle">{review.title}</p>
                <p className="IndividualReviewInfo">
                  Category: {review.category}
                  <br></br>
                  Review Date: {dateOnly} <br></br>
                  Uploaded By: {review.owner} <br></br>
                  Comments: {review.comment_count}
                </p>
                <hr className="Divider"></hr>
                <div className="DiceContainer">
                  <img
                    className="DiceImgIndividualReviews"
                    src={dice}
                    alt="dice"
                  ></img>
                  <img
                    className="UpvoteImgIndividualReviews"
                    src={upvote}
                    alt="upvote"
                  ></img>
                  <div className="UpvoteCount">{review.votes} Dice Votes</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewsByCategory;
