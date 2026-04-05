const Input = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={props.htmlFor}
        className="text-sm font-medium text-gray-200"
      >
        {props.children}
      </label>
      <input
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        autoComplete={props.autoComplete}
        required
        className="h-11 w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
