const $ = (s) => document.querySelector(s);
const prizeNames = ["Champion","Runner-up","3rd Place","4th Place","5th Place","6th Place","7th Place","8th Place","9th Place","10th Place"];
const prizeGrid = $("#prizeGrid");
prizeNames.forEach((name,i)=>{const card=document.createElement("div");card.className="prize-card"+(i===0?" featured":"");card.innerHTML=`<span class="prize-rank">${String(i+1).padStart(2,"0")}</span><small>${name.toUpperCase()}</small><strong>${i<3?"Trophy + Prize":"Prize / Memento"}</strong>`;prizeGrid.append(card);});

const defaultTeams = Array.from({length:30},(_,i)=>({name:`Team Slot ${String(i+1).padStart(2,"0")}`,registered:false}));
let teams = JSON.parse(localStorage.getItem("tufyTeams")||"null") || defaultTeams;
function renderTeams(filter=""){
  const grid=$("#teamGrid");grid.innerHTML="";
  teams.filter(t=>t.name.toLowerCase().includes(filter.toLowerCase())).forEach((t,i)=>{
    const original=teams.indexOf(t);const el=document.createElement("div");el.className="team-card"+(t.registered?" registered":"");
    el.innerHTML=`<span class="num">${String(original+1).padStart(2,"0")}</span><div><strong>${escapeHtml(t.name)}</strong><small>${t.registered?"REGISTERED":"OPEN SLOT"}</small></div>`;grid.append(el);
  });
  $("#teamCount").textContent=teams.filter(t=>t.registered).length;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
renderTeams();
$("#teamSearch").addEventListener("input",e=>renderTeams(e.target.value));

const matches = [
 {id:"M01",a:"Team Slot 01",b:"Team Slot 02",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"},
 {id:"M02",a:"Team Slot 03",b:"Team Slot 04",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"},
 {id:"M03",a:"Team Slot 05",b:"Team Slot 06",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"},
 {id:"M04",a:"Team Slot 07",b:"Team Slot 08",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"},
 {id:"M05",a:"Team Slot 09",b:"Team Slot 10",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"},
 {id:"M06",a:"Team Slot 11",b:"Team Slot 12",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"},
 {id:"M07",a:"Team Slot 13",b:"Team Slot 14",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"},
 {id:"M08",a:"Team Slot 15",b:"Team Slot 16",date:"Match day · To be confirmed",status:"upcoming",sa:"—",sb:"—"}
];
let scores=JSON.parse(localStorage.getItem("tufyScores")||"null")||matches.map(m=>({a:m.sa,b:m.sb,status:m.status}));
function renderMatches(filter="all"){
 const list=$("#matchList");list.innerHTML="";
 matches.forEach((m,i)=>{const s=scores[i];if(filter!=="all"&&s.status!==filter)return;
 const row=document.createElement("div");row.className="match-row";row.innerHTML=`<span class="match-id">${m.id}</span><span class="match-team">${escapeHtml(m.a)}</span><span class="match-score">${s.a} : ${s.b}</span><span class="match-team right">${escapeHtml(m.b)}</span><span class="match-status ${s.status}">${s.status.toUpperCase()}</span><span class="match-meta">${m.date}</span>`;list.append(row);
 });
 if(!list.children.length)list.innerHTML='<p class="match-meta">No matches in this category yet.</p>';
}
function renderScores(){
 $("#scoreBody").innerHTML=matches.map((m,i)=>`<tr><td>${m.id}</td><td>${escapeHtml(m.a)}</td><td class="score-sets">${scores[i].a} – ${scores[i].b}</td><td>${escapeHtml(m.b)}</td><td>${scores[i].status.toUpperCase()}</td></tr>`).join("");
 $("#scoreEditor").innerHTML=matches.map((m,i)=>`<div class="editor-row"><b>${m.id}</b><input aria-label="Team A score" type="text" id="sa${i}" value="${scores[i].a}"><span>:</span><input aria-label="Team B score" type="text" id="sb${i}" value="${scores[i].b}"><select id="st${i}"><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select><button data-save="${i}">Save</button></div>`).join("");
 scores.forEach((s,i)=>$("#st"+i).value=s.status);
 $("#scoreEditor").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{const i=+btn.dataset.save;scores[i]={a:$("#sa"+i).value,b:$("#sb"+i).value,status:$("#st"+i).value};localStorage.setItem("tufyScores",JSON.stringify(scores));renderScores();renderMatches(currentFilter);}));
}
let currentFilter="all";renderMatches();renderScores();
document.querySelectorAll(".match-tabs button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".match-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentFilter=b.dataset.filter;renderMatches(currentFilter);}));
$("#registrationForm").addEventListener("submit",e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());const existing=teams.find(t=>t.registered&&t.name.toLowerCase()===data.teamName.trim().toLowerCase());
 if(existing){$("#formMessage").textContent="That team name is already registered.";return;}
 const slot=teams.find(t=>!t.registered);if(!slot){$("#formMessage").textContent="All 30 team slots are full. Contact the organizer.";return;}
 slot.name=data.teamName.trim();slot.registered=true;localStorage.setItem("tufyTeams",JSON.stringify(teams));renderTeams($("#teamSearch").value);$("#formMessage").textContent=`${slot.name} registered in this browser preview! Connect a backend before collecting official entries.`;e.target.reset();
});
$("#menuToggle").addEventListener("click",()=>$("#navLinks").classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>$("#navLinks").classList.remove("open")));
$("#year").textContent=new Date().getFullYear();
