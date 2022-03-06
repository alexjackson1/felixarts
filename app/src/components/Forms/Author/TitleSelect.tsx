import React from "react";
import { Divider, Input, InputProps, Select, SelectProps, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const { Option } = Select;

const TITLES = [
  { key: "title_none", value: "", label: "None" },
  { key: "title_mr", value: "mr", label: "Mr" },
  { key: "title_mrs", value: "mrs", label: "Mrs" },
  { key: "title_ms", value: "ms", label: "Ms" },
  { key: "title_miss", value: "miss", label: "Miss" },
  { key: "title_dr", value: "dr", label: "Dr" },
  { key: "title_prof", value: "prof", label: "Prof" },
  { key: "title_rev", value: "rev", label: "Rev" },
];

function useTitleSelect() {
  const [items, setItems] = React.useState(TITLES);
  const [customValue, setCustomValue] = React.useState("");

  const onCustomValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCustomValue(event.target.value);
  };

  const addItem: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    const value = customValue.toLowerCase().replaceAll(" ", "_");
    const item = {
      key: `custom_title_${value}`,
      value,
      label: customValue,
    };
    setItems([...items, item]);
    setCustomValue("");
  };

  return { onCustomValueChange, addItem, items, customValue };
}

const DropdownDivider = styled(Divider)`
  margin: 8px 0;
`;

const DropdownSpace = styled(Space)`
  padding: 0 8px 4px;
`;

const AddItemLink = styled(Typography.Link)`
  white-space: nowrap;
`;

function TitleSelect(props: SelectProps) {
  const { onCustomValueChange, addItem, items, customValue } = useTitleSelect();
  return (
    <Select
      {...props}
      dropdownRender={(menu) => (
        <>
          {menu}
          <DropdownDivider />
          <DropdownSpace align="center">
            <Input
              placeholder="Custom title..."
              value={customValue}
              onChange={onCustomValueChange}
            />
            <AddItemLink onClick={addItem}>
              <PlusOutlined /> Add item
            </AddItemLink>
          </DropdownSpace>
        </>
      )}
    >
      {items.map(({ key, label, value }) => (
        <Option key={key} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
}

export default TitleSelect;
