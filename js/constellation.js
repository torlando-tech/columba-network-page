/**
 * Constellation canvas animation for the hero section.
 * Drifting nodes connected by translucent edges, with mouse proximity attraction.
 * Respects prefers-reduced-motion by rendering a single static frame.
 */
(function () {
  'use strict';

  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const NODE_COUNT = isMobile ? 25 : 45;
  const CONNECT_DIST = isMobile ? 140 : 180;
  const MOUSE_RADIUS = 200;

  let width, height;
  let mouse = { x: -1000, y: -1000 };
  let nodes = [];
  let animId;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.5 + Math.random() * 1.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = 0.12 * (1 - dist / CONNECT_DIST);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Nodes
    for (const node of nodes) {
      // Glow
      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 6);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }
  }

  function update() {
    for (const node of nodes) {
      // Mouse attraction (desktop only)
      if (!isMobile) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = 0.02 * (1 - dist / MOUSE_RADIUS);
          node.vx += dx / dist * force;
          node.vy += dy / dist * force;
        }
      }

      // Damping
      node.vx *= 0.995;
      node.vy *= 0.995;

      node.x += node.vx;
      node.y += node.vy;

      // Wrap edges
      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;
    }
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    createNodes();

    if (reducedMotion) {
      draw(); // Single static frame
      return;
    }

    loop();

    if (!isMobile) {
      canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      canvas.addEventListener('mouseleave', function () {
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }
  }

  window.addEventListener('resize', function () {
    resize();
    // Redistribute nodes if count/viewport changed dramatically
    if (nodes.length !== NODE_COUNT) {
      createNodes();
    }
  });

  init();
})();
