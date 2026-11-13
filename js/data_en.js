/* =========================================================
   ENGLISH CONTENT — İngilizce oyun içeriği (Aşama 4)
   data.js içindeki Türkçe metinlerin karşılıkları.
   Anahtarlar data.js ile aynıdır; SX.veriDiliUygula() bunları uygular.
   ========================================================= */
window.SX = window.SX || {};

SX.EN = {
  RARITY: { normal: 'Common', nadir: 'Rare', destansi: 'Epic', efsanevi: 'Legendary', gizemli: 'Mysterious', kaotik: 'Chaotic' },

  KARAKTER: {
    oyuncu: { rol: '8th-grade student · Sky Detective' },
    ada: { rol: 'SPHEREx science team (fictional character)' },
    piksel: { ad: 'PIXEL', rol: 'Helper robot' },
    anlatici: { ad: 'Narrator' }
  },

  CISIMLER: {
    asteroit: { ad: 'Main-Belt Asteroid', kisa: 'A rocky body orbiting between Mars and Jupiter.', bilgiler: [
      'The main asteroid belt is estimated to hold more than a million asteroids larger than 1 km.',
      'Because they orbit the Sun, they appear in a different place in the sky in every scan.',
      'At short wavelengths they reflect sunlight; at long wavelengths they glow with their own heat.'] },
    nea: { ad: 'Near-Earth Asteroid', kisa: "A fast asteroid whose orbit comes close to Earth's orbit.", bilgiler: [
      'Because they are close to us, they move very fast across the sky and make big jumps between scans.',
      "NASA's Planetary Defense program tracks these objects.",
      "In 2022 NASA's DART spacecraft hit the asteroid Dimorphos and changed its orbit."] },
    kuyruklu: { ad: 'Comet', kisa: 'A "dirty snowball" whose ices turn into gas near the Sun.', bilgiler: [
      'The tail always points away from the Sun, because sunlight and the solar wind push gas and dust outward.',
      'Carbon dioxide (CO₂) gas glows around 4.3 micrometers, and SPHEREx can see it.',
      'Comets carry ices left over from the time the Solar System formed.'] },
    kahverengi: { ad: 'Brown Dwarf', kisa: 'A "failed star": too small to be a star, too big to be a planet.', bilgiler: [
      'They do not have enough mass to sustain hydrogen fusion in their cores.',
      'They are so cool that they are almost dark in visible light, but they glow in the infrared.',
      'Nearby ones slowly drift against the background stars over the years (proper motion).'] },
    supernova: { ad: 'Supernova', kisa: 'The explosion of a massive star at the end of its life.', bilgiler: [
      'For a short time a supernova can shine as bright as a whole galaxy.',
      'It does not move: it is missing in one scan, suddenly appears in the next, then slowly fades.',
      'Some of the iron and calcium in our bodies was made in ancient supernovae.'] },
    parcalar: { ad: 'Broken Asteroid Fragments', kisa: 'Pieces of a broken-up asteroid travelling together.', bilgiler: [
      'Asteroids can break apart after a collision or by spinning too fast.',
      'The pieces start from the same point and slowly drift apart in different directions.',
      'Some of these fragments may one day fall to Earth as meteors.'] },
    kuiper: { ad: 'Kuiper Belt Object', kisa: 'A small icy world beyond Neptune.', bilgiler: [
      'Pluto is a Kuiper Belt object; Clyde Tombaugh found it in 1930 with the "blink" method.',
      'They are so far away that they move very slowly across the sky.',
      'Water ice on their surfaces absorbs light around 3 micrometers.'] },
    planetx: { ad: 'Planet X Candidate', kisa: 'A hypothetical giant planet thought to orbit far beyond Neptune.', bilgiler: [
      'Scientists try to explain the clustered orbits of some distant Kuiper Belt objects with the gravity of an unseen planet.',
      'This planet ("Planet Nine") has not been found in reality — the candidate in the game is fictional.',
      'It is so far and faint that it barely moves for months.'] },
    sedna: { ad: 'Sedna', kisa: 'One of the most distant dwarf planets, with a very strange orbit.', bilgiler: [
      'Discovered in 2003. Even at its closest it is more than twice as far from the Sun as Neptune (about 76 AU).',
      'One trip around the Sun takes more than 11,000 years.',
      'Its surface is one of the reddest in the Solar System, so it looks brighter at short wavelengths.'] },
    gezegeny: { ad: 'Planet Y', kisa: 'A hypothetical Mercury-to-Earth-sized planet thought to tilt the Kuiper Belt.', bilgiler: [
      'In 2025 some astronomers suggested that the average plane of distant Kuiper Belt objects is slightly tilted, and that an unseen planet could cause it.',
      'It is different from Planet X: it is thought to be smaller and closer. It has not been found — the candidate in the game is fictional.',
      'A small icy world gives off almost no heat; it only reflects sunlight, so it is searched for at short wavelengths.'] },
    karadelik: { ad: 'Primordial Black Hole Candidate', kisa: 'The idea that Planet X could really be a grapefruit-sized black hole.', bilgiler: [
      'In 2019 some physicists suggested that a "primordial black hole" of a few Earth masses but only a few centimeters across could explain Planet X\'s effects.',
      'Primordial black holes are thought to have formed in the first moments of the universe; they have not been proven to exist.',
      'A black hole gives off no light, but it bends the light of the stars behind it (gravitational lensing): the stars shift sideways in a ring and brighten.'] },
    tyche: { ad: 'Tyche', kisa: 'A hypothetical giant planet, larger than Jupiter, once proposed in the Oort Cloud.', bilgiler: [
      'A giant planet in the Oort Cloud was proposed to explain where some comets come from.',
      "In 2014, data from NASA's WISE telescope showed there is no such large planet in our neighborhood. The signal in the game is fictional.",
      'The Oort Cloud is a huge cloud of icy bodies extending tens of thousands of AU from the Sun.'] },
    ufo: { ad: 'Alien Scout Ship', kisa: 'The mysterious ship that disrupts our data in the Tyche mission (completely fictional!).', bilgiler: [
      'This object is completely fictional: no telescope has ever seen an alien ship.',
      'Scientists search for artificial radio signals from space in projects such as SETI.',
      'Most strange streaks in sky images are satellites, planes, cosmic rays or camera glitches.'] },
    uydu: { ad: 'Satellite Trail', kisa: 'The streak left by a satellite passing in front of the telescope.', bilgiler: [
      'Thousands of satellites orbit Earth; they show up as streaks in astronomers\' images.',
      'They appear in only one scan and leave a very long trail.',
      'Scientists remove these trails so they are not confused with "real" objects.'] },
    yildizlararasi: { ad: 'Interstellar Visitor', kisa: 'An object from another star system passing through the Solar System.', bilgiler: [
      'Three interstellar visitors are known so far: ʻOumuamua (2017), Borisov (2019) and 3I/ATLAS (2025).',
      'They pass so fast that they can only be seen for a short time.',
      'In this game it appears in only one scan and in a narrow wavelength range.'] },
    yetim: { ad: 'Rogue Planet', kisa: 'A planet wandering through space alone, not bound to any star.', bilgiler: [
      'They may have been thrown out of young star systems.',
      'With no star to warm them, they glow faintly only in the infrared, from their own internal heat.',
      'There may be more rogue planets in the Milky Way than stars.'] },
    mikromercek: { ad: 'Gravitational Lensing Flare', kisa: 'An invisible object passing in front of a star bends and magnifies its light.', bilgiler: [
      "According to Einstein's general theory of relativity, mass bends the path of light.",
      'As an object passes in front, the background star brightens several times for a short while, then returns to normal.',
      'It can only be seen exactly at that scan — miss it and you will not catch it again!'] }
  },

  SEVIYELER: {
    1: { baslik: 'First Signal', altBaslik: 'A wanderer from the asteroid belt',
      gorev: 'Drag the time bar to the right. Find the object that changes position between scans and click it.',
      ipucu: 'Press the Blink button: it quickly switches between the first scan and the current scan. Look for the jumping dot!',
      soru: { metin: 'This object moved a little in every scan and is visible at all wavelengths. What could it be?',
        secenekler: ['Main-Belt Asteroid', 'A fixed star', 'A distant galaxy'],
        aciklama: 'Stars and galaxies are so far away that their positions do not change in a few years. Asteroids in the Solar System orbit the Sun, so they are in a different place in every scan.' },
      rozet: { ad: 'First Light', aciklama: 'You found your first moving object.' } },
    2: { baslik: 'Fast Traveler', altBaslik: 'Planetary defense, to your stations!',
      gorev: 'This object is very fast! Find the dot that makes big jumps between scans.',
      ipucu: 'Variable stars brighten and fade, but they always stay in the same place. Look for the object that moves.',
      soru: { metin: 'The object made very big jumps between scans. What could it be?',
        secenekler: ['Kuiper Belt object', 'Near-Earth Asteroid', 'Comet'],
        aciklama: 'The closer something is, the faster it seems to move across the sky — like nearby cars on a highway passing faster than distant mountains. A Kuiper Belt object would be very slow, and a comet would have a tail.' },
      rozet: { ad: 'Speed Hunter', aciklama: 'You caught a near-Earth asteroid.' } },
    3: { baslik: 'Icy Visitor', altBaslik: 'A dirty snowball approaching the Sun',
      gorev: 'The comet is very faint at short wavelengths. Move the wavelength to about 4.3 µm and find the moving object with a tail.',
      ipucu: 'Set the wavelength slider between 4.2 and 4.3 µm: carbon dioxide gas glows there.',
      soru: { metin: 'The object has a tail and is very bright at 4.3 µm. What could it be?',
        secenekler: ['Supernova', 'Brown dwarf', 'Comet'],
        aciklama: 'A comet\'s ices turn into gas as it approaches the Sun. CO₂ gas glows at 4.3 µm, and the tail stretches away from the Sun.' },
      rozet: { ad: 'Ice Explorer', aciklama: 'You saw a comet\'s gas in the infrared.' } },
    4: { baslik: 'Cool Neighbor', altBaslik: 'On the trail of a failed star',
      gorev: 'The brown dwarf is invisible at short wavelengths. Switch to long wavelengths and find the slowly drifting object.',
      ipucu: 'Raise the wavelength above 3.8 µm. Hot stars fade, the cool dwarf shines!',
      soru: { metin: 'The object is visible only at long infrared wavelengths and moves very little. What could it be?',
        secenekler: ['Brown Dwarf', 'Main-belt asteroid', 'White dwarf'],
        aciklama: 'Brown dwarfs are very cool (a few hundred degrees). Cool objects give off most of their light at long wavelengths. Because they are nearby, they drift slowly over the years.' },
      rozet: { ad: 'Cold Light', aciklama: 'You found a brown dwarf hiding in the infrared.' } },
    5: { baslik: 'Star Explosion', altBaslik: 'A giant light in a distant galaxy',
      gorev: 'This time the object does not move! Find the light that was missing in the first scans and then suddenly appeared.',
      ipucu: 'Use Blink to look at the first scan: is there a dot that was not there at all? Variable stars are present in the first scan too.',
      soru: { metin: 'The object was not there, suddenly appeared and is slowly fading. Its position never changed. What could it be?',
        secenekler: ['Asteroid', 'Supernova', 'Comet'],
        aciklama: 'Supernovae happen in very distant galaxies, so they do not move. They brighten suddenly with the explosion, then fade over weeks and months.' },
      rozet: { ad: 'Explosion Witness', aciklama: 'You witnessed the birth of a supernova.' } },
    6: { baslik: 'Broken Pieces', altBaslik: 'An asteroid is breaking apart!',
      gorev: 'An asteroid splits into pieces between scans. Find one of the scattering fragments!',
      ipucu: 'The green-labelled object is an already known asteroid — it is not new! Look for an object that splits from one point into several pieces.',
      soru: { metin: 'A single object split into several pieces, and the pieces are drifting in different directions. What could it be?',
        secenekler: ['Supernova', 'Variable star', 'Broken Asteroid Fragments'],
        aciklama: 'Asteroids can break apart after a collision or by spinning too fast. The pieces drift away from the same point and can later become sources of meteor showers.' },
      rozet: { ad: 'Fragment Detective', aciklama: 'You tracked a breaking asteroid.' } },
    7: { baslik: 'Frozen Frontier', altBaslik: 'Icy worlds beyond Neptune',
      gorev: 'Kuiper Belt objects are very far away and very slow. Zoom in (mouse wheel), use Blink and find the faint object that shifts only slightly.',
      ipucu: 'Zoom with the mouse wheel and drag to move around the sky. In Blink mode look for a dot that moves only a few pixels.',
      soru: { metin: 'The object is very faint and moved only slightly in 3 years. What could it be?',
        secenekler: ['Near-Earth asteroid', 'Kuiper Belt Object', 'Variable star'],
        aciklama: 'The Kuiper Belt lies beyond Neptune — 30 to 50 times Earth\'s distance from the Sun. Objects that far away seem to move very slowly across the sky.' },
      rozet: { ad: 'Frontier Guard', aciklama: 'You found a world on the frozen edge of the Solar System.' } },
    8: { baslik: 'Planet X', altBaslik: 'Hunting the invisible giant',
      gorev: 'Planet X is visible only in a very narrow range around 4.6 µm and barely moves. Do not be fooled by known asteroids!',
      ipucu: 'Set the wavelength between 4.55 and 4.75 µm. Then zoom in and use Blink to find the slowly drifting, unlabelled object.',
      soru: { metin: 'The object is unlabelled, visible only around 4.6 µm and moves very, very little over the years. What could it be?',
        secenekler: ['Main-belt asteroid', 'A fixed star', 'Planet X Candidate'],
        aciklama: 'A giant planet far beyond Neptune moves very slowly and receives very little sunlight. Cold giant planets may release their internal heat through a "window" around 4–5 µm.' },
      rozet: { ad: 'Planet X Hunter', aciklama: 'You found a Planet X candidate!' } },
    9: { baslik: 'Sedna\'s Path', altBaslik: 'A red world on an 11,000-year orbit',
      gorev: 'Sedna is very red: it is brighter at short wavelengths. Set the wavelength between 1 and 2 µm and find the very slowly drifting object.',
      ipucu: 'Pull the wavelength to about 1.6 µm. At long wavelengths dust clouds hide Sedna. Zoom in and use the Magnifier (L).',
      soru: { metin: 'The object moves very slowly, is brighter at short wavelengths and has a very long orbit. What could it be?',
        secenekler: ['A distant Sedna-like dwarf planet', 'Near-Earth asteroid', 'Supernova'],
        aciklama: 'Sedna is very far from the Sun, so it seems to move very slowly. Organic materials called "tholins" on its surface make it very red.' },
      rozet: { ad: 'Distant Wanderer', aciklama: 'You found one of the most distant worlds of the Solar System.' } },
    10: { baslik: 'Tilted Belt', altBaslik: 'On the trail of Planet Y',
      gorev: 'Planet Y is visible only at the shortest wavelengths (0.9–1.35 µm) and moves very slowly. Hot stars are very bright there — careful!',
      ipucu: 'Set the wavelength to about 1.1 µm. Use Blink to find the slowly drifting, unlabelled dot that is not a known asteroid.',
      soru: { metin: 'The object is unlabelled, very slow and visible only around 1 µm. What could it be?',
        secenekler: ['Brown dwarf', 'Planet Y candidate', 'Comet'],
        aciklama: 'Brown dwarfs shine at long wavelengths. A small, icy, cold planet gives off almost no heat; it only reflects sunlight, so it is seen at short wavelengths.' },
      rozet: { ad: 'Tilted World Hunter', aciklama: 'You found a candidate for the planet that tilts the Kuiper Belt.' } },
    11: { baslik: 'Dark Gravity', altBaslik: 'Find the invisible through the dance of the stars',
      gorev: 'The black hole is invisible! But the stars behind it shift sideways in a ring and brighten, and this ring slowly moves between scans. Click the center of the ring.',
      ipucu: 'Turn on Blink: in one area the stars are pushed around a ring and brighten. The ring moves — click the empty spot at its center.',
      soru: { metin: 'Nothing is visible there, but the light of the stars around it is bent and this region slowly moves. What could it be?',
        secenekler: ['An empty region', 'Variable star', 'Primordial black hole candidate'],
        aciklama: 'Mass bends the path of light (general relativity). An invisible but massive object shifts the stars behind it sideways in a ring and makes them brighter. This is called gravitational lensing.' },
      rozet: { ad: 'Dark Hunter', aciklama: 'You found an invisible black hole candidate from bent light.' } },
    12: { baslik: 'Chaos Cloud', altBaslik: 'Tyche and the alien scouts',
      gorev: 'Tyche is visible only between 4.2 and 4.6 µm and barely moves. ALIEN SHIPS will disrupt your data — when one arrives, click it to chase it away!',
      ipucu: 'Set the wavelength to 4.4 µm. When you see an alien ship, click it right away: chasing it erases one mistake. Watch out for fake objects (alien traps)!',
      soru: { metin: 'The object is unlabelled, glows faintly around 4.4 µm and moved very little in 3 years. What could it be?',
        secenekler: ['Alien trap', 'Tyche candidate', 'Main-belt asteroid'],
        aciklama: 'A giant planet in the Oort Cloud is so far away that it barely moves. Alien traps jump randomly between scans and soon disappear.' },
      rozet: { ad: 'Chaos Conqueror', aciklama: 'You completed the hardest mission: you found the Tyche candidate despite the aliens!' } }
  },

  EK_ROZETLER: {
    r_uydu: { ad: 'Streak Hunter', aciklama: 'You caught a satellite trail.' },
    r_yildizlararasi: { ad: 'Interstellar Traveler', aciklama: 'You found a visitor from another star system.' },
    r_yetim: { ad: 'Dark Wanderer', aciklama: 'You found a rogue planet wandering without a star.' },
    r_mikromercek: { ad: 'Light Bender', aciklama: 'You caught a gravitational lensing flare at exactly the right moment.' },
    r_ufo: { ad: 'Alien Chaser', aciklama: 'You chased away an alien ship trying to corrupt your data.' },
    r_kusursuz: { ad: 'Perfect Eye', aciklama: 'Finish every level with 3 stars.' },
    r_tam: { ad: 'SPHEREx Master', aciklama: 'Find all 17 objects in the collection.' }
  },

  HIKAYE: {
    giris: [
      'Antalya, Saklıkent. Midnight. 8th-grade student {isim} is at an observing camp with the school astronomy club.',
      'PIXEL, look at this sky! Billions of stars... How will we ever know which one is moving?',
      'Beep! New message. From: NASA — SPHEREx Science Team. Beep boop!',
      'Hello {isim}! I am Dr. Ada Kaya. Since 2025 our SPHEREx telescope has been mapping the whole sky every 6 months in 102 infrared colors.',
      'The images hold more than a billion objects. We cannot find the moving ones on our own. Will you join the Sky Detectives team?',
      'Join? Of course! Where do we start?',
      'With an easy mission: a rock from the asteroid belt. Drag the PROGRESS bar at the bottom, watch the scan beam and find the object that moves!'
    ],
    nea: [
      'Alert! Alert! I detected an object close to Earth. It is moving very fast!',
      'Near-Earth asteroids make big jumps across the sky. Tracking them is very important for protecting our planet.',
      'So, planetary defense! This time I will keep my eyes wide open.'
    ],
    kuyruklu: [
      'An icy visitor is approaching the Sun. When a comet warms up, its ices turn into gas.',
      'SPHEREx\'s superpower: 102 colors! Carbon dioxide gas glows at 4.3 micrometers. Move the wavelength slider there.',
      'Tip: the tail always points away from the Sun. Beep!'
    ],
    kahverengi: [
      'Some objects are too small to be stars and too big to be planets: brown dwarfs.',
      'They are so cool that they are almost dark in visible light. But they glow at long infrared wavelengths.',
      'So if I move the wavelength to the long side, it will show up?',
      'Exactly! Search at short wavelengths and you will be looking until morning. Beep boop.'
    ],
    supernova: [
      'In a galaxy millions of light-years away, a giant star reached the end of its life and exploded: a supernova!',
      'This time the object does not move. It is missing in one scan and suddenly there in the next. Then it slowly fades.',
      'Watch out for variable stars! They also brighten and fade, but they have been there since the first scan.'
    ],
    parcalar: [
      'Emergency! An asteroid is breaking apart! Beep beep beep!',
      'Asteroids can break apart after a collision or by spinning too fast. The pieces drift away from the same point in different directions.',
      'Broken asteroid fragments... I have to catch them!',
      'Careful: green-labelled objects are known asteroids already in our catalog. Find the new one!'
    ],
    kuiper: [
      'Beyond Neptune, icy worlds wander in the Kuiper Belt. They are so far away that they move very slowly.',
      'Something strange, {isim}: the orbits of some distant Kuiper Belt objects seem to cluster in the same direction. As if something huge and invisible is pulling them...',
      'Something huge and invisible? Could it be...',
      'First find this icy object. Use zoom! Beep.'
    ],
    planetx: [
      'For years astronomers have debated an idea: a planet several times larger than Earth, far beyond Neptune, not yet found. We call it "Planet X".',
      'It is so far away that it barely moves. It is very faint and visible only around 4.6 micrometers. Known asteroids may fool you.',
      'This is the hardest mission... but I am ready.',
      'CHAOTIC level detected. Good luck, detective! Beep beep beeeep!'
    ],
    sedna: [
      'We reported the Planet X candidate to NASA, {isim}. But the data shows even stranger things...',
      'Let\'s warm up with a distant dwarf planet like Sedna. At its closest Sedna comes about 76 AU from the Sun, and one orbit takes more than 11,000 years.',
      'Reddish and very slow! Search at short wavelengths. Try the new Magnifier tool too: the L key! Beep.'
    ],
    gezegeny: [
      'In 2025 some astronomers proposed an idea: the plane of the Kuiper Belt is slightly tilted. A small, unseen planet could be causing it: Planet Y.',
      'Because it is small and icy, it gives off almost no heat; it only reflects sunlight. Search for it at the shortest wavelengths, around 1 micrometer.',
      'A chaotic level... Hot stars are very bright at short wavelengths, this will be tough!',
      'A world we know almost nothing about. Find it and you make history! Beep boop.'
    ],
    karadelik: [
      'Some physicists proposed an even crazier idea: Planet X may not be a planet at all, but a grapefruit-sized primordial black hole!',
      'A black hole gives off no light, so you cannot see it. But it bends the light of the stars behind it: the stars shift sideways in a ring and brighten.',
      'So I will find something invisible from the way the stars around it behave...',
      'Exactly! Watch the dance of the stars and click the very center of the ring. Beep!'
    ],
    tyche: [
      'The last mission, {isim}. Once, astronomers wondered whether a giant larger than Jupiter might hide in the Oort Cloud: Tyche.',
      'The WISE telescope did not find it. But there is a strange signal in the SPHEREx data... and someone is interfering with our data!',
      'WARNING! WARNING! Unidentified flying objects! They are corrupting the data stream! Beeeeep!',
      'When an alien ship appears, click it right away and chase it off! Otherwise it will scramble your screen, drop fake objects, change your wavelength or black out a region.',
      'I will find Tyche and chase off the aliens. Let\'s go!'
    ],
    final: [
      'Incredible, {isim}! The Tyche signal is recorded and the alien scouts have fled! You completed the hardest mission of the Sky Detectives.',
      'Planet X, Planet Y, a primordial black hole, Tyche... The discoveries in the game are fictional; in the real sky these questions are still waiting for answers. Maybe one day you will really find one of them!',
      'Mysterious and Chaotic objects may still be hiding somewhere... I will complete the collection!',
      'Tip: if the anomaly detector is blinking, a hidden object is in that level. Right wavelength + right scan = discovery! Beep!'
    ]
  },

  BITIS_SOZU: {
    1: 'Great job! You just did what astronomers have done for 200 years: you picked out a moving object among the stars.',
    2: 'Super! Spotting nearby asteroids early is the first step of planetary defense.',
    3: 'Amazing! You saw a comet\'s gas in a color the human eye cannot see.',
    4: 'Wow! You found an object that is dark in visible light by looking in the infrared. That is exactly why SPHEREx has 102 colors.',
    5: 'You caught a star\'s last light. Supernovae scatter new elements into the universe.',
    6: 'Great tracking! Knowing where the pieces go helps us understand future meteors.',
    7: 'Clyde Tombaugh found Pluto in 1930 exactly like this: by blinking between two photographs!',
    8: 'An incredible discovery! But the team is receiving new and even stranger signals... The missions continue!',
    9: 'Great! The strange orbits of distant worlds like Sedna helped give rise to the Planet X idea.',
    10: 'A chaotic discovery! If Planet Y really exists, future telescopes such as the Vera C. Rubin Observatory may find it.',
    11: 'You saw the invisible! Gravitational lensing is a real method used to search for dark matter and black holes.',
    12: 'Legendary! You chased off the aliens and caught the Tyche candidate.'
  }
};
