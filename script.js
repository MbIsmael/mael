document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > heroSection.offsetHeight * 0.1) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  
    // Mega menu functionality for mobile
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      if (item.querySelector('.mega-menu')) {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            const megaMenu = item.querySelector('.mega-menu');
            megaMenu.style.display = megaMenu.style.display === 'block' ? 'none' : 'block';
          }
        });
      }
    });
  
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
        }
      });
    });
  

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
      if (languageSelector) {
        languageSelector.classList.remove('open');
      }
    });
  
    // Animation on scroll initialization
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.logo-svg, .hero-title, .hero-subtitle, .hero-cta');
      
      elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    };
  
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.logo-svg, .hero-title, .hero-subtitle, .hero-cta');
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
  
    // Preloader (optional)
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
      <div class="preloader-content">
        <div class="preloader-spinner"></div>
        <div class="preloader-logo">
          <svg width="80" height="80" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
            <path class="logo-path" d="M20,10 L40,50 L60,10 L80,50 L100,10" stroke="#c8a97e" stroke-width="3" fill="none"/>
          </svg>
        </div>
      </div>
    `;
    
    document.body.prepend(preloader);
    
    window.addEventListener('load', function() {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
          preloader.remove();
        }, 600);
      }, 1000);
    });
  });






// script.js
(() => {
    const Luxora = {
      init() {
        this.cacheElements();
        this.bindEvents();
        this.initCounters();
      },
  
      cacheElements() {
        this.tabButtons   = document.querySelectorAll('.amenities-tabs .tab-btn');
        this.tabContents  = document.querySelectorAll('.amenities-tabs .tab-content');
        this.statNumbers  = document.querySelectorAll('.highlight-stats .stat-number');
      },
  
      bindEvents() {
        // Tab navigation
        this.tabButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            this.switchTab(e.currentTarget.dataset.tab);
          });
        });
      },
  
      switchTab(tabName) {
        // Remove active classes
        this.tabButtons.forEach(b => b.classList.remove('active'));
        this.tabContents.forEach(c => c.classList.remove('active'));
  
        // Activate selected
        const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        const content = document.getElementById(tabName);
        if (btn && content) {
          btn.classList.add('active');
          content.classList.add('active');
        }
      },
  
      initCounters() {
        if (!this.statNumbers.length) return;
  
        // Observe when stats enter viewport
        const observerOpts = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
              this.animateCount(entry.target);
              entry.target.dataset.counted = 'true';
            }
          });
        }, observerOpts);
  
        this.statNumbers.forEach(el => observer.observe(el));
      },
  
      animateCount(el) {
        const target = parseInt(el.textContent, 10);
        let count = 0;
        const duration = 2000;
        const stepTime = Math.max(Math.floor(duration / target), 20);
  
        el.textContent = '0';
        const timer = setInterval(() => {
          count += 1;
          el.textContent = count.toString();
          if (count >= target) clearInterval(timer);
        }, stepTime);
      }
    };
  
    document.addEventListener('DOMContentLoaded', () => Luxora.init());
  })();

  









  // Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});