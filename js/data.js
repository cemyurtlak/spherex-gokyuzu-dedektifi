/* =========================================================
   SPHEREx: Gökyüzü Dedektifi — OYUN VERİLERİ
   Hikâye, seviyeler, cisim kataloğu, nadirlik, rozetler.
   Yeni seviye/cisim eklemek için yalnızca bu dosyayı düzenle.
   ========================================================= */
window.SX = window.SX || {};

/* ---------- Nadirlik sırası (düşükten yükseğe) ---------- */
SX.RARITY = {
  normal:   { ad: 'Normal',   renk: '#b8c4d6', sira: 0 },
  nadir:    { ad: 'Nadir',    renk: '#4fc3f7', sira: 1 },
  destansi: { ad: 'Destansı', renk: '#b388ff', sira: 2 },
  efsanevi: { ad: 'Efsanevi', renk: '#ffb300', sira: 3 },
  gizemli:  { ad: 'Gizemli',  renk: '#00e5a0', sira: 4 },
  kaotik:   { ad: 'Kaotik',   renk: '#ff1f4b', sira: 5 }
};

/* ---------- Karakterler ---------- */
SX.KARAKTER = {
  oyuncu: { ad: '{isim}',      rol: '8. sınıf öğrencisi · Gökyüzü Dedektifi', avatar: 'oyuncu' },
  ada:    { ad: 'Dr. Ada Kaya', rol: 'SPHEREx bilim ekibi (kurgusal karakter)', avatar: 'ada' },
  piksel: { ad: 'PİKSEL',      rol: 'Yardımcı robot',                          avatar: 'piksel' },
  anlatici: { ad: 'Anlatıcı',   rol: '',                                        avatar: 'anlatici' }
};

/* ---------- Dalga boyu bilgisi ----------
   SPHEREx: 0.75–5.0 mikrometre arası 102 renk bandı */
SX.BAND = { min: 0.75, max: 5.0, adet: 102 };

/* ---------- Cisim kataloğu ----------
   profil: dalga boyuna göre parlaklık  = taban + kazanc * exp(-((λ-tepe)/genislik)^2)
   ikon: koleksiyon kartında çizilecek resim türü (ui.js -> ikonCiz) */
