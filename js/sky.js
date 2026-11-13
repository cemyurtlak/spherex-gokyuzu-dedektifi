/* =========================================================
   GÖKYÜZÜ SAHNESİ — SPHEREx benzeri kızılötesi görüntü alanı
   - Yıldızlar (shader ile dalga boyuna göre parlaklık)
   - Hedef / gizli / değişen / bilinen cisimler (sprite)
   - Tarama ışını, zaman (t) ve dalga boyu (λ)
   - Tıklama ile seçme, beyaz kilit çizgileri, renklenme
   ========================================================= */
window.SX = window.SX || {};

/* ---------- Yardımcılar ---------- */
SX.rng = function (seed) {               // mulberry32
  var a = seed >>> 0;
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};
SX.bandFactor = function (p, l) {
  var d = (l - p.tepe) / p.genislik;
  return Math.min(1.4, p.taban + p.kazanc * Math.exp(-d * d));
};
SX.bandTint = function (l) {
  var stops = [[0, 0x6fa8ff], [0.35, 0x9fffe0], [0.6, 0xfff2a8], [0.8, 0xffb36b], [1, 0xff6b8b]];
  var t = Math.max(0, Math.min(1, (l - SX.BAND.min) / (SX.BAND.max - SX.BAND.min)));
  for (var i = 0; i < stops.length - 1; i++) {
    if (t <= stops[i + 1][0]) {
      var k = (t - stops[i][0]) / (stops[i + 1][0] - stops[i][0]);
      return new THREE.Color(stops[i][1]).lerp(new THREE.Color(stops[i + 1][1]), k);
    }
  }
  return new THREE.Color(stops[4][1]);
};
SX.yumusakDoku = function (boyut, sertlik) {   // gauss parıltı dokusu
  var c = document.createElement('canvas'); c.width = c.height = boyut;
  var g = c.getContext('2d');
  var img = g.createImageData(boyut, boyut), r = boyut / 2;
  for (var y = 0; y < boyut; y++) for (var x = 0; x < boyut; x++) {
    var dx = (x + 0.5 - r) / r, dy = (y + 0.5 - r) / r, d2 = dx * dx + dy * dy;
    var a = Math.exp(-d2 * sertlik) + 0.12 * Math.exp(-d2 * 2.2);
    if (d2 > 1) a *= Math.max(0, 1 - (d2 - 1) * 4);
    var i = (y * boyut + x) * 4;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
    img.data[i + 3] = Math.min(255, a * 255);
  }
  g.putImageData(img, 0, 0);
  var tex = new THREE.CanvasTexture(c);
  return tex;
};
SX.kuyrukDoku = function () {
  var c = document.createElement('canvas'); c.width = 128; c.height = 128;
  var g = c.getContext('2d');
  var img = g.createImageData(128, 128);
  for (var y = 0; y < 128; y++) for (var x = 0; x < 128; x++) {
    var u = x / 127, v = (y - 63.5) / 63.5;        // u: 0 baş, 1 kuyruk ucu
    var w = 0.08 + u * 0.55;
    var a = Math.exp(-(v * v) / (w * w)) * Math.pow(1 - u, 1.6) * (u > 0.02 ? 1 : u / 0.02);
    var i = (y * 128 + x) * 4;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
    img.data[i + 3] = Math.min(255, a * 200);
  }
  g.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(c);
};
SX.cizgiDoku = function () {
  var c = document.createElement('canvas'); c.width = 256; c.height = 16;
  var g = c.getContext('2d');
  var gr = g.createLinearGradient(0, 0, 256, 0);
  gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.1, 'rgba(255,255,255,0.9)');
  gr.addColorStop(0.9, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 6, 256, 4);
  g.globalAlpha = 0.3; g.fillRect(0, 4, 256, 8);
  return new THREE.CanvasTexture(c);
};

/* ---------- Gökyüzü sınıfı ---------- */
SX.Sky = function (renderer) {
  this.renderer = renderer;
  this.W = 200; this.H = 112;
  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0x02030a);
  this.camera = new THREE.PerspectiveCamera(50, 16 / 9, 1, 1000);
  this.camera.position.set(0, 0, 120);
  this.zMax = 120; this.zMin = 18;
  this.t = 0; this.band = 1.6; this.blink = false; this.blinkFaz = 0;
  this.zaman = 0;
  this.efektler = [];
  this.texYildiz = SX.yumusakDoku(64, 6);
  this.texUfo = SX.ufoDoku(); this.texIsinUfo = SX.ufoIsinDoku();
  this.texKuyruk = SX.kuyrukDoku();
  this.texCizgi = SX.cizgiDoku();
  this.root = new THREE.Group(); this.scene.add(this.root);
  this._kurArkaPlan();
  this._kurIsin();
};

SX.Sky.prototype._kurArkaPlan = function () {
  var geo = new THREE.PlaneGeometry(this.W * 1.6, this.H * 1.6);
  this.nebulaMat = new THREE.ShaderMaterial({
    uniforms: { uBand: { value: 1.6 }, uTint: { value: new THREE.Color(1, 1, 1) }, uSeed: { value: 1.0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} ',
    fragmentShader: [
      'uniform float uBand; uniform vec3 uTint; uniform float uSeed; varying vec2 vUv;',
      'float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))+uSeed*13.7)*43758.5453); }',
      'float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);',
      '  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }',
      'float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<5;i++){ s+=a*n(p); p*=2.03; a*=0.5; } return s; }',
      'void main(){',
      '  vec2 p = vUv*vec2(6.0,3.4);',
      '  float d = fbm(p + fbm(p*0.7)*1.3);',
      '  d = smoothstep(0.42, 0.95, d);',
      '  float dust = 0.11 + 0.30*smoothstep(2.4,5.0,uBand) + 0.28*exp(-pow((uBand-3.3)/0.14,2.0));',
      '  vec3 c = mix(vec3(0.10,0.12,0.30), uTint, 0.55) * d * dust;',
      '  float vign = smoothstep(1.05, 0.25, length(vUv-0.5)*1.4);',
      '  gl_FragColor = vec4(c*vign, 1.0);',
      '}'
    ].join('\n'),
    depthWrite: false
  });
  this.nebula = new THREE.Mesh(geo, this.nebulaMat);
  this.nebula.position.z = -2;
  this.scene.add(this.nebula);

  // tarama ızgarası (ince koordinat çizgileri)
  var pts = [], W = this.W, H = this.H;
  for (var x = -W / 2; x <= W / 2 + 0.1; x += 20) { pts.push(x, -H / 2, -1, x, H / 2, -1); }
  for (var y = -H / 2; y <= H / 2 + 0.1; y += 16) { pts.push(-W / 2, y, -1, W / 2, y, -1); }
  var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  this.izgara = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x2a4a7a, transparent: true, opacity: 0.18 }));
  this.scene.add(this.izgara);
  // alan çerçevesi
  var f = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-W / 2, -H / 2, -1), new THREE.Vector3(W / 2, -H / 2, -1),
    new THREE.Vector3(W / 2, H / 2, -1), new THREE.Vector3(-W / 2, H / 2, -1), new THREE.Vector3(-W / 2, -H / 2, -1)]);
  this.cerceve = new THREE.Line(f, new THREE.LineBasicMaterial({ color: 0x4fc3f7, transparent: true, opacity: 0.35 }));
  this.scene.add(this.cerceve);
};

