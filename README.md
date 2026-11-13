# SPHEREx: Gökyüzü Dedektifi — Planet X'in İzinde

NASA Space Apps Challenge 2026 · **Planet X and SPHEREx** görevi için hazırlanmış, tarayıcıda çalışan, Three.js tabanlı, hikâyeli ve seviyeli eğitsel oyun.

> Görev metni: NASA'nın SPHEREx teleskobu 2025'ten beri tüm gökyüzünü her 6 ayda bir 102 kızılötesi bantta haritalıyor. Kuyruklu yıldızlar, asteroitler, yıldızlar, kahverengi cüceler ve hatta yeni gezegenler görüntüler arasında yer değiştirerek kendini belli eder. Amaç: herkesin gökyüzünün zamanla nasıl değiştiğini kolayca görebileceği, halka açık bir web aracı yapmak.

## Hemen oyna

**Tarayıcıda oyna:** https://cemyurtlak.github.io/spherex-gokyuzu-dedektifi/
**Kaynak kod:** https://github.com/cemyurtlak/spherex-gokyuzu-dedektifi

**Dil:** Oyun Türkçe ve İngilizcedir. Ana menüdeki veya görev haritasındaki **TR | EN** düğmesiyle değiştirilir; doğrudan İngilizce açmak için adres sonuna `?lang=en` eklenir.

## Hikâye

Antalya'da 8. sınıf öğrencisi **{oyuncunun adı}** (varsayılan: Zirve), Saklıkent'teki gözlem kampında NASA SPHEREx ekibinden **Dr. Ada Kaya**'dan (kurgusal karakter) bir mesaj alır: "Gökyüzü Dedektifleri" ekibine katılması isteniyordur. Yardımcı robot **PİKSEL** ile birlikte 12 görevde gökyüzündeki değişen cisimleri bulur: önce asteroitler, kuyruklu yıldızlar ve süpernovalar; sonra varsayımsal **Planet X**, **Gezegen Y**, görünmeyen bir **ilkel kara delik** ve son görevde uzaylı gözcülerin engellemeye çalıştığı **Tyche**.

## Seviyeler

| # | Görev | Hedef cisim | Nadirlik | Öğrettiği şey |
|---|-------|-------------|----------|---------------|
| 1 | İlk Sinyal | Ana Kuşak Asteroidi | Normal | Hareket eden cismi yıldızlardan ayırma |
| 2 | Hızlı Gezgin | Dünya'ya Yakın Asteroit | Nadir | Yakın cisimler hızlı yer değiştirir |
| 3 | Buzlu Ziyaretçi | Kuyruklu Yıldız | Nadir | CO₂ 4.3 µm'de parlar, kuyruk Güneş'in tersine |
| 4 | Soğuk Komşu | Kahverengi Cüce | Destansı | Soğuk cisimler uzun dalga boyunda parlar |
| 5 | Yıldız Patlaması | Süpernova | Destansı | Yer değiştirmeyen ama aniden beliren cisim |
| 6 | Kopmuş Parçalar | Kopmuş Meteor Parçaları | Efsanevi | Parçalanan asteroit, bilinen cisimleri ayıklama |
| 7 | Donmuş Sınır | Kuiper Kuşağı Cismi | Efsanevi | Uzak cisimler çok yavaş hareket eder (Pluto yöntemi) |
| 8 | Planet X | Planet X Adayı | **Kaotik** | Varsayımsal dev gezegen, dar bant, çok yavaş |
| 9 | Sedna'nın Yolu | Sedna | Efsanevi | 11.000 yıllık yörünge, çok kırmızı yüzey |
| 10 | Eğik Kuşak | Gezegen Y | **Kaotik** | Kuiper Kuşağı'nı eğen varsayımsal gezegen; yalnızca 0.9–1.35 µm |
| 11 | Karanlık Çekim | İlkel Kara Delik Adayı | **Kaotik** | Görünmeyen cismi kütleçekim merceğinden (bükülen yıldız ışığı) bulma |
| 12 | Kaos Bulutu | Tyche | **Kaotik** | Oort Bulutu'ndaki varsayımsal dev; **uzaylılar engel olur** |

**Gizli cisimler** (rastgele çıkar, çok zor): Yapay Uydu İzi (Normal), Yıldızlararası Ziyaretçi (Gizemli), Yetim Gezegen (Gizemli), Uzaylı Gözcü Gemisi (Gizemli, yalnızca 12. görevde UFO kovalayınca), Kütleçekim Merceği Parlaması (Kaotik). Toplam koleksiyon: **17 cisim**, **19 rozet**.

### Uzaylılar (12. görev)
9–16 saniyede bir bir UFO gelir ve birkaç saniye bekler. **Üzerine tıklarsan kovalanır** ve bir hatan silinir (ilk seferde UFO koleksiyona eklenir). Kovalamazsan rastgele bir engel çıkarır:
- **Parazit:** ekran bozulur ve sarsılır
- **Sahte cisimler:** taramalar arasında rastgele zıplayan uzaylı tuzakları (tıklamak hata sayılır)
- **Dalga boyu karıştırma:** kaydırıcı başka banda atlar ve 3.5 saniye kilitlenir
- **Uzaylı sisi:** gökyüzünün bir bölgesi 6 saniye kapanır

## Nasıl oynanır

