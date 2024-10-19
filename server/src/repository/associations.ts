import { sequelize } from "./connection.js"
import { Fish } from "./fish-model.js"
import { Region } from "./region-model.js"

Region.hasMany(Fish, {
  foreignKey: "region_id",
  onDelete: "CASCADE",
})
Fish.belongsTo(Region, {
  foreignKey: "region_id",
  as: "region",
})

await sequelize.sync({ alter: true })