SX.Sky.prototype._kurIsin = function () {
  var geo = new THREE.PlaneGeometry(14, this.H * 1.08);
  this.isinMat = new THREE.ShaderMaterial({
    uniforms: { uZaman: { value: 0 }, uOp: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} ',
    fragmentShader: [
      'uniform float uZaman; uniform float uOp; varying vec2 vUv;',
      'void main(){',
      '  float x = vUv.x;',                                    // sağ kenar = ışın cephesi
      '  float edge = exp(-pow((x-0.93)/0.035,2.0));',
      '  float trail = smoothstep(0.0,0.93,x)*0.35*step(x,0.93);',
      '  float scan = 0.6+0.4*sin(vUv.y*420.0 - uZaman*14.0);',
      '  float fadeY = smoothstep(0.0,0.06,vUv.y)*smoothstep(1.0,0.94,vUv.y);',
      '  vec3 col = mix(vec3(0.25,0.75,1.0), vec3(0.85,1.0,1.0), edge);',
      '  float a = (edge*1.1 + trail*scan) * fadeY * uOp;',
      '  gl_FragColor = vec4(col*a, a);',
      '}'
    ].join('\n'),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  this.isin = new THREE.Mesh(geo, this.isinMat);
  this.isin.position.z = 0.5;
  this.scene.add(this.isin);
};

/* ---------- Seviye kurulumu ---------- */
SX.Sky.prototype.temizle = function () {
  var self = this;
  while (this.root.children.length) {
    var o = this.root.children.pop();
    o.traverse(function (c) { if (c.geometry) c.geometry.dispose(); if (c.material && c.material !== self._paylasilan) c.material.dispose && c.material.dispose(); });
  }
  this.efektler = [];
};

SX.Sky.prototype.kur = function (sev, secenek) {
  secenek = secenek || {};
  this.temizle();
  var seed = secenek.seed || (Date.now() & 0xffffff);
  var R = SX.rng(seed); this.R = R;
  this.sev = sev; this.E = sev.taramaSayisi;
  this.t = 0; this.band = sev.baslangicBandi; this.blink = false;
  this.nebulaMat.uniforms.uSeed.value = (seed % 1000) / 100;
  this.objeler = [];      // tüm özel cisimler
  this.hedefBulundu = false;
  this.ufo = null; this.sarsinti = 0;
  if (this.yildizMat) this.yildizMat.uniforms.uLensK.value = 0;
  var W = this.W, H = this.H, E = this.E, self = this;

  // görünür alan: alt kontrol paneli ve üst kutuların altında kalmasın
  function icerde(x, y) { return Math.abs(x) < W / 2 - 9 && y > -H / 2 + 25 && y < H / 2 - 16; }
  function rastgeleNokta() { return { x: (R() - 0.5) * (W - 24), y: -H / 2 + 26 + R() * (H - 43) }; }
  function yolUret(hiz, dene) {
    for (var k = 0; k < 200; k++) {
      var c0 = rastgeleNokta(), cx = c0.x, cy = c0.y;
      var a = R() * Math.PI * 2, s = hiz[0] + R() * (hiz[1] - hiz[0]);
      var ok = true, yol = [];
      for (var e = 0; e < E; e++) {
        var u = e - (E - 1) / 2, x = cx + Math.cos(a) * s * u, y = cy + Math.sin(a) * s * u;
        if (!icerde(x, y)) ok = false;
        yol.push({ x: x, y: y });
      }
      if (ok && (!dene || dene(yol))) return { yol: yol, aci: a, hiz: s };
    }
    if (dene) return null;
    var yed = [];                                   // yedek: ortada yatay yol
    for (var e2 = 0; e2 < E; e2++) yed.push({ x: hiz[0] * (e2 - (E - 1) / 2), y: 0 });
    return { yol: yed, aci: 0, hiz: hiz[0] };
  }
  function uzakMi(x, y, min) {
    for (var i = 0; i < self.objeler.length; i++) {
      var o = self.objeler[i];
      for (var j = 0; j < o.durum.length; j++) {
        var d = o.durum[j]; if (!d || !d.v) continue;
        if (Math.hypot(d.x - x, d.y - y) < min) return false;
      }
    }
    return true;
  }
  function yolUzak(yol) { for (var i = 0; i < yol.length; i++) if (!uzakMi(yol[i].x, yol[i].y, 12)) return false; return true; }

  /* --- Hedef cisim --- */
  var h = sev.hareket, cisim = SX.CISIMLER[sev.hedef];
  if (h.tur === 'dogrusal' || h.tur === 'kuyruklu') {
    var y = yolUret(h.hiz);
    var o = this._obje('hedef', sev.hedef, cisim.profil, h.boyut, h.parlaklik);
    o.durum = y.yol.map(function (p) { return { x: p.x, y: p.y, b: 1, v: true }; });
    if (h.tur === 'kuyruklu') {
      o.kuyrukAci = R() * Math.PI * 2;
      o.kuyruk = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texKuyruk, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      o.kuyruk.material.rotation = o.kuyrukAci;
      o.kuyruk.scale.set(16, 16, 1);
      this.root.add(o.kuyruk);
    }
  } else if (h.tur === 'supernova') {
    var n0 = rastgeleNokta(), x = n0.x, yy = n0.y;
    var bas = 1 + Math.floor(R() * (E - 3));          // 1 .. E-3
    var o2 = this._obje('hedef', sev.hedef, cisim.profil, h.boyut, h.parlaklik);
    var egri = [1.0, 0.78, 0.55, 0.38, 0.26, 0.18];
    o2.durum = [];
    for (var e = 0; e < E; e++) o2.durum.push(e < bas ? { x: x, y: yy, b: 0, v: false } : { x: x, y: yy, b: egri[e - bas], v: true });
    // ev sahibi galaksi (sönük bulanık leke)
    o2.galaksi = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texYildiz, transparent: true, depthWrite: false, opacity: 0.35, blending: THREE.AdditiveBlending }));
    o2.galaksi.position.set(x + 1.2, yy - 0.6, 0); o2.galaksi.scale.set(7, 4.2, 1);
    o2.galaksi.material.rotation = R() * 3;
    this.root.add(o2.galaksi);
  } else if (h.tur === 'mercek') {
    var ym = yolUret(h.hiz);
    var om2 = this._obje('hedef', sev.hedef, cisim.profil, 1, 1);
    om2.durum = ym.yol.map(function (p) { return { x: p.x, y: p.y, b: 1, v: true }; });
    om2.karaDelik = true; om2.secYaricap = 5; om2.sprite.visible = false;
  } else if (h.tur === 'parcalar') {
    var yp = yolUret(h.hiz);
    var bol = 1 + Math.floor(R() * Math.max(1, E - 3));  // ayrılma taraması
    var n = h.parcaSayisi;
    var grup = { parcalar: [] };
    var yonler = [];
    for (var i = 0; i < n; i++) yonler.push({ a: R() * Math.PI * 2, s: 2.2 + R() * 2.4 });
    for (var i2 = 0; i2 < n; i2++) {
      var op = this._obje('hedef', sev.hedef, cisim.profil, i2 === 0 ? h.boyut * 1.15 : h.boyut * (0.65 + R() * 0.25), h.parlaklik * (i2 === 0 ? 1 : 0.75));
      op.grup = grup; grup.parcalar.push(op);
      op.durum = [];
      for (var e2 = 0; e2 < E; e2++) {
        var p = yp.yol[e2];
        if (e2 < bol) op.durum.push(i2 === 0 ? { x: p.x, y: p.y, b: 1, v: true } : { x: p.x, y: p.y, b: 0, v: false });
        else {
          var k2 = (e2 - bol) + 0.6, dd = yonler[i2];
          var px2 = p.x + Math.cos(dd.a) * dd.s * k2 * (i2 === 0 ? 0.3 : 1), py2 = p.y + Math.sin(dd.a) * dd.s * k2 * (i2 === 0 ? 0.3 : 1);
          px2 = Math.max(-W / 2 + 9, Math.min(W / 2 - 9, px2)); py2 = Math.max(-H / 2 + 25, Math.min(H / 2 - 16, py2));
          op.durum.push({ x: px2, y: py2, b: 1, v: true });
        }
      }
    }
  }

  /* --- Bilinen asteroitler (yanıltıcı, etiketli) --- */
  var kodlar = ['2025 KX4', '2024 RB7', '2026 AE2', '2023 TM9'];
  for (var b = 0; b < sev.bilinenAsteroit; b++) {
    var yb = yolUret([10, 16], yolUzak);
    if (!yb) continue;
    var ob = this._obje('bilinen', 'asteroit', SX.CISIMLER.asteroit.profil, 1.1, 0.9);
    ob.durum = yb.yol.map(function (p) { return { x: p.x, y: p.y, b: 1, v: true }; });
    ob.etiket = 'Bilinen: ' + kodlar[b % kodlar.length];
  }

  /* --- Değişen yıldızlar (yanıltıcı) --- */
  for (var d = 0; d < sev.degisenYildiz; d++) {
    var v0 = rastgeleNokta(), xv = v0.x, yv = v0.y;
    if (!uzakMi(xv, yv, 8)) { d--; continue; }
    var ov = this._obje('degisen', null, { taban: 1, kazanc: 0, tepe: 2, genislik: 1 }, 1.0 + R() * 0.4, 0.7);
    ov.durum = [];
    for (var e3 = 0; e3 < E; e3++) ov.durum.push({ x: xv, y: yv, b: 0.45 + R() * 1.0, v: true });
  }

  /* --- Gizli cisimler --- */
  this.gizliler = [];
  var bulunan = secenek.bulunan || {};
  for (var gid in SX.GIZLI_KURAL) {
    var kural = SX.GIZLI_KURAL[gid];
    if (kural.seviyeler.indexOf(sev.no) < 0 || bulunan[gid]) continue;
    if (!(secenek.gizliZorla || R() < kural.sans)) continue;
    var eg = 1 + Math.floor(R() * (E - 1));         // tek tarama
    var g0 = rastgeleNokta(), gx = g0.x, gy = g0.y;
    for (var dn = 0; dn < 30 && !uzakMi(gx, gy, 10); dn++) { g0 = rastgeleNokta(); gx = g0.x; gy = g0.y; }
    var gc = SX.CISIMLER[gid];
    if (gid === 'uydu') {
      var og = this._obje('gizli', gid, gc.profil, 1, 1, true);
      og.durum = []; for (var e4 = 0; e4 < E; e4++) og.durum.push({ x: gx, y: gy, b: e4 === eg ? 1 : 0, v: e4 === eg });
      og.cizgiAci = R() * Math.PI; og.cizgiBoy = 70 + R() * 50;
      og.sprite.visible = false;
      og.cizgi = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: this.texCizgi, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      og.cizgi.scale.set(og.cizgiBoy, 1.1, 1); og.cizgi.rotation.z = og.cizgiAci;
      og.cizgi.position.set(gx, gy, 0.1);
      this.root.add(og.cizgi);
      og.epoch = eg;
    } else if (gid === 'mikromercek') {
      var om = this._obje('gizli', gid, gc.profil, 1.05, 0.7);
      om.durum = []; for (var e5 = 0; e5 < E; e5++) om.durum.push({ x: gx, y: gy, b: 1, v: true });
      om.epoch = eg; om.mercek = true;
    } else {
      var oh = this._obje('gizli', gid, gc.profil, 1.0, gid === 'yetim' ? 0.75 : 0.8);
      oh.durum = []; for (var e6 = 0; e6 < E; e6++) oh.durum.push({ x: gx, y: gy, b: 1, v: e6 === eg });
      oh.epoch = eg;
    }
    this.gizliler.push(this.objeler[this.objeler.length - 1]);
  }

  /* --- Yıldızlar --- */
  this._kurYildizlar(sev.yildizSayisi, R);

  this.ayarlaKamera(true);
  this.guncelleGorunum();
  return seed;
};

