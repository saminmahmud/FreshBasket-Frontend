import { useMemo, useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useCreateOrderMutation, useGetAllDeliveryChargesQuery } from "../../redux/features/orderFeatures";
import PageLoader from "../../components/reusable/PageLoader";
import Loader from "../../components/reusable/Loader";
import { useLazyGetAddressQuery } from "../../redux/features/authFeatures";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";


const PAYMENT_METHODS = [
	{ id: "ssl_commerz", label: "SSLCommerz" },
	{ id: "cash_on_delivery", label: "Cash on Delivery" },
];

const formatPrice = (value) => `${parseFloat(value).toFixed(2)}Tk`;

const Checkout = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { cartItems, clearCart } = useOutletContext();
	const {data:deliveryData, isLoading:deliveryLoading, isError, error} = useGetAllDeliveryChargesQuery();
	const [getAddress, { data: addressData, isFetching: addressFetching, isLoading: addressLoading }] = useLazyGetAddressQuery();
	const [createOrder, { isLoading: orderLoading, isSuccess: orderSuccess, isError: orderError }] = useCreateOrderMutation();

	const [delivery, setDelivery] = useState(1);
	const [payment, setPayment] = useState("ssl_commerz");
	const [errors, setErrors] = useState({});

	const [form, setForm] = useState({
		fullName: "",
		phone: "",
		city: "",
		postal_code: "",
		address: "",
		note: "",
	});

	useEffect(() => {
		const status = searchParams.get("status");

		if (status === "success") {
			clearCart(); 
			toast.success("Payment successful!");
			navigate("/my-orders", { replace: true });
		}

		if (status === "failed") {
			toast.error("Payment failed or cancelled");
			navigate("/checkout", { replace: true });
		}
	}, [searchParams, navigate]);

	const importSavedAddress = async () => {
		try {
			const res = await getAddress().unwrap();

			setForm((prev) => ({
				...prev,
				fullName: res.full_name || "",
				phone: res.phone || "",
				city: res.city || "",
				postal_code: res.postal_code || "",
				address: res.address || "",
			}));
			toast.success("Saved address imported successfully!");
		} catch (err) {
			toast.error("Failed to import saved address. Please try again.");
		}
	};

	const selectedDelivery = useMemo(
		() => deliveryData?.find((option) => option.id === delivery),
		[delivery, deliveryData]
	);

	const subtotal = useMemo(
		() => cartItems.reduce((sum, item) => sum + parseFloat(item.final_price) * item.qty, 0),
		[cartItems]
	);

	const deliveryFee = parseFloat(selectedDelivery?.charge_amount) ?? 0;
	const total = subtotal + deliveryFee;

	const setValue = (key, value) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		setErrors((prev) => ({ ...prev, [key]: "" }));
	};

	const validate = () => {
		const nextErrors = {};

		if (!form.fullName.trim()) nextErrors.fullName = "Full name is required";
		if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
		else if (!/^[0-9+\s()-]{7,16}$/.test(form.phone)) {
			nextErrors.phone = "Enter a valid phone number";
		}
		if (!form.city.trim()) nextErrors.city = "City is required";
		if (!form.postal_code.trim()) nextErrors.postal_code = "Postal code is required";
		if (!form.address.trim()) nextErrors.address = "Address is required";

		if (payment === "card") {
			if (!form.cardName.trim()) nextErrors.cardName = "Card holder name is required";
			if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
				nextErrors.cardNumber = "Enter a valid 16 digit card number";
			}
			if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(form.expiry)) {
				nextErrors.expiry = "Use MM/YY format";
			}
			if (!/^\d{3,4}$/.test(form.cvc)) {
				nextErrors.cvc = "Enter a valid CVC";
			}
		}

		return nextErrors;
	};

	const placeOrder = async () => {
		const nextErrors = validate();
		if (Object.keys(nextErrors).length) {
			setErrors(nextErrors);
			return;
		}

		if (!cartItems.length) {
			toast.error("Cart is empty");
			return;
		}

		try {

			const selectedArea = deliveryData?.find(
				(d) => d.id === delivery
			);

			const payload = {
				full_name: form.fullName,
				phone: form.phone,
				address: form.address,
				city: form.city,
				postal_code: form.postal_code,
				note: form.note,
				payment_method: payment,
				delivery_area: selectedArea?.delivery_area,
				items: cartItems.map((item) => ({
					product_id: item.id,
					quantity: item.qty,
				})),
			};

			// const res = await createOrder(payload).unwrap();
			if (payment === "cash_on_delivery") {
				const res = await createOrder(payload).unwrap();

				toast.success("Order placed successfully!");
				navigate("/my-orders");
				clearCart();
				return;
			}
			if (payment === "ssl_commerz") {
				const res = await createOrder(payload).unwrap();

				if (res.payment_url) {
					window.location.href = res.payment_url;
				} else {
					toast.error("Failed to initialize payment");
				}
				return;
			}

		} catch (err) {
			console.error(err);
			toast.error(
				"Failed to place order"
			);
		} 
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Checkout</h1>
					<p className="text-sm text-gray-500 mt-1">Complete your order in a few simple steps</p>
				</div>
				<div className="flex items-center gap-2 text-xs font-semibold">
					<button 
					className="px-3 py-1 rounded-full bg-green-800 text-white hover:bg-green-900 transition-colors"
					onClick={importSavedAddress}
					disabled={addressFetching || addressLoading}
					>
						{addressFetching || addressLoading ? (
						<div className="flex gap-2">
							<svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
							<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
							</svg>
							Importing...
						</div>
						) : "Import Saved Address"}
						
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<div className="lg:col-span-8 space-y-5">
					<section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
						<h2 className="text-lg font-extrabold text-gray-900">Delivery Information</h2>
						<p className="text-xs text-gray-400 mt-1">Use an address where someone can receive the order</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
							<Field label="Full name" error={errors.fullName}>
								<input
									type="text"
									value={form.fullName}
									onChange={(e) => setValue("fullName", e.target.value)}
									placeholder="Your full name"
									className={inputClass(errors.fullName)}
								/>
							</Field>

							<Field label="Phone" error={errors.phone}>
								<input
									type="text"
									value={form.phone}
									onChange={(e) => setValue("phone", e.target.value)}
									placeholder="+8801XXXXXXXXX"
									className={inputClass(errors.phone)}
								/>
							</Field>

							<Field label="City" error={errors.city}>
								<input
									type="text"
									value={form.city}
									onChange={(e) => setValue("city", e.target.value)}
									placeholder="Dhaka"
									className={inputClass(errors.city)}
								/>
							</Field>

							<Field label="Postal Code" error={errors.postal_code}>
								<input
									type="text"
									value={form.postal_code}
									onChange={(e) => setValue("postal_code", e.target.value)}
									placeholder="1204"
									className={inputClass(errors.postal_code)}
								/>
							</Field>

							<Field label="Address" error={errors.address}>
								<input
									type="text"
									value={form.address}
									onChange={(e) => setValue("address", e.target.value)}
									placeholder="House, road, apartment details"
									className={inputClass(errors.address)}
								/>
							</Field>
						</div>

						<div className="mt-4">
							<label className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery note (optional)</label>
							<textarea
								rows={3}
								value={form.note}
								onChange={(e) => setValue("note", e.target.value)}
								placeholder="Any instruction for rider..."
								className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10 transition-all"
							/>
						</div>
					</section>

					<section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
						<h2 className="text-lg font-extrabold text-gray-900">Delivery Area</h2>
						{deliveryLoading ? (
							<Loader />	
						):(<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
							{deliveryData.map((option) => {
								const active = delivery === option.id;
								return (
									<button
										key={option.id}
										type="button"
										onClick={() => setDelivery(option.id)}
										className={`text-left rounded-2xl border p-3.5 transition-all ${
											active
												? "border-[#1a4731] bg-green-50"
												: "border-gray-200 bg-white hover:border-gray-300"
										}`}
									>
										<p className="text-sm font-bold text-gray-900">{option.delivery_area_display}</p>
										<p className="text-sm font-extrabold text-[#1a4731] mt-2">
											{option.charge_amount === 0 ? "FREE" : parseFloat(option.charge_amount).toFixed(2)}Tk
										</p>
									</button>
								);
							})}
						</div>
						)}
					</section>

					<section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
						<h2 className="text-lg font-extrabold text-gray-900">Payment Method</h2>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
							{PAYMENT_METHODS.map((method) => {
								const active = payment === method.id;
								return (
									<button
										key={method.id}
										type="button"
										onClick={() => setPayment(method.id)}
										className={`rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
											active
												? "border-orange-500 text-orange-600 bg-orange-50"
												: "border-gray-200 text-gray-600 hover:border-orange-300"
										}`}
									>
										{method.label}
									</button>
								);
							})}
						</div>
					</section>
				</div>

				<aside className="lg:col-span-4">
					<div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sticky top-24 space-y-5">
						<h2 className="text-lg font-extrabold text-gray-900">Order Summary</h2>

						<div className="space-y-3 max-h-64 overflow-y-auto border rounded-xl p-3">
							{cartItems.map((item) => (
								<div key={item.id} className="flex items-center gap-3">
									<img
										src={item.image}
										alt={item.name}
										className="w-14 h-14 rounded-xl object-cover bg-gray-100"
									/>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
										<p className="text-xs text-gray-400">{item.unit} x {item.qty}</p>
									</div>
									<p className="text-sm font-extrabold text-[#1a4731]">
										{formatPrice(item.final_price * item.qty)}
									</p>
								</div>
							))}
						</div>

						<div className="space-y-2 text-sm">
							<div className="flex items-center justify-between text-gray-500">
								<span>Subtotal</span>
								<span className="font-semibold text-gray-700">{formatPrice(subtotal)}</span>
							</div>
							<div className="flex items-center justify-between text-gray-500">
								<span>Delivery</span>
								<span className="font-semibold text-gray-700">
									{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
								</span>
							</div>
							<div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
								<span className="font-bold text-gray-900">Total</span>
								<span className="text-xl font-extrabold text-[#1a4731]">{formatPrice(total)}</span>
							</div>
						</div>

						<button
							type="button"
							onClick={placeOrder}
							disabled={orderLoading}
							className="w-full py-3.5 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] disabled:opacity-60 text-white font-bold text-sm transition-all"
						>
							{orderLoading ? (
							<>
								<svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
								<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
								</svg>
								Placing Order...
							</>
							) : "Place Order"}
						</button>

						<p className="text-xs text-gray-400 text-center">
							By placing order, you agree to our terms and privacy policy.
						</p>
					</div>
				</aside>
			</div>
		</div>
	);
};

const Field = ({ label, error, children }) => (
	<div>
		<label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
		{children}
		{error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
	</div>
);

const inputClass = (error) =>
	`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
		error
			? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100"
			: "border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"
	}`;

export default Checkout;
