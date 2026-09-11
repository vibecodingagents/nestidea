import { notFound } from "next/navigation";
import Link from "next/link";
import { getCity, CITIES } from "@/lib/cities";
import { CATEGORIES } from "@/lib/catalog";
import Header from "@/components/Header";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export default function CityPage({ params }) {
  const city = getCity(params.city);
  if (!city) notFound();

  return (
    <main>
      <Header city={city} />

      <section className="max-w-content mx-auto px-6 pt-16 pb-10">
        <h1 className="font-display text-4xl md:text-5xl max-w-xl">
          Home services in {city.name}
        </h1>
        <p className="mt-4 text-ink/70 max-w-lg">
          Vetted professionals, upfront pricing, booked for a time that suits
          you.
        </p>
      </section>

      <section className="max-w-content mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${city.slug}/${cat.slug}`}
              className="bg-mist hover:bg-paper transition-colors p-8 flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <h2 className="font-display text-2xl">{cat.name}</h2>
                <p className="mt-2 text-ink/60 text-sm max-w-xs">
                  {cat.blurb}
                </p>
              </div>
              <span className="mt-6 text-sm text-brand">
                {cat.services.length} services
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
