import { useGetAdminDashboardQuery } from '../../../redux/features/orderFeatures';
import Loader from '../../reusable/loader';
import { Link } from 'react-router-dom';

const STATUS_STYLE = [
    {key: "pending", label:"Pending", class:"bg-gray-100 text-gray-700",},
    {key: "confirmed", label:"Confirmed", class:"bg-blue-100 text-blue-700",},
    {key: "assigned_to_delivery", label:"Assigned to Delivery", class:"bg-green-100 text-green-700",},
    {key: "packed", label:"Packed", class:"bg-orange-100 text-orange-600",},
    {key: "out_for_delivery", label:"Out for Delivery", class:"bg-blue-100 text-blue-700",},
    {key: "delivered", label:"Delivered", class:"bg-green-100 text-green-700",},
    {key:"cancelled", label:"Cancelled", class:"bg-red-100 text-red-600"}
]


const AdminDashboard = () => {
    const { data:deshboardData, isLoading:deshboardLoading } = useGetAdminDashboardQuery();

    if(deshboardLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader />
            </div>
        )
    }

    const STATS = [
        { label: "Total Orders",   value: deshboardData?.total_orders, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
        { label: "Total Users",    value: deshboardData?.total_users, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
        { label: "Total Products", value: deshboardData?.total_products,  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
        { label: "Out of Stock",   value: deshboardData?.total_out_of_stock_products,   icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
    ];


  return (
    <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 flex items-center justify-between">
            <div>
                <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
            <div className="w-11 h-11 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                {s.icon}
            </div>
            </div>
        ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-extrabold text-gray-900 text-lg">Recent Orders</h2>
            <Link to="/admin/orders" className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:underline">
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                {["ORDER ID","CUSTOMER","ITEMS","TOTAL","STATUS","DATE"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {deshboardData?.recent_orders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-900 whitespace-nowrap">{o.id}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">{o.full_name}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{o.items.length}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">{parseFloat(o.total_price).toFixed(2)}Tk</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE.find(s => s.key === o.order_status)?.class}`}>{STATUS_STYLE.find(s => s.key === o.order_status)?.label}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard
