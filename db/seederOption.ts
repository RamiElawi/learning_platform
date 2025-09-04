import { DataSource } from "typeorm";
import {dataSourceOption} from './dataSource'
import { config } from "dotenv";

config()

export const AppDataSource=new DataSource(dataSourceOption)

export default AppDataSource