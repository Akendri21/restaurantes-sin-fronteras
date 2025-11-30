
const STORAGE_KEY = "rsf_data_v2";
const ROLE = { ADMIN: "admin", STAFF: "staff", VIEWER: "viewer" };

const translations = {
  es: {
    brand: "RESTAURANTES SIN FRONTERAS",
    nav_dashboard:"Dashboard", nav_restaurants:"Restaurantes", nav_menus:"Menús", nav_billing:"Facturación", nav_reports:"Reportes", nav_opinions:"Opiniones",
    login:"Login", rights:"Todos los derechos reservados."
  },
  en: {
    brand: "RESTAURANTES WITHOUT BORDERS",
    nav_dashboard:"Dashboard", nav_restaurants:"Restaurants", nav_menus:"Menus", nav_billing:"Billing", nav_reports:"Reports", nav_opinions:"Reviews",
    login:"Login", rights:"All rights reserved."
  }
};

const defaultData = {"chain": {"name": "RESTAURANTES SIN FRONTERAS", "desc": "Cadena global de restaurantes RSF"}, "restaurants": [{"id": "rsf-nyc", "name": "RSF - New York", "country": "Estados Unidos", "city": "New York", "cuisine": "Americana", "currency": "USD", "menu": [{"id": "m-rs-nyc-1", "name": "Hamburguesa Cl\u00e1sica", "desc": "Carne 200g, lechuga, tomate, queso", "price": 12.5, "category": "Principal"}, {"id": "m-rs-nyc-2", "name": "Aros de Cebolla", "desc": "Aros crujientes", "price": 5, "category": "Entrada"}, {"id": "m-rs-nyc-3", "name": "Pizza New York", "desc": "Masa fina, pepperoni", "price": 15, "category": "Principal"}, {"id": "m-rs-nyc-4", "name": "Hot Dog Gourmet", "desc": "Salchicha artesanal", "price": 7.5, "category": "Principal"}, {"id": "m-rs-nyc-5", "name": "Ensalada C\u00e9sar", "desc": "Pollo, crotones", "price": 9, "category": "Ensalada"}, {"id": "m-rs-nyc-6", "name": "Cheesecake", "desc": "Postre cl\u00e1sico", "price": 6, "category": "Postre"}, {"id": "m-rs-nyc-7", "name": "Costillas BBQ", "desc": "Costillas glaseadas", "price": 18, "category": "Principal"}, {"id": "m-rs-nyc-8", "name": "Papas Fritas", "desc": "Porci\u00f3n grande", "price": 4.5, "category": "Acompa\u00f1amiento"}, {"id": "m-rs-nyc-9", "name": "Wings Picantes", "desc": "Alitas con salsa picante", "price": 11, "category": "Entrada"}, {"id": "m-rs-nyc-10", "name": "Tarta de Manzana", "desc": "Con helado", "price": 6.5, "category": "Postre"}]}, {"id": "rsf-tokyo", "name": "RSF - Tokyo", "country": "Jap\u00f3n", "city": "Tokio", "cuisine": "Japonesa", "currency": "JPY", "menu": [{"id": "m-rs-tok-1", "name": "Sushi Mix", "desc": "Variedad de nigiri y maki", "price": 1200, "category": "Principal"}, {"id": "m-rs-tok-2", "name": "Ramen Tonkotsu", "desc": "Caldo cremoso", "price": 900, "category": "Principal"}, {"id": "m-rs-tok-3", "name": "Gyozas", "desc": "Empanadillas japonesas", "price": 450, "category": "Entrada"}, {"id": "m-rs-tok-4", "name": "Tempura de Camar\u00f3n", "desc": "Camarones rebozados", "price": 800, "category": "Principal"}, {"id": "m-rs-tok-5", "name": "Takoyaki", "desc": "Bolas de pulpo", "price": 300, "category": "Entrada"}, {"id": "m-rs-tok-6", "name": "Okonomiyaki", "desc": "Tortilla japonesa", "price": 700, "category": "Principal"}, {"id": "m-rs-tok-7", "name": "Onigiri", "desc": "Bolas de arroz", "price": 200, "category": "Entrada"}, {"id": "m-rs-tok-8", "name": "Matcha Cheesecake", "desc": "Postre de t\u00e9 verde", "price": 550, "category": "Postre"}, {"id": "m-rs-tok-9", "name": "Sashimi Premium", "desc": "Cortes selectos", "price": 1500, "category": "Principal"}, {"id": "m-rs-tok-10", "name": "Helado de T\u00e9", "desc": "Helado artesanal", "price": 300, "category": "Postre"}]}, {"id": "rsf-mex", "name": "RSF - Ciudad de M\u00e9xico", "country": "M\u00e9xico", "city": "CDMX", "cuisine": "Mexicana", "currency": "MXN", "menu": [{"id": "m-rs-mx-1", "name": "Tacos al Pastor", "desc": "Tacos tradicionales", "price": 40, "category": "Principal"}, {"id": "m-rs-mx-2", "name": "Guacamole", "desc": "Con totopos", "price": 70, "category": "Entrada"}, {"id": "m-rs-mx-3", "name": "Enchiladas", "desc": "Salsa roja o verde", "price": 85, "category": "Principal"}, {"id": "m-rs-mx-4", "name": "Chiles en Nogada", "desc": "Plato t\u00edpico", "price": 220, "category": "Principal"}, {"id": "m-rs-mx-5", "name": "Quesadillas", "desc": "Con queso Oaxaca", "price": 55, "category": "Principal"}, {"id": "m-rs-mx-6", "name": "Pozole", "desc": "Sopa tradicional", "price": 95, "category": "Principal"}, {"id": "m-rs-mx-7", "name": "Tamales", "desc": "Variedad de sabores", "price": 30, "category": "Entrada"}, {"id": "m-rs-mx-8", "name": "Agua fresca", "desc": "Sabor del d\u00eda", "price": 25, "category": "Bebida"}, {"id": "m-rs-mx-9", "name": "Churros", "desc": "Con cajeta", "price": 40, "category": "Postre"}, {"id": "m-rs-mx-10", "name": "Mole Poblano", "desc": "Con pollo", "price": 180, "category": "Principal"}]}, {"id": "rsf-paris", "name": "RSF - Paris", "country": "Francia", "city": "Par\u00eds", "cuisine": "Francesa", "currency": "EUR", "menu": [{"id": "m-rs-pr-1", "name": "Croissant", "desc": "Mantequilla tradicional", "price": 2.5, "category": "Desayuno"}, {"id": "m-rs-pr-2", "name": "Coq au Vin", "desc": "Pollo al vino", "price": 18, "category": "Principal"}, {"id": "m-rs-pr-3", "name": "Bouillabaisse", "desc": "Sopa de pescado", "price": 20, "category": "Principal"}, {"id": "m-rs-pr-4", "name": "Ratatouille", "desc": "Vegetariano", "price": 12, "category": "Principal"}, {"id": "m-rs-pr-5", "name": "Quiche Lorraine", "desc": "Tarta salada", "price": 9, "category": "Principal"}, {"id": "m-rs-pr-6", "name": "Escargots", "desc": "Caracoles a la provenzal", "price": 14, "category": "Entrada"}, {"id": "m-rs-pr-7", "name": "Creme Br\u00fbl\u00e9e", "desc": "Postre cl\u00e1sico", "price": 7, "category": "Postre"}, {"id": "m-rs-pr-8", "name": "Boeuf Bourguignon", "desc": "Carne estofada", "price": 19, "category": "Principal"}, {"id": "m-rs-pr-9", "name": "Macarons", "desc": "Variedad de sabores", "price": 6, "category": "Postre"}, {"id": "m-rs-pr-10", "name": "Salade Nicoise", "desc": "Ensalada sofisticada", "price": 11, "category": "Ensalada"}]}, {"id": "rsf-spain", "name": "RSF - Madrid", "country": "Espa\u00f1a", "city": "Madrid", "cuisine": "Espa\u00f1ola", "currency": "EUR", "menu": [{"id": "m-rs-es-1", "name": "Paella", "desc": "Mariscos o mixta", "price": 16, "category": "Principal"}, {"id": "m-rs-es-2", "name": "Tortilla Espa\u00f1ola", "desc": "Patata y huevo", "price": 8, "category": "Principal"}, {"id": "m-rs-es-3", "name": "Pulpo a la Gallega", "desc": "Pulpo con piment\u00f3n", "price": 14, "category": "Principal"}, {"id": "m-rs-es-4", "name": "Croquetas", "desc": "De jam\u00f3n", "price": 6, "category": "Entrada"}, {"id": "m-rs-es-5", "name": "Gazpacho", "desc": "Sopa fr\u00eda", "price": 5, "category": "Entrada"}, {"id": "m-rs-es-6", "name": "Jam\u00f3n Ib\u00e9rico", "desc": "Tabla variada", "price": 22, "category": "Entrada"}, {"id": "m-rs-es-7", "name": "Churros con Chocolate", "desc": "Postre caliente", "price": 5, "category": "Postre"}, {"id": "m-rs-es-8", "name": "Bocadillo de Calamares", "desc": "Cl\u00e1sico madrile\u00f1o", "price": 7, "category": "Principal"}, {"id": "m-rs-es-9", "name": "Patatas Bravas", "desc": "Con alioli", "price": 6, "category": "Acompa\u00f1amiento"}, {"id": "m-rs-es-10", "name": "Sangr\u00eda", "desc": "Jarra para compartir", "price": 12, "category": "Bebida"}]}], "invoices": [], "opinions": []};

