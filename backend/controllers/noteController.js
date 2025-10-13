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
