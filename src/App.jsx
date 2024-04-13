import { NavLink, Outlet } from "react-router-dom";
import Header from "./componenet/Dashbord/Header";
export default function App() {
  return (
    <div className=" h-screen grid sm:grid-cols-[0.5fr_2fr]">
      <ul className="bg-gray-50 flex flex-col gap-5 pt-14 pl-4 uppercase text-gray-900">
        <NavLink to="/dashbord/home">Home</NavLink>
        <NavLink to="/dashbord/play">Play</NavLink>
        <NavLink to="/dashbord/profile">profile</NavLink>
        <NavLink to="/dashbord/leadbord">leadbord</NavLink>
      </ul>
      <section className="bg-[#074173] h-screen w-full overflow-y-scroll">
       <Header/>
        <Outlet />
      </section>
    </div>
  );
}
