// Function to generate and animate hero background shapes
function createHeroBackgroundShapes() {
    const bgContainer = document.getElementById('hero-background');
    if (!bgContainer) return;

    bgContainer.innerHTML = ''; // Clear old shapes

    const numShapes = 5; // A small number of large, soft shapes
    const shapeColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5']; // CSS classes for colors

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape', shapeColors[i % shapeColors.length]); // Assign a color class
        
        const size = Math.random() * 200 + 300; // Large shapes from 300px to 500px
        const initialX = Math.random() * 100 - 10; // Start slightly off-screen
        const initialY = Math.random() * 100 - 10; // Start slightly off-screen

        // Random animation properties for floating
        const animationDuration = Math.random() * 30 + 20; // 20-50 seconds for slow float
        const animationDelay = Math.random() * -animationDuration; // Start at various points in animation cycle
        const floatX = Math.random() * 100 - 50; // Float +/- 50px
        const floatY = Math.random() * 100 - 50; // Float +/- 50px

        shape.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${initialY}%;
            left: ${initialX}%;
            transform: translate(-50%, -50%); /* Center the shape */
            animation-duration: ${animationDuration}s;
            animation-delay: ${animationDelay}s;
            --x-start: ${initialX}%;
            --y-start: ${initialY}%;
            --x-float: ${floatX}px;
            --y-float: ${floatY}px;
            z-index: ${Math.floor(Math.random() * 3)}; /* Random z-index for layering */
        `;
        // Store initial position for parallax calculation
        shape.dataset.initialX = initialX;
        shape.dataset.initialY = initialY;
        shape.dataset.depth = i + 1; // Used for parallax effect, deeper layers move less

        bgContainer.appendChild(shape);
    }

    // Parallax effect on mouse move
    bgContainer.addEventListener('mousemove', (e) => {
        const rect = bgContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const moveX = (e.clientX - centerX) / (rect.width / 2); // -1 to 1
        const moveY = (e.clientY - centerY) / (rect.height / 2); // -1 to 1

        bgContainer.querySelectorAll('.shape').forEach(shape => {
            const depth = parseFloat(shape.dataset.depth);
            const parallaxStrength = 20 * depth; // Adjust strength based on depth

            const translateX = -moveX * parallaxStrength;
            const translateY = -moveY * parallaxStrength;

            // Apply parallax on top of current floating animation
            shape.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px)`;
        });
    });

    // Reset shapes when mouse leaves hero section
    bgContainer.addEventListener('mouseleave', () => {
        bgContainer.querySelectorAll('.shape').forEach(shape => {
            shape.style.transform = `translate(-50%, -50%)`; // Reset to floating only
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createHeroBackgroundShapes(); // Initialize the new hero background

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll using Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up-visible');
                observer.unobserve(entry.target);
            }
        });
    });
    document.querySelectorAll('.animate-fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        updateIcons();
    }

    function updateIcons() {
        if (document.documentElement.classList.contains('dark')) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    themeToggleBtn.addEventListener('click', toggleTheme);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    updateIcons();

    // Project Modal Functions
    const figmaModal = document.getElementById('figma-modal');
    const textModal = document.getElementById('text-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    function openFigmaModal(embedUrl) {
        document.getElementById('figma-iframe').src = embedUrl;
        figmaModal.classList.remove('hidden');
    }

    function openTextModal(text) {
        document.getElementById('text-modal-content').textContent = text;
        textModal.classList.remove('hidden');
    }

    function closeModal(modal) {
        modal.classList.add('hidden');
        if (modal === figmaModal) {
            document.getElementById('figma-iframe').src = ''; // Clear iframe src on close
        }
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(figmaModal);
            closeModal(textModal);
        });
    });

    // HIGHLIGHTS SECTION INTERACTIVITY (UNCHANGED)
    document.querySelectorAll('.sticky-note').forEach(card => {
        const rotation = Math.random() * 4 - 2; // -2deg to 2deg
        card.style.setProperty('--random-rotation', `${rotation}deg`);

        card.addEventListener('click', function() {
            document.querySelectorAll('.sticky-note').forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('is-popped');
                }
            });
            this.classList.toggle('is-popped');
        });
    });
});