import { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { useGetMeQuery, useGetAddressQuery, useUpdateAddressMutation, useUpdateMyImageMutation } from "../../redux/features/authFeatures";
import PageLoader from "../../components/reusable/PageLoader";
import toast from "react-hot-toast";

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

function InputField({ label, name, value, onChange, error, placeholder, icon, type = "text" }) {
  return (
    <div className="w-full">
      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
            error
              ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
              : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
    </div>
  );
}


export default function Address() {
  const fileInputRef = useRef(null);
  const {data:userData, isLoading:isUserLoading} = useGetMeQuery();
  const {data:addressData, isLoading:isAddressLoading, isSuccess:isAddressSuccess, isError:isAddressError} = useGetAddressQuery();
  const [updateAddress, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateAddressMutation();
  const [updateMyImage, { isLoading: isImageUpdating, isSuccess: isImageUpdateSuccess, isError: isImageUpdateError }] = useUpdateMyImageMutation();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    city: "",
    postal_code: "",
    address: "",
  });

  useEffect(() => {
    if (addressData) {
      setForm({
        full_name: addressData.full_name || "",
        phone: addressData.phone || "",
        city: addressData.city || "",
        postal_code: addressData.postal_code || "",
        address: addressData.address || "",
      });
    }
  }, [addressData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateAddress({
        id: addressData.id,
        data: form,
      }).unwrap();

      toast.success("Address updated successfully");
    } catch (err) {
      // console.log(err);
      toast.error("Failed to update address");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await updateMyImage(formData).unwrap();
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error("Failed to update profile image");
    }
  };

  if (isUserLoading || isAddressLoading) {
    return <PageLoader />;
  }

  

  return (
    <div>

      <div className="mx-auto space-y-5">

        {/* ── User Profile Card (non-editable) ── */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="h-20 bg-gradient-to-r from-[#1a4731] to-[#2d6a4f] relative">
            <div className="absolute -bottom-12 left-6">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt={userData.username}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
                <FiEdit onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 w-5 h-5 bg-white text-black rounded-md border-2 border-white cursor-pointer"/>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="pt-16 pb-5 px-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">@{userData.username}</h2>
                <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Addresses Section ── */}
        <div>
          <div className="">
          {/* Backdrop */}
          <div className="" />

          {/* Modal */}
          <div className="relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden  flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#1a4731] text-white rounded-2xl flex items-center justify-center">
                  <MapPinIcon/>
                </div>
                <div>
                  <h2 className="font-extrabold text-gray-900 text-base">Your Address</h2>
                  <p className="text-xs text-gray-400">Manage your delivery details</p>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="px-6 space-y-5">

              {/* Full Name */}
              <InputField label="Full Name" name="full_name" 
                value={form.full_name}
                onChange={handleChange}
                placeholder="Rahim Uddin"
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              />

              {/* Phone */}
              <InputField label="Phone Number" name="phone" 
                value={form.phone}
                onChange={handleChange}
                placeholder="+8801XXXXXXXXX"
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 12a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
              />

              {/* City + Postal */}
              <div className="grid grid-cols-2 gap-3">
                <InputField label="City" name="city" 
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Bangladesh"
                  icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                />
                <InputField label="Postal Code" name="postal_code" 
                  value={form.postal_code}
                  onChange={handleChange}
                  placeholder="1204"
                  icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Street Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none">
                    <MapPinIcon/>
                  </span>
                  <textarea name="address" 
                  value={form.address}
                  onChange={handleChange}
                    placeholder="123 Green Road, Apartment 4B"
                    rows={2}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10"}`}/>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
              <button type="submit" onClick={handleSubmit} disabled={isUpdating}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] active:scale-[0.98] text-white font-bold text-sm transition-all disabled:opacity-60 shadow-lg shadow-[#1a4731]/20">
                {isUpdating ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    Saving...
                  </div>
                ) : "Submit Changes"}
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* ── Tips ── */}
        <div className="bg-gradient-to-r from-[#1a4731] to-[#2d6a4f] rounded-3xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-white/15 rounded-2xl flex items-center justify-center text-xl flex-shrink-0">💡</div>
          <div>
            <p className="text-white font-bold text-sm">Quick Tips</p>
            <ul className="mt-2 space-y-1">
              {[
                "Set a default address to speed up checkout",
                "You can edit or delete any address anytime",
              ].map(t => (
                <li key={t} className="text-white/70 text-xs flex items-start gap-1.5">
                  <svg className="flex-shrink-0 mt-0.5" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#74c69d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    
    </div>
  );
}