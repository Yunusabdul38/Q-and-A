export default function Button({ children,onClick=null,type,state,disabled}) {
   const primary = "bg-blue-700 hover:bg-blue-400"
   const secondary =`${
    state ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-700"
  } `
  return (
    <button
      type="submit"
      className={`${type==="primary"?primary:secondary} capitalize text-gray-50 py-3 px-10`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
