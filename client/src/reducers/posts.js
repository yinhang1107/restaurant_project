import * as actions from "../constants/actionTypes";

const posts = (state = { posts: [] }, action) => {
  switch (action.type) {
    case actions.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case actions.FETCH_POST:
      return { ...state, post: action.payload };

    case actions.CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    case actions.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case actions.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default posts;
