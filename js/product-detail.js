// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get a product by ID from localStorage
function getProductById(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === productId);
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
        return 'N/A';
    }
}

// Load product details and render them
function loadProductDetails() {
    const productId = getUrlParameter('id');
    if (!productId) {
        showError('Product ID not found in URL');
        return;
    }
    
    const product = getProductById(productId);
    if (!product) {
        showError('Product not found');
        return;
    }
    
    renderProductDetails(product);
}

// Display error message
function showError(message) {
    // Hide loading spinner
    const productDetailContainer = document.getElementById('product-detail-container');
    if (productDetailContainer) {
        productDetailContainer.style.display = 'none';
    }
    
    // Show error container
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        const errorMessage = errorContainer.querySelector('p');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
        errorContainer.style.display = 'block';
    }
}

// Render product details to the page
function renderProductDetails(product) {
    const productDetailContainer = document.getElementById('product-detail-container');
    if (!productDetailContainer) return;
    
    // Clear loading spinner
    productDetailContainer.innerHTML = '';
    
    // Use product.image if it exists (from localStorage), otherwise use the default path
    const imageSrc = product.image.startsWith('data:image') ? product.image : product.image;
    const formattedDate = product.date ? formatDate(product.date) : 'N/A';
    
    // Create product detail HTML
    const productDetailHTML = `
        <div class="product-detail-image">
            <img src="${imageSrc}" alt="${product.name}">
        </div>
        
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <p class="product-detail-price">₹${product.price}</p>
            
            <div class="product-detail-meta">
                <div class="meta-item">
                    <span class="meta-label">Category:</span>
                    <span class="meta-value">${product.category}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Condition:</span>
                    <span class="meta-value">${product.condition}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Product Code:</span>
                    <span class="meta-value">${product.code || 'N/A'}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Posted On:</span>
                    <span class="meta-value">${formattedDate}</span>
                </div>
            </div>
            
            <div class="product-detail-description">
                <h3>Description</h3>
                <p>${product.description || 'No description available.'}</p>
            </div>
            
            <div class="product-detail-seller">
                <h3>Seller Information</h3>
                <div class="seller-info">
                    <p><strong>Name:</strong> ${product.seller ? product.seller.name : 'N/A'}</p>
                    <p><strong>Contact:</strong> ${product.seller ? product.seller.contact : 'N/A'}</p>
                    <p><strong>Email:</strong> ${product.seller ? product.seller.email : 'N/A'}</p>
                </div>
            </div>
            
            <div class="product-detail-actions">
                <a href="mailto:${product.seller ? product.seller.email : ''}?subject=Inquiry about ${product.name}" class="btn-primary">
                    <i class="fas fa-envelope"></i> Contact Seller
                </a>
                <a href="tel:${product.seller ? product.seller.contact : ''}" class="btn-secondary">
                    <i class="fas fa-phone"></i> Call Seller
                </a>
            </div>
        </div>
    `;
    
    productDetailContainer.innerHTML = productDetailHTML;
}

// Add additional CSS styles for loading spinner
function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 50px 20px;
            width: 100%;
            text-align: center;
        }
        
        .loading-spinner {
            font-size: 48px;
            color: #007bff;
            margin-bottom: 20px;
        }
        
        .loading-container p {
            color: #6c757d;
            font-size: 18px;
        }
    `;
    document.head.appendChild(styleElement);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addStyles();
    loadProductDetails();
});