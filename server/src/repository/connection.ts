import { Sequelize } from "sequelize"

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(
  "fishy",
  "sa",
  "d3i[S5RE[wY}7|7naL2G#|i",
  {
    host: "localhost",
    dialect: "mssql",
  }
)
