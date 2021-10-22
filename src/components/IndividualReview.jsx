import "../componentsCSS/individualreview.css";
import { useEffect, useState } from "react";
import { getSpecificReview, patchSpecificReviewVotes } from "../utils/axios";
import { useParams, useHistory } from "react-router-dom";
import Comments from "./Comments";
import dice from "../dice.png";
import upvote from "../up-arrow (2).png";
import loading from "../loading.gif";

const IndividualReview = () => {
  const [specificReview, setSpecificReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { review_id, category } = useParams();
  const [votes, setVotes] = useState(null);
  const [error, setError] = useState(null);

  let history = useHistory();

  useEffect(() => {
    getSpecificReview(review_id)
      .then((specificReviewFromApi) => {
        setSpecificReview(specificReviewFromApi);
        setIsLoading(false);
        setVotes(specificReview.votes);
      })
      .catch((err) => {
        if (err) {
          setError(err.message);
        }
      });
  }, [setSpecificReview, review_id, specificReview.votes]);

  if (isLoading)
    return (
      <section>
        <div className="LoadingSection">
          <img className="LoadingImg" src={loading} alt="loading"></img>
        </div>
      </section>
    );
  if (category !== specificReview.category) {
    setError("Request failed with status code 400");
    return <p>{error}</p>;
  }

  return (
    <section className="IndividualReview">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          <div className="BackButtonContainer">
            <button type="submit" className="BackButton">
              Back
            </button>
          </div>
        </form>
      </div>
      <div>
        {" "}
        <p className="ReviewTitle">{specificReview.title}</p>
        <p className="ReviewAddedInfo">
          This review was uploaded by {specificReview.owner} on{" "}
          {specificReview.created_at.substring(0, 10)}
        </p>
        <div className="IndividualReviewImgContainer">
          <img
            className="IndividualReviewImg"
            src={specificReview.review_img_url}
            alt={specificReview.title}
          ></img>
        </div>
      </div>
      <div className="GameInfo">
        <p>Game Designer: {specificReview.designer} </p>
        <p>Category: {specificReview.category}</p>
        <p>Review: {specificReview.review_body}</p>
      </div>
      <div className="LikeButtonContainer">
        <button
          className="LikeButton"
          onClick={(e) => {
            setVotes((currVotes) => {
              return (currVotes += 1);
            });
            patchSpecificReviewVotes(specificReview.review_id).catch((err) => {
              if (err) {
                setVotes((currVotes) => {
                  return (currVotes -= 1);
                });
                setError("Something went wrong, please try again");
              }
            });
          }}
        >
          <img className="DiceImg2" src={dice} alt="like button"></img>
          <img className="Upvote2" src={upvote} alt="like button"></img>
          {votes}
        </button>
      </div>
      <p className="VoteError">{error}</p>
      <Comments />
    </section>
  );
};

export default IndividualReview;
