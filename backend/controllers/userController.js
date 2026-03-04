import User from "../models/user.js";
import passwordHasher from "password-hash";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const passwordHash = passwordHasher.generate(password);
    const result = await User.create({
      name,
      email,
      password: passwordHash,
    });
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ erro: "erro ao criar usuario", message: err.message });
  }
}

export async function getUser(req, res) {
  const id = req.params.id;
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

export async function authUser(req, res) {
  const { email, password } = req.body;
  try {
    const result = await User.find({ email });
    if (result.length > 0) {
      if (
        passwordHasher.verify(password, result[0].password) &&
        email == result[0].email
      ) {
        const token = jwt.sign({ foo: result[0]._id }, "shhh");
        res.status(200).json({ token });
      } else {
        res.status(401).json({ err: "Email ou senha incorretos" });
      }
    } else {
      res.status(401).json({ err: "Email ou senha incorretos" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}
