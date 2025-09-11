// Toggle hamburger open/close

const menuButton = document.getElementById('menuButton');
const primaryNav = document.getElementById('primaryNav');


if (menuButton && primaryNav) {
    menuButton.addEventListener('click', () => {
        // toggle class on nav to show/hide
        primaryNav.classList.toggle('open');


        // update aria-expanded for accessibility
        const expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!expanded));


        // switch hamburger symbol to X when open
        menuButton.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
    });


    // Optional: if user resizes to large screen, ensure nav is visible and aria updated
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 700) {
            primaryNav.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.textContent = '☰';
        }
    });
}


// Footer dynamic values: copyright year and last modified
const yearSpan = document.getElementById('copyright-year');
const lastModSpan = document.getElementById('last-modified');


if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;