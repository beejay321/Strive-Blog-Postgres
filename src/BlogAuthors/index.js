import express from "express"; // third party module(needs to ne installed)
import createError from "http-errors";
import { validationResult } from "express-validator";
import multer from "multer";
// import { generatePDFStream } from "../lib/pdf.js";
import { pipeline } from "stream";
import { Transform } from "json2csv";
import authorsModel from "../db/authors.js"
import query from "../utils/util.js";

const authorsRouter = express.Router();

authorsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, surname, avatar } = req.body;
    const dbResponse = await query(
      `INSERT INTO authors (name, surname, avatar ) 
        VALUES('${name}', '${surname}', '${avatar}') RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authorsRouter.get("/", async (req, res, next) => {
  try {
    const dbResponse = await query("SELECT * FROM authors");
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authorsRouter.get("/:id", async (req, res) => {
  try {
    const dbResponse = await query(`SELECT * FROM authors WHERE author_id = ${req.params.id}`);
    if (dbResponse) {
      res.send(dbResponse);
    } else {
      res.status(404).send({ error: `author does not exist` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/****************UPDATE Author******************/
authorsRouter.put("/:id", async (req, res, next) => {
  try {
    const singleAuthor = await authorsModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    res.send(singleAuthor);
  } catch (error) {
    next(error);
  }
});

/****************DELETE Author******************/
authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const singleAuthor = await authorsModel.findByIdAndDelete(req.params.id);

    if (singleAuthor) {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});

/****************Download csv******************/
authorsRouter.get("/csvDownload", async (req, res, next) => {
  try {
    const fields = ["_id", "name", "surname", "email", "Date of Birth"];
    const options = [fields];
    const jsonToCsv = new Transform(options);
    const source = getAuthorsSource();
    res.setHeader("Content-Disposition", "attachment; filename=export.csv");
    pipeline(source, jsonToCsv, res, (err) => next(err)); // source (file on disk) -> transform (json 2 csv) -> destination (rsponse)
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
