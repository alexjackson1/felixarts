import { getConnection } from "typeorm";
import { Author, User } from "../models/User";

export async function createAuthor(
  data: Omit<Author, "id"> & { user_id: string }
): Promise<Author> {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  const user = await userRepository.findOneOrFail(data.user_id, {
    relations: ["authors"],
  });

  const author = new Author();
  author.name = data.name;
  author.title = data.title;
  author.bio = data.bio;
  author.pseudonym = data.pseudonym;

  const { id } = await connection.manager.save(author);

  user.authors.push(author);
  await userRepository.save(user);

  return {
    id,
    name: author.name,
    title: author.title,
    bio: author.bio,
    pseudonym: author.pseudonym,
  };
}

export async function updateAuthorById(
  author: Partial<Author>
): Promise<Author> {
  const connection = getConnection();
  const authorRepository = connection.getRepository(Author);

  const authorWithId = (await authorRepository.save(author)) as Author;

  return await findAuthorById(authorWithId.id);
}

export async function removeAuthorById(id: string): Promise<void> {
  const connection = getConnection();
  const authorRepository = connection.getRepository(Author);
  await authorRepository.delete(id);
}

export async function listAllAuthors(): Promise<Author[]> {
  const connection = getConnection();
  const authorRepository = connection.getRepository(Author);

  return await authorRepository.find();
}

export async function findAuthorById(id: string): Promise<Author> {
  const connection = getConnection();
  const authorRepository = connection.getRepository(Author);
  return await authorRepository.findOneOrFail(id);
}
