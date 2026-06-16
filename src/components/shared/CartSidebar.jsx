import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// Cart state - export kore other components theke use kora jabe
// Simple approach: props diye pass koro অথবা Context use koro
const CartSidebar = ({ isOpen, onClose, cartItems = [], onUpdateQty, onRemove }) => {
	// const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.final_price) * item.qty, 0);

	const subtotal = useMemo(
		() => cartItems.reduce((sum, item) => sum + parseFloat(item.final_price) * item.qty, 0),
		[cartItems]
	);

	// Close on Escape key
	useEffect(() => {
		const handleKey = (e) => { if (e.key === "Escape") onClose(); };
		if (isOpen) window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [isOpen, onClose]);

	// Prevent body scroll when open
	// useEffect(() => {
	// 	document.body.style.overflow = isOpen ? "hidden" : "";
	// 	return () => { document.body.style.overflow = ""; };
	// }, [isOpen]);

	return (
		<>
			{/* Overlay */}
			<div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
				{/* Backdrop */}
				<div
					className="absolute inset-0 bg-black/40 backdrop-blur-sm"
					onClick={onClose}
				/>

				{/* Panel */}
				<div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
					
					{/* Header */}
					<div className="flex items-center justify-between px-5 py-4 bg-green-800 text-white flex-shrink-0">
						<h2 className="font-bold text-lg">
							Your Cart ({cartItems.length})
						</h2>
						<button
							onClick={onClose}
							className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm font-bold transition-colors"
						>
							✕
						</button>
					</div>

					{/* Items */}
					<div className="flex-1 overflow-y-auto p-4 space-y-3">
						{cartItems.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 py-20">
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
									<circle cx="9" cy="21" r="1" />
									<circle cx="20" cy="21" r="1" />
									<path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
								</svg>
								<p className="font-semibold text-base">Your cart is empty</p>
								<p className="text-sm text-center">Add some fresh items to get started!</p>
							</div>
						) : (
							cartItems.map((item) => (
								<div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
									<img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
									<div className="flex-1 min-w-0">
										<p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
										<p className="text-xs text-gray-400">{parseFloat(item.final_price).toFixed(2)}Tk each</p>
										<div className="flex items-center gap-2 mt-1.5">
											<button
												onClick={() => onUpdateQty(item.id, item.qty - 1)}
												className="w-6 h-6 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold transition-colors"
											>−</button>
											<span className="text-sm font-bold w-5 text-center">{item.qty}</span>
											<button
												onClick={() => onUpdateQty(item.id, item.qty + 1)}
												className="w-6 h-6 rounded-lg bg-green-100 hover:bg-green-200 text-green-800 flex items-center justify-center text-sm font-bold transition-colors"
											>+</button>
										</div>
									</div>
									<div className="flex flex-col items-end gap-2">
										<p className="text-sm font-bold text-green-800">{(parseFloat(item.final_price) * item.qty).toFixed(2)}Tk</p>
										<button
											onClick={() => onRemove(item.id)}
											className="text-xs text-red-400 hover:text-red-600 transition-colors"
										>Remove</button>
									</div>
								</div>
							))
						)}
					</div>

					{/* Footer */}
					{cartItems.length > 0 && (
						<div className="p-5 border-t border-gray-100 space-y-3 flex-shrink-0">
							<div className="flex justify-between pt-3 border-t border-gray-100">
								<span className="font-bold text-gray-900">Subtotal</span>
								<span className="font-extrabold text-xl text-green-800">{subtotal.toFixed(2)}Tk</span>
							</div>
							<Link to="/checkout" onClick={onClose} className="">
							<button className="block w-full py-3.5 rounded-2xl font-bold text-white text-sm bg-green-800 hover:bg-green-900 active:scale-95 transition-all">
								Proceed to Checkout →
							</button>
							</Link>
						</div>
					)}
				</div>
			</div>

			
		</>
	);
};

export default CartSidebar;