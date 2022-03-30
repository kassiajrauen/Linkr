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

export const usersRepository = { existUser, createUser };
