import { House, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  function handleHouseClick() {
    navigate("/");
  }

  function handlePlusClick() {
    navigate("/addnotes");
  }

  return (
    <div className="bg-gray-800 h-full w-[80px] flex flex-col justify-center items-center gap-6 rounded-r-3xl">
      <House
        size={35}
        className="hover:text-amber-500 hover:scale-120 text-white ease-in transition-all cursor-pointer"
        onClick={handleHouseClick}
      />
      <Plus
        size={35}
        className="hover:text-amber-500 hover:scale-120 hover:rotate-180 text-white ease-in transition-all cursor-pointer"
        onClick={handlePlusClick}
      />
    </div>
  );
};

export default SideBar;
