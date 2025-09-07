// MockAPI Configuration
const API_CONFIG = {
    baseURL: 'https://6756c4b311ce847c992c7b8e.mockapi.io/api/v1',
    endpoints: {
        products: '/products',
        users: '/users',
        orders: '/orders'
    }
};

// Product Data Controller Object
const ProductController = {
    products: [],
    filteredProducts: [],
    currentCategory: 'all',
    
    // Fetch products from MockAPI
    async fetchProducts() {
        try {
            UIController.showLoading(true);
            const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.products}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // If MockAPI is empty, use sample data
            if (data.length === 0) {
                this.products = this.getSampleProducts();
                NotificationController.show('Using sample data - MockAPI is empty', 'info');
            } else {
                this.products = data;
            }
            
            this.filteredProducts = [...this.products];
            this.renderProducts();
            this.updateProductCount();
            UIController.showLoading(false);
            
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback to sample data
            this.products = this.getSampleProducts();
            this.filteredProducts = [...this.products];
            this.renderProducts();
            this.updateProductCount();
            UIController.showLoading(false);
            NotificationController.show('Using sample data - API unavailable', 'warning');
        }
    },
    
    // Sample products for demonstration
    getSampleProducts() {
        return [
            {
                id: '1',
                name: 'iPhone 15 Pro Max',
                description: 'Latest flagship smartphone with advanced camera system and A17 Pro chip',
                price:  467000,
                category: 'smartphones',
                image: 'https://media.wisemarket.com.pk/variant/inventory_26059.webp',
                rating: 4.8,
                inStock: true,
                features: ['A17 Pro Chip', '48MP Camera', '5G Ready', 'Face ID']
            },
            {
                id: '2',
                name: 'MacBook Pro 16"',
                description: 'Powerful laptop for professionals with M3 chip and stunning Retina display',
                price: 105000,
                category: 'laptops',
                image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.9,
                inStock: true,
                features: ['M3 Chip', '16" Retina Display', '32GB RAM', 'All-day Battery']
            },
            {
                id: '3',
                name: 'Sony WH-1000XM5',
                description: 'Premium noise-canceling headphones with exceptional sound quality',
                price: 8000,
                category: 'headphones',
                image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.7,
                inStock: true,
                features: ['Noise Canceling', '30hr Battery', 'Quick Charge', 'Touch Controls']
            },
            {
                id: '4',
                name: 'iPad Pro 12.9"',
                description: 'Ultimate tablet experience with M2 chip and Liquid Retina XDR display',
                price: 85000,
                category: 'tablets',
                image: 'https://www.shutterstock.com/image-photo/bangkok-thailand-june-11-2023-260nw-2315664039.jpg',
                rating: 4.6,
                inStock: true,
                features: ['M2 Chip', 'Liquid Retina XDR', 'Apple Pencil Support', 'Face ID']
            },
            {
                id: '5',
                name: 'Apple iPhone 14 Plus',
                description: 'Apple iPhone 14 Plus with big 6.7″ display, A15 Bionic chip, dual cameras, and long battery life',
                price: 24999,
                category: 'smartphones',
                image: 'https://www.electrogas.pk/cdn/shop/files/Apple-iPhone-14-iPhone-14-Plus-purple_f54d85ea-3299-4802-a5e3-2e43efbe3097.jpg?v=1698178879',
                rating: 4.5,
                inStock: true,
              features: ['6.7" Super Retina XDR', '12MP Dual Camera', 'A15 Bionic Chip', 'Up to 26h Video Playback']

            },
            {
                id: '6',
                name: 'Dell XPS 13',
                description: 'Ultra-portable laptop with stunning InfinityEdge display',
                price: 80000,
                category: 'laptops',
                image: 'https://www.dell.com/wp-uploads/2024/01/XPS-9640-laptops-back-to-back-1280x800-1.jpg',
                rating: 4.4,
                inStock: false,
                features: ['Intel i7', '13.4" Display', '16GB RAM', 'Ultra Portable']
            },
            {
                id: '7',
                name: 'AirPods Pro 2',
                description: 'Wireless earbuds with active noise cancellation and spatial audio',
                price: 4000,
                category: 'headphones',
                image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500',
                rating: 4.8,
                inStock: true,
                features: ['Active Noise Cancellation', 'Spatial Audio', 'MagSafe Charging', 'Sweat Resistant']
            },
            {
                id: '8',
                name: 'Surface Pro 9',
                description: 'Versatile 2-in-1 tablet that transforms into a laptop',
                price: 40000,
                category: 'tablets',
                image: 'https://m.media-amazon.com/images/I/41qAs7ghU8L._UF1000,1000_QL80_.jpg',
                rating: 4.3,
                inStock: true,
                features: ['2-in-1 Design', 'Intel i5', 'Type Cover Ready', 'All-day Battery']
            },
             {
                id: '9',
                name: 'Apple iPhone 15 128GB - Pink ',
                description: 'Apple iPhone 15 128GB in Pink with stunning design, A16 Bionic power, and advanced dual camera.',
                price: 169999,
                category: 'smartphones',
                image: 'https://hnau.imgix.net/media/catalog/product/i/p/iphone_15_pink_pdp_image_position_1__au_1_abc.jpg?auto=compress&auto=format&fill-color=FFFFFF&fit=fill&fill=solid&w=496&h=279',
                rating: 4.5,
                inStock: true,
               features: ['6.1" Super Retina XDR', '48MP Main Camera', 'A16 Bionic Chip', 'USB-C Charging']
            },
             {
                id: '10',
                name: 'Apple iPhone 14 Pro Max 128GB Deep Purple',
                description: ': 6.7-inch Super Retina XDR OLED, ProMotion (Adaptive 120 Hz)',
                price: 245999,
                category: 'smartphones',
                image: 'https://m.media-amazon.com/images/I/51KLILQ67nL._UF894,1000_QL80_.jpg',
                rating: 4.5,
                inStock: true,
                features: ['6.7" Super Retina XDR', '48MP Triple Camera', 'A16 Bionic Chip', 'iOS 16', 'Face ID', 'IP68 Water Resistant'],
            },
             {
                id: '11',
                name: ' MacBook Pro',
                description: 'Apple MacBook Air M3 with sleek design, 8-core chip, 16GB memory, and all-day battery.',
                price: 24999,
                category: 'laptops',
                image: 'https://blog-cdn.el.olx.com.pk/wp-content/uploads/2022/05/10192651/Apple-Macbook-Pro-closeup.jpg',
                rating: 4.5,
                inStock: true,
             features: ['13" Liquid Retina Display', 'Apple M3 8-Core Chip', '16GB Unified Memory', 'Up to 18h Battery Life']
            },
             {
                id: '12',
                name: 'HP 15-BS092nia Core i5 7th Generation Laptop 4GB',
                description: 'HP 15-BS092nia with Intel Core i5 7th Gen, 15.6″ display, and reliable everyday performance.',
                price:  53499,
                category: 'laptops',
                image: 'https://www.mega.pk/items_images/HP+15-BS092nia+Core+i5+7th+Generation+Laptop+4GB+DDR4+500GB+HDD+Price+in+Pakistan%2C+Specifications%2C+Features_-_17382.webp',
                rating: 4.5,
                inStock: true,
                features: ['15.6" HD Display', 'Intel Core i5 7th Gen', '4GB DDR4 RAM', '1TB HDD Storage']

            },
             {
                id: '13',
                name: 'Juice Go Wireless Bluetooth On Ear Headphones',
                description: 'Juice Go Wireless Bluetooth headphones with on-ear comfort, clear sound, and long battery life.',
                price: 7000,
                category: 'headphones',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeK00MkHcGpDkiPiuO63poBP6ThEtYrAceVIn-O56dN9mwtg1mocaaK99pzdOAEPSccSQ&usqp=CAU',
                rating: 4.5,
                inStock: true,
                features: ['Wireless Bluetooth', 'On-Ear Design', 'Clear Stereo Sound', 'Long Battery Life']

            },
             {
                id: '14',
                name: 'Lenovo Tab M9 – Compact Tablet with 3GB RAM',
                description: 'Lenovo Tab M9 compact 9″ tablet with 3GB RAM, sleek design, and reliable performance.',
                price: 44899,
                category: 'tablets',
                image: 'https://www.t-shop.com.pk/wp-content/uploads/2023/10/Tshop-Lenovo-Tab-M9-2023-Tablet-Long-Battery-Life-9-HD-Front-2MP-Rear-8MP-Camera-3GB-Memory-32GB-Storage-Android-12_Best-Price-Pakistan-3-600x600.webp',
                rating: 4.0,
                inStock: true,
                features: ['9" HD Display', '3GB RAM', '32GB/64GB Storage', 'Long Battery Life']

            },
             {
                id: '15',
                name: 'Apple iPad Air 11" 128GB Wi-Fi M3 Chip',
                description: 'Apple iPad Air 11″ with powerful M3 chip, 128GB storage, and stunning Liquid Retina display.',
                price: 168999,
                category: 'tablets',
                image: 'https://qmart.pk/wp-content/uploads/2025/03/Apple-iPad-Air-M3-2025-Qmart-1.png',
                rating: 4.3,
                inStock: false,
                features: ['11" Liquid Retina Display', 'Apple M3 Chip', '128GB Storage', 'All-Day Battery Life']

            },
             {
                id: '16',
                name: ' Wireless Earbuds ',
                description: 'Flagship Android smartphone with S Pen and advanced AI features',
                price: 24999,
                category: 'headphones',
                image: 'https://media.istockphoto.com/id/1204039347/photo/apple-airpods-on-a-white-background.jpg?s=612x612&w=0&k=20&c=2__4hfynkvBt7PA0UE7N5JxSTuaGRFVKaXJUuoQlBzk=',
                rating: 4.5,
                inStock: true,
                features: ['S Pen Included', '200MP Camera', 'AI Features', '5000mAh Battery']
            },
        ];
    },
    
    // Render products to the grid
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredProducts.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        grid.innerHTML = this.filteredProducts.map((product, index) => `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card product-card h-100" style="animation-delay: ${index * 0.1}s">
                    <div class="product-image">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        ${product.inStock ? 
                            '<div class="product-badge">In Stock</div>' : 
                            '<div class="product-badge" style="background: var(--gradient-warm);">Out of Stock</div>'
                        }
                        <div class="product-rating">
                            <i class="fas fa-star text-warning"></i>
                            ${product.rating}
                        </div>
                    </div>
                    <div class="card-body product-info d-flex flex-column">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="product-description flex-grow-1">${product.description}</p>
                        <div class="product-price mb-3">${product.price} PKR</div>
                        <div class="product-actions">
                            <button class="btn btn-view flex-fill me-2" onclick="ProductController.showProductModal('${product.id}')">
                                <i class="fas fa-eye me-1"></i>View
                            </button>
                            <button class="btn btn-cart flex-fill" onclick="CartController.addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart me-1"></i>
                                ${product.inStock ? 'Add' : 'Sold Out'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Animate cards
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach(card => {
                card.classList.add('animate-in');
            });
        }, 100);
    },
    
    // Filter products by category
    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => 
                product.category === category
            );
        }
        
        this.renderProducts();
        this.updateFilterButtons();
    },
    
    // Search products
    searchProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredProducts = this.currentCategory === 'all' 
                ? [...this.products]
                : this.products.filter(product => product.category === this.currentCategory);
        } else {
            const baseProducts = this.currentCategory === 'all' 
                ? this.products
                : this.products.filter(product => product.category === this.currentCategory);
                
            this.filteredProducts = baseProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderProducts();
    },
    
    // Show product modal
    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modalTitle = document.getElementById('modalProductName');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = product.name;
        
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-image">
                </div>
                <div class="col-md-6">
                    <div class="modal-product-details">
                        <div class="modal-product-price">${product.price} PKR</div>
                        <p class="modal-product-description">${product.description}</p>
                        
                        <div class="mb-3">
                            <span class="badge ${product.inStock ? 'bg-success' : 'bg-danger'} mb-2">
                                ${product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <span class="badge bg-primary ms-2">
                                <i class="fas fa-star me-1"></i>${product.rating}
                            </span>
                        </div>
                        
                        <h6>Features:</h6>
                        <ul class="modal-product-features">
                            ${product.features.map(feature => `
                                <li><i class="fas fa-check"></i>${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Update modal button
        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.onclick = () => CartController.addToCart(productId);
        addToCartBtn.disabled = !product.inStock;
        addToCartBtn.innerHTML = product.inStock 
            ? '<i class="fas fa-shopping-cart me-2"></i>Add to Cart'
            : '<i class="fas fa-times me-2"></i>Out of Stock';
        
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    },
    
    // Update filter buttons
    updateFilterButtons() {
        document.querySelectorAll('.filter-buttons .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${this.currentCategory}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    },
    
    // Update product count in hero
    updateProductCount() {
        const countElement = document.getElementById('totalProducts');
        if (countElement) {
            countElement.textContent = this.products.length;
        }
    },
    
    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
};

// Shopping Cart Controller Object
const CartController = {
    items: [],
    
    // Add item to cart
    addToCart(productId) {
        const product = ProductController.getProductById(productId);
        if (!product || !product.inStock) return;
        
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                product: product,
                quantity: 1
            });
        }
        
        this.updateCartCount();
        NotificationController.show(`${product.name} added to cart!`, 'success');
    },
    
    // Update cart count display
    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cartCount').textContent = count;
    },
    
    // Get cart total
    getCartTotal() {
        return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
};

