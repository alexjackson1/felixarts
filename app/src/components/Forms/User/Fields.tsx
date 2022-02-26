import React from "react";

import { Checkbox, Form, FormInstance, FormItemProps, Input, InputProps } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import rules from "./rules";
import { User } from "../../../app/auth";
import TextArea from "antd/lib/input/TextArea";

type ItemProps = FormItemProps<User> & { placeholder?: string; inputProps?: InputProps };

export function FullName({ placeholder = "Full Name", ...props }: ItemProps) {
  return (
    <Form.Item label="Full Name" name="fullName" rules={rules.fullName} {...props}>
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

export function AuthorName({ placeholder = "Author Name", ...props }: ItemProps) {
  return (
    <Form.Item label="Author Name" name="authorName" rules={rules.fullName} {...props}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
}

export function Title({ placeholder = "Dr", ...props }: ItemProps) {
  return (
    <Form.Item label="Title" name="title" rules={rules.title} {...props}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
}

export function Bio({ placeholder = "A short description of yourself...", ...props }: ItemProps) {
  return (
    <Form.Item label="Bio" name="bio" rules={rules.bio} {...props}>
      <TextArea placeholder={placeholder} />
    </Form.Item>
  );
}
