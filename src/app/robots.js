export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://marsflix-bd.vercel.app/sitemap.xml",
  };
}
