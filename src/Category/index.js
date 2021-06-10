import express from "express";
import models from "../db/index.js";
const Category = models.Category;
const Post = models.Post;

const categoryRouter = express.Router();

/****************POST BLOGPOSTS******************/

categoryRouter.post("/", async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.get("/", async (req, res, next) => {
  try {
    const data = await Category.findAll({
      // attributes: ["text"],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });

    // next(error);
  }
});

categoryRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

categoryRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default categoryRouter;
