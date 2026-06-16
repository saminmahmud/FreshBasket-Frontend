import { useState } from "react";
import Tracker from "./Tracker";
import { Link } from "react-router-dom";


const STATUS_CONFIG = {
  pending: {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    dot: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-700",
  },

  confirmed: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },

  delivered: {
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-700",
  },
};


const OrderCard = ({ order }) => {
    const [open, setOpen] = useState(false);
      const cfg = STATUS_CONFIG[order.order_status.toLowerCase()] || {
        color: "text-gray-700",
        bg: "bg-gray-50",
        border: "border-gray-200",
        dot: "bg-gray-400",
        badge: "bg-gray-100 text-gray-700",
      };

  return (
    <div className={`bg-white rounded-2xl border ${open ? cfg.border : "border-gray-100"} overflow-hidden shadow-sm hover:shadow-md transition-all duration-200`}>

      {/* Card header */}
      <div
        className="flex items-start sm:items-center justify-between px-5 py-4 cursor-pointer select-none"
        onClick={() => setOpen(p => !p)}
      >
        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
          {/* Status icon circle */}
          <div className={`w-10 h-10 rounded-2xl ${cfg.bg} flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
            {cfg.icon}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link to={`/track/order?tracking_id=${order.tracking_code}`} className="hover:underline">
                <span className="font-bold text-gray-900 text-sm">{order.tracking_code}</span>
              </Link>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${cfg.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>
                {order.order_status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{new Date(order.created_at).toLocaleDateString()} · {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          <div className="text-right hidden sm:block">
            <p className="font-extrabold text-gray-900 text-sm">{Number(order.total_price ?? 0).toFixed(2)}Tk</p>
            <p className="text-xs text-gray-400">{order.payment_method}</p>
          </div>
          <svg
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      {/* Expanded details */}
      {open && (
        <div className="border-t border-gray-100">

          {/* Order items */}
          <div className="px-5 py-4 space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items Ordered</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover bg-gray-50 flex-shrink-0"
                  onError={e => e.target.src = "https://placehold.co/48x48/f3f4f6/9ca3af?text=🛒"}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.product.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-[#1a4731] flex-shrink-0">{(parseFloat(item.price).toFixed(2))}Tk</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-gray-100"/>

          {/* Tracker */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Order Status</p>
            <Tracker status={order.order_status}/>
            {order.deliveredAt && (
              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Delivered on {order.deliveredAt}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-gray-100"/>

          {/* Summary + actions */}
          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            {/* Order info */}
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Order Info</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {`${order.address}, ${order.city}`}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                {order.payment_method}
              </div>
            </div>

            {/* Price summary + buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-8 text-xs text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-700">{(Number(order.subtotal ?? 0)).toFixed(2)}Tk</span>
              </div>
              <div className="flex items-center justify-between gap-8 text-xs text-gray-500">
                <span>Delivery</span>
                <span className={`font-semibold ${order.delivery_charge == 0 ? "text-green-600" : "text-gray-700"}`}>
                  {order.delivery_charge == 0 ? "FREE" : `$${parseFloat(order.delivery_charge).toFixed(2)}Tk`}
                </span>
              </div>
              <div className="flex items-center justify-between gap-8 text-sm border-t border-gray-100 pt-2">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-extrabold text-[#1a4731]">{(Number(order.total_price ?? 0)).toFixed(2)}Tk</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard
