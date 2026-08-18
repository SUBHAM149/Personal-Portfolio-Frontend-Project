
/* =========================================================
   SUBHAM PREMIUM PORTFOLIO
   ADVANCED JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   1. PAGE LOADER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.createElement("div");

    loader.id = "premiumLoader";

    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                Subham<span>.</span>
            </div>

            <div class="loader-line">
                <div class="loader-progress"></div>
            </div>

            <p>Loading experience...</p>
        </div>
    `;

    document.body.prepend(loader);

    setTimeout(() => {
        loader.classList.add("loader-hide");

        setTimeout(() => {
            loader.remove();
        }, 300);

    }, 700);

});


/* =========================================================
   2. TYPING ANIMATION
   ========================================================= */

const typingElement = document.querySelector(".typing");

const typingTexts = [
    "Frontend Developer",
    "Web Designer",
    "UI/UX Enthusiast",
    "Creative Developer",
    "JavaScript Developer"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {

    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (!deleting) {

        typingElement.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentText.length) {

            deleting = true;

            setTimeout(typeWriter, 1700);

            return;
        }

    } else {

        typingElement.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            textIndex++;

            if (textIndex >= typingTexts.length) {
                textIndex = 0;
            }
        }
    }

    setTimeout(
        typeWriter,
        deleting ? 45 : 90
    );
}

typeWriter();


/* =========================================================
   3. NAVBAR
   ========================================================= */

const header = document.querySelector(".header");

function updateNavbar() {

    if (!header) return;

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNavbar);


/* =========================================================
   4. MOBILE MENU
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            document.body.style.overflow = "hidden";

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            document.body.style.overflow = "";
        }

    });

}


/* Close mobile menu */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks?.classList.remove("open");

        const icon = menuBtn?.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        document.body.style.overflow = "";
    });

});


/* =========================================================
   5. ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveSection() {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 220;

        const height =
            section.offsetHeight;

        if (
            window.scrollY >= top &&
            window.scrollY < top + height
        ) {
            current = section.id;
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveSection
);


/* =========================================================
   6. SCROLL PROGRESS BAR
   ========================================================= */

const progressBar = document.createElement("div");

progressBar.id = "scrollProgress";

document.body.appendChild(progressBar);

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width =
        `${percentage}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress
);


/* =========================================================
   7. SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   8. STAGGER ANIMATION
   ========================================================= */

const grids = document.querySelectorAll(
    ".about-grid, .skill-box, .project-grid"
);

grids.forEach(grid => {

    const children =
        grid.children;

    Array.from(children).forEach(
        (child, index) => {

            child.style.transitionDelay =
                `${index * 0.08}s`;

        }
    );

});


/* =========================================================
   9. COUNTER ANIMATION
   ========================================================= */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;

function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );

        const duration = 1500;

        const startTime =
            performance.now();

        function update(time) {

            const progress =
                Math.min(
                    (time - startTime) /
                    duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            counter.textContent =
                Math.floor(
                    eased * target
                );

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target;
            }
        }

        requestAnimationFrame(update);

    });

}

const stats =
    document.querySelector(".stats");

if (stats) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0].isIntersecting
                ) {

                    animateCounters();

                    statsObserver.disconnect();
                }

            },
            {
                threshold: 0.5
            }
        );

    statsObserver.observe(stats);
}


/* =========================================================
   10. CUSTOM CURSOR
   ========================================================= */

const isTouchDevice =
    window.matchMedia(
        "(pointer: coarse)"
    ).matches;

if (!isTouchDevice) {

    const cursor =
        document.createElement("div");

    cursor.id = "premiumCursor";

    document.body.appendChild(cursor);


    const cursorDot =
        document.createElement("div");

    cursorDot.id =
        "premiumCursorDot";

    document.body.appendChild(cursorDot);


    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.12;

        cursorY +=
            (mouseY - cursorY) * 0.12;

        cursor.style.left =
            `${cursorX}px`;

        cursor.style.top =
            `${cursorY}px`;

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();


    /* Cursor hover */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .skill, .project-card"
        );

    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                cursor.classList.add(
                    "cursor-hover"
                );
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                cursor.classList.remove(
                    "cursor-hover"
                );
            }
        );

    });

}


/* =========================================================
   11. MOUSE GLOW
   ========================================================= */

const mouseGlow =
    document.createElement("div");

mouseGlow.id = "mouseGlow";

document.body.appendChild(mouseGlow);

if (!isTouchDevice) {

    window.addEventListener(
        "mousemove",
        event => {

            mouseGlow.style.left =
                `${event.clientX}px`;

            mouseGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   12. PROJECT 3D TILT
   ========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );

projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 800
            ) return;

            const rect =
                card.getBoundingClientRect();

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

            const rotateX =
                ((y - centerY) /
                    centerY) * -4;

            const rotateY =
                ((x - centerX) /
                    centerX) * 4;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                scale(1.01)
                `;

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


