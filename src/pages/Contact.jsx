import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-4xl font-serif font-bold text-darkText">Get In Touch</h1>
        <p className="text-mutedText text-sm">Have a custom jewellery request or a question? Our concierge team is here to assist you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="bg-lightPink p-8 rounded-2xl border border-borderPink space-y-8 h-fit">
          <h3 className="font-serif text-2xl font-semibold text-darkText">Contact Information</h3>
          
          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primaryPink border border-borderPink">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-mutedText text-xs">Our Flagship Store</p>
                <p className="font-medium text-darkText">Gulberg 3, Lahore, Pakistan</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primaryPink border border-borderPink">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-mutedText text-xs">Phone Support</p>
                <p className="font-medium text-darkText">+92 (315) 749-9702</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primaryPink border border-borderPink">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-mutedText text-xs">Email Address</p>
                <p className="font-medium text-darkText">support@aurajewels.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-borderPink space-y-6">
          <h3 className="font-serif text-2xl font-semibold text-darkText">Send Us a Message</h3>

          <div>
            <label className="block text-xs font-medium text-mutedText mb-1">Your Name *</label>
            <input 
              type="text" 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-mutedText mb-1">Email Address *</label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-mutedText mb-1">Your Message *</label>
            <textarea 
              rows="4" 
              required 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="input-field text-sm resize-none"
            ></textarea>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>

      </div>

    </div>
  );
}