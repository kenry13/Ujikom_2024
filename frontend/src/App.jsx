import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/menu/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Jelejahi from "./pages/menu/Jelajahi";
import Profil from "./pages/menu/Profil";
import Album from "./pages/menu/Album";
import Suka from "./pages/menu/Suka";
import { useEffect, useState } from "react";
import UserFunction from "./function/User";
import Middleware from "./component/Midleware";
import DataContext from "./function/Context";
import Loading from "./component/Loading";
import Page404 from "./component/404";
import Popup from "./component/Popup";
import AlbumDetail from "./pages/detail/AlbumDetail";
import FotoDetail from "./pages/detail/FotoDetail";
import FotoEdit from "./pages/detail/FotoEdit";
import UserDetail from "./pages/detail/UserDetail";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState();
  const userFunction = new UserFunction(user, setUser);

  const globalVariabel = {
    user,
    setUser,
    userFunction,
    checkMsg: userFunction.checkMsg,
  };

  useEffect(() => {
    userFunction.get();
  }, []);
  
    return <BrowserRouter>
        <DataContext.Provider value={globalVariabel}>
          <Middleware next={user == undefined}>
            <Route path="*" element={<Loading />} />
          </Middleware>

          <Middleware next={user == false}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Login />} />
          </Middleware>

          <Middleware next={user}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Jelejahi />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="/like" element={<Suka />} />
            <Route path="/album" element={<Album />} />
            <Route path="/album/:slug" element={<AlbumDetail />} />
            <Route path="/foto/:slug" element={<FotoDetail />} />
            <Route path="/edit/:slug" element={<FotoEdit />} />
            <Route path="/user/:id_user" element={<UserDetail />} />   
            <Route path="*" element={<Page404 />} />
          </Middleware>
        </DataContext.Provider>
      </BrowserRouter>
    
  };

export default App;
