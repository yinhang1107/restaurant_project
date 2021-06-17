import * as api from "../api/index";
import {
  FETCH_ALL_ITEMS,
  FETCH_ITEM,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "../constants/actionTypes";

export const getItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems();

    dispatch({ type: FETCH_ALL_ITEMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchItem(id);

    dispatch({ type: FETCH_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createItem = (item) => async (dispatch) => {
  try {
    const { data } = await api.createItem(item);

    dispatch({ type: CREATE_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = (id, updatedItem) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(id, updatedItem);

    dispatch({ type: UPDATE_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteItem(id);

    dispatch({ type: DELETE_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
