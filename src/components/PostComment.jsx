import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { postComment } from "../utils/axios";
import { UserContext } from "../contexts/User";
import { useContext } from "react";

const PostComment = ({ setComments }) => {
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);
  const { review_id } = useParams();
  const { user } = useContext(UserContext);
  const history = useHistory();

  if (!user) {
    return (
      <div className="LogButtonContainer">
        <button className="LogButton" onClick={() => history.push("/login")}>
          Log in to post a comment
        </button>
      </div>
    );
  }

  return (
    <div className="PostCommentContainer">
      <form
        className="PostComment"
        onSubmit={async (e) => {
          setError(null);
          e.preventDefault();
          if (!comment) {
            setError("You haven't written anything. Try again!");
            return;
          }
          setError(null);
          try {
            const addedComment = await postComment(review_id, user[1], comment);
            setError("Post successful!");
            e.target.reset();
            setComment(null);
            setComments((currComments) => {
              const currCommentsCopy = [...currComments];
              currCommentsCopy.push(addedComment.comment);
              return currCommentsCopy;
            });
          } catch (err) {
            if (err) {
              setError(
                "There was a problem uploading your post, please try again"
              );
              return;
            }
          }
        }}
      >
        <div>
          <div>
            <p className="PostCommentHeader">Post a comment</p>
            <div className="mb-3">
              <div className="mb-3"></div>
              <label htmlFor="post-comment" className="LoggedInAs">
                Logged in as {user[1]}
              </label>
              <textarea
                className="form-control"
                id="post-comment"
                rows="3"
                placeholder="Write a comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="SubmitButtonContainer">
            <button className="SubmitButton">Submit</button>
          </div>
          <p className="SubmitError">{error}</p>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
