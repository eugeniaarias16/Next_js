export const normalizeImageUrl = (url) => {
    if (url?.startsWith('//')) {
      return `https:${url}`;
    }
    return url || '/placeholder-image.png'; // Imagen predeterminada
  };