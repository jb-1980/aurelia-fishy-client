import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize"
import { sequelize } from "./connection.js"

export interface FishModel
  extends Model<
    InferAttributes<FishModel>,
    InferCreationAttributes<FishModel>
  > {
  id: CreationOptional<string>
  name: string
  imgSrc: string
  caloriesPerServing: number
  fatPerServing: number
  description: CreationOptional<string>
  region_id: string
}

export const Fish = sequelize.define<FishModel>(
  "Fish",
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
    imgSrc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    caloriesPerServing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fatPerServing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    region_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "fishes",
    timestamps: false,
  }
)
