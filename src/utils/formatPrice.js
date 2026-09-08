export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return "Rs. 0";
  
  // Number ko Pakistani currency format (e.g., Rs. 1,230) mein badalna
  return `Rs. ${Number(price).toLocaleString('en-PK')}`;
};