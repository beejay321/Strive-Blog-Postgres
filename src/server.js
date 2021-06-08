import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorsRoutes from "./BlogAuthors/index.js";
import blogPostsRoutes from "./BlogPosts/index.js";
import { notFoundErrorHandler, badRequestErrorHandler, forbiddenErrorHandler, catchAllErrorHandler } from "./errorHandlers.js";

const server = express();

const PORT = process.env.PORT 
// || 3001;

server.use(cors());
server.use(express.json());

server.use("/authors", authorsRoutes);

server.use("/blogPosts", blogPostsRoutes);

server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

server.listen(PORT, () => console.log("server is running on port ", PORT));

server.on("error", (err) => console.log("server is not running ", err));




