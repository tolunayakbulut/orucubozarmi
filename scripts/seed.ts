import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS fetvalar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  kategori_kodu TEXT NOT NULL,
  baslik TEXT NOT NULL,
  hukum TEXT CHECK (hukum IN ('bozar', 'bozmaz', 'mezhebe_gore_degiser')) NOT NULL,
  aciklama TEXT NOT NULL,
  kaynak_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fetvalar_kategori ON fetvalar(kategori_kodu);
CREATE INDEX IF NOT EXISTS idx_fetvalar_slug ON fetvalar(slug);
`;

const KAYNAK = {
  bozmayan: "https://kurul.diyanet.gov.tr/Konu-Cevap-Ara/01933666-f36c-75d2-16d1-20432cc24ebc/oruc-orucu-bozmayan-haller",
  kaza: "https://kurul.diyanet.gov.tr/Konu-Cevap-Ara/01933665-7f8e-7a91-b049-1c7074cc2148/oruc-orucu-bozan-ve-kazayi-gerektiren-haller",
  keffaret: "https://kurul.diyanet.gov.tr/Konu-Cevap-Ara/01933667-f16e-7f82-1d05-1c74585efdfb/oruc-orucu-bozan-ve-keffareti-gerektiren-haller",
  mahiyet: "https://kurul.diyanet.gov.tr/Konu-Cevap-Ara/01933668-0356-727a-2066-1c6af38660a3/oruc-orucun-mahiyeti-farzlari-sunnetleri-ve-adabi",
};

const SEED_DATA = [
  {
    slug: "dis-macunu-orucu-bozar-mi",
    kategori_kodu: "dis_fircalama",
    baslik: "Diş Macunu Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Diş fırçalamak ve diş macunu kullanmak, boğaza kaçırmamak kaydıyla orucu bozmaz. Ancak diş macununun yutulması halinde oruç bozulur. Bu nedenle oruçluyken diş fırçalarken dikkatli olunması tavsiye edilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Diş Macunu Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Diş macunu kullanmak orucu bozar mı? Diyanet fetvalarına göre diş fırçalamak orucu bozmaz, ancak yutmamaya dikkat edilmelidir.",
  },
  {
    slug: "sigara-icmek-orucu-bozar-mi",
    kategori_kodu: "sigara_icmek",
    baslik: "Sigara İçmek Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Sigara içmek orucu bozar. Sigara dumanının ciğerlere çekilmesi, vücuda bir madde girmesi anlamına gelir ve bu durum orucu bozar. Orucu bozan kişinin hem kaza hem de keffaret ödemesi gerekir.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Sigara İçmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Sigara içmek orucu bozar mı? Diyanet fetvalarına göre sigara içmek orucu bozar ve keffaret gerektirir.",
  },
  {
    slug: "su-icmek-orucu-bozar-mi",
    kategori_kodu: "su_icmek",
    baslik: "Su İçmek Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Bilerek su içmek orucu bozar. Oruçlu iken herhangi bir yiyecek veya içecek tüketmek orucu bozar. Unutarak su içen kişinin ise orucu bozulmaz; hatırladığında orucuna devam etmelidir.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Su İçmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Su içmek orucu bozar mı? Bilerek su içmek orucu bozar, unutarak içmek bozmaz.",
  },
  {
    slug: "yemek-yemek-orucu-bozar-mi",
    kategori_kodu: "yemek_yemek",
    baslik: "Yemek Yemek Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Bilerek yemek yemek orucu bozar ve hem kaza hem keffaret gerektirir. Unutarak yemek yiyen kişinin orucu bozulmaz; hatırladığında hemen bırakıp orucuna devam etmelidir.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Yemek Yemek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Yemek yemek orucu bozar mı? Bilerek yemek orucu bozar, unutarak yemek bozmaz.",
  },
  {
    slug: "ilac-kullanmak-orucu-bozar-mi",
    kategori_kodu: "ilac_kullanimi",
    baslik: "İlaç Kullanmak Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Ağızdan alınan ilaçlar orucu bozar. Hayati tehlike söz konusu ise sağlık önceliklidir ve oruç daha sonra kaza edilir. Hastalık nedeniyle oruç tutamayan kişiler, iyileştikten sonra oruçlarını kaza ederler.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "İlaç Kullanmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "İlaç kullanmak orucu bozar mı? Ağızdan alınan ilaçlar orucu bozar.",
  },
  {
    slug: "kan-aldirmak-orucu-bozar-mi",
    kategori_kodu: "kan_aldirmak",
    baslik: "Kan Aldırmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Kan vermek veya kan aldırmak orucu bozmaz. Ancak kan verdikten sonra halsizlik hissediliyorsa oruç tutmamak için bir mazeret olabilir. Kan tahlili yaptırmak da orucu bozmaz.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Kan Aldırmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kan aldırmak orucu bozar mı? Diyanet fetvalarına göre kan aldırmak orucu bozmaz.",
  },
  {
    slug: "kusma-orucu-bozar-mi",
    kategori_kodu: "kusma",
    baslik: "Kusmak Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "İstemsiz (kendiliğinden) kusmak orucu bozmaz. Ancak kasıtlı olarak ağız dolusu kusan kişinin orucu bozulur. Hanefi mezhebine göre ağız dolusu kasıtlı kusma orucu bozar; az miktarda kusma bozmaz.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Kusmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kusmak orucu bozar mı? İstemsiz kusma bozmaz, kasıtlı ağız dolusu kusma bozar.",
  },
  {
    slug: "cinsel-iliski-orucu-bozar-mi",
    kategori_kodu: "cinsel_iliski",
    baslik: "Cinsel İlişki Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Oruçluyken cinsel ilişkiye girmek orucu bozar ve keffaret gerektirir. Keffaret olarak 60 gün peş peşe oruç tutmak veya 60 fakiri doyurmak gerekir.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Cinsel İlişki Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Cinsel ilişki orucu bozar mı? Oruçluyken cinsel ilişki orucu bozar ve keffaret gerektirir.",
  },
  {
    slug: "goz-damlasi-orucu-bozar-mi",
    kategori_kodu: "goz_damlasi",
    baslik: "Göz Damlası Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Göz damlası kullanmak orucu bozmaz. Göze damlatılan ilaç, sindirim sistemine ulaşmadığından orucu etkilemez. Diyanet İşleri Başkanlığı bu konuda orucu bozmadığı yönünde görüş bildirmiştir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Göz Damlası Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Göz damlası kullanmak orucu bozar mı? Diyanet fetvalarına göre göz damlası orucu bozmaz.",
  },
  {
    slug: "burun-spreyi-orucu-bozar-mi",
    kategori_kodu: "burun_spreyi",
    baslik: "Burun Spreyi Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Burun spreyi kullanmak orucu bozar. Burundan giren ilaç boğaza ve mideye ulaşabildiğinden orucu bozar. Bu nedenle oruçlu iken burun spreyi kullanmaktan kaçınılmalıdır.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Burun Spreyi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Burun spreyi kullanmak orucu bozar mı? Burun spreyi mideye ulaştığından orucu bozar.",
  },
  {
    slug: "kulak-damlasi-orucu-bozar-mi",
    kategori_kodu: "kulak_damlasi",
    baslik: "Kulak Damlası Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Kulak damlası kullanmak orucu bozmaz. Kulağa damlatılan ilaç mideye ulaşmadığından orucu etkilemez. Ancak kulak zarı delik ise ihtilaf söz konusu olabilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Kulak Damlası Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kulak damlası orucu bozar mı? Diyanet fetvalarına göre kulak damlası orucu bozmaz.",
  },
  {
    slug: "igne-vurmak-orucu-bozar-mi",
    kategori_kodu: "igne_vurmak",
    baslik: "İğne Vurmak Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Tedavi amaçlı iğne (kas içi veya damar içi) orucu bozmaz. Ancak beslenme amaçlı serumlar ve vitamin iğneleri konusunda ihtilaf vardır. Hanefi mezhebine göre kas içi ve damar içi iğneler orucu bozmaz.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "İğne Vurmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "İğne vurmak orucu bozar mı? Tedavi amaçlı iğneler orucu bozmaz, beslenme amaçlı iğnelerde ihtilaf vardır.",
  },
  {
    slug: "sakiz-cignemek-orucu-bozar-mi",
    kategori_kodu: "sakiz_cignemek",
    baslik: "Sakız Çiğnemek Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Sakız çiğnemek orucu bozar. Sakızdan çıkan tatlandırıcı ve aroma maddeleri yutulduğu için oruç bozulur. Şekersiz sakız da dahil olmak üzere her türlü sakız orucu bozar.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Sakız Çiğnemek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Sakız çiğnemek orucu bozar mı? Her türlü sakız çiğnemek orucu bozar.",
  },
  {
    slug: "makyaj-yapmak-orucu-bozar-mi",
    kategori_kodu: "makyaj_yapmak",
    baslik: "Makyaj Yapmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Makyaj yapmak orucu bozmaz. Cilde sürülen kozmetik ürünler sindirim sistemine girmediğinden orucu etkilemez. Ancak ruj gibi ürünlerin yutulmamasına dikkat edilmelidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Makyaj Yapmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Makyaj yapmak orucu bozar mı? Makyaj yapmak orucu bozmaz.",
  },
  {
    slug: "parfum-surmek-orucu-bozar-mi",
    kategori_kodu: "parfum_surmek",
    baslik: "Parfüm Sürmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Parfüm sürmek orucu bozmaz. Koku sürünmek, vücuda dışarıdan bir madde girmesi anlamına gelmediğinden orucu etkilemez. Ancak bilerek ve derince koklamaktan kaçınılması tavsiye edilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Parfüm Sürmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Parfüm sürmek orucu bozar mı? Parfüm sürmek orucu bozmaz.",
  },
  {
    slug: "niyet-etmemek-orucu-bozar-mi",
    kategori_kodu: "niyet_etmemek",
    baslik: "Niyet Etmemek Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Niyet, orucun geçerlilik şartlarındandır. Ramazan orucuna imsak vaktinden önce niyet edilmesi gerekir. Niyet edilmeden tutulan oruç geçerli değildir. Niyet kalben yapılır, dil ile söylenmesi şart değildir.",
    kaynak_url: KAYNAK.mahiyet,
    seo_title: "Niyet Etmemek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Niyet etmemek orucu bozar mı? Niyet etmeden tutulan oruç geçerli sayılmaz.",
  },
  {
    slug: "banyo-yapmak-orucu-bozar-mi",
    kategori_kodu: "banyo_yapmak",
    baslik: "Banyo Yapmak / Duş Almak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Banyo yapmak veya duş almak orucu bozmaz. Vücudun dışından su değmesi orucu etkilemez. Ancak banyo sırasında su yutmamaya dikkat edilmelidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Banyo Yapmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Banyo yapmak orucu bozar mı? Banyo yapmak ve duş almak orucu bozmaz.",
  },
  {
    slug: "yuzme-orucu-bozar-mi",
    kategori_kodu: "yuzme",
    baslik: "Yüzmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Yüzmek orucu bozmaz, ancak su yutmamaya dikkat edilmelidir. Ağızdan veya burundan su kaçırma riski olduğundan oruçlu iken dikkatli olunmalıdır. Su kaçırılması halinde oruç bozulur.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Yüzmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Yüzmek orucu bozar mı? Yüzmek orucu bozmaz, ancak su yutmamaya dikkat edilmelidir.",
  },
  {
    slug: "unutarak-yemek-yemek-orucu-bozar-mi",
    kategori_kodu: "unutarak_yemek",
    baslik: "Unutarak Yemek Yemek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Unutarak yemek yemek veya su içmek orucu bozmaz. Hz. Peygamber (s.a.v.) 'Kim unutarak yer veya içerse orucunu tamamlasın. Çünkü ona Allah yedirmiş ve içirmiştir' buyurmuştur. Hatırlandığında hemen bırakılmalı ve oruca devam edilmelidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Unutarak Yemek Yemek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Unutarak yemek yemek orucu bozar mı? Unutarak yemek yemek veya su içmek orucu bozmaz.",
  },
  {
    slug: "tukuruk-yutmak-orucu-bozar-mi",
    kategori_kodu: "tukuruk_yutmak",
    baslik: "Tükürük Yutmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Normal tükürük yutmak orucu bozmaz. Ağızda biriken normal tükürüğü yutmak doğal bir süreç olduğundan orucu etkilemez. Ancak ağızda biriktirilen tükürüğü toplu olarak yutmak mekruhtur.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Tükürük Yutmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Tükürük yutmak orucu bozar mı? Normal tükürük yutmak orucu bozmaz.",
  },
  {
    slug: "kan-tahlili-orucu-bozar-mi",
    kategori_kodu: "kan_tahlili",
    baslik: "Kan Tahlili Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Kan tahlili yaptırmak orucu bozmaz. Vücuttan kan alınması sindirim sistemini etkilemediğinden orucu bozmaz. Ancak çok fazla kan alınması halinde halsizlik olursa oruç tutmamak için mazeret olabilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Kan Tahlili Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kan tahlili yaptırmak orucu bozar mı? Kan tahlili orucu bozmaz.",
  },
  {
    slug: "serum-takmak-orucu-bozar-mi",
    kategori_kodu: "serum_takmak",
    baslik: "Serum Takmak Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Besleyici serum takmak orucu bozar. Damar yoluyla verilen besleyici serumlar vücuda gıda niteliğinde madde girişi sağladığından orucu bozar. Tedavi amaçlı serumlarda ise ihtilaf vardır.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Serum Takmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Serum takmak orucu bozar mı? Besleyici serum takmak orucu bozar.",
  },
  {
    slug: "endoskopi-orucu-bozar-mi",
    kategori_kodu: "endoskopi",
    baslik: "Endoskopi Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Endoskopi yaptırmak orucu bozar. Ağızdan mideye sokulan endoskop cihazı ve işlem sırasında kullanılan sıvılar mideye ulaştığından oruç bozulur. Endoskopi gerektiren durumlarda oruç daha sonra kaza edilir.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Endoskopi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Endoskopi orucu bozar mı? Endoskopi yaptırmak orucu bozar.",
  },
  {
    slug: "lavman-orucu-bozar-mi",
    kategori_kodu: "lavman",
    baslik: "Lavman Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Lavman yaptırmanın orucu bozup bozmadığı konusunda mezhepler arasında görüş ayrılığı vardır. Hanefi mezhebine göre lavman orucu bozar. Şafii mezhebine göre ise bozma konusunda farklı görüşler bulunmaktadır.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Lavman Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Lavman orucu bozar mı? Lavmanın orucu bozup bozmadığı mezheplere göre değişir.",
  },
  {
    slug: "dis-dolgulama-orucu-bozar-mi",
    kategori_kodu: "dis_dolgulama",
    baslik: "Diş Dolgusu Yaptırmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Diş dolgusu yaptırmak orucu bozmaz, ancak işlem sırasında su veya herhangi bir maddeyi yutmamaya dikkat edilmelidir. Diş tedavisi sırasında boğaza kaçan maddeler orucu bozar.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Diş Dolgusu Yaptırmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Diş dolgusu yaptırmak orucu bozar mı? Yutmamak kaydıyla diş dolgusu orucu bozmaz.",
  },
  {
    slug: "dudak-nemlendiricisi-orucu-bozar-mi",
    kategori_kodu: "dudak_nemlendiricisi",
    baslik: "Dudak Nemlendiricisi Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Dudak nemlendiricisi kullanmak orucu bozmaz. Dudaklara sürülen nemlendirici cilt üzerinde kalır ve sindirim sistemine girmez. Ancak yalayarak yutmamaya dikkat edilmelidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Dudak Nemlendiricisi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Dudak nemlendiricisi orucu bozar mı? Dudak nemlendiricisi kullanmak orucu bozmaz.",
  },
  {
    slug: "agda-yapmak-orucu-bozar-mi",
    kategori_kodu: "agda_yapmak",
    baslik: "Ağda Yapmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Ağda yapmak orucu bozmaz. Cilt üzerinde yapılan ağda işlemi vücuda herhangi bir madde girişine neden olmadığından orucu etkilemez.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Ağda Yapmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Ağda yapmak orucu bozar mı? Ağda yapmak orucu bozmaz.",
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query(CREATE_TABLE);

    for (const item of SEED_DATA) {
      await client.query(
        `INSERT INTO fetvalar (slug, kategori_kodu, baslik, hukum, aciklama, kaynak_url, seo_title, seo_description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (slug) DO UPDATE SET
           kategori_kodu = EXCLUDED.kategori_kodu,
           baslik = EXCLUDED.baslik,
           hukum = EXCLUDED.hukum,
           aciklama = EXCLUDED.aciklama,
           kaynak_url = EXCLUDED.kaynak_url,
           seo_title = EXCLUDED.seo_title,
           seo_description = EXCLUDED.seo_description`,
        [
          item.slug,
          item.kategori_kodu,
          item.baslik,
          item.hukum,
          item.aciklama,
          item.kaynak_url,
          item.seo_title,
          item.seo_description,
        ]
      );
    }

    const count = await client.query("SELECT COUNT(*) FROM fetvalar");
    process.stdout.write(
      `Seed completed. ${count.rows[0].count} fetvalar in database.\n`
    );
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  process.stderr.write(`Seed failed: ${err}\n`);
  process.exit(1);
});
