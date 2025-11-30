const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Low, JSONFile } = require('lowdb');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

// DB setup
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB() {
  await db.read();
  db.data ||= { users: [], data: { restaurants: [], menus: [], invoices: [], opinions: [] } };

  // seed default users if not present
  const seedUsers = [
    { id: 'owner', username: 'DUEÑO', password: 'DUEÑO123', role: 'admin' },
    { id: 'employee1', username: 'EMPLEADO1', password: 'EMPLEADO1', role: 'staff' },
    { id: 'employee2', username: 'EMPLEADO2', password: 'EMPLEADO2', role: 'staff' },
    { id: 'viewer1', username: 'user', password: 'user', role: 'viewer' }
  ];

  for (const su of seedUsers) {
    const exists = db.data.users.find(u => u.username === su.username);
    if (!exists) {
      const salt = bcrypt.genSaltSync(10);
      db.data.users.push({ id: nanoid(8), username: su.username, password: bcrypt.hashSync(su.password, salt), role: su.role });
    }
  }

  await db.write();
}

// Middleware
// Allow credentials so the browser can receive HttpOnly cookies
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to protect static assets and redirect to login if unauthenticated
app.use((req, res, next) => {
  try {
    // Public paths: API endpoints and login page resources + assets
    if (req.path.startsWith('/api') || req.path.startsWith('/assets') || req.path === '/login.html' || req.path === '/favicon.ico' || req.path.startsWith('/assets/') || req.path.startsWith('/.well-known')) {
      return next();
    }
    // Check cookie or Authorization header
    const authHeader = req.headers.authorization;
    const headerToken = authHeader && authHeader.split(' ')[1];
    const cookieToken = req.cookies && req.cookies['rsf_token'];
    if (!headerToken && !cookieToken) {
      return res.redirect('/login.html');
    }
    // Validate token
    const token = headerToken || cookieToken;
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.redirect('/login.html');
  }
});

app.use(express.static(path.join(__dirname, '..'))); // serve project root (after guard)

// Auth helpers
function createToken(user) {
  const payload = { id: user.id, username: user.username, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

async function getUserFromToken(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    await db.read();
    const user = db.data.users.find(u => u.id === payload.id);
    return user ? { id: user.id, username: user.username, role: user.role } : null;
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization;
    const headerToken = auth && auth.split(' ')[1];
    const cookieToken = req.cookies && req.cookies['rsf_token'];
    const token = headerToken || cookieToken;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    const allowed = role === 'staff' ? ['staff', 'admin'] : (role === 'viewer' ? ['viewer', 'staff', 'admin'] : ['admin']);
    if (!allowed.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

// Routes
app.post('/api/auth/login', async (req, res) => {
  await db.read();
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

  const user = db.data.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = createToken(user);
  // set HttpOnly cookie so static files and server middleware can accept auth
  res.cookie('rsf_token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

app.post('/api/auth/register', async (req, res) => {
  await db.read();
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
  if (db.data.users.some(u => u.username === username)) return res.status(400).json({ error: 'User exists' });

  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  const newUser = { id: nanoid(8), username, password: hashed, role: 'viewer' };
  db.data.users.push(newUser);
  await db.write();

  const token = createToken(newUser);
  res.cookie('rsf_token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ token, user: { id: newUser.id, username: newUser.username, role: newUser.role } });
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  await db.read();
  const user = db.data.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, username: user.username, role: user.role });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  res.clearCookie('rsf_token');
  res.json({ ok: true });
});

// Admin users management
app.get('/api/users', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  const users = db.data.users.map(u => ({ id: u.id, username: u.username, role: u.role }));
  res.json(users);
});

app.patch('/api/users/:id', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  const id = req.params.id;
  const user = db.data.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { role } = req.body;
  if (role && ['admin', 'staff', 'viewer'].includes(role)) {
    user.role = role;
    await db.write();
    return res.json({ id: user.id, username: user.username, role: user.role });
  }
  return res.status(400).json({ error: 'Invalid role' });
});

app.delete('/api/users/:id', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  const id = req.params.id;
  const idx = db.data.users.findIndex(u => u.id === id);
  if (idx < 0) return res.status(404).json({ error: 'User not found' });
  db.data.users.splice(idx, 1);
  await db.write();
  res.json({ ok: true });
});

app.post('/api/users', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
  if (db.data.users.some(u => u.username === username)) return res.status(400).json({ error: 'User exists' });
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  const newUser = { id: nanoid(8), username, password: hashed, role: role || 'viewer' };
  db.data.users.push(newUser);
  await db.write();
  res.json({ id: newUser.id, username: newUser.username, role: newUser.role });
});

// Data endpoints - restaurants as example; others similar
app.get('/api/restaurants', requireAuth, async (req, res) => {
  await db.read();
  res.json(db.data.data.restaurants || []);
});

app.post('/api/restaurants', requireAuth, requireRole('staff'), async (req, res) => {
  await db.read();
  const data = req.body;
  const newItem = { id: nanoid(8), ...data, createdBy: req.user.id, createdAt: Date.now() };
  db.data.data.restaurants.push(newItem);
  await db.write();
  res.json(newItem);
});

app.put('/api/restaurants/:id', requireAuth, requireRole('staff'), async (req, res) => {
  await db.read();
  const id = req.params.id;
  const item = db.data.data.restaurants.find(r => r.id === id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  Object.assign(item, req.body);
  await db.write();
  res.json(item);
});

app.delete('/api/restaurants/:id', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  const id = req.params.id;
  const idx = db.data.data.restaurants.findIndex(r => r.id === id);
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  db.data.data.restaurants.splice(idx, 1);
  await db.write();
  res.json({ ok: true });
});

// Add endpoints for menus, invoices, opinions with similar permission scheme (omitted here for brevity)
// Minimal endpoints for testing

app.get('/api/ping', (req, res) => res.json({ ok: true }));

// Opinions endpoints
app.get('/api/opinions', requireAuth, async (req, res) => { await db.read(); res.json(db.data.data.opinions || []); });
app.post('/api/opinions', requireAuth, requireRole('staff'), async (req, res) => { await db.read(); const obj = { id: nanoid(8), ...req.body, createdBy: req.user.id, createdAt: Date.now() }; db.data.data.opinions.push(obj); await db.write(); res.json(obj); });
app.put('/api/opinions/:id', requireAuth, requireRole('staff'), async (req, res) => { await db.read(); const id = req.params.id; const o = db.data.data.opinions.find(x => x.id === id); if (!o) return res.status(404).json({ error: 'Not found' }); Object.assign(o, req.body); await db.write(); res.json(o); });
app.delete('/api/opinions/:id', requireAuth, requireRole('admin'), async (req, res) => { await db.read(); const id = req.params.id; const idx = db.data.data.opinions.findIndex(x => x.id === id); if (idx < 0) return res.status(404).json({ error: 'Not found' }); db.data.data.opinions.splice(idx, 1); await db.write(); res.json({ ok: true }); });

// Start server
initDB().then(() => {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
});
