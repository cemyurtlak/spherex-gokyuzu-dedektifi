/* =========================================================
   ARAYÜZ — ikonlar, avatarlar, diyalog, pencereler, kayıt
   ========================================================= */
window.SX = window.SX || {};
SX.UI = {};
var $ = function (s) { return document.querySelector(s); };

/* ---------- Kayıt (tarayıcı belleği) ---------- */
SX.KAYIT_ANAHTAR = 'spherex_dedektif_v1';
SX.kayit = { isim: 'Zirve', acik: 1, yildiz: {}, bulunan: {}, rozet: {} };
SX.kayitYukle = function () {
  try { var s = localStorage.getItem(SX.KAYIT_ANAHTAR); if (s) { var k = JSON.parse(s); for (var a in k) SX.kayit[a] = k[a]; } } catch (e) {}
};
SX.kayitSakla = function () { try { localStorage.setItem(SX.KAYIT_ANAHTAR, JSON.stringify(SX.kayit)); } catch (e) {} };
SX.kayitSifirla = function () { SX.kayit = { isim: SX.kayit.isim, acik: 1, yildiz: {}, bulunan: {}, rozet: {} }; SX.kayitSakla(); };
SX.isimle = function (m) { return m.replace(/\{isim\}/g, SX.kayit.isim || 'Zirve'); };

