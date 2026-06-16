import Loader from "../../reusable/loader";
import FetchError from "../../reusable/FetchError";
import ProductCard from "../home/ProductCard";

const ProductList = ({ productsData, productLoading, productError, addToCartHandler }) => {
	return (
		<>
            {
                productLoading ? (
                    <Loader />
                ) : productError ? (
                    <FetchError />
                ) : productsData.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-6xl mb-4">🔍</p>
                        <p className="text-gray-600 font-bold text-xl">
                            No products found
                        </p>
                    </div>
                 ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {productsData.map((product) => (
                            <ProductCard key={product.id} product={product} addToCartHandler={addToCartHandler} />
                        ))}
                    </div>
                )
            }
        </>
	);
};

export default ProductList;