function initDataOnce(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// API configuration (server) - will detect if API is available
const API_BASE = window.location.origin;
let USE_API = false; // set to true if API ping success

async function probeApi() {
  try {
    const r = await fetch(API_BASE + '/api/ping');
    if (r.ok) { USE_API = true; return true; }
  } catch (err) { /* ignore */ }
  USE_API = false; return false;
}

let state = initDataOnce();
let prevKPIs = { restaurants:0, sales:0, opinions:0 };

function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

// i18n
function setLang(lang){
  localStorage.setItem('rsf_lang', lang);
  applyLang();
}
function applyLang(){
  const lang = localStorage.getItem('rsf_lang') || 'es';
  const sel = document.getElementById('lang-select'); if(sel) sel.value = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
}

// logo render
function renderLogo(){
  const c = document.getElementById('logo-container');
  if(!c) return;
  c.innerHTML = `
<svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="12" fill="#0f172a"/>
  <text x="50%" y="50%" fill="#ffffff" font-family="Arial, sans-serif" font-weight="700" font-size="34" text-anchor="middle" dominant-baseline="central">RSF</text>
</svg>`;
}

// roles & login (simulated)
function showLogin(){
  const modal = document.getElementById('login-modal');
  if(modal) modal.classList.remove('hidden');
}
function loginAs(role, username){
  // Simulated quick-login for demo/testing
  const user = { username: username || role, role };
  sessionStorage.setItem('rsf_user', JSON.stringify(user));
  // For backward compatibility, set the old rsf_role key as well
  sessionStorage.setItem('rsf_role', role);
  updateUserBadge();
  const modal = document.getElementById('login-modal');
  if(modal) modal.classList.add('hidden');
  applyPermissions();
}
function logout(){
  // Clear both local demo and API tokens
  sessionStorage.removeItem('rsf_user');
  sessionStorage.removeItem('rsf_role');
  localStorage.removeItem('rsf_token');
  updateUserBadge();
  applyPermissions();
  // Ask API to clear cookies if used, then redirect
  (async ()=>{ if(USE_API){ try{ await fetch(API_BASE + '/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch(e){} } document.documentElement.classList.remove('auth-allowed'); window.location.href = 'login.html'; })();
}
function currentUser(){
  // Try API-based user stored in session/localstorage
  const raw = sessionStorage.getItem('rsf_user');
  if (raw && raw !== 'null') return JSON.parse(raw);
  // legacy demo user
  const token = localStorage.getItem('rsf_token');
  // token is not parsed here - we rely on apiGetMe when needed
  const legacy = localStorage.getItem('rsf_user');
  if (legacy && legacy !== 'null') return JSON.parse(legacy);
  return null;
}
function currentRole(){ const u = currentUser(); if(u && u.role) return u.role; return sessionStorage.getItem('rsf_role') || null; }
function updateUserBadge(){
  const badge = document.getElementById('user-badge');
  const btn = document.getElementById('login-btn');
  const user = currentUser();
  if(badge){
    if(user){ badge.classList.remove('hidden'); badge.textContent = `${user.username} (${user.role})`; if(btn){ btn.textContent = 'Salir'; btn.onclick = logout; } }
    else { badge.classList.add('hidden'); if(btn){ btn.textContent = translations[localStorage.getItem('rsf_lang')||'es'].login; btn.onclick = showLogin; } }
  }
}

// API wrappers
async function apiRequest(path, opts = {}){
  if (!USE_API) throw new Error('API not available');
  const headers = opts.headers || {};
  const token = localStorage.getItem('rsf_token');
  if (token) headers['Authorization'] = 'Bearer ' + token;
  opts.headers = headers;
  opts.credentials = 'include';
  const res = await fetch(API_BASE + path, opts);
  if (!res.ok) {
    const err = await res.json().catch(()=>({ error: 'request failed' }));
    const e = new Error(err.error || 'API request failed'); e.status = res.status; e.body = err; throw e;
  }
  return res.json().catch(()=>null);
}

async function apiLogin(username, password){
  const resp = await apiRequest('/api/auth/login', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) });
  if (resp && resp.token) { localStorage.setItem('rsf_token', resp.token); sessionStorage.setItem('rsf_user', JSON.stringify(resp.user)); sessionStorage.setItem('rsf_role', resp.user.role); updateUserBadge(); applyPermissions(); }
  return resp;
}
async function apiRegister(username, password){
  const resp = await apiRequest('/api/auth/register', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) });
  if (resp && resp.token) { localStorage.setItem('rsf_token', resp.token); sessionStorage.setItem('rsf_user', JSON.stringify(resp.user)); sessionStorage.setItem('rsf_role', resp.user.role); updateUserBadge(); applyPermissions(); }
  return resp;
}
async function apiGetMe(){
  try{
    const r = await apiRequest('/api/auth/me');
    if (r && r.username) { sessionStorage.setItem('rsf_user', JSON.stringify(r)); sessionStorage.setItem('rsf_role', r.role); updateUserBadge(); applyPermissions(); }
    return r;
  } catch (err) { return null; }
}

async function requireAuth(){
  // Do not force on login page
  const currentPath = window.location.pathname.split('/').pop();
  if(currentPath === 'login.html' || currentPath === 'login') return;
  if(USE_API){
    // When using API, the auth may be present as an HttpOnly cookie; try to fetch /api/auth/me
    const me = await apiGetMe();
    if(!me){ window.location.href = 'login.html'; return; }
    // OK
  } else {
    // fallback to local demo session
    const user = currentUser();
    if(!user){ window.location.href = 'login.html'; return; }
  }
}

async function requireAdmin(){
  if(USE_API){
    const me = await apiGetMe().catch(()=>null);
    if(!me || me.role !== 'admin'){ window.location.href = 'index.html'; }
  } else {
    if(currentRole() !== 'admin'){ window.location.href = 'index.html'; }
  }
}
function applyPermissions(){
  const role = currentRole();
  // Hide most of the nav items if not logged in
  const isLogged = !!currentUser();
  document.querySelectorAll('.nav a').forEach(a=>{ if(a.getAttribute('data-i18n') === 'login') { a.style.display = isLogged ? 'none' : 'inline-block'; } else { a.style.display = isLogged ? 'inline-block' : 'none'; } });
  // Admin-only elements
  document.querySelectorAll('[data-admin-only]').forEach(el=>el.style.display = (role==='admin')?'inline-block':'none');
  // Elements marked with data-no-delete-for-staff are treated as admin-only (hide for staff/viewers)
  document.querySelectorAll('[data-no-delete-for-staff]').forEach(el=>{ if(role==='admin'){ el.style.display = 'inline-block'; el.disabled = false; } else { el.style.display = 'none'; el.disabled = true; } });
  // Elements that should be read-only for viewers
  document.querySelectorAll('[data-readonly-for-viewer]').forEach(el=>{ if(role==='viewer'){ el.disabled = true; } else { el.disabled = false; } });
}

document.addEventListener('DOMContentLoaded', async ()=>{
  renderLogo(); applyLang(); await probeApi(); if(USE_API){ await apiGetMe().catch(()=>{}); } updateUserBadge(); applyPermissions(); await requireAuth();
  // If we've passed requireAuth, mark the page as allowed
  document.documentElement.classList.add('auth-allowed');
  // Initialize Chart if available
  try{
    const ctx = document.getElementById('salesChart');
    if(ctx && typeof Chart !== 'undefined'){
      window.salesChart = new Chart(ctx.getContext('2d'), {
        type: 'line', data: { labels: [], datasets: [{ label: 'Ventas', data: [], borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.08)', tension: 0.4, fill:true }] }, options: { responsive: true, maintainAspectRatio: false, plugins:{ legend:{ display:false } }, scales: { x:{ display:false }, y:{ display:false } } }
      });
    }
  } catch(e){}
  // Auto refresh basic interval
  setInterval(()=>{ updateDashboard(); }, 60000);
});

/* Mobile menu toggle */
function initMobileMenu(){
  const btn = document.getElementById('menu-btn');
  const nav = document.querySelector('.nav');
  if(!btn || !nav) return;
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'main-nav');
  nav.setAttribute('aria-hidden', 'true');
  btn.addEventListener('click', ()=>{
    const opened = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
    nav.setAttribute('aria-hidden', opened ? 'false' : 'true');
    // lock body scroll when menu is open
    if(opened) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    btn.classList.toggle('open', opened);
  });
  window.addEventListener('resize', ()=>{ if(window.innerWidth > 800) nav.classList.remove('open'); });
  document.addEventListener('click', (e)=>{ if(nav.classList.contains('open') && !e.target.closest('.nav') && !e.target.closest('#menu-btn')){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); document.body.classList.remove('no-scroll'); btn.classList.remove('open'); } });

  // close menu if a nav link is clicked (mobile)
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{ if(window.innerWidth <= 800){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); document.body.classList.remove('no-scroll'); btn.classList.remove('open'); } }));
}

