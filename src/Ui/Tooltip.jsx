import PropTypes from "prop-types";

export default function Tooltip({ message, children }) {
    return (
    <div className="group relative flex">
        {children}
        <span className="absolute top-2 -left-16 capitalize text-base scale-0 transition-all rounded bg-gray-800 p-2 text-white group-hover:scale-100">{message}</span>
    </div>
    )
}

//props type
Tooltip.propTypes = {
    message: PropTypes.string,
    children:PropTypes.element,
};