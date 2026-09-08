import { Link } from "react-router-dom";
import { Gem, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-lightPink border-t border-borderPink pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gem className="w-7 h-7 text-primaryPink" />
              <span className="font-serif text-xl font-bold tracking-wider text-darkText">
                RONISH <span className="text-primaryPink font-light">JEWELS</span>
              </span>
            </div>
            <p className="text-mutedText text-sm leading-relaxed">
              Elegant jewellery crafted with precision and passion to make every moment of your life special and unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-darkText mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-mutedText hover:text-primaryPink transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-mutedText hover:text-primaryPink transition-colors">Shop Collection</Link></li>
              <li><Link to="/about" className="text-mutedText hover:text-primaryPink transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-mutedText hover:text-primaryPink transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-darkText mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-mutedText">Shipping Policy</span></li>
              <li><span className="text-mutedText">Returns & Exchange</span></li>
              <li><span className="text-mutedText">Privacy Policy</span></li>
              <li><span className="text-mutedText">Terms & Conditions</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-darkText mb-4">Stay Connected</h4>
            <p className="text-mutedText text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input-field rounded-r-none text-sm"
              />
              <button className="bg-primaryPink text-white px-4 rounded-r-md hover:bg-[#d68a9f] transition-colors text-sm font-medium">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-borderPink pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-mutedText">
          <p>© {new Date().getFullYear()} Ronish Jewels. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 text-primaryPink fill-primaryPink" /> for Elegance
          </p>
        </div>
      </div>
    </footer>
  );
}