import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { Heart, Eye } from "lucide-react";

export default function ProductCard({ product }) {
  // Discount calculate
  const hasDiscount =
    product.oldPrice && product.oldPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  return (
    <div className="group bg-white rounded-xl border border-borderPink overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">

      {/* ================= IMAGE ================= */}
      <div className="relative aspect-square bg-lightPink overflow-hidden">

        <img
          src={
            product.imageUrl ||
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
          }
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* ================= DISCOUNT BADGE ================= */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-primaryPink text-white text-xs px-2.5 py-1 rounded-full font-medium">
            -{discountPercent}%
          </span>
        )}

        {/* ================= WISHLIST BUTTON ================= */}
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-darkText hover:text-primaryPink hover:bg-white transition-colors"
          aria-label="Wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* ================= VIEW PRODUCT BUTTON ================= */}
        <div
          className="
            absolute
            inset-x-0
            bottom-3
            flex
            justify-center
            px-3

            /* Mobile: Always visible */
            opacity-100

            /* Desktop: Show only on hover */
            md:opacity-100
            md:group-hover:opacity-100

            transition-opacity
            duration-300
          "
        >
          <Link
            to={`/product/${product.id}`}
            className="
              w-full
              bg-white/95
              backdrop-blur-sm
              text-darkText
              hover:bg-primaryPink
              hover:text-white
              py-2.5
              rounded-md
              text-xs
              sm:text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-1.5
              transition-colors
              shadow-sm
            "
          >
            <Eye className="w-4 h-4" />
            View Product
          </Link>
        </div>
      </div>

      {/* ================= PRODUCT CONTENT ================= */}
      <div className="p-4 flex flex-col flex-grow justify-between">

        {/* Category + Name */}
        <div>
          <span className="text-xs text-mutedText uppercase tracking-wider">
            {product.categoryName || "Jewellery"}
          </span>

          <h3
            className="
              font-serif
              font-medium
              text-darkText
              mt-1
              text-base
              line-clamp-1
              group-hover:text-primaryPink
              transition-colors
            "
          >
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">

            <span className="font-bold text-darkText">
              {formatPrice(product.price)}
            </span>

            {hasDiscount && (
              <span className="text-sm text-mutedText line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}