SX.Sky.prototype._obje = function (tur, id, profil, boyut, parlaklik, spriteYok) {
  var mat = new THREE.SpriteMaterial({ map: this.texYildiz, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  var s = new THREE.Sprite(mat);
  this.root.add(s);
  var o = { tur: tur, id: id, profil: profil, boyut: boyut, parlaklik: parlaklik, sprite: s, durum: [], renkli: false, renk: null };
  this.objeler.push(o);
  return o;
};

SX.Sky.prototype._kurYildizlar = function (N, R) {
  var W = this.W, H = this.H;
  var pos = [], temp = [], base = [], size = [], kind = [];
  this.yildizKonum = [];
  for (var i = 0; i < N; i++) {
    var x = (R() - 0.5) * W, y = (R() - 0.5) * H;
    // özel cisimlerin yolundan uzak tut (karışmasın)
    var yakin = false;
    for (var k = 0; k < this.objeler.length && !yakin; k++) {
      var o = this.objeler[k];
      if (o.karaDelik) continue;
      for (var j = 0; j < o.durum.length; j++) { var d = o.durum[j]; if (Math.abs(d.x - x) < 3 && Math.abs(d.y - y) < 3) { yakin = true; break; } }
    }
    if (yakin) continue;
    var r = R(), T;
    if (r < 0.15) T = 2600 + R() * 900; else if (r < 0.75) T = 3500 + R() * 2600; else T = 6000 + R() * 14000;
    var g = R() < 0.07 ? 1 : 0;
    var b = g ? 0.25 + R() * 0.35 : 0.26 + 1.9 * Math.pow(R(), 6);
    pos.push(x, y, 0); temp.push(T); base.push(b); size.push(g ? 4 + R() * 3 : 1.6 + R() * 1.0); kind.push(g);
    this.yildizKonum.push(x, y);
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('aTemp', new THREE.Float32BufferAttribute(temp, 1));
  geo.setAttribute('aBase', new THREE.Float32BufferAttribute(base, 1));
  geo.setAttribute('aSize', new THREE.Float32BufferAttribute(size, 1));
  geo.setAttribute('aKind', new THREE.Float32BufferAttribute(kind, 1));
  this.yildizMat = new THREE.ShaderMaterial({
    uniforms: { uBand: { value: 1.6 }, uTint: { value: new THREE.Color(1, 1, 1) }, uScale: { value: this.olcek || 800 }, uLens: { value: new THREE.Vector2() }, uLensK: { value: 0 } },
    vertexShader: [
      'uniform float uBand; uniform float uScale; uniform vec3 uTint; uniform vec2 uLens; uniform float uLensK;',
      'attribute float aTemp; attribute float aBase; attribute float aSize; attribute float aKind;',
      'varying vec3 vCol; varying float vA; varying float vKind;',
      'float planck(float l, float T){ return 1.0/(pow(l,5.0)*(exp(14388.0/(l*T))-1.0)); }',
      'void main(){',
      '  float rel = (planck(uBand,aTemp)/planck(uBand,5800.0)) / (planck(1.6,aTemp)/planck(1.6,5800.0));',
      '  rel = pow(clamp(rel,0.05,6.0), 0.75);',
      '  if(aKind>0.5) rel = 0.6 + 0.4*smoothstep(1.0,4.0,uBand);',
      '  float f = aBase*rel;',
      '  vec3 pos = position;',
      '  if(uLensK>0.0){',                                         // kütleçekim merceği: ışık bükülür
      '    vec2 d = pos.xy-uLens; float r = max(length(d),0.05);',
      '    float rp = 0.5*(r+sqrt(r*r+4.0*uLensK*uLensK));',
      '    pos.xy = uLens + d/r*rp;',
      '    float u = r/uLensK; f *= min((u*u+2.0)/(u*sqrt(u*u+4.0)), 8.0);',
      '  }',
      '  vec4 mv = modelViewMatrix*vec4(pos,1.0);',
      '  gl_PointSize = aSize*(0.75+0.55*sqrt(f))*uScale/(-mv.z);',
      '  gl_PointSize = max(gl_PointSize, 2.5);',
      '  vec3 tcol = aTemp<4000.0 ? vec3(1.0,0.78,0.6) : (aTemp>8000.0 ? vec3(0.75,0.85,1.0) : vec3(1.0));',
      '  vCol = mix(vec3(1.0), uTint, 0.55)*tcol;',
      '  vA = clamp(f,0.0,1.6); vKind = aKind;',
      '  gl_Position = projectionMatrix*mv;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vCol; varying float vA; varying float vKind;',
      'void main(){',
      '  vec2 p = gl_PointCoord*2.0-1.0; float d2 = dot(p,p);',
      '  if(d2>1.0) discard;',
      '  float a = vKind>0.5 ? exp(-d2*3.0)*0.55 : exp(-d2*6.0)+0.16*exp(-d2*2.0);',
      '  if(vKind<0.5 && vA>1.0){ a += (exp(-abs(p.x)*30.0)*exp(-p.y*p.y*4.0)+exp(-abs(p.y)*30.0)*exp(-p.x*p.x*4.0))*0.35*(vA-1.0); }',
      '  gl_FragColor = vec4(vCol*a*vA, a*vA);',
      '}'
    ].join('\n'),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  this.yildizlar = new THREE.Points(geo, this.yildizMat);
  this.root.add(this.yildizlar);
};

/* ---------- Kamera: yakınlaştırma / kaydırma ---------- */
SX.Sky.prototype.boyutla = function (w, h) {
  this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  var tan = Math.tan(THREE.MathUtils.degToRad(25));
  var zH = (this.H / 2 + 4) / tan, zW = (this.W / 2 + 4) / (tan * this.camera.aspect);
  this.zMax = Math.max(zH, zW);
  this.olcek = h / (2 * tan) * Math.min(window.devicePixelRatio || 1, 1.5);
  if (this.yildizMat) this.yildizMat.uniforms.uScale.value = this.olcek;
  this.pr = Math.min(window.devicePixelRatio || 1, 1.5);
  this.ayarlaKamera(false);
};
SX.Sky.prototype.ayarlaKamera = function (sifirla) {
  var c = this.camera;
  if (sifirla) c.position.set(0, 0, this.zMax);
  c.position.z = Math.max(this.zMin, Math.min(this.zMax, c.position.z));
  var tan = Math.tan(THREE.MathUtils.degToRad(25));
  var gH = c.position.z * tan, gW = gH * c.aspect;
  var mx = Math.max(0, this.W / 2 - gW + 6), my = Math.max(0, this.H / 2 - gH + 6);
  c.position.x = Math.max(-mx, Math.min(mx, c.position.x));
  c.position.y = Math.max(-my, Math.min(my, c.position.y));
};
SX.Sky.prototype.ekrandanDunyaya = function (sx, sy, w, h) {
  var v = new THREE.Vector3((sx / w) * 2 - 1, -(sy / h) * 2 + 1, 0.5).unproject(this.camera);
  var dir = v.sub(this.camera.position).normalize();
  var k = -this.camera.position.z / dir.z;
  return this.camera.position.clone().add(dir.multiplyScalar(k));
};
SX.Sky.prototype.yakinlastir = function (carpan, sx, sy, w, h) {
  var once = (sx !== undefined) ? this.ekrandanDunyaya(sx, sy, w, h) : null;
  this.camera.position.z *= carpan;
  this.ayarlaKamera(false);
  if (once) {
    var sonra = this.ekrandanDunyaya(sx, sy, w, h);
    this.camera.position.x += once.x - sonra.x; this.camera.position.y += once.y - sonra.y;
    this.ayarlaKamera(false);
  }
};
SX.Sky.prototype.kaydir = function (dxPx, dyPx, h) {
  var tan = Math.tan(THREE.MathUtils.degToRad(25));
  var birim = (2 * this.camera.position.z * tan) / h;
  this.camera.position.x -= dxPx * birim; this.camera.position.y += dyPx * birim;
  this.ayarlaKamera(false);
};

/* ---------- Zaman / görünüm ---------- */
SX.Sky.prototype.gorunenDurum = function (o) {
  var E = this.E;
  if (this.blink && this.blinkFaz === 0) return o.durum[0];
  var t = this.blink ? Math.round(this.t) : this.t;
  var e0 = Math.floor(t), f = t - e0;
  if (e0 >= E - 1) return o.durum[E - 1];
  if (f <= 0.0001) return o.durum[e0];
  var isinX = -this.W / 2 + f * this.W;
  var yeni = o.durum[e0 + 1], eski = o.durum[e0];
  var ref = o.cizgi ? eski : yeni;
  return ((yeni.v ? yeni.x : eski.x) < isinX) ? yeni : eski;
};
SX.Sky.prototype.gosterilenTarama = function () {
  if (this.blink && this.blinkFaz === 0) return 0;
  return this.blink ? Math.round(this.t) : this.t;
};

SX.Sky.prototype.guncelleGorunum = function () {
  var tint = SX.bandTint(this.band);
  this.yildizMat.uniforms.uBand.value = this.band;
  this.yildizMat.uniforms.uTint.value.copy(tint);
  this.nebulaMat.uniforms.uBand.value = this.band;
  this.nebulaMat.uniforms.uTint.value.copy(tint);
  var temel = new THREE.Color(1, 1, 1).lerp(tint, 0.55);
  var tGoster = this.gosterilenTarama(), lensVar = false;
  for (var i = 0; i < this.objeler.length; i++) {
    var o = this.objeler[i], d = this.gorunenDurum(o);
    var bf = SX.bandFactor(o.profil, this.band);
    var b = o.parlaklik * d.b * bf;
    if (o.mercek) {                                         // kütleçekim merceği: sadece tam o taramada
      var amp = Math.max(0, 1 - Math.abs(tGoster - o.epoch) / 0.22);
      b *= 1 + 3.2 * amp; o.parlamaAmp = amp;
    }
    if (!d.v) b = 0;
    o.gorunurluk = b;
    o.x = d.x; o.y = d.y;
    if (o.karaDelik) {
      o.gorunurluk = 1; o.sprite.visible = false; lensVar = true;
      this.yildizMat.uniforms.uLens.value.set(d.x, d.y); this.yildizMat.uniforms.uLensK.value = 4.5;
      if (o.hale) { o.hale.position.set(d.x, d.y, 0.15); o.hale.visible = true; }
      continue;
    }
    if (o.cizgi) {
      o.cizgi.visible = b > 0.01;
      o.cizgi.material.opacity = 0.75;
      o.cizgi.material.color.copy(o.renkli ? o.renk : temel);
      continue;
    }
    var s = o.sprite;
    s.visible = b > 0.01;
    s.position.set(d.x, d.y, 0.2);
    var olc = o.boyut * 2.1 * (0.85 + 0.6 * Math.sqrt(Math.min(b, 2)));
    s.scale.set(olc, olc, 1);
    s.material.opacity = Math.min(1, b * 1.05);
    s.material.color.copy(o.renkli ? o.renk : temel);
    if (o.kuyruk) {
      var kb = Math.min(1, b * 1.2);
      o.kuyruk.visible = s.visible;
      var ux = Math.cos(o.kuyrukAci), uy = Math.sin(o.kuyrukAci);
      o.kuyruk.position.set(d.x + ux * 7.6, d.y + uy * 7.6, 0.1);
      o.kuyruk.material.rotation = o.kuyrukAci;
      o.kuyruk.material.opacity = kb * 0.8;
      o.kuyruk.material.color.copy(o.renkli ? o.renk : temel);
    }
    if (o.galaksi) o.galaksi.material.color.copy(temel);
    if (o.hale) { o.hale.position.set(d.x, d.y, 0.15); o.hale.visible = s.visible; }
  }
  if (!lensVar) this.yildizMat.uniforms.uLensK.value = 0;
  // tarama ışını
  var t = this.t, f = t - Math.floor(t);
  var aktif = !this.blink && f > 0.001 && t < this.E - 1;
  this.isin.position.x = -this.W / 2 + f * this.W - 7 * 0.86;
  this.isinMat.uniforms.uOp.value = aktif ? Math.min(1, Math.min(f, 1 - f) * 12) : 0;
};

SX.Sky.prototype.ayarlaZaman = function (t) { this.t = Math.max(0, Math.min(this.E - 1, t)); this.guncelleGorunum(); };
SX.Sky.prototype.ayarlaBand = function (l) { this.band = l; this.guncelleGorunum(); };

/* Anomali dedektörü: gizemli/kaotik gizli cisim için 0..1 sinyal */
SX.Sky.prototype.anomaliSinyali = function () {
  var en = 0, var_ = false;
  for (var i = 0; i < this.gizliler.length; i++) {
    var o = this.gizliler[i];
    var r = SX.RARITY[SX.CISIMLER[o.id].nadirlik].sira;
    if (r < 4 || o.bulundu) continue;
    var_ = true;
    var bf = Math.min(1, SX.bandFactor(o.profil, this.band));
    if (o.mercek) bf = 1;
    var em = Math.max(0, 1 - Math.abs(this.t - o.epoch));
    en = Math.max(en, bf * em);
  }
  return { var: var_, guc: en };
};

/* ---------- Seçme ---------- */
SX.Sky.prototype.sec = function (sx, sy, w, h) {
  var p = this.ekrandanDunyaya(sx, sy, w, h);
  var tan = Math.tan(THREE.MathUtils.degToRad(25));
  var pxBirim = (2 * this.camera.position.z * tan) / h;
  var esik = Math.max(1.8, 22 * pxBirim);
  if (this.ufo && (this.ufo.faz === 'gel' || this.ufo.faz === 'bekle')) {
    var us = this.ufo.sprite.position;
    if (Math.hypot(p.x - us.x, p.y - us.y) < Math.max(6, 30 * pxBirim)) return { tur: 'ufo', x: us.x, y: us.y };
  }
  var enIyi = null, enD = 1e9;
  for (var i = 0; i < this.objeler.length; i++) {
    var o = this.objeler[i];
    if (o.gorunurluk < 0.1) continue;
    var d;
    if (o.cizgi) {                       // çizgiye uzaklık
      var ux = Math.cos(o.cizgiAci), uy = Math.sin(o.cizgiAci);
      var rx = p.x - o.x, ry = p.y - o.y, along = rx * ux + ry * uy;
      if (Math.abs(along) > o.cizgiBoy / 2) continue;
      d = Math.abs(-rx * uy + ry * ux);
    } else d = Math.hypot(p.x - o.x, p.y - o.y);
    var oncelik = (o.tur === 'hedef' || o.tur === 'gizli') ? 1.35 : 1;
    if (o.secYaricap) { if (d < o.secYaricap) { enIyi = o; enD = 0; break; } continue; }
    if (d < esik * oncelik && d / oncelik < enD) { enD = d / oncelik; enIyi = o; }
  }
  if (enIyi) {
    if (enIyi.mercek && enIyi.parlamaAmp < 0.45) return { tur: 'yildiz', x: enIyi.x, y: enIyi.y };
    return { tur: enIyi.tur, obje: enIyi, x: enIyi.x, y: enIyi.y };
  }
  var k = this.yildizKonum, bi = -1, bd = esik;
  for (var j = 0; j < k.length; j += 2) {
    var dd = Math.hypot(p.x - k[j], p.y - k[j + 1]);
    if (dd < bd) { bd = dd; bi = j; }
  }
  if (bi >= 0) return { tur: 'yildiz', x: k[bi], y: k[bi + 1] };
  return { tur: 'bos', x: p.x, y: p.y };
};

/* ---------- Efektler ---------- */
// Beyaz kilit çizgileri → kaybolur → cisim renklenir
SX.Sky.prototype.kilitlen = function (o, renkHex, bitince) {
  var g = new THREE.Group();
  var mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  var p = [], s = 3.2, l = 1.4;
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (c) {      // köşe parantezleri
    p.push(c[0] * s, c[1] * s, 0, c[0] * (s - l), c[1] * s, 0);
    p.push(c[0] * s, c[1] * s, 0, c[0] * s, c[1] * (s - l), 0);
  });
  for (var i = 0; i < 8; i++) {                                     // dışa uzanan ışınsal çizgiler
    var a = i / 8 * Math.PI * 2 + Math.PI / 8;
    p.push(Math.cos(a) * 4.4, Math.sin(a) * 4.4, 0, Math.cos(a) * 7.5, Math.sin(a) * 7.5, 0);
  }
  [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (c) {         // artı nişangâh
    p.push(c[0] * 1.6, c[1] * 1.6, 0, c[0] * 2.5, c[1] * 2.5, 0);
  });
  var geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  var seg = new THREE.LineSegments(geo, mat); g.add(seg);
  var halka = [];
  for (var j = 0; j <= 64; j++) { var b = j / 64 * Math.PI * 2; halka.push(new THREE.Vector3(Math.cos(b) * 4.2, Math.sin(b) * 4.2, 0)); }
  var ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(halka), mat); g.add(ring);
  g.position.set(o.x, o.y, 1);
  this.root.add(g);
  var hedefler = o.grup ? o.grup.parcalar : [o];
  this.efektler.push({ tur: 'kilit', g: g, mat: mat, ring: ring, t: 0, hedefler: hedefler, renk: new THREE.Color(renkHex), bitince: bitince, renkVerildi: false });
};
SX.Sky.prototype.hataIsareti = function (x, y) {
  var mat = new THREE.LineBasicMaterial({ color: 0xff4060, transparent: true, opacity: 1 });
  var s = 2.2, geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([-s, -s, 0, s, s, 0, -s, s, 0, s, -s, 0], 3));
  var m = new THREE.LineSegments(geo, mat); m.position.set(x, y, 1);
  this.root.add(m);
  this.efektler.push({ tur: 'hata', g: m, mat: mat, t: 0 });
};
SX.Sky.prototype.ping = function (x, y) {
  var halka = [];
  for (var j = 0; j <= 48; j++) { var b = j / 48 * Math.PI * 2; halka.push(new THREE.Vector3(Math.cos(b), Math.sin(b), 0)); }
  var mat = new THREE.LineBasicMaterial({ color: 0x4fc3f7, transparent: true, opacity: 0.8 });
  var r = new THREE.Line(new THREE.BufferGeometry().setFromPoints(halka), mat);
  r.position.set(x, y, 1); this.root.add(r);
  this.efektler.push({ tur: 'ping', g: r, mat: mat, t: 0 });
};

SX.Sky.prototype.renklendir = function (o, renk) {
  o.renkli = true; o.renk = renk.clone ? renk.clone() : new THREE.Color(renk);
  if (!o.cizgi && !o.hale) {
    o.hale = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texYildiz, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: o.renk, opacity: 0.55 }));
    o.hale.scale.set(9, 9, 1);
    this.root.add(o.hale);
  }
};

