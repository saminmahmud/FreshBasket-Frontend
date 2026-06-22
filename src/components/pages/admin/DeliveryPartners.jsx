import toast from 'react-hot-toast';
import { useCreateDeliveryPartnerMutation, useGetDeliveryPartnersQuery, useUpdateDeliveryPartnerStatusMutation } from '../../../redux/features/authFeatures';
import Loader from '../../reusable/loader';
import { useState } from 'react';
import CreateDeliveryPartner from '../../modal/CreateDeliveryPartner';


const DeliveryPartners = () => {
    const { data: deliveryPartners, isLoading: deliveryPartnersLoading, isFetching: isDeliveryPartnersFetching } = useGetDeliveryPartnersQuery();
    const [updateDeliveryPartnerStatus, { isLoading: isUpdatingStatus }] = useUpdateDeliveryPartnerStatusMutation();
    const [createDeliveryPartner, { isLoading: isCreatingPartner }] = useCreateDeliveryPartnerMutation();

    const [loadingId, setLoadingId] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    
    if(deliveryPartnersLoading || isDeliveryPartnersFetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader />
            </div>
        )
    }

    const handleUpdateStatus = async (id) => {
        try {
            setLoadingId(id);
            await updateDeliveryPartnerStatus(id).unwrap();
            toast.success("Status updated successfully");
        } catch (error) {
            // console.error("Error updating status:", error);
            toast.error("Failed to update status. Please try again.");
        } finally {
            setLoadingId(null);
        }
    };

    console.log(deliveryPartners)

  return (
    <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Delivery Partners</h1>
            <p className="text-gray-400 text-sm mt-0.5">{deliveryPartners?.length || 0} delivery partners</p>
        </div>
        <button 
            onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1 px-2 py-2 bg-[#1a4731] hover:bg-[#0d3320] text-white rounded-xl text-sm transition-all shadow-sm shadow-[#1a4731]/20">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Delivery Partner
        </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
            {deliveryPartners?.map((partner, i) => (
            <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg transition-all duration-300"
            >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                <img className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg" src={partner.avatar} alt={partner.profile.full_name} />

                <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                    {partner.profile.full_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                     @{partner.username}
                    </p>
                </div>
                </div>

                <span className={"px-3 py-1 rounded-full text-xs font-semibold " + (partner.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                {partner.is_active ? "Active" : "Inactive"}
                </span>
            </div>

            {/* Info */}
            <div className="space-y-4 border-t pt-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4b5563"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                    </svg>
                </div>

                <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm text-gray-700">
                        {partner.email}
                    </p>
                </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4b5563"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.21 5.18 2 2 0 0 1 5.23 3h3a2 2 0 0 1 2 1.72c.13 1.21.37 2.39.72 3.53a2 2 0 0 1-.45 1.95l-2.11 2.11a16 16 0 0 0 6.58 6.58l2.11-2.11a2 2 0 0 1 1.95-.45c1.14.35 2.32.59 3.53.72A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-sm text-gray-700">
                        {partner.profile.phone}
                        </p>
                    </div>
                </div>
                {/* Vehicle Information */}
                {partner.profile.vehicle_type !== "other" && (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                        width="18"
                        height="18" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4b5563"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Vehicle</p>
                        <p className="text-sm text-gray-700">
                        
                        {partner.profile.vehicle_type} - {partner.profile.vehicle_number}
                    
                        </p>
                    </div>
                </div>
                )}
            </div>
            
            {/* Footer for change status */}
            <div className="border-t pt-4 mt-4 flex items-center justify-end">
            <button 
                onClick={() => handleUpdateStatus(partner.profile.user_id)}
                disabled={loadingId === partner.profile.user_id}
                className={"px-3 py-1 rounded-md text-sm font-medium " + (partner.is_active ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200")}
            >
                    {loadingId === partner.profile.user_id ? (
                    <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                        </svg>
                        Updating...
                    </div>
                    ) : (<p>Update to {partner.is_active ? "Inactive" : "Active"}</p>)}
            </button>
            </div>

            </div>
            ))}
        {showCreateModal && <CreateDeliveryPartner onClose={() => setShowCreateModal(false)} createDeliveryPartner={createDeliveryPartner} isLoading={isCreatingPartner} />}
        </div>
    </div>
  )
}

export default DeliveryPartners
