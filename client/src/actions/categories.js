import * as api from "../api/index";
import {
  FETCH_ALL_CATEGORIES,
  FETCH_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../constants/actionTypes";

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCategories();

    dispatch({ type: FETCH_ALL_CATEGORIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchCategory(id);

    dispatch({ type: FETCH_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    const { data } = await api.createCategory(category);
    dispatch({ type: CREATE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = (id, updatedCategory) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(id, updatedCategory);

    dispatch({ type: UPDATE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCategory(id);

    dispatch({ type: DELETE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};