// UI Controller Object
const UIController = {
    // Show/hide loading spinner
    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        if (show) {
            spinner.classList.add('show');
        } else {
            spinner.classList.remove('show');
        }
    },
    
    // Initialize filter buttons
    initializeFilterButtons() {
        const filterContainer = document.getElementById('filterButtons');
        const categories = ['all', 'smartphones', 'laptops', 'headphones', 'tablets'];
        const categoryNames = {
            all: 'All Products',
            smartphones: 'Smartphones',
            laptops: 'Laptops',
            headphones: 'Headphones',
            tablets: 'Tablets'
        };
        const categoryIcons = {
            all: 'fas fa-th',
            smartphones: 'fas fa-mobile-alt',
            laptops: 'fas fa-laptop',
            headphones: 'fas fa-headphones',
            tablets: 'fas fa-tablet-alt'
        };
        
        filterContainer.innerHTML = categories.map(category => `
            <button class="btn btn-outline-primary ${category === 'all' ? 'active' : ''} me-2 mb-2" 
                    data-filter="${category}" onclick="ProductController.filterByCategory('${category}')">
                <i class="${categoryIcons[category]} me-1"></i>${categoryNames[category]}
            </button>
        `).join('');
    },
    
    // Smooth scroll to section
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    },
    
    // Update navbar on scroll
    updateNavbarOnScroll() {
        const navbar = document.querySelector('.custom-navbar');
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }
};

