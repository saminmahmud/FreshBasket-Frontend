import Loader from '../../reusable/loader';
import FetchError from '../../reusable/FetchError';
import AddProductCard from './AddProductCard';

const AddProductList = ({ productsData, productLoading, productError, handleEdit, handleDelete }) => {
	return (
		<>
            {
                productLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader />
                    </div>
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
                            <AddProductCard 
                                key={product.id} 
                                product={product} 
                                onClickEdit={() => handleEdit(product)}
                                onClickDelete={() => handleDelete(product.id)}
                            />
                        ))}
                    </div>
                )
            }
        </>
	);
};

export default AddProductList
