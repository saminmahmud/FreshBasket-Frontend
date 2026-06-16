import { IoMdAlert } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FetchError = ({message="Failed to load. Please check your internet connection and try again."}) => {
	const navigate = useNavigate();
	return (
		<div className="">
		<div className="flex flex-col items-center justify-center gap-4 py-10">
			<div className="flex items-center justify-center bg-red-100 rounded-lg px-4 py-3">
				<IoMdAlert className="text-red-500 text-lg mr-2" />
				<h3 className="text-red-500 text-md">
					{message}
				</h3>
			</div>
			<button onClick={()=>navigate(-1)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 active:scale-[0.98] text-white font-bold text-sm transition-all shadow-lg shadow-red-700/25">
				Go back
			</button>
		</div>
		</div>
	);
};

export default FetchError;
