import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { AuthRole } from "../types";

@Entity({ schema: "felix" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  full_name: string;

  @Column("text")
  display_name: string;

  @Column("boolean")
  verified: boolean;

  @Column({
    type: "enum",
    enum: AuthRole,
    default: AuthRole.Anonymous,
  })
  auth_role: AuthRole;

  @ManyToMany(() => Author, { cascade: true })
  @JoinTable({
    name: "user_authors",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "author_id",
      referencedColumnName: "id",
    },
    schema: "private",
  })
  authors: Author[];
}

@Entity({ schema: "private" })
export class Account {
  @OneToOne(() => User, { primary: true, cascade: true })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Column("text", { unique: true })
  email: string;

  @Column("text")
  hash: string;

  @Column("boolean")
  confirmed: boolean;
}

@Entity({ schema: "felix" })
export class Author {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  name: string;

  @Column("text")
  bio: string;

  @Column("boolean")
  pseudonym: boolean;
}
