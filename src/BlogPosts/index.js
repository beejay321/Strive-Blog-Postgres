import express from "express"; // third party module(needs to ne installed)
import { validationResult } from "express-validator";
import createError from "http-errors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { generatePDFStream } from "../lib/pdf.js";
// import { pipeline } from "stream";
// import { Transform } from "json2csv";
import blogPostsModel from "../db/blogPosts.js";
import query from "../utils/util.js";

const BlogPostsRouter = express.Router();

/****************POST BLOGPOSTS******************/

BlogPostsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { category, title, cover, read_time_value, read_time_unit, content } = req.body;
    const dbResponse = await query(
      `INSERT INTO blogs (category,title,cover,read_time_value,read_time_unit,content) 
        VALUES('${category}', '${title}', '${cover}', ${read_time_value}, '${read_time_unit}', '${content}') RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    next(error);
  }
});

/****************GET POSTS******************/
BlogPostsRouter.get("/", async (req, res, next) => {
  try {
    const dbResponse = await query("SELECT * FROM blogs");
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************GET SINGLE POST******************/
BlogPostsRouter.get("/:id", async (req, res, next) => {
  try {
    const dbResponse = await query(`SELECT * FROM blogs WHERE post_id=${req.params.id}`);
    if (dbResponse) {
      res.status(200).send(dbResponse);
    } else {
      res.status(404).send({ error: "blog not found" });
    }
    // res.status(dbResponse ? 200 : 404).send(dbResponse ? dbResponse : { error: "student not found" });
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

// export default BlogPostsRouter;
