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
  type = 'retail',
  note = '',
}) {
  let message = '';

  if (type === 'bulk_corporate') {
    message = `👑 *MAD BESPOKE — CORPORATE & BULK GIFTING INQUIRY*
━━━━━━━━━━━━━━━━━━━━
Hi Mad Bespoke Team! I would like to request a bulk quote for bespoke gifting.

📋 *Requirement Details:*
• *Event / Company:* ${customerName || 'Corporate Inquiry'}
• *Product / Item:* ${product ? product.name : 'Bespoke Curated Hamper / Gift Sets'}
• *Estimated Quantity:* ${quantity || '50+ units'}
• *Customisation Required:* ${customText || 'Company Logo & Name Engraving'}
• *Additional Notes:* ${note || 'Please share catalog & tiered bulk pricing'}

Please share your best bulk rates and sample timelines. Thank you!`;
  } else if (product) {
    message = `✨ *MAD BESPOKE — PRODUCT ORDER ENQUIRY*
━━━━━━━━━━━━━━━━━━━━
Hi! I want to order this bespoke piece:

🏷️ *Product:* ${product.name}
💰 *Price:* ₹${product.price} (MRP: ₹${product.mrp || product.price})
✍️ *Customisation / Name:* ${customText ? `"${customText}"` : 'To be confirmed'}
🎨 *Color / Variant:* ${variant || 'Standard'}
📦 *Packaging:* ${packaging || product.packaging || 'Standard'}
🔢 *Quantity:* ${quantity} piece(s)

${note ? `📝 *Note:* ${note}\n` : ''}
Please confirm availability and dispatch time. Thank you!`;
  } else {
    message = `✨ *MAD BESPOKE — BESPOKE GIFTING INQUIRY*
━━━━━━━━━━━━━━━━━━━━
Hi Mad Bespoke! I am looking for a custom personalized gift. Please share your catalog and latest collection details!`;
  }

  // Log lead to database asynchronously
  logWhatsAppEnquiry({
    product_id: product ? product.id : null,
    product_name: product ? product.name : (type === 'bulk_corporate' ? 'Corporate Bulk Inquiry' : 'General Bespoke Inquiry'),
    customer_name: customerName || 'WhatsApp Customer',
    customisation_note: `Custom: "${customText}" | Variant: ${variant} | Qty: ${quantity}`,
    quantity: Number(quantity) || 1,
    type,
  }).catch((e) => console.warn('Lead log error:', e));

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${DEFAULT_PHONE}?text=${encoded}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}
