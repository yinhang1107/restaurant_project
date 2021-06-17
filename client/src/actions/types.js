import * as api from "../api/index";
import {
  FETCH_ALL_TYPES,
  FETCH_TYPE,
  CREATE_TYPE,
  UPDATE_TYPE,
  DELETE_TYPE,
} from "../constants/actionTypes";

export const getTypes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTypes();

    dispatch({ type: FETCH_ALL_TYPES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getType = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchType(id);

    dispatch({ type: FETCH_TYPE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createType = (type) => async (dispatch) => {
  try {
    const { data } = await api.createType(type);

    dispatch({ type: CREATE_TYPE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateType = (id, updatedType) => async (dispatch) => {
  try {
    const { data } = await api.updateType(id, updatedType);

    dispatch({ type: UPDATE_TYPE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteType = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteType(id);

    dispatch({ type: DELETE_TYPE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
