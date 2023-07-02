import { DataTypes } from "sequelize";
import db from "../db/config";

const Post = db.define('Post', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  },
  sex : {
    type: DataTypes.STRING
  },
  specie: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
}
);

export default Post;