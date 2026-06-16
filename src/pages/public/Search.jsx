import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/productFeatures";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/reusable/Pagination";
import ProductList from "../../components/pages/products/ProductList";
import { skipToken } from "@reduxjs/toolkit/query";

const Search = () => {
    const [searchParams] = useSearchParams();
	const searchValue = searchParams.get("q") || "";
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

	const {
		data: productsData,
		isLoading: productLoading,
		isFetching: productFetching,
		isError: productError,
	} = useGetAllProductsQuery(searchValue ? { page, search: searchValue } : skipToken);
	

	useEffect(() => {
		setPage(Number(searchParams.get("page")) || 1);
	}, [searchParams]);

    const totalPages = Math.ceil(
		productsData?.count / 8
	)

	return (
		<>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-green-700 py-12 rounded-lg mb-5">
				<div className="flex gap-2 mb-3 justify-center items-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        x="0px" 
                        y="0px" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24"
                        fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="lucide lucide-zap size-6 fill-white"
						aria-hidden="true"
                        >
                        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                    </svg>
					<h1 className="text-3xl font-semibold">Search Page</h1>
					<svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        x="0px" 
                        y="0px" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24"
                        fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="lucide lucide-zap size-6 fill-white"
						aria-hidden="true"
                        >
                        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                    </svg>
				</div>
				<p className="text-white/80 max-w-md mx-auto">
					Search for your favorite products and find the best deals available. Happy shopping!
				</p>
			</div>

			<div>
			{
				searchValue ? (
					<ProductList productsData={productsData?.results} productLoading={productLoading || productFetching} productError={productError} />
				) : (
					<div className="text-center py-20">
                        <p className="text-6xl mb-4">🔍</p>
                        <p className="text-gray-600 font-bold text-xl">
                            Please enter something to search for products.
                        </p>
                    </div>
				)
			}
				
			</div>

            <div>
                <Pagination totalPages={totalPages} productsData={productsData} page={page} setPage={setPage} />
            </div>
		</>
	);
};

export default Search;
