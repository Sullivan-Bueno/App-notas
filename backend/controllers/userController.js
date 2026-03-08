import User from "../models/user.js";
import passwordHasher from "password-hash";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true, path: "../.env" });

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
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ err: "Email ou senha incorretos" });
    }

    const isValidPassword = passwordHasher.verify(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ err: "Email ou senha incorretos" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}
