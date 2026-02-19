/**
 * Scientifically accurate constellation canvas for the hero section.
 *
 * Renders real stars around Columba using RA/Dec positions projected onto
 * a 2D canvas. Stars drift back to their astronomically correct positions
 * via spring-damper physics after mouse interaction.
 *
 * Constellations: Columba, Canis Major, Lepus, Puppis, Caelum.
 * Respects prefers-reduced-motion by rendering a single static frame.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.innerWidth < 768;

  // ── Physics ───────────────────────────────────────
  var SPRING_K = 0.006;
  var DAMPING = 0.93;
  var MOUSE_RADIUS = 200;
  var MOUSE_FORCE = 0.06;
  var FIELD_COUNT = isMobile ? 15 : 40;
  var connectDist = 130;

  // ── Projection center (balanced for visual layout) ─
  var CENTER_RA = 95;
  var CENTER_DEC = -29;
  var COS_CENTER = Math.cos(CENTER_DEC * Math.PI / 180);

  // ── Star Catalog ──────────────────────────────────
  // Each star: [RA in degrees, Dec in degrees, apparent magnitude]
  // RA converted from hours: h*15 + m*0.25
  var CONSTELLATIONS = [
    {
      name: 'Columba', primary: true, side: -1,
      stars: [
        [82.80, -35.47, 3.87],   // 0  ε Col
        [84.91, -34.07, 2.64],   // 1  α Col (Phact)
        [87.73, -35.77, 3.12],   // 2  β Col (Wazn)
        [89.40, -35.28, 4.36],   // 3  γ Col
        [95.53, -33.44, 3.85],   // 4  δ Col
        [89.80, -42.82, 3.96],   // 5  η Col
        [94.08, -35.14, 4.37],   // 6  κ Col
      ],
      lines: [[0,1],[1,2],[2,3],[3,4],[3,6],[2,5]],
    },
    {
      name: 'Canis Major', side: 1,
      stars: [
        [95.68, -17.96, 1.98],   // 0  β CMa (Mirzam)
        [101.28, -16.72, -1.46], // 1  α CMa (Sirius)
        [107.10, -26.39, 1.84],  // 2  δ CMa (Wezen)
        [104.65, -28.97, 1.50],  // 3  ε CMa (Adhara)
        [95.08, -30.06, 3.02],   // 4  ζ CMa (Furud)
        [111.03, -29.30, 2.45],  // 5  η CMa (Aludra)
      ],
      lines: [[0,1],[1,2],[2,3],[2,5],[3,4],[4,0]],
    },
    {
      name: 'Lepus', side: -1,
      stars: [
        [78.23, -16.21, 3.31],   // 0  μ Lep
        [83.18, -17.82, 2.58],   // 1  α Lep (Arneb)
        [86.73, -14.82, 3.55],   // 2  ζ Lep
        [89.10, -14.17, 3.72],   // 3  η Lep
        [82.05, -20.76, 2.84],   // 4  β Lep (Nihal)
        [76.35, -22.37, 3.19],   // 5  ε Lep
        [86.13, -22.45, 3.60],   // 6  γ Lep
        [87.80, -20.88, 3.81],   // 7  δ Lep
      ],
      lines: [[0,1],[1,4],[4,5],[1,2],[2,3],[2,7],[7,6],[6,4]],
    },
    {
      name: 'Puppis', side: 1,
      stars: [
        [99.45, -43.20, 3.17],   // 0  ν Pup
        [109.28, -37.10, 2.70],  // 1  π Pup
        [112.30, -43.30, 3.25],  // 2  σ Pup
        [120.90, -40.00, 2.25],  // 3  ζ Pup (Naos)
      ],
      lines: [[0,1],[1,2],[2,3]],
    },
    {
      name: 'Caelum', side: -1,
      stars: [
        [70.15, -41.86, 4.45],   // 0  α Cae
        [70.50, -37.14, 5.05],   // 1  β Cae
        [76.00, -35.48, 4.55],   // 2  γ Cae
      ],
      lines: [[0,1],[1,2]],
    },
  ];

  // ── Helpers ───────────────────────────────────────
  function magToRadius(mag) {
    if (mag < 0) return 3.5;   // Sirius
    if (mag < 2) return 2.8;
    if (mag < 3) return 2.2;
    if (mag < 4) return 1.8;
    return 1.4;
  }

  function magToGlow(mag) {
    if (mag < 0) return 14;
    if (mag < 2) return 10;
    if (mag < 3) return 8;
    if (mag < 4) return 6;
    return 4;
  }

  function projectSky(ra, dec) {
    return {
      x: (ra - CENTER_RA) * COS_CENTER,
      y: -(dec - CENTER_DEC),
    };
  }

  // ── State ─────────────────────────────────────────
  var width, height, time = 0;
  var mouse = { x: -1000, y: -1000 };
  var nodes = [];
  var cLines = [];   // { from, to, primary }
  var cMeta = [];    // { name, startIdx, count, primary }
  var skyMin = { x: 0, y: 0 };
  var skyMax = { x: 0, y: 0 };

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    connectDist = Math.min(width, height) * 0.12;
    reproject();
  }

  function reproject() {
    var pad = 0.1;
    var uw = width * (1 - 2 * pad);
    var uh = height * (1 - 2 * pad);
    var sw = skyMax.x - skyMin.x;
    var sh = skyMax.y - skyMin.y;
    if (sw === 0 || sh === 0) return;
    var scale = Math.min(uw / sw, uh / sh);
    var ox = (width - sw * scale) / 2;
    var oy = (height - sh * scale) / 2;

    // Slide left-group constellations left and right-group right,
    // opening a clear corridor behind the centered hero text.
    var spread = width * 0.13;

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.isStar) {
        n.homeX = ox + (n.skyX - skyMin.x) * scale + n.side * spread;
        n.homeY = oy + (n.skyY - skyMin.y) * scale;
      } else {
        n.homeX = n.fx * width;
        n.homeY = n.fy * height;
      }
    }
  }

  function buildNodes() {
    nodes = [];
    cLines = [];
    cMeta = [];
    skyMin.x = Infinity;  skyMin.y = Infinity;
    skyMax.x = -Infinity; skyMax.y = -Infinity;

    for (var c = 0; c < CONSTELLATIONS.length; c++) {
      var con = CONSTELLATIONS[c];
      var base = nodes.length;

      for (var s = 0; s < con.stars.length; s++) {
        var star = con.stars[s];
        var sky = projectSky(star[0], star[1]);

        if (sky.x < skyMin.x) skyMin.x = sky.x;
        if (sky.x > skyMax.x) skyMax.x = sky.x;
        if (sky.y < skyMin.y) skyMin.y = sky.y;
        if (sky.y > skyMax.y) skyMax.y = sky.y;

        nodes.push({
          skyX: sky.x, skyY: sky.y,
          homeX: 0, homeY: 0,
          x: 0, y: 0, vx: 0, vy: 0,
          r: magToRadius(star[2]),
          gr: magToGlow(star[2]),
          isStar: true,
          primary: !!con.primary,
          side: con.side || 0,
          phase: Math.random() * 6.28,
        });
      }

      for (var l = 0; l < con.lines.length; l++) {
        cLines.push({
          from: base + con.lines[l][0],
          to: base + con.lines[l][1],
          primary: !!con.primary,
        });
      }

      cMeta.push({
        name: con.name,
        startIdx: base,
        count: con.stars.length,
        primary: !!con.primary,
      });
    }

    // Pad sky bounds
    var px = (skyMax.x - skyMin.x) * 0.08;
    var py = (skyMax.y - skyMin.y) * 0.08;
    skyMin.x -= px; skyMax.x += px;
    skyMin.y -= py; skyMax.y += py;

    // Ambient field stars
    for (var f = 0; f < FIELD_COUNT; f++) {
      nodes.push({
        skyX: 0, skyY: 0,
        homeX: 0, homeY: 0,
        fx: Math.random(), fy: Math.random(),
        x: 0, y: 0, vx: 0, vy: 0,
        r: 0.5 + Math.random() * 0.7,
        gr: 2 + Math.random() * 2,
        isStar: false,
        primary: false,
        phase: Math.random() * 6.28,
      });
    }

    reproject();

    // Start at home positions
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].x = nodes[i].homeX;
      nodes[i].y = nodes[i].homeY;
    }
  }

  // ── Physics ───────────────────────────────────────
  function update() {
    time++;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];

      // Gentle breathing (constellation stars tight, field stars looser)
      var ba = n.isStar ? 0.8 : 1.5;
      var tx = n.homeX + Math.sin(time * 0.003 + n.phase) * ba;
      var ty = n.homeY + Math.cos(time * 0.004 + n.phase * 1.3) * ba;

      // Spring force toward home
      n.vx += (tx - n.x) * SPRING_K;
      n.vy += (ty - n.y) * SPRING_K;

      // Mouse attraction
      if (!isMobile) {
        var mx = mouse.x - n.x;
        var my = mouse.y - n.y;
        var md = Math.sqrt(mx * mx + my * my);
        if (md < MOUSE_RADIUS && md > 1) {
          var mf = MOUSE_FORCE * (1 - md / MOUSE_RADIUS);
          n.vx += (mx / md) * mf;
          n.vy += (my / md) * mf;
        }
      }

      n.vx *= DAMPING;
      n.vy *= DAMPING;
      n.x += n.vx;
      n.y += n.vy;
    }
  }

  // ── Rendering ─────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Faint proximity mesh (network motif)
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < connectDist) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(255,255,255,' + (0.05 * (1 - d / connectDist)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Constellation lines
    for (var l = 0; l < cLines.length; l++) {
      var cl = cLines[l];
      var a = nodes[cl.from], b = nodes[cl.to];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      if (cl.primary) {
        // Columba lines use the brand gradient
        var lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        lg.addColorStop(0, 'rgba(196,113,237,0.3)');
        lg.addColorStop(1, 'rgba(246,79,89,0.3)');
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.5;
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    }

    // Stars (glow + core)
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var ga = n.isStar ? 0.2 : 0.06;
      var ca = n.isStar ? 0.85 : 0.4;

      // Radial glow
      var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.gr);
      g.addColorStop(0, 'rgba(255,255,255,' + ga + ')');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.gr, 0, 6.283);
      ctx.fillStyle = g;
      ctx.fill();

      // Solid core
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, 6.283);
      ctx.fillStyle = 'rgba(255,255,255,' + ca + ')';
      ctx.fill();
    }

    // Constellation labels (follow the stars as they move)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (var m = 0; m < cMeta.length; m++) {
      var meta = cMeta[m];
      var cx = 0, maxY = -Infinity;
      for (var k = meta.startIdx; k < meta.startIdx + meta.count; k++) {
        cx += nodes[k].x;
        if (nodes[k].y > maxY) maxY = nodes[k].y;
      }
      cx /= meta.count;
      ctx.font = (meta.primary ? '600 13px' : '400 11px') + ' Inter,system-ui,sans-serif';
      ctx.fillStyle = meta.primary ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)';
      ctx.fillText(meta.name, cx, maxY + 18);
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  function init() {
    resize();
    buildNodes();

    if (reducedMotion) {
      draw();
      return;
    }

    loop();

    if (!isMobile) {
      canvas.addEventListener('mousemove', function (e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      });
      canvas.addEventListener('mouseleave', function () {
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }
  }

  window.addEventListener('resize', resize);
  init();
})();
