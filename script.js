document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       SMOOTH SCROLLING
    =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ===============================
       SCROLL ANIMATIONS
    =============================== */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up-visible');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
        observer.observe(el);
    });

    /* ===============================
       DARK / LIGHT MODE TOGGLE
    =============================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function updateIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem(
            'theme',
            document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
        updateIcons();
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    updateIcons();

    /* ===============================
       PROJECT MODALS
    =============================== */
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
            document.getElementById('figma-iframe').src = '';
        }
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(figmaModal);
            closeModal(textModal);
        });
    });

    /* ===============================
       HIGHLIGHTS INTERACTION
    =============================== */
    document.querySelectorAll('.sticky-note').forEach(card => {
        const rotation = Math.random() * 4 - 2;
        card.style.setProperty('--random-rotation', `${rotation}deg`);

        card.addEventListener('click', function () {
            document.querySelectorAll('.sticky-note').forEach(other => {
                if (other !== this) {
                    other.classList.remove('is-popped');
                }
            });
            this.classList.toggle('is-popped');
        });
    });

});
