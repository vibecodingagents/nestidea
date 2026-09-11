"use client";

import { notFound } from "next/navigation";
import { getCity } from "@/lib/cities";
import { getService } from "@/lib/catalog";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";

export default function BookPage({ params }) {
  const city = getCity(params.city);
  const service = getService(params.category, params.service);
  if (!city || !service) notFound();

  return (
    <main>
      <Header city={city} />

      <section className="max-w-content mx-auto px-6 pt-16 pb-24">
        <h1 className="font-display text-3xl">Book: {service.name}</h1>
        <div className="mt-2 flex flex-wrap gap-x-5 text-sm text-ink/60">
          <span>{city.name}</span>
          <span>₹{service.price}</span>
          <span>{service.duration}</span>
        </div>
        <div className="mt-10 max-w-lg">
          <BookingForm service={service} city={city} />
        </div>
      </section>
    </main>
  );
}
