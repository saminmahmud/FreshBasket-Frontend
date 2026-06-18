import { useState } from 'react'
import toast from 'react-hot-toast';

const AddCategoryModal = ({ onClose, addCategory, categoryLoading}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await addCategory(formData).unwrap();

      setName("");
      setImage(null);
      
      onClose();
      toast.success("Category added successfully");

    }
    catch (error) {
      toast.error("Failed to add category.");
    }

  };
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900 text-lg">Add New Category</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                placeholder="Enter category name"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Category Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                placeholder="Enter category image URL"
                required
              />
            </div>
          </div>
          <div className="px-6 pb-6 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-all">Cancel</button>
            <button type="submit" className="flex-[2] py-3 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] text-white font-bold text-sm transition-all shadow-lg shadow-[#1a4731]/20">
            { categoryLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    Adding...
                  </div>
                ) : "Add Category →"}           
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal
