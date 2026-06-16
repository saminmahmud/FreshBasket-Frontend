import { IoIosBasket } from "react-icons/io";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/60 backdrop-blur-sm transition-opacity ">
      
      <div className="relative w-12 h-12">
        
        {/* Spinner (rotating) */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-green-600"></div>

        {/* Icon (static center) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <IoIosBasket className="text-green-700" size={30} />
        </div>

      </div>

    </div>
  );
};

export default PageLoader;