// Loading Screen Handler
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const minLoadingTime = 3000; // Minimum 3 seconds
    let loadingStartTime = Date.now();
    let canHide = false;
    
    // Function to hide loading screen
    function hideLoadingScreen() {
        const elapsedTime = Date.now() - loadingStartTime;
        
        // If less than 3 seconds have passed, wait
        if (elapsedTime < minLoadingTime) {
            setTimeout(hideLoadingScreen, minLoadingTime - elapsedTime);
            return;
        }
        
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }
    }
    
    // Track image loading
    const heroImages = document.querySelectorAll('img');
    let imagesLoaded = 0;
    const totalImages = heroImages.length;
    
    if (totalImages === 0) {
        // If no images, hide after 3 seconds minimum
        setTimeout(hideLoadingScreen, minLoadingTime);
    } else {
        // Track image loading
        heroImages.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    // Check if we can hide (at least 3 seconds passed and images loaded)
                    if (Date.now() - loadingStartTime >= minLoadingTime) {
                        hideLoadingScreen();
                    }
                });
                img.addEventListener('error', () => {
                    imagesLoaded++;
                    // Check if we can hide (at least 3 seconds passed and images loaded)
                    if (Date.now() - loadingStartTime >= minLoadingTime) {
                        hideLoadingScreen();
                    }
                });
            }
        });
        
        // Fallback: hide after 5 seconds regardless
        setTimeout(() => {
            hideLoadingScreen();
        }, 5000);
        
        // Check if all images are already loaded
        if (imagesLoaded === totalImages && totalImages > 0) {
            setTimeout(hideLoadingScreen, minLoadingTime);
        }
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Link Highlighting
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Hero Section Mouse Tracking
const heroSection = document.querySelector('.hero');
if (heroSection) {
    document.addEventListener('mousemove', (e) => {
        const floatingElements = document.querySelectorAll('.floating-element');
        const blobs = document.querySelectorAll('.hero-blob');
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 5;
            const x = mouseX * speed;
            const y = mouseY * speed;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Gallery Data
const galleryData = [
    { id: 1, category: 'floors', title: 'Modern Epoxy Floor', image: 'pics/floors/3-2.jpg' },
    { id: 2, category: 'metallic', title: 'Metallic Gold Floor', image: 'pics/metallic/m1.jpg' },
    { id: 3, category: '3d', title: '3D Wave Design', image: 'pics/3d design/1.jpg' },
    { id: 4, category: 'tables', title: 'Resin Table Top', image: 'pics/table top/tt1.jpg' },
    { id: 5, category: 'doors', title: 'Artistic Door Design', image: 'pics/doors/d1.jpg' },
    { id: 6, category: 'floors', title: 'Minimalist Floor', image: 'pics/floors/360_f_633496779_wfgg0xig6gxjptrlnefucugqwzgb4dn4.jpg' },
    { id: 7, category: 'metallic', title: 'Silver Metallic', image: 'pics/metallic/m2.jpg' },
    { id: 8, category: '3d', title: '3D Galaxy Design', image: 'pics/3d design/3.jpg' },
    { id: 9, category: 'tables', title: 'Ocean Resin Table', image: 'pics/table top/tt2.jpg' },
    { id: 10, category: 'doors', title: 'Modern Door Art', image: 'pics/doors/d2.jpg' },
    { id: 11, category: 'floors', title: 'Luxury Floor', image: 'pics/floors/images.jpg' },
    { id: 12, category: 'metallic', title: 'Premium Metallic', image: 'pics/metallic/m3.jpg' },
];

// Initialize Gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    function renderGallery(filter = 'all') {
        galleryGrid.innerHTML = '';
        
        const filtered = filter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === filter);
        
        filtered.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.backgroundImage = `url('${item.image}')`;
            galleryItem.innerHTML = `
                <div class="gallery-item-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Initial render
    renderGallery('all');
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderGallery(filter);
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Allow Formspree to handle the submission
            // The form will submit to Formspree via the action attribute
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .service-card, .safety-card, .benefit-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initGallery();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
});

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Floating Action Buttons
const whatsappBtn = document.getElementById('whatsappBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');

// WhatsApp Button - Opens WhatsApp with message
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        const phoneNumber = '916200898957'; // Indian number
        const message = 'Hello! I am interested in your epoxy and resin design services.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Scroll to Top Button
if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
