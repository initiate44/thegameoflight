
// --- Cosmic Codes Update (starfield + parallax) ---
(function(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(2, window.devicePixelRatio || 1);

  function resize(){
    const {innerWidth:w, innerHeight:h} = window;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    seed(Math.floor((w*h)/5000));
  }

  const stars = [];
  function seed(n){
    stars.length = 0;
    for(let i=0;i<n;i++){
      stars.push({ x: Math.random(), y: Math.random(), r: Math.random()*0.7+0.2, a: Math.random()*0.4+0.1 });
    }
  }

  function draw(t=0){
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      const tw = (Math.sin(t*0.0025 + s.x*12 + s.y*17) + 1)/2;
      const a = s.a * (0.7 + 0.3*tw);
      ctx.beginPath();
      ctx.arc(s.x*w, s.y*h, s.r*DPR, 0, Math.PI*2);
      ctx.fillStyle = `rgba(230,235,255,${a})`;
      ctx.fill();
    }
  }

  function loop(ts){ draw(ts||0); requestAnimationFrame(loop); }

  // Geometry parallax
  const geometry = document.getElementById('geometry');
  function parallax(e){
    if(!geometry) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    geometry.style.transform = `translate(${x*-6}px, ${y*-8}px)`;
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', parallax);
  loop();
})();
