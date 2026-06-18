import React, { useState } from 'react'

const ORDERS = [
  { id:"#ORD-1091", customer:"Arif H.",     items:3, total:142.50, status:"Delivered",        date:"Jun 9, 2026" },
  { id:"#ORD-1090", customer:"Priya K.",    items:1, total:30.00,  status:"Out for Delivery", date:"Jun 9, 2026" },
  { id:"#ORD-1089", customer:"Meera D.",    items:5, total:310.00, status:"Placed",           date:"Jun 8, 2026" },
  { id:"#ORD-1088", customer:"Karan P.",    items:2, total:87.00,  status:"Delivered",        date:"Jun 8, 2026" },
  { id:"#ORD-1087", customer:"Ananya S.",   items:4, total:215.00, status:"Cancelled",        date:"Jun 7, 2026" },
  { id:"#ORD-1086", customer:"John D.",     items:2, total:61.99,  status:"Out for Delivery", date:"Jun 7, 2026" },
  { id:"#ORD-1085", customer:"Riya M.",     items:1, total:55.00,  status:"Placed",           date:"Jun 7, 2026" },
];

const STATUS_STYLE = {
  "Delivered":        "bg-green-100 text-green-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  "Placed":           "bg-blue-100 text-blue-700",
  "Cancelled":        "bg-red-100 text-red-600",
  "In Stock":         "bg-green-100 text-green-700",
  "Out of Stock":     "bg-red-100 text-red-600",
  "Active":           "bg-green-100 text-green-700",
  "Inactive":         "bg-gray-100 text-gray-500",
};


const AdminOrder = () => {
    const [orders] = useState(ORDERS);
  return (
    <div className="space-y-5">
        <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-extrabold text-gray-900">All Orders</h1>
            <p className="text-gray-400 text-sm mt-0.5">{orders.length} total orders</p>
        </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                {["ORDER ID","CUSTOMER","ITEMS","TOTAL","STATUS","DATE","ACTION"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {orders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-900 whitespace-nowrap">{o.id}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">{o.customer}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{o.items}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">${o.total.toFixed(2)}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">{o.date}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                    <button className="text-xs font-bold text-[#1a4731] hover:underline">View</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default AdminOrder
