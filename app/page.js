import Link from "next/link";
import Image from "next/image";
import { CITIES } from "@/lib/cities";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="max-w-content mx-auto w-full px-6 pt-24 pb-16">
        <div className="flex items-center gap-2.5 mb-8">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-[7px]" />
          <span className="font-display text-lg">NestIdea</span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] max-w-2xl">
          Home, handled by someone who knows what they&rsquo;re doing.
        </h1>
        <p className="mt-6 text-lg max-w-xl text-ink/70">
          Cleaning, repairs, and care — booked in a few taps, done by a
          vetted professional near you. Pick your city to see what&rsquo;s
          available.
        </p>

        <div className="mt-12 border-t border-ink/10 pt-8">
          <p className="text-sm text-ink/60 mb-4">Choose a city</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="group flex items-baseline justify-between border-b border-ink/10 pb-2 hover:border-brand transition-colors"
              >
                <span className="font-display text-xl">{city.name}</span>
                <span className="text-ink/40 text-sm">{city.state}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
