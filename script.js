// Product Data with Male and Female Dresses
const products = [
  // Premium Woolen
  {
    id: 1,
    name: "Premium Woolen Suit Set",
    category: "premium-woolen",
    price: 2999,
    image: "https://images.unsplash.com/photo-1594938291221-94f313b0e3e3?w=400&h=500&fit=crop",
    description: "Elegant woolen suit for special occasions"
  },
  {
    id: 2,
    name: "Woolen Winter Coat",
    category: "premium-woolen",
    price: 2499,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    description: "Warm and stylish winter coat"
  },
  
  // Velvet
  {
    id: 3,
    name: "Velvet Evening Dress",
    category: "velvet",
    price: 3499,
    image: "https://images.unsplash.com/photo-1566479179817-4d3b0b85bf98?w=400&h=500&fit=crop",
    description: "Luxurious velvet dress for evening events"
  },
  {
    id: 4,
    name: "Velvet Blazer",
    category: "velvet",
    price: 2799,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
    description: "Elegant velvet blazer"
  },
  
  // Russian Crape
  {
    id: 5,
    name: "Russian Crape Saree",
    category: "russian-crape",
    price: 1999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    description: "Beautiful Russian crape saree with intricate work"
  },
  {
    id: 6,
    name: "Russian Crape Lehenga",
    category: "russian-crape",
    price: 4499,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
    description: "Traditional lehenga in Russian crape"
  },
  
  // Paper Silk
  {
    id: 7,
    name: "Paper Silk Saree",
    category: "paper-silk",
    price: 1799,
    image: "https://images.unsplash.com/photo-1566479179817-4d3b0b85bf98?w=400&h=500&fit=crop",
    description: "Light and elegant paper silk saree"
  },
  {
    id: 8,
    name: "Paper Silk Dress",
    category: "paper-silk",
    price: 1599,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    description: "Comfortable paper silk dress"
  },
  
  // Banarasi Silk
  {
    id: 9,
    name: "Banarasi Silk Saree",
    category: "banarasi-silk",
    price: 5999,
    image: "https://images.unsplash.com/photo-1566479179817-4d3b0b85bf98?w=400&h=500&fit=crop",
    description: "Authentic Banarasi silk saree with zari work"
  },
  {
    id: 10,
    name: "Banarasi Lehenga Set",
    category: "banarasi-silk",
    price: 8999,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
    description: "Traditional Banarasi lehenga with dupatta"
  },
  
  // New Arrivals
  {
    id: 11,
    name: "Designer Cocktail Dress",
    category: "new-arrivals",
    price: 3999,
    image: "https://images.unsplash.com/photo-1566479179817-4d3b0b85bf98?w=400&h=500&fit=crop",
    description: "Latest designer cocktail dress"
  },
  {
    id: 12,
    name: "Modern Fusion Wear",
    category: "new-arrivals",
    price: 3299,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop",
    description: "Contemporary fusion outfit"
  }
];

// Cart and Wishlist Management
let cart = [];
let wishlist = [];
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  displayProducts(products);
  updateCartCount();
  updateWishlistCount();
  
  // Search functionality
  document.querySelector('.search-btn').addEventListener('click', handleSearch);
  document.querySelector('.search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  
  // Category dropdown filter
  document.querySelector('.category-dropdown').addEventListener('change', (e) => {
    const category = e.target.value.toLowerCase().replace(' ', '-');
    if (category === 'all-categories') {
      filterCategory('all');
    } else {
      filterCategory(category);
    }
  });
});

// Search Functionality
function handleSearch() {
  const searchTerm = document.querySelector('.search-input').value.toLowerCase();
  const filtered = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered);
}

