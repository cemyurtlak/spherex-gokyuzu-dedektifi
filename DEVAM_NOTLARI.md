# Devam Notları — SPHEREx: Gökyüzü Dedektifi

Bu dosya, projeyi başka bir sohbette/hesapta sürdürecek kişi (veya yapay zekâ) içindir. Değişiklik yapmadan önce README.md, GELISTIRME_GUNLUGU.md ve bu dosyayı oku.

## Çalışma kuralları
- Her değişiklikten sonra GELISTIRME_GUNLUGU.md'ye yeni aşama ekle (en yeni en üstte; son aşama numarasından devam et).
- Özellik/kullanım/dosya yapısı değişirse README.md'yi güncelle; yeni karar/sorun/fikir varsa bu dosyayı güncelle.
- Önceki kayıtları silme, projeyi baştan başlatma.
- Arayüz metinleri ve kod içi adlar Türkçe (ör. `seviyeBaslat`, `kilitlen`, `gorunurluk`). Bu düzen korunmalı.
- Oyun içeriği (seviye, hikâye, cisim, rozet) yalnızca `js/data.js` içinden düzenlenir.

## Yayın (GitHub)
- Depo: https://github.com/cemyurtlak/spherex-gokyuzu-dedektifi (herkese açık; GitHub Pages ücretsiz planda bunu gerektirir)
- Canlı oyun: https://cemyurtlak.github.io/spherex-gokyuzu-dedektifi/ (GitHub Pages, main dalı, kök klasör)
- Güncelleme: değişen dosyaları depoya yükle (aynı klasör yolunda); Pages birkaç dakika içinde yeniden yayınlar. Yerel klasör ile depo aynı tutulmalı.

## Dil desteği (Aşama 4)
- Arayüz metinleri `js/i18n.js` → `SX.METIN.tr / .en`; kodda `SX.t('anahtar', {param})` kullanılır. HTML'de `data-i18n`, `data-i18n-title`, `data-rar` öznitelikleri.
- Oyun içeriğinin İngilizcesi `js/data_en.js` (`SX.EN`). Anahtarlar `data.js` ile aynı (cisim kimliği, seviye no, hikâye sahnesi + satır sırası). Türkçe orijinal ilk yüklemede `SX._TR`'ye yedeklenir; `SX.veriDiliUygula()` seçilen dile göre veri nesnelerini günceller.
- **Kural:** `data.js`'e yeni metin/seviye/cisim eklenirse aynısı `data_en.js`'e de eklenmeli; yeni arayüz metni `i18n.js`'in iki diline birden eklenmeli. Kodda sabit Türkçe metin yazılmamalı.
- Dil yalnızca ana menü ve görev haritasından değiştirilir (oyun sırasında değil).

## Sunumlar (Aşama 4)
- Space Apps demo kuralı: en fazla 7 slayt (başlık dâhil), İngilizce, herkese açık bağlantı; takım adı, üyeler, görev, NASA verisinin kullanımı, yapay zekâ beyanı zorunlu. 7'yi aşan demo Global Judging'e giremez.
- Sunumlar pptxgenjs ile üretildi (koyu uzay teması, Calibri). Oyun ekran görüntülerinde "AI-assisted / Yapay zekâ destekli" filigranı var (Space Apps yapay zekâ kuralı). NASA logosu kullanılmadı.
- "[Takım üyelerinin adları]" yer tutucusu takım tarafından doldurulacak. 18 yaş altı üyeler için Space Apps kullanıcı adları tercih edilebilir.
- Oyun yeniden düzenlenirse ekran görüntüleri güncel olmayabilir.