SX.Sky.prototype.guncelle = function (dt) {
  this.zaman += dt;
  this.isinMat.uniforms.uZaman.value = this.zaman;
  if (this.blink) {
    var faz = Math.floor(this.zaman / 0.45) % 2;
    if (faz !== this.blinkFaz) { this.blinkFaz = faz; this.guncelleGorunum(); }
  }
  for (var i = this.efektler.length - 1; i >= 0; i--) {
    var e = this.efektler[i]; e.t += dt;
    if (e.tur === 'kilit') {
      var o0 = e.hedefler[0];
      e.g.position.set(o0.x, o0.y, 1);
      if (e.t < 0.7) {                         // oluşma: büyükten küçüğe kapanır
        var k = e.t / 0.7, sc = 4 - 3 * (1 - Math.pow(1 - k, 3));
        e.g.scale.setScalar(sc); e.mat.opacity = k; e.g.rotation.z = (1 - k) * 1.2;
      } else if (e.t < 1.6) {                  // bekleme: nabız
        e.g.scale.setScalar(1 + Math.sin((e.t - 0.7) * 14) * 0.05); e.mat.opacity = 1; e.ring.rotation.z += dt * 2;
      } else if (e.t < 2.2) {                  // kaybolma + renklenme
        var k2 = (e.t - 1.6) / 0.6;
        e.mat.opacity = 1 - k2; e.g.scale.setScalar(1 + k2 * 0.8);
        if (!e.renkVerildi) {
          e.renkVerildi = true;
          for (var h = 0; h < e.hedefler.length; h++) this.renklendir(e.hedefler[h], e.renk);
          this.guncelleGorunum();
        }
      } else {
        this.root.remove(e.g); e.g.traverse(function (c) { if (c.geometry) c.geometry.dispose(); });
        this.efektler.splice(i, 1);
        if (e.bitince) e.bitince();
        continue;
      }
    } else if (e.tur === 'hata') {
      e.mat.opacity = Math.max(0, 1 - e.t / 0.9); e.g.rotation.z = e.t * 0.6;
      if (e.t > 0.9) { this.root.remove(e.g); this.efektler.splice(i, 1); }
    } else if (e.tur === 'perde') {
      var op = e.t < 0.6 ? e.t / 0.6 : e.t > e.sure - 0.8 ? Math.max(0, (e.sure - e.t) / 0.8) : 1;
      e.g.material.opacity = 0.97 * op; e.g.material.rotation += dt * 0.3;
      if (e.t > e.sure) { this.root.remove(e.g); e.g.material.dispose(); this.efektler.splice(i, 1); }
    } else if (e.tur === 'ping') {
      e.g.scale.setScalar(1 + e.t * 8); e.mat.opacity = Math.max(0, 0.8 - e.t * 1.6);
      if (e.t > 0.5) { this.root.remove(e.g); this.efektler.splice(i, 1); }
    }
  }
  this._ufoGuncelle(dt);
  // sahte (uzaylı tuzağı) cisimlerin ömrü
  var degisti = false;
  for (var k = this.objeler.length - 1; k >= 0; k--) {
    var so = this.objeler[k];
    if (so.tur !== 'sahte') continue;
    so.omur -= dt;
    if (so.omur <= 0) { this.root.remove(so.sprite); so.sprite.material.dispose(); this.objeler.splice(k, 1); degisti = true; }
    else if (so.omur < 1) so.sprite.material.opacity *= 0.9;
  }
  if (degisti) this.guncelleGorunum();
  if (this.sarsinti > 0) {
    this.sarsinti -= dt;
    this.root.position.set((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, 0);
    if (this.sarsinti <= 0) this.root.position.set(0, 0, 0);
  }
  // renklenmiş cisimlerin halesi nabız atsın
  for (var j = 0; j < this.objeler.length; j++) {
    var o = this.objeler[j];
    if (o.hale) { var pz = 8 + Math.sin(this.zaman * 3 + j) * 1.2; o.hale.scale.set(pz, pz, 1); }
  }
};

SX.Sky.prototype.ciz = function () { this.renderer.render(this.scene, this.camera); };

/* =========================================================
   UZAYLILAR (Aşama 2) — UFO gelir, bekler, kovalanmazsa engel olur
   türler: parazit | sahte | bant | perde
   ========================================================= */
SX.ufoDoku = function () {
  var c = document.createElement('canvas'); c.width = 256; c.height = 160;
  var g = c.getContext('2d');
  var gr = g.createRadialGradient(128, 70, 10, 128, 70, 60); gr.addColorStop(0, 'rgba(180,255,220,0.95)'); gr.addColorStop(1, 'rgba(60,160,140,0.6)');
  g.fillStyle = gr; g.beginPath(); g.ellipse(128, 70, 46, 40, 0, Math.PI, 0); g.fill();
  var gv = g.createLinearGradient(0, 70, 0, 110); gv.addColorStop(0, '#dfe6f0'); gv.addColorStop(1, '#5b6678');
  g.fillStyle = gv; g.beginPath(); g.ellipse(128, 88, 118, 24, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#39424f'; g.beginPath(); g.ellipse(128, 96, 90, 12, 0, 0, Math.PI); g.fill();
  for (var i = 0; i < 7; i++) { var x = 40 + i * 29; g.fillStyle = i % 2 ? '#00e5a0' : '#ff3d7f'; g.shadowColor = g.fillStyle; g.shadowBlur = 12; g.beginPath(); g.arc(x, 90 + Math.sin(i / 6 * Math.PI) * 6, 6, 0, 6.28); g.fill(); }
  var t = new THREE.CanvasTexture(c); return t;
};
SX.ufoIsinDoku = function () {
  var c = document.createElement('canvas'); c.width = 128; c.height = 256;
  var g = c.getContext('2d'), img = g.createImageData(128, 256);
  for (var y = 0; y < 256; y++) for (var x = 0; x < 128; x++) {
    var v = y / 255, w = 0.15 + v * 0.85, u = Math.abs(x - 63.5) / 63.5;
    var a = u < w ? (1 - u / w) * (1 - v * 0.6) * (0.6 + 0.4 * Math.sin(y * 0.35)) : 0;
    var i = (y * 128 + x) * 4; img.data[i] = 120; img.data[i + 1] = 255; img.data[i + 2] = 190; img.data[i + 3] = a * 170;
  }
  g.putImageData(img, 0, 0); return new THREE.CanvasTexture(c);
};

SX.Sky.prototype.ufoBaslat = function (tur) {
  if (this.ufo) return;
  var W = this.W, H = this.H, R = Math.random;
  var hedef = this.objeler.filter(function (o) { return o.tur === 'hedef'; })[0];
  var to;
  if (tur === 'perde' && hedef) to = { x: hedef.x + (R() - 0.5) * 24, y: hedef.y + (R() - 0.5) * 16 };
  else to = { x: (R() - 0.5) * (W - 40), y: -H / 2 + 30 + R() * (H - 50) };
  to.x = Math.max(-W / 2 + 12, Math.min(W / 2 - 12, to.x)); to.y = Math.max(-H / 2 + 28, Math.min(H / 2 - 18, to.y));
  var sol = R() < 0.5;
  var from = { x: sol ? -W / 2 - 20 : W / 2 + 20, y: to.y + (R() - 0.5) * 40 };
  var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texUfo, transparent: true, depthWrite: false }));
  sp.scale.set(12, 7.5, 1); sp.position.set(from.x, from.y, 3);
  var is = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texIsinUfo, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
  is.scale.set(10, 16, 1); is.center.set(0.5, 1); is.position.set(from.x, from.y - 1.5, 2.9);
  this.root.add(sp); this.root.add(is);
  this.ufo = { tur: tur, faz: 'gel', t: 0, from: from, to: to, sprite: sp, isin: is };
};
SX.Sky.prototype.ufoKovala = function () {
  if (!this.ufo) return;
  this.ufo.faz = 'kac'; this.ufo.t = 0;
  this.ping(this.ufo.sprite.position.x, this.ufo.sprite.position.y);
};
SX.Sky.prototype._ufoGuncelle = function (dt) {
  var u = this.ufo; if (!u) return;
  u.t += dt;
  var sp = u.sprite, is = u.isin, z = this.zaman;
  if (u.faz === 'gel') {
    var k = Math.min(1, u.t / 2.2), e = 1 - Math.pow(1 - k, 3);
    sp.position.set(u.from.x + (u.to.x - u.from.x) * e, u.from.y + (u.to.y - u.from.y) * e + Math.sin(z * 4) * 0.6, 3);
    sp.material.rotation = Math.sin(z * 3) * 0.12;
    if (k >= 1) { u.faz = 'bekle'; u.t = 0; }
  } else if (u.faz === 'bekle') {
    sp.position.set(u.to.x + Math.sin(z * 2.2) * 1.2, u.to.y + Math.sin(z * 4) * 0.6, 3);
    is.material.opacity = 0.35 + 0.35 * Math.sin(z * 12);
    if (u.t > 2.8) { u.faz = 'git'; u.t = 0; is.material.opacity = 0; if (this.onUfoEylem) this.onUfoEylem(u.tur, u); }
  } else if (u.faz === 'git') {
    var k2 = Math.min(1, u.t / 1.6);
    sp.position.set(u.to.x + (u.from.x * -1 - u.to.x) * k2 * k2, u.to.y + 30 * k2 * k2, 3);
    if (k2 >= 1) this._ufoSil();
  } else if (u.faz === 'kac') {
    var k3 = Math.min(1, u.t / 0.7);
    sp.material.rotation += dt * 18; is.material.opacity = 0;
    sp.scale.set(12 * (1 - k3), 7.5 * (1 - k3), 1);
    sp.position.y += dt * 30;
    if (k3 >= 1) this._ufoSil();
  }
  is.position.set(sp.position.x, sp.position.y - 1.5, 2.9);
};
SX.Sky.prototype._ufoSil = function () {
  var u = this.ufo; if (!u) return;
  this.root.remove(u.sprite); this.root.remove(u.isin);
  u.sprite.material.dispose(); u.isin.material.dispose();
  this.ufo = null;
};
// uzaylı tuzağı: taramalar arasında rastgele zıplayan sahte cisimler
SX.Sky.prototype.sahteEkle = function (n, cx, cy) {
  var R = Math.random, W = this.W, H = this.H;
  for (var i = 0; i < n; i++) {
    var o = this._obje('sahte', null, { taban: 1, kazanc: 0, tepe: 2, genislik: 1 }, 0.95 + R() * 0.2, 0.85);
    var bx = cx + (R() - 0.5) * 50, by = cy + (R() - 0.5) * 30;
    for (var e = 0; e < this.E; e++) {
      var x = Math.max(-W / 2 + 10, Math.min(W / 2 - 10, bx + (R() - 0.5) * 18)), y = Math.max(-H / 2 + 26, Math.min(H / 2 - 16, by + (R() - 0.5) * 14));
      o.durum.push({ x: x, y: y, b: 0.8 + R() * 0.4, v: true });
    }
    o.omur = 13 + R() * 4;
  }
  this.guncelleGorunum();
};
// karartma perdesi
SX.sisDoku = function () {
  var S = 256, c = document.createElement('canvas'); c.width = c.height = S;
  var g = c.getContext('2d'), img = g.createImageData(S, S);
  for (var y = 0; y < S; y++) for (var x = 0; x < S; x++) {
    var dx = (x - 128) / 128, dy = (y - 128) / 128, r = Math.sqrt(dx * dx + dy * dy);
    var n = SX.gurultu ? SX.gurultu.fbm(x * 0.03, y * 0.03, 1.7, 4) : 0.5;
    var kenar = 0.62 + (n - 0.5) * 0.35;
    var a = r < kenar ? 0.96 : Math.max(0, 1 - (r - kenar) / 0.12) * 0.96;
    var rim = Math.exp(-Math.pow((r - kenar) / 0.035, 2));
    var i = (y * S + x) * 4;
    img.data[i] = 8 + rim * 40; img.data[i + 1] = 14 + rim * 230 + n * 20; img.data[i + 2] = 16 + rim * 150; img.data[i + 3] = Math.min(255, (a + rim * 0.5) * 255);
  }
  g.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(c);
};
SX.Sky.prototype.perdeEkle = function (x, y, sure) {
  if (!this.texSis) this.texSis = SX.sisDoku();
  var m = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.texSis, transparent: true, depthWrite: false, opacity: 0 }));
  m.scale.set(30, 30, 1); m.position.set(x, y, 2);
  this.root.add(m);
  this.efektler.push({ tur: 'perde', g: m, t: 0, sure: sure || 6 });
};

