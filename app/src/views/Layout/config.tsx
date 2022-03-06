import { ContainerOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";

export enum NavItemKey {
  Home = "home",
  Assignments = "assignments",
  EditorZone = "editor",
  Profile = "profile",
}

export function navItem(key: NavItemKey) {
  switch (key) {
    case NavItemKey.Home:
      return {
        key: NavItemKey.Home,
        to: "/",
        label: "Home",
        icon: <HomeOutlined />,
      };
    case NavItemKey.Assignments:
      return {
        key: NavItemKey.Assignments,
        to: "/assignments",
        label: "Ticket Assignments",
        icon: <ContainerOutlined />,
      };
    case NavItemKey.EditorZone:
      return {
        key: NavItemKey.EditorZone,
        to: "/edit",
        label: "Section Editorial",
        icon: <EditOutlined />,
      };
    case NavItemKey.Profile:
      return {
        key: NavItemKey.Profile,
        to: "/profile",
        label: "Profile",
        icon: <EditOutlined />,
      };
    default:
      throw new Error(`Unrecognised nav item ${key}`);
  }
}
