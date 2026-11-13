/* =========================================================
   ARA SAHNELER — her seviyenin hikâye animasyonu (Three.js)
   Sahne kimlikleri: baslik, giris, nea, kuyruklu, kahverengi,
   supernova, parcalar, kuiper, planetx, final
   ========================================================= */
window.SX = window.SX || {};

/* ---------- Gürültü (procedural doku/şekil için) ---------- */
SX.gurultu = (function () {
  function h(x, y, z) { var n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return n - Math.floor(n); }
  function sm(t) { return t * t * (3 - 2 * t); }
  function n3(x, y, z) {
    var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = sm(x - xi), yf = sm(y - yi), zf = sm(z - zi);
    function l(a, b, t) { return a + (b - a) * t; }
    return l(l(l(h(xi, yi, zi), h(xi + 1, yi, zi), xf), l(h(xi, yi + 1, zi), h(xi + 1, yi + 1, zi), xf), yf),
             l(l(h(xi, yi, zi + 1), h(xi + 1, yi, zi + 1), xf), l(h(xi, yi + 1, zi + 1), h(xi + 1, yi + 1, zi + 1), xf), yf), zf);
  }
  function fbm(x, y, z, o) { var s = 0, a = 0.5; for (var i = 0; i < (o || 5); i++) { s += a * n3(x, y, z); x *= 2.02; y *= 2.02; z *= 2.02; a *= 0.5; } return s; }
  return { n3: n3, fbm: fbm };
})();

SX.parilti = function (renk1, renk2) {
  var c = document.createElement('canvas'); c.width = c.height = 128;
  var g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, renk1 || 'rgba(255,255,255,1)');
  gr.addColorStop(0.25, renk2 || 'rgba(255,220,160,0.6)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
};

/* Küresel doku üretici (eşkenar dörtgen projeksiyon) */
SX.kureDoku = function (w, h, renkFn) {
  var c = document.createElement('canvas'); c.width = w; c.height = h;
  var g = c.getContext('2d'), img = g.createImageData(w, h);
  for (var y = 0; y < h; y++) {
    var lat = (y / h - 0.5) * Math.PI;
    for (var x = 0; x < w; x++) {
      var lon = x / w * Math.PI * 2;
      var px = Math.cos(lat) * Math.cos(lon), py = Math.sin(lat), pz = Math.cos(lat) * Math.sin(lon);
      var col = renkFn(px, py, pz, lat);
      var i = (y * w + x) * 4;
      img.data[i] = col[0]; img.data[i + 1] = col[1]; img.data[i + 2] = col[2]; img.data[i + 3] = col[3] === undefined ? 255 : col[3];
    }
  }
  g.putImageData(img, 0, 0);
  var t = new THREE.CanvasTexture(c);
  return t;
};

SX.Cutscene = function (renderer) {
  this.renderer = renderer;
  this.camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 3000);
  this.scene = null; this.t = 0; this.fn = null;
  this._onbellek = {};
};

SX.Cutscene.prototype.boyutla = function (w, h) { this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); };

/* ---------- Ortak parçalar ---------- */
SX.Cutscene.prototype.yildizAlani = function (n, r) {
  var p = [], c = [];
  for (var i = 0; i < n; i++) {
    var u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    p.push(Math.cos(a) * s * r, u * r, Math.sin(a) * s * r);
    var k = Math.random(), col = k < 0.2 ? [1, 0.8, 0.65] : k > 0.8 ? [0.7, 0.8, 1] : [1, 1, 1];
    var b = 0.4 + Math.random() * 0.6; c.push(col[0] * b, col[1] * b, col[2] * b);
  }
  var g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, fog: false }));
};

SX.Cutscene.prototype.dunyaDokusu = function () {
  if (this._onbellek.dunya) return this._onbellek.dunya;
  var N = SX.gurultu;
  var tex = SX.kureDoku(1024, 512, function (x, y, z, lat) {
    var e = N.fbm(x * 2.2 + 3, y * 2.2, z * 2.2, 5);
    var buz = Math.abs(lat) > 1.25;
    if (buz) return [235, 242, 250];
    if (e > 0.53) {
      var d = N.fbm(x * 6, y * 6, z * 6, 3);
      var kuru = Math.abs(lat) < 0.5 && d > 0.5;
      return kuru ? [186 + d * 40 | 0, 160 + d * 20 | 0, 110] : [60 + d * 50 | 0, 120 + d * 40 | 0, 60];
    }
    var derin = Math.min(1, (0.53 - e) * 5);
    return [20 - derin * 10 | 0, 70 - derin * 30 | 0, 150 - derin * 40 | 0];
  });
  var bulut = SX.kureDoku(512, 256, function (x, y, z) {
    var c = SX.gurultu.fbm(x * 3 + 10, y * 3, z * 3, 5);
    var a = Math.max(0, Math.min(1, (c - 0.5) * 3.5));
    return [255, 255, 255, a * 220];
  });
  tex.userData.kalici = true; bulut.userData.kalici = true;
  this._onbellek.dunya = { renk: tex, bulut: bulut };
  return this._onbellek.dunya;
};

SX.Cutscene.prototype.dunya = function (r) {
  var d = this.dunyaDokusu(), g = new THREE.Group();
  var m = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 48), new THREE.MeshStandardMaterial({ map: d.renk, roughness: 0.85, metalness: 0 }));
  var b = new THREE.Mesh(new THREE.SphereGeometry(r * 1.015, 64, 48), new THREE.MeshStandardMaterial({ map: d.bulut, transparent: true, depthWrite: false }));
  var atm = new THREE.Mesh(new THREE.SphereGeometry(r * 1.03, 48, 32), new THREE.ShaderMaterial({
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }',
    fragmentShader: 'varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.0-max(dot(vN,vV),0.0),2.6); gl_FragColor=vec4(0.35,0.65,1.0,1.0)*f*0.9; }',
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  }));
  g.add(m); g.add(b); g.add(atm);
  g.userData.bulut = b; g.userData.yer = m;
  return g;
};

SX.Cutscene.prototype.kaya = function (r, tohum, renk) {
  var geo = new THREE.IcosahedronGeometry(r, 4), pos = geo.attributes.position, v = new THREE.Vector3();
  for (var i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i); var n = v.clone().normalize();
    var k = 0.72 + 0.5 * SX.gurultu.fbm(n.x * 1.6 + tohum, n.y * 1.6, n.z * 1.6, 4) + 0.08 * SX.gurultu.fbm(n.x * 6 + tohum, n.y * 6, n.z * 6, 2);
    // krater benzeri çukurlar
    var c = SX.gurultu.n3(n.x * 4 + tohum * 3, n.y * 4, n.z * 4); if (c > 0.72) k -= (c - 0.72) * 0.5;
    v.copy(n).multiplyScalar(r * k); pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: renk || 0x8a7d6e, roughness: 0.95, metalness: 0.05, flatShading: true }));
};

SX.Cutscene.prototype.spherex = function () {
  var g = new THREE.Group();
  var foil = new THREE.MeshStandardMaterial({ color: 0xd9a441, metalness: 0.6, roughness: 0.35 });
  var gumus = new THREE.MeshStandardMaterial({ color: 0xdfe6ee, metalness: 0.55, roughness: 0.25, side: THREE.DoubleSide });
  var koyu = new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 0.6 });
  var govde = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.9, 6), foil); govde.position.y = -0.45; g.add(govde);
  // üç iç içe foton kalkanı (SPHEREx'in huni şekli)
  [[2.2, 0.95, 2.3], [2.55, 1.05, 2.75], [2.9, 1.15, 3.2]].forEach(function (k, i) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(k[0], k[1], k[2], 48, 1, true), gumus);
    c.position.y = k[2] / 2 + i * 0.05; g.add(c);
  });
  var tup = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 1.6, 24), koyu); tup.position.y = 0.8; g.add(tup);
  var ayna = new THREE.Mesh(new THREE.CircleGeometry(0.42, 24), new THREE.MeshStandardMaterial({ color: 0x88aaff, metalness: 1, roughness: 0.1, emissive: 0x112244 }));
  ayna.rotation.x = -Math.PI / 2; ayna.position.y = 1.61; g.add(ayna);
  // güneş paneli
  var pc = document.createElement('canvas'); pc.width = 64; pc.height = 32;
  var pg = pc.getContext('2d'); pg.fillStyle = '#0b1f4a'; pg.fillRect(0, 0, 64, 32);
  pg.strokeStyle = '#3d6bb8'; pg.lineWidth = 1;
  for (var x = 0; x <= 64; x += 8) { pg.beginPath(); pg.moveTo(x, 0); pg.lineTo(x, 32); pg.stroke(); }
  for (var y = 0; y <= 32; y += 8) { pg.beginPath(); pg.moveTo(0, y); pg.lineTo(64, y); pg.stroke(); }
  var panel = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.06, 1.7), new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(pc), metalness: 0.4, roughness: 0.3 }));
  panel.position.set(0, -0.95, -1.9); panel.rotation.x = 0.35; g.add(panel);
  var anten = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8), koyu); anten.position.set(0.9, -1.2, 0.6); g.add(anten);
  return g;
};

SX.Cutscene.prototype.gunes = function (boyut) {
  var g = new THREE.Group();
  var t = SX.parilti('rgba(255,255,240,1)', 'rgba(255,200,90,0.55)');
  var s1 = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, blending: THREE.AdditiveBlending, depthWrite: false }));
  s1.scale.set(boyut, boyut, 1); g.add(s1);
  var s2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.35 }));
  s2.scale.set(boyut * 3, boyut * 3, 1); g.add(s2);
  return g;
};

SX.Cutscene.prototype.parcacik = function (n, renk, boyut) {
  var g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
  var m = new THREE.PointsMaterial({ size: boyut || 0.4, color: renk || 0xffffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, map: SX.parilti('rgba(255,255,255,1)', 'rgba(255,255,255,0.4)') });
  var arr = g.attributes.position.array; for (var i = 0; i < arr.length; i++) arr[i] = 99999;
  var p = new THREE.Points(g, m); p.userData.v = new Float32Array(n * 3); p.userData.yas = new Float32Array(n);
  for (var j = 0; j < n; j++) p.userData.yas[j] = Math.random() * 3.5;
  p.frustumCulled = false;
  return p;
};

SX.Cutscene.prototype.yorungeCizgisi = function (a, b, renk, op, donus) {
  var pts = [];
  for (var i = 0; i <= 128; i++) { var t = i / 128 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(t) * a, 0, Math.sin(t) * b)); }
  var l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: renk, transparent: true, opacity: op === undefined ? 0.4 : op }));
  if (donus) l.rotation.y = donus;
  return l;
};

SX.Cutscene.prototype._temizle = function () {
  if (!this.scene) return;
  this.scene.traverse(function (o) {
    if (o.geometry) o.geometry.dispose();
    if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) { if (m.map && !m.map.userData.kalici) m.map.dispose(); m.dispose(); }); }
  });
};

/* ---------- Sahne başlat ---------- */
SX.Cutscene.prototype.baslat = function (id) {
  this._temizle();
  var S = new THREE.Scene(); this.scene = S; this.t = 0; this.id = id;
  S.background = new THREE.Color(0x01020a);
  S.add(this.yildizAlani(2500, 900));
  S.add(new THREE.AmbientLight(0x404a66, 0.55));
  S.add(new THREE.HemisphereLight(0x8899cc, 0x221100, 0.25));
  var gl = new THREE.DirectionalLight(0xfff4e0, 1.5); gl.position.set(50, 20, 30); S.add(gl);
  this.isik = gl;
  var c = this.camera, self = this;
  var kur = this['_' + id] || this._baslik;
  this.fn = kur.call(this, S, c);
};

SX.Cutscene.prototype.guncelle = function (dt) { this.t += dt; if (this.fn) this.fn(this.t, dt); };
SX.Cutscene.prototype.ciz = function () { if (this.scene) this.renderer.render(this.scene, this.camera); };

/* ---------- Sahneler ---------- */
// Başlık ekranı ve giriş: Dünya + yörüngedeki SPHEREx + tarama konisi + veri paketleri
SX.Cutscene.prototype._baslik = function (S, c, giris) {
  var d = this.dunya(10); S.add(d);
  var sx = this.spherex(); sx.scale.setScalar(0.55); S.add(sx);
  var koni = new THREE.Mesh(new THREE.ConeGeometry(5, 26, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0x4fc3f7, transparent: true, opacity: 0.09, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }));
  koni.geometry.translate(0, -13, 0); koni.geometry.rotateX(Math.PI);
  S.add(koni);
  var paket = this.parcacik(60, 0x9fffe0, 0.5); S.add(paket);
  var pk = []; for (var i = 0; i < 60; i++) pk.push(Math.random());
  var yorunge = this.yorungeCizgisi(15, 15, 0x4fc3f7, 0.25); yorunge.rotation.z = Math.PI / 2.3; S.add(yorunge);
  var hedef = new THREE.Vector3(), tmp = new THREE.Vector3();
  var antalya = new THREE.Vector3();
  return function (t, dt) {
    d.rotation.y = t * 0.05; d.userData.bulut.rotation.y = t * 0.012;
    var a = t * 0.22;
    tmp.set(Math.cos(a) * 15, Math.sin(a) * 15, 0).applyAxisAngle(new THREE.Vector3(1, 0, 0), 0).applyEuler(yorunge.rotation);
    sx.position.copy(tmp);
    sx.lookAt(0, 0, 0); sx.rotateX(-Math.PI / 2);   // huni ağzı Dünya'nın tersine (gökyüzüne) baksın
    koni.position.copy(tmp); koni.lookAt(tmp.clone().multiplyScalar(2));
    koni.rotateX(Math.PI / 2);
    koni.rotation.z += Math.sin(t * 1.4) * 0.3;
    koni.material.opacity = 0.06 + 0.04 * Math.sin(t * 3);
    // Antalya (36.9K, 30.7D)
    var la = THREE.MathUtils.degToRad(36.9), lo = THREE.MathUtils.degToRad(30.7) + d.rotation.y;
    antalya.set(Math.cos(la) * Math.cos(-lo) * 10.2, Math.sin(la) * 10.2, Math.cos(la) * Math.sin(-lo) * 10.2);
    var pa = paket.geometry.attributes.position;
    for (var i = 0; i < pk.length; i++) {
      pk[i] += dt * 0.35; if (pk[i] > 1) pk[i] -= 1;
      hedef.copy(sx.position).lerp(antalya, pk[i]);
      hedef.addScaledVector(sx.position.clone().normalize(), Math.sin(pk[i] * Math.PI) * 3);
      pa.setXYZ(i, hedef.x, hedef.y, hedef.z);
    }
    pa.needsUpdate = true;
    if (giris) {
      var k = Math.min(1, t / 9), e = 1 - Math.pow(1 - k, 3);
      c.position.set(Math.sin(t * 0.06) * (70 - e * 34), 12 - e * 4, Math.cos(t * 0.06) * (70 - e * 34));
    } else c.position.set(Math.sin(t * 0.05) * 42, 10 + Math.sin(t * 0.1) * 4, Math.cos(t * 0.05) * 42);
    c.lookAt(0, 0, 0);
  };
};
SX.Cutscene.prototype._giris = function (S, c) { return this._baslik(S, c, true); };

// Dünya'ya yakın asteroit yanından geçiyor
SX.Cutscene.prototype._nea = function (S, c) {
  var d = this.dunya(8); d.position.set(-14, -4, -10); S.add(d);
  var ay = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 24), new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 1 }));
  ay.position.set(12, 6, -30); S.add(ay);
  var k = this.kaya(2.2, 4.2, 0x7d6f60); S.add(k);
  var iz = []; for (var i = 0; i <= 100; i++) { var u = i / 100; iz.push(new THREE.Vector3(60 - u * 120, 10 - u * 14, 18 - u * 30)); }
  var izL = new THREE.Line(new THREE.BufferGeometry().setFromPoints(iz), new THREE.LineDashedMaterial({ color: 0xff6b6b, dashSize: 1.2, gapSize: 0.8, transparent: true, opacity: 0.6 }));
  izL.computeLineDistances(); S.add(izL);
  var uyari = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.5, 48), new THREE.MeshBasicMaterial({ color: 0xff5252, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
  S.add(uyari);
  return function (t) {
    d.rotation.y = t * 0.08;
    var u = (t * 0.06) % 1;
    k.position.set(60 - u * 120, 10 - u * 14, 18 - u * 30);
    k.rotation.x = t * 0.7; k.rotation.y = t * 0.4;
    uyari.position.copy(k.position); uyari.lookAt(c.position);
    uyari.scale.setScalar(1 + 0.15 * Math.sin(t * 8)); uyari.material.opacity = 0.35 + 0.3 * Math.sin(t * 8);
    c.position.set(10 + Math.sin(t * 0.1) * 6, 6, 40);
    c.lookAt(k.position.clone().multiplyScalar(0.3));
  };
};

// Kuyruklu yıldız Güneş'e yaklaşıyor, kuyruk Güneş'in tersine
SX.Cutscene.prototype._kuyruklu = function (S, c) {
  var gun = this.gunes(30); gun.position.set(-60, 0, -40); S.add(gun);
  this.isik.position.copy(gun.position);
  var cek = this.kaya(1.2, 7.7, 0x5a5650); S.add(cek);
  var koma = new THREE.Sprite(new THREE.SpriteMaterial({ map: SX.parilti('rgba(200,240,255,1)', 'rgba(120,200,255,0.4)'), blending: THREE.AdditiveBlending, depthWrite: false }));
  koma.scale.set(9, 9, 1); S.add(koma);
  var co2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: SX.parilti('rgba(255,170,80,0.9)', 'rgba(255,120,60,0.3)'), blending: THREE.AdditiveBlending, depthWrite: false }));
  co2.scale.set(16, 16, 1); S.add(co2);
  var N = 900, kuyruk = this.parcacik(N, 0xbfe8ff, 0.7); S.add(kuyruk);
  var toz = this.parcacik(500, 0xffe0a0, 0.55); S.add(toz);
  function besle(p, n, hiz, yay, t) {
    var pa = p.geometry.attributes.position, v = p.userData.v, yas = p.userData.yas;
    return function (dt, merkez, gunYon) {
      for (var i = 0; i < n; i++) {
        yas[i] -= dt;
        if (yas[i] <= 0) {
          yas[i] = 1.5 + Math.random() * 2.5;
          pa.setXYZ(i, merkez.x + (Math.random() - .5), merkez.y + (Math.random() - .5), merkez.z + (Math.random() - .5));
          v[i * 3] = -gunYon.x * hiz + (Math.random() - .5) * yay; v[i * 3 + 1] = -gunYon.y * hiz + (Math.random() - .5) * yay; v[i * 3 + 2] = -gunYon.z * hiz + (Math.random() - .5) * yay;
        }
        pa.setXYZ(i, pa.getX(i) + v[i * 3] * dt, pa.getY(i) + v[i * 3 + 1] * dt, pa.getZ(i) + v[i * 3 + 2] * dt);
      }
      pa.needsUpdate = true;
    };
  }
  var f1 = besle(kuyruk, N, 9, 1.4), f2 = besle(toz, 500, 4.5, 3.2);
  var yon = new THREE.Vector3();
  return function (t, dt) {
    var u = Math.sin(t * 0.08);
    cek.position.set(10 + u * 8, 2 + u * 2, 0);
    cek.rotation.y = t * 0.3;
    koma.position.copy(cek.position); co2.position.copy(cek.position);
    co2.material.opacity = 0.35 + 0.25 * Math.sin(t * 1.5);
    yon.copy(gun.position).sub(cek.position).normalize();
    f1(dt, cek.position, yon); f2(dt, cek.position, yon);
    c.position.set(cek.position.x + 18 + Math.sin(t * 0.1) * 5, 8, 34);
    c.lookAt(cek.position.x + 10, cek.position.y, 0);
  };
};

// Kahverengi cüce: görünür ışık ↔ kızılötesi
SX.Cutscene.prototype._kahverengi = function (S, c) {
  var tex = SX.kureDoku(256, 128, function (x, y, z, lat) {
    var b = Math.sin(lat * 9 + SX.gurultu.fbm(x * 3, y * 3, z * 3, 4) * 4);
    var v = 0.5 + 0.5 * b;
    return [120 + v * 100 | 0, 40 + v * 30 | 0, 60 + v * 50 | 0];
  });
  var mat = new THREE.MeshStandardMaterial({ map: tex, emissive: 0xff3a6a, emissiveMap: tex, emissiveIntensity: 0.1, roughness: 0.8 });
  var bd = new THREE.Mesh(new THREE.SphereGeometry(7, 64, 48), mat); S.add(bd);
  var hale = new THREE.Sprite(new THREE.SpriteMaterial({ map: SX.parilti('rgba(255,90,140,0.9)', 'rgba(180,40,120,0.35)'), blending: THREE.AdditiveBlending, depthWrite: false }));
  hale.scale.set(30, 30, 1); S.add(hale);
  var uzakGunes = this.gunes(4); uzakGunes.position.set(80, 30, -200); S.add(uzakGunes);
  return function (t) {
    bd.rotation.y = t * 0.15;
    var ir = 0.5 + 0.5 * Math.sin(t * 0.7);            // kızılötesi görüş açılıp kapanıyor
    mat.emissiveIntensity = 0.05 + ir * 1.1;
    mat.color.setScalar(0.25 + 0.4 * (1 - ir));
    hale.material.opacity = ir * 0.9;
    c.position.set(Math.sin(t * 0.08) * 26, 4 + Math.sin(t * 0.2) * 2, Math.cos(t * 0.08) * 26);
    c.lookAt(0, 0, 0);
  };
};

