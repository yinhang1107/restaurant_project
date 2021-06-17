import {
  FETCH_ALL_CATEGORIES,
  FETCH_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../constants/actionTypes";

const categories = (state = { categories: [], category: null }, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      return { ...state, categories: action.payload };

    case FETCH_CATEGORY:
      return { ...state, category: action.payload };

    case CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export default categories;
