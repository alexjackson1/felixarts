import { AuthRole } from "./auth";

export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  pseudonym: boolean;
}

export type AuthorData = Author;

export interface Profile {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  verified: boolean;
  authRole: AuthRole;
  authors: Author[];
}

export interface ProfileData {
  id: string;
  full_name: string;
  display_name: string;
  email: string;
  verified: boolean;
  auth_role: AuthRole;
  authors: Author[];
}
