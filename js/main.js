/* =========================================================
   ANA AKIŞ — ekranlar, seviye döngüsü, girdi, oyun mantığı
   ========================================================= */
(function () {
  var renderer, sky, cut, mod = 'sahne';
  var sev = null, hata = 0, mesgul = false, oynat = false, bekle = 0, sonIsinSes = 0;
  var etiketler = {};
  var buyutec = false, fare = { x: 0, y: 0, icerde: false }, ufoSayac = 8, bantKilit = 0;
  var URL_P = new URLSearchParams(location.search);
  var GIZLI_ZORLA = URL_P.get('gizli') === '1';

  /* ---------- Başlatma ---------- */
  function baslat() {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    $('#sahne').appendChild(renderer.domElement);
    sky = new SX.Sky(renderer); cut = new SX.Cutscene(renderer);
    sky.onUfoEylem = function (tur, ufo) { ufoEylem(tur, ufo); };
    window.addEventListener('resize', boyutla); boyutla();
    SX.kayitYukle();
    SX.veriDiliUygula(); SX.htmlDiliUygula();
    SX.onDilDegisti = dilDegisti;
    // eski kayıtlar: biten en yüksek görevin bir sonrakini aç (yeni seviyeler eklenince)
    SX.SEVIYELER.forEach(function (s) { if (SX.kayit.rozet['s' + s.no]) SX.kayit.acik = Math.max(SX.kayit.acik, Math.min(SX.SEVIYELER.length, s.no + 1)); });
    if (URL_P.get('hepsi') === '1') SX.kayit.acik = SX.SEVIYELER.length;
    $('#isim').value = SX.kayit.isim || 'Zirve';
    baslaYazisi();
    cut.baslat('baslik'); mod = 'sahne';
    olaylar();
    var son = performance.now();
    function dongu(now) {
      var dt = Math.min(0.05, (now - son) / 1000); son = now;
      if (mod === 'oyun') { oyunGuncelle(dt); sky.guncelle(dt); sky.ciz(); buyutecGuncelle(); etiketGuncelle(); }
      else { $('#buyutec').style.display = 'none'; cut.guncelle(dt); cut.ciz(); }
      requestAnimationFrame(dongu);
    }
    requestAnimationFrame(dongu);
    setTimeout(function () { $('#yukleniyor').classList.add('git'); }, 300);
  }
  function baslaYazisi() {
    var devam = SX.kayit.acik > 1 || Object.keys(SX.kayit.yildiz).length;
    $('#btn-basla').textContent = SX.t(devam ? 'devam_et' : 'basla');
  }
  function dilDegisti() {
    baslaYazisi();
    if ($('#ekran-harita').classList.contains('acik')) haritaGoster();
    if ($('#koleksiyon').classList.contains('acik')) SX.UI.koleksiyonDoldur();
  }
  function boyutla() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h); sky.boyutla(w, h); cut.boyutla(w, h);
  }
  function ekran(id) {
    document.querySelectorAll('.ekran').forEach(function (e) { e.classList.toggle('acik', '#' + e.id === id); });
  }

  /* ---------- Olaylar ---------- */
  function olaylar() {
    $('#btn-basla').onclick = function () {
      SX.Ses.baslat(); SX.Ses.ortam(true); SX.Ses.tik();
      SX.kayit.isim = ($('#isim').value || 'Zirve').trim().slice(0, 16) || 'Zirve'; SX.kayitSakla();
      if (SX.kayit.acik === 1 && !SX.kayit.yildiz[1]) seviyeBaslat(1); else haritaGoster();
    };
    $('#btn-koleksiyon').onclick = koleksiyonAc;
    $('#btn-hakkinda').onclick = function () { SX.Ses.baslat(); SX.UI.pencere('#hakkinda'); };
    $('#harita-geri').onclick = function () { ekran('#ekran-baslik'); baslaYazisi(); };
    document.querySelectorAll('[data-dil]').forEach(function (b) { b.onclick = function () { SX.Ses.baslat(); SX.Ses.tik(); SX.dilAyarla(b.getAttribute('data-dil')); }; });
    $('#harita-kol').onclick = koleksiyonAc;
    $('#btn-sifirla').onclick = function () {
      SX.kayitSifirla(); SX.UI.bildir(SX.t('sifirlandi'), 'altin'); SX.UI.pencere('#hakkinda', false);
      baslaYazisi();
    };
    document.querySelectorAll('[data-kapat]').forEach(function (b) { b.onclick = function () { SX.Ses.tik(); SX.UI.pencere(b.dataset.kapat, false); }; });
    document.querySelectorAll('.sekme').forEach(function (s) {
      s.onclick = function () {
        document.querySelectorAll('.sekme').forEach(function (x) { x.classList.toggle('acik', x === s); });
        document.querySelectorAll('.sekme-icerik').forEach(function (x) { x.classList.toggle('acik', x.id === s.dataset.s); });
      };
    });

    // HUD
    $('#zaman').addEventListener('input', function () {
      oynat = false; $('#btn-oynat').textContent = '▶';
      zamanAyarla(parseFloat(this.value));
    });
    $('#band').addEventListener('input', function () { if (bantKilit > 0) { this.value = sky.band; return; } bandAyarla(parseFloat(this.value)); });
    $('#btn-oynat').onclick = function () {
      SX.Ses.tik();
      if (sky.t >= sky.E - 1) zamanAyarla(0);
      oynat = !oynat; bekle = 0; this.textContent = oynat ? '❚❚' : '▶';
    };
    $('#btn-blink').onclick = blinkDegistir;
    $('#btn-buyutec').onclick = buyutecDegistir;
    $('#btn-ipucu').onclick = ipucu;
    $('#btn-kol').onclick = koleksiyonAc;
    $('#btn-ses').onclick = function () { SX.Ses.baslat(); SX.Ses.ac(!SX.Ses.acik); this.firstChild.nodeValue = SX.Ses.acik ? '🔊' : '🔇'; };
    $('#btn-menu').onclick = function () { if (mesgul) return; oyundanCik(); haritaGoster(); };
    $('#btn-yak').onclick = function () { sky.yakinlastir(0.75); };
    $('#btn-uzak').onclick = function () { sky.yakinlastir(1.33); };
    $('#btn-sifir').onclick = function () { sky.ayarlaKamera(true); };

    // tuval: sürükle / tıkla / tekerlek
    var cv = renderer.domElement, basili = null;
    cv.addEventListener('pointerdown', function (e) { if (mod !== 'oyun') return; basili = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, kaydi: false }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', function (e) {
      fare.x = e.clientX; fare.y = e.clientY; fare.icerde = true;
      if (!basili) return;
      var dx = e.clientX - basili.x, dy = e.clientY - basili.y;
      if (!basili.kaydi && Math.hypot(e.clientX - basili.sx, e.clientY - basili.sy) > 6) basili.kaydi = true;
      if (basili.kaydi) { sky.kaydir(dx, dy, window.innerHeight); cv.style.cursor = 'grabbing'; }
      basili.x = e.clientX; basili.y = e.clientY;
    });
    cv.addEventListener('pointerup', function (e) {
      if (!basili) return; var b = basili; basili = null; cv.style.cursor = '';
      if (!b.kaydi) tikla(e.clientX, e.clientY);
    });
    cv.addEventListener('pointerleave', function () { fare.icerde = false; });
    cv.addEventListener('wheel', function (e) {
      if (mod !== 'oyun') return; e.preventDefault();
      sky.yakinlastir(e.deltaY > 0 ? 1.15 : 0.87, e.clientX, e.clientY, window.innerWidth, window.innerHeight);
    }, { passive: false });

    document.addEventListener('keydown', function (e) {
      if (mod !== 'oyun' || $('#diyalog').classList.contains('acik') || document.querySelector('.pencere.acik')) return;
      if (e.code === 'ArrowRight') { zamanAyarla(sky.t + (e.shiftKey ? 1 : 0.05)); }
      else if (e.code === 'ArrowLeft') { zamanAyarla(sky.t - (e.shiftKey ? 1 : 0.05)); }
      else if (e.code === 'ArrowUp') { if (bantKilit <= 0) bandAyarla(sky.band + 0.042); }
      else if (e.code === 'ArrowDown') { if (bantKilit <= 0) bandAyarla(sky.band - 0.042); }
      else if (e.code === 'KeyL') buyutecDegistir();
      else if (e.code === 'KeyB') blinkDegistir();
      else if (e.code === 'KeyH') ipucu();
      else if (e.key === '+' || e.code === 'NumpadAdd') sky.yakinlastir(0.8);
      else if (e.key === '-' || e.code === 'NumpadSubtract') sky.yakinlastir(1.25);
      else if (e.code === 'Space') { e.preventDefault(); $('#btn-oynat').click(); }
    });
  }

  /* ---------- Harita ---------- */
  function haritaGoster() {
    mod = 'sahne'; if (cut.id !== 'baslik') cut.baslat('baslik');
    $('#hud').classList.remove('acik'); $('#sinematik').classList.remove('acik');
    ekran('#ekran-harita');
    $('#harita-baslik').textContent = SX.t('harita_baslik', { isim: SX.kayit.isim });
    var bul = Object.keys(SX.kayit.bulunan).length;
    $('#harita-kol-sayi').textContent = bul + '/' + SX.KOLEKSIYON_SIRASI.length;
    var html = '';
    SX.SEVIYELER.forEach(function (s, i) {
      var c = SX.CISIMLER[s.hedef], r = SX.RARITY[c.nadirlik];
      var kilit = s.no > SX.kayit.acik, y = SX.kayit.yildiz[s.no] || 0, tamam = !!SX.kayit.rozet['s' + s.no];
      var yz = ''; for (var k = 0; k < 3; k++) yz += '<i class="' + (k < y ? 'on' : '') + '"></i>';
      html += '<div class="dugum ' + (kilit ? 'kilitli' : '') + (tamam ? ' tamam' : '') + '" data-no="' + s.no + '" data-n="' + c.nadirlik + '" style="--nr:' + r.renk + ';animation-delay:' + (i * 0.06) + 's">' +
        '<img class="d-ikon" src="' + SX.UI.ikon(c.ikon) + '">' +
        '<div class="d-no">' + SX.t('gorev_k', { n: s.no }) + '</div><div class="d-baslik">' + s.baslik + '</div><div class="d-alt">' + s.altBaslik + '</div>' +
        '<div class="d-alt-satir"><span class="d-nadir">' + r.ad + '</span><div class="yildizlar">' + yz + '</div></div>' +
        (kilit ? '<div class="d-kilit">🔒</div>' : '') + '</div>';
    });
    $('#harita-yol').innerHTML = html;
    document.querySelectorAll('.dugum').forEach(function (d) {
      d.onclick = function () {
        var no = +d.dataset.no;
        if (no > SX.kayit.acik) { SX.Ses.hata(); d.classList.add('salla'); setTimeout(function () { d.classList.remove('salla'); }, 300); return; }
        SX.Ses.tik(); seviyeBaslat(no);
      };
    });
  }

  function koleksiyonAc() { SX.Ses.baslat(); SX.Ses.tik(); SX.UI.koleksiyonDoldur(); SX.UI.pencere('#koleksiyon'); }

  /* ---------- Seviye akışı ---------- */
  function seviyeBaslat(no) {
    sev = SX.SEVIYELER[no - 1];
    ekran(null); $('#hud').classList.remove('acik');
    oyundanCik();
    cut.baslat(sev.sahne); mod = 'sahne';
    var sn = $('#sinematik'); sn.classList.add('acik');
    $('.bk-no').textContent = SX.t('gorev_n', { n: sev.no, t: SX.SEVIYELER.length });
    $('.bk-baslik').textContent = sev.baslik;
    $('.bk-alt').textContent = sev.altBaslik;
    var bk = $('#bolum-karti'); bk.classList.add('acik');
    setTimeout(function () {
      bk.classList.remove('acik');
      SX.UI.diyalog(SX.HIKAYE[sev.sahne], function () { brifing(); });
    }, 2300);
  }

  function brifing() {
    $('#sinematik').classList.remove('acik');
    hata = 0; mesgul = false; oynat = false; $('#btn-oynat').textContent = '▶';
    ufoSayac = 7; bantKilit = 0; $('#band').disabled = false; $('#parazit').classList.remove('acik');
    sky.kur(sev, { bulunan: SX.kayit.bulunan, gizliZorla: GIZLI_ZORLA });
    sky.boyutla(window.innerWidth, window.innerHeight);
    mod = 'oyun';
    hudKur();
    var c = SX.CISIMLER[sev.hedef], r = SX.RARITY[c.nadirlik];
    $('#br-no').textContent = SX.t('gorev_tarama', { n: sev.no, k: sev.taramaSayisi });
    $('#br-baslik').textContent = sev.baslik;
    $('#br-gorev').textContent = sev.gorev;
    var h = $('#br-hedef'); h.style.setProperty('--nr', r.renk);
    h.innerHTML = '<img src="' + SX.UI.ikon(c.ikon) + '"><div>' + SX.t('br_hedef', { r: r.ad }) + '</div>';
    SX.UI.pencere('#brifing');
    $('#br-basla').onclick = function () { SX.Ses.tik(); SX.UI.pencere('#brifing', false); };
  }

  function hudKur() {
    $('#hud').classList.add('acik');
    var c = SX.CISIMLER[sev.hedef], r = SX.RARITY[c.nadirlik];
    $('#hud-no').textContent = SX.t('gorev_n', { n: sev.no, t: SX.SEVIYELER.length });
    $('#hud-baslik').textContent = sev.baslik;
    var hd = $('#hud-hedef'); hd.style.setProperty('--nr', r.renk);
    hd.innerHTML = sev.gorev + ' <b>[' + r.ad + ']</b>';
    var z = $('#zaman'); z.max = sev.taramaSayisi - 1; z.value = 0;
    var tk = '';
    for (var i = 0; i < sev.taramaSayisi; i++) {
      var p = i / (sev.taramaSayisi - 1) * 100;
      tk += '<div class="tik" style="left:' + p + '%"><em>' + SX.t('tik', { n: i + 1 }) + '</em></div>';
    }
    $('#zaman-tikler').innerHTML = tk;
    $('#band').value = sev.baslangicBandi;
    $('#blink-etiket').classList.remove('acik'); $('#btn-blink').classList.remove('acik');
    zamanAyarla(0); bandAyarla(sev.baslangicBandi); yildizGoster();
    $('#etiketler').innerHTML = ''; etiketler = {};
  }

  function oyundanCik() {
    $('#etiketler').innerHTML = ''; etiketler = {};
    $('#parazit').classList.remove('acik');
    if (sky.blink) { sky.blink = false; }
  }

  function zamanAyarla(t) {
    var once = sky.t;
    sky.ayarlaZaman(t);
    $('#zaman').value = sky.t;
    var oran = sky.t / (sky.E - 1) * 100;
    $('#zaman-dolu').style.width = oran + '%';
    document.querySelectorAll('#zaman-tikler .tik').forEach(function (el, i) { el.classList.toggle('gecti', i <= sky.t + 0.0001); });
    var e0 = Math.floor(sky.t + 0.0001), f = sky.t - e0;
    $('#tarama-etiket').textContent = (f > 0.01 && e0 < sky.E - 1) ?
      SX.t('taraniyor', { a: SX.taramaEtiketi(e0), b: SX.taramaEtiketi(e0 + 1).split(' · ')[0], p: Math.round(f * 100) }) :
      SX.taramaEtiketi(Math.round(sky.t));
    var now = performance.now();
    if (Math.abs(once - sky.t) > 0.002 && now - sonIsinSes > 90) { SX.Ses.isin(); sonIsinSes = now; }
  }
  function bandAyarla(l) {
    l = Math.max(SX.BAND.min, Math.min(SX.BAND.max, l));
    sky.ayarlaBand(l); $('#band').value = l;
    var no = Math.round((l - SX.BAND.min) / (SX.BAND.max - SX.BAND.min) * (SX.BAND.adet - 1)) + 1;
    $('#band-deger').textContent = l.toFixed(2) + ' µm';
    $('#band-no').textContent = SX.t('bant') + ' ' + no + ' / ' + SX.BAND.adet;
  }
  function blinkDegistir() {
    SX.Ses.tik();
    sky.blink = !sky.blink; sky.blinkFaz = 1; sky.guncelleGorunum();
    $('#btn-blink').classList.toggle('acik', sky.blink);
    $('#blink-etiket').classList.toggle('acik', sky.blink);
    if (sky.blink && Math.round(sky.t) === 0) SX.UI.bildir(SX.t('blink_once'), 'ipucu');
  }
  function buyutecDegistir() {
    SX.Ses.tik(); buyutec = !buyutec;
    $('#btn-buyutec').classList.toggle('acik', buyutec);
    if (buyutec) SX.UI.bildir(SX.t('buyutec_acik'), 'ipucu');
  }
  function buyutecGuncelle() {
    var b = $('#buyutec');
    if (!buyutec || !fare.icerde || document.querySelector('.pencere.acik')) { b.style.display = 'none'; return; }
    var r = sky.buyutecCiz(fare.x, fare.y, window.innerWidth, window.innerHeight);
    b.style.display = 'block'; b.style.left = r.x + 'px'; b.style.top = r.y + 'px'; b.style.width = b.style.height = r.S + 'px';
  }
  function ufoEylem(tur, ufo) {
    if (mod !== 'oyun') return;
    SX.Ses.hata();
    if (tur === 'parazit') {
      $('#parazit').classList.add('acik'); sky.sarsinti = 4;
      SX.UI.bildir(SX.t('u_parazit'), 'hata');
      setTimeout(function () { $('#parazit').classList.remove('acik'); }, 4000);
    } else if (tur === 'sahte') {
      sky.sahteEkle(3, ufo.to.x, ufo.to.y);
      SX.UI.bildir(SX.t('u_sahte'), 'hata');
    } else if (tur === 'bant') {
      var yeni = sky.band + (Math.random() < 0.5 ? -1 : 1) * (1.2 + Math.random());
      if (yeni < SX.BAND.min + 0.2 || yeni > SX.BAND.max - 0.2) yeni = sky.band > 2.9 ? sky.band - 1.8 : sky.band + 1.8;
      bandAyarla(yeni); bantKilit = 3.5; $('#band').disabled = true;
      SX.UI.bildir(SX.t('u_bant'), 'hata');
    } else if (tur === 'perde') {
      sky.perdeEkle(ufo.to.x, ufo.to.y, 6);
      SX.UI.bildir(SX.t('u_sis'), 'hata');
    }
  }
  function ipucu() { SX.Ses.tik(); SX.UI.bildir('<b>' + SX.t('piksel') + ':</b> ' + sev.ipucu, 'ipucu'); }

  function yildizSayisi() { return hata === 0 ? 3 : hata <= 2 ? 2 : 1; }
  function yildizGoster() {
    var y = yildizSayisi();
    document.querySelectorAll('#hud-yildiz i').forEach(function (el, i) { el.classList.toggle('on', i < y); });
  }

  /* ---------- Her kare ---------- */
  function oyunGuncelle(dt) {
    if (oynat) {
      if (bekle > 0) bekle -= dt;
      else {
        var once = sky.t, yeni = sky.t + dt * 0.45;
        if (Math.floor(yeni) > Math.floor(once)) { yeni = Math.floor(yeni); bekle = 0.7; }
        zamanAyarla(yeni);
        if (sky.t >= sky.E - 1) { oynat = false; $('#btn-oynat').textContent = '▶'; }
      }
    }
    if (sky.blink) {
      var be = $('#blink-etiket');
      var gT = sky.blinkFaz === 0 ? 1 : Math.round(sky.t) + 1;
      be.textContent = SX.t('blink_tarama', { n: gT }); be.classList.toggle('ilk', sky.blinkFaz === 0);
    }
    // uzaylılar (yalnızca uzayli: true seviyelerde)
    if (bantKilit > 0) { bantKilit -= dt; if (bantKilit <= 0) { $('#band').disabled = false; } }
    if (sev.uzayli && !mesgul && !sky.hedefBulundu && !sky.ufo && !document.querySelector('.pencere.acik')) {
      ufoSayac -= dt;
      if (ufoSayac <= 0) {
        var turler = ['parazit', 'sahte', 'bant', 'perde'];
        sky.ufoBaslat(turler[Math.floor(Math.random() * turler.length)]);
        SX.Ses.ufo();
        SX.UI.bildir(SX.t('u_geldi'), 'hata');
        ufoSayac = 9 + Math.random() * 7;
      }
    }
    // anomali dedektörü
    var a = sky.anomaliSinyali(), an = $('#anomali');
    an.classList.toggle('pasif', !a.var);
    an.classList.toggle('canli', a.var);
    var seviye = a.var ? Math.max(1, Math.round(a.guc * 6)) : 0;
    var titre = a.var && a.guc < 0.15 ? (Math.random() < 0.08 ? 1 : 0) : 0;
    an.querySelectorAll('.an-bar i').forEach(function (el, i) {
      el.classList.toggle('on', i < Math.max(seviye, titre)); el.classList.toggle('kirmizi', a.guc > 0.8);
    });
    $('#an-durum').textContent = SX.t(!a.var ? 'an_yok' : a.guc > 0.8 ? 'an_guclu' : a.guc > 0.4 ? 'an_yakin' : 'an_zayif');
  }

  function etiketGuncelle() {
    var w = window.innerWidth, h = window.innerHeight, v = new THREE.Vector3();
    sky.objeler.forEach(function (o, i) {
      var goster = (o.tur === 'bilinen' && o.gorunurluk > 0.1) || (o.renkli && o.etiketGoster);
      var el = o._etiketEl;
      if (!goster) { if (el) el.style.display = 'none'; return; }
      if (!el) {
        el = document.createElement('div'); o._etiketEl = el;
        el.className = 'etiket ' + (o.tur === 'bilinen' ? 'bilinen' : 'bulundu');
        if (o.tur !== 'bilinen') { var c = SX.CISIMLER[o.id]; el.style.setProperty('--nr', SX.RARITY[c.nadirlik].renk); el.textContent = c.ad + ' · ' + SX.RARITY[c.nadirlik].ad; }
        else el.textContent = o.etiket;
        $('#etiketler').appendChild(el);
      }
      v.set(o.x, o.y, 0).project(sky.camera);
      el.style.display = 'block';
      el.style.left = ((v.x + 1) / 2 * w) + 'px'; el.style.top = ((1 - v.y) / 2 * h) + 'px';
    });
  }

  /* ---------- Tıklama ---------- */
  function tikla(x, y) {
    if (mesgul || mod !== 'oyun') return;
    SX.Ses.baslat();
    var r = sky.sec(x, y, window.innerWidth, window.innerHeight);
    if (r.tur === 'hedef') {
      if (sky.hedefBulundu) return;
      sky.hedefBulundu = true; mesgul = true; oynat = false;
      if (sky.blink) blinkDegistir();
      var c = SX.CISIMLER[sev.hedef];
      SX.Ses.kilit();
      sky.kilitlen(r.obje, SX.RARITY[c.nadirlik].renk, function () {
        (r.obje.grup ? r.obje.grup.parcalar : [r.obje]).forEach(function (p, i) { p.etiketGoster = i === 0; });
        SX.UI.uplink(sev.hedef, soruGoster);
      });
    } else if (r.tur === 'gizli') {
      if (r.obje.bulundu) return;
      r.obje.bulundu = true; mesgul = true;
      var gc = SX.CISIMLER[r.obje.id];
      SX.Ses.kilit();
      SX.UI.bildir(SX.t('gizli_sinyal', { r: SX.RARITY[gc.nadirlik].ad.toLocaleUpperCase(SX.dil) }), 'altin');
      sky.kilitlen(r.obje, SX.RARITY[gc.nadirlik].renk, function () {
        r.obje.etiketGoster = true;
        SX.UI.uplink(r.obje.id, function () { gizliKesif(r.obje.id); });
      });
    } else if (r.tur === 'ufo') {
      sky.ufoKovala(); SX.Ses.kilit();
      var m0 = SX.t('u_kovalandi');
      if (hata > 0) { hata--; yildizGoster(); m0 += SX.t('u_odul'); }
      SX.UI.bildir(m0, 'altin');
      if (!SX.kayit.bulunan.ufo) { mesgul = true; setTimeout(function () { SX.UI.uplink('ufo', function () { gizliKesif('ufo'); }); }, 700); }
    } else if (r.tur === 'bos') {
      sky.ping(r.x, r.y);
    } else {
      hata++; yildizGoster(); SX.Ses.hata(); sky.hataIsareti(r.x, r.y);
      var m = r.tur === 'sahte' ? SX.t('m_sahte') :
              r.tur === 'degisen' ? SX.t('m_degisen') :
              r.tur === 'bilinen' ? SX.t('m_bilinen', { e: r.obje.etiket }) :
              SX.t('m_sabit');
      SX.UI.bildir(m, 'hata');
      document.querySelector('.hud-alt').classList.add('salla');
      setTimeout(function () { document.querySelector('.hud-alt').classList.remove('salla'); }, 300);
      if (hata === 3) setTimeout(function () { SX.UI.bildir('<b>' + SX.t('piksel') + ':</b> ' + SX.t('zorlandin') + sev.ipucu, 'ipucu'); }, 900);
    }
  }

  /* ---------- Soru ---------- */
  function soruGoster() {
    var s = sev.soru;
    $('#sr-metin').textContent = s.metin;
    var ac = $('#sr-aciklama'); ac.className = ''; ac.textContent = '';
    var dv = $('#sr-devam'); dv.style.display = 'none';
    var kap = $('#sr-secenekler'); kap.innerHTML = '';
    s.secenekler.forEach(function (sec, i) {
      var b = document.createElement('button'); b.className = 'secenek'; b.textContent = String.fromCharCode(65 + i) + ')  ' + sec;
      b.onclick = function () {
        if (i === s.dogru) {
          SX.Ses.kilit(); b.classList.add('dogru');
          kap.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
          ac.className = 'acik iyi'; ac.innerHTML = '<b>' + SX.t('dogru') + '</b> ' + s.aciklama;
          dv.style.display = 'inline-block';
        } else {
          SX.Ses.hata(); b.classList.add('yanlis'); b.disabled = true; hata++; yildizGoster();
          ac.className = 'acik hata'; ac.innerHTML = SX.t('yanlis');
        }
      };
      kap.appendChild(b);
    });
    dv.onclick = function () {
      SX.Ses.tik(); SX.UI.pencere('#soru', false);
      var ilk = !SX.kayit.rozet['s' + sev.no];
      SX.UI.kesifKarti(sev.hedef, ilk ? sev.rozet : null, seviyeSonu);
    };
    SX.UI.pencere('#soru');
  }

  function metaRozetler() {
    var k = SX.kayit, yeni = [];
    var hepsi3 = SX.SEVIYELER.every(function (s) { return k.yildiz[s.no] === 3; });
    if (hepsi3 && !k.rozet.r_kusursuz) { k.rozet.r_kusursuz = true; yeni.push(SX.EK_ROZETLER.filter(function (e) { return e.id === 'r_kusursuz'; })[0].ad); }
    var tam = SX.KOLEKSIYON_SIRASI.every(function (id) { return k.bulunan[id]; });
    if (tam && !k.rozet.r_tam) { k.rozet.r_tam = true; yeni.push(SX.EK_ROZETLER.filter(function (e) { return e.id === 'r_tam'; })[0].ad); }
    yeni.forEach(function (a, i) { setTimeout(function () { SX.UI.bildir('🏅 <b>' + SX.t('yeni_rozet') + ':</b> ' + a, 'altin'); SX.Ses.basari('kaotik'); }, 600 + i * 1200); });
  }

  function gizliKesif(id) {
    var k = SX.kayit, ilk = !k.bulunan[id];
    k.bulunan[id] = true;
    var er = null; SX.EK_ROZETLER.forEach(function (e) { if (e.cisim === id) er = e; });
    if (er && !k.rozet[er.id]) k.rozet[er.id] = true; else er = null;
    SX.kayitSakla();
    SX.UI.kesifKarti(id, ilk ? er : null, function () { mesgul = false; metaRozetler(); SX.kayitSakla(); });
  }

  function seviyeSonu() {
    var k = SX.kayit, y = yildizSayisi(), no = sev.no;
    k.yildiz[no] = Math.max(k.yildiz[no] || 0, y);
    k.bulunan[sev.hedef] = true;
    k.rozet['s' + no] = true;
    k.acik = Math.max(k.acik, Math.min(SX.SEVIYELER.length, no + 1));
    metaRozetler();
    SX.kayitSakla();
    var c = SX.CISIMLER[sev.hedef], r = SX.RARITY[c.nadirlik];
    $('#sn-no').textContent = SX.t('gorev_bitti', { n: no });
    $('#sn-baslik').textContent = sev.baslik;
    var ys = document.querySelectorAll('#sn-yildiz i');
    ys.forEach(function (el) { el.classList.remove('on'); });
    ys.forEach(function (el, i) { if (i < y) setTimeout(function () { el.classList.add('on'); SX.Ses._ton(660 + i * 220, 0.2, 'triangle', 0.12); }, 400 + i * 350); });
    $('#sn-rozet').innerHTML = '<div class="rozet-mini" style="--nr:' + r.renk + '"><img src="' + SX.UI.ikon(c.ikon) + '"></div><div><b style="color:' + r.renk + '">' + sev.rozet.ad + '</b><br><span style="color:#8fa3c4;font-size:13px">' + sev.rozet.aciklama + '</span></div>';
    $('#sn-avatar').innerHTML = SX.UI.avatar('ada');
    $('#sn-metin').textContent = SX.isimle(SX.BITIS_SOZU[no]) + (y < 3 ? SX.t('sn_eksik') : SX.t('sn_tam'));
    var snr = $('#sn-sonraki');
    var sonSeviye = no === SX.SEVIYELER.length;
    snr.textContent = sonSeviye ? SX.t('final_izle') : SX.t('sonraki');
    snr.onclick = function () { SX.Ses.tik(); SX.UI.pencere('#sonuc', false); if (sonSeviye) finalOynat(); else seviyeBaslat(no + 1); };
    $('#sn-tekrar').onclick = function () { SX.Ses.tik(); SX.UI.pencere('#sonuc', false); seviyeBaslat(no); };
    $('#sn-harita').onclick = function () { SX.Ses.tik(); SX.UI.pencere('#sonuc', false); oyundanCik(); haritaGoster(); };
    SX.UI.pencere('#sonuc');
    mesgul = false;
  }

  function finalOynat() {
    oyundanCik(); $('#hud').classList.remove('acik');
    cut.baslat('final'); mod = 'sahne';
    $('#sinematik').classList.add('acik');
    $('.bk-no').textContent = SX.t('gorev_tamam_ust'); $('.bk-baslik').textContent = SX.EK_ROZETLER.filter(function (e) { return e.id === 'r_tam'; })[0].ad; $('.bk-alt').textContent = SX.t('final_alt', { isim: SX.kayit.isim });
    $('#bolum-karti').classList.add('acik'); SX.Ses.basari('kaotik');
    setTimeout(function () {
      $('#bolum-karti').classList.remove('acik');
      SX.UI.diyalog(SX.HIKAYE.final, function () { haritaGoster(); });
    }, 2600);
  }

  window.addEventListener('load', baslat);
  // test/hata ayıklama için dışarı aç
  SX._oyun = { seviyeBaslat: seviyeBaslat, brifing: function (no) { sev = SX.SEVIYELER[no - 1]; brifing(); }, sky: function () { return sky; }, tikla: tikla };
})();