document.addEventListener('DOMContentLoaded', ()=>{ initMobileMenu(); });

/* Helper: display inline messages and field validation state */
function showFormMessage(formId, msg, type){
  const el = document.getElementById(formId + '-msg');
  if(!el) return; el.textContent = msg || '';
  el.style.color = type === 'error' ? '#dc2626' : '#059669';
}
function markFieldInvalid(el){ if(!el) return; el.classList.add('field-invalid'); el.classList.remove('field-valid'); }
function markFieldValid(el){ if(!el) return; el.classList.remove('field-invalid'); el.classList.add('field-valid'); }
function clearFieldState(el){ if(!el) return; el.classList.remove('field-invalid'); el.classList.remove('field-valid'); }

/* Toggle password visibility helper */
function togglePasswordField(btn, fieldId){ const f = document.getElementById(fieldId); if(!f) return; if(f.type === 'password'){ f.type='text'; btn.textContent = 'Ocultar'; } else { f.type='password'; btn.textContent = 'Mostrar'; } }

// Animated counter helper used in dashboard
function animateCounter(id, to, duration = 700){ const el = document.getElementById(id); if(!el) return; const start = parseInt(el.textContent || '0', 10); const diff = to - start; if(diff === 0){ el.textContent = to; return; } const startTime = performance.now(); function step(now){ const t = Math.min(1, (now - startTime)/duration); const cur = Math.floor(start + diff * t); el.textContent = cur; if(t < 1) requestAnimationFrame(step); else el.textContent = to; } requestAnimationFrame(step); }

