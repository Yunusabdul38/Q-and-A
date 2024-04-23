export default function Leadbord() {
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
          <span>d</span>
          <span>l</span>
          <span>pt</span>
        </li>
        <li
          className="uppercase grid grid-cols-[1fr_5fr_1fr_1fr_1fr_1fr_1fr]  even:border-gray-950 p-2 even:bg-slate-50 odd:bg-sky-300 items-center"
          role="row"
        >
          <span>1</span>
          <div className="text-base sm:text-xl capitalize flex items-center gap-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww"
              className="rounded-full w-12 h-12 text-center"
              alt="YA"
            />
            <span>yunus abdul</span>
          </div>
          <span>5</span>
          <span>6</span>
          <span>2</span>
          <span>4</span>
          <span>50</span>
        </li>
      </ul>
    </section>
  );
}
