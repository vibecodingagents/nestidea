import { prisma } from "@/lib/prisma";
import AdminBookingsTable from "@/components/AdminBookingsTable";

export default async function AdminPage() {
  const bookings = await prisma.booking.findMany({
    include: { plan: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  const counts = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="max-w-content mx-auto px-6 py-16">
      <h1 className="font-display text-3xl">Bookings</h1>
      <p className="mt-2 text-ink/60">
        {bookings.length} total — {counts.Requested || 0} awaiting confirmation.
      </p>

      <div className="mt-10">
        <AdminBookingsTable initialBookings={bookings} />
      </div>
    </main>
  );
}