function formatCurrency(v){ if(typeof v === 'number') return v.toLocaleString(undefined,{style:'currency',currency:'USD'}); return v; }

function computeGrowth(current, previous){ if(previous === 0) return { pct: 100, dir: 'up'}; const diff = current - previous; const pct = Math.round((diff / Math.abs(previous)) * 100); return { pct, dir: pct >= 0 ? 'up' : 'down' }; }

function drawSparkline(canvasId, dataPoints, color){ const c = document.getElementById(canvasId); if(!c || !dataPoints || dataPoints.length === 0) return; const ctx = c.getContext('2d'); const w = c.width; const h = c.height; ctx.clearRect(0,0,w,h); const max = Math.max(...dataPoints); const min = Math.min(...dataPoints); const range = (max - min) || 1; ctx.beginPath(); ctx.lineWidth = 2; ctx.strokeStyle = color || '#06b6d4'; dataPoints.forEach((v,i)=>{ const x = (i / (dataPoints.length-1)) * w; const y = h - ((v - min)/range) * h; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }); ctx.stroke(); }

function generateDemoTrendFromInvoices(invoices, len = 8){ const now = Date.now(); const bucketMs = 1000*60*60*24; const arr = new Array(len).fill(0); invoices.forEach(inv=>{ const d = new Date(inv.date||inv.createdAt||now).getTime(); const bucketIndex = Math.floor(((d - (now - len * bucketMs)) / (bucketMs))); if(bucketIndex >=0 && bucketIndex < len) arr[bucketIndex] += inv.total || 0; }); return arr.map(x=>Math.round(x)); }

