import express from "express";
import models from "../db/index.js";
const Comment = models.Comment;
const Post = models.Post;
const Author = models.Author;

const commentsRouter = express.Router();

/****************POST BLOGPOSTS******************/

commentsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Comment.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Comment.findAll({
      include: [
        { model: Author, attributes: ["name", "surname"] },
        { model: Post, attributes: ["title"] },
      ],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });

    // next(error);
  }
});

commentsRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentsRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentsRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default commentsRouter;