SX.CISIMLER = {
  asteroit: {
    ad: 'Ana Kuşak Asteroidi', nadirlik: 'normal', ikon: 'asteroit',
    profil: { taban: 0.85, kazanc: 0.25, tepe: 4.6, genislik: 0.8 },
    kisa: 'Mars ile Jüpiter arasında dolanan kayalık cisim.',
    bilgiler: [
      'Ana asteroit kuşağında bir milyondan fazla, 1 km\'den büyük asteroit olduğu tahmin ediliyor.',
      'Güneş etrafında dolandıkları için her taramada gökyüzünde farklı bir yerde görünürler.',
      'Kısa dalga boylarında Güneş ışığını yansıtır, uzun dalga boylarında kendi ısılarıyla parlarlar.'
    ]
  },
  nea: {
    ad: "Dünya'ya Yakın Asteroit", nadirlik: 'nadir', ikon: 'nea',
    profil: { taban: 0.9, kazanc: 0.3, tepe: 4.4, genislik: 0.9 },
    kisa: "Yörüngesi Dünya'nın yörüngesine yaklaşan hızlı asteroit.",
    bilgiler: [
      'Dünya\'ya yakın oldukları için gökyüzünde çok hızlı yer değiştirirler — taramalar arasında büyük sıçramalar yaparlar.',
      'NASA\'nın Gezegen Savunma programı bu cisimleri takip eder.',
      '2022\'de NASA\'nın DART aracı Dimorphos asteroidine çarparak yörüngesini değiştirmeyi başardı.'
    ]
  },
  kuyruklu: {
    ad: 'Kuyruklu Yıldız', nadirlik: 'nadir', ikon: 'kuyruklu',
    profil: { taban: 0.22, kazanc: 1.25, tepe: 4.26, genislik: 0.22 },
    kisa: 'Güneş\'e yaklaşınca buzları gaza dönüşen "kirli kartopu".',
    bilgiler: [
      'Kuyruk her zaman Güneş\'in tersi yönünü gösterir; çünkü Güneş rüzgârı gazı ve tozu iter.',
      'Karbondioksit (CO₂) gazı 4.3 mikrometre civarında parlar; SPHEREx bunu görebilir.',
      'Kuyruklu yıldızlar Güneş Sistemi\'nin oluştuğu dönemden kalma buzları taşır.'
    ]
  },
  kahverengi: {
    ad: 'Kahverengi Cüce', nadirlik: 'destansi', ikon: 'kahverengi',
    profil: { taban: 0.02, kazanc: 1.1, tepe: 4.5, genislik: 0.65 },
    kisa: 'Yıldız olamayacak kadar küçük, gezegen olamayacak kadar büyük "başarısız yıldız".',
    bilgiler: [
      'Çekirdeklerinde hidrojen füzyonunu sürdürecek kadar kütleleri yoktur.',
      'Çok soğuk oldukları için görünür ışıkta neredeyse karanlıktırlar; kızılötesinde parlarlar.',
      'Bize yakın olanlar yıllar içinde yıldızların önünde yavaşça kayar (öz hareket).'
    ]
  },
  supernova: {
    ad: 'Süpernova', nadirlik: 'destansi', ikon: 'supernova',
    profil: { taban: 0.9, kazanc: 0.2, tepe: 1.2, genislik: 1.0 },
    kisa: 'Dev bir yıldızın ömrünün sonunda patlaması.',
    bilgiler: [
      'Bir süpernova kısa süreliğine koca bir galaksi kadar parlak olabilir.',
      'Yer değiştirmez: bir taramada yoktur, sonrakinde aniden belirir, sonra yavaş yavaş söner.',
      'Vücudumuzdaki demir ve kalsiyum gibi elementlerin bir kısmı eski süpernovalarda oluştu.'
    ]
  },
  parcalar: {
    ad: 'Kopmuş Meteor Parçaları', nadirlik: 'efsanevi', ikon: 'parcalar',
    profil: { taban: 0.8, kazanc: 0.3, tepe: 4.5, genislik: 0.8 },
    kisa: 'Parçalanan bir asteroidin birlikte yol alan parçaları.',
    bilgiler: [
      'Asteroitler çarpışma ya da çok hızlı dönme yüzünden parçalanabilir.',
      'Parçalar aynı noktadan başlayıp farklı yönlere yavaşça dağılır.',
      'Bu parçaların bazıları zamanla Dünya\'ya meteor olarak düşebilir.'
    ]
  },
  kuiper: {
    ad: 'Kuiper Kuşağı Cismi', nadirlik: 'efsanevi', ikon: 'kuiper',
    profil: { taban: 0.5, kazanc: 0.5, tepe: 3.0, genislik: 0.5 },
    kisa: 'Neptün\'ün ötesinde dolaşan buzlu küçük dünya.',
    bilgiler: [
      'Pluto da bir Kuiper Kuşağı cismidir; 1930\'da Clyde Tombaugh tarafından "göz kırpma" yöntemiyle bulundu.',
      'Çok uzak oldukları için gökyüzünde çok yavaş hareket ederler.',
      'Yüzeylerindeki su buzu 3 mikrometre civarında ışığı soğurur.'
    ]
  },
  planetx: {
    ad: 'Planet X Adayı', nadirlik: 'kaotik', ikon: 'planetx',
    profil: { taban: 0.0, kazanc: 1.0, tepe: 4.65, genislik: 0.17 },
    kisa: 'Neptün\'ün çok ötesinde olduğu düşünülen varsayımsal dev gezegen.',
    bilgiler: [
      'Bazı uzak Kuiper cisimlerinin yörüngelerinin kümelenmesi, görünmeyen bir gezegenin çekimiyle açıklanmaya çalışılıyor.',
      'Bu gezegen ("Dokuzuncu Gezegen") gerçekte henüz bulunamadı — oyundaki aday kurgusaldır.',
      'Çok uzak ve sönük olduğu için aylar boyunca neredeyse hiç yer değiştirmez.'
    ]
  },
  /* ----- Aşama 2: daha fazla gezegen ve neredeyse hiç bilmediğimiz adaylar ----- */
  sedna: {
    ad: 'Sedna', nadirlik: 'efsanevi', ikon: 'sedna',
    profil: { taban: 0.45, kazanc: 0.65, tepe: 1.6, genislik: 0.7 },
    kisa: 'Güneş Sistemi\'nin en uzak ve en tuhaf yörüngeli cüce gezegenlerinden biri.',
    bilgiler: [
      '2003\'te keşfedildi. Güneş\'e en fazla yaklaştığında bile Neptün\'den iki kattan daha uzaktadır (yaklaşık 76 AU).',
      'Güneş etrafındaki bir turu 11.000 yıldan uzun sürer.',
      'Yüzeyi Güneş Sistemi\'ndeki en kırmızı yüzeylerden biridir; bu yüzden kısa dalga boylarında daha parlak görünür.'
    ]
  },
  gezegeny: {
    ad: 'Gezegen Y', nadirlik: 'kaotik', ikon: 'gezegeny',
    profil: { taban: 0.0, kazanc: 1.0, tepe: 1.12, genislik: 0.2 },
    kisa: 'Kuiper Kuşağı\'nı eğdiği düşünülen, Merkür–Dünya büyüklüğünde varsayımsal gezegen.',
    bilgiler: [
      '2025\'te bazı gökbilimciler, uzak Kuiper cisimlerinin ortalama düzleminin hafifçe eğik olduğunu ve bunu görünmeyen bir gezegenin yapabileceğini öne sürdü.',
      'Planet X\'ten farklıdır: daha küçük ve daha yakın olduğu düşünülür. Henüz bulunamadı — oyundaki aday kurgusaldır.',
      'Küçük ve buzlu bir dünya ısı yaymaz, yalnızca Güneş ışığını yansıtır; bu yüzden kısa dalga boylarında aranır.'
    ]
  },
  karadelik: {
    ad: 'İlkel Kara Delik Adayı', nadirlik: 'kaotik', ikon: 'karadelik',
    profil: { taban: 1.0, kazanc: 0, tepe: 2, genislik: 1 },
    kisa: 'Planet X\'in aslında greyfurt büyüklüğünde bir kara delik olabileceği fikri.',
    bilgiler: [
      '2019\'da bazı fizikçiler, Planet X\'in etkisini birkaç Dünya kütlesinde ama yalnızca birkaç santimetre büyüklüğünde bir "ilkel kara delik"in yapabileceğini öne sürdü.',
      'İlkel kara deliklerin evrenin ilk anlarında oluştuğu düşünülür; varlıkları henüz kanıtlanmadı.',
      'Kara delik ışık yaymaz ama arkasındaki yıldızların ışığını büker (kütleçekim merceği): yıldızlar halka şeklinde yana kayar ve parlar.'
    ]
  },
  tyche: {
    ad: 'Tyche', nadirlik: 'kaotik', ikon: 'tyche',
    profil: { taban: 0.03, kazanc: 1.0, tepe: 4.4, genislik: 0.22 },
    kisa: 'Oort Bulutu\'nda olduğu düşünülmüş, Jüpiter\'den büyük varsayımsal dev gezegen.',
    bilgiler: [
      'Bazı kuyruklu yıldızların geliş yönlerini açıklamak için Oort Bulutu\'nda dev bir gezegen olabileceği öne sürüldü.',
      '2014\'te NASA\'nın WISE teleskobunun verileri, yakın çevremizde böyle büyük bir gezegen olmadığını gösterdi. Oyundaki sinyal kurgusaldır.',
      'Oort Bulutu, Güneş\'ten on binlerce AU uzağa kadar uzanan dev bir buzlu cisim bulutudur.'
    ]
  },
  /* ----- Gizli (bonus) cisimler ----- */
  ufo: {
    ad: 'Uzaylı Gözcü Gemisi', nadirlik: 'gizemli', ikon: 'ufo', gizli: true,
    profil: { taban: 1.0, kazanc: 0, tepe: 2, genislik: 1 },
    kisa: 'Tyche görevinde verilerimizi bozan gizemli gemi (tamamen kurgusal!).',
    bilgiler: [
      'Bu cisim tamamen kurgusaldır: hiçbir teleskop şimdiye kadar bir uzaylı gemisi görmedi.',
      'Bilim insanları SETI gibi projelerle uzaydan gelebilecek yapay radyo sinyallerini arıyor.',
      'Gökyüzü görüntülerindeki tuhaf izlerin çoğu uydu, uçak, kozmik ışın ya da kamera hatasıdır.'
    ]
  },
  uydu: {
    ad: 'Yapay Uydu İzi', nadirlik: 'normal', ikon: 'uydu', gizli: true,
    profil: { taban: 1.0, kazanc: 0, tepe: 2, genislik: 1 },
    kisa: 'Teleskobun önünden geçen bir uydunun bıraktığı çizgi.',
    bilgiler: [
      'Dünya yörüngesinde binlerce uydu var; gökbilimcilerin görüntülerinde çizgi olarak belirirler.',
      'Yalnızca tek bir taramada görünürler ve çok uzun bir iz bırakırlar.',
      'Bilim insanları bu izleri "gerçek" cisimlerle karıştırmamak için ayıklar.'
    ]
  },
  yildizlararasi: {
    ad: 'Yıldızlararası Ziyaretçi', nadirlik: 'gizemli', ikon: 'yildizlararasi', gizli: true,
    profil: { taban: 0.0, kazanc: 1.0, tepe: 2.1, genislik: 0.22 },
    kisa: 'Başka bir yıldız sisteminden gelip Güneş Sistemi\'nden geçen cisim.',
    bilgiler: [
      'Şimdiye kadar bilinen üç yıldızlararası ziyaretçi var: ʻOumuamua (2017), Borisov (2019) ve 3I/ATLAS (2025).',
      'Çok hızlı geçtikleri için yalnızca kısa bir süre görülebilirler.',
      'Bu oyunda yalnızca tek bir taramada ve dar bir dalga boyu aralığında görünür.'
    ]
  },
  yetim: {
    ad: 'Yetim Gezegen', nadirlik: 'gizemli', ikon: 'yetim', gizli: true,
    profil: { taban: 0.0, kazanc: 1.0, tepe: 4.9, genislik: 0.13 },
    kisa: 'Hiçbir yıldıza bağlı olmadan uzayda tek başına dolaşan gezegen.',
    bilgiler: [
      'Genç yıldız sistemlerinden fırlatılmış olabilirler.',
      'Bir yıldız tarafından ısıtılmadıkları için yalnızca kızılötesinde, kendi iç ısılarıyla hafifçe parlarlar.',
      'Samanyolu\'nda yıldızlardan daha fazla yetim gezegen olabileceği düşünülüyor.'
    ]
  },
  mikromercek: {
    ad: 'Kütleçekim Merceği Parlaması', nadirlik: 'kaotik', ikon: 'mikromercek', gizli: true,
    profil: { taban: 1.0, kazanc: 0, tepe: 2, genislik: 1 },
    kisa: 'Önden geçen görünmez bir cismin, arkadaki yıldızın ışığını bükerek büyütmesi.',
    bilgiler: [
      'Einstein\'ın genel görelilik kuramına göre kütle, ışığın yolunu büker.',
      'Önden bir cisim geçerken arkadaki yıldız kısa bir süre birkaç kat parlar, sonra eski hâline döner.',
      'Bu olay yalnızca tam o taramanın anında görülür — kaçırırsan bir daha yakalayamazsın!'
    ]
  }
};

