import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../firebase/products";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import Loader from "../components/Loader";
import { ShoppingBag, Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        if (data) {
          setProduct(data);
          setSelectedImage(data.imageUrl || (data.images && data.images[0]));
        }
      } catch (error) {
        console.error("Error loading product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-darkText">Product Not Found</h2>
        <p className="text-mutedText text-sm">The jewellery piece you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="btn-primary inline-block text-sm">Back to Shop</Link>
      </div>
    );
  }

  // All images array check
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-mutedText hover:text-primaryPink transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Images Column */}
        <div className="space-y-4">
          <div className="aspect-square bg-lightPink rounded-xl border border-borderPink overflow-hidden">
            <img 
              src={selectedImage || product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 ${selectedImage === img ? 'border-primaryPink' : 'border-borderPink'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="space-y-6">
          <div>
            <span className="text-xs text-mutedText uppercase tracking-wider">{product.categoryName || "Jewellery"}</span>
            <h1 className="text-3xl font-serif font-bold text-darkText mt-1">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
            <span className="text-xs text-mutedText ml-2">(4.9 / 58 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-darkText">{formatPrice(product.price)}</span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-lg text-mutedText line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-mutedText text-sm leading-relaxed border-t border-b border-borderPink py-4">
            {product.description || "No description provided for this exquisite jewellery item."}
          </p>

          {/* Stock Status */}
          <div className="text-sm font-medium">
            Status: <span className={product.stock > 0 ? "text-emerald-600" : "text-rose-500"}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-borderPink rounded-md">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-darkText hover:bg-lightPink transition-colors"
              >-</button>
              <span className="px-4 py-2 font-medium text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 text-darkText hover:bg-lightPink transition-colors"
              >+</button>
            </div>

            <button 
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock <= 0}
              className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" /> Add To Cart
            </button>
          </div>

          {/* Extra features */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-borderPink text-xs text-mutedText">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primaryPink" /> Free shipping on orders over $150
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primaryPink" /> 100% Certified Genuine Gemstones
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}