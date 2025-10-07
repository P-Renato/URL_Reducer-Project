import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class Url extends Model {
  declare id: number;
  declare origialUrl: string;
  declare shortUrl: string;
}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
      },
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 20],
      },
    }
    
  },
  {
    sequelize,
    tableName: "url",
    timestamps: false,
  }
);

export default Url;