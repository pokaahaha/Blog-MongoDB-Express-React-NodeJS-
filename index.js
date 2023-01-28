import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  LoginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./conrollers/UserController.js";
import * as PostController from "./conrollers/PostController.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:qwerty888@cluster0.mzk2vqw.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("db ok"))
  .catch((err) => console.log("db error", err));

const app = express();
app.use(express.json());

{
  /* User */
}
app.post("/auth/login", LoginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});
