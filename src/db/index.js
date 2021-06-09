import s from "sequelize";
import pg from "pg";
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
import PostsModel from "./blogPosts.js";
import AuthorsModel from "./authors.js";

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
});
const pool = new pg.Pool();
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

  sequelize: sequelize,
  pool: pool,
};

models.Post.hasMany(models.Author);
models.Author.belongsTo(models.Post);

/* models.Class.belongsToMany(models.Student, {
  through: { model: models.StudentClass, unique: false, timestamps: false },
}); */

/* models.Tutor.hasMany(models.Class);
models.Class.belongsTo(models.Tutor); */
test();

export default models;
