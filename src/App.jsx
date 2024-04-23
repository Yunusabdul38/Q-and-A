import { Outlet } from "react-router-dom";
import Header from "./componenet/Header";
import ContexProvider from "./context/UserContextProvider";
import Navbar from "./componenet/Navbar";
export default function App() {
  return (
    <ContexProvider>
      <div className="h-screen grid sm:grid-cols-[0.2fr_2fr]">
        <Navbar/>
        <section className="bg-[#074173] h-screen w-full overflow-y-scroll">
          <Header />
          <Outlet />
        </section>
      </div>
    </ContexProvider>
  );
}