function generateDemoTrendFromArray(arr, len=8){ const out = new Array(len).fill(0); for(let i=0;i<Math.min(arr.length,len);i++) out[len-1-i] = i+1; return out; }

async function updateDashboard(){
  // Grab data (API or local)
  let data;
  try{ if(typeof apiRequest === 'function' && (await probeApi())){ data = { restaurants: await apiRequest('/api/restaurants') || [], invoices: await apiRequest('/api/invoices').catch(()=>[]), opinions: await apiRequest('/api/opinions').catch(()=>[]) }; } else data = JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); } catch(err){ data = JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); }
  const restaurants = data.restaurants || [];
  const invoices = data.invoices || [];
  const opinions = data.opinions || [];

  // KPIs
  const totalRestaurants = restaurants.length;
  const totalSales = (invoices||[]).reduce((s,i)=>s + (i.total||0),0);
  const totalOpinions = opinions.length;
  document.getElementById('total-restaurants').textContent = totalRestaurants;
  document.getElementById('total-sales').textContent = formatCurrency(totalSales);
  document.getElementById('total-opinions').textContent = totalOpinions;

  // Recent
  const recentList = document.getElementById('recent-restaurants'); if(recentList){ recentList.innerHTML=''; restaurants.slice(-5).reverse().forEach(r=>{ const li = document.createElement('li'); li.textContent = `${r.name} — ${r.city} (${r.country})`; recentList.appendChild(li); }); }

  // Sales by country
  const byCountry = {}; (invoices||[]).forEach(inv=>{ const c = inv.country || inv.restaurantCountry || 'N/A'; byCountry[c] = (byCountry[c]||0) + (inv.total||0); });
  const tbody = document.querySelector('#sales-by-country tbody'); if(tbody){ tbody.innerHTML=''; Object.entries(byCountry).sort((a,b)=>b[1]-a[1]).slice(0,5).forEach(([country,sum])=>{ const tr = document.createElement('tr'); tr.innerHTML = `<td>${country}</td><td style="text-align:right">${formatCurrency(sum)}</td>`; tbody.appendChild(tr); }); }

  // Avg rating
  const avg = opinions.length ? (opinions.reduce((s,o)=>s + (o.rating||0),0) / opinions.length).toFixed(2) : '—'; const ar = document.getElementById('avg-rating'); if(ar){ ar.textContent = avg; }
  const rs = document.getElementById('rating-stats'); if(rs){ rs.textContent = opinions.length ? `${opinions.length} reseñas` : 'Sin reseñas'; }

  // Sparks
  drawSparkline('spark-sales', generateDemoTrendFromInvoices(invoices,8), '#06b6d4');
  drawSparkline('spark-restaurants', generateDemoTrendFromArray(restaurants,8), '#0ea5a4');
  drawSparkline('spark-opinions', generateDemoTrendFromArray(opinions,8), '#f97316');

  // Growth (demo): compare last half vs first half
  const sTrend = generateDemoTrendFromInvoices(invoices,8); const half = Math.floor(sTrend.length/2); const prev = sTrend.slice(0,half).reduce((s,x)=>s+x,0); const cur = sTrend.slice(half).reduce((s,x)=>s+x,0); const g = computeGrowth(cur,prev);
  const salesGrowth = document.getElementById('sales-growth'); if(salesGrowth){ salesGrowth.textContent = `${g.pct}% ${g.dir === 'up' ? '↑' : '↓'}`; salesGrowth.className = 'kpi-growth ' + (g.dir === 'up' ? 'g-up' : 'g-down'); }
  const rGrowth = computeGrowth(totalRestaurants, Math.max(totalRestaurants-1,0)); const rg = document.getElementById('rest-growth'); if(rg){ rg.textContent = `${rGrowth.pct}% ${rGrowth.dir === 'up' ? '↑' : '↓'}`; rg.className = 'kpi-growth ' + (rGrowth.dir === 'up' ? 'g-up' : 'g-down'); }
  const oGrowth = computeGrowth(totalOpinions, Math.max(totalOpinions-1,0)); const og = document.getElementById('opinions-growth'); if(og){ og.textContent = `${oGrowth.pct}% ${oGrowth.dir === 'up' ? '↑' : '↓'}`; og.className = 'kpi-growth ' + (oGrowth.dir === 'up' ? 'g-up' : 'g-down'); }

  const lu = document.getElementById('last-updated'); if(lu) lu.textContent = new Date().toLocaleString();
  // Update main Chart.js salesChart if present
  try {
    if(window.salesChart && window.salesChart.data){
      const labels = sTrend.map((_,i)=>i+1);
      window.salesChart.data.labels = labels;
      window.salesChart.data.datasets[0].data = sTrend;
      window.salesChart.update();
    }
  } catch(e){}

  // Show small toast if major KPIs increased
  try{
    const thresholds = [ { key:'restaurants', val: totalRestaurants }, { key:'sales', val: totalSales }, { key:'opinions', val: totalOpinions } ];
    const increased = thresholds.find(t=> t.val > (prevKPIs[t.key] || 0));
    if(increased){ showToast(`Actualización: ${increased.key} aumentó a ${increased.val}`); }
    prevKPIs = { restaurants: totalRestaurants, sales: totalSales, opinions: totalOpinions };
  } catch(e){}
}

