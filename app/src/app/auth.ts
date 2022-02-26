export enum AuthRole {
  Writer = "writer",
  Editor = "editor",
  Administrator = "admin",
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  authRole: AuthRole;
}

export interface LoginData {
  email: string;
  password: string;
}
