const MessageComponent = (props) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
      <div className="p-10 rounded-4xl bg-[rgba(0,0,0,0.6)]">
        <h1 className="text-white text-3xl ">{props.children}</h1>
      </div>
    </div>
  );
};

export default MessageComponent;
