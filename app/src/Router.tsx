import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { AuthRole, User } from "./app/auth";
import useAuth from "./hooks/useAuth";

import * as Views from "./views";

const RequireAuth = ({ children, redirectTo }: { redirectTo: string; children: JSX.Element }) => {
  const { user } = useAuth();
  return user !== null ? children : <Navigate to={redirectTo} />;
};

interface PrivateOutletProps {
  redirectTo: string;
  roles?: AuthRole | AuthRole[];
  allowOwn?: boolean;
}

type AuthContext = {
  user: User;
  id: string;
  role: AuthRole;
};

const PrivateOutlet = ({ redirectTo, roles = [], allowOwn }: PrivateOutletProps) => {
  const { id } = useParams();
  const { user } = useAuth();

  if (user === null) return <Navigate to={redirectTo} />;

  if (allowOwn && id && id !== user.id) return <Navigate to={redirectTo} />;

  const whitelist = Array.isArray(roles) ? roles : [roles];
  if (!whitelist.includes(user.authRole)) return <Navigate to={redirectTo} />;

  return <Outlet context={{ user, id: user.id, role: user.authRole }} />;
};

function useAuthContext(): AuthContext {
  return useOutletContext<AuthContext>();
}

const AdminOnlyOutlet = () => (
  <PrivateOutlet redirectTo="/login" roles={[AuthRole.Administrator]} />
);

const AdminOrOwnOutlet = () => (
  <PrivateOutlet redirectTo="/login" roles={[AuthRole.Administrator]} allowOwn />
);

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Views.Layout />}>
          <Route index element={<Views.Home />} />

          <Route path="login" element={<Views.Login />} />
          <Route path="logout" element={<Views.Logout />} />
          <Route path="register" element={<Views.Register />} />

          <Route path="profile" element={<AdminOrOwnOutlet />}>
            <Route index element={<Views.Profile />} />
            <Route path="*" element={<Views.Error type={404} />} />
          </Route>

          <Route path="users" element={<AdminOnlyOutlet />}>
            <Route index element={<Views.AllUsers />} />
            <Route path="*" element={<Views.Error type={404} />} />
          </Route>

          <Route path="*" element={<Views.Error type={404} />} />
        </Route>
      </Routes>
    </Router>
  );
}
