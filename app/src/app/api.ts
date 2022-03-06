import axios, { AxiosResponse } from "axios";
import { User, LoginData, UserData, WithPassword } from "./auth";
import { Author, AuthorData, Profile, ProfileData } from "./types";
import { SoftPartial } from "./utils";

const api = axios.create({
  withCredentials: true,
});

function asProfile(data: ProfileData): Profile {
  const { authors, ...user } = data;
  return { ...asUser(user), authors: authors.map(asAuthor) };
}

function asAuthor(data: AuthorData): Author {
  return data; // Nothing is needed here as there are no snake case variables... yet.
}

function asUser(data: UserData): User {
  return {
    id: data.id,
    fullName: data.full_name,
    displayName: data.display_name,
    email: data.email,
    verified: data.verified,
    authRole: data.auth_role,
  };
}

function toUserData(user: User): UserData;
function toUserData(user: SoftPartial<User>): SoftPartial<UserData>;
function toUserData(user: SoftPartial<User>): SoftPartial<UserData> {
  return {
    id: user.id,
    full_name: user.fullName,
    display_name: user.displayName,
    email: user.email,
    verified: user.verified,
    auth_role: user.authRole,
  };
}

/**
 * Sends a `POST` request to the `/api/session` endpoint.
 *
 * @param data login
 * @returns promise resolving to user or undefined
 */
export async function login(data: LoginData): Promise<User | false | undefined> {
  const result: AxiosResponse<UserData> = await api({
    method: "post",
    url: "/api/session",
    data,
  });

  if (result.status === 401) return false;
  if (result.status !== 200) return undefined;

  return asUser(result.data);
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
export async function register(data: WithPassword<Omit<User, "id">>): Promise<User> {
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

/**
 * Sends a `POST` request to the `/users/:id` endpoint.
 */
export async function updateUser(updates: SoftPartial<User>): Promise<User | false | undefined> {
  const data = toUserData(updates);
  console.log(data);
  const response: AxiosResponse<UserData> = await api({
    method: "post",
    url: `/api/users/${updates.id}`,
    data: toUserData(updates),
  });

  if (response.status === 401) return false;
  if (response.status !== 200) return undefined;

  return asUser(response.data);
}

/**
 * Sends a `POST` request to the `/users/:id` endpoint.
 */
export async function updateAuthor(
  updates: SoftPartial<Author>
): Promise<Author | false | undefined> {
  throw new Error("unimplemented");
}

/**
 * Sends a `POST` request to the `/api/logout` endpoint.
 */
export async function findUserById(id: string): Promise<User | undefined> {
  const response: AxiosResponse<UserData> = await api({
    method: "get",
    url: `/api/users/${id}`,
    data: { id },
  });

  if (response.status !== 200) return undefined;
  return asUser(response.data);
}

/**
 * Sends a `GET` request to the `/api/profile/id` endpoint.
 */
export async function findUserProfileById(id: string): Promise<Profile | undefined> {
  const response: AxiosResponse<ProfileData> = await api({
    method: "get",
    url: `/api/profile/${id}`,
  });

  if (response.status !== 200) return undefined;
  return asProfile(response.data);
}

export default api;
