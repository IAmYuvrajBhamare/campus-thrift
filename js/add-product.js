// Functionality for the Add Product page

document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('add-product-form');
    const imageInput = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    
    // Preview image when selected
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.addEventListener('load', function() {
                    imagePreview.src = reader.result;
                    imagePreview.style.display = 'block';
                    imagePreviewContainer.querySelector('p').style.display = 'none';
                });
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Handle form submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const productName = document.getElementById('product-name').value;
            const productCategory = document.getElementById('product-category').value;
            const productPrice = document.getElementById('product-price').value;
            const productCondition = document.getElementById('product-condition').value;
            const productCode = document.getElementById('product-code').value;
            const productDescription = document.getElementById('product-description').value;
            const sellerName = document.getElementById('seller-name').value;
            const sellerContact = document.getElementById('seller-contact').value;
            const sellerEmail = document.getElementById('seller-email').value;
            
            // Get image as data URL
            const imageFile = document.getElementById('product-image').files[0];
            const reader = new FileReader();
            
            reader.addEventListener('load', function() {
                const imageData = reader.result;
                
                // Create product object
                const product = {
                    id: generateId(),
                    name: productName,
                    category: productCategory,
                    price: productPrice,
                    condition: productCondition,
                    code: productCode,
                    description: productDescription,
                    image: imageData,
                    seller: {
                        name: sellerName,
                        contact: sellerContact,
                        email: sellerEmail
                    },
                    date: new Date().toISOString()
                };
                
                // Save product to localStorage
                saveProduct(product);
                
                // Show success modal
                showModal('success-modal');
                
                // Reset form
                addProductForm.reset();
                imagePreview.style.display = 'none';
                imagePreviewContainer.querySelector('p').style.display = 'block';
            });
            
            if (imageFile) {
                reader.readAsDataURL(imageFile);
            }
        });
    }
});

// Function to save product to localStorage
function saveProduct(product) {
    // Get existing products
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Add new product
    products.push(product);
    
    // Save back to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Write to text file (in a real implementation, this would be done server-side)
    // Since we can't directly write to a file from the browser, we'll simulate this
    // by storing in localStorage
    
    // For simplicity, we'll create a simulated text file content in localStorage
    let fileContent = localStorage.getItem('productsTextFile') || '';
    
    // Add product details to the simulated file
    fileContent += `\n--- Product ID: ${product.id} ---\n`;
    fileContent += `Name: ${product.name}\n`;
    fileContent += `Category: ${product.category}\n`;
    fileContent += `Price: ₹${product.price}\n`;
    fileContent += `Condition: ${product.condition}\n`;
    fileContent += `Code: ${product.code}\n`;
    fileContent += `Description: ${product.description}\n`;
    fileContent += `Seller: ${product.seller.name}\n`;
    fileContent += `Contact: ${product.seller.contact}\n`;
    fileContent += `Email: ${product.seller.email}\n`;
    fileContent += `Date Added: ${new Date().toLocaleDateString()}\n`;
    
    // Save back to localStorage
    localStorage.setItem('productsTextFile', fileContent);
}
