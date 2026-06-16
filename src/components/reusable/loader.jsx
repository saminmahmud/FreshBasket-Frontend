import { IoIosBasket } from "react-icons/io";

const Loader = ({message, w=12}) => {
  return (
    <div
      className="flex flex-col justify-center items-center"
    >
      <div className={`relative w-${w} h-${w}`}>
        {/* Spinner (rotating) */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-green-600"></div>

        {/* Icon (static center) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <IoIosBasket className="text-green-700" size={w*2} />
        </div>
        {message && <p className="text-sm text-gray-600 mt-14">{message}</p>}
      </div>
    </div>
  );
};

export default Loader;