import { combineReducers } from "redux";

import types from "./types";
import categories from "./categories";
import items from "./items";
import user from "./user";
import posts from "./posts";

export default combineReducers({
  types,
  categories,
  items,
  user,
  posts,
});
