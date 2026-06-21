

const OrderItems = ({onClose, items }) => {
    console.log(items, "items in order");
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900 text-lg">Order Items ({items.length})</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
            
             <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 p-3 border rounded-lg bg-gray-50">
                    <div className="flex flex-col items-center gap-4 bg-gray-100 p-2 rounded-lg">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover"/>
                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                    </div>

                    <p className="text-sm text-gray-600">{parseFloat(item.price).toFixed(2)}Tk x {item.quantity}</p>
                    </div>
                ))}
            </div>
        
        </div>
        <div className="px-6 pb-6 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-all">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default OrderItems
