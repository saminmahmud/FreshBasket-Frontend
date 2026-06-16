import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tracking = () => {
	const [searchTrack, setSearchTrack] = useState("");
  const navigate = useNavigate();


	const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTrack.trim()) return;

    navigate(
      `/track/order?tracking_id=${encodeURIComponent(searchTrack)}`
    );
  };

	return (
      <div className="">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-block px-4 py-2 bg-[#74c69d]/20 text-[#1a4731] rounded-full text-xs sm:text-sm font-bold">
              ✓ Order Tracking
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Track Your Fresh Groceries
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md">
              Enter your tracking ID to see the status of your order.
            </p>
          </div>

          {/* ── TRACKING FORM ── */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 pt-4 w-full md:w-1/2 mx-auto"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tracking ID
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <path d="M12 8v-2m0 16v-2m8-4h2m-16 0H2" />
                  <path d="M4.22 4.22l1.414 1.414m10.728 10.728l1.414 1.414M4.22 19.78l1.414-1.414m10.728-10.728l1.414-1.414" />
                </svg>
                <input
                  type="text"
                  value={searchTrack}
                  onChange={(e) =>
                    setSearchTrack(e.target.value)
                  }
                  required
                  placeholder="e.g., FB-2024-123456"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 bg-white text-sm font-medium outline-none transition-all focus:border-[#1a4731] focus:ring-2 focus:ring-[#1a4731]/10 hover:border-gray-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#1a4731] to-[#2d6a4f] hover:from-[#0d3320] hover:to-[#1a4731] active:scale-[0.98] text-white font-bold text-sm transition-all disabled:opacity-60 shadow-lg shadow-[#1a4731]/25"
            >
              <span>Track Order</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
	);
};

export default Tracking;
