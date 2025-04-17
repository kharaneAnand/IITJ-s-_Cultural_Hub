// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Set header margin to accommodate fixed navbar
    const navHeight = document.querySelector('nav').offsetHeight;
    document.querySelector('header').style.marginTop = navHeight + 'px';
    
    // Add back to top button if not already in HTML
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('div');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '&uarr;';
        backToTopBtn.addEventListener('click', scrollToTop);
        document.body.appendChild(backToTopBtn);
    }
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .footer-section a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        
        window.scrollTo({
            top: targetElement.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// Gallery Modal functionality
// Modify the openModal function to remove captions
function openModal(imageSrc) {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside the image
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('galleryModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Sticky navigation on scroll with animation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Sticky nav with background change
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(139, 69, 19, 0.95)';
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.background = 'var(--primary-color)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    const archItems = document.querySelectorAll('.arch-item');
    const attractionCards = document.querySelectorAll('.attraction-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Animate sections
    sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.querySelector('h2').classList.add('fade-in');
            
            // Add staggered animation to content boxes
            const contentBox = section.querySelector('.content-box');
            if (contentBox && !contentBox.classList.contains('animated')) {
                contentBox.classList.add('slide-up', 'animated');
                contentBox.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
    
    // Animate architecture grid items
    archItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 50 && !item.classList.contains('animated')) {
            item.classList.add('fade-in', 'animated');
            item.style.animationDelay = `${index * 0.1}s`;
        }
    });
    
    // Animate attraction cards
    attractionCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 50 && !card.classList.contains('animated')) {
            card.classList.add('slide-up', 'animated');
            card.style.animationDelay = `${index * 0.2}s`;
        }
    });
    
    // Animate gallery items
    galleryItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 50 && !item.classList.contains('animated')) {
            item.classList.add('fade-in', 'animated');
            item.style.animationDelay = `${index * 0.1}s`;
        }
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
}

// Call preload function after page loads
window.addEventListener('load', preloadImages);

// Add touch support for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('touchstart', function(e) {
        // Get the image source from the clicked gallery item
        const imgSrc = this.querySelector('img').src;
        // Higher resolution version for modal
        // Replace this with the actual path pattern if needed
        const highResSrc = imgSrc.replace('400/300', '800/600');
        openModal(highResSrc);
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Add photo upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('photoUploadForm');
    const photoInput = document.getElementById('photoInput');
    const uploadStatus = document.getElementById('uploadStatus');
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!photoInput.files.length) {
                uploadStatus.textContent = 'Please select a photo to upload';
                uploadStatus.className = 'error';
                return;
            }
            
            const file = photoInput.files[0];
            
            // Check file type
            if (!file.type.match('image.*')) {
                uploadStatus.textContent = 'Please select an image file';
                uploadStatus.className = 'error';
                return;
            }
            
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                uploadStatus.textContent = 'File size must be less than 5MB';
                uploadStatus.className = 'error';
                return;
            }
            
            // In a real application, you would use AJAX to upload the file to your server
            // This is a simulation for demonstration purposes
            
            uploadStatus.textContent = 'Uploading...';
            uploadStatus.className = '';
            
            // Simulate upload delay
            setTimeout(function() {
                // Create a new URL for the uploaded image
                const imageURL = URL.createObjectURL(file);
                
                // Create new gallery item
                const newItem = document.createElement('div');
                newItem.className = 'gallery-item';
                newItem.innerHTML = `<img src="${imageURL}" alt="User uploaded photo">`;
                newItem.onclick = function() {
                    openModal(imageURL);
                };
                
                // Add animation class
                newItem.classList.add('fade-in');
                
                // Add to gallery container
                galleryContainer.prepend(newItem);
                
                // Reset form and show success message
                uploadForm.reset();
                uploadStatus.textContent = 'Photo uploaded successfully!';
                uploadStatus.className = 'success';
                
                // Clear success message after 3 seconds
                setTimeout(function() {
                    uploadStatus.textContent = '';
                }, 3000);
            }, 1500);
        });
        
        // Show selected filename
        photoInput.addEventListener('change', function() {
            const fileLabel = document.querySelector('.file-input-label');
            if (this.files.length) {
                fileLabel.textContent = this.files[0].name;
            } else {
                fileLabel.textContent = 'Choose a photo';
            }
        });
    }
});
// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});