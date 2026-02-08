import User from "../models/user.js"

export async function createUser(req, res) {
  try {
    const { email, passwordHash } = req.body;
    const result = await User.create({
      email,
      passwordHash,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ erro: "erro ao criar usuario" });
  }
}

export async function getUser(req, res) {
  const id = req.params.id
  if (!id) {
    try {
      const result = await User.find();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const result = await User.find({ _id: id });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}