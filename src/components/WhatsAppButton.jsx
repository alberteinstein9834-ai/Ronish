import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  // Yahan apna WhatsApp number likhein (Country code ke sath, baghair + sign ke, e.g., 923XXXXXXXXX)
  const whatsappNumber = "923157499702"; // <--- Apna WhatsApp number yahan likhein!
  const defaultMessage = "Hello Aura Jewels! I have a query regarding your jewellery collection.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      
      {/* Tooltip text jo hover karne par show hoga */}
      <span className="absolute right-14 bg-white text-darkText text-xs font-medium px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-borderPink">
        Chat with Us
      </span>
    </a>
  );
}