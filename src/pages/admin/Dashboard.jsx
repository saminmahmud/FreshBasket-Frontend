import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const NAV = [
	{
		key: "dashboard",
		label: "Dashboard",
		path: "/admin/dashboard",
		icon: (
			<svg
				width="17"
				height="17"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="3" width="7" height="7" />
				<rect x="14" y="3" width="7" height="7" />
				<rect x="14" y="14" width="7" height="7" />
				<rect x="3" y="14" width="7" height="7" />
			</svg>
		),
	},
	{
		key: "add",
		label: "Add Product",
		path: "/admin/add-product",
		icon: (
			<svg
				width="17"
				height="17"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
		),
	},
	{
		key: "orders",
		label: "Orders",
		path: "/admin/orders",
		icon: (
			<svg
				width="17"
				height="17"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
				<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
				<line x1="12" y1="22.08" x2="12" y2="12" />
			</svg>
		),
	},
	{
		key: "users",
		label: "Users",
		path: "/admin/users",
		icon: (
			<svg
				width="17"
				height="17"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<path d="M23 21v-2a4 4 0 00-3-3.87" />
				<path d="M16 3.13a4 4 0 010 7.75" />
			</svg>
		),
	},
	{
		key: "exit",
		label: "Exit",
		path: "/",
		icon: (
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
				className="lucide lucide-log-out size-4"
				aria-hidden="true"
			>
				<path d="m16 17 5-5-5-5"></path>
				<path d="M21 12H9"></path>
				<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
			</svg>
		),
	},
];

const Dashboard = () => {
	const [sideOpen, setSide] = useState(false);

	useEffect(() => {
		if (sideOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [sideOpen]);

	return (
		<div className="">
			<button
				onClick={() => setSide((p) => !p)}
				className="lg:hidden rounded-xl hover:bg-gray-100 transition-colors "
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.2"
					strokeLinecap="round"
				>
					<line x1="3" y1="6" x2="21" y2="6" />
					<line x1="3" y1="12" x2="21" y2="12" />
					<line x1="3" y1="18" x2="21" y2="18" />
				</svg>
			</button>
			<div className="flex items-start gap-6 ">
				{/* ── Sidebar overlay (mobile) ── */}
				{sideOpen && (
					<div
						className="fixed inset-0 z-30 bg-black/30 lg:hidden"
						onClick={() => setSide(false)}
					/>
				)}

				{/* ── Sidebar ── */}
				<aside
					className={`
            -mx-4 sm:-mx-6 lg:mx-0
            fixed lg:sticky
            top-14 lg:top-0
            z-50
            w-64
            h-[calc(100vh-56px)] lg:h-full
            bg-white
            border-r border-gray-200
            flex flex-col
            transition-transform duration-300
            flex-shrink-0
            ${sideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 hidden lg:block"}
          `}
				>
					{/* Admin Panel header */}
					<div className="px-5 py-4 border-b border-gray-100">
						<div className="flex items-center gap-2.5">
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#1a4731"
								strokeWidth="2.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
							</svg>
							<span className="font-extrabold text-gray-900 text-base">
								Admin Panel
							</span>
						</div>
					</div>

					{/* Nav */}
					<nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
						{NAV.map((n) => (
							<NavLink
								to={n.path}
								key={n.key}
								className={({ isActive }) =>
									`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
										isActive
											? "bg-[#1a4731] text-white shadow-sm"
											: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
									}`
								}
							>
								{({ isActive }) => (
									<>
										<span
											className={
												isActive
													? "text-white"
													: "text-gray-400"
											}
										>
											{n.icon}
										</span>
										{n.label}
									</>
								)}
							</NavLink>
						))}
					</nav>

					<div className="px-3 pb-4">
						<div className="bg-[#f0fdf4] rounded-2xl p-3 text-center">
							<p className="text-xs text-green-700 font-semibold">
								FreshBasket Admin
							</p>
						</div>
					</div>
				</aside>

				{/* ── Main content ── */}
				<main className="flex-1 min-w-0">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
