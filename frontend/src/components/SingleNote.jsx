const SingleNote = ({ note }) => {
  console.log(note);
  return (
    <div className="text-white h-full w-full bg-red-500">
      <h1 className="text-white">{note.titulo}</h1>
      <p className="text-white">{note.descricao}</p>
      <p className="text-white">{note.date}</p>
    </div>
  );
};

export default SingleNote;
