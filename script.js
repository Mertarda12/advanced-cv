// ===== Bootstrap + GSAP helpers =====
gsap.registerPlugin(ScrollTrigger);

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
let dark = true;
themeBtn.addEventListener('click', ()=>{
  dark = !dark;
  document.body.dataset.bsTheme = dark ? 'dark' : 'light';
});

// Parallax bg (GSAP)
gsap.to("#heroBg", {
  yPercent: 10,
  ease: "none",
  scrollTrigger: { trigger: "#hero", start: "top top", scrub: true }
});

// Typewriter effect
const typeTarget = document.getElementById('typewriter');
const roles = [
  "Mert Arda",
  "Product-focused Web Engineer",
  "AI-assisted Front-end",
  "WordPress & Performance"
];
let ri=0, ci=0, deleting=false;
function typeLoop(){
  const full = roles[ri];
  ci += deleting ? -1 : 1;
  typeTarget.textContent = full.slice(0,ci);
  if(!deleting && ci === full.length){ deleting = true; setTimeout(typeLoop, 1200); return; }
  if(deleting && ci === 0){ deleting = false; ri = (ri+1)%roles.length; }
  setTimeout(typeLoop, deleting ? 50 : 70);
}
typeLoop();

// Copy email
document.getElementById('copyEmail').addEventListener('click', async ()=>{
  await navigator.clipboard.writeText('hello@novatech.ai');
  const btn = document.getElementById('copyEmail');
  const prev = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-check2-circle"></i> Copied';
  setTimeout(()=>btn.innerHTML = prev, 1400);
});

// Download PDF (print)
document.getElementById('downloadPDF').addEventListener('click', ()=>window.print());

// Timeline reveal
gsap.utils.toArray(".tl-item").forEach((el,i)=>{
  gsap.from(el, {
    opacity:0, x:-20, duration:.6, delay:i*0.05,
    scrollTrigger:{ trigger: el, start:"top 85%" }
  });
});

// Skill bars animate on enter
gsap.utils.toArray(".progress-bar").forEach(bar=>{
  const v = parseInt(bar.dataset.value,10) || 0;
  ScrollTrigger.create({
    trigger: bar, start: "top 90%",
    onEnter: ()=> gsap.to(bar, { width: v+"%", duration: .8 })
  });
});

// Portfolio filter
const filterBtns = document.querySelectorAll("[data-filter]");
const gridItems = document.querySelectorAll(".grid-item");
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    gridItems.forEach(item=>{
      const show = (cat === 'all') || item.dataset.cat === cat;
      item.style.display = show ? "" : "none";
      if(show){
        gsap.fromTo(item, {opacity:0, y:12},{opacity:1,y:0,duration:.25});
      }
    });
  });
});

// Navbar show bg on scroll
window.addEventListener('scroll', ()=>{
  document.querySelector('header .glass')?.classList.toggle('scrolled', window.scrollY>30);
});
