import "../componentsCSS/individualreview.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificReviewComments } from "../utils/axios";
import PostComment from "./PostComment";
import loading from "../loading.gif";

const Comments = () => {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsVisible, setCommentsToVisible] = useState(false);

  useEffect(() => {
    getSpecificReviewComments(review_id)
      .then((specificReviewCommentsFromApi) => {
        setComments(specificReviewCommentsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.message);
        }
      });
  }, [review_id]);

  if (error) return <p>{error}</p>;
  if (isLoading)
    return (
      <section>
        <div className="LoadingSection">
          <img className="LoadingImg" src={loading} alt="loading"></img>
        </div>
      </section>
    );
  if (commentsVisible)
    return (
      <section className="CommentsSection">
        <button
          className="CommentsButton"
          onClick={() => setCommentsToVisible(false)}
        >
          {comments.length} Comments
        </button>
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="IndividualComments">
              <p>
                posted by {comment.author} on{" "}
                {comment.created_at?.substring(0, 10)}
              </p>
              <p>{comment.body}</p>
            </div>
          );
        })}
        <div>
          <PostComment setComments={setComments} />
        </div>
      </section>
    );

  return (
    <section className="CommentsSection">
      <button
        className="CommentsButton"
        onClick={() => setCommentsToVisible(true)}
      >
        {comments.length} Comments
      </button>
    </section>
  );
};

export default Comments;
