import React, { useState } from "react";
import toast from "react-hot-toast";

const VehicleTypes = [
    { value: "bike", label: "Bike" },
    { value: "car", label: "Car" },
    { value: "cycle", label: "Cycle" },
    { value: "other", label: "Other" },
]

const CreateDeliveryPartner = ({onClose, createDeliveryPartner, isLoading}) => {
    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [vehicle_type, setVehicle_type] = useState("other");
    const [vehicle_number, setVehicle_number] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("full_name", full_name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("vehicle_type", vehicle_type);
        formData.append("vehicle_number", vehicle_number);
        try {
            await createDeliveryPartner(formData).unwrap();
            setFull_name("");
            setEmail("");
            setPhone("");
            setPassword("");
            setVehicle_type("other");
            setVehicle_number("");
            toast.success("Delivery partner created successfully");
            onClose();
        }
        catch (error) {
            // console.error("Failed to create delivery partner:", error);
            toast.error("Failed to create delivery partner. Please try again.");
        }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-900 text-lg">Create Delivery Partner</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="p-6 space-y-4">

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={full_name}
                onChange={(e) => setFull_name(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                placeholder="Enter full name"
                required
              />
            </div>

            <div
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
            >
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Vehicle Type</label>    
                <select
                    value={vehicle_type}
                    onChange={(e) => setVehicle_type(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                >
                    {VehicleTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
            </div>

            {vehicle_type !== "other" && (
                <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Vehicle Number</label>  
                    <input
                        type="text"
                        value={vehicle_number}
                        onChange={(e) => setVehicle_number(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                        placeholder="Enter vehicle number"
                    />
                </div>
             )}

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                placeholder="Enter email"
                required
                />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"
                placeholder="Enter password"
                required
              />
            </div>


          </div>
          <div className="px-6 pb-6 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-all">Cancel</button>
            <button type="submit" className="flex-[2] py-3 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] text-white font-bold text-sm transition-all shadow-lg shadow-[#1a4731]/20">
            { isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    Creating...
                  </div>
                ) : "Create Delivery Partner →"}           
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeliveryPartner
