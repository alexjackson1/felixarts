export enum AuthRole {
  Writer = "writer",
  Editor = "editor",
  Administrator = "admin",
  Anonymous = "anonymous",
}

export interface User {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  verified: boolean;
  authRole: AuthRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  full_name: string;
  display_name: string;
  email: string;
  verified: boolean;
  auth_role: AuthRole;
}

export type WithPassword<T> = T & { password: string };
