import { notFound } from "next/navigation";
import { getFetvaBySlug, getAllSlugs } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const hukumDisplay = {
  bozar: { icon: "✅", label: "Orucu Bozar", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-800" },
  bozmaz: { icon: "❌", label: "Orucu Bozmaz", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-800" },
  mezhebe_gore_degiser: { icon: "⚠️", label: "Mezhebe Göre Değişir", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-800" },
} as const;

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const fetva = await getFetvaBySlug(slug);
    if (!fetva) return { title: "Bulunamadı" };

    const title = fetva.seo_title ?? `${fetva.baslik} | Orucu Bozar Mı?`;
    const description =
      fetva.seo_description ??
      `${fetva.baslik} - Diyanet fetvalarına göre ${hukumDisplay[fetva.hukum].label.toLowerCase()}. Detaylı açıklama ve kaynak bilgisi.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        locale: "tr_TR",
        url: `https://orucubozarmi.com/${slug}`,
        siteName: "Orucu Bozar Mı?",
      },
      alternates: {
        canonical: `https://orucubozarmi.com/${slug}`,
      },
    };
  } catch {
    return { title: "Hata" };
  }
}

export default async function FetvaPage({ params }: PageProps) {
  const { slug } = await params;

  let fetva;
  try {
    fetva = await getFetvaBySlug(slug);
  } catch {
    notFound();
  }

  if (!fetva) notFound();

  const display = hukumDisplay[fetva.hukum];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: fetva.baslik,
        acceptedAnswer: {
          "@type": "Answer",
          text: fetva.aciklama,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-700 
                     transition-colors mb-8"
        >
          ← Ana Sayfaya Dön
        </Link>

        <article className={`${display.bg} border ${display.border} rounded-2xl p-8`}>
          <div className="text-center mb-6">
            <span className="text-6xl" role="img" aria-label={display.label}>
              {display.icon}
            </span>
          </div>

          <div className="text-center mb-6">
            <span className={`inline-block px-5 py-2 rounded-full text-sm font-bold ${display.badge}`}>
              {display.label}
            </span>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-bold text-center mb-6 ${display.color}`}>
            {fetva.baslik}
          </h1>

          <div className="bg-white/70 rounded-xl p-6 mb-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              {fetva.aciklama}
            </p>
          </div>

          {fetva.kaynak_url && (
            <div className="text-center">
              <a
                href={fetva.kaynak_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-emerald-700 
                           underline hover:text-emerald-900 transition-colors"
              >
                Kaynak: Diyanet İşleri Başkanlığı ↗
              </a>
            </div>
          )}
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl 
                       font-medium hover:bg-emerald-700 transition-colors"
          >
            Başka Bir Soru Sor
          </Link>
        </div>
      </div>
    </>
  );
}
