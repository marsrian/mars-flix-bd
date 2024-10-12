export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://marsflixbd.vercel.app/sitemap.xml",
  };
}
