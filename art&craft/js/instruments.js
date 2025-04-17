// Art and Culture data
const artAndCulture = [
    {
        id: 'ghoomar',
        name: 'Ghoomar Dance',
        description: 'Traditional Rajasthani folk dance performed by women, known for its graceful spinning movements',
        image: 'images/ghoomar.png',
        link: 'ghoomar.html',
        category: 'Dance',
        region: 'mewar',
        popularity: 95,
        cultural_significance: 9
    },
    {
        id: 'kalbelia',
        name: 'Kalbelia Dance',
        description: 'Snake charmer community dance with swirling movements resembling a serpent',
        image: 'images/kalbelia.png',
        link: 'kalbelia.html',
        category: 'Dance',
        region: 'jodhpur',
        popularity: 88,
        cultural_significance: 9
    },
    {
        id: 'miniature-painting',
        name: 'Rajasthani Miniature Painting',
        description: 'Intricate art form depicting royal courts, legends and love stories on small canvas',
        image: 'images/miniature.png',
        link: 'miniature.html',
        category: 'Art',
        region: 'udaipur',
        popularity: 85,
        cultural_significance: 10
    },
    {
        id: 'tie-dye',
        name: 'Bandhani (Tie-Dye)',
        description: 'Traditional textile art creating intricate patterns through tie-dye technique',
        image: 'images/bandhani.png',
        link: 'bandhani.html',
        category: 'Craft',
        region: 'jaipur',
        popularity: 90,
        cultural_significance: 8
    },
    {
        id: 'kathputli',
        name: 'Kathputli Puppetry',
        description: 'Traditional string puppet theatre telling folk tales and legends',
        image: 'images/kathputli.png',
        link: 'kathputli.html',
        category: 'Performance',
        region: 'jaipur',
        popularity: 87,
        cultural_significance: 9
    },
    {
        id: 'blue-pottery',
        name: 'Jaipur Blue Pottery',
        description: 'Distinctive ceramic art using Egyptian blue glaze technique',
        image: 'images/blue-pottery.png',
        link: 'blue-pottery.html',
        category: 'Craft',
        region: 'jaipur',
        popularity: 86,
        cultural_significance: 8
    },
    {
        id: 'Molela terracotta',
        name: 'Molela terracotta',
        description: 'Terracotta art form depicting deities and folk tales, unique to the Molela village',
        image: 'images/2.png',
        link: '/Molela_Terracotta/index.html',
        category: 'Art',
        region: 'rajsamand',
        popularity: 82,
        cultural_significance: 9
    },
    {
        id: 'theva',
        name: 'Theva Art',
        description: 'Unique jewelry craft combining gold work with glass',
        image: 'images/theva.png',
        link: 'theva.html',
        category: 'Craft',
        region: 'pratapgarh',
        popularity: 80,
        cultural_significance: 8
    },
    {
        id: 'phad',
        name: 'Phad Painting',
        description: 'Scroll paintings depicting folk tales and religious stories',
        image: 'images/phad.png',
        link: 'phad.html',
        category: 'Art',
        region: 'bhilwara',
        popularity: 83,
        cultural_significance: 9
    }
];

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
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

    // Create art and culture cards
    createArtCards(artAndCulture);

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

// Function to create art and culture cards
function createArtCards(artData) {
    const artGrid = document.getElementById('instrumentsGrid');
    if (!artGrid) return;
    
    artGrid.innerHTML = '';
    
    if (artData.length === 0) {
        artGrid.innerHTML = '<div class="no-results">No art forms match your criteria. Try adjusting your filters.</div>';
        return;
    }
    
    artData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'instrument-card';
        card.id = item.id;
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 4) * 100);
        
        card.innerHTML = `
            <div class="instrument-img-container">
                <img src="${item.image}" alt="${item.name}" class="instrument-img" onerror="this.src='images/default-art.png'">
                <span class="instrument-category">${item.category}</span>
            </div>
            <div class="instrument-info">
                <h3>${item.name} <i class="fas fa-palette"></i></h3>
                <p>${item.description}</p>
                <a href="${item.link}" class="learn-more">Discover More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('learn-more') && !e.target.parentElement.classList.contains('learn-more')) {
                window.location.href = item.link;
            }
        });
        
        artGrid.appendChild(card);
    });
}

// Function to filter art and culture
function filterArtForms() {
    const regionFilter = document.getElementById('regionFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredArt = artAndCulture.filter(item => {
        if (regionFilter !== 'all' && item.region !== regionFilter) {
            return false;
        }
        
        if (searchInput && !item.name.toLowerCase().includes(searchInput) && 
            !item.description.toLowerCase().includes(searchInput) &&
            !item.category.toLowerCase().includes(searchInput)) {
            return false;
        }
        
        return true;
    });
    
    filteredArt.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'popularity') {
            return b.popularity - a.popularity;
        } else if (sortBy === 'significance') {
            return b.cultural_significance - a.cultural_significance;
        }
        return 0;
    });
    
    createArtCards(filteredArt);
}

// Setup event listeners
function setupEventListeners() {
    const regionFilter = document.getElementById('regionFilter');
    const sortBy = document.getElementById('sortBy');
    const searchInput = document.getElementById('searchInput');
    const resetFilters = document.getElementById('resetFilters');
    
    if (regionFilter) regionFilter.addEventListener('change', filterArtForms);
    if (sortBy) sortBy.addEventListener('change', filterArtForms);
    if (searchInput) searchInput.addEventListener('input', filterArtForms);
    
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (regionFilter) regionFilter.value = 'all';
            if (sortBy) sortBy.value = 'name';
            if (searchInput) searchInput.value = '';
            filterArtForms();
        });
    }
    
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            if (searchInput) {
                searchInput.value = categoryName;
                filterArtForms();
                
                const artSection = document.getElementById('instrumentsGrid');
                if (artSection) {
                    artSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            alert('In a real application, this would load more art forms from the database.');
        });
    }
}

// Smooth scrolling
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

// Page transition
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-transition');
});
