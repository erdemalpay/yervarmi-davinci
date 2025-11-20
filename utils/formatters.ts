export const formatPhoneNumber = (phone?: string) => {
  if (!phone) return "";
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  // Format as 0XXX XXX XX XX
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
  }
  return phone; // Return original if format doesn't match
};
