/* =========================================================
   VIPM TECHJOURNEY
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".vipm-navbar");
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();

    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        link.classList.remove("active");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });


    /* =====================================================
       CLOSE MOBILE NAVBAR AFTER CLICK
    ===================================================== */

    const navbarCollapse = document.querySelector("#mainNavbar");
    const navigationLinks = document.querySelectorAll("#mainNavbar .nav-link");
    navigationLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (
                navbarCollapse.classList.contains("show")
            ) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    const scrollTopBtn = document.querySelector("#scrollTopBtn");
    const handleScrollTop = () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    };

    window.addEventListener("scroll", handleScrollTop);

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0, behavior: "smooth"});
        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.querySelector("#currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PHONE / WHATSAPP
    ===================================================== */

    const phoneNumber = "255786459085";
    const whatsappLinks =  document.querySelectorAll('a[href*="wa.me"]' );
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${phoneNumber}`;
    });


    /* =====================================================
       REDUCE ANIMATIONS FOR ACCESSIBILITY
    ===================================================== */

    const prefersReducedMotion = window.matchMedia( "(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = "auto";
        revealElements.forEach(element => {
            element.classList.add("show");
        });
    }
});