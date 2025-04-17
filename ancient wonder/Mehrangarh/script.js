// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-nav') && !event.target.closest('.mobile-menu-toggle')) {
            mobileNav.classList.remove('active');
        }
    });
    
    // Timeline.js initialization
    var timeline_json = {
        "title": {
            "text": {
                "headline": "Mehrangarh Fort History",
                "text": "A journey through time"
            }
        },
        "events": [
            {
                "start_date": {
                    "year": "1459"
                },
                "media": {
                    "url": "foundation.jpg",
                },
                "text": {
                    "headline": "Foundation by Rao Jodha",
                    "text": "Mehrangarh Fort was established by Rao Jodha, the 15th ruler of the Rathore clan, when he transferred his capital from Mandore to Jodhpur. According to legend, to build the fort, Rao Jodha had to displace a hermit called Cheeria Nathji, the lord of birds."
                }
            },
            {
                "start_date": {
                    "year": "1543"
                },
                "media": {
                    "url": "humayun.jpg",
                },
                "text": {
                    "headline": "Siege by Emperor Humayun",
                    "text": "The fort faced its first major military challenge when Mughal Emperor Humayun briefly captured Jodhpur. This event marked the beginning of a complex relationship between the Rathores and the Mughals that would shape the fort's development over the next centuries."
                }
            },
            {
                "start_date": {
                    "year": "1561"
                },
                "media": {
                    "url": "mota-raja.jpg",
                },
                "text": {
                    "headline": "Mota Raja Udai Singh's Expansion",
                    "text": "Rao Udai Singh, also known as Mota Raja (the Fat King), significantly expanded the fort during his reign. He built the Moti Mahal (Pearl Palace) and strengthened the fort's defenses. During this period, the Rathores formed an alliance with the Mughals, which brought relative peace and prosperity to the region."
                }
            },
            {
                "start_date": {
                    "year": "1678"
                },
                "media": {
                    "url": "aurangzeb.jpg",
                },
                "text": {
                    "headline": "Maharaja Jaswant Singh and Aurangzeb Era",
                    "text": "During the reign of Maharaja Jaswant Singh, relations with the Mughals deteriorated under Emperor Aurangzeb. After Jaswant Singh's death, Aurangzeb attempted to annex Marwar, leading to a 30-year war. The fort served as a crucial stronghold during this turbulent period."
                }
            },
            {
                "start_date": {
                    "year": "1707"
                },
                "media": {
                    "url": "ajit-singh.jpg",
                },
                "text": {
                    "headline": "Maharaja Ajit Singh's Reconstruction",
                    "text": "After reclaiming Jodhpur, Maharaja Ajit Singh undertook significant reconstruction of the fort, which had suffered damage during the wars. He built the Phool Mahal (Flower Palace), one of the most opulent halls in the fort, designed for private audiences and entertainment."
                }
            },
            {
                "start_date": {
                    "year": "1843"
                },
                "media": {
                    "url": "takhat-singh.jpg",
                },
                "text": {
                    "headline": "Golden Age Under Maharaja Takhat Singh",
                    "text": "This period saw the addition of several palaces and the fort reached its architectural zenith. Takhat Singh, who ruled from 1843-1873, added the Takhat Vilas, his personal chambers adorned with European clock faces and English calendar tiles, reflecting the growing Western influence in India."
                }
            },
            {
                "start_date": {
                    "year": "1947"
                },
                "media": {
                    "url": "modern-fort.jpg",
                },
                "text": {
                    "headline": "Modern Era and Conservation",
                    "text": "After India's independence in 1947, the royal family of Jodhpur converted part of the fort into a museum in 1972. The Mehrangarh Museum Trust now manages the fort and has undertaken extensive conservation efforts to preserve this historical treasure."
                }
            }
        ]
    };

    // Initialize the Timeline if the element exists
    if (document.getElementById('timeline-embed')) {
        window.timeline = new TL.Timeline('timeline-embed', timeline_json);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
