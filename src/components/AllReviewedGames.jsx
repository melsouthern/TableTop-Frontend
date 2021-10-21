import { getAllReviewedGames } from "../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dice from "../dice.png";
import upvote from "../up-arrow.png";
import loading from "../loading.gif";

const AllReviewedGames = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllReviewedGames().then((allReviewsFromApi) => {
      setReviews(allReviewsFromApi);
      setIsLoading(false);
    });
  }, [setReviews]);

  if (isLoading)
    return (
      <section>
        <div className="LoadingSection">
          <img className="LoadingImg" src={loading} alt="loading"></img>;
        </div>
      </section>
    );

  return (
    <section>
      <div className="AllReviewedGames">
        {/* <p className="AllGameReviewsText">All game reviews</p> */}
        {reviews.map((review) => {
          const dateOnly = review.created_at.substring(0, 10);
          return (
            <Link
              to={`/reviews/${review.category}/${review.review_id}`}
              key={review.review_id}
            >
              <div
                key={review.review_id}
                className="AllIndividualReviewedGames"
              >
                <div>
                  <p className="IndividualReviewTitle">{review.title}</p>
                  <p className="IndividualReviewInfo">
                    {review.category} game | posted on {dateOnly}
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
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AllReviewedGames;