/* =========================================================
   13. BUTTON RIPPLE EFFECT
   ========================================================= */

document
    .querySelectorAll(".btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.className =
                    "button-ripple";

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${event.clientX -
                    rect.left -
                    size / 2}px`;

                ripple.style.top =
                    `${event.clientY -
                    rect.top -
                    size / 2}px`;

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

            }
        );

    });


/* =========================================================
   14. MAGNETIC BUTTONS
   ========================================================= */

document
    .querySelectorAll(".primary-btn")
    .forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) return;

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `
                    translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


/* =========================================================
   15. HERO PARALLAX
   ========================================================= */

const heroImage =
    document.querySelector(".hero-img");

if (heroImage && !isTouchDevice) {

    window.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 1000
            ) return;

            const x =
                (window.innerWidth / 2 -
                    event.clientX) / 70;

            const y =
                (window.innerHeight / 2 -
                    event.clientY) / 70;

            heroImage.style.transform =
                `
                translate(
                    ${x}px,
                    ${y}px
                )
                `;

        }
    );

}


/* =========================================================
   16. BACK TO TOP
   ========================================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);

backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   17. SMOOTH ANCHOR SCROLL
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const id =
                    anchor.getAttribute(
                        "href"
                    );

                if (
                    !id ||
                    id === "#"
                ) return;

                const target =
                    document.querySelector(
                        id
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   18. LAZY LOAD IMAGES
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.loading = "lazy";

        img.addEventListener(
            "load",
            () => {

                img.classList.add(
                    "image-loaded"
                );

            }
        );

    });


/* =========================================================
   19. IMAGE ERROR HANDLER
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.opacity = "0.4";

                console.warn(
                    "Image failed to load:",
                    img.src
                );

            }
        );

    });


/* =========================================================
   20. TOAST SYSTEM
   ========================================================= */

function showToast(
    message,
    type = "success"
) {

    const oldToast =
        document.querySelector(
            ".premium-toast"
        );

    if (oldToast) {
        oldToast.remove();
    }

    const toast =
        document.createElement("div");

    toast.className =
        `premium-toast ${type}`;

    const icon =
        type === "success"
            ? "fa-circle-check"
            : "fa-circle-info";

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add(
            "toast-show"
        );

    });

    setTimeout(() => {

        toast.classList.remove(
            "toast-show"
        );

        setTimeout(() => {
            toast.remove();
        }, 400);

    }, 3000);
}


/* =========================================================
   21. CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const button =
                contactForm.querySelector(
                    "button"
                );

            const original =
                button.innerHTML;

            button.disabled = true;

            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Sending...
            `;

            setTimeout(() => {

                button.innerHTML = `
                    <i class="fas fa-check"></i>
                    Message Sent!
                `;

                button.style.background =
                    "linear-gradient(135deg,#22c55e,#16a34a)";

                showToast(
                    "Your message has been sent successfully!",
                    "success"
                );

                contactForm.reset();

                setTimeout(() => {

                    button.innerHTML =
                        original;

                    button.style.background =
                        "";

                    button.disabled =
                        false;

                }, 2500);

            }, 1200);

        }
    );

}


/* =========================================================
   22. PROJECT PREVIEW MODAL
   ========================================================= */

const modal =
    document.createElement("div");

modal.className =
    "project-modal";

modal.innerHTML = `
    <div class="modal-backdrop"></div>

    <div class="modal-content">

        <button class="modal-close">
            <i class="fas fa-xmark"></i>
        </button>

        <img class="modal-image" src="" alt="Project Preview">

        <div class="modal-info">
            <span class="modal-number"></span>
            <h2 class="modal-title"></h2>
            <p class="modal-description"></p>
        </div>

    </div>
`;

document.body.appendChild(modal);


const modalClose =
    modal.querySelector(
        ".modal-close"
    );

const modalBackdrop =
    modal.querySelector(
        ".modal-backdrop"
    );

const modalImage =
    modal.querySelector(
        ".modal-image"
    );

const modalTitle =
    modal.querySelector(
        ".modal-title"
    );

const modalDescription =
    modal.querySelector(
        ".modal-description"
    );

const modalNumber =
    modal.querySelector(
        ".modal-number"
    );


function openProjectModal(card) {

    const image =
        card.querySelector(
            ".project-image img"
        );

    const title =
        card.querySelector(
            "h3"
        );

    const description =
        card.querySelector(
            ".project-content p"
        );

    const number =
        card.querySelector(
            ".project-number"
        );

    if (image) {
        modalImage.src =
            image.src;
    }

    if (title) {
        modalTitle.textContent =
            title.textContent;
    }

    if (description) {
        modalDescription.textContent =
            description.textContent;
    }

    if (number) {
        modalNumber.textContent =
            `PROJECT ${number.textContent}`;
    }

    modal.classList.add(
        "modal-show"
    );

    document.body.style.overflow =
        "hidden";
}


