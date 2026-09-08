import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Gem } from "lucide-react";
import { useCart } from "../hooks/useCart"; // Yeh hum abhi banayenge ya CartContext se lenge

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Cart item count ke liye (agar CartContext use kar rahe hain)
  const { itemCount } = useCart ? useCart() : { itemCount: 0 };

  

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-borderPink shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Gem className="w-8 h-8 text-primaryPink" />
            <span className="font-serif text-2xl font-bold tracking-wider text-darkText">
              RONISH <span className="text-primaryPink font-light">JEWELS</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-darkText hover:text-primaryPink font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-darkText hover:text-primaryPink font-medium transition-colors">Shop</Link>
            <Link to="/about" className="text-darkText hover:text-primaryPink font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-darkText hover:text-primaryPink font-medium transition-colors">Contact</Link>
          </nav>

          {/* Right Icons (Search, Cart & Mobile Menu Button) */}
          <div className="flex items-center gap-4">
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-darkText hover:text-primaryPink transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primaryPink text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-darkText hover:text-primaryPink"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-lightPink border-b border-borderPink px-4 pt-4 pb-6 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center relative mb-4">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field py-2 pl-4 pr-10 text-sm w-full"
            />
            <button type="submit" className="absolute right-3 text-mutedText hover:text-primaryPink">
              <Search className="w-5 h-5" />
            </button>
          </form>

          <div className="flex flex-col space-y-3 font-medium">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-darkText hover:text-primaryPink py-1">Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="text-darkText hover:text-primaryPink py-1">Shop</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-darkText hover:text-primaryPink py-1">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-darkText hover:text-primaryPink py-1">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}