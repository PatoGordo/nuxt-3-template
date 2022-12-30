import { User } from "~~/server/app/domain/entities/User";
import { inMemoryDB } from "~~/server/database/in-memory-db";
import { IAuthRepository } from "../../Interfaces/IAuthRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class InMemoryAuthRepository implements IAuthRepository {
  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = inMemoryDB.users.find((user) => user.email === email);

    if (!user) {
      throw new Error("Email or password went wrong!");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Email or password went wrong!");
    }

    const token = jwt.sign(
      { ...user, password: "protected-data" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return { user: { ...user, password: "protected-data" }, token };
  }

  async signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const emailAlreadyInUse = inMemoryDB.users.find(
      (user) => user.email === email
    );

    if (emailAlreadyInUse) {
      throw new Error("This email is already in use by another account!");
    }

    const newUser = new User({
      email,
      name,
      password,
    });

    inMemoryDB.users.push(newUser);

    const token = jwt.sign(
      { ...newUser, password: "protected-data" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return { user: { ...newUser, password: "protected-data" }, token };
  }
}
