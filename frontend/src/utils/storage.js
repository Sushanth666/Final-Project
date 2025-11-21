
// small helpers for localStorage
export const saveJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadJSON = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    
    // --- SAFETY CHECK ---
    // If the raw value is null OR the string "undefined", return the fallback
    if (!raw || raw === 'undefined') {
      return fallback;
    }
    // --- END OF CHECK ---

    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};