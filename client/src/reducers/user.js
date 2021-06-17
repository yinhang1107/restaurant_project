import { LOGIN, REGISTER, LOGOUT } from "../constants/actionTypes";
import { GET_CURRENT_USER } from "../constants/actionTypes";

const tokenKey = "token";
const user = (user = null, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(tokenKey, action.jwt);
      return user;

    case REGISTER:
      localStorage.setItem(tokenKey, action.jwt);
      return user;

    case LOGOUT:
      localStorage.removeItem(tokenKey);
      return null;

    case GET_CURRENT_USER:
      return action.user;

    default:
      return user;
  }
};

export default user;
