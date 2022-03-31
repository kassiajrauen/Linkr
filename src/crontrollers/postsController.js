import connection from "../database.js";
import { usersRepository } from "../repositories/postsRepository.js";

export async function createPost(req, res) {
  const { userId, description, link } = req.body;

  const existUser = usersRepository.existUser(userId);
  if (existUser.rowCount === 0) {
    return res.sendStatus(400);
  }

  try {
    const post = usersRepository.createPost(userId, description, link);
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

// export async function getAll(req, res) {
//   const id = 1;
//   try {
//     const all = await connection.query(
//       `
//             SELECT users.*, posts.*
//             FROM posts JOIN users ON posts."userId"=users.id
//             WHERE users.id=1
//             ORDER BY posts."createdAt" DESC;
//         `
//     );
//     return all;
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// }
