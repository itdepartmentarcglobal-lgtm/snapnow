document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.hamburger i');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and xmark
            if (navLinks.classList.contains('active')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-xmark');
                // Ensure hamburger is visible against white menu background
                hamburger.style.color = 'var(--dark)';
            } else {
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
                // Reset color based on scroll state
                if (!navbar.classList.contains('scrolled')) {
                    hamburger.style.color = 'var(--white)';
                } else {
                    hamburger.style.color = '';
                }
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
                
                if (!navbar.classList.contains('scrolled')) {
                    hamburger.style.color = 'var(--white)';
                } else {
                    hamburger.style.color = '';
                }
            }
        });
    });

    // Trigger Hero Animations on Load
    setTimeout(() => {
        document.querySelectorAll('.hero-slide-side').forEach(el => el.classList.add('visible'));
        document.querySelectorAll('.hero-fade').forEach(el => el.classList.add('visible'));
    }, 100);

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Horizontal Scroll for Gear Section (Optional enhancement)
    // We let the native CSS scroll do the work for touch, 
    // but we can add wheel event listener for horizontal scrolling on desktop
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    
    if (scrollContainer) {
        scrollContainer.addEventListener('wheel', (evt) => {
            // Prevent default vertical scroll and scroll horizontally instead
            // Only if we are hovering over the gear track and it overflows
            if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
                evt.preventDefault();
                scrollContainer.scrollLeft += evt.deltaY;
            }
        }, { passive: false });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for navbar
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Booking Form Logic
    const bookingForm = document.getElementById('bookingForm');
    const bookingFormTitle = document.getElementById('bookingFormTitle');
    const selectedPackageInput = document.getElementById('selectedPackage');

    document.querySelectorAll('a[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.textContent.trim();
            if (text.startsWith('Book ')) {
                e.preventDefault();
                let packageName = text.replace('Book ', '').trim();
                if (packageName === 'Now') packageName = 'a Session';
                
                if (bookingFormTitle) {
                    bookingFormTitle.textContent = 'Book ' + packageName;
                }
                if (selectedPackageInput) {
                    selectedPackageInput.value = packageName;
                }
                
                // Scroll to footer contact section smoothly
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    window.scrollTo({
                        top: contactSection.offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Focus on the first input
                    setTimeout(() => {
                        const nameInput = document.getElementById('name');
                        if (nameInput) nameInput.focus();
                    }, 800);
                }
            }
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pkg = selectedPackageInput ? selectedPackageInput.value : '';
            alert(`Thank you for your request to book ${pkg}! We will contact you soon.`);
            bookingForm.reset();
            if (bookingFormTitle) {
                bookingFormTitle.textContent = 'Book a Package';
            }
        });
    }

});
