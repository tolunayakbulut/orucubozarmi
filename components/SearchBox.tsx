"use client";

import { useState, useCallback } from "react";
import type { SorResponse } from "@/types/fetva";
import ResultCard from "./ResultCard";

export default function SearchBox() {
  const [soru, setSoru] = useState("");
  const [result, setResult] = useState<SorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = soru.trim();
      if (!trimmed || trimmed.length < 3) return;

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await fetch("/api/sor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ soru: trimmed }),
        });

        if (res.status === 429) {
          setError("Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.");
          return;
        }

        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Bir hata oluştu.");
          return;
        }

        const data = (await res.json()) as SorResponse;
        setResult(data);
      } catch {
        setError("Bağlantı hatası. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    },
    [soru]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={soru}
            onChange={(e) => setSoru(e.target.value)}
            placeholder="Örn: Diş macunu orucu bozar mı?"
            className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 
                       focus:border-emerald-500 focus:outline-none focus:ring-2 
                       focus:ring-emerald-500/20 transition-all duration-200
                       bg-white text-gray-900 placeholder-gray-400
                       shadow-sm hover:shadow-md"
            maxLength={300}
            disabled={loading}
            aria-label="Oruç sorunuzu yazın"
          />
          <button
            type="submit"
            disabled={loading || soru.trim().length < 3}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 
                       bg-emerald-600 text-white rounded-xl font-medium
                       hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed
                       transition-colors duration-200 text-sm"
            aria-label="Soruyu gönder"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sorgulanıyor
              </span>
            ) : (
              "Sor"
            )}
          </button>
        </div>
      </form>

      {error && (
        <div
          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
          role="alert"
        >
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
}
