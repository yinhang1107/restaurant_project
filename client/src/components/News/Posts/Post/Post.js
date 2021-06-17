import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost } from "../../../../actions/posts";

const Post = ({ post, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="post d-flex flex-column align-items-center my-5 py-3 ">
      <img
        className="img-fluid"
        style={{ maxHeight: "350px" }}
        src={post.selectedFile}
        alt={post.title}
      />
      <div className="mt-4 text-secondary fw-bold">
        {new Date(post.createdAt).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <h2 className="mt-3 mb-2 fs-3">{post.title}</h2>
      <p className="fs-6 text-secondary w-75 text-center">{post.description}</p>
      {user && (
        <div className="d-flex">
          <button
            className="btn btn-primary me-2"
            onClick={() => history.push(`/news/${post._id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deletePost(post._id))}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