// Süpernova: yıldız şişer, patlar, şok dalgası
SX.Cutscene.prototype._supernova = function (S, c) {
  // ev sahibi galaksi sarmalı
  var gp = [], gc = [];
  for (var i = 0; i < 4000; i++) {
    var kol = i % 2, r = Math.pow(Math.random(), 0.6) * 60, a = r * 0.12 + kol * Math.PI + (Math.random() - .5) * 0.6;
    gp.push(Math.cos(a) * r, (Math.random() - .5) * 2.5 * (1 - r / 70), Math.sin(a) * r);
    var m = 1 - r / 60; gc.push(0.6 + m * 0.4, 0.6 + m * 0.3, 0.8 + (1 - m) * 0.2);
  }
  var gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3)); gg.setAttribute('color', new THREE.Float32BufferAttribute(gc, 3));
  var gal = new THREE.Points(gg, new THREE.PointsMaterial({ size: 0.6, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
  gal.position.set(0, -6, -80); gal.rotation.x = 0.9; S.add(gal);
  var yildiz = new THREE.Mesh(new THREE.SphereGeometry(2.5, 48, 32), new THREE.MeshBasicMaterial({ color: 0xbfd8ff }));
  S.add(yildiz);
  var flas = new THREE.Sprite(new THREE.SpriteMaterial({ map: SX.parilti('rgba(255,255,255,1)', 'rgba(170,210,255,0.6)'), blending: THREE.AdditiveBlending, depthWrite: false }));
  S.add(flas);
  var halka = new THREE.Mesh(new THREE.RingGeometry(0.97, 1, 128), new THREE.MeshBasicMaterial({ color: 0x9fd0ff, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  S.add(halka);
  var enkaz = this.parcacik(1200, 0xffb36b, 0.5); S.add(enkaz);
  var v = enkaz.userData.v;
  return function (t) {
    var dongu = 10, tt = t % dongu;
    var pa = enkaz.geometry.attributes.position;
    if (tt < 4) {                                    // şişme, kızarma
      var k = tt / 4; yildiz.visible = true; yildiz.scale.setScalar(1 + k * 1.6);
      yildiz.material.color.setRGB(0.75 + k * 0.25, 0.85 - k * 0.45, 1 - k * 0.7);
      flas.scale.setScalar(8 + k * 10); flas.material.opacity = 0.4 + 0.2 * Math.sin(t * 20) * k;
      halka.visible = false; enkaz.visible = false;
      for (var i = 0; i < 1200; i++) {
        pa.setXYZ(i, 0, 0, 0);
        var u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u), h = 6 + Math.random() * 12;
        v[i * 3] = Math.cos(a) * s * h; v[i * 3 + 1] = u * h; v[i * 3 + 2] = Math.sin(a) * s * h;
      }
    } else {                                        // patlama
      var k2 = tt - 4;
      yildiz.visible = k2 < 0.15;
      flas.scale.setScalar(20 + 140 * Math.exp(-k2 * 1.2) * Math.min(1, k2 * 10));
      flas.material.opacity = Math.max(0.15, Math.exp(-k2 * 0.8));
      halka.visible = true; halka.scale.setScalar(1 + k2 * 9); halka.lookAt(c.position);
      halka.material.opacity = Math.max(0, 1 - k2 / 6);
      enkaz.visible = true; enkaz.material.opacity = Math.max(0, 1 - k2 / 6);
      for (var j = 0; j < 1200; j++) pa.setXYZ(j, v[j * 3] * k2, v[j * 3 + 1] * k2, v[j * 3 + 2] * k2);
    }
    pa.needsUpdate = true;
    gal.rotation.y = t * 0.02;
    c.position.set(Math.sin(t * 0.07) * 40, 8, Math.cos(t * 0.07) * 40); c.lookAt(0, 0, 0);
  };
};

// Asteroit parçalanıyor
SX.Cutscene.prototype._parcalar = function (S, c) {
  var ana = this.kaya(4, 2.5, 0x86786a); S.add(ana);
  var parcalar = [];
  for (var i = 0; i < 7; i++) {
    var p = this.kaya(1 + Math.random() * 1.3, i * 3.3, 0x7a6d60);
    var a = Math.random() * Math.PI * 2, u = Math.random() * 2 - 1, s = Math.sqrt(1 - u * u);
    p.userData.yon = new THREE.Vector3(Math.cos(a) * s, u, Math.sin(a) * s);
    p.userData.don = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    S.add(p); parcalar.push(p);
  }
  var toz = this.parcacik(700, 0xd8c3a0, 0.35); S.add(toz);
  var tv = toz.userData.v;
  for (var j = 0; j < 700; j++) { var a2 = Math.random() * 6.28, u2 = Math.random() * 2 - 1, s2 = Math.sqrt(1 - u2 * u2), h = 1 + Math.random() * 5; tv[j * 3] = Math.cos(a2) * s2 * h; tv[j * 3 + 1] = u2 * h; tv[j * 3 + 2] = Math.sin(a2) * s2 * h; }
  var catlak = new THREE.Sprite(new THREE.SpriteMaterial({ map: SX.parilti('rgba(255,230,180,1)', 'rgba(255,140,60,0.5)'), blending: THREE.AdditiveBlending, depthWrite: false }));
  S.add(catlak);
  return function (t) {
    var tt = t % 11, pa = toz.geometry.attributes.position;
    if (tt < 3.5) {
      ana.visible = true; ana.rotation.y = t * 1.2; ana.rotation.x = t * 0.5;
      ana.position.set(Math.sin(t * 40) * 0.05 * tt, 0, 0);
      parcalar.forEach(function (p) { p.visible = false; });
      toz.visible = false; catlak.material.opacity = tt / 3.5 * 0.6; catlak.scale.setScalar(4 + tt * 3);
    } else {
      var k = tt - 3.5; ana.visible = false;
      catlak.material.opacity = Math.max(0, 1 - k); catlak.scale.setScalar(14 + k * 10);
      parcalar.forEach(function (p, i) {
        p.visible = true; p.position.copy(p.userData.yon).multiplyScalar(1.5 + k * 2.2);
        p.rotation.set(p.userData.don.x * t, p.userData.don.y * t, p.userData.don.z * t);
      });
      toz.visible = true; toz.material.opacity = Math.max(0, 0.8 - k * 0.1);
      for (var j = 0; j < 700; j++) pa.setXYZ(j, tv[j * 3] * k, tv[j * 3 + 1] * k, tv[j * 3 + 2] * k);
      pa.needsUpdate = true;
    }
    c.position.set(Math.sin(t * 0.1) * 26, 6, Math.cos(t * 0.1) * 26); c.lookAt(0, 0, 0);
  };
};

// Kuiper Kuşağı + kümelenmiş yörüngeler (Planet X ipucu)
SX.Cutscene.prototype._kuiper = function (S, c, planetX) {
  var gun = this.gunes(6); S.add(gun); this.isik.position.set(0, 0, 0);
  var nokta = new THREE.PointLight(0xfff0d0, 1.4, 0, 0); S.add(nokta);
  var gezegenler = [[10, 0x4466ff, 0.9], [16, 0xd8b070, 1.6], [22, 0x8fd6e0, 1.2], [28, 0x3f6bff, 1.2]];
  var gz = [];
  gezegenler.forEach(function (g, i) {
    S.add(this.yorungeCizgisi(g[0], g[0], 0x6688aa, 0.25));
    var m = new THREE.Mesh(new THREE.SphereGeometry(g[2], 24, 16), new THREE.MeshStandardMaterial({ color: g[1], roughness: 0.7 }));
    m.userData.r = g[0]; m.userData.h = 0.6 / Math.sqrt(g[0]); m.userData.f = i * 1.7; S.add(m); gz.push(m);
  }, this);
  var kp = [];
  for (var i = 0; i < 1600; i++) { var r = 34 + Math.random() * 14, a = Math.random() * Math.PI * 2; kp.push(Math.cos(a) * r, (Math.random() - .5) * 3, Math.sin(a) * r); }
  var kg = new THREE.BufferGeometry(); kg.setAttribute('position', new THREE.Float32BufferAttribute(kp, 3));
  var kusak = new THREE.Points(kg, new THREE.PointsMaterial({ size: 0.35, color: 0xbfd8ff, transparent: true, opacity: 0.8 }));
  S.add(kusak);
  // aynı yöne kümelenmiş uzak yörüngeler
  var kume = new THREE.Group(); S.add(kume);
  for (var k = 0; k < 6; k++) {
    var a2 = 70 + k * 9, b2 = 30 + k * 3;
    var l = this.yorungeCizgisi(a2, b2, 0xffb300, 0.55);
    l.position.x = a2 - 40; l.rotation.y = (k - 2.5) * 0.08; l.rotation.x = (k - 2.5) * 0.04;
    kume.add(l);
  }
  var px = null;
  if (planetX) {
    var pl = this.yorungeCizgisi(150, 90, 0xff1f4b, 0.8); pl.position.x = -110; pl.rotation.y = Math.PI; kume.add(pl);
  }
  return function (t) {
    gz.forEach(function (m) { var a = t * m.userData.h + m.userData.f; m.position.set(Math.cos(a) * m.userData.r, 0, Math.sin(a) * m.userData.r); });
    kusak.rotation.y = t * 0.01;
    kume.children.forEach(function (l, i) { l.material.opacity = 0.35 + 0.3 * Math.sin(t * 1.5 + i); });
    var k = Math.min(1, t / 12);
    c.position.set(Math.sin(t * 0.04) * (110 + k * 40), 55 + k * 25, Math.cos(t * 0.04) * (110 + k * 40));
    c.lookAt(15, 0, 0);
  };
};

// Planet X: karanlıktan kızılötesi parıltıyla beliren dev
SX.Cutscene.prototype._planetx = function (S, c) {
  S.fog = new THREE.FogExp2(0x01020a, 0.004);
  var tex = SX.kureDoku(256, 128, function (x, y, z, lat) {
    var b = Math.sin(lat * 7 + SX.gurultu.fbm(x * 2, y * 2, z * 2, 4) * 3);
    var v = 0.5 + 0.5 * b;
    return [30 + v * 30 | 0, 50 + v * 40 | 0, 90 + v * 60 | 0];
  });
  var pmat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 });
  var p = new THREE.Mesh(new THREE.SphereGeometry(9, 64, 48), pmat); S.add(p);
  var rimMat = new THREE.ShaderMaterial({
    uniforms: { uG: { value: 0 }, uT: { value: 0 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }',
    fragmentShader: 'uniform float uG; uniform float uT; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.0-max(dot(vN,vV),0.0),1.6); vec3 c=mix(vec3(1.0,0.12,0.3), vec3(0.3,0.9,1.0), 0.5+0.5*sin(uT*0.7)); gl_FragColor=vec4(c*f*uG*2.2, f*uG); }',
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  });
  var rim = new THREE.Mesh(new THREE.SphereGeometry(9.6, 64, 48), rimMat); S.add(rim);
  var uzakGunes = this.gunes(2.5); uzakGunes.position.set(-300, 40, -400); S.add(uzakGunes);
  this.isik.position.set(-220, 60, 140); this.isik.intensity = 0.9;
  var hale = new THREE.Sprite(new THREE.SpriteMaterial({ map: SX.parilti('rgba(255,40,90,0.55)', 'rgba(80,160,255,0.18)'), blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
  hale.scale.set(48, 48, 1); hale.position.set(0, 0, -6); S.add(hale);
  var kume = new THREE.Group(); S.add(kume);
  for (var k = 0; k < 6; k++) {
    var l = this.yorungeCizgisi(60 + k * 8, 26 + k * 3, 0xffb300, 0.3);
    l.position.x = 30 + k * 6; l.rotation.y = (k - 2.5) * 0.08; kume.add(l);
  }
  kume.position.set(0, -14, 0);
  return function (t) {
    p.rotation.y = t * 0.05;
    var g = Math.min(1, 0.25 + t / 7);
    rimMat.uniforms.uG.value = g * (0.75 + 0.25 * Math.sin(t * 2));
    rimMat.uniforms.uT.value = t;
    pmat.color.setScalar(0.3 + g * 0.6);
    var k = 1 - Math.pow(1 - Math.min(1, t / 14), 3);
    c.position.set(Math.sin(t * 0.05) * (90 - k * 58), 6 + Math.sin(t * 0.1) * 3, Math.cos(t * 0.05) * (90 - k * 58));
    c.lookAt(0, 0, 0);
  };
};

// Final: SPHEREx yakın çekim + nadirlik renklerinde havai fişekler
SX.Cutscene.prototype._final = function (S, c) {
  var d = this.dunya(30); d.position.set(0, -38, -20); S.add(d);
  var sx = this.spherex(); S.add(sx);
  var renkler = [0xb8c4d6, 0x4fc3f7, 0xb388ff, 0xffb300, 0x00e5a0, 0xff1f4b];
  var fis = [];
  for (var i = 0; i < 6; i++) { var p = this.parcacik(220, renkler[i], 0.5); S.add(p); p.userData.t0 = i * 1.1; p.userData.m = new THREE.Vector3(); fis.push(p); }
  return function (t) {
    d.rotation.y = t * 0.03;
    sx.rotation.y = t * 0.3; sx.rotation.z = Math.sin(t * 0.4) * 0.15;
    fis.forEach(function (p, i) {
      var tt = (t + p.userData.t0) % 6.6, pa = p.geometry.attributes.position, v = p.userData.v;
      if (tt < 0.05 || !p.userData.hazir) {
        p.userData.hazir = true;
        p.userData.m.set((Math.random() - .5) * 26, 4 + Math.random() * 10, -10 - Math.random() * 10);
        for (var j = 0; j < 220; j++) { var a = Math.random() * 6.28, u = Math.random() * 2 - 1, s = Math.sqrt(1 - u * u), h = 3 + Math.random() * 3; v[j * 3] = Math.cos(a) * s * h; v[j * 3 + 1] = u * h; v[j * 3 + 2] = Math.sin(a) * s * h; }
      }
      var k = Math.min(tt, 3);
      for (var j2 = 0; j2 < 220; j2++) pa.setXYZ(j2, p.userData.m.x + v[j2 * 3] * k, p.userData.m.y + v[j2 * 3 + 1] * k - k * k * 0.4, p.userData.m.z + v[j2 * 3 + 2] * k);
      pa.needsUpdate = true; p.material.opacity = Math.max(0, 1 - tt / 3.2);
    });
    c.position.set(Math.sin(t * 0.1) * 12, 3, 12 + Math.cos(t * 0.1) * 3); c.lookAt(0, 1.5, 0);
  };
};

/* =========================================================
   AŞAMA 2 SAHNELERİ: sedna, gezegeny, karadelik, tyche (+uzaylılar)
   ========================================================= */
SX.Cutscene.prototype.ufoModel = function () {
  var g = new THREE.Group();
  var govde = new THREE.Mesh(new THREE.SphereGeometry(2, 40, 16), new THREE.MeshStandardMaterial({ color: 0xc8d2de, metalness: 0.7, roughness: 0.25 }));
  govde.scale.set(1, 0.28, 1); g.add(govde);
  var kubbe = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x7dffd0, emissive: 0x1a8f6a, transparent: true, opacity: 0.85, roughness: 0.1 }));
  kubbe.position.y = 0.3; g.add(kubbe);
  for (var i = 0; i < 10; i++) {
    var a = i / 10 * Math.PI * 2;
    var l = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x00e5a0 : 0xff3d7f }));
    l.position.set(Math.cos(a) * 1.75, -0.08, Math.sin(a) * 1.75); g.add(l);
  }
  var isin = new THREE.Mesh(new THREE.ConeGeometry(1.6, 6, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0x7dffbe, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }));
  isin.position.y = -3.1; g.add(isin); g.userData.isin = isin;
  return g;
};

