import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a classification engine.

Your task is NOT to give religious rulings.

You only convert a Turkish fasting-related question into one predefined category code.

Here are the valid category codes:
- dis_fircalama
- sigara_icmek
- su_icmek
- yemek_yemek
- ilac_kullanimi
- kan_aldirmak
- kusma
- cinsel_iliski
- goz_damlasi
- burun_spreyi
- kulak_damlasi
- agda_yapmak
- dis_dolgulama
- kan_tahlili
- serum_takmak
- igne_vurmak
- makyaj_yapmak
- parfum_surmek
- sakiz_cignemek
- niyet_etmemek
- banyo_yapmak
- yuzme
- tukuruk_yutmak
- diyet_takviye
- lavman
- endoskopi
- mide_asidi
- dis_eti_kanamasi
- dudak_nemlendiricisi
- ruya_gorme
- unutarak_yemek
- misir_patlatmak

Return only the category code. Nothing else. No explanation.

If the question does not clearly match any category, return: belirsiz`;

export async function classifyQuestion(soru: string): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 50,
      messages: [
        {
          role: "user",
          content: `Kullanıcı sorusu: ${soru}`,
        },
      ],
      system: SYSTEM_PROMPT,
    });

    const block = message.content[0];
    if (block.type !== "text") {
      return "belirsiz";
    }

    const result = block.text.trim().toLowerCase();

    if (result.includes(" ") || result.length > 50) {
      return "belirsiz";
    }

    return result;
  } catch {
    return "belirsiz";
  }
}
