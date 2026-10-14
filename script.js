/* ===== EDIT YOUR CONTENT HERE ===== */

// YouTube showcase: id = the part after v= or youtu.be/
const reel = [
  {id:"CNe7auWREJg", title:"Enemy AI", note:"Reactive enemy behaviour"},
  {id:"TKDc0czBzjk", title:"Room Variant Controller", note:"Procedural room variation"},
  {id:"IK6MtoZt9go", title:"Look Trigger System", note:"Events driven by player gaze"},
  {id:"1xmeOEdt6fU", title:"Reactive Water Shader", note:"Water that responds to the player"}
];

const games = [
  {name:"Rusty Rampage", genre:"Released on Steam", text:"Agni Studio's in-house game.", link:"https://store.steampowered.com/app/5069350/Rusty_Rampage/", label:"View on Steam"},
  {name:"Project Ouroboros", genre:"Psychological horror", text:"Modular systems, reactive AI and an unsettling world. In development.", link:"https://ballsy-brit.itch.io/ouroboros-game", label:"Play on itch.io"},
  {name:"Top-down action game", genre:"In development", text:"Details coming soon.", link:"", label:""},
  {name:"Survival horror game", genre:"In development", text:"Details coming soon.", link:"", label:""}
];

const skills = [
  ["Gameplay design","Mechanics, game feel, player progression"],
  ["Systems engineering","Modular, reusable gameplay architecture"],
  ["Game AI","Enemy behaviour, perception, state machines"],
  ["Technical art","Shaders, VFX, particles, lighting"],
  ["3D & Substance","Substance Designer materials, hard-surface modeling"],
  ["Sound design","FMOD implementation and audio design"],
  ["Level design","Layout, pacing, set dressing"],
  ["Optimization","Profiling and performance tuning"]
];

/* ===== RENDER (no need to edit below) ===== */
const $ = id => document.getElementById(id);
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

$("reel").innerHTML = reel.map(v => `
  <article class="card">
    <a class="thumb" href="https://youtu.be/${v.id}" target="_blank" rel="noopener" data-id="${v.id}" aria-label="${esc(v.title)}">
      <img loading="lazy" src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${esc(v.title)} thumbnail">
    </a>
    <div class="info"><h3>${esc(v.title)}</h3><p>${esc(v.note)}</p></div>
  </article>`).join("");

$("gamelist").innerHTML = games.map(g => `
  <article class="card">
    <h3>${esc(g.name)}</h3><p class="genre">${esc(g.genre)}</p><p>${esc(g.text)}</p>
    ${g.link ? `<p><a href="${g.link}" target="_blank" rel="noopener">${esc(g.label)}</a></p>` : ""}
  </article>`).join("");

$("skilllist").innerHTML = skills.map(s => `<article class="card"><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join("");
$("yr").textContent = new Date().getFullYear();

// Hover preview: swap thumbnail for a muted, looping YouTube embed
document.querySelectorAll(".thumb").forEach(t => {
  const id = t.dataset.id;
  const start = () => {
    if (t.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&playsinline=1`;
    f.allow = "autoplay; encrypted-media"; f.tabIndex = -1;
    f.style.pointerEvents = "none"; // keeps the click going to the link
    t.appendChild(f); t.classList.add("live");
  };
  const stop = () => { const f = t.querySelector("iframe"); if (f) f.remove(); t.classList.remove("live"); };
  if (matchMedia("(hover:hover)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    t.addEventListener("mouseenter", start); t.addEventListener("mouseleave", stop);
    t.addEventListener("focus", start); t.addEventListener("blur", stop);
  }
});