// Sedna: kırmızı cüce gezegen ve çok uzun eliptik yörünge
SX.Cutscene.prototype._sedna = function (S, c) {
  var gun = this.gunes(5); gun.position.set(-70, 0, 0); S.add(gun); this.isik.position.set(-70, 0, 0);
  var tex = SX.kureDoku(256, 128, function (x, y, z) { var n = SX.gurultu.fbm(x * 3, y * 3, z * 3, 5); return [150 + n * 90 | 0, 50 + n * 40 | 0, 35 + n * 20 | 0]; });
  var sd = new THREE.Mesh(new THREE.SphereGeometry(3, 48, 32), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 })); S.add(sd);
  var yor = this.yorungeCizgisi(110, 40, 0xff7a5a, 0.6); yor.position.x = 30; S.add(yor);
  var nep = this.yorungeCizgisi(28, 28, 0x6688aa, 0.3); nep.position.set(-70, 0, 0); S.add(nep);
  return function (t) {
    var a = Math.PI * 0.15 + t * 0.03;
    sd.position.set(30 + Math.cos(a) * 110, 0, Math.sin(a) * 40); sd.rotation.y = t * 0.2;
    c.position.set(sd.position.x + 14, 6, sd.position.z + 16); c.lookAt(sd.position.x - 20, 0, sd.position.z);
  };
};

