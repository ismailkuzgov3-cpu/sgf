let currentCategory = 'Все';
let searchQuery = '';

function renderNav() {
  const nav = document.getElementById('navLinks');
  const user = currentUser();
  const cart = JSON.parse(localStorage.getItem('cc_cart_' + (user?.username || 'guest')) || '[]');
  const count = cart.reduce((s,i) => s + i.qty, 0);

  if (user) {
    nav.innerHTML = `
      <span style="font-size:14px;">👤 ${user.name}</span>
      ${user.role === 'admin' ? '<a href="admin.html" style="background:var(--accent)">Админ-панель</a>' : ''}
      <a href="cart.html" class="cart-btn">🛒 Корзина <span class="badge">${count}</span></a>
      <a onclick="logout()" style="cursor:pointer">Выйти</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="cart.html" class="cart-btn">🛒 Корзина <span class="badge">${count}</span></a>
      <a href="login.html">Войти</a>
    `;
  }
}

function renderCategories() {
  const cats = ['Все', ...new Set(getProducts().map(p => p.category))];
  document.getElementById('categories').innerHTML = cats.map(c =>
    `<div class="cat-chip ${c === currentCategory ? 'active' : ''}" onclick="setCategory('${c}')">${c}</div>`
  ).join('');
}

function setCategory(c) {
  currentCategory = c;
  renderCategories();
  renderProducts();
}

function doSearch() {
  searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
  renderProducts();
}

document.getElementById('searchInput')?.addEventListener('input', doSearch);

function renderProducts() {
  let list = getProducts();
  if (currentCategory !== 'Все') list = list.filter(p => p.category === currentCategory);
  if (searchQuery) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      (p.desc || '').toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }

  const grid = document.getElementById('productsGrid');
  if (!list.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;">Товары не найдены</div>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="card">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x180?text=Товар'">
      <div class="card-body">
        <div class="card-cat">${p.category}</div>
        <div class="card-title">${p.name}</div>
        <div style="font-size:12px;color:#888;">${p.desc || ''}</div>
        <div class="card-price">
          ${p.price.toLocaleString('ru')} ₽
          ${p.oldPrice ? `<small>${p.oldPrice.toLocaleString('ru')} ₽</small>` : ''}
        </div>
        <button onclick="addToCart(${p.id})">В корзину</button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const user = currentUser();
  if (!user) {
    if (confirm('Чтобы добавить в корзину, войдите. Перейти на страницу входа?')) {
      location.href = 'login.html';
    }
    return;
  }
  const key = 'cc_cart_' + user.username;
  let cart = JSON.parse(localStorage.getItem(key) || '[]');
  const item = cart.find(i => i.id === id);
  const prod = getProducts().find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ id, name: prod.name, price: prod.price, img: prod.img, qty:1 });
  localStorage.setItem(key, JSON.stringify(cart));
  renderNav();
  // Мини-уведомление
  const t = document.createElement('div');
  t.innerText = '✅ Добавлено в корзину';
  t.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#25D366;color:white;padding:14px 22px;border-radius:10px;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.2);';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}

function calcBoiler() {
  const area = parseFloat(document.getElementById('areaInput').value);
  if (!area || area <= 0) {
    document.getElementById('calcResult').innerText = 'Введите корректную площадь';
    return;
  }
  // 1 кВт на 10 м² + запас 20%
  const power = (area / 10 * 1.2).toFixed(1);
  document.getElementById('calcResult').innerText =
    `Рекомендуемая мощность котла: ${power} кВт (с запасом 20%)`;
}

renderNav();
renderCategories();
renderProducts();