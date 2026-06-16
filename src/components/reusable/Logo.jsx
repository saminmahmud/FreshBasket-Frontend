import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5">
    <div className="w-9 h-9 bg-[#1a4731] rounded-xl flex items-center justify-center shadow-md">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    </div>
    <span className="font-extrabold text-xl text-[#1a4731] tracking-tight">FreshBasket</span>
  </Link>
  )
}

export default Logo