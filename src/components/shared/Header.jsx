import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { authApi, useGetMeQuery, useLogoutMutation } from "../../redux/features/authFeatures";
import { logout as logoutAction } from "../../redux/slices/authSlice";

const Header = ({ cartCount, onCartOpen }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
	const dropdownRef = useRef(null);
	const {data: user, refetch: refetchGetMe, isSuccess: isGetMeSuccess } = useGetMeQuery();
	const [logout, { isLoading: isLogoutLoading, isError: isLogoutError, isSuccess:isLogoutSuccess } ] = useLogoutMutation();

	// const user = useSelector((state) => state?.auth?.user);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchValue(value);
		if (value.trim()) {
			navigate(`/search?q=${value}`, { replace: true });
		} else {
			setSearchValue("");
			if (location.pathname === "/search") navigate(-1);
		}
	};

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			dispatch(logoutAction());
			navigate("/login", { replace: true });
			dispatch(authApi.util.resetApiState())
			toast.success("Logged out successfully.");
		
		} catch (error) {
			console.log(error)
			toast.error("Logout failed. Please try again.");
		}
	};

	const avatarLetter = user?.username?.charAt(0).toUpperCase();


	return (
		<nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center gap-2 sm:gap-3 h-14 sm:h-16">

					{/* Logo */}
					<Link to="/" className="flex items-center gap-2 flex-shrink-0">
						<div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-800 rounded-xl flex items-center justify-center">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<path d="M16 10a4 4 0 01-8 0" />
							</svg>
						</div>
						<span className="font-extrabold text-lg sm:text-xl text-green-800 hidden sm:block">
							FreshBasket
						</span>
					</Link>

					{/* Desktop Links */}
					<div className="hidden md:flex items-center gap-1">
						<Link to="/" className="px-3 py-2 text-sm font-bold text-green-800 rounded-lg">Home</Link>
						<Link to="/products" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50 transition-colors">Products</Link>
						<Link to="/deals" className="px-3 py-2 text-sm font-bold text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">Deals</Link>
					</div>

					{/* Search */}
					<div className="flex-1 max-w-[140px] sm:max-w-[200px] md:max-w-xs relative">
						<svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="11" cy="11" r="8" />
							<line x1="21" y1="21" x2="16.65" y2="16.65" />
						</svg>
						<input
							type="text"
							placeholder="Search..."
							value={searchValue}
							onChange={handleSearchChange}
							className=" lg:w-full pl-8 pr-3 py-2 sm:py-2.5 bg-gray-100 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:bg-white transition-all"
						/>
					</div>

					{/* Right Actions */}
					<div className="flex items-center gap-1 sm:gap-2">
						{/* Cart */}
						<button onClick={onCartOpen} className="relative flex items-center gap-1.5 bg-green-800 hover:bg-green-900 text-white px-2.5 sm:px-3 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-colors">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<circle cx="9" cy="21" r="1" />
								<circle cx="20" cy="21" r="1" />
								<path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
							</svg>
							<span className="hidden lg:block">Cart</span>
							{cartCount > 0 && (
								<span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
									{cartCount}
								</span>
							)}
						</button>

						{/* User Profile / Sign In */}
						{user ? (
							<div className="relative" ref={dropdownRef}>
								<button
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className="flex items-center gap-1 p-1 rounded-xl hover:bg-gray-100 transition-colors"
								>
									{user.avatar ? (
										<img
											src={user.avatar}
											alt={user.username}
											className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-green-100"
										/>
									) : (
										<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">
											{avatarLetter}
										</div>
									)}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
										<polyline points="6 9 12 15 18 9" />
									</svg>
								</button>

								{dropdownOpen && (
									<div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
										<div className="px-4 py-3 border-b border-gray-100">
											<p className="text-sm font-bold text-gray-900">{user.username}</p>
											<p className="text-xs text-gray-400 truncate">{user.email}</p>
										</div>

										<div className="py-1">
											<Link to="/my-orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
												</svg>
												My Orders
											</Link>
											<Link to="/address" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
												</svg>
												Address
											</Link>
											<Link to="/products" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
												</svg>
												Products
											</Link>
											<Link to="/deals" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
												</svg>
												Deals
											</Link>
											{user.role === "admin" && (
												<Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-orange-500 font-semibold hover:bg-orange-50 transition-colors">
													<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
														<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
													</svg>
													Admin Panel
												</Link>
											)}
										</div>

										<div className="border-t border-gray-100 pt-1">
											<button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
												</svg>
												Logout
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<Link to="/login" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-2 sm:px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
								</svg>
								<span className="hidden lg:block">Sign In</span>
							</Link>
						)}

						{/* Hamburger */}
						<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
							{mobileMenuOpen ? (
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
									<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
								</svg>
							) : (
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
									<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
					{user && (
						<div className="flex items-center gap-3 px-3 py-3 mb-1 border-b border-gray-100">
							{user.avatar ? (
								<img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full object-cover" />
							) : (
								<div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">{avatarLetter}</div>
							)}
							<div>
								<p className="text-sm font-bold text-gray-900">{user.username}</p>
								<p className="text-xs text-gray-400 truncate">{user.email}</p>
							</div>
						</div>
					)}
					<Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-bold text-green-800 rounded-lg bg-green-50">Home</Link>
					<Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Products</Link>
					<Link to="/deals" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-bold text-orange-500 hover:bg-orange-50 rounded-lg">Deals</Link>
					{user ? (
						<>
							<Link to="/my-orders" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">My Orders</Link>
							{user.role === "admin" && (
								<Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-50 rounded-lg">Admin Panel</Link>
							)}
							<button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg">Logout</button>
						</>
					) : (
						<Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Sign In</Link>
					)}
				</div>
			)}
		</nav>
	);
};

export default Header;