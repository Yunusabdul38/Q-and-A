export default function Button({style=null, children,onClick=null,type=null,state,disabled}) {
   const primary = "bg-blue-700 hover:bg-blue-400"
   const secondary =`${
    state ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-700"
  } `
  return (
    <button
      type="submit"
      className={`${type==="primary"?primary:secondary} capitalize text-gray-50 py-3 sm:px-10 ${style?style:""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
