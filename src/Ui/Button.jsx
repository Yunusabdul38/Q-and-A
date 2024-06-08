import PropTypes from "prop-types";

export default function Button({style=null, children,onClick=null,type=null,state,disabled,top}) {
  // button colours variables for primary and secondary colours
   const primary = "bg-blue-700 hover:bg-blue-400"
   const secondary =`${
    state ? "bg-blue-500" : "bg-blue-800 hover:bg-blue-700"
  } `
  const maginTop = top?"mt-4":"mt-0"
  return (
    <button
      type="submit"
      className={`${type==="primary"?primary:secondary} capitalize text-gray-50 py-3 px-10 ${style?style:""} w-fit disabled:cursor-not-allowed ${maginTop}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

//props type
Button.propTypes = {
  style: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick:PropTypes.func,
  state:PropTypes.bool,
};