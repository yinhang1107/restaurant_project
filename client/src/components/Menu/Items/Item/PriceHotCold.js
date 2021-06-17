import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteItem } from "../../../../actions/items";

const PriceHotAndCold = ({ type, selectedItems, user }) => {
  const dispatch = useDispatch();

  return (
    <>
      <h3 className="menu__type__name">{type.name}</h3>
      <table className="table menu__table">
        <thead>
          <tr>
            <th className="menu__title__priceHotAndCold" scope="col">
              Name
            </th>
            <th className="menu__price" scope="col">
              Hot (RM)
            </th>
            <th className="menu__price" scope="col">
              Cold (RM)
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => {
            return item.type._id === type._id ? (
              <tr key={item._id}>
                {user && (
                  <React.Fragment>
                    <td>
                      <Link to={`/menu/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="menu__price">{item.priceHot}</td>
                    <td className="menu__price">{item.priceCold}</td>
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
                    <td className="menu__price">{item.priceHot}</td>
                    <td className="menu__price">{item.priceCold}</td>
                  </React.Fragment>
                )}
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </>
  );
};

export default PriceHotAndCold;
