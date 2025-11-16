// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============ ACTIVE NAVIGATION LINK ============
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============ INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ============ SKILL BAR ANIMATION ============
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ============ CONTACT FORM SUBMISSION ============
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // Show success message (you would typically send this to a backend)
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// ============ PROJECT CARD CLICK ANIMATION ============
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ============ TYPING EFFECT FOR SUBTITLE (Optional Enhancement) ============
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}

// ============ SCROLL TO TOP FUNCTIONALITY ============
// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
});

// ============ PARALLAX EFFECT FOR HERO SECTION ============
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============ ANIMATE STATS COUNTERS ============
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card h3');
            
            statCards.forEach(stat => {
                const target = stat.textContent;
                
                // Only animate if it contains a number
                if (target.match(/\d+/)) {
                    const number = parseFloat(target);
                    const duration = 2000; // 2 seconds
                    const increment = number / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            stat.textContent = target;
                            clearInterval(timer);
                        } else {
                            // Format based on whether it's a decimal or integer
                            if (target.includes('.')) {
                                stat.textContent = current.toFixed(2);
                            } else {
                                stat.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                            }
                        }
                    }, 16);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe about section for stats animation
const aboutSection = document.getElementById('about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ============ DYNAMIC YEAR IN FOOTER ============
const footer = document.querySelector('footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Muthikella Srihari. All rights reserved.`;
}

// ============ CONSOLE LOG FOR DEVELOPERS ============
console.log('%c👋 Hello, Developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #764ba2; font-size: 14px;');
console.log('%cFeel free to reach out: sriharimuthikella@gmail.com', 'color: #ec4899; font-size: 12px;');