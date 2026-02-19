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
- astim_spreyi
- dis_cektirmek
- kanal_tedavisi
- dis_beyazlatma
- nargile
- elektronik_sigara
- yemek_tadina_bakmak
- misvak_kullanmak
- gargara
- balgam_yutmak
- burun_kanamasi
- krem_surmek
- kolonya_surmek
- surme_cekmek
- emzirmek
- hamilelik
- asi_olmak
- insulin_ignesi
- fitil_kullanmak
- dil_alti_sprey
- oksijen_maskesi
- kan_sekeri_olcmek
- mr_rontgen
- tomografi
- ameliyat_olmak
- anestezi
- goz_ameliyati
- kulak_temizleme
- alerji_testi
- terleme
- agiz_kokusu_spreyi
- orucu_erken_acmak
- sahura_kalkmamak
- disariya_tukurmek
- aglamak
- opusmek_opmek
- dedikodu_yapmak

Important disambiguation rules:
- opusmek_opmek: öpmek, öpüşmek, dudak dudağa, eşini öpmek, sevişmek (without intercourse)
- cinsel_iliski: cinsel ilişki, cinsel birliktelik, ilişkiye girmek, cima

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
