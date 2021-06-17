import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const DropDownList = ({ data, name, nameSingular, label, onDelete }) => {
  const [selectedData, setSelectedData] = useState({ name: "" });
  const dispatch = useDispatch();

  return (
    <>
      <div className="dropdown d-inline-block m-2">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {label}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link className="dropdown-item " to={`/${name}/new`}>
              New
            </Link>
          </li>
          {data.map((d) => {
            return (
              <li key={d._id} className="d-flex justify-content-between">
                <Link
                  className="dropdown-item d-inline-block "
                  to={`/${name}/${d._id}`}
                >
                  {d.name}
                </Link>
                <button
                  type="button"
                  className="btn btn-danger m-1"
                  data-bs-toggle="modal"
                  data-bs-target={`#staticBackdrop${name}`}
                  onClick={() => setSelectedData(d)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <div
          className="modal fade"
          id={`staticBackdrop${name}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Delete {nameSingular} : {`${selectedData.name}`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Deleting this {nameSingular} will delete all the items with
                this&nbsp;
                {nameSingular}. Are you sure you want to continue?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(onDelete(selectedData._id));
                    window.location = "/menu";
                  }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDownList;
