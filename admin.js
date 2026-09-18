if (!requireAdmin()) throw new Error('Access denied');

function renderStats() {
  const list = getProducts();
  const cats = new Set(list.map(p => p.category));
  document.getElementById('stats').innerHTML =
    `${list.length} товаров • ${cats.size} категорий`;
}

function renderAdminTable() {
  const q = document.getElementById('searchAdmin').value.toLowerCase();
  const cat = document.getElementById('catFilter').value;
  let list = getProducts();
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
  if (cat) list = list.filter(p => p.category === cat);

  document.getElementById('adminTable').innerHTML = list.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><img src="${p.img}" onerror="this.src='https://via.placeholder.com/50'"></td>
      <td><b>${p.name}</b><br><small style="color:#888">${p.desc||''}</small></td>
      <td>${p.category}</td>
      <td style="color:var(--primary);font-weight:700;">${p.price.toLocaleString('ru')} ₽</td>
      <td>${p.oldPrice ? p.oldPrice.toLocaleString('ru')+' ₽' : '—'}</td>
      <td>
        <button class="btn-edit" onclick="editProduct(${p.id})">✏️</button>
        <button class="btn-del" onclick="delProduct(${p.id})">🗑</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="7" class="empty">Нет товаров</td></tr>';
}

function renderCatFilter() {
  const cats = [...new Set(getProducts().map(p => p.category))];
  const sel = document.getElementById('catFilter');
  sel.innerHTML = '<option value="">Все категории</option>' +
    cats.map(c => `<option>${c}</option>`).join('');
  document.getElementById('catList').innerHTML = cats.map(c => `<option value="${c}">`).join('');
}

function openModal(id = null) {
  document.getElementById('modal').classList.add('active');
  if (id) {
    const p = getProducts().find(x => x.id === id);
    document.getElementById('modalTitle').innerText = 'Редактировать товар';
    document.getElementById('m_id').value = p.id;
    document.getElementById('m_name').value = p.name;
    document.getElementById('m_category').value = p.category;
    document.getElementById('m_price').value = p.price;
    document.getElementById('m_oldPrice').value = p.oldPrice || 0;
    document.getElementById('m_img').value = p.img;
    document.getElementById('m_desc').value = p.desc || '';
  } else {
    document.getElementById('modalTitle').innerText = 'Добавить товар';
    ['m_id','m_name','m_category','m_price','m_oldPrice','m_img','m_desc'].forEach(i =>
      document.getElementById(i).value = '');
  }
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

function editProduct(id) { openModal(id); }

function delProduct(id) {
  if (!confirm('Удалить товар?')) return;
  saveProducts(getProducts().filter(p => p.id !== id));
  renderAdminTable(); renderStats(); renderCatFilter();
}

function saveProduct() {
  const id = document.getElementById('m_id').value;
  const name = document.getElementById('m_name').value.trim();
  const category = document.getElementById('m_category').value.trim();
  const price = parseFloat(document.getElementById('m_price').value);
  const oldPrice = parseFloat(document.getElementById('m_oldPrice').value) || 0;
  const img = document.getElementById('m_img').value.trim();
  const desc = document.getElementById('m_desc').value.trim();

  if (!name || !category || !price) {
    alert('Заполните название, категорию и цену');
    return;
  }

  let list = getProducts();
  if (id) {
    const idx = list.findIndex(p => p.id == id);
    list[idx] = { ...list[idx], name, category, price, oldPrice, img, desc };
  } else {
    const newId = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
    list.push({ id:newId, name, category, price, oldPrice, img: img || 'https://via.placeholder.com/400x180?text=Товар', desc });
  }
  saveProducts(list);
  closeModal();
  renderAdminTable(); renderStats(); renderCatFilter();
}

renderStats();
renderCatFilter();
renderAdminTable();