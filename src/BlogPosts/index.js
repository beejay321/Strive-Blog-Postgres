import express from "express"; // third party module(needs to ne installed)
import { validationResult } from "express-validator";
import createError from "http-errors";
import { blogPostsValidation } from "./validation.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { generatePDFStream } from "../lib/pdf.js";
// import { pipeline } from "stream";
// import { Transform } from "json2csv";
import blogPostsModel from "./schema.js";
import query from "../utils/util.js";

const BlogPostsRouter = express.Router();

/****************POST BLOGPOSTS******************/

BlogPostsRouter.post("/", async (req, res, next) => {
  try {
    const newPost = new blogPostsModel(req.body);

    const mongoRes = await newPost.save();
    res.status(201).send(mongoRes);
  } catch (error) {
    next(error);
  }
});

/****************GET POSTS******************/
BlogPostsRouter.get("/", async (req, res, next) => {
  try {    

    const dbResponse = await query(
      "SELECT * FROM blogs"
    );
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************GET SINGLE POST******************/
BlogPostsRouter.get("/:id", async (req, res, next) => {
  try {
    const singlePost = await blogPostsModel.findById(req.params.id)
    // .populate("author");
    // const singlePosts = await blogPostsModel.findOne(${mongo query})

    if (singlePost) {
      res.send(singlePost);
    } else {
      next(createError(404, `Post ${req.params.id} not found `));
      // createError(err.status, error.message)
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************UPDATE POST******************/
BlogPostsRouter.put("/:id", async (req, res, next) => {
  try {
    const singlePost = await blogPostsModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    res.send(singlePost);
  } catch (error) {
    next(error);
  }
});

/****************DELETE POST******************/
BlogPostsRouter.delete("/:id", async (req, res, next) => {
  try {
    const singlePost = await blogPostsModel.findByIdAndDelete(req.params.id);

    if (singlePost) {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});


   



export default BlogPostsRouter;
