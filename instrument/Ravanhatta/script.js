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

// Interactive Ravanhatta Image
document.addEventListener('DOMContentLoaded', function() {
    const ravanhattaImg = document.getElementById('ravanhatta-img');
    const partInfo = document.getElementById('part-info');
    const partName = document.getElementById('part-name');
    const partDescription = document.getElementById('part-description');
    const partDetails = document.getElementById('part-details');
    const partItems = document.querySelectorAll('.part-item');
    


    // Change from non-existent image path to your actual image
     if (ravanhattaImg) {
    ravanhattaImg.src = 'Images/image.png'; 
    }
    
    // Create hotspot markers instead of using image map
    createHotspots();
    
    function createHotspots() {
        const hotspots = [
            { part: 'sound-bowl', top: '30%', left: '85%', title: 'Sound Bowl' },
            { part: 'neck', top: '50%', left: '23%', title: 'Neck' },
            { part: 'tuning-pegs', top: '45%', left: '7%', title: 'Tuning Pegs' },
            { part: 'bridge', top: '42%', left: '67%', title: 'Bridge' },
            { part: 'strings', top: '38%', left: '50%', title: 'Strings' },
            { part: 'bow', top: '80%', left: '60%', title: 'Bow (Gaz)' }
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
                case 'sound-bowl':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Traditionally made from a coconut shell or hollowed wooden bowl</li>
                            <li><strong>Covering:</strong> Animal skin (usually goat)</li>
                            <li><strong>Function:</strong> Amplifies the sound created by the vibrating strings</li>
                        </ul>
                    `;
                    break;
                case 'neck':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Hard wood (often decorated with carvings)</li>
                            <li><strong>Length:</strong> Typically 2-3 feet</li>
                            <li><strong>Function:</strong> Supports the strings and allows for different notes to be played</li>
                        </ul>
                    `;
                    break;
                case 'tuning-pegs':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Wooden pegs</li>
                            <li><strong>Function:</strong> Adjusts the tension of strings to achieve proper tuning</li>
                            <li><strong>Operation:</strong> Turned clockwise to increase tension, counterclockwise to decrease</li>
                        </ul>
                    `;
                    break;
                case 'bridge':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Small piece of wood or bone</li>
                            <li><strong>Function:</strong> Transfers string vibrations to the sound bowl</li>
                            <li><strong>Placement:</strong> Sits on the skin-covered surface of the sound bowl</li>
                        </ul>
                    `;
                    break;
                case 'strings':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Originally gut or horsehair, modern versions use metal</li>
                            <li><strong>Number:</strong> 1-2 main playing strings plus several sympathetic strings</li>
                            <li><strong>Tuning:</strong> Typically tuned to match the vocal range of folk singers</li>
                        </ul>
                    `;
                    break;
                case 'bow':
                    details = `
                        <ul>
                            <li><strong>Material:</strong> Wooden arch with horsehair strung between the ends</li>
                            <li><strong>Technique:</strong> Pulled across the strings to create vibration</li>
                            <li><strong>Treatment:</strong> Often coated with rosin to create friction with strings</li>
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