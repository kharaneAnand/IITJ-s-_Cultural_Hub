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

// Interactive Sword Image
document.addEventListener('DOMContentLoaded', function() {
    const swordImg = document.getElementById('sword-img');
    const partInfo = document.getElementById('part-info');
    const partName = document.getElementById('part-name');
    const partDescription = document.getElementById('part-description');
    const partDetails = document.getElementById('part-details');
    const partItems = document.querySelectorAll('.part-item');

    // Change from non-existent image path to your actual image
    if (swordImg) {
        swordImg.src = 'Images/sword.png'; 
    }
    
    // Create hotspot markers instead of using image map
    createHotspots();
    
    function createHotspots() {
        const hotspots = [
            { part: 'blade', top: '30%', left: '25%', title: 'Blade' },
            { part: 'hilt', top: '83%', left: '83%', title: 'Hilt' },
            { part: 'pommel', top: '89%', left: '91%', title: 'Pommel' },
            { part: 'guard', top: '78%', left: '84%', title: 'Guard' },
            { part: 'tip', top: '15%', left: '8%', title: 'Tip' }
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
                case 'blade':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> High-quality steel (wootz or Damascus steel)</li>
                            <li><strong>Length:</strong> Approximately 4 feet</li>
                            <li><strong>Weight:</strong> About 15 kg</li>
                            <li><strong>Feature:</strong> Double-edged design for versatile combat</li>
                        </ul>
                    `;
                    break;
                case 'hilt':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Hard wood wrapped in leather</li>
                            <li><strong>Length:</strong> Designed for two-handed grip</li>
                            <li><strong>Weight:</strong> About 5 kg</li>
                            <li><strong>Feature:</strong> Often decorated with Rajput insignia</li>
                        </ul>
                    `;
                    break;
                case 'pommel':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Heavy metal (often brass or iron)</li>
                            <li><strong>Function:</strong> Counterbalances the heavy blade</li>
                            <li><strong>Feature:</strong> Could be used as a striking weapon</li>
                        </ul>
                    `;
                    break;
                case 'guard':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Steel or iron</li>
                            <li><strong>Function:</strong> Protects hands from opposing blades</li>
                            <li><strong>Feature:</strong> Often intricately designed</li>
                        </ul>
                    `;
                    break;
                case 'tip':
                    details = `
                        <ul>
                            <li><strong>Design:</strong> Sharp pointed end</li>
                            <li><strong>Function:</strong> For thrusting attacks against armor</li>
                            <li><strong>Feature:</strong> Balanced for both cutting and thrusting</li>
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

// [Rest of your existing JavaScript remains exactly the same...]

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
        alert(`Thank you, ${name}! Your message has been submitted. We'll contact you soon.`);
        
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
        alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
        
        // Reset the form
        this.reset();
    });
}



// Function to play the video
function playVideo(index) {
    console.log(`Attempting to play video at index: ${index}`); // Debugging
    console.log(`Player object at index ${index}:`, players[index]); // Debugging
    if (players[index] && players[index].playVideo) {
        console.log("Player found, playing video..."); // Debugging
        players[index].playVideo();
    } else {
        console.error("Player not found or playVideo method not available."); // Debugging
    }
}

// Function to handle when the player is ready
function onPlayerReady(event) {
    console.log("YouTube player is ready", event.target); // Debugging
}

// Initialize YouTube players when the API is ready
window.onYouTubeIframeAPIReady = function () {
    console.log("YouTube IFrame API is ready"); // Debugging
    initYouTubePlayers();
};

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
const fadeElements = document.querySelectorAll('.about-content, .timeline-item, .video-item, .part-item');

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