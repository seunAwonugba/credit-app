import { config } from 'dotenv';
config();

// export default new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT) || 3306,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: ['dist/**/*.entity.js'],
//   migrations: ['dist/**/migrations/*.js'],
//   // migrationsRun: true,
//   // logging: true,
// });