/* ---------- Cisim ikonları (canvas çizimi) ---------- */
SX.UI._ikon = {};
SX.UI.ikon = function (tur) {
  if (SX.UI._ikon[tur]) return SX.UI._ikon[tur];
  var S = 160, c = document.createElement('canvas'); c.width = c.height = S;
  var g = c.getContext('2d'), R = SX.rng(tur.length * 977 + tur.charCodeAt(0));
  function kaya(cx, cy, r, renk, krater) {
    g.beginPath();
    for (var i = 0; i <= 14; i++) { var a = i / 14 * Math.PI * 2, k = r * (0.78 + R() * 0.3); g[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * k, cy + Math.sin(a) * k); }
    g.closePath();
    var gr = g.createRadialGradient(cx - r * 0.4, cy - r * 0.4, r * 0.1, cx, cy, r * 1.1);
    gr.addColorStop(0, renk[0]); gr.addColorStop(1, renk[1]); g.fillStyle = gr; g.fill();
    if (krater) for (var j = 0; j < krater; j++) {
      var kx = cx + (R() - .5) * r, ky = cy + (R() - .5) * r, kr = r * (0.08 + R() * 0.14);
      g.beginPath(); g.arc(kx, ky, kr, 0, 6.28); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fill();
      g.beginPath(); g.arc(kx - kr * 0.25, ky - kr * 0.25, kr * 0.7, 0, 6.28); g.fillStyle = 'rgba(255,255,255,0.08)'; g.fill();
    }
  }
  function kure(cx, cy, r, ic, dis) {
    var gr = g.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
    gr.addColorStop(0, ic); gr.addColorStop(1, dis); g.beginPath(); g.arc(cx, cy, r, 0, 6.28); g.fillStyle = gr; g.fill();
  }
  function parilti(cx, cy, r, renk) {
    var gr = g.createRadialGradient(cx, cy, 0, cx, cy, r); gr.addColorStop(0, renk); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r, 0, 6.28); g.fill();
  }
  function seritler(cx, cy, r, renkler) {
    g.save(); g.beginPath(); g.arc(cx, cy, r, 0, 6.28); g.clip();
    g.fillStyle = renkler[1]; g.fillRect(cx - r, cy - r, r * 2, r * 2);
    for (var i = 0; i < 9; i++) { g.fillStyle = renkler[i % renkler.length]; g.fillRect(cx - r, cy - r + i * r * 2 / 9 + Math.sin(i) * 3, r * 2, r * 2 / 9 * 0.6); }
    var gr = g.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.2, cx, cy, r);
    gr.addColorStop(0, 'rgba(255,255,255,0.15)'); gr.addColorStop(1, 'rgba(0,0,0,0.65)'); g.fillStyle = gr; g.fillRect(cx - r, cy - r, r * 2, r * 2);
    g.restore();
  }
  var m = S / 2;
  switch (tur) {
    case 'asteroit': kaya(m, m, 50, ['#b9a48d', '#4b4036'], 6); break;
    case 'nea':
      g.strokeStyle = '#ff6b6b'; g.lineWidth = 4; g.setLineDash([8, 6]);
      g.beginPath(); g.arc(m + 10, m + 30, 62, Math.PI * 1.05, Math.PI * 1.75); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#ff6b6b'; g.beginPath(); g.moveTo(128, 46); g.lineTo(112, 38); g.lineTo(116, 56); g.fill();
      kaya(m - 6, m + 6, 36, ['#c9b8a4', '#55493d'], 4); break;
    case 'kuyruklu':
      var gr = g.createLinearGradient(m, m, 150, 20); gr.addColorStop(0, 'rgba(190,235,255,0.95)'); gr.addColorStop(1, 'rgba(120,200,255,0)');
      g.fillStyle = gr; g.beginPath(); g.moveTo(m - 8, m + 10); g.quadraticCurveTo(110, 70, 158, 8); g.quadraticCurveTo(100, 40, m + 8, m - 12); g.fill();
      parilti(m - 10, m + 12, 40, 'rgba(255,170,80,0.8)'); parilti(m - 10, m + 12, 22, 'rgba(220,245,255,1)'); kure(m - 10, m + 12, 8, '#fff', '#9cc'); break;
    case 'kahverengi':
      parilti(m, m, 76, 'rgba(255,60,120,0.45)'); seritler(m, m, 50, ['#a84a6a', '#6b2a45', '#d06a7a', '#7d3550']); break;
    case 'supernova':
      g.save(); g.translate(m, m);
      for (var i = 0; i < 16; i++) { g.rotate(Math.PI / 8); g.fillStyle = i % 2 ? 'rgba(255,200,120,0.85)' : 'rgba(180,220,255,0.9)'; g.beginPath(); g.moveTo(-4, 0); g.lineTo(0, i % 2 ? 58 : 74); g.lineTo(4, 0); g.fill(); }
      g.restore(); parilti(m, m, 50, 'rgba(255,255,255,1)'); break;
    case 'parcalar':
      [[50, 60, 22], [92, 48, 15], [108, 92, 18], [62, 108, 13], [124, 128, 10], [36, 130, 8]].forEach(function (p, i) {
        g.strokeStyle = 'rgba(255,220,160,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(80, 82); g.lineTo(p[0], p[1]); g.stroke();
        kaya(p[0], p[1], p[2], ['#c8b29a', '#4a3f35'], 2);
      }); parilti(80, 82, 18, 'rgba(255,200,120,0.9)'); break;
    case 'kuiper':
      parilti(m, m, 70, 'rgba(150,200,255,0.25)');
      kaya(m - 18, m + 4, 30, ['#e6f2ff', '#5a7a99'], 3); kaya(m + 22, m - 6, 24, ['#dbeeff', '#4f6e8c'], 3); break;
    case 'planetx':
      parilti(m, m, 80, 'rgba(255,31,75,0.55)');
      g.strokeStyle = 'rgba(160,200,255,0.5)'; g.lineWidth = 3; g.beginPath(); g.ellipse(m, m, 74, 16, -0.3, 0, 6.28); g.stroke();
      seritler(m, m, 48, ['#2c4f80', '#1a2f55', '#3f6aa8', '#22406e']);
      g.strokeStyle = 'rgba(160,200,255,0.65)'; g.beginPath(); g.ellipse(m, m, 74, 16, -0.3, Math.PI * 1.02, Math.PI * 1.98); g.stroke(); break;
    case 'uydu':
      g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 3; g.beginPath(); g.moveTo(5, 150); g.lineTo(155, 10); g.stroke();
      g.save(); g.translate(m, m); g.rotate(-0.75);
      g.fillStyle = '#2a4f9a'; g.fillRect(-62, -12, 38, 24); g.fillRect(24, -12, 38, 24);
      g.strokeStyle = '#7fa8ff'; g.lineWidth = 1; for (var x = -62; x < 62; x += 9) { if (x > -24 && x < 24) continue; g.beginPath(); g.moveTo(x, -12); g.lineTo(x, 12); g.stroke(); }
      g.fillStyle = '#d9b45a'; g.fillRect(-20, -16, 40, 32); g.fillStyle = '#ccc'; g.fillRect(-4, 16, 8, 14); g.restore(); break;
    case 'yildizlararasi':
      g.strokeStyle = 'rgba(0,229,160,0.5)'; g.lineWidth = 2;
      for (var k = 0; k < 4; k++) { g.beginPath(); g.moveTo(10, 100 + k * 8); g.lineTo(60, 88 + k * 6); g.stroke(); }
      g.save(); g.translate(m + 10, m - 6); g.rotate(-0.3);
      var gg = g.createLinearGradient(-60, 0, 60, 0); gg.addColorStop(0, '#5a2c1c'); gg.addColorStop(0.5, '#c06a3a'); gg.addColorStop(1, '#4a2416');
      g.fillStyle = gg; g.beginPath(); g.ellipse(0, 0, 62, 14, 0, 0, 6.28); g.fill(); g.restore();
      parilti(m + 10, m - 6, 70, 'rgba(0,229,160,0.18)'); break;
    case 'yetim':
      parilti(m, m, 78, 'rgba(140,60,255,0.35)'); kure(m, m, 48, '#2a2440', '#06050c');
      g.strokeStyle = 'rgba(170,110,255,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(m, m, 48, Math.PI * 0.9, Math.PI * 1.6); g.stroke(); break;
    case 'mikromercek':
      g.strokeStyle = 'rgba(255,90,120,0.9)'; g.lineWidth = 5;
      g.beginPath(); g.arc(m, m, 48, -0.6, 0.9); g.stroke(); g.beginPath(); g.arc(m, m, 48, 2.5, 4.0); g.stroke();
      g.strokeStyle = 'rgba(255,200,220,0.5)'; g.lineWidth = 2; g.beginPath(); g.arc(m, m, 60, 0, 6.28); g.stroke();
      parilti(m, m, 34, 'rgba(255,255,255,1)'); kure(m, m, 7, '#fff', '#fcd'); break;
    case 'sedna':
      g.strokeStyle = 'rgba(255,122,90,0.6)'; g.lineWidth = 3; g.beginPath(); g.ellipse(m + 30, m, 74, 26, 0.2, 0, 6.28); g.stroke();
      parilti(m - 20, m, 60, 'rgba(255,90,60,0.35)'); kure(m - 20, m, 34, '#ff9b6e', '#6a1f12'); break;
    case 'gezegeny':
      g.strokeStyle = 'rgba(160,200,255,0.35)'; g.lineWidth = 2; g.beginPath(); g.ellipse(m, m, 74, 16, 0, 0, 6.28); g.stroke();
      g.strokeStyle = 'rgba(255,31,75,0.85)'; g.lineWidth = 4; g.beginPath(); g.ellipse(m, m, 74, 20, -0.35, 0, 6.28); g.stroke();
      parilti(m, m, 56, 'rgba(200,230,255,0.3)'); kure(m, m, 30, '#e8f4ff', '#3d5675'); break;
    case 'karadelik':
      for (var q = 0; q < 26; q++) { var aa = q / 26 * 6.28, rr = 52 + (q % 3) * 8; g.fillStyle = 'rgba(255,240,200,0.9)'; g.beginPath(); g.ellipse(m + Math.cos(aa) * rr, m + Math.sin(aa) * rr, 4, 1.6, aa + 1.57, 0, 6.28); g.fill(); }
      parilti(m, m, 50, 'rgba(255,190,110,0.9)'); g.fillStyle = '#000'; g.beginPath(); g.arc(m, m, 30, 0, 6.28); g.fill();
      g.strokeStyle = 'rgba(255,220,160,0.95)'; g.lineWidth = 3; g.beginPath(); g.arc(m, m, 33, 0, 6.28); g.stroke(); break;
    case 'tyche':
      for (var q2 = 0; q2 < 40; q2++) { g.fillStyle = 'rgba(200,230,255,0.6)'; g.fillRect(R() * 160, R() * 160, 2, 2); }
      parilti(m, m, 78, 'rgba(255,31,75,0.4)'); seritler(m, m, 50, ['#8c7aa8', '#5a4c74', '#a898c4', '#6b5c88']); break;
    case 'ufo':
      g.fillStyle = 'rgba(120,255,190,0.25)'; g.beginPath(); g.moveTo(m - 18, m + 14); g.lineTo(m + 18, m + 14); g.lineTo(m + 46, 156); g.lineTo(m - 46, 156); g.fill();
      kure(m, m - 6, 22, '#c8ffe6', '#2b8f70');
      var gu = g.createLinearGradient(0, m, 0, m + 22); gu.addColorStop(0, '#e6edf5'); gu.addColorStop(1, '#5b6678');
      g.fillStyle = gu; g.beginPath(); g.ellipse(m, m + 8, 64, 15, 0, 0, 6.28); g.fill();
      for (var q3 = 0; q3 < 6; q3++) { g.fillStyle = q3 % 2 ? '#00e5a0' : '#ff3d7f'; g.beginPath(); g.arc(m - 45 + q3 * 18, m + 10, 4, 0, 6.28); g.fill(); } break;
  }
  var url = c.toDataURL();
  SX.UI._ikon[tur] = url;
  return url;
};

