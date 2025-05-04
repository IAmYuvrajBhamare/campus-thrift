// Functionality for the Products page

document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-container');
    const noProductsMessage = document.getElementById('no-products-message');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    // Load products
    loadProducts();
    
    // Event listeners for filters
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            loadProducts();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loadProducts();
            }
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            loadProducts();
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            loadProducts();
        });
    }
    
    // Check if there's a category parameter in the URL
    const urlParams = getUrlParams();
    if (urlParams.category && categoryFilter) {
        categoryFilter.value = urlParams.category;
        loadProducts();
    }
});

// Function to load products
function loadProducts() {
    const productContainer = document.getElementById('product-container');
    const noProductsMessage = document.getElementById('no-products-message');
    
    if (!productContainer) return;
    
    // Get filters
    const searchTerm = document.getElementById('search-input')?.value?.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter')?.value || 'all';
    const sortFilter = document.getElementById('sort-filter')?.value || 'newest';
    
    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // If there are no products yet, create some sample products
    if (products.length === 0) {
        products = createSampleProducts();
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    // Filter products
    let filteredProducts = products;
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm) || 
            product.code.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === categoryFilter
        );
    }
    
    // Sort products
    switch (sortFilter) {
        case 'newest':
            filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    // Show or hide no products message
    if (filteredProducts.length === 0) {
        productContainer.innerHTML = '';
        if (noProductsMessage) {
            noProductsMessage.style.display = 'block';
        }
    } else {
        if (noProductsMessage) {
            noProductsMessage.style.display = 'none';
        }
        
        // Display products
        productContainer.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Use a default image if the product image is not available
            const imageUrl = product.image || 'img/placeholder.jpg';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${imageUrl}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">₹${product.price}</p>
                    <div class="product-meta">
                        <span class="product-category">${getCategoryName(product.category)}</span>
                        <span class="product-condition">${product.condition}</span>
                    </div>
                    <a href="product-detail.html?id=${product.id}" class="btn-secondary">View Details</a>
                </div>
            `;
            
            productContainer.appendChild(productCard);
        });
    }
}

// Function to create sample products
function createSampleProducts() {
    return [
        {
            id: 'sample1',
            name: 'Calculus: Early Transcendentals',
            category: 'textbooks',
            price: '850',
            condition: 'Good',
            code: 'ISBN: 978-0321954350',
            description: 'An excellent textbook for first-year calculus. Only used for one semester. Some highlighting and notes in the margins but otherwise in good condition.',
            image: 'img/sample-textbook.jpg',
            seller: {
                name: 'Rahul Kumar',
                contact: '9876543210',
                email: 'rahul@example.com'
            },
            date: '2025-04-01T12:00:00Z'
        },
        {
            id: 'sample2',
            name: 'TI-84 Plus CE Calculator',
            category: 'calculators',
            price: '1500',
            condition: 'Like New',
            code: 'Model: TI-84 Plus CE',
            description: 'Graphing calculator perfect for engineering and mathematics courses. Purchased last semester and barely used. Comes with original packaging and manual.',
            image: 'img/sample-calculator.jpg',
            seller: {
                name: 'Priya Singh',
                contact: '9876543211',
                email: 'priya@example.com'
            },
            date: '2025-04-02T12:00:00Z'
        },
        {
            id: 'sample3',
            name: 'Dell Inspiron Laptop',
            category: 'electronics',
            price: '25000',
            condition: 'Good',
            code: 'Model: Dell Inspiron 15',
            description: 'Intel Core i5, 8GB RAM, 256GB SSD. 3 years old but works perfectly for coding and other college tasks. Battery lasts about 4 hours on a full charge.',
            image: 'img/sample-laptop.jpg',
            seller: {
                name: 'Amit Patel',
                contact: '9876543212',
                email: 'amit@example.com'
            },
            date: '2025-04-03T12:00:00Z'
        },
        {
            id: 'sample4',
            name: 'Physics: Principles with Applications',
            category: 'textbooks',
            price: '700',
            condition: 'Fair',
            code: 'ISBN: 978-0321625922',
            description: 'Physics textbook for first-year engineering students. Used for two semesters. Has some wear and tear, but all pages are intact.',
            image: 'img/sample-physics.jpg',
            seller: {
                name: 'Aisha Khan',
                contact: '9876543213',
                email: 'aisha@example.com'
            },
            date: '2025-04-04T12:00:00Z'
        }
    ];
}

// Function to get category name
function getCategoryName(categoryValue) {
    switch(categoryValue) {
        case 'textbooks': return 'Textbooks';
        case 'electronics': return 'Electronics';
        case 'calculators': return 'Calculators';
        case 'furniture': return 'Furniture';
        case 'clothing': return 'Clothing';
        case 'other': return 'Other';
        default: return categoryValue;
    }
}
