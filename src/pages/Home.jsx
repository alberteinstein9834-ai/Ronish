import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../firebase/products";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Products aur automatically categories fetch karne ka ek hi saaf suthra useEffect
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);

        // Products ke andar se unique categories automatically nikal lo
        const uniqueCategories = [...new Set(fetchedProducts.map(p => p.categoryName || p.categoryId).filter(Boolean))];
        
        // Unhe format karke state mein set kar dein
        const formattedCategories = uniqueCategories.map((cat, index) => ({
          id: index,
          name: cat,
          imageUrl: fetchedProducts.find(p => (p.categoryName || p.categoryId) === cat)?.imageUrl || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Featured products filter karein
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  return (
    <div className="space-y-10 pb-5">
      
      {/* Hero Section */}
      <section className="relative bg-lightPink py-8 lg:py-12 overflow-hidden border-b border-borderPink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-borderPink text-primaryPink text-xs font-semibold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> New Collection 2026
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-darkText leading-tight">
                Discover Your Perfect Sparkle
              </h1>
              <p className="text-mutedText text-base sm:text-lg leading-relaxed max-w-xl">
                Elegant jewelry crafted to make every moment special and unforgettable. 
                Designed for the modern queen.
                Step into a world of timeless sophistication and premium artistry. 
                Our collections are created for the woman who leads with grace and inspires with her presence. 
                Discover masterfully crafted pieces that capture the light, turn heads, and turn every ordinary day into an extraordinary occasion.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/shop" className="btn-primary flex items-center gap-2">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/shop" className="btn-outline">
                  Explore Collection
                </Link>
              </div>
            </div>

            {/* Right Side: Stylish Jewellery Image Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800" 
                  alt="Aura Jewels Luxury Collection" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-darkText">Featured Sparkles</h2>
            <p className="text-mutedText text-sm mt-1">Handpicked masterpieces adored by our most loved customers.</p>
          </div>
          <Link to="/shop" className="text-primaryPink font-medium text-sm hover:underline flex items-center gap-1">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : featuredProducts.length === 0 ? (
          <p className="text-center text-mutedText text-sm py-10">No featured products found. Mark some products as featured in admin panel.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Shop By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-serif font-bold text-darkText">Shop By Category</h2>
          <p className="text-mutedText text-sm">Explore our exquisite categories designed for every occasion.</p>
        </div>

        {loading ? (
          <Loader />
        ) : categories.length === 0 ? (
          <p className="text-center text-mutedText text-sm">No categories found in database yet. Add products with categories from Admin panel.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/shop`}
                className="group bg-lightPink border border-borderPink rounded-xl p-4 text-center hover:shadow-md transition-all flex flex-col items-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 bg-white border border-borderPink">
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-medium text-darkText text-sm sm:text-base group-hover:text-primaryPink transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}