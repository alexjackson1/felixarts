import { Rule } from "antd/lib/form";
import { AuthRole } from "../../../app/auth";

const RULES: Record<string, Rule[]> = {
  id: [],
  fullName: [{ required: true, message: "Your full name is required." }],
  email: [{ type: "email", required: true, message: "Please enter a valid email address." }],
  password: [{ required: true, message: "Please enter a valid password." }],
  authRole: [
    { required: true, message: "Please select an authorisation role." },
    {
      enum: [AuthRole.Administrator, AuthRole.Editor, AuthRole.Writer, AuthRole.Anonymous],
      message: "Unrecognised authorisation role.",
    },
  ],
  verified: [{ required: true, message: "Verification state is required." }],
};

export default RULES;
