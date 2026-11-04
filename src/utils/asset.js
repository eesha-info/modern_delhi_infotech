// Resolves a file in /public against the site's base path, so images work both at
// the domain root (dev, Vercel/Netlify) and under a sub-path (GitHub Pages: /modern_delhi_infotech/).
export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;
