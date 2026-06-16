import Pagination from "../../components/reusable/Pagination";
import { useGetAllProductsQuery } from "../../redux/features/productFeatures";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductList from "../../components/pages/products/ProductList";

const Deals = () => {
	const { addToCartHandler } = useOutletContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

	const {
				data: productsData,
				isLoading: productLoading,
				isFetching: productFetching,
				isError: productError,
			} = useGetAllProductsQuery({ page: page });

	useEffect(() => {
		if (page === 1) {
			searchParams.delete("page");
			setSearchParams(searchParams);
		} else {
			setSearchParams({ page });
		}
	}, [page, setSearchParams, searchParams]);
	
	const totalPages = Math.ceil(
		productsData?.count / 8
	)
	

	return (
		<div>
			<div className="mx-auto px-4 sm:px-6 lg:px-8 text-center bg-green-700 py-12 rounded-lg mb-5">
				<div className="flex gap-2 mb-3 justify-center items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-zap size-6 fill-white"
						aria-hidden="true"
					>
						<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
					</svg>
					<h1 className="text-3xl font-semibold">Flash Deals</h1>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-zap size-6 fill-white"
						aria-hidden="true"
					>
						<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
					</svg>
				</div>
				<p className="text-white/80 max-w-md mx-auto">
					Limited-time offers on your favorite organic products. Grab
					them before they're gone!
				</p>
			</div>

			{/* Product Grid */}
			<ProductList productsData={productsData?.results} productLoading={productLoading || productFetching} productError={productError} addToCartHandler={addToCartHandler} />

			{/* Pagination */}
			<Pagination totalPages={totalPages} productsData={productsData} page={page} setPage={setPage} />
		</div>
	);
};

export default Deals;