1. Her görevin başında 3B hikâye animasyonu ve diyaloglar oynar (Boşluk/tıkla: devam, Atla: geç).
2. **İLERLEME** çubuğunu (alt) sağa kaydır: tarama ışını ilerledikçe geçtiği yeri yeni taramanın verisiyle günceller.
3. **Dalga boyu** kaydırıcısıyla SPHEREx'in 0.75–5.0 µm arası 102 bandında gez; bazı cisimler yalnızca belirli bantlarda görünür.
4. **Göz Kırpma (B)**: ilk tarama ile şimdiki tarama art arda gösterilir (Pluto'yu bulan yöntem). **Büyüteç (L)**: imlecin yanında 3× büyütülmüş pencere açar.
5. Yeni beliren / yer değiştiren cismin üzerine **tıkla** → beyaz kilit çizgileri oluşur → çizgiler kaybolur, cisim nadirlik renginde renklenir → **"Veri NASA'ya gönderiliyor..."** → tanımlama sorusu → gölgedeki kart renklenerek koleksiyona eklenir, rozet kazanılır.
6. Yanlış tıklama yıldız kaybettirir (0 hata: 3★, 1–2 hata: 2★, 3+ hata: 1★).
7. **Anomali dedektörü** (sağ üst) yanıyorsa o seviyede Gizemli/Kaotik gizli bir cisim vardır; doğru bant + doğru taramaya yaklaştıkça sinyal güçlenir.

**Kısayollar:** ← → zaman · Shift+← → bir tarama · ↑ ↓ dalga boyu · B göz kırpma · L büyüteç · H ipucu · + − yakınlaştır · Boşluk oynat · fare tekerleği yakınlaştır · sürükle gez.

## Kurulum / çalıştırma

Kurulum gerekmez. `index.html` dosyasına çift tıkla (Chrome / Edge önerilir). Three.js `vendor/` klasöründe olduğu için **internet olmadan da çalışır** (yalnızca yazı tipleri internetten gelir; yoksa sistem yazı tipi kullanılır).

İlerleme (yıldızlar, koleksiyon, rozetler) tarayıcının yerel belleğinde saklanır. "Nasıl Oynanır?" penceresinden sıfırlanabilir.

**Sunum / jüri için adres parametreleri:**
- `index.html?lang=en` → oyunu İngilizce açar (`?lang=tr` → Türkçe)
- `index.html?hepsi=1` → tüm görevlerin kilidini açar
- `index.html?gizli=1` → gizli cisimlerin hepsini, uygun seviyelerde kesin olarak çıkarır
- İkisi birlikte: `index.html?hepsi=1&gizli=1`

## Dosya yapısı

```
8AZirveDerinAtikNASA/
├─ index.html              Sayfa iskeleti, tüm ekranlar ve pencereler
├─ css/style.css           Tüm görünüm (HUD, kartlar, animasyonlar)
├─ vendor/three.min.js     Three.js r149 (yerel kopya)
├─ js/data.js              Hikâye, seviyeler, cisim kataloğu, nadirlik, rozetler (Türkçe)  ← içerik buradan düzenlenir
├─ js/data_en.js           Aynı içeriğin İngilizcesi
├─ js/i18n.js              Dil desteği: arayüz sözlüğü (TR/EN), dil değiştirme
├─ js/audio.js             WebAudio ile üretilen ses efektleri (dosya gerekmez)
├─ js/sky.js               Gökyüzü sahnesi: yıldızlar, tarama ışını, zaman/bant, seçme, kilit çizgileri, kara delik merceği, uzaylılar, büyüteç
├─ js/cutscene.js          Ara sahne animasyonları (Dünya, SPHEREx, kuyruklu yıldız, süpernova, Kuiper, Planet X, Sedna, Gezegen Y, kara delik, Tyche+UFO, final)
├─ js/ui.js                İkonlar, avatarlar, diyalog, uplink, keşif kartı, koleksiyon, kayıt
├─ js/main.js              Oyun akışı, girdi, seviye döngüsü
├─ sunum/                  Space Apps sunumları ve konuşma metinleri
│   ├─ Demo Presentation (EN).pptx   7 slayt — Space Apps'e gönderilecek (İngilizce zorunlu)
│   ├─ Demo Sunum.pptx               Aynı sunumun Türkçesi
│   ├─ Full Presentation (EN).pptx   17 slaytlık tam sunum (İngilizce)
│   ├─ Tam Sunum.pptx                17 slaytlık tam sunum (Türkçe)
│   ├─ Speaker Script (EN).pdf       Her slaytta ne söyleneceği (İngilizce)
│   └─ Konusma Metni (TR).pdf        Her slaytta ne söyleneceği (Türkçe)
├─ README.md               Bu dosya
├─ GELISTIRME_GUNLUGU.md   Aşama aşama geliştirme kaydı
└─ DEVAM_NOTLARI.md        Kurallar, teknik kararlar, kod haritası, sonraki adımlar
```

## Bilimsel not

Oyundaki gökyüzü görüntüleri SPHEREx'in çalışma mantığını anlatmak için üretilmiş **benzetimlerdir**; cisim bilgileri gerçek bilime dayanır. Planet X (Dokuzuncu Gezegen), Gezegen Y, ilkel kara delik fikri ve Tyche gerçekte bulunamamış, tartışılan varsayımlardır (Tyche için 2014 WISE verileri yakınımızda böyle bir dev olmadığını gösterdi). Uzaylılar tamamen kurgusaldır. Gerçek SPHEREx verileri NASA/IPAC IRSA arşivinde herkese açıktır.
