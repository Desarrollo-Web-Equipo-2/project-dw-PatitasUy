import { DataTypes, Model } from 'sequelize';
import db from '../db/config';

class User extends Model {
  declare status: boolean;
  declare password: string;
  declare user_id: number;
}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  surname: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},{
  sequelize: db,
  modelName: 'User'
});

export default User;