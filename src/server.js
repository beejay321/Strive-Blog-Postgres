import express from "express";
import cors from "cors";
import db from "./db/index.js";
import listEndpoints from "express-list-endpoints";
import authorsRoutes from "./BlogAuthors/authors.js";
import blogPostsRoutes from "./BlogPosts/posts.js";
import commentsRoutes from "./Comments/index.js";
import { notFoundErrorHandler, badRequestErrorHandler, forbiddenErrorHandler, catchAllErrorHandler } from "./errorHandlers.js";

const server = express();

const port = process.env.PORT;
// || 3001;

server.use(cors());
server.use(express.json());

server.use("/authors", authorsRoutes);
server.use("/comments", commentsRoutes);

server.use("/blogPosts", blogPostsRoutes);

server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

// server.listen(PORT, () => console.log("server is running on port ", PORT));
// server.on("error", (err) => console.log("server is not running ", err));

db.sequelize
  .sync({ force:true })
  .then(() => {
    server.listen(port, () => console.log("server is running: " + port));
    server.on("error", (error) => console.info(" ❌ Server is not running due to : ", error));
  })
  .catch((e) => {
    console.log(e);
  });
