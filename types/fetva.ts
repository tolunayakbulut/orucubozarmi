export type Hukum = "bozar" | "bozmaz" | "mezhebe_gore_degiser";

export interface Fetva {
  id: string;
  slug: string;
  kategori_kodu: string;
  baslik: string;
  hukum: Hukum;
  aciklama: string;
  kaynak_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: Date;
}

export interface FetvaResponse {
  kategori: string;
  hukum: Hukum;
  baslik: string;
  slug: string;
  aciklama: string;
  kaynak: string | null;
}

export interface BelirsizResponse {
  kategori: "belirsiz";
  hukum: null;
  baslik: null;
  aciklama: string;
  kaynak: null;
}

export type SorResponse = FetvaResponse | BelirsizResponse;

export interface SorRequest {
  soru: string;
}
