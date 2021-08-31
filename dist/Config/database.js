"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    storage: 'path/to/database.postgres',
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map