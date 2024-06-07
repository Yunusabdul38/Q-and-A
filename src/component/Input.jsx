import PropTypes from "prop-types";

export default function Input({ label, type, children }) {
  // input validation through form hook register function
  const data =
    label === "password" ? children[0].props?.data : children.props?.data;
  return (
    <div className="relative input-box">
      <input
        type={type}
        id={label}
        required
        className="text-gray-50 pl-[2px] border-b-2 border-gray-50 border-solid w-full bg-inherit outline-none focus:bg-slate-50 focus:text-black "
        {...data}
        autoComplete="off"
      />
      {children}
    </div>
  );
}

Input.propTypes = {
  label:PropTypes.string,
  type:PropTypes.string,
  children:PropTypes.element
};
