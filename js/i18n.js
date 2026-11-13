/* =========================================================
   DİL DESTEĞİ (Aşama 4) — Türkçe / English
   - SX.t(anahtar, {param}) : arayüz metni
   - SX.dilAyarla('tr'|'en') : tüm oyunun dilini değiştirir
   - HTML'de data-i18n="anahtar" (innerHTML), data-i18n-title="anahtar"
   Seçim tarayıcıda saklanır; adres çubuğunda ?lang=en / ?lang=tr önceliklidir.
   ========================================================= */
window.SX = window.SX || {};

SX.METIN = {
  tr: {
    doc_baslik: 'SPHEREx: Gökyüzü Dedektifi',
    alt_baslik: 'Gökyüzü Dedektifi',
    slogan: 'Planet X\'in izinde · 102 renkte gökyüzü · 12 görev · 17 gizemli cisim · uzaylılar!',
    isim_etiket: 'Dedektif adın', dil: 'Dil',
    basla: 'Göreve Başla', devam_et: 'Devam Et', koleksiyon: 'Koleksiyon', nasil: 'Nasıl Oynanır?',
    ana_menu: '‹ Ana Menü', harita_ust: 'GÖKYÜZÜ DEDEKTİFLERİ · GÖREV KONTROL', gorevler: 'Görevler',
    ipucu: 'İpucu', ses: 'Ses',
    t_ipucu: 'İpucu (H)', t_ses: 'Ses', t_gorevler: 'Görevler', t_yak: 'Yakınlaştır (+)', t_uzak: 'Uzaklaştır (-)', t_sifir: 'Tüm alan',
    t_blink: 'Göz Kırpma (B)', t_buyutec: 'Büyüteç (L)', t_oynat: 'Oynat',
    an_baslik: 'ANOMALİ DEDEKTÖRÜ', an_yok: 'sinyal yok', an_guclu: 'GÜÇLÜ SİNYAL!', an_yakin: 'sinyal yaklaşıyor...', an_zayif: 'zayıf bilinmeyen sinyal',
    dalga: 'DALGA BOYU', bant: 'Bant', blink: '◐ Göz Kırpma', buyutec: '🔍 Büyüteç', ilerleme: 'İLERLEME',
    dg_devam: 'Devam: tıkla / Boşluk', dg_atla: 'Atla ⏭',
    br_li1: '<b>İLERLEME çubuğunu</b> sağa kaydır: tarama ışını ilerledikçe yeni tarama gökyüzünü günceller.',
    br_li2: '<b>Dalga boyu</b> kaydırıcısıyla 102 kızılötesi renk arasında geçiş yap — bazı cisimler sadece belirli renklerde görünür.',
    br_li3: '<b>Göz Kırpma</b> ilk tarama ile şimdiki taramayı art arda gösterir. <b>Büyüteç (L)</b> imlecin altını 3 kat büyütür. Fare tekerleği: yakınlaştır, sürükle: gez.',
    br_li4: 'Yeni ortaya çıkan ya da yer değiştiren cismi bulunca <b>üzerine tıkla</b>. Yanlış tıklamalar yıldız kaybettirir.',
    br_basla: 'Taramaya Başla',
    ul_gonder: 'Veri NASA\'ya gönderiliyor...', ul_ulasti: 'Veri NASA\'ya ulaştı!',
    ul_log: 'Konum ölçülüyor (RA/Dec)...|Tarama karşılaştırması paketleniyor...|102 bant parlaklık verisi ekleniyor...|JPL / IRSA sunucusuna bağlanılıyor...|Gönderim tamamlandı ✓',
    sr_ust: 'TANIMLAMA · NASA SORUYOR', devam: 'Devam',
    ks_ust: 'YENİ KEŞİF · KOLEKSİYONA EKLENDİ', harika: 'Harika!',
    gorev_tamam_ust: 'GÖREV TAMAMLANDI', tekrar: 'Tekrar Oyna', sonraki: 'Sonraki Görev', final_izle: 'Finali İzle',
    kol_ust: 'KOLEKSİYON', kol_baslik: 'Keşif Kataloğu', cisimler: 'Cisimler', rozetler: 'Rozetler',
    hk_ust: 'NASIL OYNANIR?', hk_baslik: 'Gökyüzü Dedektifi Rehberi', hk_gorev: 'Görevin',
    hk_gorev_p: 'NASA\'nın SPHEREx teleskobu 2025\'ten beri tüm gökyüzünü her 6 ayda bir, 0.75–5.0 mikrometre arasındaki 102 kızılötesi renkte haritalıyor. Sen, bu görüntülerde değişen cisimleri bulan bir öğrenci dedektifsin.',
    hk_kontrol: 'Kontroller',
    hk_kontrol_ul: '<li><b>İLERLEME çubuğu</b> (← →): taramalar arasında zamanda ilerle. Tarama ışını geçtiği yeri yeni veriyle günceller.</li><li><b>Dalga boyu</b>: SPHEREx\'in 102 rengi arasında geç.</li><li><b>Göz Kırpma</b> (B): 1930\'da Pluto\'yu bulan yöntem! İlk tarama ile şimdiki taramayı art arda gösterir.</li><li><b>Büyüteç</b> (L): imlecin altını 3 kat büyüten pencere.</li><li><b>Fare tekerleği</b> (+ −): yakınlaştır · <b>sürükle</b>: gez · <b>tıkla</b>: cismi seç.</li><li><b>Uzaylılar</b> (son görev): gemi gelince üzerine tıkla ve kovala; yoksa parazit yapar, sahte cisim bırakır, dalga boyunu değiştirir ya da bir bölgeyi karartır.</li><li><b>İpucu</b> (H): PİKSEL\'den yardım al.</li><li><b>Dil</b>: ana menüden Türkçe / English seçebilirsin.</li>',
    hk_nadir: 'Nadirlik',
    hk_nadir_p: 'Gizemli ve Kaotik cisimler çok zordur: bazı seviyelerde rastgele saklanırlar, yalnızca <b>tek bir taramada</b> ve <b>dar bir dalga boyu aralığında</b> görünürler. <b>Anomali dedektörü</b> yanıp sönüyorsa o seviyede gizli bir cisim vardır; doğru bant ve doğru taramaya yaklaştıkça sinyal güçlenir.',
    hk_gercek: 'Gerçek mi?',
    hk_gercek_p: 'Oyundaki gökyüzü görüntüleri SPHEREx\'in nasıl çalıştığını anlatmak için üretilmiş benzetimlerdir. Cisim bilgileri gerçek bilime dayanır. Planet X, Gezegen Y, ilkel kara delik ve Tyche gerçekte bulunamamış, tartışılan varsayımlardır; uzaylılar tamamen kurgusaldır. Gerçek SPHEREx verileri NASA/IPAC IRSA arşivinde herkese açıktır.',
    sifirla: 'İlerlemeyi sıfırla', sifirlandi: 'İlerleme sıfırlandı.',
    yukleniyor: 'Gökyüzü hazırlanıyor...',
    gorev_n: 'GÖREV {n} / {t}', gorev_k: 'GÖREV {n}', gorev_tarama: 'GÖREV {n} · {k} TARAMA', gorev_bitti: 'GÖREV {n} TAMAMLANDI',
    harita_baslik: '{isim} · Görevler',
    br_hedef: 'Hedef nadirliği: <b>{r}</b><br><small>Gölgedeki cismi bul ve koleksiyonuna ekle!</small>',
    tarama: 'Tarama', aylar: 'Mayıs|Kasım', tik: '{n}. tarama', taraniyor: '{a}  ➜  {b} taranıyor %{p}', blink_tarama: 'TARAMA {n}',
    blink_once: 'Göz Kırpma için önce İLERLEME çubuğunu ileri kaydır.',
    buyutec_acik: '🔍 <b>Büyüteç açık:</b> fareyi gökyüzünde gezdir. (L ile kapat)',
    u_parazit: '👽 <b>Parazit!</b> Uzaylılar sinyali bozuyor...',
    u_sahte: '👽 <b>Uzaylılar sahte cisimler bıraktı!</b> Taramalar arasında rastgele zıplayanlara tıklama.',
    u_bant: '👽 <b>Dalga boyu karıştırıldı!</b> Kaydırıcı 3 saniye kilitli.',
    u_sis: '👽 <b>Uzaylılar bir bölgeyi kararttı!</b> Birkaç saniye bekle.',
    u_geldi: '👽 <b>UZAYLI GEMİSİ!</b> Hemen üzerine tıkla ve kovala!',
    u_kovalandi: '👽 <b>Uzaylı kovalandı!</b>', u_odul: ' Ödül: bir hatan silindi.',
    piksel: 'PİKSEL', zorlandin: 'Zorlandın mı? ',
    gizli_sinyal: '<b>⚠ {r} SİNYAL!</b> Bilinmeyen bir cisme kilitlenildi...',
    m_sahte: '<b>👽 Uzaylı tuzağı!</b> Bu sahte cisim taramalar arasında rastgele zıplıyor. Gerçek değil!',
    m_degisen: '<b>Değişen yıldız!</b> Parlaklığı değişiyor ama hep aynı yerde ve ilk taramadan beri orada. Yeni değil.',
    m_bilinen: '<b>Bu zaten katalogda:</b> {e}. NASA bunu biliyor — yeni olanı bul!',
    m_sabit: '<b>Sabit yıldız.</b> Tüm taramalarda aynı yerde duruyor.',
    bilinen: 'Bilinen',
    dogru: 'Doğru!', yanlis: '<b>Bu değil.</b> Cismin nasıl davrandığını düşün: hareket ediyor mu, hangi dalga boyunda görünüyor? Tekrar dene!',
    yeni_rozet: 'Yeni rozet', sn_eksik: ' (3 yıldız için yanlış tıklama yapmadan bul!)', sn_tam: ' Kusursuz — 3 yıldız!',
    final_alt: '{isim}, Gökyüzü Dedektifi',
    kol_gizli: 'Gizli cisim — bir seviyede saklanıyor', kol_gorevde: 'Görevde keşfedilecek',
    seviye: 'Seviye {n}', gizli: 'Gizli', basari: 'Başarı', kilitli: 'Kilitli'
  },
  en: {
    doc_baslik: 'SPHEREx: Sky Detective',
    alt_baslik: 'Sky Detective',
    slogan: 'On the trail of Planet X · the sky in 102 colors · 12 missions · 17 mysterious objects · aliens!',
    isim_etiket: 'Your detective name', dil: 'Language',
    basla: 'Start Mission', devam_et: 'Continue', koleksiyon: 'Collection', nasil: 'How to Play',
    ana_menu: '‹ Main Menu', harita_ust: 'SKY DETECTIVES · MISSION CONTROL', gorevler: 'Missions',
    ipucu: 'Hint', ses: 'Sound',
    t_ipucu: 'Hint (H)', t_ses: 'Sound', t_gorevler: 'Missions', t_yak: 'Zoom in (+)', t_uzak: 'Zoom out (-)', t_sifir: 'Full field',
    t_blink: 'Blink (B)', t_buyutec: 'Magnifier (L)', t_oynat: 'Play',
    an_baslik: 'ANOMALY DETECTOR', an_yok: 'no signal', an_guclu: 'STRONG SIGNAL!', an_yakin: 'signal getting closer...', an_zayif: 'weak unknown signal',
    dalga: 'WAVELENGTH', bant: 'Band', blink: '◐ Blink', buyutec: '🔍 Magnifier', ilerleme: 'PROGRESS',
    dg_devam: 'Continue: click / Space', dg_atla: 'Skip ⏭',
    br_li1: 'Drag the <b>PROGRESS bar</b> to the right: as the scan beam moves, the new scan updates the sky.',
    br_li2: 'Use the <b>wavelength</b> slider to switch between 102 infrared colors — some objects appear only in certain colors.',
    br_li3: '<b>Blink</b> shows the first scan and the current scan one after another. <b>Magnifier (L)</b> enlarges the area under the cursor 3×. Mouse wheel: zoom, drag: move around.',
    br_li4: 'When you find the object that newly appeared or changed position, <b>click it</b>. Wrong clicks cost stars.',
    br_basla: 'Start Scanning',
    ul_gonder: 'Sending data to NASA...', ul_ulasti: 'Data received by NASA!',
    ul_log: 'Measuring position (RA/Dec)...|Packing scan comparison...|Adding 102-band brightness data...|Connecting to JPL / IRSA server...|Upload complete ✓',
    sr_ust: 'IDENTIFICATION · NASA ASKS', devam: 'Continue',
    ks_ust: 'NEW DISCOVERY · ADDED TO COLLECTION', harika: 'Awesome!',
    gorev_tamam_ust: 'MISSION COMPLETE', tekrar: 'Play Again', sonraki: 'Next Mission', final_izle: 'Watch the Finale',
    kol_ust: 'COLLECTION', kol_baslik: 'Discovery Catalog', cisimler: 'Objects', rozetler: 'Badges',
    hk_ust: 'HOW TO PLAY', hk_baslik: 'Sky Detective Guide', hk_gorev: 'Your mission',
    hk_gorev_p: 'Since 2025, NASA\'s SPHEREx telescope has been mapping the whole sky every 6 months in 102 infrared colors between 0.75 and 5.0 micrometers. You are a student detective who finds the objects that change in these images.',
    hk_kontrol: 'Controls',
    hk_kontrol_ul: '<li><b>PROGRESS bar</b> (← →): move through time between scans. The scan beam updates the sky with new data as it passes.</li><li><b>Wavelength</b>: switch between SPHEREx\'s 102 colors.</li><li><b>Blink</b> (B): the method that found Pluto in 1930! Shows the first scan and the current scan one after another.</li><li><b>Magnifier</b> (L): a window that enlarges the area under the cursor 3×.</li><li><b>Mouse wheel</b> (+ −): zoom · <b>drag</b>: move · <b>click</b>: select an object.</li><li><b>Aliens</b> (last mission): when a ship arrives, click it to chase it away; otherwise it scrambles the screen, drops fake objects, changes your wavelength or blacks out a region.</li><li><b>Hint</b> (H): ask PIXEL for help.</li><li><b>Language</b>: choose Türkçe / English from the main menu.</li>',
    hk_nadir: 'Rarity',
    hk_nadir_p: 'Mysterious and Chaotic objects are very hard: they hide randomly in some levels and appear only in <b>a single scan</b> and in <b>a narrow wavelength range</b>. If the <b>anomaly detector</b> is blinking, a hidden object is in that level; the signal grows stronger as you get closer to the right band and the right scan.',
    hk_gercek: 'Is it real?',
    hk_gercek_p: 'The sky images in the game are simulations made to explain how SPHEREx works. The object facts are based on real science. Planet X, Planet Y, the primordial black hole and Tyche are debated hypotheses that have not been found; the aliens are completely fictional. Real SPHEREx data is publicly available in the NASA/IPAC IRSA archive.',
    sifirla: 'Reset progress', sifirlandi: 'Progress reset.',
    yukleniyor: 'Preparing the sky...',
    gorev_n: 'MISSION {n} / {t}', gorev_k: 'MISSION {n}', gorev_tarama: 'MISSION {n} · {k} SCANS', gorev_bitti: 'MISSION {n} COMPLETE',
    harita_baslik: '{isim} · Missions',
    br_hedef: 'Target rarity: <b>{r}</b><br><small>Find the object in the shadow and add it to your collection!</small>',
    tarama: 'Scan', aylar: 'May|Nov', tik: 'scan {n}', taraniyor: '{a}  ➜  {b} scanning {p}%', blink_tarama: 'SCAN {n}',
    blink_once: 'To use Blink, first move the PROGRESS bar forward.',
    buyutec_acik: '🔍 <b>Magnifier on:</b> move the mouse over the sky. (L to close)',
    u_parazit: '👽 <b>Interference!</b> The aliens are scrambling the signal...',
    u_sahte: '👽 <b>The aliens dropped fake objects!</b> Do not click things that jump randomly between scans.',
    u_bant: '👽 <b>Wavelength scrambled!</b> The slider is locked for 3 seconds.',
    u_sis: '👽 <b>The aliens blacked out a region!</b> Wait a few seconds.',
    u_geldi: '👽 <b>ALIEN SHIP!</b> Click it right away and chase it off!',
    u_kovalandi: '👽 <b>Alien chased away!</b>', u_odul: ' Reward: one mistake erased.',
    piksel: 'PIXEL', zorlandin: 'Having trouble? ',
    gizli_sinyal: '<b>⚠ {r} SIGNAL!</b> Locked onto an unknown object...',
    m_sahte: '<b>👽 Alien trap!</b> This fake object jumps randomly between scans. It is not real!',
    m_degisen: '<b>Variable star!</b> Its brightness changes, but it stays in the same place and has been there since the first scan. Not new.',
    m_bilinen: '<b>Already in the catalog:</b> {e}. NASA knows this one — find the new one!',
    m_sabit: '<b>Fixed star.</b> It stays in the same place in every scan.',
    bilinen: 'Known',
    dogru: 'Correct!', yanlis: '<b>Not this one.</b> Think about how the object behaves: does it move, and at which wavelength is it visible? Try again!',
    yeni_rozet: 'New badge', sn_eksik: ' (Find it without wrong clicks for 3 stars!)', sn_tam: ' Perfect — 3 stars!',
    final_alt: '{isim}, Sky Detective',
    kol_gizli: 'Hidden object — hiding in one of the levels', kol_gorevde: 'To be discovered in a mission',
    seviye: 'Level {n}', gizli: 'Hidden', basari: 'Achievement', kilitli: 'Locked'
  }
};

