import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db";

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

    origin_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 450],
      },
    },
    short_url: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [4, 50],
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