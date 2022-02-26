import { User } from "../models/User";

export enum AuthRole {
  Administrator = "admin",
  Editor = "editor",
  Writer = "writer",
  Anonymous = "anonymous",
}

export interface UserData extends Omit<User, "authors"> {
  email: string;
}
