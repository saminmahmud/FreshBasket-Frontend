import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AddProductModal = ({ mode, product, onClose, createProduct, editProduct, productCreateLoading, productEditLoading, categoriesData }) => {
  const [form, setForm] = useState({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      unit: "kg",
      unit_quantity: "",
      discount: "",
      is_organic: false,
      is_flash_sale: false,
      flash_sale_discount: "",
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

    useEffect(() => {
        if (mode === "edit" && product) {
            setForm({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            category: product.category?.id || "",
            stock: product.stock || "",
            unit: product.unit || "kg",
            unit_quantity: product.unit_quantity || "",
            discount: product.discount || "",
            is_organic: product.is_organic || false,
            is_flash_sale: product.is_flash_sale || false,
            flash_sale_discount: product.flash_sale_discount || "",
            });
            setExistingImage(product.image);
        }
    }, [mode, product]);

  const set = (k, v) =>
    setForm(prev => ({
        ...prev,
        [k]: v
  }));

  const submit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting product with data:", form, "and image:", image);
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category_id", Number(form.category));
        formData.append("stock", form.stock);
        formData.append("unit", form.unit);
        formData.append("unit_quantity", form.unit_quantity);
        formData.append("discount", form.discount || 0);
        formData.append(
            "is_organic",
            form.is_organic
        );
        formData.append(
            "is_flash_sale",
            form.is_flash_sale
        );
        formData.append(
            "flash_sale_discount",
            form.flash_sale_discount || 0
        );

        if (image)
            formData.append("image", image);


        if (mode === "add") {
            await createProduct(formData).unwrap();
            toast.success("Product added successfully");
            } else {
            await editProduct({
                id: product.id,
                data: formData
            }).unwrap();
            toast.success("Product updated successfully");
        }

        onClose();

    } catch (err) {
        // console.log(err);
        toast.error(mode === "add" ? "Failed to add product" : "Failed to update product");
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900 text-lg">Add New Product</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Product Name</label>
              <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Fresh Tomatoes" required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={2} placeholder="Short product description..." 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all resize-none"/>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Price (Tk)</label>
              <input type="number" value={form.price} onChange={e => set("price", parseFloat(e.target.value) || 0)} placeholder="0.00" required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Stock Qty</label>
              <input type="number" value={form.stock} onChange={e => set("stock", parseInt(e.target.value) || 0)} placeholder="0" required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Category</label>
              <select value={form.category} onChange={e => set("category", e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all appearance-none">
                <option value="" disabled>Select category</option>
                {categoriesData?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Unit</label>
              <div className="flex gap-3">
                <button type="button" className={`px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] transition-all ${form.unit === "kg" ? "bg-neutral-400" : ""}`}
                  onClick={() => set("unit", "kg")}>
                  kg
                </button>
                <button type="button" className={`px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] transition-all ${form.unit === "g" ? "bg-neutral-400" : ""}`}
                  onClick={() => set("unit", "g")}>
                  g
                </button>
                <button type="button" className={`px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] transition-all ${form.unit === "l" ? "bg-neutral-400" : ""}`}
                  onClick={() => set("unit", "l")}>
                  l
                </button>
                <button type="button" className={`px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] transition-all ${form.unit === "ml" ? "bg-neutral-400" : ""}`}
                  onClick={() => set("unit", "ml")}>
                  ml
                </button>
                <button type="button" className={`px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] transition-all ${form.unit === "pcs" ? "bg-neutral-400" : ""}`}
                  onClick={() => set("unit", "pcs")}>
                  pcs
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Unit Quantity</label>
              <input type="number" value={form.unit_quantity} onChange={e => set("unit_quantity", parseFloat(e.target.value) || 0)} placeholder="e.g. 0.5" required min={0}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Discount (%)</label>
              <input type="number" value={form.discount} onChange={e => set("discount", parseFloat(e.target.value) || 0)} placeholder="0" min={0} max={100}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
                <input type="checkbox" checked={form.is_organic} onChange={e => set("is_organic", e.target.checked)}
                  className="w-4 h-4 text-[#1a4731] bg-gray-100 border-gray-300 rounded focus:ring-[#1a4731]/50"/>
                Organic 
              </label>
              <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
                <input type="checkbox" checked={form.is_flash_sale} onChange={e => set("is_flash_sale", e.target.checked)}
                  className="w-4 h-4 text-[#1a4731] bg-gray-100 border-gray-300 rounded focus:ring-[#1a4731]/50"/>
                Flash Sale
              </label>
            </div>
            {form.is_flash_sale && (
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Flash Sale Discount (%)</label> 
                <input type="number" value={form.flash_sale_discount} onChange={e => set("flash_sale_discount", parseFloat(e.target.value) || 0)} placeholder="0" required={form.is_flash_sale} min={0} max={100}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
              </div>
            )}
            <div className="flex flex-col md:flex-row items-start justify-between  ">
            {existingImage && !image && (
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Current Image</label>
              <img src={existingImage} alt={existingImage} className="w-20 h-20 object-cover rounded-md"/>
            </div>
            )}
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Product Image</label>
              <input type="file" onChange={e => setImage(e.target.files[0])} required={mode === "add"}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
            </div>
            </div>
          </div>

          <div className="px-6 pb-6 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-all">Cancel</button>
            <button type="submit" className="flex-[2] py-3 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] text-white font-bold text-sm transition-all shadow-lg shadow-[#1a4731]/20"
            disabled={productCreateLoading || productEditLoading}
            >
                {productCreateLoading || productEditLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    {mode === "add"
                    ? (productCreateLoading ? "Adding..." : "Add Product")
                    : (productEditLoading ? "Updating..." : "Update Product")}
                </div>
                ) : (mode === "add" ? "Add Product →" : "Update Product →")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal
