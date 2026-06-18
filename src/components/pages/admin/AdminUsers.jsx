import React from 'react'


const USERS = [
  { id:1, name:"Arif Hossain",  email:"arif@example.com",   orders:12, joined:"Jan 2026", status:"Active" },
  { id:2, name:"Priya Kapoor",  email:"priya@example.com",  orders:5,  joined:"Mar 2026", status:"Active" },
  { id:3, name:"Meera Das",     email:"meera@example.com",  orders:20, joined:"Nov 2025", status:"Active" },
  { id:4, name:"Karan Patel",   email:"karan@example.com",  orders:3,  joined:"Apr 2026", status:"Inactive" },
  { id:5, name:"Ananya Singh",  email:"ananya@example.com", orders:8,  joined:"Feb 2026", status:"Active" },
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

const AdminUsers = () => {
  return (
    <div className="space-y-5">
        <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Users</h1>
        <p className="text-gray-400 text-sm mt-0.5">{USERS.length} registered users</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                {["USER","EMAIL","ORDERS","JOINED","STATUS","ACTION"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {USERS.map((u,i) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#1a4731] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {u.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{u.name}</span>
                    </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{u.email}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{u.orders}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">{u.joined}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[u.status]}`}>{u.status}</span>
                    </td>
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

export default AdminUsers
