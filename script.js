// Dynamic Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close mobile menu if open

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(7, 9, 11, 0.9)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.03)';
        navbar.style.borderBottom = 'none';
    }
});

// Gallery Slider Manual & Automatic Controls
const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const wrapper = document.getElementById('sliderWrapper');

if(prevBtn && nextBtn && track && wrapper) {
    let autoScrollInterval;
    
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            const slide = track.querySelector('.slide-image');
            if(!slide) return;
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            const slideWidth = slide.clientWidth + gap;
            
            // If near end, jump to start (simple loop simulation)
            if (wrapper.scrollLeft + wrapper.clientWidth >= track.scrollWidth - slideWidth/2) {
                wrapper.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                wrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        }, 3000); // 3 seconds per slide
    };

    const resetAutoScroll = () => {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    };

    prevBtn.addEventListener('click', () => {
        const slide = track.querySelector('.slide-image');
        if(!slide) return;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        const slideWidth = slide.clientWidth + gap;
        
        // If at start, jump to end
        if (wrapper.scrollLeft <= 10) {
            wrapper.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            wrapper.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        }
        resetAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        const slide = track.querySelector('.slide-image');
        if(!slide) return;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        const slideWidth = slide.clientWidth + gap;
        
        // If near end, jump to start
        if (wrapper.scrollLeft + wrapper.clientWidth >= track.scrollWidth - slideWidth/2) {
            wrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            wrapper.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
        resetAutoScroll();
    });

    // Start auto scroll on load
    startAutoScroll();
    
    // Pause on hover
    wrapper.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    wrapper.addEventListener('mouseleave', startAutoScroll);
}

// Players Reviews Slider Manual & Automatic Controls
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsPrevBtn = document.getElementById('reviewPrevBtn');
const reviewsNextBtn = document.getElementById('reviewNextBtn');
const reviewsWrapper = document.getElementById('reviewsWrapper');

if(reviewsPrevBtn && reviewsNextBtn && reviewsTrack && reviewsWrapper) {
    let reviewsAutoScrollInterval;
    
    const startReviewsAutoScroll = () => {
        reviewsAutoScrollInterval = setInterval(() => {
            const card = reviewsTrack.querySelector('.review-card');
            if(!card) return;
            const gap = parseInt(window.getComputedStyle(reviewsTrack).gap) || 0;
            const cardWidth = card.clientWidth + gap;
            
            if (reviewsWrapper.scrollLeft + reviewsWrapper.clientWidth >= reviewsTrack.scrollWidth - cardWidth/2) {
                reviewsWrapper.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                reviewsWrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 4000); // 4 seconds per review
    };

    const resetReviewsAutoScroll = () => {
        clearInterval(reviewsAutoScrollInterval);
        startReviewsAutoScroll();
    };

    reviewsPrevBtn.addEventListener('click', () => {
        const card = reviewsTrack.querySelector('.review-card');
        if(!card) return;
        const gap = parseInt(window.getComputedStyle(reviewsTrack).gap) || 0;
        const cardWidth = card.clientWidth + gap;
        
        // If at start, jump to end
        if (reviewsWrapper.scrollLeft <= 10) {
            reviewsWrapper.scrollTo({ left: reviewsTrack.scrollWidth, behavior: 'smooth' });
        } else {
            reviewsWrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
        resetReviewsAutoScroll();
    });

    reviewsNextBtn.addEventListener('click', () => {
        const card = reviewsTrack.querySelector('.review-card');
        if(!card) return;
        const gap = parseInt(window.getComputedStyle(reviewsTrack).gap) || 0;
        const cardWidth = card.clientWidth + gap;
        
        // If near end, jump to start
        if (reviewsWrapper.scrollLeft + reviewsWrapper.clientWidth >= reviewsTrack.scrollWidth - cardWidth/2) {
            reviewsWrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            reviewsWrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
        resetReviewsAutoScroll();
    });

    startReviewsAutoScroll();
    
    reviewsWrapper.addEventListener('mouseenter', () => clearInterval(reviewsAutoScrollInterval));
    reviewsWrapper.addEventListener('mouseleave', startReviewsAutoScroll);
}

// --- Backend Configuration Simulation ---
// In a real application, this value would be fetched from an API or injected via a backend template engine.
const config = {
    isOfferActive: true // Set this to false to disable the 50% discount globally
};

// Pricing Offer Logic (Triggered on load based on config)
const applyPricingOffer = () => {
    const priceAmounts = document.querySelectorAll('.price-amount');
    const offerTag = document.getElementById('offerTag');
    
    if (config.isOfferActive) {
        if(offerTag) offerTag.style.display = 'block';
        
        priceAmounts.forEach(p => {
            p.classList.add('discounted');
            const card = p.closest('.price-card');
            if(card) card.classList.add('offer-active');
            
            const amountSpan = p.querySelector('.amount');
            const originalPrice = parseInt(amountSpan.getAttribute('data-original'));
            const newPrice = originalPrice * 0.5;
            
            // Add old price strike element
            let oldSpan = p.querySelector('.old-amount');
            if(!oldSpan) {
                oldSpan = document.createElement('span');
                oldSpan.className = 'old-amount';
                oldSpan.innerText = '₹' + originalPrice;
                p.insertBefore(oldSpan, p.firstChild);
            }
            
            amountSpan.innerText = newPrice;
        });
    } else {
        if(offerTag) offerTag.style.display = 'none';
        
        priceAmounts.forEach(p => {
            p.classList.remove('discounted');
            const card = p.closest('.price-card');
            if(card) card.classList.remove('offer-active');
            
            const amountSpan = p.querySelector('.amount');
            const originalPrice = amountSpan.getAttribute('data-original');
            
            const oldSpan = p.querySelector('.old-amount');
            if(oldSpan) oldSpan.remove();
            
            amountSpan.innerText = originalPrice;
        });
    }
};

// Run pricing logic on initialization
document.addEventListener('DOMContentLoaded', applyPricingOffer);
