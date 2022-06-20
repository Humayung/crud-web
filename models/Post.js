const { DataTypes } = require('sequelize');
const db = require('../database');
const Author = require('../models/Author')
const Category = require('../models/Category')

const Post = db.define('Post',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    title : DataTypes.STRING(80),
    content : DataTypes.TEXT,
    author_id: {
        type: DataTypes.INTEGER,

        references: {
            // This is a reference to another model
            model: Author,

            // This is the column name of the referenced model
            key: 'id'
        }
    },
    content : DataTypes.TEXT,
    date : DataTypes.DATE,
    category_id: {
        type: DataTypes.INTEGER,

        references: {
            // This is a reference to another model
            model: Category,

            // This is the column name of the referenced model
            key: 'id'
        }
    },

})

module.exports = Post;
