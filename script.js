/* =========================================================
   PORTFOLIO JAVASCRIPT
   Subham Behera
   Java Full Stack Developer | DevOps Engineer
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initMobileMenu();

    initSmoothScroll();

    initActiveNavigation();

    initScrollHeader();

    initRevealAnimations();

    initCounters();

    initTypingEffect();

    initCursor();

    initPhotoTilt();

    initParticles();

    initProjectTilt();

    initContactForm();

    initBackToTop();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 500);

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");

    if (!menuBtn || !navLinks) return;


    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        document.body.classList.toggle(
            "menu-open"
        );


        const icon =
            menuBtn.querySelector("i");

        if (!icon) return;


        if (navLinks.classList.contains("open")) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    });


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                document.body.classList.remove(
                    "menu-open"
                );

                const icon =
                    menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            });

        });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(href);

            if (!target) return;


            event.preventDefault();


            const header =
                document.getElementById("header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (!sections.length) return;


    function updateActiveNav() {

        const scrollPosition =
            window.scrollY + 180;


        let currentSection = "";


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                currentSection =
                    section.id;

            }

        });


        navItems.forEach(item => {

            item.classList.remove(
                "active"
            );


            const href =
                item.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                item.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initScrollHeader() {

    const header =
        document.getElementById("header");

    if (!header) return;


    function checkHeader() {

        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        checkHeader,
        { passive: true }
    );


    checkHeader();

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    /*
       IMPORTANT:

       Make elements visible after JS starts.
       This prevents a broken observer from
       leaving the entire website invisible.
    */

    elements.forEach(element => {

        element.style.opacity = "1";

    });


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        /*
           Small delay allows the browser
           to paint the page correctly.
        */

        requestAnimationFrame(() => {

            element.style.opacity = "";

            observer.observe(element);

        });

    });

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) return;


    const animateCounter =
        counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            if (
                !Number.isFinite(target)
            ) {
                return;
            }


            let start = 0;

            const duration = 1400;

            const startTime =
                performance.now();


            function update(currentTime) {

                const progress =
                    Math.min(
                        (currentTime - startTime) /
                        duration,
                        1
                    );


                /*
                   Smooth ease-out
                */

                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const value =
                    Math.floor(
                        eased * target
                    );


                counter.textContent =
                    value;


                if (progress < 1) {

                    requestAnimationFrame(
                        update
                    );

                } else {

                    counter.textContent =
                        target;

                }

            }


            requestAnimationFrame(
                update
            );

        };


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(
            animateCounter
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .6
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   TYPING EFFECT
========================================================= */

function initTypingEffect() {

    const element =
        document.getElementById(
            "typingText"
        );


    if (!element) return;


    const words = [

        "Backend Developer",

        "Spring Boot Developer",

        "FullStack Engineer",

        "DevOps Engineer",

        "SQL Developer",

        "Cloud & CI/CD Enthusiast"

    ];


    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function type() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            characterIndex++;

        } else {

            characterIndex--;

        }


        element.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        let delay = deleting
            ? 45
            : 75;


        if (
            !deleting &&
            characterIndex ===
                currentWord.length
        ) {

            delay = 1700;

            deleting = true;

        }


        if (
            deleting &&
            characterIndex === 0
        ) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;

            delay = 450;

        }


        setTimeout(
            type,
            delay
        );

    }


    /*
       Start after initial page paint.
    */

    setTimeout(
        type,
        800
    );

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

    const dot =
        document.querySelector(
            ".cursor-dot"
        );

    const ring =
        document.querySelector(
            ".cursor-ring"
        );

    const glow =
        document.querySelector(
            ".cursor-glow"
        );


    if (
        !dot ||
        !ring ||
        !glow
    ) {
        return;
    }


    /*
       Disable on touch devices.
    */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    let mouseX = 0;

    let mouseY = 0;

    let ringX = 0;

    let ringY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;


            glow.style.left =
                `${mouseX}px`;

            glow.style.top =
                `${mouseY}px`;

        }
    );


    function animateRing() {

        ringX +=
            (mouseX - ringX) *
            .15;

        ringY +=
            (mouseY - ringY) *
            .15;


        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateRing
        );

    }


    animateRing();


    const interactive =
        document.querySelectorAll(
            "a, button, .project-card, .skill-item, .about-card"
        );


    interactive.forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {

                ring.style.width =
                    "48px";

                ring.style.height =
                    "48px";

                ring.style.borderColor =
                    "rgba(0,229,255,.9)";

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                ring.style.width =
                    "32px";

                ring.style.height =
                    "32px";

                ring.style.borderColor =
                    "rgba(0,229,255,.55)";

            }
        );

    });

}


/* =========================================================
   PHOTO 3D TILT
========================================================= */

function initPhotoTilt() {

    const photo =
        document.querySelector(
            ".photo-card"
        );


    const area =
        document.querySelector(
            ".hero-photo"
        );


    if (!photo || !area) return;


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    area.addEventListener(
        "mousemove",
        event => {

            const rect =
                area.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                8;


            const rotateX =
                ((centerY - y) /
                    centerY) *
                8;


            photo.style.transform =
                `translate(-50%, -50%)
                 perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.025)`;

        }
    );


    area.addEventListener(
        "mouseleave",
        () => {

            photo.style.transform =
                "translate(-50%, -50%)";

        }
    );

}


/* =========================================================
   PARTICLES
========================================================= */

function initParticles() {

    const container =
        document.getElementById(
            "particles"
        );


    if (!container) return;


    /*
       Don't create too many particles
       on mobile.
    */

    const isMobile =
        window.innerWidth < 700;


    const amount =
        isMobile ? 28 : 55;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.opacity =
            `${.15 + Math.random() * .6}`;


        particle.style.setProperty(
            "--duration",
            `${4 + Math.random() * 6}s`
        );


        particle.style.animationDelay =
            `${Math.random() * -8}s`;


        const size =
            1 + Math.random() * 2;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   PROJECT 3D TILT
========================================================= */

function initProjectTilt() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (!cards.length) return;


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y - rect.height / 2) /
                        rect.height) *
                    -4;


                const rotateY =
                    ((x - rect.width / 2) /
                        rect.width) *
                    4;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    const message =
        document.getElementById(
            "formMessage"
        );


    if (!form || !message) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                )?.value.trim();


            const email =
                document.getElementById(
                    "email"
                )?.value.trim();


            const subject =
                document.getElementById(
                    "subject"
                )?.value.trim();


            const body =
                document.getElementById(
                    "message"
                )?.value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !body
            ) {

                message.textContent =
                    "Please fill in all fields.";

                message.style.color =
                    "#ff6b6b";

                return;

            }


            /*
               Frontend-only contact behavior.

               Replace the email address below
               with your real email.
            */

            const destination =
                "your-email@example.com";


            const mailSubject =
                encodeURIComponent(
                    subject
                );


            const mailBody =
                encodeURIComponent(
                    `Name: ${name}\n\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${body}`
                );


            message.textContent =
                "Opening your email client...";

            message.style.color =
                "#4ee18e";


            window.location.href =
                `mailto:${destination}` +
                `?subject=${mailSubject}` +
                `&body=${mailBody}`;

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    function checkButton() {

        if (window.scrollY > 600) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        checkButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    checkButton();

}


/* =========================================================
   EXTRA: IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;


        if (
            element &&
            element.tagName === "IMG"
        ) {

            element.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%cSubham Behera",
    "color:#00e5ff;font-size:20px;font-weight:bold;"
);


console.log(
    "%cJava Full Stack Developer | DevOps Engineer",
    "color:#9b7cff;font-size:12px;"
);