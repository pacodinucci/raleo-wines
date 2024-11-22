import MainNav from "./main-nav";
import { Search, Bell } from "lucide-react";
import { SearchInput } from "../components/ui/search-input";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-slate-50 text-white">
      <div className="w-full flex items-center gap-x-2">
        <Search className="text-slate-500" />
        <SearchInput
          placeholder="Buscar productos, ordenes, etc..."
          className="w-full bg-transparent border-none outline-none text-slate-500 focus:ring-0 focus:border-transparent focus:outline-none"
        />
      </div>
      <div className="flex gap-x-4 items-center">
        <Bell className="text-slate-700" size={20} />
        {/* <UserButton /> */}
      </div>
    </div>
  );
};

export default Navbar;
