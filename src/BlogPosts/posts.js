import express from "express";
import models from "../db/index.js";
const Author = models.Author;
const Post = models.Post;

const BlogPostsRouter = express.Router();

/****************POST BLOGPOSTS******************/

BlogPostsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Post.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

BlogPostsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Post.findAll({
    // include : Author
    include : [{model : Author, attributes : ["name", "surname"]}]
    // include : [{model : Author, attributes : {exclude : "avatar"}}],
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
    // next(error);
  }
});

BlogPostsRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

BlogPostsRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

BlogPostsRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default BlogPostsRouter;
