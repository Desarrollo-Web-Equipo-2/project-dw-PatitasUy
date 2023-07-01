import { DataTypes } from 'sequelize';
import db from '../db/config';

const Chats = db.define('Chats', {
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id_1: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  user_id_2: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  timestamps: false
});

export default Chats;