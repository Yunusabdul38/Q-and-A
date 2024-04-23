import { useLoaderData } from "react-router-dom";
import Authentication from "../componenet/Authentication";

export default function Home() {
  let logUser = JSON.parse(useLoaderData());
  if (!logUser?.name) return <Authentication />;
  return <div>Home</div>;
}
