let products = []; // will hold all products
let filteredProducts = []; // for filter/search view
// 1️⃣ Load data using Fetch API
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    filteredProducts = [...products];
    populateCategoryDropdown();
    renderTable(filteredProducts, 'fetchTable');
  });

// 2️⃣ Load data again using jQuery $.getJSON (for 2nd table)
$.getJSON('products.json', function(data) {
  renderTable(data, 'ajaxTable');
});

// 3️⃣ Render table
function renderTable(data, tableId) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  tbody.innerHTML = "";

  data.forEach(p => {
    const tr = document.createElement('tr');
    if (p.stock < 5) tr.classList.add('low-stock');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${p.price}</td>
      <td>${p.stock}</td>
    `;
    tbody.appendChild(tr);
  });

  console.log(`✅ ${tableId}: ${data.length} items displayed`);
}

// 4️⃣ Populate category dropdown
function populateCategoryDropdown() {
  const categories = [...new Set(products.map(p => p.category))];
  const dropdown = document.getElementById('categoryFilter');
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    dropdown.appendChild(opt);
  });
}

// 5️⃣ Filter by category
document.getElementById('categoryFilter').addEventListener('change', () => {
  applyFilters();
});

// 6️⃣ Search by name
document.getElementById('searchInput').addEventListener('keyup', () => {
  applyFilters();
});

// 7️⃣ Combined filter function
function applyFilters() {
  const selectedCategory = document.getElementById('categoryFilter').value.toLowerCase();
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();

  filteredProducts = products.filter(p => {
    const categoryMatch = (selectedCategory === 'all') || (p.category.toLowerCase() === selectedCategory);
    const searchMatch = p.name.toLowerCase().includes(searchTerm);
    return categoryMatch && searchMatch;
  });

  renderTable(filteredProducts, 'fetchTable');
}
