import React from "react";
import { Link } from "react-router-dom";

import { Menu as AntdMenu } from "antd";

interface MenuItemData {
  key: string;
  to: string;
  label: string;
  icon: React.ReactNode;
}

function renderMenuItem({ key, to, label }: MenuItemData) {
  return (
    <AntdMenu.Item key={key}>
      <Link to={to}>{label}</Link>
    </AntdMenu.Item>
  );
}

function Menu({ items, selected }: { items: MenuItemData[]; selected: string[] }) {
  return (
    <AntdMenu theme="dark" mode="horizontal" selectedKeys={selected}>
      {items.map(renderMenuItem)}
    </AntdMenu>
  );
}

export default Menu;
