import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize"
import { sequelize } from "./connection.js"
import { FishModel } from "./fish-model.js"

export interface RegionModel
  extends Model<
    InferAttributes<RegionModel>,
    InferCreationAttributes<RegionModel>
  > {
  id: CreationOptional<string>
  name: string
  Fishes: NonAttribute<FishModel[]>
}

export const Region = sequelize.define<RegionModel>(
  "Region",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "regions",
    timestamps: false,
  }
)

await Region.sync({ alter: true })