/* Koleksiyonda gösterim sırası */
SX.KOLEKSIYON_SIRASI = ['asteroit', 'uydu', 'nea', 'kuyruklu', 'kahverengi', 'supernova',
  'parcalar', 'kuiper', 'sedna', 'yildizlararasi', 'yetim', 'ufo', 'planetx', 'mikromercek',
  'gezegeny', 'karadelik', 'tyche'];

/* ---------- Gizli cisimlerin çıkma kuralları ----------
   seviyeler: hangi seviyelerde çıkabilir, sans: çıkma olasılığı */
SX.GIZLI_KURAL = {
  uydu:           { seviyeler: [1, 2, 3], sans: 0.65 },
  yildizlararasi: { seviyeler: [3, 5, 6, 7, 9, 11], sans: 0.38 },
  yetim:          { seviyeler: [4, 6, 7, 8, 9, 10], sans: 0.38 },
  mikromercek:    { seviyeler: [5, 7, 8, 9, 10, 12], sans: 0.32 }
};

/* ---------- Seviyeler ---------- */
SX.SEVIYELER = [
  {
    no: 1, baslik: 'İlk Sinyal', altBaslik: 'Asteroit kuşağından bir gezgin',
    hedef: 'asteroit', taramaSayisi: 4, yildizSayisi: 900,
    hareket: { tur: 'dogrusal', hiz: [9, 12], parlaklik: 0.9, boyut: 1.15 },
    degisenYildiz: 0, bilinenAsteroit: 0,
    sahne: 'giris', baslangicBandi: 1.6,
    gorev: 'Zaman çubuğunu sağa kaydır. Taramalar arasında yer değiştiren cismi bul ve üzerine tıkla.',
    ipucu: 'Göz Kırpma (Blink) düğmesine bas: ilk tarama ile şimdiki tarama arasında hızla geçiş yapar. Zıplayan noktayı ara!',
    soru: {
      metin: 'Bu cisim her taramada biraz yer değiştirdi ve tüm dalga boylarında görünüyor. Ne olabilir?',
      secenekler: ['Ana Kuşak Asteroidi', 'Sabit bir yıldız', 'Uzak bir galaksi'],
      dogru: 0,
      aciklama: 'Yıldızlar ve galaksiler o kadar uzaktır ki birkaç yılda yerleri değişmez. Güneş Sistemi\'ndeki asteroitler ise Güneş etrafında dolandıkları için her taramada farklı yerdedir.'
    },
    rozet: { ad: 'İlk Işık', aciklama: 'İlk hareketli cismini buldun.' }
  },
  {
    no: 2, baslik: 'Hızlı Gezgin', altBaslik: 'Gezegen savunması göreve!',
    hedef: 'nea', taramaSayisi: 4, yildizSayisi: 1100,
    hareket: { tur: 'dogrusal', hiz: [26, 34], parlaklik: 0.9, boyut: 1.1 },
    degisenYildiz: 3, bilinenAsteroit: 0,
    sahne: 'nea', baslangicBandi: 1.6,
    gorev: 'Bu cisim çok hızlı! Taramalar arasında büyük sıçramalar yapan noktayı bul.',
    ipucu: 'Değişen yıldızlar parlayıp söner ama yerleri hep aynıdır. Yer değiştiren cismi ara.',
    soru: {
      metin: 'Cisim taramalar arasında çok büyük sıçramalar yaptı. Ne olabilir?',
      secenekler: ['Kuiper Kuşağı cismi', "Dünya'ya Yakın Asteroit", 'Kuyruklu yıldız'],
      dogru: 1,
      aciklama: 'Bize ne kadar yakınsa gökyüzünde o kadar hızlı hareket ediyor gibi görünür — tıpkı otoyoldaki yakın arabaların uzaktaki dağlardan hızlı geçmesi gibi. Kuiper cisimleri çok yavaş olurdu, kuyruklu yıldızın da kuyruğu olurdu.'
    },
    rozet: { ad: 'Hız Avcısı', aciklama: "Dünya'ya yakın bir asteroidi yakaladın." }
  },
  {
    no: 3, baslik: 'Buzlu Ziyaretçi', altBaslik: 'Güneş\'e yaklaşan kirli kartopu',
    hedef: 'kuyruklu', taramaSayisi: 5, yildizSayisi: 1100,
    hareket: { tur: 'kuyruklu', hiz: [8, 10], parlaklik: 0.95, boyut: 1.2 },
    degisenYildiz: 3, bilinenAsteroit: 0,
    sahne: 'kuyruklu', baslangicBandi: 1.6,
    gorev: 'Kuyruklu yıldız kısa dalga boylarında çok sönük. Dalga boyunu 4.3 µm civarına getir ve hareket eden kuyruklu cismi bul.',
    ipucu: 'Dalga boyu kaydırıcısını 4.2–4.3 µm arasına getir: karbondioksit gazı orada parlar.',
    soru: {
      metin: 'Cismin kuyruğu var ve 4.3 µm\'de çok parlak. Ne olabilir?',
      secenekler: ['Süpernova', 'Kahverengi cüce', 'Kuyruklu Yıldız'],
      dogru: 2,
      aciklama: 'Kuyruklu yıldızların buzları Güneş\'e yaklaşınca gaza dönüşür. CO₂ gazı 4.3 µm\'de parlar; kuyruk da Güneş\'in tersine doğru uzanır.'
    },
    rozet: { ad: 'Buz Kâşifi', aciklama: 'Bir kuyruklu yıldızın gazını kızılötesinde gördün.' }
  },
  {
    no: 4, baslik: 'Soğuk Komşu', altBaslik: 'Başarısız yıldızın izinde',
    hedef: 'kahverengi', taramaSayisi: 5, yildizSayisi: 1300,
    hareket: { tur: 'dogrusal', hiz: [3.2, 4.2], parlaklik: 0.85, boyut: 1.15 },
    degisenYildiz: 3, bilinenAsteroit: 0,
    sahne: 'kahverengi', baslangicBandi: 1.2,
    gorev: 'Kahverengi cüce kısa dalga boylarında görünmez. Uzun dalga boylarına geç ve yavaşça kayan cismi bul.',
    ipucu: 'Dalga boyunu 3.8 µm\'nin üstüne çıkar. Sıcak yıldızlar sönükleşir, soğuk cüce parlar!',
    soru: {
      metin: 'Cisim sadece uzun kızılötesi dalga boylarında görünüyor ve çok az yer değiştiriyor. Ne olabilir?',
      secenekler: ['Kahverengi Cüce', 'Ana kuşak asteroidi', 'Beyaz cüce'],
      dogru: 0,
      aciklama: 'Kahverengi cüceler çok soğuktur (birkaç yüz derece). Soğuk cisimler ışıklarının çoğunu uzun dalga boylarında yayar. Yakın oldukları için yıllar içinde yavaşça kayarlar.'
    },
    rozet: { ad: 'Soğuk Işık', aciklama: 'Kızılötesinde gizlenen bir kahverengi cüce buldun.' }
  },
  {
    no: 5, baslik: 'Yıldız Patlaması', altBaslik: 'Uzak bir galakside dev bir ışık',
    hedef: 'supernova', taramaSayisi: 5, yildizSayisi: 1300,
    hareket: { tur: 'supernova', parlaklik: 1.0, boyut: 1.3 },
    degisenYildiz: 7, bilinenAsteroit: 0,
    sahne: 'supernova', baslangicBandi: 1.6,
    gorev: 'Bu sefer cisim hareket etmiyor! İlk taramalarda olmayan, sonra aniden beliren ışığı bul.',
    ipucu: 'Göz Kırpma ile ilk taramaya bak: orada hiç olmayan bir nokta var mı? Değişen yıldızlar ilk taramada da vardır.',
    soru: {
      metin: 'Cisim önce yoktu, aniden belirdi ve yavaş yavaş sönüyor. Yeri hiç değişmedi. Ne olabilir?',
      secenekler: ['Asteroit', 'Süpernova', 'Kuyruklu yıldız'],
      dogru: 1,
      aciklama: 'Süpernovalar çok uzak galaksilerde olur, bu yüzden yer değiştirmez. Patlamayla aniden parlar, sonra haftalar ve aylar içinde söner.'
    },
    rozet: { ad: 'Patlama Tanığı', aciklama: 'Bir süpernovanın doğuşuna tanık oldun.' }
  },
  {
    no: 6, baslik: 'Kopmuş Parçalar', altBaslik: 'Bir asteroit parçalanıyor!',
    hedef: 'parcalar', taramaSayisi: 5, yildizSayisi: 1400,
    hareket: { tur: 'parcalar', hiz: [7, 9], parlaklik: 0.8, boyut: 1.0, parcaSayisi: 5 },
    degisenYildiz: 4, bilinenAsteroit: 1,
    sahne: 'parcalar', baslangicBandi: 1.6,
    gorev: 'Bir asteroit taramalar arasında parçalara ayrılıyor. Dağılan parçalardan birini bul!',
    ipucu: 'Yeşil etiketli cisim zaten bilinen bir asteroit — o yeni değil! Bir noktadan birden fazla parçaya ayrılan cismi ara.',
    soru: {
      metin: 'Tek bir cisim birkaç parçaya ayrıldı ve parçalar farklı yönlere dağılıyor. Ne olabilir?',
      secenekler: ['Süpernova', 'Değişen yıldız', 'Kopmuş Meteor Parçaları'],
      dogru: 2,
      aciklama: 'Asteroitler bir çarpışma ya da çok hızlı dönme sonucu parçalanabilir. Parçalar aynı noktadan farklı yönlere dağılır ve zamanla meteor yağmurlarına kaynak olabilir.'
    },
    rozet: { ad: 'Parça Dedektifi', aciklama: 'Parçalanan bir asteroidin izini sürdün.' }
  },
  {
    no: 7, baslik: 'Donmuş Sınır', altBaslik: 'Neptün\'ün ötesindeki buzlu dünyalar',
    hedef: 'kuiper', taramaSayisi: 6, yildizSayisi: 1600,
    hareket: { tur: 'dogrusal', hiz: [1.7, 2.3], parlaklik: 0.62, boyut: 0.95 },
    degisenYildiz: 5, bilinenAsteroit: 2,
    sahne: 'kuiper', baslangicBandi: 1.6,
    gorev: 'Kuiper cisimleri çok uzakta ve çok yavaş. Yakınlaştır (fare tekerleği), Göz Kırpma kullan ve çok az kayan sönük cismi bul.',
    ipucu: 'Fare tekerleğiyle yakınlaştır, sürükleyerek gökyüzünde gez. Göz Kırpma\'da sadece birkaç piksel oynayan bir nokta ara.',
    soru: {
      metin: 'Cisim çok sönük ve 3 yılda sadece çok az yer değiştirdi. Ne olabilir?',
      secenekler: ["Dünya'ya yakın asteroit", 'Kuiper Kuşağı Cismi', 'Değişen yıldız'],
      dogru: 1,
      aciklama: 'Kuiper Kuşağı, Neptün\'ün ötesindedir — Dünya\'nın Güneş\'e uzaklığının 30–50 katı. Bu kadar uzaktaki cisimler gökyüzünde çok yavaş hareket ediyor gibi görünür.'
    },
    rozet: { ad: 'Sınır Bekçisi', aciklama: 'Güneş Sistemi\'nin donmuş sınırında bir dünya buldun.' }
  },
  {
    no: 8, baslik: 'Planet X', altBaslik: 'Görünmeyen devin peşinde',
    hedef: 'planetx', taramaSayisi: 6, yildizSayisi: 1800,
    hareket: { tur: 'dogrusal', hiz: [1.0, 1.3], parlaklik: 0.72, boyut: 0.95 },
    degisenYildiz: 6, bilinenAsteroit: 3,
    sahne: 'planetx', baslangicBandi: 1.6,
    gorev: 'Planet X yalnızca 4.6 µm civarında, çok dar bir aralıkta görünür ve neredeyse hiç kıpırdamaz. Bilinen asteroitlere aldanma!',
    ipucu: 'Dalga boyunu 4.55–4.75 µm arasına getir. Sonra yakınlaştır ve Göz Kırpma ile çok yavaş kayan, etiketsiz cismi ara.',
    soru: {
      metin: 'Cisim etiketsiz, sadece 4.6 µm civarında görünüyor ve yıllar içinde çok çok az yer değiştiriyor. Ne olabilir?',
      secenekler: ['Ana kuşak asteroidi', 'Sabit bir yıldız', 'Planet X Adayı'],
      dogru: 2,
      aciklama: 'Neptün\'ün çok ötesindeki dev bir gezegen çok yavaş hareket eder ve Güneş\'ten çok az ışık alır. Soğuk dev gezegenler, iç ısılarını 4–5 µm civarındaki bir "pencereden" yayabilir.'
    },
    rozet: { ad: 'Planet X Avcısı', aciklama: 'Bir Planet X adayı buldun!' }
  },
  /* ===== Aşama 2: yeni seviyeler ===== */
  {
    no: 9, baslik: 'Sedna\'nın Yolu', altBaslik: '11.000 yıllık yörüngedeki kırmızı dünya',
    hedef: 'sedna', taramaSayisi: 6, yildizSayisi: 1700,
    hareket: { tur: 'dogrusal', hiz: [1.5, 2.0], parlaklik: 0.8, boyut: 1.0 },
    degisenYildiz: 5, bilinenAsteroit: 2,
    sahne: 'sedna', baslangicBandi: 3.2,
    gorev: 'Sedna çok kırmızı: kısa dalga boylarında daha parlak. Dalga boyunu 1–2 µm arasına getir ve çok yavaş kayan cismi bul.',
    ipucu: 'Dalga boyunu 1.6 µm civarına çek. Uzun dalga boyunda toz bulutları Sedna\'yı gizliyor. Yakınlaştır ve Büyüteç (L) kullan.',
    soru: {
      metin: 'Cisim çok yavaş hareket ediyor, kısa dalga boylarında daha parlak ve yörüngesi çok uzun. Ne olabilir?',
      secenekler: ['Sedna benzeri uzak cüce gezegen', "Dünya'ya yakın asteroit", 'Süpernova'],
      dogru: 0,
      aciklama: 'Sedna Güneş\'ten çok uzaktadır, bu yüzden çok yavaş görünür. Yüzeyindeki "tolin" denen organik maddeler onu çok kırmızı yapar.'
    },
    rozet: { ad: 'Uzak Gezgin', aciklama: 'Güneş Sistemi\'nin en uzak dünyalarından birini buldun.' }
  },
  {
    no: 10, baslik: 'Eğik Kuşak', altBaslik: 'Gezegen Y\'nin izinde',
    hedef: 'gezegeny', taramaSayisi: 6, yildizSayisi: 1900,
    hareket: { tur: 'dogrusal', hiz: [1.2, 1.6], parlaklik: 0.8, boyut: 0.95 },
    degisenYildiz: 6, bilinenAsteroit: 3,
    sahne: 'gezegeny', baslangicBandi: 3.0,
    gorev: 'Gezegen Y yalnızca en kısa dalga boylarında (0.9–1.35 µm) görünür ve çok yavaş hareket eder. Sıcak yıldızlar orada çok parlak — dikkat!',
    ipucu: 'Dalga boyunu 1.1 µm civarına getir. Göz Kırpma ile bilinen asteroitler dışında yavaşça kayan, etiketsiz noktayı ara.',
    soru: {
      metin: 'Cisim etiketsiz, çok yavaş ve yalnızca 1 µm civarında görünüyor. Ne olabilir?',
      secenekler: ['Kahverengi cüce', 'Gezegen Y adayı', 'Kuyruklu yıldız'],
      dogru: 1,
      aciklama: 'Kahverengi cüceler uzun dalga boyunda parlar. Küçük, buzlu ve soğuk bir gezegen ise ısı yaymaz; yalnızca Güneş ışığını yansıttığı için kısa dalga boylarında görünür.'
    },
    rozet: { ad: 'Eğik Dünya Avcısı', aciklama: 'Kuiper Kuşağı\'nı eğen gezegenin adayını buldun.' }
  },
  {
    no: 11, baslik: 'Karanlık Çekim', altBaslik: 'Görünmeyeni yıldızların dansıyla bul',
    hedef: 'karadelik', taramaSayisi: 6, yildizSayisi: 2600,
    hareket: { tur: 'mercek', hiz: [1.4, 1.9], parlaklik: 1.0, boyut: 1.0 },
    degisenYildiz: 6, bilinenAsteroit: 2,
    sahne: 'karadelik', baslangicBandi: 1.6,
    gorev: 'Kara delik görünmez! Ama arkasındaki yıldızlar halka gibi yana kayıp parlıyor ve bu halka taramalar arasında yavaşça ilerliyor. Halkanın merkezine tıkla.',
    ipucu: 'Göz Kırpma\'yı aç: bir bölgede yıldızlar bir halkanın etrafında itilip parlıyor. Halka yer değiştiriyor — merkezindeki boşluğa tıkla.',
    soru: {
      metin: 'Orada hiçbir şey görünmüyor ama etrafındaki yıldızların ışığı bükülüyor ve bu bölge yavaşça hareket ediyor. Ne olabilir?',
      secenekler: ['Boş bir bölge', 'Değişen yıldız', 'İlkel kara delik adayı'],
      dogru: 2,
      aciklama: 'Kütle ışığın yolunu büker (genel görelilik). Görünmeyen ama kütleli bir cisim, arkasındaki yıldızları halka şeklinde yana kaydırır ve parlatır. Buna kütleçekim merceği denir.'
    },
    rozet: { ad: 'Karanlık Avcı', aciklama: 'Görünmeyen bir kara delik adayını ışığın bükülmesinden buldun.' }
  },
  {
    no: 12, baslik: 'Kaos Bulutu', altBaslik: 'Tyche ve uzaylı gözcüler',
    hedef: 'tyche', taramaSayisi: 6, yildizSayisi: 2000,
    hareket: { tur: 'dogrusal', hiz: [0.9, 1.2], parlaklik: 0.8, boyut: 1.0 },
    degisenYildiz: 6, bilinenAsteroit: 3, uzayli: true,
    sahne: 'tyche', baslangicBandi: 1.6,
    gorev: 'Tyche yalnızca 4.2–4.6 µm arasında görünür ve neredeyse hiç kıpırdamaz. UZAYLI GEMİLERİ verilerini bozacak — gelince üzerlerine tıklayıp kovala!',
    ipucu: 'Dalga boyunu 4.4 µm\'ye getir. Uzaylı gemisi görünce hemen üzerine tıkla: kovalarsan bir hatan silinir. Sahte cisimlere (uzaylı tuzakları) dikkat!',
    soru: {
      metin: 'Cisim etiketsiz, 4.4 µm civarında hafifçe parlıyor ve 3 yılda çok az yer değiştirdi. Ne olabilir?',
      secenekler: ['Uzaylı tuzağı', 'Tyche adayı', 'Ana kuşak asteroidi'],
      dogru: 1,
      aciklama: 'Oort Bulutu\'ndaki dev bir gezegen çok uzak olduğu için neredeyse hiç kıpırdamaz. Uzaylı tuzakları ise taramalar arasında rastgele zıplar ve kısa sürede kaybolur.'
    },
    rozet: { ad: 'Kaos Fatihi', aciklama: 'En zor görevi tamamladın: uzaylılara rağmen Tyche adayını buldun!' }
  }
];

