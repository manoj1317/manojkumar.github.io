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
  '.skill-category, .project-card, .about-grid, .contact-grid, .section-header'
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

// ===== CONTACT FORM (Formspree) =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  const data = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      contactForm.reset();
    } else {
      btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try emailing directly.';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
  } catch {
    btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try emailing directly.';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
  }

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
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
