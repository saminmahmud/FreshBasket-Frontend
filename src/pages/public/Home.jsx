import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/productFeatures";
import { useGetAllCategoriesQuery } from "../../redux/features/categoryFeatures";
// import Loader from "../../components/reusable/loader";
// import FetchError from "../../components/reusable/FetchError";
import BrowseCategories from "../../components/pages/home/BrowseCategories";
import { Link, useOutletContext } from "react-router-dom";
import ProductList from "../../components/pages/home/ProductList";

const Home = () => {
	const { addToCartHandler } = useOutletContext();
	const {
		data: productsData,
		isLoading: productLoading,
		isError: productError,
	} = useGetAllProductsQuery({});
	const {
		data: categoriesData,
		isLoading: categoryLoading,
		isError: categoryError,
	} = useGetAllCategoriesQuery();

	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	const handleSubscribe = () => {
		if (email) {
			setSubscribed(true);
			setEmail("");
		}
	};

	const badges = [
		{
			label: "Free Delivery",
			sub: "Orders over $20",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#16a34a"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect x="1" y="3" width="15" height="13" />
					<polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
					<circle cx="5.5" cy="18.5" r="2.5" />
					<circle cx="18.5" cy="18.5" r="2.5" />
				</svg>
			),
		},
		{
			label: "100% Organic",
			sub: "Certified products",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#16a34a"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				</svg>
			),
		},
		{
			label: "Same Day",
			sub: "Express delivery",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#16a34a"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
			),
		},
		{
			label: "Secure Pay",
			sub: "Safe checkout",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#16a34a"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0110 0v4" />
				</svg>
			),
		},
	];
	

	return (
		<div className="flex flex-col gap-8 sm:gap-12">
			{/* HERO */}
			<section className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] flex items-center">
				<img
					src="hero_bg.jpeg"
					className="absolute inset-0 w-full h-full object-cover"
					alt="Hero"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/70 to-transparent" />

				<div className="relative w-full px-5 sm:px-8 lg:px-12 py-12 sm:py-20">
					<div className="max-w-xs sm:max-w-md lg:max-w-lg">
						<span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-4">
							🌿 Farm-Fresh &amp; Organic
						</span>
						<h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-white leading-tight mb-3 sm:mb-4">
							Nourish your home with{" "}
							<span className="text-orange-400 italic block sm:inline">
								Earth's finest
							</span>
						</h1>
						<p className="text-white/70 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
							Fresh, organic groceries delivered from local farms
							to your doorstep. Quality you can taste, convenience
							you deserve.
						</p>
						<div className="flex flex-wrap gap-2 sm:gap-3">
							<a
								href="#products"
								className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm active:scale-95 transition-all"
							>
								Shop Now
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="5" y1="12" x2="19" y2="12" />
									<polyline points="12 5 19 12 12 19" />
								</svg>
							</a>
							<a
								href="#categories"
								className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/40 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 active:scale-95 transition-all"
							>
								Browse Categories
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* TRUST BADGES */}
			<section className="bg-white border border-gray-100 rounded-2xl shadow-sm">
				<div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
						{badges.map((badge) => (
							<div
								key={badge.label}
								className="flex items-center gap-2 sm:gap-3"
							>
								<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
									{badge.icon}
								</div>
								<div className="min-w-0">
									<p className="text-xs sm:text-sm font-bold text-gray-800 truncate">
										{badge.label}
									</p>
									<p className="text-xs text-gray-400 truncate">
										{badge.sub}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* BROWSE CATEGORIES */}
			<section id="categories" className="flex flex-col gap-4 sm:gap-6">
				<BrowseCategories
					categoriesData={categoriesData}
					categoryLoading={categoryLoading}
					categoryError={categoryError}
				/>
			</section>

			{/* POPULAR PRODUCTS */}
			<section id="products">
				<div className="flex items-center justify-between mb-3 sm:mb-4">
					<div>
						<h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
							Popular Products
						</h2>
						<p className="text-gray-400 text-xs sm:text-sm mt-0.5">
							Top-rated products this season
						</p>
					</div>
					<Link to="/products" className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-orange-500 hover:underline whitespace-nowrap ml-4">
						View All
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</Link>
				</div>

				<ProductList productsData={productsData?.results} productLoading={productLoading} productError={productError} addToCartHandler={addToCartHandler} />
			</section>

			{/* APP DOWNLOAD BANNER */}
			<section>
				<div className="bg-green-800 rounded-2xl sm:rounded-3xl overflow-hidden relative flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 lg:p-12">
					<div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
					<div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 pointer-events-none" />

					<div className="relative flex-1 text-white w-full">
						<h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight">
							Get fresh groceries{" "}
							<br className="hidden sm:block" />
							in minutes
						</h3>
						<p className="text-white/70 mt-2 text-sm sm:text-base leading-relaxed max-w-md">
							Download the FreshBasket app for exclusive deals,
							real-time tracking, and the freshest selection
							delivered right to your door.
						</p>
						<div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
							<button className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
								</svg>
								App Store
							</button>
							<button className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z" />
								</svg>
								Google Play
							</button>
						</div>
					</div>

					<div className="relative w-full sm:w-40 md:w-56 lg:w-64 flex-shrink-0">
						<img
							src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&q=80"
							alt="Delivery"
							className="w-full h-36 sm:h-44 lg:h-52 object-cover rounded-xl sm:rounded-2xl opacity-90"
						/>
					</div>
				</div>
			</section>

			{/* NEWSLETTER */}
			<section>
				<div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center border border-gray-100 shadow-sm">
					<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-3 sm:mb-4">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#16a34a"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
							<polyline points="22,6 12,13 2,6" />
						</svg>
					</div>
					<h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-900 mb-2">
						Subscribe to our Newsletter
					</h3>
					<p className="text-gray-400 text-xs sm:text-sm lg:text-base max-w-md mx-auto mb-5 sm:mb-6">
						Get weekly updates on fresh produce, seasonal offers,
						and exclusive discounts right to your inbox.
					</p>
					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
						<input
							type="email"
							placeholder="Enter your email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="flex-1 px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 transition-all"
						/>
						<button
							onClick={handleSubscribe}
							className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-white bg-green-800 hover:bg-green-900 rounded-xl active:scale-95 transition-all"
						>
							Subscribe
						</button>
					</div>
					{subscribed && (
						<p className="text-green-600 text-sm font-semibold mt-3">
							✓ You're subscribed! Welcome to FreshBasket.
						</p>
					)}
				</div>
			</section>
		</div>
	);
};

export default Home;
