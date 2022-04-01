import { usersRepository } from "../repositories/usersRepository.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  try {
    if (!token) {
      return res.sendStatus(401);
    }

    const sessions = await usersRepository.findSession(token);
    const session = sessions.rows[0];
    if (!session) {
      return res.sendStatus(401);
    }

    const users = await usersRepository.findUser(session.userId);
    const user = users.rows[0];
    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
