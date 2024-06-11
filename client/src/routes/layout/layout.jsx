import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import "./layout.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";

//layout accessible without auth
export function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export function RequiredAuth() {
  //If no current user ,auth layout is not accessible

  const { updateUser, currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
