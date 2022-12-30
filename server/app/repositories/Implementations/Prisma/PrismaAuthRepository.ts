import { User } from "~~/server/app/domain/entities/User";
import { prismaClient } from "~~/server/database/db-client";
import bcrypt from "bcryptjs";
import { IAuthRepository } from "../../Interfaces/IAuthRepository";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class PrismaAuthRepository implements IAuthRepository {
  public async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
        status: 1,
      },
    });

    if (!user) {
      throw new Error("Email or password went wrong!");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
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

  public async signUp({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const emailAlreadyInUse = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (emailAlreadyInUse) {
      throw new Error("This email is already in use by another account!");
    }

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password),
      },
    });

    const token = jwt.sign(
      { ...user, password: "protected-data" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return { user: { ...user, password: "protected-data" }, token };
  }
}
