import { useState } from "react";
import { useGetMyOrdersQuery } from "../../redux/features/orderFeatures";
import Loader from "../../components/reusable/Loader";
import OrderCard from "../../components/pages/order/OrderCard";



const FILTERS = ["All Orders", "pending", "confirmed", "delivered"];


const MyOrder = () => {
  const { data: myOrders, isLoading:myOrderLoading } = useGetMyOrdersQuery();
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const [search] = useState("");

  const filtered = myOrders?.filter((o) => {
    const matchFilter =
      activeFilter === "All Orders" ||
      o.order_status === activeFilter;

    const matchSearch =
      !search ||
      o.tracking_code
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  }) || [];

  const counts = {
    "All Orders": myOrders?.length || 0,
    pending: myOrders?.filter(
      (o) => o.order_status === "pending"
    ).length || 0,

    confirmed: myOrders?.filter(
      (o) => o.order_status === "confirmed"
    ).length || 0,

    delivered: myOrders?.filter(
      (o) => o.order_status === "delivered"
    ).length || 0,
  };

  const filterConfig = {
    "All Orders": {
      dot: "bg-gray-400",
      active: "bg-[#1a4731] text-white border-[#1a4731]",
      inactive:
        "bg-white text-gray-600 border-gray-200 hover:border-[#1a4731] hover:text-[#1a4731]",
    },

    pending: {
      dot: "bg-yellow-500",
      active: "bg-yellow-500 text-white border-yellow-500",
      inactive:
        "bg-white text-gray-600 border-gray-200 hover:border-yellow-400 hover:text-yellow-600",
    },

    confirmed: {
      dot: "bg-blue-500",
      active: "bg-blue-600 text-white border-blue-600",
      inactive:
        "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600",
    },

    delivered: {
      dot: "bg-green-500",
      active: "bg-green-600 text-white border-green-600",
      inactive:
        "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600",
    },
  };

  return (
    <div>
      <div className="space-y-6">

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">My Orders</h1>
            <p className="text-gray-400 text-sm mt-1">Track and manage all your purchases</p>
          </div>
          
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
              {
                label: "Total Orders",
                value: counts["All Orders"],
                icon: "📦",
                color: "text-gray-700", 
                bg: "bg-gray-50"
              },
              {
                label: "Pending",
                value: counts.pending,
                icon: "🕐",
                color: "text-blue-700", 
                bg: "bg-blue-50"
              },
              {
                label: "Confirmed",
                value: counts.confirmed,
                icon: "🚚",
                color: "text-orange-700", 
                bg: "bg-orange-50"
              },
              {
                label: "Delivered",
                value: counts.delivered,
                icon: "✅",
                color: "text-green-700",
                bg: "bg-green-50"
              }
            ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-white`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-400 leading-tight">{s.label}</p>
                <span className="text-lg">{s.icon}</span>
              </div>
              <p className={`text-3xl font-extrabold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {FILTERS.map(f => {
            const isActive = activeFilter === f;
            const cfg = filterConfig[f];
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                  isActive ? cfg.active : cfg.inactive
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-white/70" : cfg.dot}`}/>
                {f}
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {counts[f]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Orders list ── */}
          {myOrderLoading ? (
            <div className="space-y-3">
              <Loader />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-gray-700 font-bold text-lg">No orders found</p>
              <p className="text-gray-400 text-sm mt-1">
                {search ? "Try a different order ID" : `You have no ${activeFilter === "All Orders" ? "" : activeFilter + " "}orders yet`}
              </p>
              <a href="/"
                className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 bg-[#1a4731] hover:bg-[#0d3320] text-white rounded-2xl font-bold text-sm transition-all">
                Start Shopping →
              </a>
            </div>
          ):(
            <div className="space-y-3">
              {filtered.map(order => <OrderCard key={order.id} order={order}/>)}
            </div>
          )}



        {/* ── Footer note ── */}
        <p className="text-center text-xs text-gray-400 pb-4">
          Showing {filtered.length} of {myOrders?.length} orders ·
        </p>
      </div>
    </div>
  );
}

export default MyOrder

