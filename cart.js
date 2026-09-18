const WHATSAPP_NUMBER = '79626408866'; // без +

function cartKey() {
  const u = currentUser();
  return 'cc_cart_' + (u ? u.username : 'guest');
}

function getCart() {
  return JSON.parse(localStorage.getItem(cartKey()) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(cartKey(), JSON.stringify(cart));
  renderNav();
  renderCart();
}

function renderNav() {
  const nav = document.getElementById('navLinks');
  const user = currentUser();
  const count = getCart().reduce((s,i) => s + i.qty, 0);
  if (user) {
    nav.innerHTML = `
      <span style="font-size:14px;">👤 ${user.name}</span>
      ${user.role === 'admin' ? '<a href="admin.html" style="background:var(--accent)">Админ-панель</a>' : ''}
      <a href="index.html">Каталог</a>
      <a href="cart.html" class="cart-btn">🛒 Корзина <span class="badge">${count}</span></a>
      <a onclick="logout()" style="cursor:pointer">Выйти</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="index.html">Каталог</a>
      <a href="cart.html" class="cart-btn">🛒 Корзина <span class="badge">${count}</span></a>
      <a href="login.html">Войти</a>
    `;
  }
}

function renderCart() {
  const cart = getCart();
  const wrap = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');

  if (!cart.length) {
    wrap.innerHTML = '<div class="empty">Корзина пуста 🛒<br><br><a href="index.html" style="color:var(--primary);font-weight:600;">Перейти в каталог</a></div>';
    summary.style.display = 'none';
    return;
  }

  wrap.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.img}" onerror="this.src='https://via.placeholder.com/80'">
      <div class="cart-item-info">
        <div style="font-weight:600;">${i.name}</div>
        <div style="color:var(--primary);font-weight:700;margin-top:4px;">${i.price.toLocaleString('ru')} ₽</div>
      </div>
      <div class="qty">
        <button onclick="changeQty(${i.id}, -1)">−</button>
        <span style="min-width:30px;text-align:center;font-weight:600;">${i.qty}</span>
        <button onclick="changeQty(${i.id}, 1)">+</button>
      </div>
      <button class="remove" onclick="removeItem(${i.id})">Удалить</button>
    </div>
  `).join('');

  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').innerText = total.toLocaleString('ru') + ' ₽';
  summary.style.display = 'block';
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeItem(id);
  saveCart(cart);
}

function removeItem(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function sendToWhatsApp() {
  const user = currentUser();
  const cart = getCart();
  if (!cart.length) return;

  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);

  let msg = `🔥 *НОВЫЙ ЗАКАЗ — Климат Комфорт* 🔥\n\n`;
  msg += `👤 *Клиент:* ${user ? user.name : 'Гость'}\n`;
  if (user) msg += `🆔 *Логин:* ${user.username}\n`;
  msg += `📅 *Дата:* ${new Date().toLocaleString('ru')}\n`;
  msg += `\n━━━━━━━━━━━━━━━━━━\n`;
  msg += `📦 *СОСТАВ ЗАКАЗА:*\n\n`;

  cart.forEach((i, idx) => {
    msg += `${idx+1}. *${i.name}*\n`;
    msg += `   ${i.qty} шт. × ${i.price.toLocaleString('ru')} ₽ = *${(i.price*i.qty).toLocaleString('ru')} ₽*\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *ИТОГО: ${total.toLocaleString('ru')} ₽*\n\n`;
  msg += `Пожалуйста, свяжитесь со мной для оформления заказа ✅`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

renderNav();
renderCart();