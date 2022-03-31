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

export const usersRepository = { existUser, createPost };
