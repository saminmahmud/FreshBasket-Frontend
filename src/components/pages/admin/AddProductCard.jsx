import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddProductCard = ({product, onClickEdit, onClickDelete}) => {
	return (
		<div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col">
			{/* <!-- Image --> */}
			<div className="relative bg-gray-50 h-40 flex items-center justify-center overflow-hidden">
				{/* <!-- Discount Badge --> */}
                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
				{parseFloat(product.final_discount) > 0 && (
					<span className=" bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
						{parseFloat(product.final_discount).toFixed(2)}% OFF {product.is_flash_sale ? '| Flash Sale' : '' }
					</span>
				)}

                {product.is_organic && (
                    <div className="flex items-center gap-1">    
                        <span className="bg-green-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                            <FaLeaf className="text-green-100" />
                            Organic
                        </span>
                    </div>
                )}
                </div>
				<img
					src={product.image}
					alt={product.name}
					className="w-44 object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>

			{/* <!-- Content --> */}
			<div className="p-3 flex flex-col gap-1 flex-1">
				{/* <!-- Unit --> */}
				<span className="text-[11px] text-gray-400">{product.unit_quantity}{product.unit}</span>

				{/* <!-- Title --> */}
				<h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 overflow-hidden">
					{product.name} {product.unit_quantity}{product.unit}
				</h3>


				<div className="">
                    <p className="text-xs text-gray-600">{product.description.slice(0, 50)}...</p>
					<span className="text-xs"><strong>Stock:</strong> {product.stock}</span>
				</div>

				{/* <!-- Price + Button --> */}
				<div className="">
					<div>
						<span className="text-base font-extrabold text-green-800">
							{parseFloat(product.final_price).toFixed(2)}Tk
						</span>
						<span className="text-[11px] text-gray-400">/{product.unit_quantity}{product.unit}</span>

						<span className="text-xs text-gray-400 line-through ml-1">
							{parseFloat(product.price).toFixed(2)}Tk
						</span>
					</div>

					{/* <!-- Edit & Delete Button --> */}
					<div className="flex items-center gap-2 mt-2">
						<button onClick={onClickEdit} className="text-xs font-bold text-blue-600 px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all">
							Edit
						</button>
						<button onClick={onClickDelete} className="text-xs font-bold text-red-500 px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 transition-all">
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProductCard
