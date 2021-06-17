import {
  FETCH_ALL_ITEMS,
  FETCH_ITEM,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "../constants/actionTypes";

const items = (state = { items: [], item: null }, action) => {
  switch (action.type) {
    case FETCH_ALL_ITEMS:
      return { ...state, items: action.payload };

    case FETCH_ITEM:
      return { ...state, item: action.payload };

    case CREATE_ITEM:
      return { ...state, items: [...state.items, action.payload] };

    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default items;
