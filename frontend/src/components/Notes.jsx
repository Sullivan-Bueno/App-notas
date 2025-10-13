const Notes = ({ note }) => {
  if (note.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-white text-3xl">Carregando...</h1>
      </div>
    );
  }
  function formatDate(date) {
    const dataF = new Date(date);
    return dataF;
  }
  return (
    <div className="h-full w-full bg-[rgba(0,0,0,0.4)]">
      <div className="grid grid-cols-3 gap-5">
        {note.map((n) => {
          const data = formatDate(n.date);
          return (
            <div key={n._id} className=" bg-amber-200 m-3 rounded-2xl p-2">
              <div className="w-full">
                <p className="font-semibold">{`${data}`}</p>
                <h1 className="text-2xl font-semibold">{n.titulo}</h1>
              </div>

              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati soluta sint accusantium ab alias rerum a inventore
                libero necessitatibus, similique quasi reprehenderit provident
                eligendi aliquam.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
