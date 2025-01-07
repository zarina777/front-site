import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Container from "../container/Container";
import useStore from "../../store/store";

const Layout = () => {
  const { logoutButton, setLogoutButton } = useStore();
  function logout() {
    localStorage.removeItem("info");
    setLogoutButton(false);
  }
  return (
    <div>
      <div className="p-7 bg-blue-500">
        <Container className="flex justify-end gap-5">
          <NavLink className={({ isActive }) => `text-2xl text-white p-4 ${isActive ? "border border-white rounded-md" : ""}`} to="/">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => `text-2xl text-white p-4 ${isActive ? "border border-white rounded-md" : ""}`} to="/products">
            Products
          </NavLink>
          {logoutButton && (
            <NavLink className={({ isActive }) => `text-2xl text-white p-4 ${isActive ? "border border-white rounded-md" : ""}`} to="/likeds">
              Likeds
            </NavLink>
          )}
          {!logoutButton && (
            <>
              <NavLink className={({ isActive }) => `text-2xl text-white p-4 ${isActive ? "border border-white rounded-md" : ""}`} to="/login">
                Log in
              </NavLink>
              <NavLink className={({ isActive }) => `text-2xl text-white p-4 ${isActive ? "border border-white rounded-md" : ""}`} to="/signup">
                Sign up
              </NavLink>
            </>
          )}
          {logoutButton && (
            <NavLink onClick={logout} className="text-2xl text-white p-4 rounded-md hover:border hover:border-white" to="/login">
              Log out
            </NavLink>
          )}
        </Container>
      </div>
      <Container>{<Outlet />}</Container>
    </div>
  );
};

export default Layout;
