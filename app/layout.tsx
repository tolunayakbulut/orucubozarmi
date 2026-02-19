import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Orucu Bozar Mı? - Oruç Hükümleri Sorgulama",
    template: "%s | Orucu Bozar Mı?",
  },
  description:
    "Diyanet fetvalarına göre orucu bozan ve bozmayan durumları öğrenin. Oruçla ilgili tüm sorularınızın cevabı burada.",
  keywords: [
    "oruç",
    "orucu bozar mı",
    "oruç bozan durumlar",
    "ramazan",
    "diyanet fetva",
    "oruç hükümleri",
  ],
  metadataBase: new URL("https://orucubozarmi.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://orucubozarmi.com",
    siteName: "Orucu Bozar Mı?",
    title: "Orucu Bozar Mı? - Oruç Hükümleri Sorgulama",
    description:
      "Diyanet fetvalarına göre orucu bozan ve bozmayan durumları öğrenin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orucu Bozar Mı? - Oruç Hükümleri Sorgulama",
    description:
      "Diyanet fetvalarına göre orucu bozan ve bozmayan durumları öğrenin.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://orucubozarmi.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-center">
            <Link href="/" className="text-xl font-bold text-emerald-700 tracking-tight">
              Orucu Bozar Mı?
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 bg-white mt-auto">
          <div className="max-w-3xl mx-auto px-4 py-8 text-center">
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs text-amber-800 font-semibold mb-1">
                Yasal Uyarı
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Bu sitede yer alan bilgiler yalnızca genel bilgilendirme amaçlıdır ve
                herhangi bir dini fetva niteliği taşımaz. Sunulan içerikler Diyanet İşleri
                Başkanlığı&apos;nın kamuya açık kaynaklarından derlenmiş olup, bağlayıcı
                dini hüküm yerine geçmez. Dini konularda kesin ve kişiye özel hüküm için
                Diyanet İşleri Başkanlığı&apos;na, il/ilçe müftülüklerine veya yetkili din
                alimlerine başvurmanız önerilir. Site yönetimi, buradaki bilgilere dayanılarak
                yapılan uygulamalardan doğabilecek sonuçlardan sorumluluk kabul etmez.
              </p>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} orucubozarmi.com
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
