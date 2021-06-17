import React from "react";
import { useSelector } from "react-redux";

import Price from "./Price";
import PriceHotCold from "./PriceHotCold";
import Typeless from "./Typeless";

const Item = ({ type, selectedItems }) => {
  const user = useSelector((state) => state.user);

  const priceHotCold = [];
  selectedItems.forEach((item) => {
    if (!item.price && !priceHotCold.includes(item.type)) {
      priceHotCold.push(item.type);
    }
  });

  return (
    <>
      {type.name === "None" ? (
        <Typeless selectedItems={selectedItems} user={user} />
      ) : priceHotCold.includes(type) ? (
        <PriceHotCold type={type} selectedItems={selectedItems} user={user} />
      ) : (
        <Price type={type} selectedItems={selectedItems} user={user} />
      )}
    </>
  );
};

export default Item;
