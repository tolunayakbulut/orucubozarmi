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
  {
    slug: "diyet-takviye-orucu-bozar-mi",
    kategori_kodu: "diyet_takviye",
    baslik: "Diyet Takviyesi / Vitamin Almak Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Ağızdan alınan diyet takviyeleri, vitamin hapları ve gıda destekleri orucu bozar. Bunlar yiyecek-içecek hükmünde olduğundan oruçlu iken kullanılmamalıdır. İhtiyaç halinde sahur ve iftar arasında kullanılabilir.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Diyet Takviyesi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Diyet takviyesi ve vitamin almak orucu bozar mı? Ağızdan alınan takviyeler orucu bozar.",
  },
  {
    slug: "mide-asidi-orucu-bozar-mi",
    kategori_kodu: "mide_asidi",
    baslik: "Mide Asidi / Mide Yanması Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Mide yanması veya mide asidinin yemek borusuna yükselmesi (reflü) orucu bozmaz. Bu durum istemsiz olarak gerçekleştiğinden orucu etkilemez. Ancak ağza gelen mide içeriğini geri yutmak konusunda dikkatli olunmalıdır.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Mide Asidi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Mide asidi ve reflü orucu bozar mı? İstemsiz mide yanması orucu bozmaz.",
  },
  {
    slug: "dis-eti-kanamasi-orucu-bozar-mi",
    kategori_kodu: "dis_eti_kanamasi",
    baslik: "Diş Eti Kanaması Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Diş eti kanaması orucu bozmaz. Ancak kanın tükürükle birlikte yutulması durumunda, eğer kan miktarı tükürükten fazla ise oruç bozulur. Kan tükürüğe oranla az ise oruç bozulmaz.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Diş Eti Kanaması Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Diş eti kanaması orucu bozar mı? Diş eti kanaması tek başına orucu bozmaz.",
  },
  {
    slug: "ruya-gorme-orucu-bozar-mi",
    kategori_kodu: "ruya_gorme",
    baslik: "Rüyada İhtilam Olmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Uykuda ihtilam olmak (rüyada cünüp olmak) orucu bozmaz. Bu durum kişinin iradesi dışında gerçekleştiğinden orucu etkilemez. Uyandıktan sonra gusül abdesti alınması yeterlidir, oruç geçerlidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Rüyada İhtilam Olmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Rüyada ihtilam olmak orucu bozar mı? Uykuda ihtilam olmak orucu bozmaz.",
  },
  {
    slug: "misir-patlatmak-orucu-bozar-mi",
    kategori_kodu: "misir_patlatmak",
    baslik: "Mısır Patlatmak (Popcorn) Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Mısır patlatmak kendi başına orucu bozmaz, ancak patlamış mısır yemek orucu bozar. Herhangi bir yiyecek tüketmek orucu bozar ve kaza gerektirir. Oruçluyken yiyecek hazırlamak ise orucu bozmaz.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Mısır Patlatmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Mısır patlatmak orucu bozar mı? Patlamış mısır yemek orucu bozar.",
  },
  {
    slug: "astim-spreyi-orucu-bozar-mi",
    kategori_kodu: "astim_spreyi",
    baslik: "Astım Spreyi (İnhaler) Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Astım spreyi kullanmanın orucu bozup bozmadığı konusunda farklı görüşler vardır. Diyanet İşleri Başkanlığı'na göre astım spreyi orucu bozar, çünkü ilaç akciğerlere ulaşmaktadır. Ancak bazı alimler, spreyin gıda niteliğinde olmadığını belirterek orucu bozmayacağı görüşündedir. Hayati zorunluluk halinde sağlık önceliklidir.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Astım Spreyi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Astım spreyi (inhaler) orucu bozar mı? Bu konuda farklı görüşler bulunmaktadır.",
  },
  {
    slug: "dis-cektirmek-orucu-bozar-mi",
    kategori_kodu: "dis_cektirmek",
    baslik: "Diş Çektirmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Diş çektirmek orucu bozmaz. Ancak işlem sırasında kan veya başka bir maddenin yutulmamasına dikkat edilmelidir. Yutulması halinde oruç bozulur. Lokal anestezi de orucu bozmaz.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Diş Çektirmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Diş çektirmek orucu bozar mı? Yutmamak kaydıyla diş çektirmek orucu bozmaz.",
  },
  {
    slug: "kanal-tedavisi-orucu-bozar-mi",
    kategori_kodu: "kanal_tedavisi",
    baslik: "Kanal Tedavisi Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Kanal tedavisi yaptırmak orucu bozmaz. Ancak tedavi sırasında kullanılan ilaç veya suyu yutmamaya dikkat edilmelidir. Boğaza kaçırılması halinde oruç bozulur.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Kanal Tedavisi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kanal tedavisi orucu bozar mı? Yutmamak kaydıyla kanal tedavisi orucu bozmaz.",
  },
  {
    slug: "dis-beyazlatma-orucu-bozar-mi",
    kategori_kodu: "dis_beyazlatma",
    baslik: "Diş Beyazlatma Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Diş beyazlatma işlemi orucu bozmaz. Ancak işlem sırasında kullanılan kimyasal maddelerin yutulmaması gerekir. Boğaza kaçması halinde oruç bozulur.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Diş Beyazlatma Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Diş beyazlatma orucu bozar mı? Yutmamak kaydıyla diş beyazlatma orucu bozmaz.",
  },
  {
    slug: "nargile-icmek-orucu-bozar-mi",
    kategori_kodu: "nargile",
    baslik: "Nargile İçmek Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Nargile içmek orucu bozar. Tıpkı sigara gibi, nargile dumanının ciğerlere çekilmesi vücuda madde girişi anlamına gelir. Ayrıca nargile suyunun buharı da mideye ulaşır. Orucu bozar ve keffaret gerektirir.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Nargile İçmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Nargile içmek orucu bozar mı? Nargile içmek orucu bozar ve keffaret gerektirir.",
  },
  {
    slug: "elektronik-sigara-orucu-bozar-mi",
    kategori_kodu: "elektronik_sigara",
    baslik: "Elektronik Sigara Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Elektronik sigara (vape) kullanmak orucu bozar. E-sigara buharı nikotin ve çeşitli kimyasallar içerir, bunların ciğerlere çekilmesi vücuda madde girişi sağlar. Normal sigara ile aynı hükme tabidir.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Elektronik Sigara Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Elektronik sigara (vape) orucu bozar mı? E-sigara kullanmak orucu bozar.",
  },
  {
    slug: "yemek-tadina-bakmak-orucu-bozar-mi",
    kategori_kodu: "yemek_tadina_bakmak",
    baslik: "Yemek Tadına Bakmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Yemeğin tadına bakmak, yutmamak kaydıyla orucu bozmaz. Dilin ucuyla tat alıp tükürmek caizdir. Ancak bu işlem sırasında herhangi bir şey yutulursa oruç bozulur. Zorunlu olmadıkça yapılmaması tavsiye edilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Yemek Tadına Bakmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Yemek tadına bakmak orucu bozar mı? Yutmamak kaydıyla yemek tadına bakmak orucu bozmaz.",
  },
  {
    slug: "misvak-kullanmak-orucu-bozar-mi",
    kategori_kodu: "misvak_kullanmak",
    baslik: "Misvak Kullanmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Misvak kullanmak orucu bozmaz. Hz. Peygamber (s.a.v.) oruçluyken de misvak kullanmıştır. Misvaktan kopan parçaların yutulmamasına dikkat edilmelidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Misvak Kullanmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Misvak kullanmak orucu bozar mı? Misvak kullanmak orucu bozmaz.",
  },
  {
    slug: "gargara-yapmak-orucu-bozar-mi",
    kategori_kodu: "gargara",
    baslik: "Gargara Yapmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Ağız gargarası yapmak, yutmamak kaydıyla orucu bozmaz. Gargara suyunun boğaza kaçırılmamasına dikkat edilmelidir. Yutulması halinde oruç bozulur. Zorunlu olmadıkça iftar sonrasına bırakılması önerilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Gargara Yapmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Gargara yapmak orucu bozar mı? Yutmamak kaydıyla gargara orucu bozmaz.",
  },
  {
    slug: "balgam-yutmak-orucu-bozar-mi",
    kategori_kodu: "balgam_yutmak",
    baslik: "Balgam Yutmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Boğazdan gelen balgamı yutmak, ağız boşluğuna gelmediği sürece orucu bozmaz. Ancak ağız boşluğuna gelmiş balgamın yutulması mekruhtur. Mümkünse tükürülmesi tavsiye edilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Balgam Yutmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Balgam yutmak orucu bozar mı? Boğazdaki balgamı yutmak orucu bozmaz.",
  },
  {
    slug: "burun-kanamasi-orucu-bozar-mi",
    kategori_kodu: "burun_kanamasi",
    baslik: "Burun Kanaması Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Burun kanaması orucu bozmaz. Burun kanaması istemsiz olarak gerçekleşen bir durumdur. Ancak kanın boğaza akarak yutulması halinde oruç bozulabilir. Kanı yutmamaya dikkat edilmelidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Burun Kanaması Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Burun kanaması orucu bozar mı? Burun kanaması orucu bozmaz.",
  },
  {
    slug: "krem-surmek-orucu-bozar-mi",
    kategori_kodu: "krem_surmek",
    baslik: "Krem Sürmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Cilde krem, losyon veya merhem sürmek orucu bozmaz. Cilde sürülen maddeler sindirim sistemine girmediğinden orucu etkilemez. Güneş kremi, nemlendirici ve tedavi amaçlı kremler de aynı hükme tabidir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Krem Sürmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Krem sürmek orucu bozar mı? Cilde krem sürmek orucu bozmaz.",
  },
  {
    slug: "kolonya-surmek-orucu-bozar-mi",
    kategori_kodu: "kolonya_surmek",
    baslik: "Kolonya Sürmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Kolonya sürmek orucu bozmaz. Cilde sürülen kolonya sindirim sistemine girmediğinden orucu etkilemez. Ancak kolonyayı bilerek içmek veya koklamak için derince nefes almak uygun değildir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Kolonya Sürmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kolonya sürmek orucu bozar mı? Kolonya sürmek orucu bozmaz.",
  },
  {
    slug: "surme-cekmek-orucu-bozar-mi",
    kategori_kodu: "surme_cekmek",
    baslik: "Sürme Çekmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Göze sürme çekmek orucu bozmaz. Göze sürülen madde sindirim sistemine ulaşmadığından orucu etkilemez. Hz. Peygamber (s.a.v.) döneminde de oruçluyken sürme kullanılmıştır.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Sürme Çekmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Sürme çekmek orucu bozar mı? Göze sürme çekmek orucu bozmaz.",
  },
  {
    slug: "emzirmek-orucu-bozar-mi",
    kategori_kodu: "emzirmek",
    baslik: "Emzirmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Bebek emzirmek annenin orucunu bozmaz. Emzirmek vücuttan madde çıkışıdır, giriş değildir. Ancak emziren anne oruç tutmakta zorlanıyorsa veya süt azalıyorsa, oruç tutmamak için ruhsat vardır. Tutamadığı oruçları daha sonra kaza eder.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Emzirmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Emzirmek orucu bozar mı? Bebek emzirmek annenin orucunu bozmaz.",
  },
  {
    slug: "hamilelikte-oruc-tutmak",
    kategori_kodu: "hamilelik",
    baslik: "Hamilelikte Oruç Tutmak Gerekir Mi?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Hamile kadınlar, kendilerine veya bebeklerine zarar gelme endişesi taşıyorlarsa oruç tutmayabilirler. Bu bir ruhsattır. Tutamadıkları oruçları doğum sonrası kaza ederler. Doktor tavsiyesine uyulması önerilir.",
    kaynak_url: KAYNAK.mahiyet,
    seo_title: "Hamilelikte Oruç Tutmak Gerekir Mi? - Diyanet Fetvası",
    seo_description:
      "Hamilelikte oruç tutmak zorunlu mu? Hamile kadınlar zarar endişesi halinde oruç tutmayabilir.",
  },
  {
    slug: "asi-olmak-orucu-bozar-mi",
    kategori_kodu: "asi_olmak",
    baslik: "Aşı Olmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Aşı yaptırmak orucu bozmaz. Kas içine veya deri altına yapılan aşılar beslenme amaçlı olmadığından orucu etkilemez. Grip aşısı, Covid aşısı ve diğer aşılar bu kapsamdadır.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Aşı Olmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Aşı olmak orucu bozar mı? Aşı yaptırmak orucu bozmaz.",
  },
  {
    slug: "insulin-ignesi-orucu-bozar-mi",
    kategori_kodu: "insulin_ignesi",
    baslik: "İnsülin İğnesi Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "İnsülin iğnesi vurmak orucu bozmaz. İnsülin deri altına yapılan bir ilaçtır ve beslenme amaçlı değildir. Şeker hastaları ihtiyaç halinde oruçluyken insülin kullanabilir. Ancak oruç tutmak sağlığa zarar veriyorsa tutmama ruhsatı vardır.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "İnsülin İğnesi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "İnsülin iğnesi orucu bozar mı? İnsülin iğnesi vurmak orucu bozmaz.",
  },
  {
    slug: "fitil-kullanmak-orucu-bozar-mi",
    kategori_kodu: "fitil_kullanmak",
    baslik: "Fitil Kullanmak Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Fitil (supozituvar) kullanmanın orucu bozup bozmadığı konusunda mezhepler arasında görüş ayrılığı vardır. Hanefi mezhebine göre fitil kullanmak orucu bozar. Şafii mezhebine göre ise bozma konusunda farklı değerlendirmeler yapılmıştır.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Fitil Kullanmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Fitil kullanmak orucu bozar mı? Bu konuda mezheplere göre farklı görüşler vardır.",
  },
  {
    slug: "dil-alti-sprey-orucu-bozar-mi",
    kategori_kodu: "dil_alti_sprey",
    baslik: "Dil Altı Sprey / İlaç Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Dil altı sprey ve tablet kullanmanın orucu bozup bozmadığı tartışmalıdır. Dil altından emilen ilaçlar mideye değil doğrudan kana karışır. Ancak bir kısmının tükürükle yutulması mümkündür. Kalp hastaları gibi zorunlu durumlarda sağlık önceliklidir.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Dil Altı Sprey Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Dil altı sprey veya ilaç orucu bozar mı? Bu konuda farklı görüşler bulunmaktadır.",
  },
  {
    slug: "oksijen-maskesi-orucu-bozar-mi",
    kategori_kodu: "oksijen_maskesi",
    baslik: "Oksijen Maskesi Kullanmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Oksijen maskesi kullanmak orucu bozmaz. Oksijen bir gaz olup gıda niteliğinde değildir. Solunum güçlüğü çeken hastalar oruçluyken oksijen maskesi kullanabilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Oksijen Maskesi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Oksijen maskesi orucu bozar mı? Oksijen maskesi kullanmak orucu bozmaz.",
  },
  {
    slug: "kan-sekeri-olcmek-orucu-bozar-mi",
    kategori_kodu: "kan_sekeri_olcmek",
    baslik: "Kan Şekeri Ölçmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Parmak ucundan kan şekeri ölçmek orucu bozmaz. Bu işlem az miktarda kan alımı gerektirdiğinden ve sindirim sistemini etkilemediğinden orucu bozmaz. Şeker hastaları oruçluyken kan şekerlerini rahatça ölçebilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Kan Şekeri Ölçmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kan şekeri ölçmek orucu bozar mı? Kan şekeri ölçümü orucu bozmaz.",
  },
  {
    slug: "mr-rontgen-orucu-bozar-mi",
    kategori_kodu: "mr_rontgen",
    baslik: "MR / Röntgen Çektirmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "MR (manyetik rezonans) veya röntgen çektirmek orucu bozmaz. Bu görüntüleme yöntemleri vücuda herhangi bir madde girişi sağlamaz. Ancak kontrastlı MR'da damardan verilen kontrast madde konusunda ihtilaf olabilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "MR Röntgen Çektirmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "MR veya röntgen çektirmek orucu bozar mı? Görüntüleme yöntemleri orucu bozmaz.",
  },
  {
    slug: "tomografi-orucu-bozar-mi",
    kategori_kodu: "tomografi",
    baslik: "Tomografi Çektirmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Tomografi (BT) çektirmek orucu bozmaz. Kontrastsız tomografi herhangi bir madde girişi gerektirmez. Kontrastlı tomografide damardan verilen madde ise beslenme amaçlı olmadığından orucu bozmaz.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Tomografi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Tomografi çektirmek orucu bozar mı? Tomografi orucu bozmaz.",
  },
  {
    slug: "ameliyat-olmak-orucu-bozar-mi",
    kategori_kodu: "ameliyat_olmak",
    baslik: "Ameliyat Olmak Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Ameliyat sırasında genel anestezi uygulanması, damardan sıvı verilmesi gibi durumlar orucu bozar. Lokal anestezi ile yapılan küçük cerrahi müdahaleler ise tek başına orucu bozmaz. Ameliyat gereken durumlarda sağlık önceliklidir, oruç daha sonra kaza edilir.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Ameliyat Olmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Ameliyat olmak orucu bozar mı? Ameliyatın türüne göre değişir.",
  },
  {
    slug: "anestezi-orucu-bozar-mi",
    kategori_kodu: "anestezi",
    baslik: "Anestezi Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Lokal anestezi (bölgesel uyuşturma) orucu bozmaz. Genel anestezide ise damardan ilaç verildiği ve solunum tüpü kullanıldığı için oruç bozulur. Diş tedavilerinde yapılan lokal anestezi orucu bozmaz.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Anestezi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Anestezi orucu bozar mı? Lokal anestezi bozmaz, genel anestezi bozar.",
  },
  {
    slug: "goz-ameliyati-orucu-bozar-mi",
    kategori_kodu: "goz_ameliyati",
    baslik: "Göz Ameliyatı Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Göz ameliyatı (lazer, katarakt vb.) orucu bozmaz. Göze uygulanan işlemler sindirim sistemini etkilemez. Lokal anestezi ile yapılan göz ameliyatları oruçluyken yaptırılabilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Göz Ameliyatı Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Göz ameliyatı orucu bozar mı? Göz ameliyatı orucu bozmaz.",
  },
  {
    slug: "kulak-temizleme-orucu-bozar-mi",
    kategori_kodu: "kulak_temizleme",
    baslik: "Kulak Temizleme / Kulak Yıkama Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Kulak temizleme veya kulak yıkama işlemi orucu bozmaz. Kulak kanalından giren su veya sıvı sindirim sistemine ulaşmaz. Ancak kulak zarı delik olan kişilerde durum farklılık gösterebilir.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Kulak Temizleme Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Kulak temizleme ve yıkama orucu bozar mı? Kulak temizleme orucu bozmaz.",
  },
  {
    slug: "alerji-testi-orucu-bozar-mi",
    kategori_kodu: "alerji_testi",
    baslik: "Alerji Testi Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Deri üzerinden yapılan alerji testleri orucu bozmaz. Cildin altına çok az miktarda alerjen madde uygulanması sindirim sistemini etkilemez. Kan yoluyla yapılan alerji testleri de orucu bozmaz.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Alerji Testi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Alerji testi orucu bozar mı? Alerji testi orucu bozmaz.",
  },
  {
    slug: "terleme-orucu-bozar-mi",
    kategori_kodu: "terleme",
    baslik: "Terlemek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Terlemek orucu bozmaz. Terleme vücudun doğal bir fonksiyonudur ve vücuttan madde çıkışıdır. Sıcak havada, spor yaparken veya hamam/saunada terlemek orucu etkilemez.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Terlemek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Terlemek orucu bozar mı? Terlemek orucu bozmaz.",
  },
  {
    slug: "agiz-kokusu-spreyi-orucu-bozar-mi",
    kategori_kodu: "agiz_kokusu_spreyi",
    baslik: "Ağız Kokusu Spreyi Orucu Bozar Mı?",
    hukum: "bozar",
    aciklama:
      "Ağız içine sıkılan sprey orucu bozar. Spreyin içeriği ağız yoluyla vücuda girer ve boğaza ulaşabilir. Ağız kokusunu gidermek için oruçluyken misvak veya diş fırçası tercih edilmelidir.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Ağız Kokusu Spreyi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Ağız spreyi orucu bozar mı? Ağız içine sıkılan sprey orucu bozar.",
  },
  {
    slug: "orucu-erken-acmak",
    kategori_kodu: "orucu_erken_acmak",
    baslik: "Orucu Erken Açmak (Vaktinden Önce) Ne Gerektirir?",
    hukum: "bozar",
    aciklama:
      "İftar vaktinden önce orucu açmak orucu bozar. Yanılarak veya saati yanlış hesaplayarak erken açılırsa kaza gerekir. Bilerek ve kasıtlı olarak iftar vaktinden önce oruç bozulursa hem kaza hem keffaret gerekir.",
    kaynak_url: KAYNAK.keffaret,
    seo_title: "Orucu Erken Açmak Ne Gerektirir? - Diyanet Fetvası",
    seo_description:
      "Orucu erken açmak orucu bozar mı? İftar vaktinden önce orucu açmak bozar.",
  },
  {
    slug: "sahura-kalkmamak-orucu-bozar-mi",
    kategori_kodu: "sahura_kalkmamak",
    baslik: "Sahura Kalkmamak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Sahura kalkmamak orucu bozmaz. Sahur yemek sünnettir, farz değildir. Sahur yemeden de oruç tutulabilir ve oruç geçerlidir. Ancak sahur yapmak oruç tutmayı kolaylaştırdığından tavsiye edilir.",
    kaynak_url: KAYNAK.mahiyet,
    seo_title: "Sahura Kalkmamak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Sahura kalkmamak orucu bozar mı? Sahur yemeden tutulan oruç geçerlidir.",
  },
  {
    slug: "disariya-tukurmek-orucu-bozar-mi",
    kategori_kodu: "disariya_tukurmek",
    baslik: "Sürekli Tükürmek Gerekir Mi? Tükürük Biriktirip Yutmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Oruçluyken sürekli tükürmek gerekmez. Normal tükürüğü yutmak orucu bozmaz. Ancak ağızda biriktirilen tükürüğü toplu olarak yutmak mekruhtur. Tükürüğü dışarı atmak zorunlu değildir, doğal şekilde yutmak orucu etkilemez.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Tükürük Biriktirip Yutmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Oruçluyken tükürmek gerekir mi? Normal tükürük yutmak orucu bozmaz.",
  },
  {
    slug: "aglamak-orucu-bozar-mi",
    kategori_kodu: "aglamak",
    baslik: "Ağlamak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Ağlamak orucu bozmaz. Gözyaşı dökmek vücudun doğal bir tepkisidir ve sindirim sistemini etkilemez. Dua ederken, Kur'an okurken veya üzüntüden ağlamak orucu bozmaz.",
    kaynak_url: KAYNAK.bozmayan,
    seo_title: "Ağlamak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Ağlamak orucu bozar mı? Ağlamak orucu bozmaz.",
  },
  {
    slug: "opusmek-orucu-bozar-mi",
    kategori_kodu: "opusmek_opmek",
    baslik: "Öpüşmek / Eşini Öpmek Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Eşini öpmek tek başına orucu bozmaz, ancak şehvete yol açacak şekilde öpüşmek mekruhtur. Öpüşme sırasında tükürük veya herhangi bir madde yutulursa oruç bozulur. Nefsine hakim olamayacak kişilerin öpüşmekten kaçınması tavsiye edilir.",
    kaynak_url: KAYNAK.kaza,
    seo_title: "Öpüşmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Öpüşmek orucu bozar mı? Eşini öpmek tek başına orucu bozmaz ancak dikkat edilmelidir.",
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
