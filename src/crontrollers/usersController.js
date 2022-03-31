import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { usersRepository } from "../repositories/usersRepository.js";

export async function createUser(req, res) {
  const { username, password, email, pictureUrl } = req.body;

  try {
    const exist = await usersRepository.existUser(email);
    if (exist.rowCount > 0) {
      return res.sendStatus(409);
    }
    if (username === " " || password === " ") {
      return res.sendStatus(400);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await usersRepository.createUser(username, passwordHash, email, pictureUrl);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await usersRepository.existUser(email);
    if (user.rowCount === 0) {
      return res.sendStatus(401);
    }
    if (bcrypt.compareSync(password, user.rows[0].password)) {
      const token = uuid();
      const data = { ...user.rows[0], token: token, userId: user.rows[0].id };
      await usersRepository.createSessionToken(token, user.rows[0].id);

      return res.status(200).send(data);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteSession(req, res) {
  const { id } = req.params;
  try {
    const existSession = await usersRepository.existSession(id);
    if (existSession.rowCount === 0) {
      return res.sendStatus(404);
    } else {
      await usersRepository.deleteSession(id);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
