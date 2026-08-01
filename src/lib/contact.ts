export const WHATSAPP_LINK = "https://wa.me/message/COZ2AH3VA247K1";

export const WHATSAPP_NUMBER = "5551982005140";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function normalizePhoneForWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length <= 11 ? `55${digits}` : digits;
}

export function buildLeadWhatsAppLink(name: string, phone: string) {
  const message = `Olá ${name}! Aqui é da Dra. Alessandra Machado, vi que você preencheu nosso quiz de nutrição e gostaria de conversar sobre o seu resultado.`;
  return `https://wa.me/${normalizePhoneForWhatsApp(phone)}?text=${encodeURIComponent(message)}`;
}

export const INSTAGRAM_HANDLE = "nutrialessandramachado";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const CRN_LABEL = "CRN2-13456D · CRN10-0204S";
