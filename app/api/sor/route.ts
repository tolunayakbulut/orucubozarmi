import { NextRequest, NextResponse } from "next/server";
import { classifyQuestion } from "@/lib/claude";
import { getFetvaByKategori } from "@/lib/db";
import { cacheGet, cacheSet } from "@/lib/cache";
import { checkRateLimit } from "@/lib/rateLimit";
import type { SorResponse, SorRequest, FetvaResponse, BelirsizResponse } from "@/types/fetva";

const BELIRSIZ_RESPONSE: BelirsizResponse = {
  kategori: "belirsiz",
  hukum: null,
  baslik: null,
  aciklama:
    "Sorunuz tanımlanamadı. Lütfen oruçla ilgili daha net bir soru sorun. Örnek: 'Diş macunu orucu bozar mı?'",
  kaynak: null,
};

function normalizeQuestion(soru: string): string {
  return soru.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderdiniz. Lütfen biraz bekleyin." },
        {
          status: 429,
          headers: { "X-RateLimit-Remaining": String(remaining) },
        }
      );
    }

    const body = (await request.json()) as SorRequest;
    const soru = body?.soru;

    if (!soru || typeof soru !== "string" || soru.trim().length < 3) {
      return NextResponse.json(
        { error: "Geçerli bir soru giriniz." },
        { status: 400 }
      );
    }

    if (soru.length > 300) {
      return NextResponse.json(
        { error: "Soru çok uzun. Lütfen daha kısa bir soru sorun." },
        { status: 400 }
      );
    }

    const normalized = normalizeQuestion(soru);

    const cached = cacheGet<SorResponse>(normalized);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "X-Cache": "HIT",
          "X-RateLimit-Remaining": String(remaining),
        },
      });
    }

    const kategoriKodu = await classifyQuestion(normalized);

    if (kategoriKodu === "belirsiz") {
      cacheSet(normalized, BELIRSIZ_RESPONSE);
      return NextResponse.json(BELIRSIZ_RESPONSE, {
        headers: {
          "X-Cache": "MISS",
          "X-RateLimit-Remaining": String(remaining),
        },
      });
    }

    const fetva = await getFetvaByKategori(kategoriKodu);

    if (!fetva) {
      cacheSet(normalized, BELIRSIZ_RESPONSE);
      return NextResponse.json(BELIRSIZ_RESPONSE, {
        headers: {
          "X-Cache": "MISS",
          "X-RateLimit-Remaining": String(remaining),
        },
      });
    }

    const response: FetvaResponse = {
      kategori: fetva.kategori_kodu,
      hukum: fetva.hukum,
      baslik: fetva.baslik,
      slug: fetva.slug,
      aciklama: fetva.aciklama,
      kaynak: fetva.kaynak_url,
    };

    cacheSet(normalized, response);

    return NextResponse.json(response, {
      headers: {
        "X-Cache": "MISS",
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
