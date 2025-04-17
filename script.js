// script.js - For IIT Jodhpur Cultural Hub Website

//NAvbar
// Scroll effect for navbar
     // Elements
     const navbar = document.getElementById('main-nav');
     const menuBtn = document.getElementById('menu-btn');
     const mobileMenu = document.getElementById('mobile-menu');
     const menuLine1 = document.querySelector('.menu-line-1');
     const menuLine2 = document.querySelector('.menu-line-2');
     const menuLine3 = document.querySelector('.menu-line-3');
     
     // Variables
     let lastScrollY = window.scrollY;
     let menuOpen = false;
     
     // Scroll effects with throttling
     let scrollTicking = false;
     window.addEventListener('scroll', function() {
         if (!scrollTicking) {
             window.requestAnimationFrame(function() {
                 // Shrink navbar on scroll with blur effect
                 if (window.scrollY > 50) {
                     navbar.classList.add('py-2', 'backdrop-blur-lg', 'bg-opacity-80');
                     navbar.classList.remove('py-3');
                 } else {
                     navbar.classList.add('py-3');
                     navbar.classList.remove('py-2', 'backdrop-blur-lg', 'bg-opacity-80');
                 }
                 
                 // Smart hide/show navbar based on scroll direction
                 if (window.scrollY > lastScrollY && window.scrollY > 300 && !menuOpen) {
                     navbar.classList.add('-translate-y-full');
                 } else {
                     navbar.classList.remove('-translate-y-full');
                 }
                 
                 lastScrollY = window.scrollY;
                 scrollTicking = false;
             });
             
             scrollTicking = true;
         }
     });
     
     // Creative menu toggle with animated transitions
     menuBtn.addEventListener('click', function() {
         menuOpen = !menuOpen;
         
         if (menuOpen) {
             // Show menu with animation
             mobileMenu.classList.remove('-translate-y-full');
             mobileMenu.classList.add('translate-y-0');
             document.body.style.overflow = 'hidden';
             
             // Animate hamburger to X
             menuLine1.classList.add('rotate-45', 'translate-y-2');
             menuLine2.classList.add('opacity-0', 'translate-x-5');
             menuLine3.classList.add('-rotate-45', '-translate-y-2');
             
             // Add active state to button
             menuBtn.classList.add('active');
         } else {
             // Hide menu with animation
             mobileMenu.classList.remove('translate-y-0');
             mobileMenu.classList.add('-translate-y-full');
             document.body.style.overflow = 'auto';
             
             // Animate X back to hamburger
             menuLine1.classList.remove('rotate-45', 'translate-y-2');
             menuLine2.classList.remove('opacity-0', 'translate-x-5');
             menuLine3.classList.remove('-rotate-45', '-translate-y-2');
             
             // Remove active state
             menuBtn.classList.remove('active');
         }
     });
     
     // Close mobile menu when clicking menu items
     const mobileLinks = mobileMenu.querySelectorAll('a');
     mobileLinks.forEach(link => {
         link.addEventListener('click', function() {
             menuOpen = false;
             mobileMenu.classList.remove('translate-y-0');
             mobileMenu.classList.add('-translate-y-full');
             document.body.style.overflow = 'auto';
             
             // Animate X back to hamburger
             menuLine1.classList.remove('rotate-45', 'translate-y-2');
             menuLine2.classList.remove('opacity-0', 'translate-x-5');
             menuLine3.classList.remove('-rotate-45', '-translate-y-2');
             
             // Remove active state
             menuBtn.classList.remove('active');
         });
     });
     
     // Handle window resize
     let resizeTimeout;
     window.addEventListener('resize', function() {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(function() {
             if (window.innerWidth >= 1024 && menuOpen) {
                 menuOpen = false;
                 mobileMenu.classList.remove('translate-y-0');
                 mobileMenu.classList.add('-translate-y-full');
                 document.body.style.overflow = 'auto';
                 
                 // Reset hamburger icon
                 menuLine1.classList.remove('rotate-45', 'translate-y-2');
                 menuLine2.classList.remove('opacity-0', 'translate-x-5');
                 menuLine3.classList.remove('-rotate-45', '-translate-y-2');
                 
                 // Remove active state
                 menuBtn.classList.remove('active');
             }
         }, 100);
     });
     
     // Add page load animation
     document.addEventListener('DOMContentLoaded', function() {
         navbar.classList.add('animate-fade-in');
     });
     
     // Intersection Observer for elements coming into view
     const observeElements = document.querySelectorAll('.nav-link, .login-btn');
     
     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.classList.add('animate-in-view');
                 observer.unobserve(entry.target);
             }
         });
     }, { threshold: 0.1 });
     
     observeElements.forEach(element => {
         observer.observe(element);
     });



 //slide show from here :- 
// Slideshow functionality for hero section
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
});

function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slideshow-dots');
    
    let currentSlide = 0;
    let slideshowInterval;
    const slideDuration = 6000; // 6 seconds per slide
    
    // Create dots based on number of slides
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Update active dot
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Show specific slide
    function goToSlide(index) {
        // Deactivate current slide
        slides[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Handle index boundaries
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;
        
        // Activate new slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        updateDots();
        
        // Reset interval timer
        resetInterval();
    }
    
    // Next slide function
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Reset interval timer
    function resetInterval() {
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Event listeners for controls
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);
    
    // Initialize slideshow
    createDots();
    resetInterval();
    
    // Pause slideshow on hover
    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseenter', () => clearInterval(slideshowInterval));
    slideshow.addEventListener('mouseleave', resetInterval);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slideshow.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous slide
            prevSlide();
        }
    }
}
// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    
    function openMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    menuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Scroll animation for elements
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // Check on initial load
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
    initMobileMenu();
    initScrollAnimations();
    initNavbarScroll();
});
