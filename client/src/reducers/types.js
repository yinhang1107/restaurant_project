import {
  FETCH_ALL_TYPES,
  CREATE_TYPE,
  UPDATE_TYPE,
  DELETE_TYPE,
  FETCH_TYPE,
} from "../constants/actionTypes";

const types = (state = { types: [], type: null }, action) => {
  switch (action.type) {
    case FETCH_ALL_TYPES:
      return { ...state, types: action.payload };

    case FETCH_TYPE:
      return { ...state, type: action.payload };

    case CREATE_TYPE:
      return { ...state, types: [...state.types, action.payload] };

    case UPDATE_TYPE:
      return {
        ...state,
        types: state.types.map((type) =>
          type._id === action.payload._id ? action.payload : type
        ),
      };

    case DELETE_TYPE:
      return {
        ...state,
        types: state.types.filter((type) => type._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default types;
