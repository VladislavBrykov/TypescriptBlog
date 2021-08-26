import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  storage: 'path/to/database.postgres',
});

export default sequelize;