## Teknik kararlar ve nedenleri
- **Klasik `<script>` + Three.js r149 UMD (`vendor/three.min.js`)**: `index.html` çift tıklanarak (file://) açılabilsin diye. ES modülleri file:// altında CORS hatası verir. r150+ sürümlerinde `three.min.js` kaldırıldığı için r149 seçildi. Bu yüzden `import` kullanılmaz; tüm modüller `window.SX` ad alanını paylaşır.
- **İnternetsiz çalışma**: Three.js yerelde. Ses dosyası yok (WebAudio ile sentez). Dokular (Dünya, gezegenler, ikonlar) kodla üretiliyor. Sadece Google Fonts internete bağlı; yoksa sistem yazı tipine düşer.
- **Gökyüzü benzetimi**: Gerçek SPHEREx görüntüsü yerine üretilmiş alan (200×112 birim). Yıldız parlaklığı shader'da Planck eğrisi oranıyla dalga boyuna göre değişir (`sky.js` yıldız vertex shader). Cisimlerin dalga boyu davranışı `data.js` → `profil` (taban + kazanc·gauss(tepe, genislik)).
- **Zaman modeli**: `t` ∈ [0, taramaSayisi-1]. Tam sayılar = taramalar. Kesirli kısım tarama ışınının konumudur; bir cismin yeni taramadaki x konumu ışının solundaysa yeni durumu gösterilir (`Sky.gorunenDurum`).
- **Gizli cisimler**: `data.js` → `GIZLI_KURAL` (hangi seviyeler, olasılık). Tek bir taramada görünürler; Gizemli olanlar dar bantta. Kütleçekim merceği yalnızca |t − tarama| < ~0.12 iken seçilebilir. Bulunan gizli cisim bir daha çıkmaz.
- **Rastgelelik**: Her oynayışta seviye yeni tohumla kurulur (`SX.rng`, mulberry32) → tekrar oynanabilirlik.
- **Yıldız puanı**: 0 hata 3★, 1–2 hata 2★, 3+ hata 1★. Yanlış soru cevabı da hata sayılır.
- **Görünürlük (Aşama 2)**: Yıldız ve cisim boyutları aynı oranda büyütüldü; hedef cisimler yıldızlarla aynı görünmeli (sadece davranışlarıyla — hareket, bant, beliriş — ayırt edilmeli). Boyut değiştirirken `_kurYildizlar` (aSize) ile `guncelleGorunum` (olc) birlikte değiştirilmeli.
- **Kara delik (seviye 11, `hareket.tur: 'mercek'`)**: Cisim çizilmez (`karaDelik: true`). Yıldız vertex shader'ı `uLens` / `uLensK` (Einstein yarıçapı 4.5 birim) ile yıldızları dışa iter ve parlatır (nokta mercek denklemi). Bu seviyede yıldız sayısı 2600 tutuldu ki halkada yeterli yıldız olsun. Yolun çevresine ek yıldız eklemek denendi ama cevabı ele verdiği için kaldırıldı. Seçim yarıçapı 5 birim (`secYaricap`).
- **Uzaylılar (seviye 12, `uzayli: true`)**: Zamanlayıcı ve engel etkileri `main.js` (`ufoSayac`, `ufoEylem`), UFO hareketi/çizimi `sky.js` (`ufoBaslat`, `_ufoGuncelle`, `ufoKovala`, `sahteEkle`, `perdeEkle`). UFO durumları: gel (2.2 sn) → bekle (2.8 sn, tıklanabilir) → eylem → git. Sahte cisimler `tur: 'sahte'`, 13–17 sn ömürlü. Pencere açıkken, oyuncu meşgulken veya hedef bulunduktan sonra UFO gelmez.
- **Büyüteç**: `Sky.buyutecCiz` aynı sahneyi ikinci bir kamerayla scissor/viewport kullanarak küçük bir kareye çizer; nokta boyutu ölçeği (`uScale`) geçici olarak pencere boyutuna göre ayarlanır.
- **Seviye sayısı** artık her yerde `SX.SEVIYELER.length` ile hesaplanır; final, son seviyeden sonra oynar.
- **Performans**: Cem'in bilgisayarında yalnızca Intel UHD var → pixelRatio en fazla 1.5, yıldızlar tek `Points` çizimi, efektler hafif tutuldu. Sunum MX150'li bilgisayarda yapılabilir.

## Kod haritası
- `js/data.js` — `SX.RARITY`, `SX.KARAKTER`, `SX.BAND`, `SX.CISIMLER`, `SX.KOLEKSIYON_SIRASI`, `SX.GIZLI_KURAL`, `SX.SEVIYELER`, `SX.EK_ROZETLER`, `SX.taramaEtiketi`, `SX.HIKAYE`, `SX.BITIS_SOZU`
- `js/sky.js` — yardımcılar (`SX.rng`, `SX.bandFactor`, `SX.bandTint`, doku üreticiler) + `SX.Sky`: `kur(sev, secenek)`, `ayarlaZaman`, `ayarlaBand`, `gorunenDurum`, `guncelleGorunum`, `sec` (tıklama → cisim), `kilitlen` (beyaz çizgi → renklenme), `hataIsareti`, `ping`, `anomaliSinyali`, kamera (`boyutla`, `yakinlastir`, `kaydir`).
- `js/cutscene.js` — `SX.Cutscene`: `baslat(id)`; sahneler `_baslik/_giris/_nea/_kuyruklu/_kahverengi/_supernova/_parcalar/_kuiper/_planetx/_final`; ortak parçalar `dunya`, `kaya`, `spherex`, `gunes`, `parcacik`, `yorungeCizgisi`.
- `js/ui.js` — kayıt (`SX.kayit`, `kayitYukle/Sakla/Sifirla`), `SX.UI.ikon` (canvas ikonları), `avatar` (SVG), `diyalog`, `bildir`, `uplink`, `kesifKarti`, `koleksiyonDoldur`.
- `js/main.js` — akış: `seviyeBaslat → (ara sahne + diyalog) → brifing → oyun → tikla → kilitlen → uplink → soruGoster → kesifKarti → seviyeSonu`; `gizliKesif`, `metaRozetler`, `finalOynat`, `haritaGoster`, `buyutecDegistir/buyutecGuncelle`, `ufoEylem`. Test için `SX._oyun` dışa açık.
- Aşama 2 eklemeleri: `sky.js` sonunda UFO dokuları, `ufoBaslat`, `_ufoGuncelle`, `ufoKovala`, `sahteEkle`, `sisDoku`, `perdeEkle`, `buyutecCiz`; `cutscene.js` sonunda `ufoModel`, `_sedna`, `_gezegeny`, `_karadelik`, `_tyche`.

## Yeni seviye eklemek
1. `data.js` → `SX.SEVIYELER` dizisine nesne ekle (`hareket.tur`: `dogrusal | kuyruklu | supernova | parcalar`).
2. Gerekirse `SX.CISIMLER`'e cisim, `SX.KOLEKSIYON_SIRASI`'na kimliğini, `SX.HIKAYE`'ye diyalog ekle.
3. Yeni ara sahne gerekiyorsa `cutscene.js`'e `_sahneAdi` fonksiyonu ekle (yoksa başlık sahnesi kullanılır).
4. Seviye sayısı otomatik hesaplanır (`SX.SEVIYELER.length`); yalnızca başlık ekranındaki tanıtım cümlesini (index.html) güncelle.
5. Uzaylı engeli istenirse seviyeye `uzayli: true` ekle.

## Bilinen sorunlar / sınırlamalar
- Gökyüzü gerçek SPHEREx verisi değil, benzetim. (Görev metni gerçek görüntüleri göstermeyi öneriyor — aşağıya bkz.)
- Dokunmatik ekranda iki parmakla yakınlaştırma yok (sadece +/− düğmeleri ve tek parmakla gezinme).
- Gerçek donanımda FPS ölçülmedi.

## Sonraki adım fikirleri
- Space Apps'e göndermeden önce İngilizce demo sunumu herkese açık bir bağlantıya koymak (Google Drive veya bu GitHub deposu).
- Uzaylıları başka Kaotik seviyelere de (ör. 10) daha seyrek eklemek; UFO türüne göre farklı renkli gemiler.
- Kara delik seviyesine isteğe bağlı "mercek görüşü" ipucu.
- **Gerçek veri modu**: NASA/IPAC IRSA'daki SPHEREx görüntülerinden (aynı bölgenin iki farklı tarihli görüntüsü) birkaç tanesini indirip `assets/` altına koyarak "Gerçek Gökyüzü" sekmesinde aynı İLERLEME çubuğu ve göz kırpma ile göstermek — jüri için güçlü bir artı olur.
- Dokunmatik pinch-zoom.
- Liderlik tablosu / sınıf yarışması modu.
- Türkçe/İngilizce dil seçimi (NASA jürisi için İngilizce).