function closeProjectModal() {

    modal.classList.remove(
        "modal-show"
    );

    document.body.style.overflow =
        "";

}


projectCards.forEach(card => {

    const projectLink =
        card.querySelector(
            ".project-overlay a"
        );

    if (projectLink) {

        projectLink.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openProjectModal(card);

            }
        );

    }

});


modalClose.addEventListener(
    "click",
    closeProjectModal
);

modalBackdrop.addEventListener(
    "click",
    closeProjectModal
);


/* =========================================================
   23. ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProjectModal();

            navLinks?.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================================
   24. KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey ||
            event.metaKey ||
            event.altKey
        ) return;

        /* H = Home */

        if (
            event.key.toLowerCase() ===
            "h"
        ) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

        /* P = Projects */

        if (
            event.key.toLowerCase() ===
            "p"
        ) {

            document
                .querySelector("#projects")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }

        /* C = Contact */

        if (
            event.key.toLowerCase() ===
            "c"
        ) {

            document
                .querySelector("#contact")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);


/* =========================================================
   25. DYNAMIC PARTICLE BACKGROUND
   ========================================================= */

const canvas =
    document.createElement("canvas");

canvas.id =
    "particleCanvas";

document.body.prepend(canvas);

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 1.5 + 0.4;

        this.speedX =
            (Math.random() - 0.5) *
            0.3;

        this.speedY =
            (Math.random() - 0.5) *
            0.3;

        this.opacity =
            Math.random() *
            0.5 +
            0.1;
    }


    update() {

        this.x +=
            this.speedX;

        this.y +=
            this.speedY;

        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {
            this.speedX *= -1;
        }

        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {
            this.speedY *= -1;
        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(139,92,246,${this.opacity})`;

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 700
            ? 35
            : 80;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}

createParticles();

window.addEventListener(
    "resize",
    createParticles
);


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================================================
   26. PARTICLE CANVAS STYLE
   ========================================================= */

canvas.style.position =
    "fixed";

canvas.style.inset =
    "0";

canvas.style.width =
    "100%";

canvas.style.height =
    "100%";

canvas.style.pointerEvents =
    "none";

canvas.style.zIndex =
    "-4";


/* =========================================================
   27. FLOATING MOUSE GLOW
   ========================================================= */

mouseGlow.style.position =
    "fixed";

mouseGlow.style.width =
    "300px";

mouseGlow.style.height =
    "300px";

mouseGlow.style.borderRadius =
    "50%";

mouseGlow.style.pointerEvents =
    "none";

mouseGlow.style.transform =
    "translate(-50%, -50%)";

mouseGlow.style.background =
    "radial-gradient(circle, rgba(124,58,237,0.10), transparent 70%)";

mouseGlow.style.filter =
    "blur(20px)";

mouseGlow.style.zIndex =
    "-3";


/* =========================================================
   28. CURSOR STYLING
   ========================================================= */

const cursorStyle =
    document.createElement("style");

cursorStyle.textContent = `

    #premiumCursor {

        position: fixed;

        width: 32px;
        height: 32px;

        border: 1px solid
            rgba(139,92,246,0.6);

        border-radius: 50%;

        pointer-events: none;

        transform:
            translate(-50%, -50%);

        z-index: 99999;

        transition:
            width .25s ease,
            height .25s ease,
            background .25s ease;

    }

    #premiumCursorDot {

        position: fixed;

        width: 5px;
        height: 5px;

        border-radius: 50%;

        background: #ffffff;

        pointer-events: none;

        transform:
            translate(-50%, -50%);

        z-index: 100000;

    }

    #premiumCursor.cursor-hover {

        width: 55px;
        height: 55px;

        background:
            rgba(139,92,246,0.08);

        border-color:
            rgba(139,92,246,0.9);

    }


    #premiumLoader {

        position: fixed;

        inset: 0;

        background: #050505;

        display: flex;

        align-items: center;

        justify-content: center;

        z-index: 999999;

        transition:
            opacity .8s ease,
            visibility .8s ease;

    }

    #premiumLoader.loader-hide {

        opacity: 0;

        visibility: hidden;

    }

    .loader-content {

        width: 240px;

        text-align: center;

    }

    .loader-logo {

        font-size: 28px;

        font-weight: 800;

        margin-bottom: 25px;

    }

    .loader-logo span {

        color: #8b5cf6;

    }

    .loader-line {

        width: 100%;

        height: 2px;

        background:
            rgba(255,255,255,.08);

        overflow: hidden;

        border-radius: 20px;

    }

    .loader-progress {

        width: 0%;

        height: 100%;

        background:
            linear-gradient(
                90deg,
                #8b5cf6,
                #06b6d4
            );

        animation:
            loading 1.1s ease forwards;

    }

    .loader-content p {

        margin-top: 12px;

        color: #666;

        font-size: 10px;

        letter-spacing: 1px;

    }

    @keyframes loading {

        from {
            width: 0%;
        }

        to {
            width: 100%;
        }

    }


    #scrollProgress {

        position: fixed;

        top: 0;
        left: 0;

        width: 0%;

        height: 3px;

        background:
            linear-gradient(
                90deg,
                #8b5cf6,
                #06b6d4,
                #ec4899
            );

        z-index: 100000;

        box-shadow:
            0 0 12px
            rgba(139,92,246,.7);

    }


    .button-ripple {

        position: absolute;

        border-radius: 50%;

        background:
            rgba(255,255,255,.25);

        transform: scale(0);

        animation:
            rippleAnimation .6s linear;

        pointer-events: none;

    }

    @keyframes rippleAnimation {

        to {

            transform: scale(3);

            opacity: 0;

        }

    }


    .premium-toast {

        position: fixed;

        right: 25px;

        bottom: 25px;

        display: flex;

        align-items: center;

        gap: 12px;

        padding: 15px 18px;

        border-radius: 13px;

        color: white;

        background:
            rgba(18,18,22,.9);

        border:
            1px solid
            rgba(139,92,246,.3);

        backdrop-filter:
            blur(20px);

        box-shadow:
            0 20px 60px
            rgba(0,0,0,.5);

        transform:
            translateX(120%);

        opacity: 0;

        transition:
            .4s ease;

        z-index: 99998;

        font-size: 12px;

    }

    .premium-toast i {

        color: #22c55e;

        font-size: 17px;

    }

    .premium-toast.toast-show {

        transform:
            translateX(0);

        opacity: 1;

    }


    .project-modal {

        position: fixed;

        inset: 0;

        display: flex;

        align-items: center;

        justify-content: center;

        padding: 25px;

        opacity: 0;

        visibility: hidden;

        transition: .4s ease;

        z-index: 99997;

    }

    .project-modal.modal-show {

        opacity: 1;

        visibility: visible;

    }

    .modal-backdrop {

        position: absolute;

        inset: 0;

        background:
            rgba(0,0,0,.75);

        backdrop-filter:
            blur(15px);

    }

    .modal-content {

        position: relative;

        width: min(850px, 95vw);

        max-height: 90vh;

        overflow: auto;

        border-radius: 24px;

        background:
            #101014;

        border:
            1px solid
            rgba(255,255,255,.1);

        box-shadow:
            0 40px 100px
            rgba(0,0,0,.7);

        transform:
            translateY(30px)
            scale(.95);

        transition: .4s ease;

        z-index: 2;

    }

    .modal-show .modal-content {

        transform:
            translateY(0)
            scale(1);

    }

    .modal-close {

        position: absolute;

        top: 15px;
        right: 15px;

        width: 42px;
        height: 42px;

        border: 0;

        border-radius: 50%;

        color: white;

        background:
            rgba(0,0,0,.6);

        cursor: pointer;

        z-index: 5;

        font-size: 17px;

    }

    .modal-image {

        width: 100%;

        height: 400px;

        object-fit: cover;

        display: block;

    }

    .modal-info {

        padding: 30px;

    }

    .modal-number {

        color: #8b5cf6;

        font-size: 10px;

        font-weight: 700;

        letter-spacing: 3px;

    }

    .modal-title {

        margin: 8px 0;

        font-size: 28px;

    }

    .modal-description {

        color: #999;

        font-size: 13px;

        line-height: 1.8;

    }

    @media(max-width:700px) {

        #premiumCursor,
        #premiumCursorDot {

            display: none;

        }

        .modal-image {

            height: 230px;

        }

        .modal-info {

            padding: 22px;

        }

        .premium-toast {

            left: 15px;
            right: 15px;
            bottom: 15px;

        }

    }

`;


document.head.appendChild(
    cursorStyle
);


/* =========================================================
   29. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.title =
                "Come back soon 👋";

        } else {

            document.title =
                "Subham | Premium Portfolio";

        }

    }
);


/* =========================================================
   30. CONSOLE BRANDING
   ========================================================= */

console.log(
    "%c Subham Portfolio ",
    `
    background: linear-gradient(
        135deg,
        #8b5cf6,
        #06b6d4
    );
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    `
);

console.log(
    "%c Built with HTML + CSS + JavaScript 🚀 ",
    "color:#a78bfa;font-size:12px;"
);

