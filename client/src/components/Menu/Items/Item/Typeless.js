import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteItem } from "../../../../actions/items";
import "./styles.css";

const Typeless = ({ selectedItems, user }) => {
  const dispatch = useDispatch();
  return (
    <>
      <table className="table menu__table">
        <thead>
          <tr>
            <th className="menu__title__price" scope="col">
              Name
            </th>
            <th className="menu__price" scope="col">
              Price (RM)
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => {
            return (
              <tr key={item._id}>
                {user && (
                  <React.Fragment>
                    <td>
                      <Link to={`/menu/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="menu__price">{item.price}</td>
                    <td>
                      <button
                        onClick={() => dispatch(deleteItem(item._id))}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </React.Fragment>
                )}
                {!user && (
                  <React.Fragment>
                    <td className="menu__item__name">{item.name}</td>
                    <td className="menu__price">{item.price}</td>
                  </React.Fragment>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Typeless;