/* Rozet: altıgen çerçeve içinde ikon */
SX.UI.rozetCiz = function (ikonTur, renk, kilitli, cerceveYazi) {
  var S = 140, c = document.createElement('canvas'); c.width = c.height = S;
  var g = c.getContext('2d');
  function alti(r) { g.beginPath(); for (var i = 0; i < 6; i++) { var a = Math.PI / 6 + i * Math.PI / 3; g[i ? 'lineTo' : 'moveTo'](70 + Math.cos(a) * r, 70 + Math.sin(a) * r); } g.closePath(); }
  alti(64); g.fillStyle = kilitli ? '#151a26' : renk; g.fill();
  alti(56); g.fillStyle = '#0a0e18'; g.fill();
  alti(56); g.lineWidth = 2; g.strokeStyle = kilitli ? '#2b3346' : 'rgba(255,255,255,0.35)'; g.stroke();
  return c.toDataURL();
};

/* ---------- Avatarlar (SVG) ---------- */
SX.UI.avatar = function (tur) {
  var A = {
    oyuncu: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#13294b"/><path d="M18 100c2-22 14-32 32-32s30 10 32 32z" fill="#ff7a3d"/><path d="M38 70h24l-4 10h-16z" fill="#ffd2b0"/><circle cx="50" cy="46" r="20" fill="#ffd2b0"/><path d="M29 44c0-16 9-24 21-24s21 8 21 24c-4-8-10-11-21-11s-17 3-21 11z" fill="#3b2418"/><circle cx="43" cy="48" r="2.6" fill="#1b1b1b"/><circle cx="57" cy="48" r="2.6" fill="#1b1b1b"/><path d="M44 57q6 5 12 0" stroke="#a5523a" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M27 46a23 23 0 0 1 46 0" stroke="#4fc3f7" stroke-width="4" fill="none"/><rect x="22" y="42" width="9" height="14" rx="4" fill="#4fc3f7"/><rect x="69" y="42" width="9" height="14" rx="4" fill="#4fc3f7"/></svg>',
    ada: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#1b2240"/><path d="M16 100c2-22 15-32 34-32s32 10 34 32z" fill="#f2f4f8"/><path d="M44 68l6 12 6-12z" fill="#2f5bd3"/><circle cx="50" cy="45" r="19" fill="#c98e6b"/><path d="M30 46c-2-18 8-27 20-27s23 9 20 27c-3-9-9-14-20-14s-17 5-20 14z" fill="#1f1410"/><circle cx="50" cy="20" r="8" fill="#1f1410"/><circle cx="43" cy="47" r="5.5" fill="none" stroke="#222" stroke-width="2"/><circle cx="57" cy="47" r="5.5" fill="none" stroke="#222" stroke-width="2"/><path d="M48.5 47h3" stroke="#222" stroke-width="2"/><circle cx="43" cy="47" r="1.8" fill="#222"/><circle cx="57" cy="47" r="1.8" fill="#222"/><path d="M45 56q5 4 10 0" stroke="#7a3b2a" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="34" cy="84" r="5" fill="#2f5bd3"/></svg>',
    piksel: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#0d2a2a"/><line x1="50" y1="14" x2="50" y2="26" stroke="#9aa" stroke-width="3"/><circle cx="50" cy="12" r="4" fill="#00e5a0"/><rect x="22" y="26" width="56" height="44" rx="12" fill="#c7d3df"/><rect x="29" y="33" width="42" height="30" rx="7" fill="#06121a"/><rect x="36" y="42" width="8" height="8" rx="1" fill="#00e5a0"/><rect x="56" y="42" width="8" height="8" rx="1" fill="#00e5a0"/><path d="M40 56h20" stroke="#00e5a0" stroke-width="3"/><rect x="32" y="72" width="36" height="20" rx="6" fill="#9fb0c2"/><circle cx="18" cy="48" r="5" fill="#9fb0c2"/><circle cx="82" cy="48" r="5" fill="#9fb0c2"/></svg>',
    anlatici: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#0b1020"/><path d="M50 18l8 22 23 1-18 14 6 23-19-13-19 13 6-23-18-14 23-1z" fill="#ffd36b"/></svg>'
  };
  return A[tur] || A.anlatici;
};

