import { Pool } from "pg";
import type { Fetva } from "@/types/fetva";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export async function getFetvaByKategori(
  kategoriKodu: string
): Promise<Fetva | null> {
  const result = await pool.query<Fetva>(
    "SELECT * FROM fetvalar WHERE kategori_kodu = $1 LIMIT 1",
    [kategoriKodu]
  );
  return result.rows[0] ?? null;
}

export async function getFetvaBySlug(slug: string): Promise<Fetva | null> {
  const result = await pool.query<Fetva>(
    "SELECT * FROM fetvalar WHERE slug = $1 LIMIT 1",
    [slug]
  );
  return result.rows[0] ?? null;
}

export async function getAllFetvalar(): Promise<Fetva[]> {
  const result = await pool.query<Fetva>(
    "SELECT * FROM fetvalar ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function getAllSlugs(): Promise<string[]> {
  const result = await pool.query<{ slug: string }>(
    "SELECT slug FROM fetvalar"
  );
  return result.rows.map((row) => row.slug);
}

export { pool };
