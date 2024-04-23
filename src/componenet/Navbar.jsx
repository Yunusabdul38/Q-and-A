import { MdLeaderboard } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { CgGames } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className="fixed w-[90%] sm:w-fit -translate-y-1 sm:translate-x-0 sm:translate-y-0 sm:left-0 left-1/2 -translate-x-2/4 sm:relative bottom-0 sm:shadow-none sm:rounded-none shadow-sm rounded-md bg-gray-50 flex sm:flex-col justify-between sm:justify-start sm:gap-5 sm:pt-14 sm:pl-4 uppercase text-gray-900 px-4 py-2 font-lexendDeca items-center">
      <NavLink
        to="/play"
        className="flex flex-col items-center gap-1 transition-all duration-100"
      >
       <CgGames/>
        <span>play</span>
      </NavLink>
      <NavLink
        to="/profile"
        className="flex flex-col items-center gap-1 transition-all duration-100"
      >
        <FiUser className="text-2xl" />
        <span>profile</span>
      </NavLink>
      <NavLink
        to="/leadbord"
        className="flex flex-col items-center gap-1 transition-all duration-100"
      >
        <MdLeaderboard className="text-2xl" />
        <span>leadbord</span>
      </NavLink>
    </ul>
  );
}