// Notification Controller Object
const NotificationController = {
    // Show toast notification
    show(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = `toast-${Date.now()}`;
        
        const toastHTML = `
            <div class="toast" id="${toastId}" role="alert">
                <div class="toast-header">
                    <i class="fas ${this.getIcon(type)} me-2"></i>
                    <strong class="me-auto">${this.getTitle(type)}</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { delay: duration });
        toast.show();
        
        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    },
    
    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    },
    
    getTitle(type) {
        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info'
        };
        return titles[type] || titles.info;
    }
};

// Search Controller Object
const SearchController = {
    searchInput: null,
    searchTimeout: null,
    
    // Initialize search functionality
    init() {
        this.searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        // Real-time search with debouncing
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
        
        // Search button click
        searchBtn.addEventListener('click', () => {
            this.performSearch(this.searchInput.value);
        });
        
        // Enter key search
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(this.searchInput.value);
            }
        });
    },
    
    // Perform search
    performSearch(query) {
        ProductController.searchProducts(query);
        
        if (query.trim()) {
            NotificationController.show(`Searching for "${query}"...`, 'info', 1500);
        }
    },
    
    // Clear search
    clearSearch() {
        this.searchInput.value = '';
        ProductController.searchProducts('');
    }
};

// Navigation Controller Object
const NavigationController = {
    // Initialize navigation
    init() {
        // Home button clicks
        document.getElementById('homeBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.goHome();
        });
        
        document.getElementById('homeLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.goHome();
        });
        
        document.getElementById('footerHome').addEventListener('click', (e) => {
            e.preventDefault();
            this.goHome();
        });
        
        // Category links
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.closest('.category-link').dataset.category;
                this.navigateToCategory(category);
            });
        });
        
        // All products link
        document.getElementById('allProductsLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showAllProducts();
        });
        
        // Hero buttons
        document.getElementById('shopNowBtn').addEventListener('click', () => {
            UIController.scrollToSection('productsSection');
        });
        
        document.getElementById('exploreBtn').addEventListener('click', () => {
            UIController.scrollToSection('productsSection');
        });
        
        // Clear search button
        document.getElementById('clearSearchBtn').addEventListener('click', () => {
            this.goHome();
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    UIController.scrollToSection(href.substring(1));
                }
            });
        });
    },
    
    // Go to home page
    goHome() {
        // Reset filters and search
        ProductController.filterByCategory('all');
        SearchController.clearSearch();
        
        // Update navigation
        this.updateActiveNavLink('homeLink');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        NotificationController.show('Welcome back to TechStore!', 'success');
    },
    
    // Navigate to specific category
    navigateToCategory(category) {
        ProductController.filterByCategory(category);
        UIController.scrollToSection('productsSection');
        
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        NotificationController.show(`Showing ${categoryName} products`, 'info');
    },
    
    // Show all products
    showAllProducts() {
        ProductController.filterByCategory('all');
        UIController.scrollToSection('productsSection');
        NotificationController.show('Showing all products', 'info');
    },
    
    // Update active navigation link
    updateActiveNavLink(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.getElementById(activeId);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
};

// Form Controller Object
const FormController = {
    // Initialize forms
    init() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit(e);
        });
        
        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmit(e);
        });
    },
    
    // Handle contact form submission
    async handleContactSubmit(e) {
        const formData = new FormData(e.target);
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        try {
            // Simulate API call
            await this.simulateAPICall(data);
            
            NotificationController.show('Message sent successfully! We\'ll get back to you soon.', 'success');
            e.target.reset();
            
        } catch (error) {
            NotificationController.show('Failed to send message. Please try again.', 'error');
        }
    },
    
    // Handle newsletter subscription
    async handleNewsletterSubmit(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        
        try {
            await this.simulateAPICall({ email, type: 'newsletter' });
            NotificationController.show('Successfully subscribed to newsletter!', 'success');
            e.target.reset();
            
        } catch (error) {
            NotificationController.show('Subscription failed. Please try again.', 'error');
        }
    },
    
    // Simulate API call
    simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('API Error'));
                }
            }, 1000);
        });
    }
};

// Animation Controller Object
const AnimationController = {
    // Initialize scroll animations
    init() {
        this.observeElements();
        this.setupScrollEffects();
    },
    
    // Observe elements for scroll animations
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    },
    
    // Setup scroll effects
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            UIController.updateNavbarOnScroll();
        });
    }
};

// Main Application Controller
const App = {
    // Initialize the application
    async init() {
        console.log('🚀 TechStore Application Starting...');
        
        // Initialize UI components
        UIController.initializeFilterButtons();
        
        // Initialize controllers
        NavigationController.init();
        SearchController.init();
        FormController.init();
        AnimationController.init();
        
        // Load products from MockAPI
        await ProductController.fetchProducts();
        
        // Show welcome message
        setTimeout(() => {
            NotificationController.show('Welcome to TechStore! 🛍️', 'success');
        }, 1000);
        
        console.log('✅ Application initialized successfully!');
    },
    
    // Handle errors globally
    handleError(error) {
        console.error('Application Error:', error);
        NotificationController.show('Something went wrong. Please try again.', 'error');
    }
};

// Utility Functions
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },
    
    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init().catch(error => {
        App.handleError(error);
    });
});

// Handle window errors
window.addEventListener('error', (e) => {
    App.handleError(e.error);
});

// Export objects for debugging (optional)
window.ProductController = ProductController;
window.CartController = CartController;
window.SearchController = SearchController;