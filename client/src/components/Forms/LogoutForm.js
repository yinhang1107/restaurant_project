import { useDispatch } from "react-redux";

import { LOGOUT } from "../../constants/actionTypes";

const Logout = (props) => {
  const dispatch = useDispatch();
  dispatch({ type: LOGOUT });
  props.history.push("/");
  return null;
};

export default Logout;
