import { useState } from "react";
import { getUsers } from "../utils/axios";
import { useParams, useHistory } from "react-router-dom";
import { postComment } from "../utils/axios";
import { UserContext } from "../contexts/User";
import { useContext } from "react";

const PostComment = ({ setComments }) => {
  const [username, setUsername] = useState(null);
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);
  const { review_id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  if (!user) {
    return (
      <button onClick={() => history.push("/login")}>
        Log in to post a comment
      </button>
    );
  }

  return (
    <div>
      <p>Post a comment</p>
      <form
        onSubmit={async (e) => {
          setError(null);
          e.preventDefault();
          if (!comment || !username) {
            setError("All fields must be filled in");
            return;
          }
          setError(null);
          try {
            await getUsers(username);
          } catch (err) {
            setError("Username provided does not exist");
            return;
          }
          try {
            const addedComment = await postComment(
              review_id,
              username,
              comment
            );
            setError("Post successful!");
            e.target.reset();
            setComment(null);
            setUsername(null);
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
        className="PostComment"
      >
        <label htmlFor="username-input">Username</label>
        <input
          id="username-input"
          type="text"
          placeholder="e.g 'jessjelly'"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <br></br>
        <label htmlFor="post-comment">Comment</label>
        <input
          id="post-comment"
          type="text"
          placeholder="write your comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <br></br>
        <button type="submit">Post</button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default PostComment;
