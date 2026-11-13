/* =========================================================
   SES — WebAudio ile üretilen efektler (ses dosyası gerekmez)
   ========================================================= */
window.SX = window.SX || {};
SX.Ses = {
  ctx: null, ana: null, acik: true, ortamNod: null,
  baslat: function () {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.ana = this.ctx.createGain(); this.ana.gain.value = 0.55; this.ana.connect(this.ctx.destination);
    } catch (e) { this.ctx = null; }
  },
  ac: function (v) { this.acik = v; if (this.ana) this.ana.gain.value = v ? 0.55 : 0; },
  _ton: function (f, sure, tip, ses, gecikme, kayma) {
    if (!this.ctx) return;
    var c = this.ctx, t = c.currentTime + (gecikme || 0);
    var o = c.createOscillator(), g = c.createGain();
    o.type = tip || 'sine'; o.frequency.setValueAtTime(f, t);
    if (kayma) o.frequency.exponentialRampToValueAtTime(kayma, t + sure);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(ses || 0.2, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
    o.connect(g); g.connect(this.ana); o.start(t); o.stop(t + sure + 0.05);
  },
  tik: function () { this._ton(880, 0.06, 'triangle', 0.08); },
  yaz: function () { this._ton(1400 + Math.random() * 300, 0.025, 'square', 0.015); },
  hata: function () { this._ton(180, 0.25, 'sawtooth', 0.12, 0, 90); this._ton(140, 0.3, 'square', 0.06, 0.05, 70); },
  kilit: function () { [660, 880, 1320].forEach(function (f, i) { SX.Ses._ton(f, 0.12, 'triangle', 0.12, i * 0.09); }); },
  isin: function () { this._ton(300 + Math.random() * 80, 0.08, 'sine', 0.03, 0, 600); },
  uplink: function () {
    for (var i = 0; i < 10; i++) this._ton(1200 + (i % 3) * 300, 0.05, 'square', 0.03, i * 0.17);
  },
  ufo: function () {
    if (!this.ctx) return;
    var c = this.ctx, t = c.currentTime, o = c.createOscillator(), g = c.createGain(), l = c.createOscillator(), lg = c.createGain();
    o.type = 'sine'; o.frequency.value = 520; l.frequency.value = 7; lg.gain.value = 180; l.connect(lg); lg.connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.09, t + 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.connect(g); g.connect(this.ana); o.start(t); l.start(t); o.stop(t + 1.7); l.stop(t + 1.7);
  },
  basari: function (nadirlik) {
    var sira = SX.RARITY[nadirlik] ? SX.RARITY[nadirlik].sira : 0;
    var notalar = [[523, 659, 784], [523, 659, 784, 1047], [523, 659, 784, 988, 1175],
      [392, 523, 659, 784, 1047, 1319], [440, 554, 659, 880, 1109, 1319, 1760], [220, 330, 466, 659, 932, 1319, 1865]][sira];
    var tip = sira >= 4 ? 'sawtooth' : 'triangle';
    notalar.forEach(function (f, i) { SX.Ses._ton(f, 0.35 + sira * 0.05, tip, 0.11, i * 0.1); });
    if (sira >= 4) for (var j = 0; j < 8; j++) this._ton(200 + Math.random() * 2000, 0.08, 'square', 0.04, 0.8 + j * 0.06);
  },
  ortam: function (ac) {
    if (!this.ctx) return;
    if (ac && !this.ortamNod) {
      var c = this.ctx, g = c.createGain(); g.gain.value = 0.0;
      var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500;
      [55, 82.4, 110.3].forEach(function (fr) { var o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fr; o.detune.value = Math.random() * 10; o.connect(f); o.start(); });
      var lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = 0.07; lg.gain.value = 250; lfo.connect(lg); lg.connect(f.frequency); lfo.start();
      f.connect(g); g.connect(this.ana);
      g.gain.linearRampToValueAtTime(0.035, c.currentTime + 3);
      this.ortamNod = g;
    }
  }
};
