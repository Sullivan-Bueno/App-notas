const Note = ({ note }) => {
  const data = new Date(note.date);
  const dataFormatada = data.toLocaleDateString("pt-BR");
  return (
    <>
      <div className="w-full">
        <p>{`${dataFormatada}`}</p>
        <h1 className="text-2xl font-semibold">{note.titulo}</h1>
      </div>
      <div className="p-1">
        <p className="truncate">{note.descricao}</p>
      </div>
    </>
  );
};

export default Note;
