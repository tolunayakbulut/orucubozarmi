import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20">
      <div className="text-6xl mb-4">🤷</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Sayfa Bulunamadı
      </h1>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Aradığınız fetva bulunamadı. Lütfen ana sayfadan sorunuzu tekrar sorun.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium 
                   hover:bg-emerald-700 transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