function showToast(msg, timeout=3000){ const t = document.createElement('div'); t.className='rsf-toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(()=>{ t.classList.add('show'); }, 10); setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),320); }, timeout); }

function applyFilters(){
  const s = document.getElementById('filter-start').value; const e = document.getElementById('filter-end').value;
  localStorage.setItem('rsf_filter_start', s || ''); localStorage.setItem('rsf_filter_end', e || '');
  updateDashboard();
}

function exportSalesCSV(){
  // Create CSV from sales-by-country table
  const rows = [];
  rows.push(['País','Ventas']);
  document.querySelectorAll('#sales-by-country tbody tr').forEach(tr=>{ const tds = tr.querySelectorAll('td'); rows.push([tds[0].textContent.trim(), tds[1].textContent.trim()]); });
  const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `ventas_por_pais_${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 1000);
}

// Save chain information (local or API if available)
async function saveChain(){
  const name = document.getElementById('chain-name').value;
  const desc = document.getElementById('chain-desc').value;
  if(typeof apiRequest === 'function' && USE_API){
    // Optionally, server endpoint could persist chain; fallback to localStorage
    try{ /* No /api/chain endpoint by default */ } catch(e){}
  }
  // Save locally
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); data.chain = { name, desc }; localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  const msgEl = document.getElementById('chain-saved'); if(msgEl){ msgEl.textContent = 'Guardado'; setTimeout(()=>msgEl.textContent='';, 2500); }
  updateDashboard();
}

/* --- users (local demo auth) --- */
function getUsers(){ return JSON.parse(localStorage.getItem('rsf_users_v1')||'[]'); }
function saveUsers(u){ localStorage.setItem('rsf_users_v1', JSON.stringify(u)); }
function ensureDefaultUsers(){ const u = getUsers(); if(!u || u.length === 0) saveUsers([
    {username:'DUEÑO',password:'DUEÑO123',role:'admin'},
    {username:'EMPLEADO1',password:'EMPLEADO1',role:'staff'},
    {username:'EMPLEADO2',password:'EMPLEADO2',role:'staff'},
    {username:'user',password:'user',role:'viewer'}
  ]); }
function registerUser(username,password,role){ if(!username||!password) return {ok:false,msg:'Missing fields'}; const users = getUsers(); if(users.find(x=>x.username.toLowerCase()===username.toLowerCase())) return {ok:false,msg:'Usuario ya existe'}; // registration only creates viewers to prevent elevation
  users.push({username,password,role: 'viewer'}); saveUsers(users); return {ok:true,msg:'Usuario registrado (rol: viewer)'}; }

// Admin functions to manage users
function promoteUser(username, role){ if(currentRole() !== 'admin') return {ok:false,msg:'Solo admin puede cambiar roles'}; const users = getUsers(); const u = users.find(x=>x.username.toLowerCase()===username.toLowerCase()); if(!u) return {ok:false,msg:'Usuario no encontrado'}; u.role = role; saveUsers(users); return {ok:true,msg:'Rol actualizado'}; }
function deleteUser(username){ if(currentRole() !== 'admin') return {ok:false,msg:'Solo admin puede eliminar usuarios'}; let users = getUsers(); users = users.filter(x=>x.username.toLowerCase()!==username.toLowerCase()); saveUsers(users); return {ok:true,msg:'Usuario eliminado'}; }
function createUserByAdmin(username,password,role){ if(currentRole() !== 'admin') return {ok:false,msg:'Solo admin puede crear usuarios con rol'}; const users = getUsers(); if(users.find(x=>x.username.toLowerCase()===username.toLowerCase())) return {ok:false,msg:'Usuario ya existe'}; users.push({username,password,role}); saveUsers(users); return {ok:true,msg:'Usuario creado'}; }
function loginUser(username,password){ const users = getUsers(); const u = users.find(x=>x.username.toLowerCase()===username.toLowerCase() && x.password===password); if(!u) return {ok:false,msg:'Credenciales inválidas'}; sessionStorage.setItem('rsf_user', JSON.stringify({username:u.username,role:u.role})); sessionStorage.setItem('rsf_role', u.role); updateUserBadge(); applyPermissions(); return {ok:true,msg:'Login ok', user:u}; }

function quickLogin(role){
  const passwordMap = { 'DUEÑO': 'DUEÑO123', 'EMPLEADO1': 'EMPLEADO1', 'EMPLEADO2': 'EMPLEADO2', 'user': 'user' };
  const pass = passwordMap[role] || role;
  (async ()=>{
    if(USE_API) {
      try{ const r = await apiLogin(role, pass); if(r && r.user) window.location.href = 'index.html'; else alert('Error: '+(r.error||'No hay respuesta')); } catch(err){ alert('Error: ' + (err.message || err)); }
    } else {
      const resp = loginUser(role, pass);
      if(resp.ok){ window.location.href = 'index.html'; } else alert(resp.msg);
    }
  })();
}

// initialize sample users
ensureDefaultUsers();
