const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// جلب المنتجات من API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    displayProducts(products);
    populateCategoryFilter(products);
    
    // فلترة المنتجات بناءً على البحث والفئة
    searchInput.addEventListener('input', () => filterProducts(products));
    categoryFilter.addEventListener('change', () => filterProducts(products));
  });

// عرض المنتجات
function displayProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.category}</p>
      <p>$${product.price}</p>
    `;
    productsContainer.appendChild(productElement);
  });
}

// تعبئة الفلتر بالفئات المتاحة
function populateCategoryFilter(products) {
  const categories = [...new Set(products.map(product => product.category))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// تطبيق الفلاتر
function filterProducts(products) {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter(product => {
    return (
      (product.title.toLowerCase().includes(searchText)) &&
      (selectedCategory === '' || product.category === selectedCategory)
    );
  });

  displayProducts(filteredProducts);
}
