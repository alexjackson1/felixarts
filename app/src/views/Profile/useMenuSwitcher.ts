import { MenuProps } from "antd";
import React from "react";

/**
 * Top-level profile view keys.
 */
export enum ProfileKeys {
  UserProfile = "user_profile",
  AllAuthors = "all_authors",
}

export interface UseMenuSwitcherHookPayload {
  menuProps: MenuProps;
  selected: ProfileKeys.UserProfile | string;
}

function extractAuthorId(info: { keyPath: string[] }) {
  // TODO: It would be better if we used the data-authorid attribute, but item
  // prop is deprecated
  const split = info.keyPath[0].split("_");
  return split[split.length - 1];
}

export function useMenuSwitcher() {
  const [selected, setSelected] = React.useState<string>(ProfileKeys.UserProfile);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const handleSelect: MenuProps["onSelect"] = (info) => {
    const length = info.keyPath.length;

    if (info.keyPath[length - 1] === ProfileKeys.UserProfile) {
      setSelected(ProfileKeys.UserProfile);
    }

    if (info.keyPath[length - 1] === ProfileKeys.AllAuthors) {
      const id = extractAuthorId(info);
      setSelected(info.keyPath[0]);
      setId(id);
    }
  };

  const menuProps: MenuProps = {
    multiple: false,
    selectedKeys: [selected],
    onSelect: handleSelect,
    defaultOpenKeys: [ProfileKeys.AllAuthors],
  };

  return { menuProps, selected, id };
}

export default useMenuSwitcher;
