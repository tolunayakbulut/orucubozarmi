import SearchBox from "@/components/SearchBox";
import { getAllFetvalar } from "@/lib/db";
import Link from "next/link";
import type { Fetva } from "@/types/fetva";

export const dynamic = "force-dynamic";

const hukumLabel: Record<string, string> = {
  bozar: "Bozar",
  bozmaz: "Bozmaz",
  mezhebe_gore_degiser: "Değişir",
};

const hukumStyle: Record<string, string> = {
  bozar: "bg-red-100 text-red-700",
  bozmaz: "bg-emerald-100 text-emerald-700",
  mezhebe_gore_degiser: "bg-amber-100 text-amber-700",
};

async function FetvaList() {
  let fetvalar: Fetva[] = [];
  try {
    fetvalar = await getAllFetvalar();
  } catch {
    return null;
  }

  if (fetvalar.length === 0) return null;

  return (
    <section className="mt-16 w-full max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Sık Sorulan Sorular
      </h2>
      <div className="grid gap-3">
        {fetvalar.map((fetva) => (
          <Link
            key={fetva.id}
            href={`/${fetva.slug}`}
            className="flex items-center justify-between p-4 bg-white border border-gray-100 
                       rounded-xl hover:border-emerald-200 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-gray-800 font-medium">{fetva.baslik}</span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${hukumStyle[fetva.hukum] ?? "bg-gray-100 text-gray-600"}`}
            >
              {hukumLabel[fetva.hukum] ?? fetva.hukum}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 py-12 sm:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Orucu Bozar Mı?
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          Diyanet fetvalarına göre oruçla ilgili sorunuzun cevabını anında öğrenin.
        </p>
      </div>

      <SearchBox />

      <FetvaList />
    </div>
  );
}
