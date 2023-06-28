import { DataTypes, Model } from "sequelize";
import db from "../db/config";
import Post from "./post";


const Likes = db.define('Likes',{
        like_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

export default Likes;