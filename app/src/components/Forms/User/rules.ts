import { Rule } from "antd/lib/form";

const RULES: Record<string, Rule[]> = {
  id: [],
  fullName: [{ required: true, message: "Your full name is required." }],
  email: [{ type: "email", required: true, message: "Please enter a valid email address." }],
  password: [{ required: true, message: "Please enter a valid password." }],
};

export default RULES;
