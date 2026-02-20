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

const DIYANET_KAYNAK = "https://istanbul.diyanet.gov.tr/bakirkoy/sayfalar/contentdetail.aspx?MenuCategory=Kurumsal&ContentId=328";

const SEED_DATA = [
  {
    slug: "dis-macunu-orucu-bozar-mi",
    kategori_kodu: "dis_fircalama",
    baslik: "Diş Macunu Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Boğaza su kaçırmadan ağzı su ile çalkalamak orucu bozmadığı gibi diş fırçalamakla da oruç bozulmaz. Bununla birlikte, diş macununun veya suyun boğaza kaçması hâlinde oruç bozulur. Orucun bozulma ihtimali dikkate alınarak, dişlerin imsakten önce ve iftardan sonra fırçalanması, oruçluyken fırçalanacaksa macun kullanılmaması uygun olur.",
    kaynak_url: DIYANET_KAYNAK,
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
      "Sigara, nargile gibi keyif veren tütün kökenli dumanlı maddeler ile uyuşturucular ve tiryakilik gereği alınan tüm maddeler oruç yasakları kapsamına girer ve orucu bozar (İbn Âbidîn, Reddü'l-muhtâr, III, 386-387).",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Ramazan'da oruçlu iken kan verenin orucu bozulmaz (İbn Kudâme, el-Muğnî, IV, 50-52). Hz. Peygamber'in (s.a.v.) oruçlu iken hacamat yaptırdığı rivayet edilmiştir (Buhârî, Savm, 32; Ebû Dâvûd, Savm, 29). Ancak vücuda kan almak beslenme ve gıda alma kapsamına girdiği için orucu bozar.",
    kaynak_url: DIYANET_KAYNAK,
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
      "Miktarı ne olursa olsun kendiliğinden gelen kusuntu orucu bozmaz. Mideden ansızın ağza yükselip tekrar mideye dönen şeyler de oruca zarar vermez. Kişinin kendi isteği ile ağız dolusu kusması hâlinde ise oruç bozulur. Hz. Peygamber (s.a.v.) 'Oruçlu kimse kendisine hâkim olamayarak kusarsa ona kaza gerekmez. Her kim de kendi isteği ile kusarsa orucunu kaza etsin' buyurmuştur (Ebû Dâvûd, Savm, 32; Tirmizî, Savm, 25).",
    kaynak_url: DIYANET_KAYNAK,
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
      "Ramazan'da oruçlu olduğunu bile bile cinsel ilişkide bulunmakla oruç bozulur, hem kaza hem de keffâret gerekir (Buhârî, Savm, 30). Eşlerin birbirlerini öpmeleri veya sarılmalarıyla oruçları bozulmaz. Ancak bu durumda boşalma meydana gelirse oruç bozulur ve güne gün kaza gerekir (Merğînânî, el-Hidâye, II, 256).",
    kaynak_url: DIYANET_KAYNAK,
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
      "Göze damlatılan ilaç miktar olarak çok az (1 mililitrenin 1/20'si olan 50 mikrolitre) olup bunun bir kısmı gözün kırpılmasıyla dışarıya atılmakta, bir kısmı göz ile burun boşluğunu birleştiren kanallarda ve mukozasında gözenekler yolu ile emilerek vücuda alınmaktadır. Kaldı ki bu işlem yeme-içme yani gıdalanma anlamı da taşımamaktadır. Dolayısıyla göz damlası orucu bozmaz (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Göz Damlası Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Göz damlası kullanmak orucu bozar mı? Diyanet fetvalarına göre göz damlası orucu bozmaz.",
  },
  {
    slug: "burun-spreyi-orucu-bozar-mi",
    kategori_kodu: "burun_spreyi",
    baslik: "Burun Spreyi Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Tedavi amacıyla buruna damlatılan ilacın bir damlası yaklaşık 0,06 cm3'tür. Bunun bir kısmı burun çeperleri tarafından emilmekte, çok az bir kısmı mideye ulaşmaktadır. Bu da abdest alırken ağızda kalan rutubette olduğu gibi orucu bozacak düzeyde görülmemiştir. Kaldı ki bu işlem yeme-içme anlamı da taşımamaktadır. Dolayısıyla burun damlası/spreyi orucu bozmaz (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Burun Spreyi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Burun spreyi kullanmak orucu bozar mı? Diyanet'e göre burun damlası orucu bozmaz.",
  },
  {
    slug: "kulak-damlasi-orucu-bozar-mi",
    kategori_kodu: "kulak_damlasi",
    baslik: "Kulak Damlası Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Kulak ile boğaz arasında bir kanal bulunmaktadır. Ancak kulak zarı bu kanalı tıkadığından ilaç boğaza ulaşmaz. Kulak zarında delik bulunsa bile kulağa damlatılan ilaç kulak içerisinde emileceği için ilaç ya hiç mideye ulaşmayacak ya da çok azı ulaşacaktır. Kaldı ki bu işlem yeme-içme anlamı da taşımamaktadır. Dolayısıyla kulak damlası orucu bozmaz (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
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
      "İğnenin orucu bozup bozmayacağı kullanılış amacına göre değerlendirilir. Ağrı dindirmek, tedavi etmek, vücudun direncini artırmak gibi amaçlarla yapılan gıda ve keyif verici olmayan enjeksiyonlar yeme-içme anlamına gelmediklerinden orucu bozmazlar. Ancak gıda ve/veya keyif verici enjeksiyonlar ile vitamin iğneleri orucu bozar (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
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
      "Günümüzde üretilen sakızlarda ağızda çözülen katkı maddeleri bulunduğundan, ne kadar dikkat edilirse edilsin bunların yutulmasından kaçınmak mümkün değildir. Bu sebeple bu tür sakız çiğnemek orucu bozar. Öte yandan hangi sakızın orucu bozmayan türden olduğu bilinemeyeceğinden oruçlu iken sakız çiğnemekten sakınılmalıdır (İbn Âbidîn, Reddü'l-muhtâr, III, 395-396).",
    kaynak_url: DIYANET_KAYNAK,
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
      "Oruç, bir şey yemek, içmek ve cinsel ilişkide bulunmaktan dolayı bozulur. Makyaj, saç boyamak ve saç bakımı bu kapsamda olmadığından orucu bozmaz. Ancak ruj gibi ürünlerin yutulmamasına dikkat edilmelidir.",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Ağız ve burnundan su girip de sindirim organına ulaşmadıkça oruçlu kimsenin yıkanması orucuna zarar vermez. Nitekim Hz. Âişe ve Ümmü Seleme, Hz. Peygamber'in (s.a.v.) Ramazan'da imsaktan sonra yıkandıklarını haber vermişlerdir (Buhârî, Savm, 25). Bu itibarla ağız ve burundan mideye su kaçırmamak şartıyla oruçlu kişi yıkanabilir (el-Fetâva'l-Hindiyye, I, 220).",
    kaynak_url: DIYANET_KAYNAK,
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
      "Ağız ve burundan su kaçırmamak kaydıyla denize girmekle oruç bozulmaz. Fakat denize giren kimse yüzme esnasında gelen dalgalar karşısında veya başka bir şekilde su yutabilir. Bu itibarla oruçlu iken denize girmekten kaçınmak daha ihtiyatlıdır.",
    kaynak_url: DIYANET_KAYNAK,
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
      "Unutarak yemek içmek orucu bozmaz. Hz. Peygamber (s.a.v.) 'Bir kimse oruçlu olduğunu unutarak yer, içerse orucunu tamamlasın, bozmasın. Çünkü onu, Allah yedirmiş, içirmiştir' buyurmuştur (Buhârî, Savm, 26). Unutarak yiyip içen kimse oruçlu olduğunu hatırlarsa hemen ağzındakileri çıkarıp ağzını yıkamalı ve orucuna devam etmelidir. Oruçlu olduğu hatırlandıktan sonra mideye bir şey inerse oruç bozulur (Merğînânî, el-Hidâye, II, 253-254).",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Serum Takmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Serum takmak orucu bozar mı? Besleyici serum takmak orucu bozar.",
  },
  {
    slug: "endoskopi-orucu-bozar-mi",
    kategori_kodu: "endoskopi",
    baslik: "Endoskopi Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Endoskopi ve kolonoskopi yaptırmak; yeme, içme anlamına gelmemekle birlikte, çoğunlukla cihaz içinden su verildiği için oruç bozulur. Ancak söz konusu işlemlerde cihazların kullanımı sırasında sindirim sistemine su, yağ ve benzeri gıda özelliği taşıyan bir madde girmemesi durumunda endoskopi ve kolonoskopi yaptırmak orucu bozmaz (DİYK 2005/155 tarih ve sayılı karar).",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Endoskopi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Endoskopi orucu bozar mı? Cihazdan su verilmezse bozmaz, verilirse bozar.",
  },
  {
    slug: "lavman-orucu-bozar-mi",
    kategori_kodu: "lavman",
    baslik: "Lavman Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Lavmanda iki durum söz konusudur: Kalın bağırsaklarda su, glikoz ve bazı tuzlar emildiği için, gıda içeren sıvının bağırsaklara verilmesi veya orucu bozacak kadar su emilecek şekilde verilen suyun bağırsakta kalması durumunda oruç bozulur. Ancak suyun bağırsaklara verilmesinden sonra bekletilmeyip bağırsakların hemen temizlenmesi durumunda, emilen su çok az olduğu için oruç bozulmaz (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
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
      "Sırf diş tedavisi sebebi ile oruç bozulmaz. Tedavinin ağrısız gerçekleşmesi için yapılan enjeksiyonlar da beslenme amacı taşımadığı için orucu bozmazlar. Ancak tedavi sırasında ağız su ile çalkalanırken boğaza su, kan veya tedavide kullanılan maddelerden biri kaçarsa oruç bozulur ve kaza edilmesi gerekir.",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Vücuttaki kılların hangi yolla olursa olsun alınması orucu bozmaz. Çünkü oruç bir şey yemek, içmek ve cinsel ilişkide bulunmaktan dolayı bozulur. Kıl almak veya aldırmak bunların kapsamında olmadığından orucu bozmaz.",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Diş kanaması orucu bozmaz. Ancak çıkan kan, karıştığı tükürüğe eşit veya daha fazla olursa yutulması hâlinde oruç bozulur ve kaza edilmesi gerekir. Daha az miktarda olan kan ise dikkate alınmaz (Haddâd, el-Cevhera, I, 173).",
    kaynak_url: DIYANET_KAYNAK,
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
      "Oruçlu iken rüyada ihtilam olmak orucu bozmaz, gusletmeyi geciktirerek cünüp olarak sabahlamak da oruca bir zarar vermez (el-Fetâva'l-Hindiyye, I, 220). Ancak guslü sabah namazı vaktinin çıkmasına kadar ertelemek günahtır. Çünkü bu durumda namaz terk edilmiş olur (İbn Âbidîn, Reddü'l-muhtâr, III, 372). Nitekim Hz. Peygamber'in (s.a.v.) Ramazan'da imsaktan sonra sabah namazı vakti içinde yıkandıkları bilinmektedir (Buhârî, Savm, 25).",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Mısır Patlatmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Mısır patlatmak orucu bozar mı? Patlamış mısır yemek orucu bozar.",
  },
  {
    slug: "astim-spreyi-orucu-bozar-mi",
    kategori_kodu: "astim_spreyi",
    baslik: "Astım Spreyi (İnhaler) Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Astım hastalarının ağza püskürtülen nefes açıcı spreyleri orucu bozmaz. Çünkü bu speylerden bir kullanımda 1/20 ml gibi çok az bir miktar ağza sıkılmakta, bunun önemli bir kısmı ağız ve nefes boruları cidarları tarafından emilip yok olmaktadır. Abdest alırken ağızda kalan su ile kıyaslandığında bu miktarın çok az olduğu görülmektedir. Misvaktan bazı kırıntıların mideye ulaşması kaçınılmaz olmasına rağmen Hz. Peygamber (s.a.v.) oruçlu olarak misvak kullanmıştır (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Astım Spreyi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Astım spreyi (inhaler) orucu bozar mı? Diyanet'e göre astım spreyi orucu bozmaz.",
  },
  {
    slug: "dis-cektirmek-orucu-bozar-mi",
    kategori_kodu: "dis_cektirmek",
    baslik: "Diş Çektirmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Sırf diş tedavisi ve diş çektirmek sebebi ile oruç bozulmaz. Tedavinin ağrısız gerçekleşmesi için yapılan lokal anestezi enjeksiyonları da beslenme amacı taşımadığı için orucu bozmazlar. Ancak tedavi sırasında boğaza su, kan veya kullanılan maddelerden biri kaçarsa oruç bozulur ve kaza edilmesi gerekir.",
    kaynak_url: DIYANET_KAYNAK,
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
      "Sırf diş tedavisi sebebi ile oruç bozulmaz. Kanal tedavisi de bu kapsamdadır. Tedavinin ağrısız gerçekleşmesi için yapılan enjeksiyonlar beslenme amacı taşımadığından orucu bozmazlar. Ancak tedavi sırasında boğaza su, kan veya tedavide kullanılan maddelerden biri kaçarsa oruç bozulur ve kaza edilmesi gerekir.",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Yemeğin tadına bakmak, yutmamak kaydıyla orucu bozmaz. Dilin ucuyla tat alıp tükürmek caizdir. Ancak bu işlem sırasında herhangi bir şey yutulursa oruç bozulur. Zorunlu olmadıkça yapılmaması tavsiye edilir. Ağız ve burundan alınıp mideye ulaşan her şey orucu bozar.",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Deri üzerine sürülen merhem, krem, yapıştırılan ilaçlı bantlar orucu bozmaz. Deri üzerindeki gözenekler ve deri altındaki kılcal damarlar yoluyla vücuda sürülen yağ, merhem ve benzeri şeyler emilerek kana karışmaktadır. Ancak cildin bu emişi çok az ve yavaş olmaktadır. Diğer taraftan bu işlem yeme-içme anlamına da gelmemektedir (DİYK 22.09.2005 tarihli karar; bkz. Merğînânî, el-Hidâye, II, 263-264).",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Besin değeri taşımayan aşılar ve tedavi amaçlı iğneler orucu bozmaz. Ancak oruçlu iken gıda ve vitamin iğneleri yaptıranların, ağızdan aşı alanların, damardan serum ve kan verilenlerin orucu bozulur. İmkânı olan kişilerin iğnelerini iftardan sonra yaptırmaları yerinde olur.",
    kaynak_url: DIYANET_KAYNAK,
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
      "Şeker hastalarının kullandıkları insülin iğnesi gıda ve keyif verici nitelikte olmadığı için orucu bozmaz. Diğer yandan ehil doktorların oruç tutmasının sağlık açısından zararlı olacağı teşhisini koyduğu hasta Ramazan'da oruç tutmayabilir. İnsüline bağımlı olarak yaşayan hastaların oruç tutmaları sağlıklarına zarar veriyorsa tutamadıkları oruçların sayısınca her gün için bir fidye verirler (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "İnsülin İğnesi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "İnsülin iğnesi orucu bozar mı? İnsülin iğnesi vurmak orucu bozmaz.",
  },
  {
    slug: "fitil-kullanmak-orucu-bozar-mi",
    kategori_kodu: "fitil_kullanmak",
    baslik: "Fitil Kullanmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Makattan kullanılan fitiller, her ne kadar sindirim sistemine dâhil olmakta ise de, sindirim ince bağırsaklarda tamamlandığı, fitillerde gıda verme özelliği bulunmadığı ve makattan fitil almak yemek ve içmek anlamına gelmediği için orucu bozmaz. Kadınların fercinden kullanılan fitiller de orucu bozmaz (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Fitil Kullanmak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Fitil kullanmak orucu bozar mı? Diyanet'e göre fitil kullanmak orucu bozmaz.",
  },
  {
    slug: "dil-alti-sprey-orucu-bozar-mi",
    kategori_kodu: "dil_alti_sprey",
    baslik: "Dil Altı Sprey / İlaç Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Bazı kalp rahatsızlıklarında dil altına konulan hap, doğrudan ağız dokusu tarafından emilip kana karışarak kalp krizini önlemektedir. Söz konusu hap ağız içinde emilip yok olduğundan mideye bir şey ulaşmamaktadır. Bu itibarla dilaltı hapı kullanmak orucu bozmaz (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Dil Altı Sprey Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Dil altı sprey veya ilaç orucu bozar mı? Diyanet'e göre dilaltı hapı orucu bozmaz.",
  },
  {
    slug: "oksijen-maskesi-orucu-bozar-mi",
    kategori_kodu: "oksijen_maskesi",
    baslik: "Oksijen Maskesi Kullanmak Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Oksijen maskesi kullanmak orucu bozmaz. Oksijen bir gaz olup gıda niteliğinde değildir. Solunum güçlüğü çeken hastalar oruçluyken oksijen maskesi kullanabilir.",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Lokal anestezi (sınırlı uyuşturma) orucun sıhhatine engel değildir. Bölgesel ve genel anestezide ise acil durumlarda ilaç ve sıvı vermek amacıyla damar yolu açılarak serum verildiği için oruç bozulur. Nefes yolu veya iğne ile yapılan anestezi mideye ulaşmadığı gibi yeme-içme anlamı da taşımamaktadır (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
      "Kulak ile boğaz arasında bir kanal bulunmaktadır. Ancak kulak zarı bu kanalı tıkadığından su boğaza ulaşmaz. Bu nedenle kulağın yıkattırılması orucu bozmaz. Ancak kulak zarının delik olması durumunda yıkama sırasında suyun mideye ulaşması mümkündür. Bu itibarla yıkama sırasında suyun mideye ulaşması hâlinde oruç bozulur (DİYK 22.09.2005 tarihli karar).",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Terlemek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Terlemek orucu bozar mı? Terlemek orucu bozmaz.",
  },
  {
    slug: "agiz-kokusu-spreyi-orucu-bozar-mi",
    kategori_kodu: "agiz_kokusu_spreyi",
    baslik: "Ağız Kokusu Spreyi Orucu Bozar Mı?",
    hukum: "mezhebe_gore_degiser",
    aciklama:
      "Ağız ve burundan alınıp mideye ulaşan her şey orucu bozar. Bu itibarla ağız kokusunu önlemek maksadıyla ağza sıkılan sprey ve benzeri maddeler yutulur da mideye ulaşırsa orucu bozar, yutulmazsa bozmaz. Ağız kokusunu gidermek için oruçluyken misvak veya diş fırçası tercih edilmelidir.",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Ağız Kokusu Spreyi Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Ağız spreyi orucu bozar mı? Yutulursa bozar, yutulmazsa bozmaz.",
  },
  {
    slug: "orucu-erken-acmak",
    kategori_kodu: "orucu_erken_acmak",
    baslik: "Orucu Erken Açmak (Vaktinden Önce) Ne Gerektirir?",
    hukum: "bozar",
    aciklama:
      "İftar vaktinden önce orucu açmak orucu bozar. Yanılarak veya saati yanlış hesaplayarak erken açılırsa kaza gerekir. Bilerek ve kasıtlı olarak iftar vaktinden önce oruç bozulursa hem kaza hem keffaret gerekir.",
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
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
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Ağlamak Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Ağlamak orucu bozar mı? Ağlamak orucu bozmaz.",
  },
  {
    slug: "opusmek-orucu-bozar-mi",
    kategori_kodu: "opusmek_opmek",
    baslik: "Öpüşmek / Eşini Öpmek Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Eşlerin birbirlerini öpmeleri veya sarılmalarıyla oruçları bozulmaz. Ancak bu durumda boşalma meydana gelirse oruç bozulur ve güne gün kaza gerekir (Merğînânî, el-Hidâye, II, 256). Oruçlu olan kimse orucun sevabını azaltacak şüpheli durumlardan da kaçınmalıdır.",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Öpüşmek Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Öpüşmek orucu bozar mı? Eşini öpmek tek başına orucu bozmaz ancak dikkat edilmelidir.",
  },
  {
    slug: "dedikodu-yapmak-orucu-bozar-mi",
    kategori_kodu: "dedikodu_yapmak",
    baslik: "Dedikodu Yapmak (Gıybet) Orucu Bozar Mı?",
    hukum: "bozmaz",
    aciklama:
      "Dedikodu (gıybet) yapmak orucu fıkhi olarak bozmaz, yani kaza veya keffaret gerektirmez. Ancak orucun sevabını büyük ölçüde azaltır. Hz. Peygamber (s.a.v.) 'Her kim yalan söylemeyi ve yalanla amel etmeyi bırakmazsa, o kimsenin yemesini içmesini bırakmasına Allah'ın hiçbir ihtiyacı yoktur' buyurmuştur (Buhârî, Savm, 8). Oruçlu olan kimsenin gıybet, kötü söz söylemek, kul hakkı yemek, harama bakmak gibi yasak davranışlardan da uzak durması gerekir.",
    kaynak_url: DIYANET_KAYNAK,
    seo_title: "Dedikodu Yapmak (Gıybet) Orucu Bozar Mı? - Diyanet Fetvası",
    seo_description:
      "Dedikodu yapmak orucu bozar mı? Gıybet orucu fıkhen bozmaz ancak sevabını büyük ölçüde azaltır.",
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
