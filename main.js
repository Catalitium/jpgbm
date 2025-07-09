// Matrix Rain Knowledge Portal - Enhanced JavaScript
// Features: Matrix rain animation, interactive elements, smooth transitions, mobile optimizations

let matrixActive = true;
let matrixCanvas = null;

window.addEventListener("DOMContentLoaded", () => {
  initializeMatrixRain();
  initializeInteractiveFeatures();
  addScrollAnimations();
  initializeQuickNav();
  initializeLanguageToggle();
});

function initializeMatrixRain() {
  matrixCanvas = document.getElementById("matrix-canvas");
  const ctx = matrixCanvas.getContext("2d");

  // Set canvas size
  function resizeCanvas() {
    matrixCanvas.height = window.innerHeight;
    matrixCanvas.width = window.innerWidth;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Matrix characters (mix of Japanese, Latin, and symbols)
  const letters = "アァイィウヴエカガキギクグケゲコゴサザシジスズセソタチッツトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+-=[]{}|;:,.<>?";
  const fontSize = 14;
  const columns = Math.floor(matrixCanvas.width / fontSize);
  const drops = Array.from({ length: columns }).fill(1);
  const speeds = Array.from({ length: columns }, () => Math.random() * 2 + 1);
  const opacities = Array.from({ length: columns }, () => Math.random() * 0.5 + 0.3);

  function draw() {
    if (!matrixActive) return;
    
    // Create fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    // Draw matrix characters
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      // Varying opacity for depth effect
      ctx.fillStyle = `rgba(0, 255, 0, ${opacities[i]})`;
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.fillText(text, x, y);

      // Reset drop when it goes off screen
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        speeds[i] = Math.random() * 2 + 1;
        opacities[i] = Math.random() * 0.5 + 0.3;
      }

      drops[i] += speeds[i] * 0.1;
    }
  }

  // Animation loop
  setInterval(draw, 35);
}

function initializeInteractiveFeatures() {
  // Add hover effects to knowledge cards
  const cards = document.querySelectorAll('.knowledge-card');
  
  cards.forEach((card, index) => {
    // Stagger animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Add click sound effect (optional)
    card.addEventListener('click', () => {
      addClickEffect(card);
    });
    
    // Add keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.querySelector('a').click();
      }
    });
    
    // Add touch feedback for mobile
    card.addEventListener('touchstart', () => {
      card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });

  // Add smooth scrolling for anchor links
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
}

function initializeQuickNav() {
  // Show/hide quick nav based on scroll position
  let lastScrollTop = 0;
  const quickNav = document.getElementById('quickNav');
  
  window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      quickNav.style.opacity = '1';
      quickNav.style.transform = 'translateY(0)';
    } else {
      quickNav.style.opacity = '0.7';
      quickNav.style.transform = 'translateY(-10px)';
    }
    
    lastScrollTop = scrollTop;
  }, 100));
  
  // Initial state
  quickNav.style.opacity = '0.7';
  quickNav.style.transform = 'translateY(-10px)';
  quickNav.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// Quick Navigation Functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Add visual feedback
  const btn = event.target;
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = '';
  }, 150);
}

function toggleMatrix() {
  matrixActive = !matrixActive;
  const btn = event.target;
  
  if (matrixActive) {
    btn.textContent = '🌊 Matrix';
    btn.style.borderColor = '#0f0';
    btn.style.color = '#0f0';
    showNotification('Matrix rain activated', 'success');
  } else {
    btn.textContent = '⏸️ Paused';
    btn.style.borderColor = '#ff0';
    btn.style.color = '#ff0';
    showNotification('Matrix rain paused', 'info');
  }
  
  // Add visual feedback
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = '';
  }, 150);
}

function sharePage() {
  const btn = event.target;
  
  if (navigator.share) {
    navigator.share({
      title: 'Matrix Rain Knowledge Portal',
      text: 'Explore AI, Automation, Chemistry, Databases, Engineering, and Mathematics',
      url: window.location.href
    }).then(() => {
      showNotification('Shared successfully!', 'success');
    }).catch(() => {
      showNotification('Share cancelled', 'info');
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(window.location.href).then(() => {
      showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
      showNotification('Failed to copy link', 'error');
    });
  }
  
  // Add visual feedback
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = '';
  }, 150);
}

// Footer Link Functions
function showAbout() {
  showNotification('About: Matrix Rain Knowledge Portal - A comprehensive learning platform', 'info');
}

function showContact() {
  showNotification('Contact: Reach out through our social channels', 'info');
}

function showPrivacy() {
  showNotification('Privacy: Your data is safe with us', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#0f0' : type === 'error' ? '#f00' : '#0ff'};
    color: #000;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    border: 1px solid ${type === 'success' ? '#0f0' : type === 'error' ? '#f00' : '#0ff'};
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function addClickEffect(element) {
  // Create ripple effect
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 255, 0, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `;
  
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  // Position ripple at click point
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function addScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for scroll animations
  document.querySelectorAll('.knowledge-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Language Toggle Functionality
function initializeLanguageToggle() {
  // Check if user has a language preference stored
  const currentLang = localStorage.getItem('matrix-rain-language') || 'en';
  updateLanguageButton(currentLang);
  
  // Add event listener to language toggle button
  const languageToggle = document.querySelector('.language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage);
    console.log('Language toggle event listener added'); // Debug log
  } else {
    console.log('Language toggle button not found'); // Debug log
  }
}

function toggleLanguage() {
  console.log('toggleLanguage function called'); // Debug log
  
  const currentLang = localStorage.getItem('matrix-rain-language') || 'en';
  const newLang = currentLang === 'en' ? 'es' : 'en';
  
  console.log('Current lang:', currentLang, 'New lang:', newLang); // Debug log
  
  // Store the language preference
  localStorage.setItem('matrix-rain-language', newLang);
  
  // Update the button
  updateLanguageButton(newLang);
  
  // Show notification
  const message = newLang === 'es' ? 'Cambiando a español...' : 'Switching to English...';
  showNotification(message, 'info');
  
  // Redirect to the appropriate language version
  setTimeout(() => {
    if (newLang === 'es') {
      console.log('Redirecting to Spanish version'); // Debug log
      window.location.href = 'index-es.html';
    } else {
      console.log('Redirecting to English version'); // Debug log
      window.location.href = 'index.html';
    }
  }, 1000);
}

function updateLanguageButton(lang) {
  const button = document.querySelector('.language-toggle');
  if (button) {
    const flagSpan = button.querySelector('.flag-emoji');
    if (flagSpan) {
      flagSpan.textContent = lang === 'es' ? '🇺🇸' : '🇪🇸';
    }
    button.title = lang === 'es' ? 'Change to English / Cambiar a inglés' : 'Cambiar idioma / Change language';
  }
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Make functions globally accessible
window.toggleLanguage = toggleLanguage;
window.scrollToTop = scrollToTop;
window.toggleMatrix = toggleMatrix;
window.sharePage = sharePage;
window.showAbout = showAbout;
window.showContact = showContact;
window.showPrivacy = showPrivacy;

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add error handling for broken links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const href = e.target.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http')) {
      // Add loading state
      e.target.style.opacity = '0.7';
      setTimeout(() => {
        e.target.style.opacity = '1';
      }, 1000);
    }
  }
});

// Mobile-specific optimizations
if ('ontouchstart' in window) {
  // Disable hover effects on touch devices
  document.body.classList.add('touch-device');
  
  // Add touch feedback for all interactive elements
  document.querySelectorAll('button, .knowledge-card').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}
