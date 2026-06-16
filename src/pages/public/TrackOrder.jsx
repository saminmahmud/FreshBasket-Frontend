import { useEffect, useRef } from "react";
import { useSearchParams } from 'react-router-dom';
import { useGetOrderTrackQuery } from '../../redux/features/orderFeatures';
import PageLoader from "../../components/reusable/PageLoader";
import FetchError from "../../components/reusable/FetchError";

const STEPS = [
  { key: "pending",      label: "Placed",       
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { key: "confirmed",   label: "Confirmed",  
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
  { key: "assigned_to_delivery",    label: "Assigned",      
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg> },
  { key: "packed",      label: "Packed",           
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
  { key: "out_for_delivery",         label: "Out for Delivery", 
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { key: "delivered",   label: "Delivered",   
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
];

function MapView() {
  const mapRef = useRef(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = window.L;
      if (!mapRef.current) return;
      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([23.7461, 90.3742], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      const redIcon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;background:#ef4444;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      L.marker([23.7461, 90.3742], { icon: redIcon }).addTo(map);
    };
    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} className="w-full h-full z-0 "/>;
}

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get("tracking_id");
  const { data: orderTrackData, isLoading: isOrderTrackLoading, isError: isOrderTrackError } = useGetOrderTrackQuery(trackingId);

  if(isOrderTrackLoading) {
    return <PageLoader />;
  }

  if(isOrderTrackError || !orderTrackData) {
    return <FetchError message="Unable to fetch tracking information. Please check your Tracking ID and try again." />; 
  }

  const currentStepIndex = STEPS.findIndex(
    step => step.key === orderTrackData.order_status
  );

  return (
    <div className="">
      <div className="mx-auto px-4 ">

        {/* Otp */}
        {(orderTrackData?.otp && !orderTrackData.is_otp_verified) && (
        <div className="bg-green-800 text-green-100 rounded-2xl p-4 mb-6">
          <div className="mb-2">
            <h1 className="text-lg font-bold">Delivery OTP</h1>
            <p className="text-sm">Share this with your delivery partner</p>
          </div>
          <div className="font-bold text-lg mt-1 tracking-wide">
            {
              orderTrackData.otp.split("").map((digit, index) => (
                <div key={index} className="inline-block w-8 h-10 bg-green-700 rounded-lg mx-1">
                  <span className="block w-full h-full text-center leading-10 tracking-widest font-mono text-lg">{digit}</span>
                </div>
              ))
            }
          </div>
        </div>
        ) }

        {/* Order header */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Order Tracking Information</h1>
            <p className="text-gray-400 text-sm mt-1">Tracking ID: {orderTrackData.tracking_code}</p>
            <p className="text-gray-400 text-sm mt-1">Placed on {new Date(orderTrackData.created_at).toLocaleDateString()}</p>
          </div>
          <span className="bg-orange-100 text-orange-700 text-sm font-bold px-4 py-1.5 rounded-full flex-shrink-0 mt-1">
            {orderTrackData.order_status.replace(/_/g, " ").toUpperCase()}
          </span>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-5">

          {/* LEFT col */}
          <div className="space-y-5">

            {/* Map */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden -z-20 " style={{ height: "300px" }}>
              <MapView/>
            </div>

            {/* Delivery Progress */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 text-base mb-5">Delivery Progress</h2>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-8 bottom-2 w-px bg-gray-200 z-0"/>

                <div className="space-y-0">
                  {STEPS.map((step, index) => (
                    <div key={step.key} className="relative flex items-start gap-4 pb-7 last:pb-0">

                      {/* line */}
                      {index < STEPS.length - 1 && (
                        <div
                          className={`absolute left-[19px] top-10 w-px h-full ${
                            index < currentStepIndex
                              ? "bg-[#1a4731]"
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      {/* circle */}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          index <= currentStepIndex
                            ? "bg-[#1a4731] border-[#1a4731] text-white"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {step.icon}
                      </div>

                      <div className="pt-2">
                        <p className={`text-sm font-semibold ${
                          index <= currentStepIndex
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT col */}
          <div className="space-y-4">

            {/* Delivery Partner */}
            {orderTrackData?.delivery_partner && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={orderTrackData.delivery_partner.user.avatar} alt={orderTrackData.delivery_partner.full_name} className="w-10 h-10 rounded-full object-cover bg-gray-50"/>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{orderTrackData.delivery_partner.full_name}</p> 
                    <p className="text-xs text-gray-400">Delivery Partner</p>
                  </div>
                </div>
                {orderTrackData.delivery_partner.phone && (
                  <p className="text-sm text-gray-600">Phone: {orderTrackData.delivery_partner.phone}</p>
                )}
                {orderTrackData.delivery_partner.user.email && (
                  <p className="text-sm text-gray-600">Email: {orderTrackData.delivery_partner.user.email}</p>
                )}
              </div>
            )}

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="font-bold text-gray-900 text-sm">Delivery Information</p>
              </div>
              <div className="space-y-0.5 text-sm text-gray-600">
                <p> <span className="font-bold">Full Name: </span>{orderTrackData.full_name}</p>
                <p> <span className="font-bold">Phone: </span>{orderTrackData.phone}</p>
                <p> <span className="font-bold">City: </span>{orderTrackData.city}</p>
                <p> <span className="font-bold">Postal Code: </span>{orderTrackData.postal_code}</p>
                <p> <span className="font-bold">Address: </span>{orderTrackData.address}</p>
                <p> <span className="font-bold">Delivery Area: </span>{orderTrackData.delivery_area}</p>
                <p> <span className="font-bold">Payment Method: </span>{orderTrackData.payment_method == "ssl_commerz" ? "SSLCommerz" : "Cash on Delivery"}</p>
              </div>
            </div>

            {/* Order Items & Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="font-bold text-gray-900 text-sm mb-4">Items ({orderTrackData.items.length})</p>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-48 overflow-y-auto pr-1">
                {orderTrackData.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-xl object-cover bg-gray-50 flex-shrink-0"
                      onError={e => e.target.src="https://placehold.co/40x40/f3f4f6/9ca3af?text=🛒"}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 flex-shrink-0">{parseFloat(item.price).toFixed(2)}Tk</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-4"/>

              {/* Pricing */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-700">{parseFloat(orderTrackData.subtotal).toFixed(2)}Tk</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className={`font-medium ${parseFloat(orderTrackData.delivery_charge) === 0 ? "text-green-600" : "text-gray-700"}`}>
                    {orderTrackData.delivery_charge == 0 ? "Free" : `${parseFloat(orderTrackData.delivery_charge).toFixed(2)}Tk`}
                  </span>
                </div>
                <div className="h-px bg-gray-100"/>
                <div className="flex justify-between font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>{parseFloat(orderTrackData.total_price).toFixed(2)}Tk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder
