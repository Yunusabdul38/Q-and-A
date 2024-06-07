import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PropTypes from 'prop-types';

// password component with validation through form hook register function
export default function Password({ label, children,top }) {
  const [showPassword, setShowPassword] = useState(false);

  //register prop from react hook form
  const data = children[0].props?.data;
 
  // hide or show password 
  const type = showPassword ? "text" : "password"
  //add magin to the top
  const maginTop = top?"mt-9":"mt-0"
  return (
    <div className={`relative input-box ${maginTop}`}>
      <input
        type={type}
        id={label}
        required
        className="text-gray-50 pl-[2px] border-b-2 border-gray-50 border-solid w-full bg-inherit outline-none focus:bg-slate-50 focus:text-black"
        {...data}
        autoComplete="off"
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        className="text-blue-100 absolute right-0 bottom-8 cursor-pointer"
      >
        {showPassword ? <FiEye /> : <FiEyeOff />}
      </span>
      {children}
    </div>
  );
}

//props type
Password.propTypes ={
  label:PropTypes.string,
  children:PropTypes.array
};