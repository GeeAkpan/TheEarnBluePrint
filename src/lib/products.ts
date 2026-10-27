export type ProductRow = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  currency: string;
  category: string;
  image_url: string | null;
  seller_name: string;
  seller_whatsapp: string;
};

// Keeps the message consistent wherever a WhatsApp order link is built
// (store grid, product detail page).
export function whatsappOrderLink(product: ProductRow): string {
  const message = `Hi ${product.seller_name}, I'm interested in "${product.name}" (${product.currency} ${Number(product.price).toLocaleString()}) from The Earn Blueprint Store.`;
  return `https://wa.me/${product.seller_whatsapp}?text=${encodeURIComponent(message)}`;
}