/* ---------- Diyalog ---------- */
SX.UI.diyalog = function (satirlar, bitince) {
  var kutu = $('#diyalog'), i = 0, yaziyor = false, zam = null, hedefMetin = '';
  kutu.classList.add('acik');
  function goster() {
    if (i >= satirlar.length) { kapat(); return; }
    var s = satirlar[i], k = SX.KARAKTER[s.kim];
    $('#dg-avatar').innerHTML = SX.UI.avatar(k.avatar);
    $('#dg-ad').textContent = SX.isimle(k.ad);
    $('#dg-rol').textContent = k.rol;
    kutu.dataset.kim = s.kim;
    hedefMetin = SX.isimle(s.metin);
    var el = $('#dg-metin'); el.textContent = ''; yaziyor = true;
    var n = 0; clearInterval(zam);
    zam = setInterval(function () {
      n += 2; el.textContent = hedefMetin.slice(0, n);
      if (n % 6 === 0) SX.Ses.yaz();
      if (n >= hedefMetin.length) { clearInterval(zam); yaziyor = false; }
    }, 28);
    $('#dg-sayac').textContent = (i + 1) + ' / ' + satirlar.length;
  }
  function ilerle() {
    if (yaziyor) { clearInterval(zam); $('#dg-metin').textContent = hedefMetin; yaziyor = false; return; }
    i++; SX.Ses.tik(); goster();
  }
  function kapat() {
    clearInterval(zam); kutu.classList.remove('acik');
    kutu.onclick = null; $('#dg-atla').onclick = null; document.removeEventListener('keydown', tus);
    if (bitince) bitince();
  }
  function tus(e) { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); ilerle(); } if (e.code === 'Escape') kapat(); }
  kutu.onclick = function (e) { if (e.target.id === 'dg-atla') return; ilerle(); };
  $('#dg-atla').onclick = function (e) { e.stopPropagation(); kapat(); };
  document.addEventListener('keydown', tus);
  goster();
};

