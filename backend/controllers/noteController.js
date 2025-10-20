import Note from "../models/note.js";

export async function getNotes(req, res) {
  const id = req.params.id;
  if (!id) {
    try {
      const result = await Note.find();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const result = await Note.find({ _id: id });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export async function deleteNotes(req, res) {
  const id = req.params.id;
  try {
    const result = await Note.deleteOne({ _id: id });
    res.status(200).send("Nota apagada com sucesso!" + result);
  } catch (err) {
    res.status(501).json(err);
  }
}
