import connection from "../database.js";

async function existUser(email) {
  return connection.query(
    `
        SELECT * FROM users WHERE email=$1
      `,
    [email]
  );
}

async function createUser(username, passwordHash, email, pictureUrl) {
  return connection.query(
    `    
    INSERT INTO
      users (username, password, email, "pictureUrl")
    VALUES ($1, $2, $3, $4)
  `,
    [username, passwordHash, email, pictureUrl]
  );
}

async function createSessionToken(token, userId) {
  return connection.query(
    `
    INSERT INTO 
      sessions(token, "userId")
    VALUES ($1, $2)
  `,
    [token, userId]
  );
}

async function findSession(token) {
  return connection.query(
    `
      SELECT * FROM sessions WHERE token=$1
      `,
    [token]
  );
}

async function findUser(userId) {
  return connection.query(
    `
      SELECT * FROM users WHERE id=$1
  `,
    [userId]
  );
}

async function existSession(id) {
  return connection.query(
    `
    SELECT * FROM sessions WHERE "userId"=$1
  `,
    [id]
  );
}

async function deleteSession(id) {
  return connection.query(
    `
      DELETE FROM sessions
      WHERE "userId" = $1
  `,
    [id]
  );
}

export const usersRepository = {
  existUser,
  createUser,
  createSessionToken,
  findUser,
  findSession,
  deleteSession,
  existSession,
};
