import { Gem, ShieldCheck, HeartHandshake, Sparkles, Award, Clock, Users } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      
      {/* Section 1: Our Heritage / Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-lightPink px-3.5 py-1.5 rounded-full border border-borderPink text-primaryPink text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Our Heritage
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-darkText leading-tight">
            Crafting Timeless Elegance Since 2018
          </h1>
          <p className="text-mutedText text-base leading-relaxed">
            Aura Jewels was born out of a profound passion for exquisite craftsmanship and timeless beauty. Every piece in our collection tells a unique story of sophistication, designed to celebrate life's most precious and unforgettable moments.
          </p>
          <p className="text-mutedText text-base leading-relaxed">
            From ethically sourced gemstones to meticulously polished precious metals, we ensure uncompromised quality that stays brilliant across generations. Our master artisans blend traditional heritage techniques with modern design sensibilities.
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-borderPink">
            <div>
              <h3 className="font-serif text-2xl font-bold text-primaryPink">8+</h3>
              <p className="text-xs text-mutedText mt-1">Years of Trust</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-primaryPink">15k+</h3>
              <p className="text-xs text-mutedText mt-1">Happy Queens</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-primaryPink">100%</h3>
              <p className="text-xs text-mutedText mt-1">Certified Pure</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-lightPink">
          <img 
           src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900"
            alt="Luxury Jewellery Crafting" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Section 2: Vision & Mission */}
      <div className="bg-lightPink rounded-3xl p-8 sm:p-12 border border-borderPink grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-sm border border-borderPink bg-white">
          <img 
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900"
            alt="Artisan at work" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-darkText">Our Vision & Philosophy</h2>
          <p className="text-mutedText text-sm sm:text-base leading-relaxed">
            We believe that fine jewellery should not merely be an accessory, but a reflection of individuality and grace. Our philosophy centers on creating sustainable, ethical, and breathtaking pieces that empower whoever wears them.
          </p>
          <ul className="space-y-3 text-sm text-darkText font-medium">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primaryPink"></span>
              Ethically mined conflict-free diamonds & gemstones.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primaryPink"></span>
              Handcrafted perfection by third-generation master jewelers.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primaryPink"></span>
              Transparent pricing with lifetime polish warranty.
            </li>
          </ul>
        </div>
      </div>

      {/* Section 3: Core Values */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-serif font-bold text-darkText">Why Aura Jewels Stands Apart</h2>
          <p className="text-mutedText text-sm">Built on uncompromising standards of purity, elegance, and customer devotion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-borderPink space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-lightPink rounded-xl flex items-center justify-center text-primaryPink border border-borderPink">
              <Gem className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-darkText">Unmatched Quality</h3>
            <p className="text-mutedText text-sm leading-relaxed">
              Every gemstone is handpicked by master gemologists to ensure maximum brilliance, purity, and absolute clarity.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-borderPink space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-lightPink rounded-xl flex items-center justify-center text-primaryPink border border-borderPink">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-darkText">Certified Authenticity</h3>
            <p className="text-mutedText text-sm leading-relaxed">
              All our precious metals and diamonds are independently verified and come with full certification of international standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-borderPink space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-lightPink rounded-xl flex items-center justify-center text-primaryPink border border-borderPink">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-darkText">Customer First</h3>
            <p className="text-mutedText text-sm leading-relaxed">
              Your satisfaction is our primary reward. We provide dedicated support and secure Cash on Delivery services across Pakistan.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}