import { logWhatsAppEnquiry } from './api.js';

const DEFAULT_PHONE = '919730672323';

/**
 * Generates dynamic WhatsApp click URL and logs the lead into the database
 */
export async function openWhatsAppEnquiry({
  product = null,
  customText = '',
  variant = '',
  packaging = '',
  quantity = 1,
  customerName = '',
  customerPhone = '',
  type = 'retail',
  note = '',
}) {
  let message = '';

  const isBulk = Number(quantity) >= 20 || type === 'bulk_corporate';

  if (isBulk || type === 'bulk_corporate') {
    message = `👑 *MAD BESPOKE — BULK & CORPORATE GIFTING ORDER*
━━━━━━━━━━━━━━━━━━━━
Hi Mad Bespoke Team! I want to place a bulk order for:

🛍️ *Product:* ${product ? product.name : 'Bespoke Curated Hamper / Gift Sets'}
🔢 *Quantity:* ${quantity} Units (Bulk Pricing Requested)
👤 *Customer Name:* ${customerName || 'Bespoke Client'}
📱 *Phone:* ${customerPhone || 'Shared via WhatsApp'}
✨ *Custom Engraving / Design:* ${customText ? `"${customText}"` : 'Logo & Name Engraving'}
🎨 *Variant / Finish:* ${variant || 'Standard'}
🎁 *Packaging:* ${packaging || 'Presentation Box'}
${note ? `📝 *Note:* ${note}\n` : ''}
💬 *Contact Info:* Insta: @mad-bespoke | Call/WhatsApp: 9730672323
Please share the best bulk rates and digital draft mockup!`;
  } else if (product) {
    message = `✨ *MAD BESPOKE — ORDER & CUSTOMISATION*
━━━━━━━━━━━━━━━━━━━━
Hi! I want to order this bespoke piece:

🏷️ *Product:* ${product.name}
💰 *Rate:* ₹${product.price} Per unit (MRP: ₹${product.mrp || product.price})
🔢 *Quantity:* ${quantity} piece(s)
👤 *Customer Name:* ${customerName || 'Bespoke Client'}
📱 *Contact:* ${customerPhone || 'Shared via WhatsApp'}
✍️ *Customisation / Name:* ${customText ? `"${customText}"` : 'To be confirmed'}
🎨 *Color / Variant:* ${variant || 'Standard'}
📦 *Packaging:* ${packaging || product.packaging || 'Standard Paper Box'}
${note ? `📝 *Special Request:* ${note}\n` : ''}
💬 *Contact Info:* Insta: @mad-bespoke | 9730672323
Please confirm availability and dispatch timeline. Thank you!`;
  } else {
    message = `✨ *MAD BESPOKE — BESPOKE INQUIRY*
━━━━━━━━━━━━━━━━━━━━
Hi Mad Bespoke Team!
👤 *Name:* ${customerName || 'Customer'}
📱 *Phone:* ${customerPhone || 'N/A'}
I want to order custom personalized gifts. Please share your catalog and bulk rates!`;
  }

  // Log lead to database asynchronously
  logWhatsAppEnquiry({
    product_id: product ? product.id : null,
    product_name: product ? product.name : (type === 'bulk_corporate' ? 'Corporate Bulk Inquiry' : 'General Bespoke Inquiry'),
    customer_name: customerName || 'WhatsApp Customer',
    phone: customerPhone || '',
    customisation_note: `Name: ${customerName} | Phone: ${customerPhone} | Custom: "${customText}" | Variant: ${variant} | Packaging: ${packaging} | Qty: ${quantity}`,
    quantity: Number(quantity) || 1,
    type: isBulk ? 'bulk_corporate' : 'retail',
  }).catch((e) => console.warn('Lead log error:', e));

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${DEFAULT_PHONE}?text=${encoded}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}
