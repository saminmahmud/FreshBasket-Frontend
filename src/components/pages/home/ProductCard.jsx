import { Link } from "react-router-dom";


const ProductCard = ({product, addToCartHandler}) => {
	return (
		<Link to={`/products/${product.id}`} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col">
			{/* <!-- Image --> */}
			<div className="relative bg-gray-50 h-40 flex items-center justify-center overflow-hidden">
				{/* <!-- Discount Badge --> */}
				{product.final_discount > 0 && (
					<span className="absolute top-2.5 left-2.5 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
						{parseFloat(product.final_discount).toFixed(2)}% OFF
					</span>
				)}

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

				{/* <!-- Rating --> */}
				<div className="flex items-center gap-1">
					<span className="text-yellow-400 text-xs">{product.average_rating?.toFixed(1) || 'N/A'}★</span>
					<span className="text-[11px] text-gray-400">({product.total_reviews})</span>
				</div>

				{/* <!-- Price + Button --> */}
				<div className="flex items-center justify-between mt-auto pt-1">
					<div>
						<span className="text-base font-extrabold text-green-800">
							{parseFloat(product.final_price).toFixed(2)}Tk
						</span>
						<span className="text-[11px] text-gray-400">/{product.unit_quantity}{product.unit}</span>

						<span className="text-xs text-gray-400 line-through ml-1">
							{parseFloat(product.price).toFixed(2)}Tk
						</span>
					</div>

					{/* <!-- Add Button --> */}
					<button onClick={(e) => {
					e.preventDefault();
					e.stopPropagation(); 
					addToCartHandler(product)}
					} className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0 active:scale-90 transition-all">
						+
					</button>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
