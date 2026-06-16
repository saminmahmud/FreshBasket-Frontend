import { Outlet } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import Header from '../components/shared/Header'
import CartSidebar from '../components/shared/CartSidebar'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetMeQuery } from '../redux/features/authFeatures'
import { setUser } from '../redux/slices/authSlice'
import PageLoader from '../components/reusable/PageLoader'
import {
  getCartItems,
  saveCartItems,
  addToCart,
  updateQty,
  removeItem,
  clearCart
} from '../utils/localStorage'
import toast, { Toaster } from 'react-hot-toast';


const RootLayout = () => {
	const dispatch = useDispatch();
  	const { data, isSuccess, isError, isLoading } = useGetMeQuery();

  	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState(() => getCartItems());

	useEffect(() => {
		setCartItems(getCartItems());
	}, []);

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setUser(data));
		}
		if (isError) {
			dispatch(setUser(null));
		}
	}, [data, isSuccess, isError, dispatch]);

	useEffect(() => {
		saveCartItems(cartItems);
	}, [cartItems]);

	if (isLoading) {
		return <PageLoader />;
	}

	const addToCartHandler = (product) => {
		setCartItems((prev) => addToCart(prev, product));
		toast.success("Product added to cart");
	};

	const updateQtyHandler = (id, qty) => {
		setCartItems((prev) => updateQty(prev, id, qty));
	};

	const removeHandler = (id) => {
		setCartItems((prev) => removeItem(prev, id));
	};

	const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);


  return (
    <div className='min-h-[100vh] grid grid-rows-[auto_1fr_auto] text-black overflow-x-hidden'>
	{/* {isLoading && <div className="p-2 text-lg">Checking session...</div>} */}
      <Header 
        		cartCount={cartItems.length}
				onCartOpen={() => setCartOpen(true)}
      />   
	  <Toaster position="top-right"
  		reverseOrder={false}/>

        <main className='bg-[#faf7f2] py-8 overflow-x-hidden'>
			{/* {isLoading && <PageLoader />} */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8'>
                <Outlet context={{ cartItems, addToCartHandler, clearCart }} />
            </div>
        </main>
      <Footer />
      <CartSidebar
				isOpen={cartOpen}
				onClose={() => setCartOpen(false)}
				cartItems={cartItems}
				onUpdateQty={updateQtyHandler}
				onRemove={removeHandler}
			/>
    </div>
  )
}
export default RootLayout
