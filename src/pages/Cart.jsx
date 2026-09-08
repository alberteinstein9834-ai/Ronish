import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-lightPink rounded-full flex items-center justify-center mx-auto text-primaryPink">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-darkText">Your Cart is Empty</h2>
        <p className="text-mutedText text-sm max-w-sm mx-auto">Looks like you haven't added any sparkles to your shopping bag yet.</p>
        <Link to="/shop" className="btn-primary inline-block text-sm">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-borderPink pb-6 flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-darkText">Shopping Bag</h1>
        <button onClick={clearCart} className="text-xs text-rose-500 hover:underline">Clear Bag</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white border border-borderPink rounded-xl items-center">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-20 h-20 object-cover rounded-lg bg-lightPink flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-medium text-darkText truncate">{item.name}</h3>
                <p className="text-sm font-bold text-darkText mt-1">{formatPrice(item.price)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center border border-borderPink rounded-md">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2.5 py-1 text-xs hover:bg-lightPink"
                >-</button>
                <span className="px-3 text-xs font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2.5 py-1 text-xs hover:bg-lightPink"
                >+</button>
              </div>

              {/* Item Total */}
              <div className="text-right hidden sm:block">
                <p className="text-xs text-mutedText">Total</p>
                <p className="font-bold text-sm text-darkText">{formatPrice(item.price * item.quantity)}</p>
              </div>

              {/* Remove button */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-mutedText hover:text-rose-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="bg-lightPink p-6 rounded-xl border border-borderPink h-fit space-y-6">
          <h3 className="font-serif text-lg font-semibold text-darkText border-b border-borderPink pb-3">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-mutedText">
              <span>Subtotal</span>
              <span className="font-medium text-darkText">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-mutedText">
              <span>Shipping (COD)</span>
              <span className="font-medium text-emerald-600">Free</span>
            </div>
            <div className="border-t border-borderPink pt-3 flex justify-between font-bold text-base text-darkText">
              <span>Total Amount</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 text-center text-sm">
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}