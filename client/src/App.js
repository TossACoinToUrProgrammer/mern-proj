import React from "react";
import "materialize-css";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

const App = () => {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  if(!ready) {
    return <Preloader />
  }
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
      {isAuth && <Navbar />}
      <div className="container">{routes}</div>
    </AuthContext.Provider>
  );
};

export default App;
