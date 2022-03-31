import { Router } from "express";
import { createPost, getPosts } from "../crontrollers/postsController.js";
import { validatePosts } from "../middlewares/validatePosts.js";

const postsRouter = Router();
postsRouter.post("/posts", validatePosts, createPost);
postsRouter.get("/timeline", getPosts);

export default postsRouter;
