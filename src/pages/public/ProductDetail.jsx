import { useState } from "react";
import { useGetAllProductsQuery, useGetProductDetailsQuery } from "../../redux/features/productFeatures";
import { useParams, useOutletContext, Link } from "react-router-dom";
import PageLoader from "../../components/reusable/PageLoader";
import ProductList from "../../components/pages/products/ProductList";
import { FaLeaf } from "react-icons/fa";


function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= Math.floor(rating) ? "#f59e0b" : i - 0.5 <= rating ? "#f59e0b" : "#e5e7eb"}
          stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCartHandler } = useOutletContext();
  const {
    data: productDetail,
    isLoading: productDetailLoading,
    isError: productDetailError,
  } = useGetProductDetailsQuery(id);

  const {
      data: productsData,
      isLoading: productLoading,
      isFetching: productFetching,
      isError: productError,
    } = useGetAllProductsQuery({ category: productDetail?.category?.name || "" });

  const [qty, setQty] = useState(1);
  
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  

  const addCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCartHandler(productDetail);
    }
  };

  productDetail?.reviews?.forEach((review) => {
    ratingDistribution[review.rating]++;
  });

  if(productDetailLoading) {
    return <PageLoader />;
  }

  return (
    <div >
      <div className="">

        {/* ── Breadcrumb ── */}
        <div className="pb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <Link to="/" className="hover:text-[#1a4731]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> 
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            <Link to="/products" className="hover:text-[#1a4731]">
              Products
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            <Link to={`/products?category=${productDetail.category.name}`} className="hover:text-[#1a4731]">
              {productDetail.category.name}
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            <span className="text-gray-700 font-medium">{productDetail.name}</span>

          </div>
        </div>

        {/* ── Product Card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 mb-6 overflow-hidden">
          <div className="grid md:grid-cols-2">

            {/* Left: Image */}
            <div className="relative p-6 sm:p-10 flex flex-col">
              {/* Badge */}
              <div className="mb-4 flex items-center gap-2">
              {parseFloat(productDetail.final_discount) > 0 && (
                <span className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {productDetail.final_discount}% OFF
                </span>
              )}
              {productDetail.is_organic && (
                <div className="flex items-center gap-1"> 
                  <span className="bg-green-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <FaLeaf className="text-green-100" />
                    Organic
                  </span>
                  </div>
                )}
              </div>
              {/* Main image */}
              <div className="flex-1 flex items-center justify-center py-4">
                <img
                  src={productDetail.image}
                  alt={productDetail.name}
                  className="max-h-64 w-auto object-contain drop-shadow-lg"
                  onError={e => e.target.src="https://placehold.co/300x280/f3f4f6/9ca3af?text=🛒"}
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className="p-6 sm:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
              {/* Category */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{productDetail.category.name}</p>

              {/* Name */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                {productDetail.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-2 mb-5">
                <Stars rating={productDetail.average_rating} size={16}/>
                <span className="text-sm font-semibold text-gray-800">{productDetail.average_rating}</span>
                <span className="text-sm text-gray-400">({productDetail.total_reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-extrabold text-gray-900">{parseFloat(productDetail.final_price).toFixed(2)}Tk</span>
                <span className="text-lg text-gray-400 line-through">{parseFloat(productDetail.price).toFixed(2)}Tk</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-3">{productDetail.description}</p>

              {/* Stock */}
              <p className="text-sm font-semibold text-orange-500 mb-6">
                {productDetail.stock > 0 ? "✓ In Stock" : "Out of Stock"}
              </p>

              {/* Qty + Cart */}
              <div className="flex items-center gap-3">
                {/* Qty */}
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setQty(p => Math.max(1, p-1))}
                    className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-medium transition-colors">−</button>
                  <span className="w-8 text-center text-sm font-bold text-gray-900">{qty}</span>
                  <button onClick={() => setQty(p => p+1)}
                    className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-medium transition-colors">+</button>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={addCart}
                  className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] bg-orange-300 hover:bg-orange-400 text-white"
                  }`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Customer Reviews ── */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Customer Reviews</h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            {/* Rating overview */}
            <div className="grid sm:grid-cols-[180px_1fr] gap-6 mb-8">
              {/* Big score */}
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-6xl font-extrabold text-gray-900 leading-none mb-2">{productDetail.average_rating || 'N/A'}</p>
                <Stars rating={productDetail.average_rating} size={20}/>
                <p className="text-sm text-gray-400 mt-2">{productDetail.total_reviews} reviews</p>
              </div>

              {/* Bars */}
              <div className="flex flex-col justify-center space-y-2.5">
                {[5,4,3,2,1].map(star => {
                  const count = ratingDistribution[star];

                  const pct =
                    productDetail.total_reviews > 0
                      ? (count / productDetail.total_reviews) * 100
                      : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-3 text-right">{star}</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="h-2 bg-orange-400 rounded-full" style={{ width: `${pct}%` }}/>
                      </div>
                      <span className="text-xs text-gray-400 w-3">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review list */}
            <div className="space-y-0 divide-y divide-gray-100">
              {productDetail.reviews?.map((r, i) => (
                <div key={r.id} className="py-5 first:pt-0">
                  <div className="flex items-start gap-3">
                    <img src={r.user.avatar} alt={r.user.username} className="w-9 h-9 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-bold text-gray-900">{r.user.username}</span>
                        <span className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</span>
                      </div>
                      <Stars rating={r.rating} size={13}/>
                      <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{r.text}</p>
                      <button
                        // onClick={() => setVotes(p => ({...p, [r.id]:true}))}
                        // disabled={votes[r.id]}
                        className="flex items-center gap-1.5 mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#6b7280" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
                          <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                        </svg>
                        Helpful ({r.helpful_votes})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Related Products</h2>
              <p className="text-sm text-gray-400 mt-0.5">More from pantry staples</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:underline">
              View All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          <div >
            <ProductList productsData={
              productsData?.results
            ?.filter(p => p.id !== productDetail?.id)
            ?.slice(0, 4) || []
            } productLoading={productLoading || productFetching} productError={productError} addToCartHandler={addToCartHandler} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ProductDetail