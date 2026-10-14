/* ===== EDIT YOUR CONTENT HERE ===== */
const bootLines = [
  "> BOOTING AGNI_OS v1.0 ... OK",
  "> LOADING SYSTEMS_ENGINEERING ... OK",
  "> LOADING GAMEPLAY_DESIGN ... OK",
  "> LOADING ENEMY_AI ... OK",
  "> LOADING TECH_ART (SHADERS/VFX) ... OK",
  "> LOADING AUDIO_FMOD ... OK",
  "> LOADING LEVEL_DESIGN ... OK",
  "> NEW QUESTS ... IN PROGRESS █"
];
const roles = ["GAME DEVELOPER","SYSTEMS ENGINEER","TECH ARTIST","GAME AI PROGRAMMER","SOUND DESIGNER"];
const chips = ["Systems engineering","Gameplay design","Level design","Game AI","Tech art","Substance","FMOD audio"];
const specs = ["Gameplay systems & mechanics","Enemy AI & behavior","Shaders, VFX, particles, lighting","Substance Designer & texturing","3D modeling (simple hard surface)","Audio design with FMOD","Level design & set dressing","Performance & optimization"];

const reel = [ // id = part after v= or youtu.be/
  {id:"CNe7auWREJg", title:"Enemy AI", note:"Reactive enemy behavior"},
  {id:"TKDc0czBzjk", title:"Room Variant Controller", note:"Room variation system"},
  {id:"IK6MtoZt9go", title:"Look Trigger System", note:"Events driven by player gaze"},
  {id:"1xmeOEdt6fU", title:"Reactive Water Shader", note:"Water that reacts to the player"}
];
const games = [
  {name:"Rusty Rampage", status:"RELEASED", text:"Agni Studio's in-house game on Steam.", link:"https://store.steampowered.com/app/5069350/Rusty_Rampage/", label:"View on Steam"},
  {name:"Project Ouroboros", status:"IN PROGRESS", text:"Psychological horror with modular systems and reactive AI.", link:"https://ballsy-brit.itch.io/ouroboros-game", label:"Play on itch.io"},
  {name:"Top-down action game", status:"IN PROGRESS", text:"Details coming soon."},
  {name:"Survival horror game", status:"IN PROGRESS", text:"Details coming soon."}
];
const abilities = [
  ["Gameplay design","Mechanics, game feel, progression"],
  ["Systems engineering","Modular, reusable gameplay code"],
  ["Game AI","Perception, behavior, state machines"],
  ["Technical art","Shaders, VFX, particles"],
  ["3D & Substance","Materials, texturing, hard-surface"],
  ["Sound design","FMOD implementation"],
  ["Level design","Layout, pacing, set dressing"],
  ["Optimization","Profiling and performance"]
];
const inventory = [
  ["Game dev & 3D",["Unity","Unreal Engine","C#","C++","Blender","Substance Designer","Substance Painter","FMOD"]],
  ["Web & backend",["JavaScript","TypeScript","React","Node.js","Express","HTML","CSS","Tailwind","PHP"]],
  ["Data & tools",["Python","Java","Flutter","Linux","MongoDB","MySQL","PostgreSQL"]]
];

/* ===== ENGINE (no need to edit below) ===== */
const $ = id => document.getElementById(id);
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function typeInto(el, text, speed = 28) {
  if (still) { el.textContent = text; return; }
  el.textContent = "";
  for (const ch of text) { el.textContent += ch; await sleep(speed); }
}

// Render content
$("chips").innerHTML = chips.map(c => `<span class="chip">${c}</span>`).join("");
$("specs").innerHTML = specs.map(s => `<li>${s}</li>`).join("");
$("reel").innerHTML = reel.map(v => `
  <article class="card vid">
    <a class="thumb" href="https://youtu.be/${v.id}" target="_blank" rel="noopener" data-id="${v.id}" aria-label="${esc(v.title)}">
      <img loading="lazy" src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${esc(v.title)} thumbnail"></a>
    <div class="info"><h3>${esc(v.title)}</h3><p>${esc(v.note)}</p></div></article>`).join("");
$("gamelist").innerHTML = games.map(g => `
  <article class="card"><span class="status">${g.status}</span><h3 class="t">${esc(g.name)}</h3><p>${esc(g.text)}</p>
  ${g.link ? `<p><a href="${g.link}" target="_blank" rel="noopener">${esc(g.label)}</a></p>` : ""}</article>`).join("");
$("abilities").innerHTML = abilities.map(a => `<article class="card"><h3>${a[0]}</h3><p>${a[1]}</p></article>`).join("");
$("inventory").innerHTML = inventory.map(i => `<article class="card"><h3>${i[0]}</h3><div class="tags">${i[1].map(t => `<span>${t}</span>`).join("")}</div></article>`).join("");

// Hover preview on video cards
document.querySelectorAll(".thumb").forEach(t => {
  const id = t.dataset.id;
  const start = () => {
    if (t.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1`;
    f.allow = "autoplay; encrypted-media"; f.tabIndex = -1; f.style.pointerEvents = "none";
    t.appendChild(f); t.classList.add("live");
  };
  const stop = () => { t.querySelector("iframe")?.remove(); t.classList.remove("live"); };
  if (matchMedia("(hover:hover)").matches && !still) {
    t.addEventListener("mouseenter", start); t.addEventListener("mouseleave", stop);
    t.addEventListener("focus", start); t.addEventListener("blur", stop);
  }
});

// Scroll progress bar
addEventListener("scroll", () => {
  const h = document.documentElement;
  $("prog").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
});

// Achievement toast
let toastTimer;
function toast(msg) {
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

// Typewriter on section headings and .type blocks when scrolled into view
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  io.unobserve(e.target);
  const s = e.target;
  typeInto(s.querySelector("h2"), s.dataset.title, 45);
  s.querySelectorAll(".type").forEach(el => typeInto(el, el.dataset.text.replace(/&#10;/g, "\n"), 18));
  toast(s.dataset.ach);
}), {threshold: .35});
document.querySelectorAll("section").forEach(s => io.observe(s));

// Hero: type name, boot log, then cycle roles
(async () => {
  await typeInto($("name"), "MD. TAWHIDUL HOQUE", 60);
  const boot = $("boot");
  for (const l of bootLines) { boot.textContent += l + "\n"; await sleep(still ? 0 : 160); }
  let i = 0;
  while (true) {
    await typeInto($("role"), roles[i % roles.length], 70);
    if (still) break;
    await sleep(1600);
    while ($("role").textContent.length) { $("role").textContent = $("role").textContent.slice(0, -1); await sleep(35); }
    i++;
  }
})();
$("yr") && ($("yr").textContent = new Date().getFullYear());

// Avatar: uses avatar.jpg / .png / .webp if you add one next to index.html, else the silhouette
(() => {
  const srcs = ["avatar.jpg", "avatar.png", "avatar.webp"]; let i = 0; const img = $("photo");
  img.onload = () => { img.hidden = false; $("sil").style.display = "none"; };
  img.onerror = () => { if (++i < srcs.length) img.src = srcs[i]; };
  img.src = srcs[0];
})();
