import { Router } from "express";
import {
  createPost,
  getPosts,
  like,
  unlike,
  getLikes,
} from "../crontrollers/postsController.js";
import { validatePosts } from "../middlewares/validatePosts.js";
import { validateToken } from "../middlewares/validateToken.js";

const postsRouter = Router();
postsRouter.post("/posts", validateToken, validatePosts, createPost);
postsRouter.get("/timeline", validateToken, getPosts);
postsRouter.post("/likes/:postId", validateToken, like);
postsRouter.delete("/likes/:postId", validateToken, unlike);
postsRouter.get("/likes/:postId", validateToken, getLikes);

export default postsRouter;
