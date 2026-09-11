import { notFound } from "next/navigation";
import Link from "next/link";
import { getCity } from "@/lib/cities";
import { getService } from "@/lib/catalog";
import Header from "@/components/Header";

export default function ServiceDetailPage({ params }) {
  const city = getCity(params.city);
  const service = getService(params.category, params.service);
  if (!city || !service) notFound();
  const category = service.category;

  return (
    <main>
      <Header city={city} />

      <section className="max-w-content mx-auto px-6 pt-16 pb-24">
        <div className="flex flex-wrap gap-x-2 text-sm text-ink/50">
          <Link href={`/${city.slug}`} className="hover:text-brand">
            {city.name}
          </Link>
          <span>/</span>
          <Link href={`/${city.slug}/${category.slug}`} className="hover:text-brand">
            {category.name}
          </Link>
        </div>

        <div className="mt-6 grid md:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <h1 className="font-display text-4xl">{service.name}</h1>
            <div className="mt-4 flex items-center gap-6 text-sm text-ink/60">
              <span>{service.duration}</span>
              <span>{service.rating} rating</span>
            </div>
            <p className="mt-6 text-ink/70 max-w-md">
              A professional arrives with their own equipment, confirms the
              scope with you on the spot, and completes the job the same
              visit. You&rsquo;ll get their name and photo before they
              arrive.
            </p>

            <div className="mt-10 border-t border-ink/10 pt-6">
              <h2 className="font-display text-lg mb-4">What&rsquo;s included</h2>
              <ul className="space-y-2 text-ink/70 text-sm">
                <li>Professional verified and background-checked</li>
                <li>Standard tools and consumables included</li>
                <li>7-day service guarantee</li>
              </ul>
            </div>
          </div>

          <aside className="bg-paper border border-ink/10 p-6 h-fit">
            <p className="text-sm text-ink/50">Starting at</p>
            <p className="font-display text-3xl mt-1">₹{service.price}</p>
            <Link
              href={`/${city.slug}/${category.slug}/${service.slug}/book`}
              className="mt-6 block text-center bg-brand text-white py-3 hover:bg-brand-dark transition-colors"
            >
              Check availability
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
