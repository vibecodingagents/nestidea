import { notFound } from "next/navigation";
import Link from "next/link";
import { getCity } from "@/lib/cities";
import { getCategory, CATEGORIES } from "@/lib/catalog";
import Header from "@/components/Header";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }) {
  const city = getCity(params.city);
  const category = getCategory(params.category);
  if (!city || !category) notFound();

  return (
    <main>
      <Header city={city} />

      <section className="max-w-content mx-auto px-6 pt-16 pb-8">
        <Link href={`/${city.slug}`} className="text-sm text-ink/50 hover:text-brand">
          {city.name}
        </Link>
        <h1 className="font-display text-4xl mt-3">{category.name}</h1>
        <p className="mt-3 text-ink/70 max-w-lg">{category.blurb}</p>
      </section>

      <section className="max-w-content mx-auto px-6 pb-24">
        <div className="border-t border-ink/10">
          {category.services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/${city.slug}/${category.slug}/${svc.slug}`}
              className="flex items-center justify-between py-5 border-b border-ink/10 hover:bg-paper/60 -mx-2 px-2 transition-colors"
            >
              <div>
                <p className="font-display text-lg">{svc.name}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-ink/50">
                  <span>{svc.duration}</span>
                  <span>{svc.rating} rating</span>
                </div>
              </div>
              <p className="font-display text-lg">₹{svc.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
