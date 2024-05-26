import PropTypes from "prop-types";

export default function Leads({data}) {
  const {image,name,win,loss,point,rank} = data
  return (
    <li
      className="uppercase grid grid-cols-[1fr_5fr_1fr_1fr_1fr_1fr_1fr]  even:border-gray-950 p-2 even:bg-slate-50 odd:bg-sky-300 items-center"
      role="row"
    >
      <span>{rank}</span>
      <div className="text-base sm:text-xl capitalize flex items-center gap-4">
        <img
          src={image}
          className="rounded-full w-12 h-12 text-center"
          alt="YA"
        />
        <span>{name}</span>
      </div>
      <span>{win+loss}</span>
      <span>{win}</span>
      <span>{loss}</span>
      <span>{point}</span>
    </li>
  );
}

//props type
Leads.propTypes = {
  data: PropTypes.object,
};