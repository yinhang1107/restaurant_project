import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getPosts } from "../../../actions/posts";

const Pagination = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  const pages = _.range(1, numberOfPages + 1);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={page === 1 ? "page-item disabled" : "page-item"}>
          <Link
            className="page-link"
            to={`/news?page=${page - 1}`}
            tabIndex="-1"
            aria-disabled="true"
          >
            Previous
          </Link>
        </li>
        {pages.map((p) => (
          <li key={p} className={p === page ? "page-item active" : "page-item"}>
            <Link className="page-link" to={`/news?page=${p}`}>
              {p}
            </Link>
          </li>
        ))}
        <li
          className={
            page === numberOfPages ? "page-item disabled" : "page-item"
          }
        >
          <Link className="page-link" to={`/news?page=${page + 1}`}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
