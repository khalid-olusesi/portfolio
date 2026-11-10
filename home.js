
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Update active class
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Default to light mode, switch to dark only if saved
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
} else {
  document.body.classList.add('light-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', (e) => {
  e.preventDefault();
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('portfolio-theme', 'light');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('portfolio-theme', 'dark');
  }
});

const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .gallery-item, .details, .about-me-div, .img-1-div, .contact-form-wrapper, .contact-cursive'
);

revealElements.forEach(el => el.classList.add('scroll-reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});


const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  const sendBtn = document.getElementById('send-btn');
  const formStatus = document.getElementById('form-status');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const name    = contactForm.querySelector('[name="name"]').value.trim();
    const email   = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body    = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      'Message:\n' + message
    );

    window.location.href =
      'mailto:olusesikhalid43@gmail.com?subject=' + subject + '&body=' + body;

    formStatus.className = 'form-status success';
    formStatus.textContent = '✓ Your mail app has opened — just hit Send!';
    contactForm.reset();

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      formStatus.style.transition = 'opacity 0.5s ease';
      formStatus.style.opacity = '0';
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        formStatus.style.opacity = '';
        formStatus.style.transition = '';
      }, 500);
    }, 3000);
  });
});

