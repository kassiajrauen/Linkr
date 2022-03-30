import bcrypt from "bcrypt";
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
      console.log("ok");
      return res.sendStatus(401);
    }
    if (bcrypt.compareSync(password, user.rows[0].password)) {
      return res.status(200).send(user.rows[0]);
    } else {
      console.log("aqui");
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
