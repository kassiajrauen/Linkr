import connection from "../database.js";

async function existUser(userId) {
  return await connection.query(
    `
    SELECT id FROM users 
    WHERE id=$1
  `,
    [userId]
  );
}

async function createPost(userId, description, link) {
  return await connection.query(
    `
      INSERT INTO
          posts ("userId", description, link, "createdAt")
      VALUES ($1, $2, $3, NOW())
 `,
    [userId, description, link]
  );
}

async function existLike(postId, userId) {
  return connection.query(
    `
      SELECT likes."postId", 
      likes."userId", 
      users.username
      FROM likes
        JOIN users ON users.id = likes."userId"
      WHERE likes."postId"=$1 and likes."userId"=$2
    `,
    [postId, userId]
  );
}

async function insertLike(postId, userId) {
  connection.query(
    `
      INSERT INTO 
        likes ("postId", "userId")
      VALUES ($1, $2)
    `,
    [postId, userId]
  );
}

async function deleteLike(postId, userId) {
  return connection.query(
    `
      DELETE FROM likes
      WHERE likes."postId"=$1 and likes."userId"=$2
    `,
    [postId, userId]
  );
}

async function getLikes(postId) {
  const result = await connection.query(
    `
    SELECT
      users.id AS "userId",
      users.username
    FROM likes
    JOIN users ON likes."userId"=users.id
    WHERE likes."postId"=$1
  `,
    [postId]
  );

  return result.rows;
}

export const postsRepository = {
  existUser,
  createPost,
  existLike,
  insertLike,
  deleteLike,
  getLikes,
};
