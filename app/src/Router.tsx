import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import * as Views from "./views";

const RequireAuth = ({ children, redirectTo }: { redirectTo: string; children: JSX.Element }) => {
  const { user } = useAuth();
  return user !== null ? children : <Navigate to={redirectTo} />;
};

const PrivateOutlet = ({ redirectTo }: { redirectTo: string }) => {
  const { user } = useAuth();
  return user !== null ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Views.Layout />}>
          <Route index element={<Views.Home />} />

          <Route path="login" element={<Views.Login />} />
          <Route path="logout" element={<Views.Logout />} />
          <Route path="register" element={<Views.Register />} />

          <Route path="users" element={<PrivateOutlet redirectTo="/login" />}>
            <Route path=":id" element={<Views.User />} />
          </Route>

          <Route path="*" element={<Views.Error type={404} />} />
        </Route>
      </Routes>
    </Router>
  );
}