// Display Products
function displayProducts(productsToShow) {
  const productsSection = document.getElementById('products');
  productsSection.innerHTML = '';

  if (productsToShow.length === 0) {
    productsSection.innerHTML = '<p class="no-products">No products found in this category.</p>';
    return;
  }

  productsToShow.forEach(product => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x500?text=Product+Image'">
        <div class="product-overlay">
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
        <button class="wishlist-icon-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlistItem(${product.id})">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
      </div>
    `;
    productsSection.appendChild(productCard);
  });
}

// Filter Products by Category
function filterCategory(category) {
  currentFilter = category;
  
  // Update active category link
  document.querySelectorAll('.category-links a').forEach(link => {
    link.classList.remove('active');
  });
  
  // Filter products
  let filteredProducts;
  if (category === 'all') {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product => product.category === category);
  }
  
  displayProducts(filteredProducts);
  
  // Scroll to products
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartCount();
  updateCartDisplay();
  showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  updateCartDisplay();
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartCount();
    updateCartDisplay();
  }
}

// Update Cart Count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

// Update Cart Display
function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Start shopping!</p>';
    cartTotal.textContent = '0.00';
    return;
  }
  
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=Product'">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>₹${item.price.toLocaleString('en-IN')} each</p>
      </div>
      <div class="cart-item-controls">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span class="quantity">${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
      <div class="cart-item-total">₹${itemTotal.toLocaleString('en-IN')}</div>
    `;
    cartItems.appendChild(cartItem);
  });
  
  cartTotal.textContent = total.toLocaleString('en-IN');
}

// Toggle Cart
function toggleCart() {
  const cart = document.getElementById('cart');
  cart.classList.toggle('hidden');
  if (!cart.classList.contains('hidden')) {
    updateCartDisplay();
  }
}

// Wishlist Functions
function toggleWishlistItem(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const index = wishlist.findIndex(item => item.id === productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showNotification(`${product.name} removed from wishlist`);
  } else {
    wishlist.push(product);
    showNotification(`${product.name} added to wishlist!`);
  }
  
  updateWishlistCount();
  updateWishlistDisplay();
  displayProducts(currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter));
}

function toggleWishlist() {
  const wishlistEl = document.getElementById('wishlist');
  wishlistEl.classList.toggle('hidden');
  if (!wishlistEl.classList.contains('hidden')) {
    updateWishlistDisplay();
  }
}

function updateWishlistCount() {
  document.getElementById('wishlist-count').textContent = wishlist.length;
}

function updateWishlistDisplay() {
  const wishlistItems = document.getElementById('wishlist-items');
  
  if (wishlist.length === 0) {
    wishlistItems.innerHTML = '<p class="empty-wishlist">Your wishlist is empty. Start adding items!</p>';
    return;
  }
  
  wishlistItems.innerHTML = '';
  
  wishlist.forEach(item => {
    const wishlistItem = document.createElement('div');
    wishlistItem.className = 'wishlist-item';
    wishlistItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=Product'">
      <div class="wishlist-item-info">
        <h4>${item.name}</h4>
        <p>₹${item.price.toLocaleString('en-IN')}</p>
        <button class="add-to-cart-from-wishlist" onclick="addToCart(${item.id}); toggleWishlist();">Add to Cart</button>
      </div>
      <button class="remove-wishlist-btn" onclick="toggleWishlistItem(${item.id}); updateWishlistDisplay();">
        <i class="fas fa-times"></i>
      </button>
    `;
    wishlistItems.appendChild(wishlistItem);
  });
}

// Toggle User Menu (placeholder)
function toggleUserMenu() {
  alert('User menu - Login/Signup functionality can be added here');
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`Thank you for your purchase!\nTotal: ₹${total.toLocaleString('en-IN')}\n\nYour order has been placed successfully.`);
  
  cart.length = 0;
  updateCartCount();
  updateCartDisplay();
  toggleCart();
}

// Show Notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}

// Newsletter Subscription
function handleNewsletter(event) {
  event.preventDefault();
  const emailInput = event.target.querySelector('.newsletter-input');
  const email = emailInput.value.trim();
  
  if (!email) {
    showNotification('Please enter a valid email address');
    return;
  }
  
  // Simulate newsletter subscription
  showNotification('Thank you for subscribing! You\'ll receive 10% off your first purchase.');
  emailInput.value = '';
  
  // In a real application, you would send this to a server
  console.log('Newsletter subscription:', email);
}
