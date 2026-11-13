# Geliştirme Günlüğü — SPHEREx: Gökyüzü Dedektifi

(En yeni aşama en üstte)

---

## Aşama 4 — Türkçe/İngilizce dil seçeneği, Space Apps sunumları ve konuşma metinleri
**Tarih:** 13.11.2026

**İstek:**
- "SphereX" takımı için NASA Space Apps Challenge kurallarına uygun sunum; sayfa sınırına uyulsun, NASA kaynaklarına dayansın, yanlış bilgi olmasın; gerekli yerlere ekran görüntüleri eklensin.
- Sunumlar Türkçe ve İngilizce ayrı ayrı olsun (sunum klasöründeki "Demo Sunum" ve "Tam Sunum" dosyaları çoğaltılarak).
- Oyuna Türkçe/İngilizce dil seçeneği eklensin; sunumda da yer alsın; GitHub güncellensin.
- Sunumda nerede ne söyleneceğini anlatan ayrı PDF (Türkçe ve İngilizce).

**Yapılanlar:**
- Oyun: `js/i18n.js` (arayüz sözlüğü, `SX.t()`, `SX.dilAyarla()`) ve `js/data_en.js` (hikâye, 12 görev, 17 cisim, sorular, rozetlerin İngilizcesi) eklendi. Ana menüde ve görev haritasında **TR | EN** düğmesi. Seçim tarayıcıda saklanır; `?lang=en` / `?lang=tr` adres parametresi önceliklidir. Kodda sabit Türkçe metin kalmadı.
- Space Apps kuralları resmî "Project Submission Guide" sayfasından kontrol edildi: demo sunumu **en fazla 7 slayt (başlık dâhil)**, **İngilizce**, herkese açık bağlantı; takım adı, üye adları, seçilen görev; NASA verisi açıklaması; yapay zekâ kullanım beyanı; yapay zekâ ile üretilmiş görsellerde filigran; NASA logosu kullanılmaması.
- Sunumlar (`sunum/` klasörü): **Demo Sunum.pptx** (TR, 7 slayt), **Demo Presentation (EN).pptx** (7 slayt — Space Apps'e gönderilecek), **Tam Sunum.pptx** (TR, 17 slayt), **Full Presentation (EN).pptx** (17 slayt). Her slaytta konuşma notu var.
- Konuşma metinleri: **Konusma Metni (TR).pdf** ve **Speaker Script (EN).pdf** (iki sunumun her slaytı için ne söyleneceği, hedef süre, konuşmacı satırı).
- 15'er oyun içi ekran görüntüsü (TR ve EN) alındı; hepsinde "Yapay zekâ destekli oyun · Claude (Anthropic)" filigranı var. Oyuna giden QR kod eklendi.
- Bilgiler NASA JPL (SPHEREx ilk harita, 18.12.2025), Caltech SPHEREx (fırlatma 11.03.2025), NASA Science SPHEREx blogu (3I/ATLAS, 04.02.2026), NASA Science Planet X sayfası ve IRSA SPHEREx Quick Release açıklamasından doğrulandı.

**Değişen / eklenen dosyalar:** index.html, css/style.css, js/data.js, js/data_en.js (yeni), js/i18n.js (yeni), js/main.js, js/sky.js, js/ui.js, sunum/* (4 pptx + 2 pdf), README.md, GELISTIRME_GUNLUGU.md, DEVAM_NOTLARI.md

**Test durumu:**
- Headless Chromium'da iki dilde tam akış (başlık → ara sahne → brifing → oyun → kilit → uplink → soru → keşif → sonuç → harita → koleksiyon → rozetler → kara delik → uzaylılar → büyüteç) çalıştırıldı; JavaScript hatası yok, İngilizcede Türkçe metin kalmadı.
- 4 sunum dosyası doğrulama betiğinden geçti ve slayt slayt görsel olarak kontrol edildi.
- Açık iş: sunumlardaki "[Takım üyelerinin adları]" yer tutucusu takım tarafından doldurulmalı.

---

## Aşama 3 — GitHub'a yükleme ve GitHub Pages yayını
**Tarih:** 13.11.2026

**İstek:** Oyunun GitHub'a yüklenmesi ve bağlantısının verilmesi.

**Yapılanlar:**
- Cem'in GitHub hesabında (cemyurtlak) herkese açık `spherex-gokyuzu-dedektifi` deposu açıldı; tüm oyun dosyaları klasör yapısı korunarak yüklendi.
- GitHub Pages (main dalı, kök klasör) açıldı. Oynama adresi: https://cemyurtlak.github.io/spherex-gokyuzu-dedektifi/
- README'ye "Hemen oyna" bölümü (oyun ve kaynak kod bağlantıları) eklendi.
- Oyun kodunda değişiklik yok.

**Değişen dosyalar:** README.md, GELISTIRME_GUNLUGU.md, DEVAM_NOTLARI.md

**Test durumu:** Yayınlanan sayfanın açıldığı tarayıcıda kontrol edildi (aşağıdaki sonuç yanıtta).

---

## Aşama 2 — Daha görünür cisimler, 4 yeni seviye, Kaotik gezegenler, uzaylılar
**Tarih:** 20.10.2026

**İstek:**
- Yıldızlar ve uzay cisimleri çok küçük, görmek zor — büyütülsün.
- Daha fazla gezegen eklensin (öncekiler silinmeden); neredeyse hiç bilmediğimiz birkaç gezegen Kaotik nadirlikte olsun.
- Seviye sayısı artsın.
- Kaotik gezegenlerden birinin bölümünde uzaylılar bazen oyuncuya engel olsun.

**Yapılanlar:**
- Görünürlük: yıldız boyutları ~%80 büyütüldü, parıltı çekirdeği yumuşatıldı, en küçük nokta boyu 2.5 px; cisim sprite'ları yıldızlarla aynı oranda büyütüldü (cisimler yıldızlardan ayırt edilemesin diye). Tıklama yakalama alanı 16 → 22 px.
- Yeni araç: **Büyüteç** (🔍 düğmesi / L tuşu) — imlecin yanında 3× büyütülmüş canlı görüntü penceresi.
- 5 yeni cisim (koleksiyon 12 → 17): Sedna (Efsanevi), Gezegen Y (Kaotik), İlkel Kara Delik Adayı (Kaotik), Tyche (Kaotik), Uzaylı Gözcü Gemisi (Gizemli, gizli, kurgusal).
- 4 yeni seviye (8 → 12): 9 Sedna'nın Yolu, 10 Eğik Kuşak (Gezegen Y, yalnızca 0.9–1.35 µm), 11 Karanlık Çekim (görünmeyen kara delik — yıldız ışığını büken kütleçekim merceği shader'ı), 12 Kaos Bulutu (Tyche + uzaylılar).
- Uzaylılar (seviye 12): 9–16 saniyede bir UFO gelir, 2.8 sn bekler. Tıklanırsa kovalanır (bir hata silinir, ilk seferde UFO koleksiyona eklenir + "Uzaylı Kovucu" rozeti). Kovalanmazsa rastgele engel: parazit (ekran bozulması + sarsıntı), sahte cisimler (rastgele zıplayan uzaylı tuzakları), dalga boyu karıştırma (kaydırıcı 3.5 sn kilitli), uzaylı sisi (bir bölgeyi 6 sn kapatır).
- 4 yeni 3B ara sahne: Sedna'nın uzun yörüngesi, eğik Kuiper kuşağı + Gezegen Y, kara delik + bükülen ışık halkası + girdap, Tyche + etrafında uçan UFO'lar.
- Hikâye devam ettirildi: Planet X sonrası "ekip daha tuhaf sinyaller alıyor" köprüsü; final artık seviye 12'den sonra.
- Gizli cisim kuralları yeni seviyelere genişletildi; 5 yeni ikon; ek rozet "Uzaylı Kovucu" (rozet sayısı 14 → 19).
- Koddaki sabit "8 seviye" değerleri `SX.SEVIYELER.length` ile değiştirildi; etiketler artık cisim nesnesine bağlı.

**Değişen dosyalar:** js/data.js, js/sky.js, js/cutscene.js, js/ui.js, js/main.js, js/audio.js, index.html, css/style.css, README.md, GELISTIRME_GUNLUGU.md, DEVAM_NOTLARI.md

**Test durumu:**
- Headless Chromium: 4 yeni ara sahne, kara delik merceği (yakın görünüm + bulma), büyüteç, 4 UFO engel türü, UFO kovalama → keşif kartı, 12'li görev haritası ve 17'li koleksiyon test edildi; JavaScript hatası yok.
- 12 seviye × 60 rastgele tohum ile seviye üretimi: hata yok, hedefler görünür alanda.
- Gerçek bilgisayarda performans henüz denenmedi.

---

## Aşama 1 — İlk sürüm: hikâyeli, 8 seviyeli Three.js oyunu
**Tarih:** 20.10.2026

**İstek:**
- NASA Space Apps 2026 "Planet X and SPHEREx" görevi için web uygulaması olarak çalışan Three.js oyunu.
- Bir öğrenci karakteri ve konuya uygun hikâye; eğlenceli, eğitici, grafikleri güzel.
- Seviye seviye ilerleme, her seviyede animasyonlu hikâye.
- Işınlar ilerledikçe yıldız, gezegen, asteroit, kopmuş meteor parçaları gibi cisimler belirsin.
- Ekranın altında "İlerleme" yazan zaman çubuğu; sağa kaydırdıkça ışınlar ilerlesin, oyuncudan yeni eklenen cismi bulması istensin (NASA öğrenciyi araştırmaya çağırır).
- Her aşamada koleksiyona rozet; en zor aşamadaki rozet hedef.
- Cisim bulununca etrafında beyaz çizgiler oluşsun, gölgedeki cisim yenilensin.
- Nadirlik: Normal, Nadir, Destansı, Efsanevi, Gizemli, Kaotik — son ikisi çok zor bulunsun.
- Ek istek: Bulununca beyaz çizgiler yok olsun, cisim renklensin ve "Veri NASA'ya gönderiliyor" yazsın.

**Yapılanlar:**
- Hikâye: Antalya/Saklıkent'te 8. sınıf öğrencisi (oyuncu adı girilebilir, varsayılan "Zirve"), NASA SPHEREx bilim insanı Dr. Ada Kaya (kurgusal) ve robot PİKSEL. 8 görev + final.
- Gökyüzü sahnesi (sky.js): Planck eğrisine göre dalga boyuyla parlaklığı değişen 900–1800 yıldız, dalga boyuna göre renklenen toz bulutu, tarama ızgarası, tarama ışını (İLERLEME çubuğuyla ilerler; geçtiği yeri yeni tarama verisiyle günceller).
- Mekanikler: 102 bantlık dalga boyu kaydırıcısı, Göz Kırpma (blink), yakınlaştır/gez, oynat, değişen yıldız ve "bilinen asteroit" tuzakları, yıldız puanı.
- Bulma efekti: beyaz kilit çizgileri (köşe parantezleri + ışınsal çizgiler + halka) → kaybolur → cisim nadirlik renginde renklenir + hale → "Veri NASA'ya gönderiliyor..." yükleme penceresi → tanımlama sorusu → gölge karttan renkli karta geçiş → rozet.
- 12 cisimlik koleksiyon, 14 rozet; 4 gizli cisim (uydu izi, yıldızlararası ziyaretçi, yetim gezegen, kütleçekim merceği) ve anomali dedektörü.
- 9 farklı 3B ara sahne (cutscene.js): yörüngede SPHEREx + Dünya + veri paketleri, Dünya'ya yakın asteroit, kuyruklu yıldız (Güneş'in tersine akan kuyruk), kahverengi cüce (görünür ↔ kızılötesi), süpernova (şişme–patlama–şok dalgası), parçalanan asteroit, Kuiper Kuşağı + kümelenmiş yörüngeler, Planet X, final havai fişekleri.
- Görev haritası, koleksiyon/rozet penceresi, nasıl oynanır rehberi, ilerleme kaydı (localStorage), WebAudio ses efektleri.
- Three.js r149 yerel olarak vendor/ klasörüne kondu (internetsiz çalışma).

**Değişen / eklenen dosyalar:** index.html, css/style.css, vendor/three.min.js, js/data.js, js/audio.js, js/sky.js, js/cutscene.js, js/ui.js, js/main.js, README.md, GELISTIRME_GUNLUGU.md, DEVAM_NOTLARI.md

**Test durumu:**
- Headless Chromium (yazılımsal WebGL) ile başlık, ara sahneler (1–8), oyun ekranı, kilitlenme, uplink, soru, keşif kartı, sonuç ve koleksiyon ekranları test edildi; JavaScript hatası yok.
- 8 seviye × 60 rastgele tohumla seviye üretimi test edildi: hata yok, hedefler görünür alanda.
- Gerçek bilgisayarda (Intel UHD / MX150) performans henüz denenmedi.
