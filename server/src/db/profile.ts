import { getConnection } from "typeorm";
import { Account, User } from "../models/User";

export async function findProfileById(
  id: string
): Promise<User & { email: string }> {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);

  const user = await userRepository.findOneOrFail({
    where: { id },
    relations: ["authors"],
  });

  const { email } = await connection.manager.findOneOrFail(Account, {
    where: { user: { id } },
    relations: ["user"],
  });

  return { email, ...user };
}
