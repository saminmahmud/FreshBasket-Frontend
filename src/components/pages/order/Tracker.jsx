import React from 'react'

const STATUS_CONFIG = {
  pending: {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    dot: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-700",
  },

  confirmed: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },

  delivered: {
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-500",
    badge: "bg-green-100 text-green-700",
  },
};

const STATUS_STEPS = {
  pending: 0,
  confirmed: 1,
  delivered: 2,
};

const Tracker = ({ status }) => {
  const steps = ["Order Placed", "Out for Delivery", "Delivered"];
  const cfg = STATUS_CONFIG[status];
  const currentIndex = STATUS_STEPS[status?.toLowerCase()] ?? 0;

  return (
    <div className="flex items-center gap-0">
      {steps.map((s, i) => {
        const active = i <= currentIndex;
        return (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
              active
                ? "bg-[#1a4731] border-[#1a4731]"
                : "bg-white border-gray-200"
            }`}>
              {active ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-300"/>
              )}
            </div>
            <span className={`text-[10px] font-semibold mt-1 whitespace-nowrap ${active ? "text-[#1a4731]" : "text-gray-400"}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 mb-4 rounded-full transition-all ${active ? "bg-[#1a4731]" : "bg-gray-200"}`}/>
          )}
        </div>
        )
        })}
    </div>
  );
}

export default Tracker
