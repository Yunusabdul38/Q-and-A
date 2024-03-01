import { Outlet } from "react-router-dom";
export default function App() {
  return (
    <div className="bg-blue-900 h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}
