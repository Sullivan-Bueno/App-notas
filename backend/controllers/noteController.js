import Note from "../models/note.js";
import axios from "axios";

export async function getNotes(req, res) {
  const id = req.params.id;
  if (!id) {
    try {
      const result = await Note.find();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const result = await Note.find({ _id: id });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export async function addNotes(req, res) {
  try {
    const { title, description } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const axiosResult = await tokenrequest(token);
    const userId = axiosResult.data.token.userId;

    const result = await Note.create({
      title,
      description,
      userId,
    });
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function deleteNotes(req, res) {
  const id = req.params.id;
  try {
    await Note.deleteOne({ _id: id });
    res.status(200).send("Nota apagada com sucesso!");
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateNotes(req, res) {
  const id = req.params.id;
  try {
    const { title, description } = req.body;
    const updatedNote = await Note.updateOne(
      { _id: id },
      { title, description },
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function tokenrequest(token2) {
  const result = axios.get("http://localhost:5000/auth/verify-token", {
    headers: {
      authorization: `Bearer ${token2}`,
    },
  });
  return result;
}
