import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div>
      <footer className="bg-green-950 text-white pt-12 pb-6 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
 
      {/* <!-- Brand col --> */}
      <div className="col-span-2 sm:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-green-800 rounded-xl flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <span className="font-extrabold text-lg">FreshBasket</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Bringing fresh, organic groceries straight from local farms to your doorstep. Nourish your home with Earth's finest.
        </p>
        <div className="flex items-center gap-3">
          <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
          </a>
          <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
      </div>
 
      {/* <!-- Quick Links --> */}
      <div>
        <h4 className="font-bold text-xs mb-4 uppercase tracking-widest text-gray-300">Quick Links</h4>
        <ul className="space-y-2.5">
          <li><a href="#products" className="text-gray-400 text-sm hover:text-white transition-colors">All Products</a></li>
          <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Flash Deals</a></li>
          <li><Link to="/track-order" className="text-gray-400 text-sm hover:text-white transition-colors">Track Order</Link></li>
          <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Delivery Partner</a></li>
        </ul>
      </div>
 
      {/* <!-- Customer Service --> */}
      <div>
        <h4 className="font-bold text-xs mb-4 uppercase tracking-widest text-gray-300">Customer Service</h4>
        <ul className="space-y-2.5">
          <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">My Account</a></li>
          <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Order History</a></li>
          <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Addresses</a></li>
          <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Help Center</a></li>
        </ul>
      </div>
 
      {/* <!-- Contact --> */}
      <div>
        <h4 className="font-bold text-xs mb-4 uppercase tracking-widest text-gray-300">Contact Us</h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-gray-400 text-sm">
            <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            123 Green Valley Rd, Portland
          </li>
          <li className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            +1 (111) 123-4567
          </li>
          <li className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hello@freshbasket.com
          </li>
        </ul>
      </div>
 
    </div>
    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-xs">
      <p>© 2026 FreshBasket. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
