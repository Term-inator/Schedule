import { DataSource } from "typeorm"

console.log("AppDataSource")
const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "data.db",
  entities: ["entity/*.ts"],
  synchronize: true,
  logging: false
})

export default AppDataSource
