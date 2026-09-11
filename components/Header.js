import Link from "next/link";
import Image from "next/image";

export default function Header({ city }) {
  return (
    <header className="border-b border-ink/10">
      <div className="max-w-content mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href={city ? `/${city.slug}` : "/"}
          className="flex items-center gap-2.5"
        >
          <Image src="/logo.png" alt="" width={28} height={28} className="rounded-[6px]" />
          <span className="font-display text-xl">NestIdea</span>
        </Link>
        {city && (
          <Link
            href="/"
            className="text-sm text-ink/60 hover:text-brand transition-colors"
          >
            {city.name}, {city.state}
          </Link>
        )}
      </div>
    </header>
  );
}
