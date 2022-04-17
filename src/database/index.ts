import { Connection, createConnection, SimpleConsoleLogger } from "typeorm";

class Database {
  public connection: Connection;

  constructor() {
    (async () => {
      await this.connectToDB();
    })();
  }

  private async connectToDB(): Promise<any> {
    this.connection = await createConnection({
      type: "mysql",
      host: envString(process.env.DATABASE_HOST!, "localhost"),
      port: envString(Number(process.env.DATABASE_PORT!), 3306),
      username: envString(process.env.DATABASE_USERNAME!, "root"),
      password: envString(process.env.DATABASE_PASSWORD!, "root"),
      database: envString(process.env.DATABASE_NAME!, "demo"),
      entities: [__dirname + "/entity/*.ts", __dirname + "/entity/*.js"],
      synchronize: true,
      logging: true,
    });
  }
}

function envString<T>(prodString: T, devString: T): T {
  return process.env.NODE_ENV === "production" ? prodString : devString;
}

export const db = new Database();
