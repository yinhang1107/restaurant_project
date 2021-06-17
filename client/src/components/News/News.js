import React from "react";
import { useLocation } from "react-router-dom";

import Pagination from "../Common/Pagination/Pagination";
import Posts from "./Posts/Posts";
import Footer from "../Common/Footer/Footer";
import Hero from "../Common/Hero/Hero";
import newsImage from "../../images/news_image.jpg";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const News = () => {
  const query = useQuery();

  const page = query.get("page") || 1;
  return (
    <>
      <Hero backgroundImage={newsImage} heading1="News" />
      <div className="d-flex flex-column align-items-center">
        <Posts />
        <Pagination page={Number(page)} />
      </div>
      <Footer />
    </>
  );
};

export default News;
