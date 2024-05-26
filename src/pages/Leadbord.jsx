import { useEffect } from "react";
import { fetchLeadBord } from "../services/fetchData";
import { useDispatch } from "react-redux";
import { useLeads } from "../hook/useStore";
import Spinner from "../Ui/Spinner";
import Leads from "../component/Leads";

export default function Leadbord() {
  const { loadingLeads, table } = useLeads();
  const dispatchFn = useDispatch();
  useEffect(() => {
    dispatchFn(fetchLeadBord());
  }, [dispatchFn]);

  if (loadingLeads) return <Spinner />;
  return (
    <section className="p-8 font-lexendDeca">
      <ul className="bg-gray-50" role="table">
        <li
          className="uppercase grid grid-cols-[1fr_5fr_1fr_1fr_1fr_1fr_1fr]  even:border-gray-950 p-2 even:bg-slate-50 odd:bg-green-400 text-base"
          role="row"
        >
          <span>S/N</span>
          <span className="capitalize">name</span>
          <span>p</span>
          <span>w</span>
          <span>l</span>
          <span>pt</span>
        </li>
        {table.map((data, index) => (
          <Leads
            data={{
              image: data.image,
              name: data.fullName,
              loss: data.loss,
              point: data.point,
              win: data.win,
              rank: index + 1,
            }}
            key={index}
          />
        ))}
      </ul>
    </section>
  );
}
