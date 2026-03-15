import jwt from "jsonwebtoken";
import User from "../models/user.js";
import passwordHasher from "password-hash";

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

export async function JWTVerify(req, res) {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ token: decoded });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}
