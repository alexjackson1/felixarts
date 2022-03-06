import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, InputProps } from "antd";
import { Rule, FormItemProps } from "antd/lib/form";

export type ItemProps = FormItemProps & { placeholder?: string; inputProps?: InputProps };
export type DisabledProps = FormItemProps & { disabled?: boolean };

export const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: "Your full name is required." }],
  email: [{ type: "email", required: true, message: "Please enter a valid email address." }],
  password: [{ required: true, message: "Please enter a valid password." }],
};

export function Name({ placeholder = "Full Name", ...props }: ItemProps) {
  return (
    <Form.Item label="Name" name="name" rules={rules.name} {...props}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
}

export function Email({ placeholder = "Email", inputProps, ...props }: ItemProps) {
  return (
    <Form.Item label="Email" name="email" rules={rules.email} {...props}>
      <Input prefix={<MailOutlined />} placeholder={placeholder} {...inputProps} />
    </Form.Item>
  );
}

export function Password({ placeholder = "Password", inputProps, ...props }: ItemProps) {
  return (
    <Form.Item label="Password" name="password" rules={rules.password} {...props}>
      <Input prefix={<LockOutlined />} type="password" placeholder={placeholder} {...inputProps} />
    </Form.Item>
  );
}
