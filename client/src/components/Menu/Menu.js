import React from "react";

import Items from "./Items/Items";
import Hero from "../Common/Hero/Hero";
import menuImage from "../../images/main_page.jpg";
import Footer from "../Common/Footer/Footer";

const Menu = () => {
  return (
    <div>
      <Hero
        backgroundImage={menuImage}
        heading1="Menu"
        heading2="The mission is simple: servce delicious, affordable food that guests will want to return week after week."
      />
      <div className="my-5">
        <Items />
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
