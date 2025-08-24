(function(){
  // Features heading scroll zoom-out-into-existence effect
  var featuresZoomHeading = document.getElementById('featuresZoomHeading');
  if(featuresZoomHeading){
    var shown = false;
    window.addEventListener('scroll', function(){
      var rect = featuresZoomHeading.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if(rect.top < windowHeight * 0.7 && !shown){
        featuresZoomHeading.classList.add('show');
        shown = true;
      }
    });
  }
})();
(function(){
  // Hero heading scroll zoom-in-out effect (only h1)
  var heroZoomHeading = document.getElementById('heroZoomHeading');
  if(heroZoomHeading){
    window.addEventListener('scroll', function(){
      var scrollY = window.scrollY || window.pageYOffset;
      var max = 260; // px after which it's fully gone
      var pct = Math.min(scrollY / max, 1);
      var scale = 1 + pct * 0.32;
      var opacity = 1 - pct * 1.1;
      heroZoomHeading.style.transform = 'scale(' + scale + ')';
      heroZoomHeading.style.opacity = opacity < 0 ? 0 : opacity;
    });
  }
})();
(function(){
  // Stats fade-in on load
  window.addEventListener('DOMContentLoaded', function() {
    var stats = document.querySelectorAll('.stat-fadein');
    stats.forEach(function(card, i) {
      setTimeout(function() {
        card.classList.add('show');
      }, 200 + i * 180);
    });
  });
})();
/* Liquid Glass Interactions: nav, mobile, scroll reveal, tilt, parallax, demo mock */

(function(){
  // Mobile menu toggle
  const burger = document.querySelector('[data-burger]');
  const mobile = document.querySelector('[data-mobile]');
  if (burger && mobile){
    burger.addEventListener('click', ()=> mobile.classList.toggle('open'));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, {threshold:.18});
  reveals.forEach(el=> io.observe(el));

  // Tilt effect
  document.querySelectorAll('.tilt').forEach(el=>{
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height/2) / (r.height/2)) * -6;
      const ry = ((x - r.width/2) / (r.width/2)) * 6;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    el.addEventListener('mouseleave', ()=> el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)');
  });

  // Parallax hero ornaments
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY || window.pageYOffset;
    parallaxEls.forEach(el=>{
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = `translateY(${y* -speed}px)`;
    });
  }, {passive:true});

  // DEMO: simple mock search
  const input = document.querySelector('[data-search]');
  const resultsWrap = document.querySelector('[data-results]');
  if (input && resultsWrap){
    const mock = [
      { code: "81530110", title: "Sewing Machine Operator", score: 0.93, path: "Division 81 → Group 53 → Unit 01 → 10" },
      { code: "75310200", title: "Tailor (General)",         score: 0.84, path: "Division 75 → Group 31 → Unit 02 → 00" },
      { code: "75310310", title: "Garment Cutter",           score: 0.79, path: "Division 75 → Group 31 → Unit 03 → 10" }
    ];
    const render = (arr)=>{
      resultsWrap.innerHTML = arr.map((r,i)=> `
        <div class="result reveal" style="transition-delay:${i*60}ms">
          <div>
            <div style="font-weight:600">${r.title} <span style="color:#9fb2c9;font-size:.85rem;margin-left:6px">${r.path}</span></div>
            <div style="color:#9fb2c9;font-size:.85rem">Code: ${r.code}</div>
          </div>
          <div style="min-width:160px">
            <div style="color:#9fb2c9;font-size:.8rem">Confidence</div>
            <div class="bar"><div class="fill" style="width:${(r.score*100).toFixed(0)}%"></div></div>
            <div style="font-size:.8rem;margin-top:4px">${(r.score*100).toFixed(1)}%</div>
          </div>
        </div>
      `).join('');
      resultsWrap.querySelectorAll('.reveal').forEach(el=> {
        setTimeout(()=> el.classList.add('show'), 10);
      });
    };
    input.addEventListener('input', ()=>{
      const q = input.value.trim().toLowerCase();
      if (!q){ resultsWrap.innerHTML = `<p style="color:#9fb2c9">Top results will appear here. Try typing <span style="color:#e6eef7">“sewing”</span>.</p>`; return; }
      const filtered = mock.filter(x => x.title.toLowerCase().includes(q) || q.length>1);
      render(filtered.length? filtered : mock);
    });
  }

  // Dashboard fake bars animation
  document.querySelectorAll('[data-bargrid]').forEach(grid=>{
    const bars = grid.querySelectorAll('.bar-col');
    bars.forEach((b,i)=>{
      const h = (30 + Math.abs(Math.sin(i))*70);
      b.style.height = h + '%';
      b.style.transition = 'height .8s ease';
      setTimeout(()=> b.style.height = (h + (Math.random()*10-5))+'%', 400);
    });
  });
})();
// Animate counter for stats
function animateCounter(element, target, originalText) {
  let start = 0;
  let duration = 1800; // ms
  let startTime = null;
  let isInt = Number.isInteger(target);

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function update(currentTime) {
    if (!startTime) startTime = currentTime;
    let elapsed = currentTime - startTime;
    let progress = Math.min(elapsed / duration, 1);
    let eased = easeOutQuad(progress);
    let value = start + (target - start) * eased;
    element.textContent = isInt ? Math.floor(value) : value.toFixed(1);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = originalText;
    }
  }
  requestAnimationFrame(update);
}
//stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target = parseFloat(text.replace(/[^0-9.]/g, ''));
                if (text.includes('M')) target *= 1000000;
                if (text.includes('.5M')) target = 2500000;
                // For "24/7" and similar, skip animation
                if (isNaN(target) || text.includes('/')) {
                  stat.textContent = text;
                } else {
                  animateCounter(stat, target, text);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });
// timeline
// Slide-in animation on scroll
function handleSlideIn() {
  const elements = document.querySelectorAll('.slide-in-left, .slide-in-right');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add('in-view');
    }
  });
}
window.addEventListener('scroll', handleSlideIn);
window.addEventListener('DOMContentLoaded', handleSlideIn);