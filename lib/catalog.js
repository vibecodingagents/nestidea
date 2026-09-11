export const CATEGORIES = [
  {
    slug: "cleaning",
    name: "Cleaning & Pest Control",
    blurb: "Deep cleans, regular upkeep, and pest treatments.",
    services: [
      { slug: "full-home-cleaning", name: "Full home cleaning", price: 1098, duration: "3-4 hrs", rating: 4.8 },
      { slug: "bathroom-deep-clean", name: "Bathroom deep clean", price: 458, duration: "45-60 min", rating: 4.79 },
      { slug: "cockroach-control", name: "Cockroach control", price: 799, duration: "45 min", rating: 4.75 },
    ],
  },
  {
    slug: "repairs",
    name: "Electrician, Plumber & Carpenter",
    blurb: "Fixes and installs, from a leaking tap to a new shelf.",
    services: [
      { slug: "plumber-visit", name: "Plumber consultation", price: 49, duration: "Instant", rating: 4.74 },
      { slug: "electrician-visit", name: "Electrician consultation", price: 49, duration: "Instant", rating: 4.75 },
      { slug: "shelf-installation", name: "Shelf installation", price: 149, duration: "30 min", rating: 4.8 },
    ],
  },
  {
    slug: "appliance-repair",
    name: "AC & Appliance Repair",
    blurb: "Service and repair for the machines that keep a home running.",
    services: [
      { slug: "ac-service", name: "AC foam-jet service", price: 649, duration: "45 min", rating: 4.75 },
      { slug: "geyser-service", name: "Geyser service", price: 599, duration: "40 min", rating: 4.76 },
      { slug: "washing-machine-install", name: "Washing machine installation", price: 399, duration: "40 min", rating: 4.8 },
    ],
  },
  {
    slug: "salon-women",
    name: "Women's Salon & Spa",
    blurb: "Salon-grade services from a professional, at home.",
    services: [
      { slug: "pedicure", name: "Crystal rose pedicure", price: 859, duration: "60 min", rating: 4.83 },
      { slug: "waxing-full", name: "Full arms, legs & underarms waxing", price: 1099, duration: "75 min", rating: 4.86 },
      { slug: "cleanup", name: "Power glow cleanup", price: 699, duration: "50 min", rating: 4.86 },
    ],
  },
];

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getService(categorySlug, serviceSlug) {
  const category = getCategory(categorySlug);
  if (!category) return null;
  const service = category.services.find((s) => s.slug === serviceSlug);
  return service ? { ...service, category } : null;
}