// Gezegen Y: küçük buzlu gezegen + eğik Kuiper kuşağı
SX.Cutscene.prototype._gezegeny = function (S, c) {
  var gun = this.gunes(4); gun.position.set(0, 0, 0); S.add(gun); this.isik.position.set(0, 0, 0);
  S.add(new THREE.PointLight(0xfff0d0, 1.2, 0, 0));
  var kp = [];
  for (var i = 0; i < 2200; i++) { var r = 40 + Math.random() * 18, a = Math.random() * Math.PI * 2; kp.push(Math.cos(a) * r, (Math.random() - .5) * 3, Math.sin(a) * r); }
  var kg = new THREE.BufferGeometry(); kg.setAttribute('position', new THREE.Float32BufferAttribute(kp, 3));
  var kusak = new THREE.Points(kg, new THREE.PointsMaterial({ size: 0.4, color: 0xbfe0ff, transparent: true, opacity: 0.85 }));
  kusak.rotation.x = 0.22; S.add(kusak);                     // eğik kuşak
  var duz = this.yorungeCizgisi(49, 49, 0x6688aa, 0.25); S.add(duz);   // normal düzlem (karşılaştırma)
  var tex = SX.kureDoku(256, 128, function (x, y, z) { var n = SX.gurultu.fbm(x * 4, y * 4, z * 4, 5); return [150 + n * 80 | 0, 170 + n * 70 | 0, 190 + n * 60 | 0]; });
  var py = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 32), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 })); S.add(py);
  var pyYor = this.yorungeCizgisi(72, 72, 0xff1f4b, 0.6); pyYor.rotation.x = 0.4; S.add(pyYor);
  return function (t) {
    var a = t * 0.05;
    py.position.set(Math.cos(a) * 72, 0, Math.sin(a) * 72).applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.4);
    py.rotation.y = t * 0.3;
    kusak.rotation.y = t * 0.01;
    var k = Math.min(1, t / 10);
    c.position.set(Math.sin(t * 0.04) * (150 - k * 40), 30 + k * 10, Math.cos(t * 0.04) * (150 - k * 40)); c.lookAt(0, 0, 0);
  };
};

