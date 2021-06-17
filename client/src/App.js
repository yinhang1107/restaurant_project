import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Logout from "./components/Forms/LogoutForm";
import CategoryForm from "./components/Forms/CategoryForm";
import ItemForm from "./components/Forms/ItemForm";
import Register from "./components/Forms/RegisterForm";
import Login from "./components/Forms/LoginForm";
import Home from "./components/Home/Home";
import Reservation from "./components/Reservation/Reservatoin";
import Location from "./components/Location/Location";
import NavBar from "./components/Common/NavBar/NavBar";
import Menu from "./components/Menu/Menu";
import TypeForm from "./components/Forms/TypeForm";
import PostForm from "./components/Forms/PostForm";
import News from "./components/News/News";
import { getCurrentUser } from "./actions/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  });
  return (
    <>
    {/* ProtectedRoute */}
      <NavBar />
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/categories/:id" component={CategoryForm} />
        <Route path="/types/:id" component={TypeForm} />
        <Route path="/menu/:id" component={ItemForm} />
        <Route path="/news/:id" component={PostForm} />
        <Route path="/menu" component={Menu} />
        <Route path="/news" component={News} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/reservations" component={Reservation} />
        <Route path="/location" component={Location} />
        <Route path="/home" exact component={Home} />
        <Redirect from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
}

export default App;