/* ---------- Pencere (modal) yardımcıları ---------- */
SX.UI.pencere = function (id, ac) { var p = $(id); if (!p) return; p.classList.toggle('acik', ac !== false); };

/* ---------- Bildirim ---------- */
SX.UI.bildir = function (metin, tur) {
  var b = document.createElement('div'); b.className = 'bildirim ' + (tur || '');
  b.innerHTML = metin; $('#bildirimler').appendChild(b);
  setTimeout(function () { b.classList.add('git'); }, 3200);
  setTimeout(function () { b.remove(); }, 3800);
};

/* ---------- Veri NASA'ya gönderiliyor ---------- */
SX.UI.uplink = function (cisimId, bitince) {
  var c = SX.CISIMLER[cisimId], r = SX.RARITY[c.nadirlik];
  var p = $('#uplink'); p.style.setProperty('--nr', r.renk);
  $('#ul-ikon').src = SX.UI.ikon(c.ikon);
  $('#ul-durum').textContent = 'Veri NASA\'ya gönderiliyor...';
  var bar = $('#ul-bar'), yuz = $('#ul-yuzde'), log = $('#ul-log');
  var satirlar = ['Konum ölçülüyor (RA/Dec)...', 'Tarama karşılaştırması paketleniyor...', '102 bant parlaklık verisi ekleniyor...', 'JPL / IRSA sunucusuna bağlanılıyor...', 'Gönderim tamamlandı ✓'];
  log.innerHTML = '';
  p.classList.add('acik'); SX.Ses.uplink();
  var t0 = performance.now(), sure = 2600, son = -1;
  function adim(now) {
    var k = Math.min(1, (now - t0) / sure);
    bar.style.width = (k * 100).toFixed(0) + '%'; yuz.textContent = '%' + (k * 100).toFixed(0);
    var s = Math.min(satirlar.length - 1, Math.floor(k * satirlar.length));
    while (son < s) { son++; var d = document.createElement('div'); d.textContent = '> ' + satirlar[son]; log.appendChild(d); }
    if (k < 1) requestAnimationFrame(adim);
    else { $('#ul-durum').textContent = 'Veri NASA\'ya ulaştı!'; setTimeout(function () { p.classList.remove('acik'); bitince && bitince(); }, 700); }
  }
  requestAnimationFrame(adim);
};

