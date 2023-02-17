import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  autoLoadEntities: true,
  entities: ['/dist/**/entities/*.entity.js'],
  migrations: ['/src/migration/*.ts'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  keepConnectionAlive: true,
  dropSchema: false,
  cli: {
    migrationsDir: '/src/migration',
  },
} as DataSourceOptions;

const datasource = new DataSource(dataSourceConfig);

datasource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default datasource;
