import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-content mx-auto px-6 py-16">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl">My bookings</h1>
        <Link
          href="/book"
          className="bg-brand text-white px-4 py-2 text-sm hover:bg-brand-dark transition-colors"
        >
          Book another clean
        </Link>
      </div>

      {bookings.length === 0 ? (
        <p className="mt-10 text-ink/60">
          No bookings yet.{" "}
          <Link href="/book" className="text-brand hover:text-brand-dark">
            Book your first clean
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 border-t border-ink/10">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-5 border-b border-ink/10"
            >
              <div>
                <p className="font-display text-lg">{b.plan.name}</p>
                <p className="text-sm text-ink/60 mt-1">
                  {b.date}, {b.timeSlot} — {b.address}
                </p>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function StatusBadge({ status }) {
  const tone =
    {
      Requested: "text-amber border-amber/40 bg-amber/5",
      Confirmed: "text-brand border-brand/40 bg-brand/5",
      Completed: "text-moss border-moss/40 bg-moss/5",
      Cancelled: "text-rust border-rust/40 bg-rust/5",
    }[status] || "text-ink/60 border-ink/20";

  return (
    <span className={`text-xs border px-2.5 py-1 self-start ${tone}`}>{status}</span>
  );
}
