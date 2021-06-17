import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Post from "./Post/Post";
import "./styles.css";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  return (
    <div className="container">
      {user && (
        <Link to="/news/new" className="btn btn-primary m-2">
          New
        </Link>
      )}
      <div className="posts">
        {posts.map((post) => (
          <Post key={post._id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
