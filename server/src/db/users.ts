import argon from "argon2";
import { DeepPartial, getConnection } from "typeorm";
import { Account, User } from "../models/User";
import { UserData, WithId } from "../types";

export type WithPassword<T extends Omit<User, "authors">> = T & {
  password: string;
};

type AccountWithUser = Account & { user: User };

function mapJoinToUserData(data: Account & { user: User }): UserData {
  const { email, user } = data;

  return {
    id: user.id,
    full_name: user.full_name,
    display_name: user.display_name,
    email,
    verified: user.verified,
    auth_role: user.auth_role,
  };
}

function mapPartialJoinToUserData(
  data: DeepPartial<AccountWithUser> & { user: { id: string } }
): Partial<UserData> {
  const { email, user } = data;

  return {
    id: user.id,
    full_name: user?.full_name,
    display_name: user?.display_name,
    email,
    verified: user?.verified,
    auth_role: user?.auth_role,
  };
}

export async function createUser(
  data: Omit<WithPassword<UserData>, "id">
): Promise<UserData> {
  const connection = getConnection();

  const userRepository = connection.getRepository(User);
  const user = new User();
  user.full_name = data.full_name;
  user.display_name = data.display_name;
  user.verified = data.verified;
  user.auth_role = data.auth_role;

  userRepository.save(user);

  const accountRepository = connection.getRepository(Account);
  const account = new Account();
  account.user = user;
  account.email = data.email;
  account.hash = await argon.hash(data.password);
  account.confirmed = false;

  accountRepository.save(account);

  return {
    id: user.id,
    email: account.email,
    full_name: data.full_name,
    display_name: data.display_name,
    verified: data.verified,
    auth_role: data.auth_role,
  };
}

export async function updateUserById(
  data: WithId<Partial<WithPassword<UserData>>>
): Promise<Partial<UserData>> {
  const { id, email, password, ...user } = data;

  const connection = getConnection();
  const accountRepository = connection.getRepository(Account);
  const userRepository = connection.getRepository(User);

  const accountUpdate: DeepPartial<Account> = {
    email,
    hash: password ? await argon.hash(password) : undefined,
  };

  const userUpdate: DeepPartial<User> = {
    id,
    ...user,
  };

  const [newAccount, _newUser] = await Promise.all([
    accountRepository.save(accountUpdate),
    userRepository.save(userUpdate),
  ]);

  return mapPartialJoinToUserData(newAccount);
}

export async function removeUserById(id: string): Promise<void> {
  const connection = getConnection();
  const accountRepository = connection.getRepository(Account);
  await accountRepository.delete({ user: { id } });
}

export async function removeUserByEmail(email: string): Promise<void> {
  const connection = getConnection();
  const accountRepository = connection.getRepository(Account);
  await accountRepository.delete({ email });
}

export async function listAllUsers(): Promise<UserData[]> {
  const connection = getConnection();
  const accountRepository = connection.getRepository(Account);

  const accounts = (await accountRepository.find({
    relations: ["user"],
  })) as (Account & { user: User })[];

  return accounts.map(mapJoinToUserData);
}

export async function findUserById(id: string): Promise<UserData> {
  const connection = getConnection();
  const accountRepository = connection.getRepository(Account);

  const user = (await accountRepository.findOneOrFail({
    where: {
      user: { id },
    },
    relations: ["user"],
  })) as Account & { user: User };

  return mapJoinToUserData(user);
}

export async function findUserByEmail(email: string): Promise<UserData> {
  const connection = getConnection();
  const accountRepository = connection.getRepository(Account);

  const user = (await accountRepository.findOneOrFail({
    where: { email },
    relations: ["user"],
  })) as Account & { user: User };

  return mapJoinToUserData(user);
}
