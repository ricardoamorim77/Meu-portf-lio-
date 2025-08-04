// Menu mobile toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Smooth scrolling para links internos
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Header background on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "none";
    }
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".skill-card, .project-card, .stat, .contact-method");
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});

// Formulário de contato
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = contactForm.querySelector("button[type=\"submit\"]");
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Efeito de digitação no título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação quando a página carregar
window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Adicionar classe ativa ao link de navegação baseado na seção atual
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Adicionar estilo para link ativo
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Contador animado para as estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + "+";
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + "+";
        }
    }
    
    updateCounter();
}

// Observar estatísticas para animação de contador
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector("h3");
            const targetNumber = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetNumber);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat");
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

