// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== TYPEWRITER EFFECT =====
const roles = [
  'DevOps Engineer',
  'Cloud Architect',
  'Kubernetes Expert',
  'CI/CD Specialist',
  'Infrastructure Automator',
  'Site Reliability Engineer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();

// ===== SCROLL FADE-IN ANIMATIONS =====
const fadeElements = document.querySelectorAll(
  '.skill-category, .project-card, .about-grid, .contact-grid, .section-header, .timeline-item'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--accent-primary)';
    }
  });
});

// ===== PARTICLE BACKGROUND =====
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 40;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  const size = Math.random() * 3 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 10;
  const opacity = Math.random() * 0.4 + 0.1;

  p.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: var(--accent-primary);
    border-radius: 50%;
    left: ${x}%;
    top: ${y}%;
    opacity: ${opacity};
    animation: particleFloat ${duration}s ${delay}s infinite ease-in-out alternate;
  `;
  particleContainer.appendChild(p);
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFloat {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(${rand(-30, 30)}px, ${rand(-30, 30)}px) scale(1.2); }
    66%  { transform: translate(${rand(-30, 30)}px, ${rand(-30, 30)}px) scale(0.8); }
    100% { transform: translate(${rand(-30, 30)}px, ${rand(-30, 30)}px) scale(1); }
  }
`;
document.head.appendChild(particleStyle);

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== CONTACT FORM (EmailJS) =====
emailjs.init({ publicKey: 'YOBG6p9B4rV9DPeEi' });

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  formSuccess.style.display = 'none';
  formError.style.display   = 'none';

  const templateParams = {
    name:    document.getElementById('name').value.trim(),
    email:   document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim() || 'Portfolio Contact',
    message: document.getElementById('message').value.trim()
  };

  emailjs.send('service_n7nidlw', 'template_jljen8f', templateParams)
    .then(function() {
      contactForm.reset();
      formSuccess.style.display = 'flex';
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(function() {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        formSuccess.style.display = 'none';
      }, 5000);
    }, function() {
      formError.style.display = 'flex';
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    });
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
