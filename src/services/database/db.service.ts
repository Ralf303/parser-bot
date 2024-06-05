import { PrismaClient } from "@prisma/client";
import Database from "./db.class";
import { User } from "../../core/user";

export class DatabaseService extends Database {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log("Database connected");
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(
    chatId: string
    //@ts-ignore
  ): Promise<User> {
    try {
      let user: User | null = await this.prisma.users.findFirst({
        where: {
          id: chatId,
        },
      });

      if (!user) {
        user = await this.prisma.users.create({
          data: {
            id: chatId,
          },
        });
      }
      //@ts-ignore
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async isAdmin(chatId: string): Promise<boolean> {
    const user: User | null = await this.prisma.users.findFirst({
      where: {
        id: chatId,
      },
    });
    return user ? user.isAdmin : false;
  }

  async makeAdmin(id: string): Promise<boolean> {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        return false;
      }

      await this.prisma.users.update({
        where: {
          id: id,
        },
        data: {
          isAdmin: true,
        },
      });

      return true;
    } catch (error) {
      console.error(error);
    }
    return true;
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.users.findMany();
  }
}
