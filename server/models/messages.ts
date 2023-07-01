import { DataTypes } from 'sequelize';
import db from '../db/config';

const Messages = db.define('Messages', {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chat_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

export default Messages;
