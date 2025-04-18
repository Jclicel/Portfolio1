// JavaScript for the portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.fixed-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)'; // Slightly transparent primary color
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'var(--primary-color)';
        }
    });
    
    // Animate skill bars on scroll
    const skillSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-level');
    
    // Store original widths
    const originalWidths = [];
    skillBars.forEach(bar => {
        originalWidths.push(bar.style.width);
        bar.style.width = '0';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate skill bars
    function animateSkillBars() {
        if (isInViewport(skillSection)) {
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = originalWidths[index];
                    bar.style.transition = 'width 1s ease-in-out';
                }, index * 100);
            });
            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
    
    // Add scroll listener for skill bars animation
    window.addEventListener('scroll', animateSkillBars);
    // Check on initial load as well
    animateSkillBars();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
