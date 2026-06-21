import React, { useState } from 'react'
import { useGetMyOrdersQuery } from '../../../redux/features/orderFeatures';
import Loader from '../../reusable/loader';
import { useGetDeliveryPartnersQuery } from '../../../redux/features/authFeatures';
import DeliveryAddressModal from '../../modal/DeliveryAddressModal';
import OrderItems from '../../modal/OrderItems';


const STATUS_STYLE = [
    {key: "pending", label:"Pending", class:"bg-gray-100 text-gray-700",},
    {key: "confirmed", label:"Confirmed", class:"bg-blue-100 text-blue-700",},
    {key: "assigned_to_delivery", label:"Assigned to Delivery", class:"bg-green-100 text-green-700",},
    {key: "packed", label:"Packed", class:"bg-orange-100 text-orange-600",},
    {key: "out_for_delivery", label:"Out for Delivery", class:"bg-blue-100 text-blue-700",},
    {key: "delivered", label:"Delivered", class:"bg-green-100 text-green-700",},
    {key:"cancelled", label:"Cancelled", class:"bg-red-100 text-red-600"}
]


const AdminOrder = () => {
    const { data: myOrders, isLoading:myOrderLoading } = useGetMyOrdersQuery();
    const { data: deliveryPartners, isLoading: deliveryPartnersLoading } = useGetDeliveryPartnersQuery();

    const [showAddress, setShowAddress]   = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [showItems, setShowItems]   = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);

    if(myOrderLoading || deliveryPartnersLoading){
        return (
            <div className="flex items-center justify-center h-64">
                <Loader />
            </div>
        )
    }



  return (
    <div className="space-y-5">
        <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-extrabold text-gray-900">All Orders</h1>
            <p className="text-gray-400 text-sm mt-0.5">{myOrders.length} total orders</p>
        </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                {["ORDER ID","CUSTOMER","ITEMS","TOTAL", "ASSIGNED TO DELIVERY", "STATUS","DATE", "CANCEL"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {myOrders?.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-900 whitespace-nowrap">{o.id}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                        <button className="text-blue-500 hover:underline" onClick={() => {
                            setSelectedOrder(o);
                            setShowAddress(true);
                        }}>
                            {o.full_name}
                        </button>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                        <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={() => {
                            setSelectedItems(o.items);
                            setShowItems(true);
                        }}>
                            {o.items.length}
                        </button>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">{parseFloat(o.total_price).toFixed(2)}Tk</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                        <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" 
                        disabled={o.order_status === "cancelled" || o.order_status === "delivered" || o.order_status === "pending"}
                        >
                            <option value="">Assign Delivery Person</option>
                            {deliveryPartners?.map(partner => (
                                <option key={partner.id} value={partner.id}>
                                    {partner.profile.full_name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                        {/* <button className={`text-[11px] font-bold px-2.5 py-1 rounded-full hover:bg-gray-200 ring-1 ring-blue-500 ${STATUS_STYLE.find(s => s.key === o.order_status)?.class}`}>
                        {STATUS_STYLE.find(s => s.key === o.order_status)?.label}
                        </button> */}
                        <select className={`text-[11px] font-bold px-2.5 py-1 rounded-full hover:bg-gray-200 ring-1 ring-blue-500 ${STATUS_STYLE.find(s => s.key === o.order_status)?.class}`}
                        disabled={o.order_status === "cancelled" || o.order_status === "delivered"}
                        >   
                            {STATUS_STYLE.map(s => (
                                <option key={s.key} value={s.key} selected={s.key === o.order_status}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">
                        {o.order_status !== "cancelled" && o.order_status !== "delivered" ? (
                            <button className="text-red-500 hover:underline">Cancel</button>
                        ) : (
                            <button className="text-gray-400 cursor-not-allowed">Cancel</button>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {showAddress && <DeliveryAddressModal myOrders={selectedOrder} onClose={() => setShowAddress(false)} />}
        {showItems && <OrderItems items={selectedItems} onClose={() => setShowItems(false)} />}
        </div>
    </div>
  )
}

export default AdminOrder
