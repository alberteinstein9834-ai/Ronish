import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

// ==========================================
// SHOP OWNER WHATSAPP NUMBER
// ==========================================
// Example:
// 03001234567  →  923001234567
//
// Don't use +, spaces or -
const WHATSAPP_NUMBER = "923157499702";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check cart
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Check WhatsApp number
    if (!WHATSAPP_NUMBER) {
      toast.error("WhatsApp number is not configured");
      return;
    }

    setLoading(true);

    try {
      // ==========================================
      // CREATE ORDER ITEMS MESSAGE
      // ==========================================
      const itemsMessage = cartItems
        .map((item) => {
          const itemTotal = item.price * item.quantity;

          return (
            `• ${item.name}\n` +
            `  Quantity: ${item.quantity}\n` +
            `  Price: ${formatPrice(item.price)}\n` +
            `  Subtotal: ${formatPrice(itemTotal)}`
          );
        })
        .join("\n\n");

      // ==========================================
      // CREATE WHATSAPP MESSAGE
      // ==========================================
      const whatsappMessage = `
🛍️ *NEW ORDER - AURA JEWELS*

━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━

Name: ${formData.customerName}
Phone: ${formData.phone}
Email: ${formData.email}

📍 *DELIVERY ADDRESS*
━━━━━━━━━━━━━━━━━━

${formData.address}
${formData.city}
Postal Code: ${formData.postalCode}

🛒 *ORDER ITEMS*
━━━━━━━━━━━━━━━━━━

${itemsMessage}

━━━━━━━━━━━━━━━━━━
💰 *ORDER SUMMARY*
━━━━━━━━━━━━━━━━━━

Total: *${formatPrice(cartTotal)}*

💳 Payment Method: *Cash on Delivery*

━━━━━━━━━━━━━━━━━━

Hello, I would like to place this order.

Thank you! 💎
      `.trim();

      // ==========================================
      // CREATE WHATSAPP URL
      // ==========================================
      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(whatsappMessage);

      // ==========================================
      // CLEAR CART
      // ==========================================
      clearCart();

      // ==========================================
      // OPEN WHATSAPP DIRECTLY
      // ==========================================
      window.open(whatsappUrl, "_blank");

      toast.success("Opening WhatsApp...");

    } catch (error) {
      console.error("WhatsApp error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CHECKOUT PAGE
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* PAGE HEADER */}
      <div className="border-b border-borderPink pb-6">
        <h1 className="text-3xl font-serif font-bold text-darkText">
          Secure Checkout
        </h1>

        <p className="text-mutedText text-sm mt-1">
          Cash on Delivery (COD) Selected
        </p>
      </div>

      {/* CHECKOUT FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >

        {/* ==========================================
            SHIPPING INFORMATION
        ========================================== */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-borderPink">

          <h3 className="font-serif text-lg font-semibold text-darkText">
            Shipping Information
          </h3>

          {/* NAME + PHONE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* NAME */}
            <div>
              <label className="block text-xs font-medium text-mutedText mb-1">
                Full Name *
              </label>

              <input
                type="text"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="input-field text-sm"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-xs font-medium text-mutedText mb-1">
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                className="input-field text-sm"
              />
            </div>

          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-medium text-mutedText mb-1">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="input-field text-sm"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-xs font-medium text-mutedText mb-1">
              Street Address *
            </label>

            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="House number, street, area"
              className="input-field text-sm"
            />
          </div>

          {/* CITY + POSTAL CODE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* CITY */}
            <div>
              <label className="block text-xs font-medium text-mutedText mb-1">
                City *
              </label>

              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="input-field text-sm"
              />
            </div>

            {/* POSTAL CODE */}
            <div>
              <label className="block text-xs font-medium text-mutedText mb-1">
                Postal Code *
              </label>

              <input
                type="text"
                name="postalCode"
                required
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="54000"
                className="input-field text-sm"
              />
            </div>

          </div>

        </div>

        {/* ==========================================
            ORDER SUMMARY
        ========================================== */}
        <div className="bg-lightPink p-6 rounded-xl border border-borderPink h-fit space-y-6">

          <h3 className="font-serif text-lg font-semibold text-darkText border-b border-borderPink pb-3">
            Your Order
          </h3>

          {/* PRODUCTS */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-xs gap-3"
              >

                <span className="text-mutedText truncate max-w-[180px]">
                  {item.name} x {item.quantity}
                </span>

                <span className="font-bold text-darkText whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </span>

              </div>
            ))}

          </div>

          {/* PAYMENT + TOTAL */}
          <div className="border-t border-borderPink pt-3 space-y-2 text-sm">

            <div className="flex justify-between text-mutedText">

              <span>
                Payment Method
              </span>

              <span className="font-medium text-darkText">
                Cash on Delivery
              </span>

            </div>

            <div className="flex justify-between font-bold text-base text-darkText pt-2 border-t border-borderPink">

              <span>
                Total
              </span>

              <span>
                {formatPrice(cartTotal)}
              </span>

            </div>

          </div>

          {/* WHATSAPP ORDER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Opening WhatsApp..."
              : "Order on WhatsApp"}
          </button>

          {/* SECURITY */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-mutedText pt-2">

            <ShieldCheck className="w-4 h-4 text-primaryPink" />

            Safe & Secure Transactions

          </div>

        </div>

      </form>

    </div>
  );
}