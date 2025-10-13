import { House, FilePlus } from "lucide-react";

const SideBar = () => {
  return (
    <div className="bg-gray-800 h-full w-[80px] flex flex-col justify-center items-center gap-6 rounded-r-3xl">
      <House
        size={42}
        className="hover:text-amber-500 ease-in transition-all cursor-pointer"
      />
      <FilePlus
        size={42}
        className="hover:text-amber-500 ease-in transition-all cursor-pointer"
      />
    </div>
  );
};

export default SideBar;
