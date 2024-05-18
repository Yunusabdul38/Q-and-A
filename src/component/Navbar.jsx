import PropTypes from "prop-types";
import { MdLeaderboard } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { CgGames } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
export default function Navbar({fullmenu,setFullMenu}) {
  return (
    <ul className="fixed w-[90%] sm:w-fit -translate-y-1 sm:translate-x-0 sm:translate-y-0 sm:left-0 left-1/2 -translate-x-2/4 sm:relative bottom-0 sm:shadow-none sm:rounded-none shadow-sm rounded-md bg-gray-50 flex sm:flex-col justify-between sm:justify-start sm:gap-12 sm:pt-14 sm:pl-4 uppercase text-gray-900 px-4 py-2 font-lexendDeca items-center">
      <CiMenuFries className="text-3xl fixed top-2 left-4 hidden sm:block" onClick={setFullMenu}/>
      <NavLink
        to="/"
        className="flex flex-col sm:flex-row sm:w-full sm:justify-between items-center gap-1 transition-all duration-100"
      >
       <CiHome className="text-2xl"/>
        <span className={`${fullmenu?"sm:hidden":"sm:block"}`}>home</span>
      </NavLink>
      <NavLink
        to="/play"
        className="sm:w-full sm:justify-between flex flex-col sm:flex-row items-center gap-1 transition-all duration-100"
      >
       <CgGames className="text-2xl"/>
        <span className={`${fullmenu?"sm:hidden":"sm:block"}`}>play</span>
      </NavLink>
      <NavLink
        to="/profile"
        className="flex flex-col sm:flex-row sm:w-full sm:justify-between items-center gap-1 transition-all duration-100"
      >
        <FiUser className="text-2xl" />
        <span className={`${fullmenu?"sm:hidden":"sm:block"}`}>profile</span>
      </NavLink>
      <NavLink
        to="/leadbord"
        className="flex  flex-col sm:flex-row items-center gap-1 transition-all duration-100"
      >
        <MdLeaderboard className="text-2xl" />
        <span className={`${fullmenu?"sm:hidden":"sm:block"}`}>leadbord</span>
      </NavLink>
    </ul>
  );
}

Navbar.propTypes = {
  fullmenu:PropTypes.bool,
  setFullMenu:PropTypes.func
};