/* ---------- Ek rozetler (gizli cisimler ve başarılar) ---------- */
SX.EK_ROZETLER = [
  { id: 'r_uydu', ad: 'Çizgi Avcısı', cisim: 'uydu', aciklama: 'Bir uydu izini yakaladın.' },
  { id: 'r_yildizlararasi', ad: 'Yıldızlararası Yolcu', cisim: 'yildizlararasi', aciklama: 'Başka bir yıldız sisteminden gelen ziyaretçiyi buldun.' },
  { id: 'r_yetim', ad: 'Karanlık Gezgin', cisim: 'yetim', aciklama: 'Yıldızsız dolaşan bir yetim gezegen buldun.' },
  { id: 'r_mikromercek', ad: 'Işık Bükücü', cisim: 'mikromercek', aciklama: 'Kütleçekim merceği parlamasını tam anında yakaladın.' },
  { id: 'r_ufo', ad: 'Uzaylı Kovucu', cisim: 'ufo', aciklama: 'Verilerini bozmaya çalışan bir uzaylı gemisini kovaladın.' },
  { id: 'r_kusursuz', ad: 'Kusursuz Göz', ozel: 'kusursuz', aciklama: 'Tüm seviyeleri 3 yıldızla bitir.' },
  { id: 'r_tam', ad: 'SPHEREx Ustası', ozel: 'tam', aciklama: 'Koleksiyondaki 17 cismin hepsini bul.' }
];