/* ---------- Keşif kartı: gölge → renkli ---------- */
SX.UI.kesifKarti = function (cisimId, ekRozet, bitince) {
  var c = SX.CISIMLER[cisimId], r = SX.RARITY[c.nadirlik];
  var p = $('#kesif'); p.style.setProperty('--nr', r.renk);
  p.dataset.nadirlik = c.nadirlik;
  $('#ks-nadirlik').textContent = r.ad.toUpperCase();
  $('#ks-ad').textContent = c.ad;
  $('#ks-kisa').textContent = c.kisa;
  var img = $('#ks-ikon'); img.src = SX.UI.ikon(c.ikon);
  var kart = $('#ks-kart'); kart.classList.remove('acildi'); void kart.offsetWidth;
  $('#ks-bilgi').innerHTML = c.bilgiler.map(function (b) { return '<li>' + b + '</li>'; }).join('');
  $('#ks-rozet').innerHTML = ekRozet ? ('<div class="rozet-mini" style="--nr:' + r.renk + '"><img src="' + SX.UI.ikon(c.ikon) + '"></div><div><b>Yeni rozet: ' + ekRozet.ad + '</b><br><span>' + ekRozet.aciklama + '</span></div>') : '';
  p.classList.add('acik');
  setTimeout(function () { kart.classList.add('acildi'); SX.Ses.basari(c.nadirlik); }, 650);
  $('#ks-tamam').onclick = function () { SX.Ses.tik(); p.classList.remove('acik'); bitince && bitince(); };
};

/* ---------- Koleksiyon ---------- */
SX.UI.koleksiyonDoldur = function () {
  var k = SX.kayit, html = '', adet = 0;
  SX.KOLEKSIYON_SIRASI.forEach(function (id) {
    var c = SX.CISIMLER[id], r = SX.RARITY[c.nadirlik], var_ = !!k.bulunan[id];
    if (var_) adet++;
    html += '<div class="kart ' + (var_ ? 'bulundu' : 'golge') + '" data-n="' + c.nadirlik + '" style="--nr:' + r.renk + '">' +
      '<div class="kart-nadir">' + r.ad + '</div>' +
      '<img src="' + SX.UI.ikon(c.ikon) + '" alt="">' +
      '<div class="kart-ad">' + (var_ ? c.ad : '???') + '</div>' +
      '<div class="kart-alt">' + (var_ ? c.kisa : (c.gizli ? 'Gizli cisim — bir seviyede saklanıyor' : 'Görevde keşfedilecek')) + '</div></div>';
  });
  $('#kol-izgara').innerHTML = html;
  $('#kol-sayac').textContent = adet + ' / ' + SX.KOLEKSIYON_SIRASI.length;
  // rozetler
  var rh = '';
  SX.SEVIYELER.forEach(function (s) {
    var c = SX.CISIMLER[s.hedef], r = SX.RARITY[c.nadirlik], var_ = !!k.rozet['s' + s.no];
    rh += SX.UI._rozetHTML(s.rozet.ad, s.rozet.aciklama, c.ikon, r, var_, 'Seviye ' + s.no);
  });
  SX.EK_ROZETLER.forEach(function (e) {
    var var_ = !!k.rozet[e.id];
    var ik = e.cisim ? SX.CISIMLER[e.cisim].ikon : (e.ozel === 'tam' ? 'supernova' : 'mikromercek');
    var r = e.cisim ? SX.RARITY[SX.CISIMLER[e.cisim].nadirlik] : SX.RARITY[e.ozel === 'tam' ? 'kaotik' : 'efsanevi'];
    rh += SX.UI._rozetHTML(e.ad, e.aciklama, ik, r, var_, e.cisim ? 'Gizli' : 'Başarı');
  });
  $('#rozet-izgara').innerHTML = rh;
};
SX.UI._rozetHTML = function (ad, aciklama, ikon, r, var_, ust) {
  return '<div class="rozet ' + (var_ ? 'var' : 'yok') + '" style="--nr:' + r.renk + '"><div class="rozet-alti"><img src="' + SX.UI.ikon(ikon) + '"></div>' +
    '<div class="rozet-ust">' + ust + ' · ' + r.ad + '</div><div class="rozet-ad">' + (var_ ? ad : 'Kilitli') + '</div><div class="rozet-ac">' + aciklama + '</div></div>';
};
