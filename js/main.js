// Common functionality for all pages

// Check if the document has loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up mobile menu toggle if it exists (for future responsive enhancements)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
});

// Function to toggle mobile menu (for future responsive enhancements)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Function to format price as Indian Rupees
function formatPrice(price) {
    return '₹' + parseFloat(price).toFixed(2);
}

// Function to generate a random ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Function to get URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    
    return params;
}

// Function to show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    
    // Close modal when clicking the X
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
