// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = height > 0 ? (winScroll / height) * 100 + '%' : '0%';
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Case study page: show only the section matching the URL hash
function filterCaseStudy() {
    const hash = window.location.hash.slice(1);
    const sections = document.querySelectorAll('.case-study-section');
    const backLink = document.getElementById('caseStudyBackLink');

    if (!hash) {
        sections.forEach(s => s.classList.remove('case-study-hidden'));
        if (backLink) backLink.style.display = 'none';
        return;
    }

    sections.forEach(s => {
        s.classList.toggle('case-study-hidden', s.id !== hash);
    });
    if (backLink) backLink.style.display = 'inline-block';
}

if (document.querySelector('.case-studies-main')) {
    filterCaseStudy();
    window.addEventListener('hashchange', filterCaseStudy);
}

// Observe elements for animation with stagger for project cards
document.addEventListener('DOMContentLoaded', () => {
    const animateSections = document.querySelectorAll('.about .container, .contact .container');
    animateSections.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.querySelectorAll('.project-row').forEach(card => {
        const delay = card.dataset.delay !== undefined ? Number(card.dataset.delay) * 0.12 : 0;
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`;
        observer.observe(card);
    });
});



