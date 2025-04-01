// Instrument data with enhanced properties
const instruments = [
    {
        id: 'ravanhatta',
        name: 'Ravanhatta',
        description: 'An ancient string instrument from Rajasthan, believed to be the predecessor of the violin',
        image: 'images/Ravanhatta.png',
        link: 'Ravanhatta/index.html',
        category: 'String',
        region: 'indian',
        popularity: 85,
        ancient: 10
    },
    {
        id: 'sitar',
        name: 'Sitar',
        description: 'A plucked stringed instrument used in Hindustani classical music, with a long, hollow neck',
        image: 'images/image.png',
        link: 'sitar.html',
        category: 'String',
        region: 'indian',
        popularity: 95,
        ancient: 7
    },
    {
        id: 'tabla',
        name: 'Tabla',
        description: 'A pair of twin hand drums from the Indian subcontinent, used in traditional, classical, and folk music',
        image: 'images/Tabla.png',
        link: 'tabla.html',
        category: 'Percussion',
        region: 'indian',
        popularity: 90,
        ancient: 8
    },
    {
        id: 'sarod',
        name: 'Sarod',
        description: 'A stringed instrument known for a deep, weighty, introspective sound with resonating metallic overtones',
        image: 'images/Sarod.png',
        link: 'sarod.html',
        category: 'String',
        region: 'indian',
        popularity: 80,
        ancient: 6
    },
    {
        id: 'sarangi',
        name: 'Sarangi',
        description: 'A bowed, short-necked string instrument from the Indian subcontinent which closely resembles human voice',
        image: 'images/Sarangi.png',
        link: 'sarangi.html',
        category: 'String',
        region: 'indian',
        popularity: 75,
        ancient: 7
    },
    {
        id: 'santoor',
        name: 'Santoor',
        description: 'A trapezoid-shaped hammered dulcimer often used in Hindustani classical music and Sufi music',
        image: 'images/Santoor.png',
        link: 'santoor.html',
        category: 'String',
        region: 'indian',
        popularity: 82,
        ancient: 6
    },
    {
        id: 'oud',
        name: 'Oud',
        description: 'A short-neck lute-type, pear-shaped stringed instrument with 11 or 13 strings, commonly used in Middle Eastern music',
        image: 'images/Oud.png',
        link: 'oud.html',
        category: 'String',
        region: 'middle-eastern',
        popularity: 88,
        ancient: 9
    },
    {
        id: 'darbuka',
        name: 'Darbuka',
        description: 'A goblet-shaped drum with a single head, used in Middle Eastern, North African and Turkish music',
        image: 'images/Durbuka.png',
        link: 'darbuka.html',
        category: 'Percussion',
        region: 'middle-eastern',
        popularity: 87,
        ancient: 8
    }
];

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Create instrument cards with enhanced UI
    createInstrumentCards(instruments);

    // Setup event listeners for filtering and searching
    setupEventListeners();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
});

// Function to create instrument cards with enhanced UI
function createInstrumentCards(instrumentsData) {
    const instrumentsGrid = document.getElementById('instrumentsGrid');
    if (!instrumentsGrid) return;
    
    // Clear grid
    instrumentsGrid.innerHTML = '';
    
    if (instrumentsData.length === 0) {
        instrumentsGrid.innerHTML = '<div class="no-results">No instruments match your criteria. Try adjusting your filters.</div>';
        return;
    }
    
    instrumentsData.forEach((instrument, index) => {
        // Create card element with animation delay
        const card = document.createElement('div');
        card.className = 'instrument-card';
        card.id = instrument.id;
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 4) * 100);
        
        // Create card content with enhanced UI
        card.innerHTML = `
            <div class="instrument-img-container">
                <img src="${instrument.image}" alt="${instrument.name}" class="instrument-img" onerror="this.src='/api/placeholder/400/320'">
                <span class="instrument-category">${instrument.category}</span>
            </div>
            <div class="instrument-info">
                <h3>${instrument.name} <i class="fas fa-star"></i></h3>
                <p>${instrument.description}</p>
                <a href="${instrument.link}" class="learn-more">Learn More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        // Add click event to the entire card
        card.addEventListener('click', function(e) {
            // If the click is not on the button itself
            if (!e.target.classList.contains('learn-more') && !e.target.parentElement.classList.contains('learn-more')) {
                window.location.href = instrument.link;
            }
        });
        
        // Add to grid
        instrumentsGrid.appendChild(card);
    });
}

// Function to filter instruments based on selected criteria
function filterInstruments() {
    const regionFilter = document.getElementById('regionFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter instruments
    let filteredInstruments = instruments.filter(instrument => {
        // Filter by region
        if (regionFilter !== 'all' && instrument.region !== regionFilter) {
            return false;
        }
        
        // Filter by search term
        if (searchInput && !instrument.name.toLowerCase().includes(searchInput) && 
            !instrument.description.toLowerCase().includes(searchInput) &&
            !instrument.category.toLowerCase().includes(searchInput)) {
            return false;
        }
        
        return true;
    });
    
    // Sort instruments
    filteredInstruments.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'popularity') {
            return b.popularity - a.popularity;
        } else if (sortBy === 'ancient') {
            return b.ancient - a.ancient;
        }
        return 0;
    });
    
    // Update the display
    createInstrumentCards(filteredInstruments);
}

// Setup event listeners for filters, search, etc.
function setupEventListeners() {
    // Region filter change
    const regionFilter = document.getElementById('regionFilter');
    if (regionFilter) {
        regionFilter.addEventListener('change', filterInstruments);
    }
    
    // Sort by change
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', filterInstruments);
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterInstruments);
    }
    
    // Reset filters button
    const resetFilters = document.getElementById('resetFilters');
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (regionFilter) regionFilter.value = 'all';
            if (sortBy) sortBy.value = 'name';
            if (searchInput) searchInput.value = '';
            filterInstruments();
        });
    }
    
    // Category buttons
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            if (searchInput) {
                searchInput.value = categoryName;
                filterInstruments();
                
                // Scroll to instruments section
                const instrumentsSection = document.getElementById('instrumentsGrid');
                if (instrumentsSection) {
                    instrumentsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Show success message (in real app, would send to server)
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more instruments from an API
            // For demo purposes, just show a message
            alert('In a real application, this would load more instruments from the database.');
        });
    }
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle page transitions with smooth animations
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-transition');
});