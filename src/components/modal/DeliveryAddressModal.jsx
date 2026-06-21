
const DeliveryAddressModal = ({onClose, myOrders}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900 text-lg">Delivery Address</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
            <div className="flex flex-col items-center gap-2">
                <img src={myOrders.user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"/>
                <p className="text-gray-700 text-sm font-semibold">@{myOrders.user.username}</p>
            </div>

             <div>
                <p className="text-gray-700 text-sm font-semibold">Full Name: <span className="font-normal">{myOrders.full_name}</span></p>
                <p className="text-gray-700 text-sm font-semibold">Phone Number: <span className="font-normal">{myOrders.phone}</span></p>
                <p className="text-gray-700 text-sm font-semibold">Address: <span className="font-normal">{myOrders.address}</span></p>
                <p className="text-gray-700 text-sm font-semibold">City: <span className="font-normal">{myOrders.city}</span></p>
                <p className="text-gray-700 text-sm font-semibold">Postal Code: <span className="font-normal">{myOrders.postal_code}</span></p>
                {myOrders.note && (
                    <p className="text-gray-700 text-sm font-semibold">Note: <span className="font-normal">{myOrders.note}</span></p>
                )}
            </div>
        
        </div>
        <div className="px-6 pb-6 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-all">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddressModal
