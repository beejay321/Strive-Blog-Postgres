import s from "sequelize";
import pg from "pg";
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import PostsModel from "./blogPosts.js";
import AuthorsModel from "./authors.js";
import CommentsModel from "./comments.js";
import CategoryModel from "./category.js";

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const pool = new pg.Pool();

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const models = {
  Author: AuthorsModel(sequelize, DataTypes),
  Post: PostsModel(sequelize, DataTypes),
  Comment: CommentsModel(sequelize, DataTypes),
  Category: CategoryModel(sequelize, DataTypes),

  sequelize: sequelize,
  pool: pool,
};

models.Author.hasMany(models.Post);
models.Post.belongsTo(models.Author);

models.Category.hasMany(models.Post);
models.Post.belongsTo(models.Category);

models.Author.belongsToMany(models.Post, { through: { model: models.Comment, unique: false, timestamps: false } });
models.Post.belongsToMany(models.Author, { through: { model: models.Comment, unique: false, timestamps: false } });

models.Author.hasMany(models.Comment);
models.Comment.belongsTo(models.Author);

models.Post.hasMany(models.Comment);
models.Comment.belongsTo(models.Post);

test();

export default models;
