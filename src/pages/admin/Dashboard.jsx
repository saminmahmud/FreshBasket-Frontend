import React from 'react'
import { useState } from "react";


// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Orders",   value: 335, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
  { label: "Total Users",    value: 680, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { label: "Total Products", value: 25,  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
  { label: "Out of Stock",   value: 2,   icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
];

const ORDERS = [
  { id:"#ORD-1091", customer:"Arif H.",     items:3, total:142.50, status:"Delivered",        date:"Jun 9, 2026" },
  { id:"#ORD-1090", customer:"Priya K.",    items:1, total:30.00,  status:"Out for Delivery", date:"Jun 9, 2026" },
  { id:"#ORD-1089", customer:"Meera D.",    items:5, total:310.00, status:"Placed",           date:"Jun 8, 2026" },
  { id:"#ORD-1088", customer:"Karan P.",    items:2, total:87.00,  status:"Delivered",        date:"Jun 8, 2026" },
  { id:"#ORD-1087", customer:"Ananya S.",   items:4, total:215.00, status:"Cancelled",        date:"Jun 7, 2026" },
  { id:"#ORD-1086", customer:"John D.",     items:2, total:61.99,  status:"Out for Delivery", date:"Jun 7, 2026" },
  { id:"#ORD-1085", customer:"Riya M.",     items:1, total:55.00,  status:"Placed",           date:"Jun 7, 2026" },
];

const PRODUCTS = [
  { id:1, name:"Organic Bananas",   category:"Vegetables", price:2.50,  stock:145, status:"In Stock" },
  { id:2, name:"Basmati Rice 5kg",  category:"Pantry",     price:52.00, stock:38,  status:"In Stock" },
  { id:3, name:"Knorr Cup Soup",    category:"Pantry",     price:3.00,  stock:0,   status:"Out of Stock" },
  { id:4, name:"Fresh Tomatoes",    category:"Vegetables", price:3.00,  stock:210, status:"In Stock" },
  { id:5, name:"Cheddar Cheese",    category:"Dairy",      price:21.00, stock:0,   status:"Out of Stock" },
  { id:6, name:"Lay's Chips 100g",  category:"Snacks",     price:5.50,  stock:80,  status:"In Stock" },
];

const USERS = [
  { id:1, name:"Arif Hossain",  email:"arif@example.com",   orders:12, joined:"Jan 2026", status:"Active" },
  { id:2, name:"Priya Kapoor",  email:"priya@example.com",  orders:5,  joined:"Mar 2026", status:"Active" },
  { id:3, name:"Meera Das",     email:"meera@example.com",  orders:20, joined:"Nov 2025", status:"Active" },
  { id:4, name:"Karan Patel",   email:"karan@example.com",  orders:3,  joined:"Apr 2026", status:"Inactive" },
  { id:5, name:"Ananya Singh",  email:"ananya@example.com", orders:8,  joined:"Feb 2026", status:"Active" },
];

const STATUS_STYLE = {
  "Delivered":        "bg-green-100 text-green-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  "Placed":           "bg-blue-100 text-blue-700",
  "Cancelled":        "bg-red-100 text-red-600",
  "In Stock":         "bg-green-100 text-green-700",
  "Out of Stock":     "bg-red-100 text-red-600",
  "Active":           "bg-green-100 text-green-700",
  "Inactive":         "bg-gray-100 text-gray-500",
};

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const NAV = [
  { key:"dashboard", label:"Dashboard",   icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { key:"add",       label:"Add Product", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
  { key:"products",  label:"Products",    icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
  { key:"orders",    label:"Orders",      icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> },
  { key:"users",     label:"Users",       icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
];

// ── Add Product Modal ─────────────────────────────────────────────────────────
function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name:"", category:"Vegetables", price:"", stock:"", desc:"" });
  const set = (k,v) => setForm(p => ({...p,[k]:v}));
  const submit = () => {
    if (!form.name || !form.price) return;
    onAdd({ ...form, id: Date.now(), status: Number(form.stock) > 0 ? "In Stock" : "Out of Stock" });
    onClose();
  };
  const cats = ["Vegetables","Dairy","Pantry","Snacks","Beverages","Bakery","Meat","Personal","Frozen"];
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
        <div className="p-6 space-y-4">
          {[
            { label:"Product Name", key:"name", placeholder:"e.g. Fresh Tomatoes" },
            { label:"Price ($)",    key:"price", placeholder:"0.00" },
            { label:"Stock Qty",    key:"stock", placeholder:"0" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">{f.label}</label>
              <input type="text" value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all"/>
            </div>
          ))}
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all appearance-none">
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Description</label>
            <textarea value={form.desc} onChange={e => set("desc", e.target.value)} rows={2} placeholder="Short product description..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4731]/15 focus:border-[#1a4731] focus:bg-white transition-all resize-none"/>
          </div>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-all">Cancel</button>
          <button onClick={submit} className="flex-[2] py-3 rounded-2xl bg-[#1a4731] hover:bg-[#0d3320] text-white font-bold text-sm transition-all shadow-lg shadow-[#1a4731]/20">Add Product</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [activePage, setPage]   = useState("dashboard");
  const [sideOpen, setSide]     = useState(false);
  const [showAdd, setShowAdd]   = useState(false);
  const [products, setProducts] = useState(PRODUCTS);
  const [orders]                = useState(ORDERS);
  const [search, setSearch]     = useState("");

  const addProduct = (p) => setProducts(prev => [{ ...p }, ...prev]);
  const delProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const goTo = (key) => { setPage(key); setSide(false); if (key === "add") { setShowAdd(true); setPage("products"); } };

  return (
    <div className="min-h-screen bg-[#f5f0e8]" style={{ fontFamily:"'Inter','DM Sans',sans-serif" }}>

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center gap-4 h-14 max-w-[1400px] mx-auto">
          <button onClick={() => setSide(p => !p)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <a href="/" className="flex items-center gap-1.5 flex-shrink-0 mr-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4731" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="font-extrabold text-[#1a4731] text-lg hidden sm:block">FreshBasket</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            <a href="/" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">Home</a>
            <a href="/products" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">Products</a>
            <a href="#" className="px-3 py-1.5 text-sm font-semibold text-orange-500 rounded-lg">Deals</a>
          </div>
          <div className="flex-1 relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search for groceries..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-orange-50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"/>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="p-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
              </svg>
            </button>
            <div className="flex items-center gap-1 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#1a4731] text-white flex items-center justify-center text-sm font-bold">X</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex max-w-[1400px] mx-auto">

        {/* ── Sidebar overlay (mobile) ── */}
        {sideOpen && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSide(false)}/>}

        {/* ── Sidebar ── */}
        <aside className={`fixed lg:sticky top-14 z-40 lg:z-auto h-[calc(100vh-56px)] w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 flex-shrink-0 ${sideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          {/* Admin Panel header */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a4731" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="font-extrabold text-gray-900 text-base">Admin Panel</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {NAV.map(n => (
              <button key={n.key} onClick={() => goTo(n.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  activePage === n.key && n.key !== "add"
                    ? "bg-[#1a4731] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}>
                <span className={activePage === n.key && n.key !== "add" ? "text-white" : "text-gray-400"}>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>

          <div className="px-3 pb-4">
            <div className="bg-[#f0fdf4] rounded-2xl p-3 text-center">
              <p className="text-xs text-green-700 font-semibold">FreshBasket Admin</p>
              <p className="text-[10px] text-green-500 mt-0.5">v2.4.1</p>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 p-5 sm:p-6 lg:p-8">

          {/* ══ DASHBOARD ══ */}
          {activePage === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
                      <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                    </div>
                    <div className="w-11 h-11 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {s.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="font-extrabold text-gray-900 text-lg">Recent Orders</h2>
                  <button onClick={() => setPage("orders")} className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:underline">
                    View All
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["ORDER ID","CUSTOMER","ITEMS","TOTAL","STATUS","DATE"].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 text-sm font-bold text-gray-900 whitespace-nowrap">{o.id}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">{o.customer}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{o.items}</td>
                          <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">${o.total.toFixed(2)}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom grid */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Low stock */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-base">Low / Out of Stock</h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {products.filter(p => p.stock < 20).map(p => (
                      <div key={p.id} className="flex items-center justify-between px-5 py-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.category}</p>
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[p.status]}`}>{p.stock === 0 ? "Out of Stock" : `${p.stock} left`}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-base mb-4">Quick Actions</h3>
                  {[
                    { label:"Add New Product",    action:() => setShowAdd(true),      color:"bg-[#1a4731] hover:bg-[#0d3320] text-white" },
                    { label:"View All Orders",    action:() => setPage("orders"),     color:"bg-orange-500 hover:bg-orange-600 text-white" },
                    { label:"Manage Products",    action:() => setPage("products"),   color:"bg-blue-500 hover:bg-blue-600 text-white" },
                    { label:"View All Users",     action:() => setPage("users"),      color:"bg-purple-500 hover:bg-purple-600 text-white" },
                  ].map(a => (
                    <button key={a.label} onClick={a.action}
                      className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] ${a.color}`}>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ ORDERS ══ */}
          {activePage === "orders" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">All Orders</h1>
                  <p className="text-gray-400 text-sm mt-0.5">{orders.length} total orders</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["ORDER ID","CUSTOMER","ITEMS","TOTAL","STATUS","DATE","ACTION"].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 text-sm font-bold text-gray-900 whitespace-nowrap">{o.id}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">{o.customer}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{o.items}</td>
                          <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">${o.total.toFixed(2)}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">{o.date}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <button className="text-xs font-bold text-[#1a4731] hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ PRODUCTS ══ */}
          {activePage === "products" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">Products</h1>
                  <p className="text-gray-400 text-sm mt-0.5">{products.length} total products</p>
                </div>
                <button onClick={() => setShowAdd(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1a4731] hover:bg-[#0d3320] text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-[#1a4731]/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Product
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["PRODUCT","CATEGORY","PRICE","STOCK","STATUS","ACTIONS"].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">{p.name}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{p.category}</td>
                          <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 whitespace-nowrap">${p.price.toFixed(2)}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{p.stock}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                              <button onClick={() => delProduct(p.id)} className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ USERS ══ */}
          {activePage === "users" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Users</h1>
                <p className="text-gray-400 text-sm mt-0.5">{USERS.length} registered users</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["USER","EMAIL","ORDERS","JOINED","STATUS","ACTION"].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {USERS.map((u,i) => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#1a4731] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {u.name.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{u.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{u.email}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{u.orders}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">{u.joined}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[u.status]}`}>{u.status}</span>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <button className="text-xs font-bold text-[#1a4731] hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Add Product Modal ── */}
      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} onAdd={addProduct}/>}
    </div>
  );
}

export default Dashboard
