import http from "../services/httpService";
import config from "../config.json";

http.setJwt(localStorage.getItem("token"));

// Category
const categoriesUrl = config.apiEndpointCategories;

export const fetchCategories = () => http.get(categoriesUrl);
export const fetchCategory = (id) => http.get(`${categoriesUrl}/${id}`);
export const createCategory = (newCategory) =>
  http.post(categoriesUrl, newCategory);
export const updateCategory = (id, updatedCategory) =>
  http.put(`${categoriesUrl}/${id}`, updatedCategory);
export const deleteCategory = (id) => http.delete(`${categoriesUrl}/${id}`);

// Item
const itemsUrl = config.apiEndpointMenu;

export const fetchItems = () => http.get(itemsUrl);
export const fetchItem = (id) => http.get(`${itemsUrl}/${id}`);
export const createItem = (newItem) => http.post(itemsUrl, newItem);
export const updateItem = (id, updatedItem) =>
  http.put(`${itemsUrl}/${id}`, updatedItem);
export const deleteItem = (id) => http.delete(`${itemsUrl}/${id}`);

// Type
const typeUrl = config.apiEndpointTypes;

export const fetchTypes = () => http.get(typeUrl);
export const fetchType = (id) => http.get(`${typeUrl}/${id}`);
export const createType = (newType) => http.post(typeUrl, newType);
export const updateType = (id, updatedType) =>
  http.put(`${typeUrl}/${id}`, updatedType);
export const deleteType = (id) => http.delete(`${typeUrl}/${id}`);

// Auth
export const login = (formData) =>
  http.post(config.apiEndpointAuth, {
    email: formData.username,
    password: formData.password,
  });
export const register = (formData) =>
  http.post(config.apiEndpointUsers, {
    email: formData.username,
    password: formData.password,
  });

// Post
const postUrl = config.apiEndpointPosts;

export const fetchPosts = (page) => http.get(`${postUrl}?page=${page}`);
export const fetchPost = (id) => http.get(`${postUrl}/${id}`);
export const createPost = (newPost) => http.post(postUrl, newPost);
export const updatePost = (id, updatedPost) =>
  http.put(`${postUrl}/${id}`, updatedPost);
export const deletePost = (id) => http.delete(`${postUrl}/${id}`);
