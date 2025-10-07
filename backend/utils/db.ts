import { Sequelize } from "sequelize";
import 'dotenv/config';


const sequelize = new Sequelize(process.env.DB_URL as string, { logging: false });
export default sequelize;