/* ---------- Tarama tarihleri (her 6 ayda bir tüm gökyüzü) ---------- */
SX.taramaEtiketi = function (i) {
  var aylar = ['Mayıs', 'Kasım'];
  var yil = 2025 + Math.floor(i / 2);
  return 'Tarama ' + (i + 1) + ' · ' + aylar[i % 2] + ' ' + yil;
};

/* ---------- Hikâye diyalogları ----------
   kim: oyuncu | ada | piksel | anlatici
   {isim} oyuncunun adıyla değiştirilir */
SX.HIKAYE = {
  giris: [
    { kim: 'anlatici', metin: 'Antalya, Saklıkent. Gece yarısı. 8. sınıf öğrencisi {isim}, okulun astronomi kulübüyle gözlem kampında.' },
    { kim: 'oyuncu', metin: 'PİKSEL, şu gökyüzüne bak! Milyarlarca yıldız... Hangisinin hareket ettiğini nasıl anlayacağız ki?' },
    { kim: 'piksel', metin: 'Bip! Yeni bir mesaj var. Gönderen: NASA — SPHEREx Bilim Ekibi. Bip bop!' },
    { kim: 'ada', metin: 'Merhaba {isim}! Ben Dr. Ada Kaya. SPHEREx teleskobumuz 2025\'ten beri tüm gökyüzünü her 6 ayda bir, 102 farklı kızılötesi renkte haritalıyor.' },
    { kim: 'ada', metin: 'Görüntülerde bir milyardan fazla cisim var. Yer değiştirenleri tek başımıza bulamayız. Gökyüzü Dedektifleri ekibine katılır mısın?' },
    { kim: 'oyuncu', metin: 'Katılmak mı? Tabii ki! Nereden başlıyoruz?' },
    { kim: 'ada', metin: 'Kolay bir görevle: asteroit kuşağından bir kaya. Alttaki İLERLEME çubuğunu kaydır, tarama ışınını izle ve yer değiştiren cismi bul!' }
  ],
  nea: [
    { kim: 'piksel', metin: 'Alarm! Alarm! Dünya\'ya yakın bir cisim tespit ettim. Çok hızlı ilerliyor!' },
    { kim: 'ada', metin: 'Dünya\'ya Yakın Asteroitler gökyüzünde büyük sıçramalar yapar. Onları takip etmek gezegenimizi korumak için çok önemli.' },
    { kim: 'oyuncu', metin: 'Yani gezegen savunması! Bu sefer gözümü dört açacağım.' }
  ],
  kuyruklu: [
    { kim: 'ada', metin: 'Güneş\'e yaklaşan buzlu bir ziyaretçi var. Kuyruklu yıldızların buzları ısınınca gaza dönüşür.' },
    { kim: 'ada', metin: 'SPHEREx\'in süper gücü: 102 renk! Karbondioksit gazı 4.3 mikrometrede parlar. Sağdaki dalga boyu kaydırıcısını oraya getir.' },
    { kim: 'piksel', metin: 'İpucu: Kuyruk her zaman Güneş\'in tersini gösterir. Bip!' }
  ],
  kahverengi: [
    { kim: 'ada', metin: 'Bazı cisimler yıldız olamayacak kadar küçük, gezegen olamayacak kadar büyüktür: kahverengi cüceler.' },
    { kim: 'ada', metin: 'Çok soğuk oldukları için görünür ışıkta neredeyse karanlıktırlar. Ama uzun kızılötesi dalga boylarında parlarlar.' },
    { kim: 'oyuncu', metin: 'Yani dalga boyunu uzun tarafa çekersem ortaya mı çıkar?' },
    { kim: 'piksel', metin: 'Aynen öyle! Kısa dalga boyunda ararsan sabaha kadar bulamazsın. Bip bop.' }
  ],
  supernova: [
    { kim: 'ada', metin: 'Milyonlarca ışık yılı uzaktaki bir galakside dev bir yıldız ömrünü tamamladı ve patladı: süpernova!' },
    { kim: 'ada', metin: 'Bu sefer cisim hareket etmiyor. Bir taramada yok, sonraki taramada aniden var. Sonra da yavaş yavaş sönüyor.' },
    { kim: 'piksel', metin: 'Değişen yıldızlara dikkat! Onlar da parlayıp söner ama ilk taramadan beri oradadırlar.' }
  ],
  parcalar: [
    { kim: 'piksel', metin: 'Acil durum! Bir asteroit parçalanıyor! Bip bip bip!' },
    { kim: 'ada', metin: 'Asteroitler çarpışma ya da çok hızlı dönme yüzünden kopabilir. Parçalar aynı noktadan farklı yönlere dağılır.' },
    { kim: 'oyuncu', metin: 'Kopmuş meteor parçaları... Onları yakalamalıyım!' },
    { kim: 'ada', metin: 'Dikkat: yeşil etiketli cisimler zaten kataloğumuzda olan bilinen asteroitler. Yeni olanı bul!' }
  ],
  kuiper: [
    { kim: 'ada', metin: 'Neptün\'ün ötesinde, Kuiper Kuşağı\'nda buzlu dünyalar dolaşır. Çok uzak oldukları için çok yavaş hareket ederler.' },
    { kim: 'ada', metin: 'Garip bir şey var {isim}: Bazı uzak Kuiper cisimlerinin yörüngeleri aynı yöne kümelenmiş gibi. Sanki görünmeyen dev bir şey onları çekiyor...' },
    { kim: 'oyuncu', metin: 'Görünmeyen dev bir şey mi? Yoksa...' },
    { kim: 'piksel', metin: 'Önce bu buzlu cismi bul. Yakınlaştırmayı kullan! Bip.' }
  ],
  planetx: [
    { kim: 'ada', metin: 'Gökbilimciler yıllardır bir fikri tartışıyor: Neptün\'ün çok ötesinde, Dünya\'dan birkaç kat büyük, henüz bulunamamış bir gezegen. Ona "Planet X" diyoruz.' },
    { kim: 'ada', metin: 'O kadar uzak ki neredeyse hiç kıpırdamaz. Çok sönüktür ve yalnızca 4.6 mikrometre civarında görünür. Bilinen asteroitler seni yanıltabilir.' },
    { kim: 'oyuncu', metin: 'Bu en zor görev... ama hazırım.' },
    { kim: 'piksel', metin: 'KAOTİK seviye tespit edildi. Bol şans dedektif! Bip bip biiip!' }
  ],
  sedna: [
    { kim: 'ada', metin: 'Planet X adayını NASA\'ya bildirdik {isim}. Ama veriler çok daha tuhaf şeyler gösteriyor...' },
    { kim: 'ada', metin: 'Önce Sedna gibi uzak bir cüce gezegenle ısınalım. Sedna Güneş\'e en fazla 76 AU yaklaşır ve tek turu 11.000 yıldan uzun sürer.' },
    { kim: 'piksel', metin: 'Kırmızımsı ve çok yavaş! Kısa dalga boyunda ara. Yeni Büyüteç aracını da dene: L tuşu! Bip.' }
  ],
  gezegeny: [
    { kim: 'ada', metin: '2025\'te bazı gökbilimciler bir fikir ortaya attı: Kuiper Kuşağı\'nın düzlemi hafifçe eğilmiş. Bunu görünmeyen küçük bir gezegen yapıyor olabilir: Gezegen Y.' },
    { kim: 'ada', metin: 'Küçük ve buzlu olduğu için ısı yaymaz, yalnızca Güneş ışığını yansıtır. Onu en kısa dalga boylarında, 1 mikrometre civarında ara.' },
    { kim: 'oyuncu', metin: 'Kaotik seviye... Kısa dalga boyunda sıcak yıldızlar çok parlak, işim zor!' },
    { kim: 'piksel', metin: 'Neredeyse hiç bilmediğimiz bir dünya. Bulursan tarih yazarsın! Bip bop.' }
  ],
  karadelik: [
    { kim: 'ada', metin: 'Bazı fizikçiler daha da çılgın bir fikir öne sürdü: Planet X aslında bir gezegen değil, greyfurt büyüklüğünde bir ilkel kara delik olabilir!' },
    { kim: 'ada', metin: 'Kara delik ışık yaymaz, onu göremezsin. Ama arkasındaki yıldızların ışığını büker: yıldızlar halka şeklinde yana kayar ve parlar.' },
    { kim: 'oyuncu', metin: 'Yani görünmeyen bir şeyi, etrafındaki yıldızların davranışından bulacağım...' },
    { kim: 'piksel', metin: 'Aynen! Yıldızların dansını izle, halkanın tam merkezine tıkla. Bip!' }
  ],
  tyche: [
    { kim: 'ada', metin: 'Son görev {isim}. Bir zamanlar Oort Bulutu\'nda, Jüpiter\'den büyük bir dev olabileceği düşünülmüştü: Tyche.' },
    { kim: 'ada', metin: 'WISE teleskobu onu bulamadı. Ama SPHEREx verilerinde tuhaf bir sinyal var... ve birileri verilerimize karışıyor!' },
    { kim: 'piksel', metin: 'UYARI! UYARI! Tanımlanamayan uçan cisimler! Veri akışını bozuyorlar! Biiiiip!' },
    { kim: 'ada', metin: 'Uzaylı gemisi belirince hemen üzerine tıkla ve kovala! Yoksa ekranını parazitle bozar, sahte cisimler bırakır, dalga boyunu değiştirir ya da bir bölgeyi karartır.' },
    { kim: 'oyuncu', metin: 'Hem Tyche\'yi bulacağım hem de uzaylıları kovalayacağım. Hadi bakalım!' }
  ],
  final: [
    { kim: 'ada', metin: 'İnanılmaz {isim}! Tyche sinyali kaydedildi ve uzaylı gözcüler kaçtı! Gökyüzü Dedektifleri\'nin en zor görevini tamamladın.' },
    { kim: 'ada', metin: 'Planet X, Gezegen Y, ilkel kara delik, Tyche... Oyundaki keşifler kurgusal; gerçek gökyüzünde bu soruların cevabı hâlâ bekleniyor. Belki bir gün birini gerçekten sen bulacaksın!' },
    { kim: 'oyuncu', metin: 'Gizemli ve Kaotik cisimler hâlâ bir yerlerde saklanıyor olabilir... Koleksiyonu tamamlayacağım!' },
    { kim: 'piksel', metin: 'İpucu: Anomali dedektörü yanıp sönüyorsa o seviyede gizli bir cisim var. Doğru dalga boyu + doğru tarama = keşif! Bip!' }
  ]
};

