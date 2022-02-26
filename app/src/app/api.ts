import axios from "axios";
import { User, LoginData } from "./auth";

const api = axios.create({
  withCredentials: true,
});

/**
 * Sends a `POST` request to the `/api/session` endpoint.
 *
 * @param data login
 * @returns promise resolving to user or undefined
 */
export async function login(data: LoginData): Promise<User | false | undefined> {
  const result = await api({
    method: "post",
    url: "/api/session",
    data,
  });

  if (result.status === 401) return false;
  if (result.status !== 200) return undefined;

  return result.data as User;
}

export interface NewUserData {
  fullName: string;
  email: string;
  authRole: string;
  password: string;
  verified: boolean;
}

/**
 * Sends a `POST` request to the `/api/user` endpoint.
 *
 * @param data user data
 * @returns promise resolving to user or undefined
 */
export async function register(data: NewUserData): Promise<User | undefined> {
  const result = await api({
    method: "post",
    url: "/api/users",
    data,
  });

  return result.data as User;
}

/**
 * Sends a `POST` request to the `/api/logout` endpoint.
 */
export async function logout(): Promise<void> {
  await api({
    method: "delete",
    url: "/api/session",
  });
}

/**
 * Sends a `POST` request to the `/api/logout` endpoint.
 */
export async function validate(): Promise<User | false | undefined> {
  const result = await api({ method: "post", url: "/api/session/validate" });

  if (result.status === 401) return false;
  if (result.status !== 200) return undefined;
  return result.data as User;
}

export interface UpdateUserData {
  fullName: string;
  email: string;
  authRole: string;
  password?: string;
  verified: boolean;
  id: string;
}

/**
 * Sends a `PUT` request to the `/api/logout` endpoint.
 */
export async function updateUser(data: UpdateUserData): Promise<User | false | undefined> {
  const result = await api({ method: "put", url: `/api/users/${data.id}`, data });

  if (result.status === 401) return false;
  if (result.status !== 200) return undefined;
  return result.data as User;
}

/**
 * Sends a `POST` request to the `/api/logout` endpoint.
 */
export async function getUserById(id: string): Promise<User | undefined> {
  const result = await api({ method: "get", url: `/api/users/${id}`, data: { id } });

  if (result.status !== 200) return undefined;
  return result.data as User;
}

export default api;