// İlkel kara delik: karanlık küre + bükülen ışık halkası + girdap
SX.Cutscene.prototype._karadelik = function (S, c) {
  var kd = new THREE.Mesh(new THREE.SphereGeometry(3, 48, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })); S.add(kd);
  var halka = new THREE.Mesh(new THREE.SphereGeometry(3.6, 64, 48), new THREE.ShaderMaterial({
    uniforms: { uT: { value: 0 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }',
    fragmentShader: 'uniform float uT; varying vec3 vN; varying vec3 vV; void main(){ float d=max(dot(vN,vV),0.0); float f=exp(-pow((d-0.18)/0.09,2.0)); vec3 c=mix(vec3(1.0,0.75,0.4), vec3(0.6,0.8,1.0), 0.5+0.5*sin(uT)); gl_FragColor=vec4(c*f*1.8, f); }',
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
  }));
  S.add(halka);
  var N = 1500, gp = new Float32Array(N * 3), veri = [];
  for (var i = 0; i < N; i++) veri.push({ r: 5 + Math.random() * 22, a: Math.random() * Math.PI * 2, y: (Math.random() - .5) * 1.5 });
  var gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.BufferAttribute(gp, 3));
  var girdap = new THREE.Points(gg, new THREE.PointsMaterial({ size: 0.35, color: 0xffc070, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
  girdap.rotation.x = 0.35; S.add(girdap);
  return function (t, dt) {
    halka.material.uniforms.uT.value = t;
    for (var i = 0; i < N; i++) {
      var v = veri[i]; v.a += dt * 6 / Math.pow(v.r, 1.2); v.r -= dt * 0.25; if (v.r < 3.4) { v.r = 26; }
      gp[i * 3] = Math.cos(v.a) * v.r; gp[i * 3 + 1] = v.y * (v.r / 26); gp[i * 3 + 2] = Math.sin(v.a) * v.r;
    }
    gg.attributes.position.needsUpdate = true;
    c.position.set(Math.sin(t * 0.06) * 36, 9 + Math.sin(t * 0.15) * 4, Math.cos(t * 0.06) * 36); c.lookAt(0, 0, 0);
  };
};

// Tyche: Oort Bulutu'nda dev gezegen + etrafında dolaşan uzaylı gemileri
SX.Cutscene.prototype._tyche = function (S, c) {
  var tex = SX.kureDoku(256, 128, function (x, y, z, lat) {
    var b = Math.sin(lat * 8 + SX.gurultu.fbm(x * 2, y * 2, z * 2, 4) * 3), v = 0.5 + 0.5 * b;
    return [90 + v * 60 | 0, 80 + v * 50 | 0, 120 + v * 70 | 0];
  });
  var tp = new THREE.Mesh(new THREE.SphereGeometry(9, 64, 48), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 })); S.add(tp);
  this.isik.position.set(-150, 60, 120); this.isik.intensity = 1.0;
  var bp = [];
  for (var i = 0; i < 3000; i++) { var u = Math.random() * 2 - 1, a = Math.random() * 6.28, s = Math.sqrt(1 - u * u), r = 30 + Math.random() * 90; bp.push(Math.cos(a) * s * r, u * r, Math.sin(a) * s * r); }
  var bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.Float32BufferAttribute(bp, 3));
  var bulut = new THREE.Points(bg, new THREE.PointsMaterial({ size: 0.7, color: 0xcfe6ff, transparent: true, opacity: 0.7, map: SX.parilti('rgba(255,255,255,1)', 'rgba(200,230,255,0.4)'), blending: THREE.AdditiveBlending, depthWrite: false }));
  S.add(bulut);
  var ufolar = [];
  for (var k = 0; k < 3; k++) { var u2 = this.ufoModel(); u2.userData.f = k * 2.1; u2.userData.r = 15 + k * 3; S.add(u2); ufolar.push(u2); }
  var hale = new THREE.Sprite(new THREE.SpriteMaterial({ map: SX.parilti('rgba(255,40,90,0.4)', 'rgba(140,80,255,0.15)'), blending: THREE.AdditiveBlending, depthWrite: false }));
  hale.scale.set(42, 42, 1); hale.position.z = -5; S.add(hale);
  return function (t) {
    tp.rotation.y = t * 0.04; bulut.rotation.y = t * 0.005;
    ufolar.forEach(function (u, i) {
      var a = t * (0.5 + i * 0.12) + u.userData.f;
      u.position.set(Math.cos(a) * u.userData.r, Math.sin(t * 0.8 + i) * 4 + 2, Math.sin(a) * u.userData.r);
      u.rotation.y = t * 3; u.rotation.z = Math.sin(t * 2 + i) * 0.2;
      u.userData.isin.material.opacity = 0.1 + 0.12 * Math.sin(t * 9 + i);
    });
    var k2 = 1 - Math.pow(1 - Math.min(1, t / 12), 3);
    c.position.set(Math.sin(t * 0.05) * (80 - k2 * 40), 10 + Math.sin(t * 0.1) * 4, Math.cos(t * 0.05) * (80 - k2 * 40)); c.lookAt(0, 0, 0);
  };
};
