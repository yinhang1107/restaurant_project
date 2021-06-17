import React from "react";

const Tab = ({ items, onItemSelect, selectedItem }) => {
  return (
    <>
      <ul className="nav nav-pills mb-3">
        {items.map((item) => {
          return (
            <li key={item._id} className="nav-item">
              <button
                id="tab"
                className={
                  selectedItem._id === item._id
                    ? "tab btn m-1 nav-link active text-white"
                    : "tab btn btn-secondary m-1 nav-link text-white bg-secondary"
                }
                onClick={() => onItemSelect(item)}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tab;
