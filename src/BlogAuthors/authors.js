import express from "express";
import models from "../db/index.js";
const Author = models.Author;
const Post = models.Post;

const authorsRouter = express.Router();

/****************POST BLOGPOSTS******************/

authorsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Author.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authorsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Author.findAll({
      attributes: ["name", "surname", "avatar"],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });

    // next(error);
  }
});

authorsRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authorsRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authorsRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default authorsRouter;
