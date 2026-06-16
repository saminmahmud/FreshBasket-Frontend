import ProductCard from "../../components/pages/home/ProductCard";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/productFeatures";
import { useGetAllCategoriesQuery } from "../../redux/features/categoryFeatures";
import CategoryList from "../../components/pages/products/CategoryList";
import ProductList from "../../components/pages/products/ProductList";
import Pagination from "../../components/reusable/Pagination";
import { useOutletContext, useSearchParams } from "react-router-dom";


const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { addToCartHandler } = useOutletContext();

	const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
	const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
	const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
	const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");
	const [ordering, setOrdering] = useState(searchParams.get("ordering") || "");

	const {
			data: productsData,
			isLoading: productLoading,
			isFetching: productFetching,
			isError: productError,
		} = useGetAllProductsQuery({ page: page, category: selectedCategory, min_price: minPrice, max_price: maxPrice, ordering: ordering });

	const {
			data: categoriesData,
			isLoading: categoryLoading,
			isError: categoryError,
		} = useGetAllCategoriesQuery();

	const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

	useEffect(() => {
		const params = {};

		setPage(1);

		if (selectedCategory)
			params.category = selectedCategory;

		if (minPrice)
			params.min_price = minPrice;

		if (maxPrice)
			params.max_price = maxPrice;

		if (ordering && ordering !== "-created_at")
			params.ordering = ordering;

		setSearchParams(params);

	}, [selectedCategory, minPrice, maxPrice, ordering, setSearchParams]);

	
	
	const clearAllFilters = () => {
		setSelectedCategory("");
		setMinPrice("");
		setMaxPrice("");
		setOrdering("");
		setPage(1);
	}

	const totalPages = Math.ceil(
		productsData?.count / 8
	)

	return (
		<>
			{/* BREADCRUMB */}
			<div className="mx-auto pt-5 pb-1">
				<nav className="flex items-center gap-1.5 text-sm text-gray-400">
					<a
						href="/"
						className="hover:text-green-800 transition-colors flex items-center gap-1"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
					</a>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="9 18 15 12 9 6" />
					</svg>
					<span className="text-gray-700 font-medium">
						All Products
					</span>
				</nav>
			</div>

			{/* MAIN LAYOUT */}
			<div className="mx-auto py-5 flex gap-6">
				{/* <!-- ── SIDEBAR FILTERS (desktop) ── --> */}
				<aside className="hidden lg:flex flex-col gap-5 w-56 flex-shrink-0">
					{/* <!-- Categories --> */}
					<div className="bg-white rounded-2xl border border-gray-100 p-4">
						<div>
							<h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
								Categories
							</h3>
							<CategoryList categoriesData={categoriesData} categoryLoading={categoryLoading} categoryError={categoryError} selectedCategory={selectedCategory} setSelectedCategory={(category) => {setPage(1); setSelectedCategory(category);}} />
						</div>
						<div className="border-t border-gray-100 my-4">
							<h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
								Price Range
							</h3>
							{/* 2 input min and max */}
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="minPrice"
									placeholder="Min"
									value={minPrice}
    								onChange={(e)=>{setPage(1); setMinPrice(e.target.value);}}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800/20 transition-colors"
								/>
								<span className="text-gray-400">-</span>
								<input
									type="number"
									id="maxPrice"
									placeholder="Max"
									value={maxPrice}
									onChange={(e)=>{setPage(1); setMaxPrice(e.target.value);}}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800/20 transition-colors"
								/>
							</div>
						</div>
					</div>

					{/* <!-- Clear filters --> */}
					<button
						onClick={() => {setPage(1); clearAllFilters();}}
						className="w-full py-2.5 rounded-xl border-2 border-green-800 text-green-800 font-semibold text-sm hover:bg-green-50 transition-colors"
					>
						Clear All Filters
					</button>
				</aside>

				{/* <!-- ── MAIN CONTENT ── --> */}
				<div className="flex-1 min-w-0">
					{/* <!-- Top bar: title + sort + filter toggle --> */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
						<div>
							<h1
								className="text-2xl font-extrabold text-gray-900"
								id="pageTitle"
							>
								All Products
							</h1>
							<p className="text-gray-400 text-sm mt-0.5">
								<span id="resultCount">
									{
										productsData ? productsData.count : "0"
									}
								</span> products found
							</p>
						</div>
						<div className="flex items-center gap-2">
							{/* <!-- Mobile filter toggle --> */}
							<button
								onClick={() => setMobileFilterOpen(true)}
								className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-green-400 hover:text-green-800 transition-colors"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="4" y1="6" x2="20" y2="6" />
									<line x1="8" y1="12" x2="16" y2="12" />
									<line x1="11" y1="18" x2="13" y2="18" />
								</svg>
								Filters
							</button>
							{/* <!-- Sort --> */}
							<div className="relative">
								<select
									id="sortSelect"
									value={ordering}
									onChange={(e)=>{setPage(1); setOrdering(e.target.value);}}
									className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-800/20 transition-all cursor-pointer"
								>
									<option value="-created_at">Newest</option>
									<option value="price">
										Price: Low to High
									</option>
									<option value="-price">
										Price: High to Low
									</option>
								</select>
								<svg
									className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</div>
						</div>
					</div>

					{/* <!-- Active filter chips --> */}
					<div
						id="activeChips"
						className="hidden flex-wrap gap-2 mb-4"
					></div>

					{/* <!-- Mobile Filter Drawer --> */}
					<div
						id="mobileFilterOverlay"
						className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
							mobileFilterOpen ? "" : "pointer-events-none"
						}`}
					>
						<div
							className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
								mobileFilterOpen ? "opacity-100" : "opacity-0"
							}`}
							onClick={() => setMobileFilterOpen(false)}
						></div>
						<div
							id="mobileFilterPanel"
							className={`absolute left-0 top-0 h-full w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto ${
								mobileFilterOpen
									? "translate-x-0"
									: "-translate-x-full"
							}`}
						>
							<div className="flex items-center justify-between px-5 py-4 bg-green-800 text-white flex-shrink-0">
								<h2 className="font-bold text-base">Filters</h2>
								<button
									onClick={() => setMobileFilterOpen(false)}
									className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold transition-colors"
								>
									✕
								</button>
							</div>
							<div className="p-4 space-y-5 flex-1">
								{/* <!-- Categories --> */}
								<div>
									<h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
										Categories
									</h3>
									<CategoryList categoriesData={categoriesData} categoryLoading={categoryLoading} categoryError={categoryError} selectedCategory={selectedCategory} setSelectedCategory={(category) => {setPage(1); setSelectedCategory(category);}} />
								</div>
					
								{/* <!-- Price Range --> */}
								<div>
									<h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
										Price Range
									</h3>
									{/* 2 input min and max */}
									<div className="flex items-center gap-2">
										<input
											type="number"
											id="minPrice"
											placeholder="Min"
											value={minPrice}
											onChange={(e)=>{setPage(1); setMinPrice(e.target.value);}}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800/20 transition-colors"
										/>
										<span className="text-gray-400">-</span>
										<input
											type="number"
											id="maxPrice"
											placeholder="Max"
											value={maxPrice}
											onChange={(e)=>{setPage(1); setMaxPrice(e.target.value);}}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800/20 transition-colors"
										/>
									</div>
								</div>
							</div>
							<div className="p-4 border-t border-gray-100">
								<button
									onClick={() => {setMobileFilterOpen(false); clearAllFilters()}}
									className="w-full py-2.5 rounded-xl bg-green-800 text-white font-semibold text-sm hover:bg-green-900 transition-colors"
								>
									Clear All Filters
								</button>
							</div>
						</div>
					</div>

					{/* <!-- Empty state --> */}
					<div id="emptyState" className="hidden text-center py-20">
						<p className="text-6xl mb-4">🔍</p>
						<p className="text-gray-600 font-bold text-xl">
							No products found
						</p>
						<p className="text-gray-400 text-sm mt-2">
							Try adjusting your filters or search term
						</p>
						<button
							onClick={() => {setPage(1); clearAllFilters();}}
							className="mt-5 px-6 py-2.5 rounded-xl bg-green-800 text-white font-semibold text-sm hover:bg-green-900 transition-colors"
						>
							Clear All Filters
						</button>
					</div>

					{/* <!-- Product Grid --> */}
					<ProductList productsData={productsData?.results} productLoading={productLoading || productFetching} productError={productError} addToCartHandler={addToCartHandler} />

					{/* <!-- Pagination --> */}
					<Pagination totalPages={totalPages} productsData={productsData} page={page} setPage={setPage} />
				</div>
			</div>
		</>
	);
};

export default Products;
