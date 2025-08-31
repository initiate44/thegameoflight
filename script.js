// Starfield + ultra-subtle shimmer + geometry parallax
(function(){
  const cosmos = document.getElementById('cosmos');
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(2, window.devicePixelRatio || 1);

  function resize(){
    const {innerWidth:w, innerHeight:h} = window;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    seedStars(Math.floor((w*h)/5000)); // density adjusts with viewport
  }

  const STARS = [];
  function seedStars(n){
    STARS.length = 0;
    for(let i=0;i<n;i++){
      STARS.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random()*0.7 + 0.2,
        a: Math.random()*0.4 + 0.1
      });
    }
  }

  function draw(t=0){
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    for(const s of STARS){
      const tw = (Math.sin(t*0.0025 + s.x*12 + s.y*17) + 1)/2;
      const a = s.a * (0.7 + 0.3*tw);
      ctx.beginPath();
      ctx.arc(s.x*w, s.y*h, s.r*DPR, 0, Math.PI*2);
      ctx.fillStyle = `rgba(230,235,255,${a})`;
      ctx.fill();
    }
  }

  // Animation loop
  let raf;
  function loop(ts){
    draw(ts||0);
    raf = requestAnimationFrame(loop);
  }

  // Geometry parallax
  const geometry = document.getElementById('geometry');
  function parallax(e){
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    geometry.style.transform = `translate(${x*-6}px, ${y*-8}px)`;
  }

  // Reduced motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){
    document.body.classList.add('reduce-motion');
  }

  // Init
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', parallax);
  loop();
})();
