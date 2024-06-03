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
}
