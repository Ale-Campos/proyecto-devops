const { readdir } = require("fs").promises;
const dotenv = require("dotenv");
import "reflect-metadata";
import * as path from "path";
import { DataSource, EntityManager } from "typeorm";

export class Database {
  public static AppDataSource: DataSource;
  public static em: EntityManager;
  private static entityPath: string = "./entities";
  private static migrationsPath: string = "./migrations";

  private static async prepare() {
    dotenv.config();

    const entitiesRead = await Database.getClasses(Database.entityPath);
    console.log("Entities read:");
    console.log(entitiesRead);

    Database.AppDataSource = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOGGING === "true",
      entities: entitiesRead,
      migrationsTableName: "migrations",
      synchronize: true,
    });

    Database.em = Database.AppDataSource.manager;
  }

  private static async getClasses(pathOfClasses: string) {
    const getFileList = async (dirName: string) => {
      let files: any = [];
      const items = await readdir(dirName, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
        } else {
          files.push(`${dirName}/${item.name}`);
        }
      }

      return files;
    };

    const absPathOfClasses = path.resolve(__dirname, pathOfClasses);
    const allFiles: string[] = await getFileList(absPathOfClasses);
    let allFilesJsOrTs = allFiles.filter(
      (f: any) => f.endsWith(".js") || f.endsWith(".ts")
    );
    allFilesJsOrTs = allFilesJsOrTs.map((f) => f.replace(absPathOfClasses, ""));
    let classesRead: any = [];

    for (const f of allFilesJsOrTs) {
      const e = await import(pathOfClasses + f).then((res) =>
        Object.values(res)
      );
      classesRead.push(e);
    }

    classesRead = classesRead.flat();
    return classesRead;
  }

  public static async connect(callback: any = null) {
    try {
      await Database.prepare();
      Database.AppDataSource.initialize()
        .then(() => {
          console.log("The DB is connected correctly", "info");
          if (callback !== null) {
            callback();
          }
        })
        .catch((err) =>
          console.log({ message: err.message, stack: err.stack }, "error")
        );
    } catch (err: any) {
      console.log({ message: err.message, stack: err.stack }, "error");
    }
  }

  public static async disconnect() {
    await Database.AppDataSource.destroy();
  }
}
