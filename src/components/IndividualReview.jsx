import "../componentsCSS/individualreview.css";
import { useEffect, useState } from "react";
import { getSpecificReview, getReviewCreatorInfo } from "../utils/axios";
import { useParams, useHistory } from "react-router";
import likeButton from "../like.png";

const IndividualReview = () => {
  const [specificReview, setSpecificReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reviewCreatorInfo, setReviewCreatorInfo] = useState({});
  const { review_id } = useParams();

  let history = useHistory();

  useEffect(() => {
    getSpecificReview(review_id).then((specificReviewFromApi) => {
      setSpecificReview(specificReviewFromApi);
      setIsLoading(false);
    });
  }, [setSpecificReview, review_id]);

  useEffect(() => {
    getReviewCreatorInfo(specificReview.owner).then((userInfoFromApi) => {
      setReviewCreatorInfo(userInfoFromApi);
      setIsLoading(false);
    });
  }, [specificReview]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="IndividualReview">
      <div>
        <form
          className="BackButton"
          onSubmit={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          <button type="submit">Back</button>
        </form>
      </div>
      <div>
        {" "}
        <p>Game Title: {specificReview.title}</p>
        <img
          className="IndividualReviewImg"
          src={specificReview.review_img_url}
          alt={specificReview.title}
        ></img>
      </div>
      <div>
        <p className="ReviewAddedInfo">
          This review was uploaded by {specificReview.owner} on{" "}
          {specificReview.created_at.substring(0, 10)}
        </p>
        {/* <img
          className="ReviewCreatorImg"
          src={reviewCreatorInfo.avatar_url}
          alt={reviewCreatorInfo.avatar_url}
        ></img> */}
      </div>
      <div className="GameInfo">
        <p>Game Designer: {specificReview.designer} </p>
        <p>Category: {specificReview.category}</p>
        <p>Review: {specificReview.review_body}</p>
      </div>
      <button className="LikeButton">
        <img className="LikeImg" src={likeButton} alt="like button"></img>1
      </button>
    </section>
  );
};

export default IndividualReview;
