import { useEffect, useState } from 'react'
import { useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetAllProductsQuery } from '../../../redux/features/productFeatures';
import { useSearchParams } from 'react-router-dom';
import AddProductList from './AddProductList';
import Pagination from '../../reusable/Pagination';
import { useAddCategoryMutation, useGetAllCategoriesQuery } from '../../../redux/features/categoryFeatures';
import AddProductModal from '../../modal/AddProductModal';
import AddCategoryModal from '../../modal/AddCategoryModal';
import toast from 'react-hot-toast';


const AdminAddProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const {
        data: productsData,
        isLoading: productLoading,
        isFetching: productFetching,
        isError: productError,
      } = useGetAllProductsQuery({ page: page, ordering: "-created_at"});

      const [addCategory, { isLoading: categoryLoading }] = useAddCategoryMutation();
      const [createProduct, { isLoading: productCreateLoading }] = useAddProductMutation();
      const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
      const [editProduct, { isLoading: productEditLoading }] = useEditProductMutation();
      const [deleteProduct, { isLoading: productDeleteLoading }] = useDeleteProductMutation();

    useEffect(() => {
      const params = {};

      if (page > 1)
        params.page = page;
  
      setSearchParams(params);
  
    }, [page, setSearchParams]);

    const [showAdd, setShowAdd]   = useState(false);
    const [showAddCategory, setShowAddCategory]   = useState(false);

    const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
    const [mode, setMode] = useState("add"); // "add" | "edit"
  
  const totalPages = Math.ceil(
		productsData?.count / 8
	)

  const handleEdit = (product) => {
    setSelectedProductForEdit(product);
    setMode("edit");
    setShowAdd(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId).unwrap();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product.");
      }
    }
  }
    

  return (
    <>
    <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Products</h1>
            <p className="text-gray-400 text-sm mt-0.5">{productsData?.count} total products</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => { setSelectedProductForEdit(null); setMode("add"); setShowAdd(true); }}
              className="flex items-center gap-1 px-2 py-2 bg-[#1a4731] hover:bg-[#0d3320] text-white rounded-xl text-sm transition-all shadow-sm shadow-[#1a4731]/20">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Product
          </button>
          <button onClick={() => setShowAddCategory(true)}
              className="flex items-center gap-1 px-2 py-2 bg-[#1a4731] hover:bg-[#0d3320] text-white rounded-xl text-sm transition-all shadow-sm shadow-[#1a4731]/20">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Category
          </button>
        </div>
        </div>

        <div>
          {/* <!-- Product Grid --> */}
          <AddProductList productsData={productsData?.results} productLoading={productLoading || productFetching || categoriesLoading} productError={productError} handleEdit={handleEdit} handleDelete={handleDelete} />

          {/* <!-- Pagination --> */}
          <Pagination totalPages={totalPages} productsData={productsData} page={page} setPage={setPage} />
        </div>
    </div>
    {showAdd && <AddProductModal onClose={() => setShowAdd(false)} mode={mode} product={selectedProductForEdit} createProduct={createProduct} editProduct={editProduct} productCreateLoading={productCreateLoading} productEditLoading={productEditLoading} categoriesData={categoriesData} />}
    {showAddCategory && <AddCategoryModal onClose={() => setShowAddCategory(false)} addCategory={addCategory} categoryLoading={categoryLoading} />}
    </>
  )
}

export default AdminAddProduct
