import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Products from "../pages/public/Products";
import NotFound from "../pages/public/NotFound";
import Deals from "../pages/public/Deals";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import MyOrder from "../pages/customer/MyOrder";
import Checkout from "../pages/customer/Checkout";
import Search from "../pages/public/Search";
import RoleProtectedRoute from "./RoleProtectedRoute";
import PublicRoute from "./PublicRoute";
import Address from "../pages/customer/Address";
import ProductDetail from "../pages/public/ProductDetail";
import TrackOrder from "../pages/public/TrackOrder";
import Tracking from "../pages/public/Tracking";
import AdminDashboard from './../components/pages/admin/AdminDashboard';
import AdminAddProduct from './../components/pages/admin/AdminAddProduct';
import AdminOrder from './../components/pages/admin/AdminOrder';
import AdminUsers from "../components/pages/admin/DeliveryPartners";
import Dashboard from "../pages/admin/Dashboard";
import DeliveryPartners from "../components/pages/admin/DeliveryPartners";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		// errorElement: <ErrorPage />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/about", element: <About /> },
			{ path: "/products", element: <Products /> },
			{ path: "/products/:id", element: <ProductDetail /> },
			{ path: "/deals", element: <Deals /> },
			{ path: "/search", element: <Search /> },
			{ path: "/track", element: <Tracking /> },
			{ path: "/track/order", element: <TrackOrder />},

			{ path: "/checkout", element: <RoleProtectedRoute allowedRoles={["admin", "delivery_partner", "customer"]}><Checkout /></RoleProtectedRoute> },
			{ path: "/my-orders", element: <RoleProtectedRoute allowedRoles={["admin", "delivery_partner", "customer"]}><MyOrder /></RoleProtectedRoute> },
			{ path: "/address", element: <RoleProtectedRoute allowedRoles={["admin", "delivery_partner", "customer"]}><Address /></RoleProtectedRoute> },

			{ path: "/login", element: <PublicRoute><Login /></PublicRoute> },
			{ path: "/register", element: <PublicRoute><Register /></PublicRoute> },

			{
				path: "/admin",
				element: (
					<RoleProtectedRoute allowedRoles={["admin"]}>
					<Dashboard />
					</RoleProtectedRoute>
				),
				children: [
					{
					path: "dashboard",
					element: <AdminDashboard />
					},
					{
					path: "add-product",
					element: <AdminAddProduct />
					},
					{
					path: "orders",
					element: <AdminOrder />
					},
					{
					path: "delivery-partners",
					element: <DeliveryPartners />
					}
				]
			},
			{ path: "*", element: <NotFound /> },
		],
	},
]);
