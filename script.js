// ============================================================================
// SISTEMA DE NOTIFICAÇÕES ELEGANTE
// ============================================================================
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notificationContainer');
        this.notifications = [];
    }

    show(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Ícones para cada tipo
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        notification.innerHTML = `
            <span class="notification-icon">${icons[type]}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        `;

        this.container.appendChild(notification);

        // Fechar notificação ao clicar no X
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.remove(notification);
        });

        // Auto-remover após duração
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }

        this.notifications.push(notification);
        return notification;
    }

    remove(notification) {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.remove();
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 4000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }
}

// Inicializar sistema de notificações
const notifier = new NotificationSystem();

// ============================================================================
// MENU MOBILE TOGGLE
// ============================================================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active");
    if (navMenu) navMenu.classList.remove("active");
}));

// ============================================================================
// SMOOTH SCROLLING PARA LINKS INTERNOS
// ============================================================================
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

// ============================================================================
// HEADER BACKGROUND ON SCROLL
// ============================================================================
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = "rgba(255, 255, 255, 0.98)";
            header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.boxShadow = "none";
        }
    }
});

// ============================================================================
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
// ============================================================================
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

// ============================================================================
// FORMULÁRIO DE CONTATO - ENVIO VIA WHATSAPP
// ============================================================================
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Obter valores dos campos
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();
        
        // Validações
        if (!name) {
            notifier.error("Por favor, preencha seu nome.");
            return;
        }
        
        if (!email) {
            notifier.error("Por favor, preencha seu email.");
            return;
        }
        
        if (!message) {
            notifier.error("Por favor, escreva uma mensagem.");
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            notifier.error("Por favor, insira um email válido.");
            return;
        }
        
        // Desabilitar botão e mostrar status
        const submitBtn = contactForm.querySelector("button[type=\"submit\"]");
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
        
        // Simular processamento
        setTimeout(() => {
            // Formatar mensagem para WhatsApp
            const whatsappMessage = `Olá Ricardo! 👋\n\nMeu nome é ${name}\nMeu email: ${email}\n\nMensagem:\n${message}`;
            
            // Codificar mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Número do WhatsApp (sem símbolos)
            const whatsappNumber = "5562994613564";
            
            // Criar URL do WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Mostrar notificação de sucesso
            notifier.success("Redirecionando para WhatsApp...", 3000);
            
            // Limpar formulário
            contactForm.reset();
            
            // Restaurar botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Abrir WhatsApp após um pequeno delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 500);
        }, 1500);
    });
}

// ============================================================================
// EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL
// ============================================================================
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

// ============================================================================
// ADICIONAR CLASSE ATIVA AO LINK DE NAVEGAÇÃO
// ============================================================================
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

// ============================================================================
// CONTADOR ANIMADO PARA AS ESTATÍSTICAS
// ============================================================================
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