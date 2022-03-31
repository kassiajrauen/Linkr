import connection from "../database.js";
import { usersRepository } from "../repositories/usersRepository.js";
import { postsRepository } from "../repositories/postsRepository.js";

export async function createPost(req, res) {
  const { userId, description, link } = req.body;

  const existUser = usersRepository.existUser(userId);
  if (existUser.rowCount === 0) {
    return res.sendStatus(400);
  }

  try {
    const post = postsRepository.createPost(userId, description, link);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getPosts(req, res) {
  try {
    const existPost = await connection.query(`
      SELECT * FROM posts 
    `);
    if (existPost.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    } else {
      const posts = await connection.query(`
      SELECT posts.*, 
      users.id AS "userId",
      users.username AS "username",
      users."pictureUrl" AS "pictureUrl"
      FROM posts
      JOIN users ON users.id = posts."userId"
      ORDER BY posts."createdAt" DESC LIMIT 20
      `);
      const timeline = posts.rows.map((post) => ({
        id: post.id,
        createdAt: post.createdAt,
        link: post.link,
        description: post.description,
        user: {
          id: post.userId,
          username: post.username,
          pictureUrl: post.pictureUrl,
        },
      }));
      res.send(timeline);
      return res.send(timeline);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}

export async function like(req, res) {
  const { postId } = req.params;
  const userId = res.locals.user.id;
  console.log(userId);

  try {
    const existLike = await postsRepository.existLike(postId, userId);
    if (existLike.rowCount === 0) {
      await postsRepository.insertLike(postId, userId);
      return res.sendStatus(201);
    } else {
      return res.sendStatus(409);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function unlike(req, res) {
  const { postId } = req.params;
  const userId = res.locals.user.id;

  try {
    const existLike = await postsRepository.existLike(postId, userId);
    if (existLike.rowCount > 0) {
      await postsRepository.deleteLike(postId, userId);
      return res.sendStatus(200);
    } else {
      return res.sendStatus(409);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getLikes(req, res) {
  const postId = req.params.postId;

  try {
    const likes = await postsRepository.getLikes(postId);
    return res.status(200).send(likes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
