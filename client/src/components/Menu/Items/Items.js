import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Tab from "../../Common/Tab";
import Item from "./Item/Item";
import { getCategories, deleteCategory } from "../../../actions/categories";
import { getItems } from "../../../actions/items";
import { getTypes, deleteType } from "../../../actions/types";
import DropDownList from "../../Common/DropDownList";

const Items = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { items } = useSelector((state) => state.items);
  const { types } = useSelector((state) => state.types);
  const user = useSelector((state) => state.user);

  const [selectedCategory, setSelectedCategory] = useState({ name: "" });

  const selectedItems = items.filter(
    (i) => i.category._id === selectedCategory._id
  );

  const selectedTypes = [];
  const getSelectedTypes = () => {
    selectedItems.forEach((i) => {
      if (!selectedTypes.includes(i.type.name)) {
        selectedTypes.push(i.type);
      }
    });
  };
  getSelectedTypes();
  useEffect(() => {
    dispatch(getItems());
    dispatch(getTypes());
    dispatch(getCategories());
  }, [dispatch]);

  const handleSelect = (category) => {
    setSelectedCategory(category);
  };

  if (categories.length > 0 && !selectedCategory.name) {
    setSelectedCategory(categories[0]);
  }

  return (
    <div className="container">
      {user && (
        <>
          <Link to="/menu/new" className="btn btn-primary m-2">
            New
          </Link>
          <DropDownList
            name="categories"
            nameSingular="category"
            label="Categories"
            data={categories}
            onDelete={deleteCategory}
          />
          <DropDownList
            name="types"
            nameSingular="type"
            label="Types"
            data={types}
            onDelete={deleteType}
          />
        </>
      )}
      <Tab
        items={categories}
        onItemSelect={handleSelect}
        selectedItem={selectedCategory}
      />
      {selectedTypes.map((type) => {
        return (
          <Item key={type._id} type={type} selectedItems={selectedItems} />
        );
      })}
    </div>
  );
};

export default Items;