SX.dil = (function () {
  var p = new URLSearchParams(location.search).get('lang');
  if (p === 'en' || p === 'tr') return p;
  try { var k = localStorage.getItem('spherex_dil'); if (k === 'en' || k === 'tr') return k; } catch (e) {}
  return 'tr';
})();

SX.t = function (k, p) {
  var s = (SX.METIN[SX.dil] || {})[k];
  if (s === undefined) s = SX.METIN.tr[k];
  if (s === undefined) return k;
  if (p) for (var a in p) s = s.split('{' + a + '}').join(p[a]);
  return s;
};

/* Türkçe orijinal içeriği yedekle, seçilen dile göre veri nesnelerini güncelle */
SX._yedekAl = function () {
  if (SX._TR) return;
  var y = { RARITY: {}, KARAKTER: {}, CISIMLER: {}, SEVIYELER: {}, EK_ROZETLER: {}, HIKAYE: {}, BITIS_SOZU: {} };
  for (var r in SX.RARITY) y.RARITY[r] = SX.RARITY[r].ad;
  for (var k in SX.KARAKTER) y.KARAKTER[k] = { ad: SX.KARAKTER[k].ad, rol: SX.KARAKTER[k].rol };
  for (var c in SX.CISIMLER) y.CISIMLER[c] = { ad: SX.CISIMLER[c].ad, kisa: SX.CISIMLER[c].kisa, bilgiler: SX.CISIMLER[c].bilgiler.slice() };
  SX.SEVIYELER.forEach(function (s) {
    y.SEVIYELER[s.no] = { baslik: s.baslik, altBaslik: s.altBaslik, gorev: s.gorev, ipucu: s.ipucu,
      soru: { metin: s.soru.metin, secenekler: s.soru.secenekler.slice(), aciklama: s.soru.aciklama },
      rozet: { ad: s.rozet.ad, aciklama: s.rozet.aciklama } };
  });
  SX.EK_ROZETLER.forEach(function (e) { y.EK_ROZETLER[e.id] = { ad: e.ad, aciklama: e.aciklama }; });
  for (var h in SX.HIKAYE) y.HIKAYE[h] = SX.HIKAYE[h].map(function (d) { return d.metin; });
  for (var b in SX.BITIS_SOZU) y.BITIS_SOZU[b] = SX.BITIS_SOZU[b];
  SX._TR = y;
};

