// API client with seamless fallback

const API_BASE = '/api';

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.categories || [];
  } catch (err) {
    console.warn('[API Client] Using fallback categories', err);
    return [];
  }
}

export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);
    if (params.bestseller) query.append('bestseller', 'true');
    if (params.featured) query.append('featured', 'true');

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.warn('[API Client] Using fallback products', err);
    return [];
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const data = await res.json();
    return data.product;
  } catch (err) {
    console.error('[API Client] Error fetching product details:', err);
    return null;
  }
}

export async function logWhatsAppEnquiry(payload) {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.warn('[API Client] Error logging enquiry:', err);
    return { success: false };
  }
}

export async function fetchSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    const data = await res.json();
    return data.settings || {};
  } catch (err) {
    return {
      whatsapp_number: '919730672323',
      instagram_handle: 'mad-bespoke',
      contact_phone: '+91 9730672323',
    };
  }
}
