import React from "react";
import { Outlet, useMatch } from "react-router-dom";

import styled from "@emotion/styled";

import { Layout } from "antd";

import Menu from "./Menu";

import useAuth from "../../hooks/useAuth";
import { AuthRole } from "../../app/auth";
import { navItem, NavItemKey } from "./config";

const AppLayout = styled(Layout)`
  height: 100%;

  & > header {
    position: sticky;
    top: 0;
  }
`;

function useSelectedKeys() {
  const home = useMatch({ path: "/", end: true });
  const profile = useMatch({ path: "/profile", end: true });
  const assignments = useMatch({ path: "/assignments", end: false });
  const editor = useMatch({ path: "/edit", end: false });

  if (home) return [NavItemKey.Home];
  if (profile) return [NavItemKey.Profile];
  if (assignments) return [NavItemKey.Assignments];
  if (editor) return [NavItemKey.EditorZone];
  return [];
}

function useNavItems() {
  const { user } = useAuth();
  const items = [navItem(NavItemKey.Home)];

  if (!user) return items;
  items.push(navItem(NavItemKey.Profile));
  items.push(navItem(NavItemKey.Assignments));

  if (user.authRole === AuthRole.Writer) return items;

  items.push(navItem(NavItemKey.EditorZone));

  return items;
}

function RootLayout() {
  const items = useNavItems();
  const selected = useSelectedKeys();
  return (
    <AppLayout>
      <Layout.Header>
        <Menu items={items} selected={selected} />
      </Layout.Header>
      <Outlet />
    </AppLayout>
  );
}

export default RootLayout;
