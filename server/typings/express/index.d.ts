declare namespace Express {
  export interface User {
    id: string;
    full_name: string;
    display_name: string;
    auth_role: string;
    email: string;
    verified: boolean;
  }
}
