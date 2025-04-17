// Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle navigation
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Highlight active nav item on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Interactive Parts Image
document.addEventListener('DOMContentLoaded', function() {
    const molelaImg = document.getElementById('molela-img');
    const partInfo = document.getElementById('part-info');
    const partName = document.getElementById('part-name');
    const partDescription = document.getElementById('part-description');
    const partDetails = document.getElementById('part-details');
    const partItems = document.querySelectorAll('.part-item');
    
    // Create hotspot markers for the parts
    createHotspots();
    
    function createHotspots() {
        const hotspots = [
            { part: 'base-plaque', top: '20%', left: '17%', title: 'Base Plaque' },
            { part: 'central-deity', top: '40%', left: '50%', title: 'Central Deity' },
            { part: 'border-design', top: '5%', left: '5%', title: 'Border Design' },
            { part: 'supporting-figures', top: '17%', left: '75%', title: 'Supporting Figures' },
        ];
        
        const instrumentImage = document.querySelector('.instrument-image');
        
        hotspots.forEach(hotspot => {
            const marker = document.createElement('div');
            marker.className = 'hotspot-marker';
            marker.setAttribute('data-part', hotspot.part);
            marker.style.top = hotspot.top;
            marker.style.left = hotspot.left;
            marker.title = hotspot.title;
            
            marker.addEventListener('click', function() {
                showPartInfo(hotspot.part);
                updateActiveHotspot(marker);
            });
            
            marker.addEventListener('mouseenter', function() {
                showPartInfo(hotspot.part);
            });
            
            instrumentImage.appendChild(marker);
        });
    }
    
    function updateActiveHotspot(activeMarker) {
        const markers = document.querySelectorAll('.hotspot-marker');
        markers.forEach(marker => {
            marker.classList.remove('active');
        });
        
        if (activeMarker) {
            activeMarker.classList.add('active');
        }
    }
    
    function showPartInfo(partId) {
        const partElement = document.querySelector(`.part-item[data-part="${partId}"]`);
        
        if (partElement) {
            // Highlight the selected part in the list
            partItems.forEach(item => {
                item.classList.remove('highlighted-part');
            });
            partElement.classList.add('highlighted-part');
            
            // Update the part info section
            partName.textContent = partElement.querySelector('h4').textContent;
            partDescription.textContent = partElement.querySelector('p').textContent;
            
            // Add additional details based on the part
            let details = '';
            switch(partId) {
                case 'base-plaque':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Local clay mixed with donkey dung</li>
                            <li><strong>Size:</strong> Typically 12-24 inches in height</li>
                            <li><strong>Function:</strong> Provides structural foundation for the artwork</li>
                        </ul>
                    `;
                    break;
                case 'central-deity':
                    details = `
                        <ul>
                            <li><strong>Common Figures:</strong> Devnarayan, Krishna, or local deities</li>
                            <li><strong>Technique:</strong> High-relief modeling</li>
                            <li><strong>Significance:</strong> Represents the divine focus of the plaque</li>
                        </ul>
                    `;
                    break;
                case 'border-design':
                    details = `
                        <ul>
                            <li><strong>Patterns:</strong> Floral vines, peacocks, or geometric shapes</li>
                            <li><strong>Function:</strong> Frames and enhances the central artwork</li>
                            <li><strong>Style:</strong> Symmetrical designs with repeating motifs</li>
                        </ul>
                    `;
                    break;
                case 'supporting-figures':
                    details = `
                        <ul>
                            <li><strong>Types:</strong> Celestial beings, animals, or devotees</li>
                            <li><strong>Placement:</strong> Often in lower relief than central deity</li>
                            <li><strong>Purpose:</strong> Tells stories from mythology or local lore</li>
                        </ul>
                    `;
                    break;
                case 'color-pigments':
                    details = `
                        <ul>
                            <li><strong>Sources:</strong> Natural minerals and earth pigments</li>
                            <li><strong>Colors:</strong> Red ochre, yellow ochre, green malachite, white chalk</li>
                            <li><strong>Application:</strong> Hand-painted after firing</li>
                        </ul>
                    `;
                    break;
                case 'mirror-embellishments':
                    details = `
                        <ul>
                            <li><strong>Purpose:</strong> Represents divine light and reflection</li>
                            <li><strong>Placement:</strong> Often in clothing or as celestial bodies</li>
                            <li><strong>Tradition:</strong> Believed to ward off evil spirits</li>
                        </ul>
                    `;
                    break;
            }
            
            partDetails.innerHTML = details;
            
            // Animate the info section
            partInfo.style.opacity = '0';
            setTimeout(() => {
                partInfo.style.opacity = '1';
            }, 200);
        }
    }
    
    // Make part items clickable
    partItems.forEach(item => {
        item.addEventListener('click', function() {
            const partId = this.getAttribute('data-part');
            showPartInfo(partId);
            
            // Find and highlight the corresponding hotspot
            const hotspot = document.querySelector(`.hotspot-marker[data-part="${partId}"]`);
            if (hotspot) {
                updateActiveHotspot(hotspot);
            }
            
            // Scroll to the interactive section on mobile
            if (window.innerWidth < 768) {
                const infoElement = document.getElementById('part-info');
                infoElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Show the first part info by default
    if (partItems.length > 0) {
        const firstPartId = partItems[0].getAttribute('data-part');
        showPartInfo(firstPartId);
    }
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send the data to a server
        // For demo purposes, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been submitted.`);
        
        // Reset the form
        contactForm.reset();
    });
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would normally send the email to a server
        alert(`Thank you for subscribing with ${email}!`);
        
        // Reset the form
        this.reset();
    });
}

// Scroll to top button
const scrollBtn = document.createElement('div');
scrollBtn.className = 'scroll-top';
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            // Scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to elements when they come into view
const fadeElements = document.querySelectorAll('.about-content, .timeline-item, .video-item, .part-item, .gallery-item');

const fadeOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
};

const fadeObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        
        entry.target.classList.add('animate__animated', 'animate__fadeIn');
        fadeObserver.unobserve(entry.target);
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});
