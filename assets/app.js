
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

let state = initDataOnce();

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
  sessionStorage.removeItem('rsf_user');
  sessionStorage.removeItem('rsf_role');
  updateUserBadge();
  applyPermissions();
}
function currentUser(){ const raw = sessionStorage.getItem('rsf_user'); return raw && raw !== 'null' ? JSON.parse(raw) : null; }
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
function applyPermissions(){
  const role = currentRole();
  document.querySelectorAll('[data-admin-only]').forEach(el=>el.style.display = (role==='admin')?'inline-block':'none');
  document.querySelectorAll('[data-no-delete-for-staff]').forEach(el=>{ if(role==='staff') el.disabled = true; else el.disabled = false; });
  document.querySelectorAll('[data-readonly-for-viewer]').forEach(el=>{ if(role==='viewer') el.disabled = true; else el.disabled = false; });
}

document.addEventListener('DOMContentLoaded', ()=>{ renderLogo(); applyLang(); updateUserBadge(); applyPermissions(); });

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

/* --- users (local demo auth) --- */
function getUsers(){ return JSON.parse(localStorage.getItem('rsf_users_v1')||'[]'); }
function saveUsers(u){ localStorage.setItem('rsf_users_v1', JSON.stringify(u)); }
function ensureDefaultUsers(){ const u = getUsers(); if(!u || u.length === 0) saveUsers([{username:'admin',password:'admin',role:'admin'},{username:'staff',password:'staff',role:'staff'},{username:'user',password:'user',role:'viewer'}]); }
function registerUser(username,password,role){ if(!username||!password) return {ok:false,msg:'Missing fields'}; const users = getUsers(); if(users.find(x=>x.username.toLowerCase()===username.toLowerCase())) return {ok:false,msg:'Usuario ya existe'}; users.push({username,password,role}); saveUsers(users); return {ok:true,msg:'Usuario registrado'}; }
function loginUser(username,password){ const users = getUsers(); const u = users.find(x=>x.username.toLowerCase()===username.toLowerCase() && x.password===password); if(!u) return {ok:false,msg:'Credenciales inválidas'}; sessionStorage.setItem('rsf_user', JSON.stringify({username:u.username,role:u.role})); sessionStorage.setItem('rsf_role', u.role); updateUserBadge(); applyPermissions(); return {ok:true,msg:'Login ok', user:u}; }

function quickLogin(role){
  // Demo quick login uses username == role and password == role
  const resp = loginUser(role, role);
  if(resp.ok){ window.location.href = 'index.html'; }
  else alert(resp.msg);
}

// initialize sample users
ensureDefaultUsers();