SX.veriDiliUygula = function () {
  SX._yedekAl();
  var T = SX._TR, E = SX.EN, en = SX.dil === 'en';
  for (var r in SX.RARITY) SX.RARITY[r].ad = en ? E.RARITY[r] : T.RARITY[r];
  for (var k in SX.KARAKTER) {
    var ek = en && E.KARAKTER[k] || {};
    SX.KARAKTER[k].ad = ek.ad || T.KARAKTER[k].ad;
    SX.KARAKTER[k].rol = ek.rol !== undefined ? ek.rol : T.KARAKTER[k].rol;
  }
  for (var c in SX.CISIMLER) {
    var src = en ? E.CISIMLER[c] : T.CISIMLER[c];
    if (!src) continue;
    SX.CISIMLER[c].ad = src.ad; SX.CISIMLER[c].kisa = src.kisa; SX.CISIMLER[c].bilgiler = src.bilgiler.slice();
  }
  SX.SEVIYELER.forEach(function (s) {
    var v = en ? E.SEVIYELER[s.no] : T.SEVIYELER[s.no];
    if (!v) return;
    s.baslik = v.baslik; s.altBaslik = v.altBaslik; s.gorev = v.gorev; s.ipucu = v.ipucu;
    s.soru.metin = v.soru.metin; s.soru.secenekler = v.soru.secenekler.slice(); s.soru.aciklama = v.soru.aciklama;
    s.rozet.ad = v.rozet.ad; s.rozet.aciklama = v.rozet.aciklama;
  });
  SX.EK_ROZETLER.forEach(function (e) { var v = en ? E.EK_ROZETLER[e.id] : T.EK_ROZETLER[e.id]; if (v) { e.ad = v.ad; e.aciklama = v.aciklama; } });
  for (var h in SX.HIKAYE) {
    var satir = en ? E.HIKAYE[h] : T.HIKAYE[h];
    if (satir) SX.HIKAYE[h].forEach(function (d, i) { if (satir[i]) d.metin = satir[i]; });
  }
  for (var b in SX.BITIS_SOZU) SX.BITIS_SOZU[b] = en ? E.BITIS_SOZU[b] : T.BITIS_SOZU[b];
};

SX.htmlDiliUygula = function () {
  document.documentElement.lang = SX.dil;
  document.title = SX.t('doc_baslik');
  document.querySelectorAll('[data-i18n]').forEach(function (el) { el.innerHTML = SX.t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) { el.title = SX.t(el.getAttribute('data-i18n-title')); });
  document.querySelectorAll('[data-rar]').forEach(function (el) { el.textContent = SX.RARITY[el.getAttribute('data-rar')].ad; });
  document.querySelectorAll('[data-dil]').forEach(function (b) { b.classList.toggle('acik', b.getAttribute('data-dil') === SX.dil); });
};

SX.dilAyarla = function (d) {
  SX.dil = d === 'en' ? 'en' : 'tr';
  try { localStorage.setItem('spherex_dil', SX.dil); } catch (e) {}
  SX.veriDiliUygula();
  SX.htmlDiliUygula();
  if (SX.onDilDegisti) SX.onDilDegisti();
};
