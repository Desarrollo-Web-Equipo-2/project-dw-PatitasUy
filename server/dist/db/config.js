"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('railway', 'root', '4pokgDSDKOx5uZlkSENd', {
    host: 'mysql://root:4pokgDSDKOx5uZlkSENd@containers-us-west-151.railway.app:6915/railway',
    dialect: 'mysql'
});
exports.default = db;
//# sourceMappingURL=config.js.map