/* Seviye sonu kısa yorumları */
SX.BITIS_SOZU = {
  1: 'Harika iş! Az önce gökbilimcilerin 200 yıldır yaptığı şeyi yaptın: hareket eden bir cismi yıldızların arasından ayırdın.',
  2: 'Süper! Yakın asteroitleri erkenden fark etmek, gezegen savunmasının ilk adımıdır.',
  3: 'Muhteşem! Bir kuyruklu yıldızın gazını, insan gözünün göremediği bir renkte gördün.',
  4: 'Vay! Görünür ışıkta karanlık olan bir cismi kızılötesinde buldun. SPHEREx\'in 102 rengi tam da bunun için var.',
  5: 'Bir yıldızın son ışığını yakaladın. Süpernovalar evrene yeni elementler saçar.',
  6: 'Harika takip! Parçaların nereye gittiğini bilmek gelecekteki meteorları anlamamıza yardım eder.',
  7: 'Clyde Tombaugh 1930\'da Pluto\'yu tam olarak böyle buldu: iki fotoğraf arasında göz kırparak!',
  8: 'İnanılmaz bir keşif! Ama ekip yeni ve çok daha tuhaf sinyaller alıyor... Görevler devam ediyor!',
  9: 'Harika! Sedna gibi uzak dünyaların tuhaf yörüngeleri, Planet X fikrinin doğmasına yol açtı.',
  10: 'Kaotik bir keşif! Gezegen Y gerçekten varsa, gelecekte Vera Rubin Gözlemevi gibi teleskoplar onu bulabilir.',
  11: 'Görünmeyeni gördün! Kütleçekim merceği, karanlık madde ve kara delikleri aramak için gerçekten kullanılan bir yöntem.',
  12: 'Efsane! Uzaylıları kovaladın ve Tyche adayını yakaladın.'
};