/* Büyüteç: imlecin altını 3 kat büyüterek küçük bir pencerede çizer */
SX.Sky.prototype.buyutecCiz = function (sx, sy, w, h) {
  var S = Math.min(280, Math.round(h * 0.32)), r = this.renderer;
  var wp = this.ekrandanDunyaya(sx, sy, w, h);
  if (!this.buyCam) this.buyCam = new THREE.PerspectiveCamera(50, 1, 1, 1000);
  var c = this.buyCam; c.position.set(wp.x, wp.y, Math.max(7, this.camera.position.z / 3)); c.lookAt(wp.x, wp.y, 0);
  var bx = sx + 34, by = sy - S - 34;
  if (bx + S > w - 8) bx = sx - S - 34;
  if (by < 8) by = sy + 34;
  var tan = Math.tan(THREE.MathUtils.degToRad(25));
  var eski = this.yildizMat.uniforms.uScale.value;
  this.yildizMat.uniforms.uScale.value = S / (2 * tan) * (this.pr || 1);
  r.setScissorTest(true); r.setViewport(bx, h - by - S, S, S); r.setScissor(bx, h - by - S, S, S);
  r.render(this.scene, c);
  r.setScissorTest(false); r.setViewport(0, 0, w, h);
  this.yildizMat.uniforms.uScale.value = eski;
  return { x: bx, y: by, S: S };
};
