// Navigation mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-text, .contact-item, .stat');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Initialiser les effets fluides pour mobile
    createFluidParticles();
    initRippleEffects();
});

// Effet fluide avec particules pour les services mobile
function createFluidParticles() {
    if (window.innerWidth > 768) return; // Seulement sur mobile
    
    const servicesSection = document.querySelector('.services');
    if (!servicesSection) return;
    
    // Créer des particules flottantes
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'fluid-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            background: linear-gradient(45deg, rgba(79, 195, 247, 0.3), rgba(129, 212, 250, 0.2));
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 15}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        servicesSection.appendChild(particle);
    }
}

// Animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(-20px, -30px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(30px, -20px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(-10px, 40px) scale(1.1);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// Effet de ripple au clic sur les cartes de service
function initRippleEffects() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(79, 195, 247, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 3;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Animation CSS pour l'effet ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialisation d'EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // À remplacer par votre clé publique EmailJS
})();

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validation basique
        if (!data.name || !data.email || !data.service || !data.message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Configuration EmailJS
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone || 'Non renseigné',
            service: data.service,
            message: data.message,
            to_email: 'contact@smartplombier.fr' // À changer par votre vraie adresse email
        };
        
        // Envoi de l'email
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                alert('Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Effet de parallaxe sur la section hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Compteur animé pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observer pour déclencher l'animation des compteurs
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text === '0') {
                    // Animation pour 0€ - commence à 100 et descend à 0
                    stat.textContent = '100€';
                    let count = 100;
                    const interval = setInterval(() => {
                        count -= 2;
                        stat.textContent = count + '€';
                        if (count <= 0) {
                            clearInterval(interval);
                            stat.textContent = '0€';
                        }
                    }, 20);
                } else if (text === '100%') {
                    // Animation pour 100%
                    stat.textContent = '0%';
                    let count = 0;
                    const interval = setInterval(() => {
                        count += 5;
                        stat.textContent = count + '%';
                        if (count >= 100) {
                            clearInterval(interval);
                            stat.textContent = '100%';
                        }
                    }, 30);
                } else if (text === '24/7') {
                    // Animation pour 24/7 - commence avec des chiffres aléatoires
                    const randomNumbers = ['12/5', '18/3', '6/9', '15/2', '8/4', '22/1', '3/6', '19/8', '7/11', '24/7'];
                    let index = 0;
                    const interval = setInterval(() => {
                        stat.textContent = randomNumbers[index];
                        index++;
                        if (index >= randomNumbers.length) {
                            clearInterval(interval);
                            stat.textContent = '24/7';
                        }
                    }, 150);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observer la section about pour les statistiques
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Effet de hover sur les cartes de service
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gestion du scroll de la navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animation des icônes au hover
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(10deg) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Gestion des erreurs de chargement des polices
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si les polices Google Fonts sont chargées
    if (document.fonts) {
        document.fonts.ready.then(() => {
            document.body.style.opacity = '1';
        });
    } else {
        document.body.style.opacity = '1';
    }
});

// Préchargement des images (si ajoutées plus tard)
function preloadImages() {
    const imageUrls = [
        // Ajouter ici les URLs des images à précharger
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Appeler la fonction de préchargement
preloadImages();

// Gestion de la performance
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Code à exécuter quand le navigateur est inactif
        console.log('Site Smart Plombier chargé avec succès !');
    });
} else {
    setTimeout(() => {
        console.log('Site Smart Plombier chargé avec succès !');
    }, 0);
}
