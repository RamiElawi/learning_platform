import { config } from "dotenv";
import { DataSource ,DataSourceOptions} from "typeorm";
// import { SeederOptions } from "typeorm-extension";


 config()

export const dataSourceOption:DataSourceOptions ={
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATA_BASE,
    // seeds: ['dist/db/seeds/**/*.js'],
    entities: [__dirname+'/../**/*.entity{.ts,.js}'],
    // migrations:['dist/db/migrations/*{.ts,.js}'],
    synchronize: true,
    // logging:false
}

const dataSource=new DataSource(dataSourceOption)
dataSource.initialize()
export default dataSource;