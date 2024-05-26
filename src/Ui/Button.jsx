import PropTypes from "prop-types";

export default function Button({style=null, children,onClick=null,type=null,state,disabled}) {
  // button colours variables for primary and secondary colours
   const primary = "bg-blue-700 hover:bg-blue-400"
   const secondary =`${
    state ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-700"
  } `
  return (
    <button
      type="submit"
      className={`${type==="primary"?primary:secondary} capitalize text-gray-50 py-3 px-10 ${style?style:""} w-fit`}
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
  children: PropTypes.element,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick:PropTypes.func,
  state:PropTypes.bool,
};