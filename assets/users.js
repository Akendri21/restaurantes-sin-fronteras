async function renderUsers(){
  const tbody = document.getElementById('users-tbody');
  tbody.innerHTML = '';
  if(typeof apiRequest === 'function' && (await probeApi())){
    try{
      const users = await apiRequest('/api/users');
      users.forEach(u=>{
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', u.id);
        tr.innerHTML = `<td>${u.username}</td><td>${u.role}</td><td><button onclick="updateRole('${u.id}','staff')" data-admin-only>Promover a Staff</button> <button onclick="updateRole('${u.id}','admin')" data-admin-only>Promover a Admin</button> <button onclick="updateRole('${u.id}','viewer')" data-admin-only>Revertir a Usuario</button> <button onclick="removeUser('${u.id}')" data-admin-only>Eliminar</button></td>`;
        tbody.appendChild(tr);
      });
    } catch(err){ console.error('No se pudo cargar usuarios (API):', err); }
  } else {
    const users = getUsers();
    users.forEach(u=>{ const tr = document.createElement('tr'); tr.innerHTML = `<td>${u.username}</td><td>${u.role}</td><td><button onclick="updateRole('${u.username}','staff')" data-admin-only>Promover a Staff</button> <button onclick="updateRole('${u.username}','admin')" data-admin-only>Promover a Admin</button> <button onclick="updateRole('${u.username}','viewer')" data-admin-only>Revertir a Usuario</button> <button onclick="removeUser('${u.username}')" data-admin-only>Eliminar</button></td>`; tbody.appendChild(tr); });
  }
  applyPermissions();
}

async function updateRole(idOrUsername, role){
  if(typeof apiRequest === 'function' && (await probeApi())){
    try{ await apiRequest('/api/users/' + idOrUsername, { method: 'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ role }) }); renderUsers(); }
    catch(err){ alert('Error: '+(err.message||err)); }
  } else { const resp = promoteUser(idOrUsername,role); if(!resp.ok) return alert(resp.msg); renderUsers(); }
}

async function removeUser(idOrUsername){ if(!confirm('Eliminar usuario?')) return; if(typeof apiRequest === 'function' && (await probeApi())){ try{ await apiRequest('/api/users/' + idOrUsername, { method: 'DELETE' }); renderUsers(); } catch(err){ alert('Error: '+(err.message||err)); } } else { const resp = deleteUser(idOrUsername); if(!resp.ok) return alert(resp.msg); renderUsers(); } }

async function adminCreateUser(){ const u=document.getElementById('adm-username').value.trim(); const p=document.getElementById('adm-password').value; const role = document.getElementById('adm-role').value; if(!u||!p){ return alert('Usuario y contraseña son requeridos'); } if(typeof apiRequest === 'function' && (await probeApi())){ try{ await apiRequest('/api/users', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ username: u, password: p, role }) }); document.getElementById('adm-username').value=''; document.getElementById('adm-password').value=''; renderUsers(); } catch(err){ alert('Error: '+(err.message||err)); } } else { const resp = createUserByAdmin(u,p,role); if(!resp.ok) return alert(resp.msg); document.getElementById('adm-username').value=''; document.getElementById('adm-password').value=''; renderUsers(); } }


// Initialize page and guard
(async ()=>{
  await requireAuth();
  await requireAdmin();
  renderUsers();
  applyPermissions();
  applyLang();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
