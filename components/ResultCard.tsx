import type { SorResponse } from "@/types/fetva";
import Link from "next/link";

interface ResultCardProps {
  result: SorResponse;
}

const hukumConfig = {
  bozar: {
    icon: "✅",
    label: "Orucu Bozar",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    badge: "bg-red-100 text-red-800",
  },
  bozmaz: {
    icon: "❌",
    label: "Orucu Bozmaz",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    badge: "bg-emerald-100 text-emerald-800",
  },
  mezhebe_gore_degiser: {
    icon: "⚠️",
    label: "Mezhebe Göre Değişir",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    badge: "bg-amber-100 text-amber-800",
  },
} as const;

export default function ResultCard({ result }: ResultCardProps) {
  if (!result.hukum) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-center">
        <div className="text-4xl mb-3">🤷</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Sonuç Bulunamadı
        </h3>
        <p className="text-gray-600">{result.aciklama}</p>
      </div>
    );
  }

  const config = hukumConfig[result.hukum];

  return (
    <div
      className={`p-6 ${config.bg} border ${config.border} rounded-2xl`}
      role="region"
      aria-label="Fetva sonucu"
    >
      <div className="text-center mb-4">
        <span className="text-5xl" role="img" aria-label={config.label}>
          {config.icon}
        </span>
      </div>

      <div className="text-center mb-4">
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${config.badge}`}
        >
          {config.label}
        </span>
      </div>

      <h3 className={`text-xl font-bold text-center mb-3 ${config.text}`}>
        {result.baslik}
      </h3>

      <p className="text-gray-700 leading-relaxed text-center mb-4">
        {result.aciklama}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {result.kaynak && (
          <a
            href={result.kaynak}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-700 underline hover:text-emerald-900 transition-colors"
          >
            Kaynak: Diyanet Din İşleri Yüksek Kurulu
          </a>
        )}
        {"slug" in result && result.slug && (
          <Link
            href={`/${result.slug}`}
            className="text-sm px-4 py-2 bg-white border border-gray-200 rounded-lg 
                       hover:bg-gray-50 transition-colors text-gray-700"
          >
            Detaylı Bilgi →
          </Link>
        )}
      </div>
    </div>
  );
}
