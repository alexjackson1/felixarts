import { Checkbox, Form, FormItemProps, Input, InputProps, Select } from "antd";
export { Email, Password } from "../CommonFields";

import rules from "./rules";
import { AuthRole } from "../../../app/auth";
import { DisabledProps, ItemProps, Name } from "../CommonFields";

const { Option } = Select;

export function FullName({ placeholder = "Alan Turing", ...props }: ItemProps) {
  return <Name label="Full Name" name="fullName" placeholder={placeholder} {...props} />;
}

export function DisplayName({ placeholder = "Dr Turing", ...props }: ItemProps) {
  return <Name label="Display Name" name="displayName" placeholder={placeholder} {...props} />;
}

export function Verified({ disabled, ...props }: DisabledProps) {
  return (
    <Form.Item
      label="Verified"
      name="verified"
      rules={rules.verified}
      valuePropName="checked"
      {...props}
    >
      <Checkbox disabled={disabled} />
    </Form.Item>
  );
}

export function Role({ disabled, ...props }: DisabledProps) {
  return (
    <Form.Item label="Role" name="authRole" rules={rules.authRole} {...props}>
      <Select disabled={disabled}>
        <Option value={AuthRole.Administrator}>Administrator</Option>
        <Option value={AuthRole.Editor}>Editor</Option>
        <Option value={AuthRole.Writer}>Writer</Option>
        <Option value={AuthRole.Anonymous}>Anonymous</Option>
      </Select>
    </Form.Item>
  );
}
