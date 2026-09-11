export const CITIES = [
  { slug: "bangalore", name: "Bangalore", state: "Karnataka" },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { slug: "delhi-ncr", name: "Delhi NCR", state: "Delhi" },
  { slug: "pune", name: "Pune", state: "Maharashtra" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu" },
];

export function getCity(slug) {
  return CITIES.find((c) => c.slug === slug);
}
