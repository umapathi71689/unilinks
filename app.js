(function(){
  const toast = document.getElementById('toastMsg');
  window.showToast = function(text){ if(toast){ toast.textContent=text; toast.style.opacity='1'; setTimeout(()=>{ toast.style.opacity='0'; },2500); } }

  // Theme Toggling logic (Default to Light, toggle to Dark)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  
  function updateThemeIcon(isDark) {
    [themeToggleBtn, mobileThemeToggleBtn].forEach(btn => {
      if (!btn) return;
      const icon = btn.querySelector('i');
      if (icon) {
        if (isDark) {
          icon.className = 'fas fa-sun';
        } else {
          icon.className = 'fas fa-moon';
        }
      }
    });
  }

  function updateThemeLogos(isDark) {
    const navLogo = document.querySelector('.nav-logo');
    const logoSrc = isDark ? 'logo-dark.png' : 'logo-light.png';
    if (navLogo) navLogo.src = logoSrc;
  }

  function updateThemeHeroImages(isDark) {
    const images = document.querySelectorAll('.image-slide');
    images.forEach((img, i) => {
      const imgNum = i + 1;
      img.src = isDark ? `fl${imgNum}_dark.png` : `fl${imgNum}_light.png`;
    });
  }

  function initBackgroundAnimation() {
    if (document.getElementById('bg-graphics-container')) return;

    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-graphics-container';
    bgContainer.className = 'bg-video';
    bgContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style="width:100%; height:100%; display:block;">
        <defs>
          <linearGradient id="bg-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="100%" stop-color="#e2e8f0" />
          </linearGradient>
          <linearGradient id="bg-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#070a13" />
            <stop offset="50%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#090d16" />
          </linearGradient>
          <linearGradient id="pulse-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(13, 148, 136, 0)" />
            <stop offset="50%" stop-color="rgba(13, 148, 136, 1)" />
            <stop offset="100%" stop-color="rgba(13, 148, 136, 0)" />
          </linearGradient>
          <linearGradient id="pulse-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(225, 29, 72, 0)" />
            <stop offset="50%" stop-color="rgba(225, 29, 72, 1)" />
            <stop offset="100%" stop-color="rgba(225, 29, 72, 0)" />
          </linearGradient>
        </defs>
        <rect id="bg-rect" width="100%" height="100%" fill="url(#bg-grad-light)" />
        <g id="bg-lines" stroke="currentColor" stroke-opacity="0.15" stroke-width="1.8" fill="none">
          <!-- Horizontal & Diagonal Grid paths -->
          <path d="M-100 150 L500 150 L650 300 L1200 300 L1350 450 L1600 450" />
          <path d="M-100 600 L300 600 L450 750 L900 750 L1050 900 L1600 900" />
          <path d="M1500 100 L1200 100 L1050 250 L400 250 L250 100 L-100 100" />
          <path d="M-100 400 L250 400 L400 550 L1150 550 L1300 700 L1600 700" />
          <path d="M-100 800 L600 800 L750 650 L1200 650 L1350 500 L1600 500" />
          <!-- Vertical & Step connection lines -->
          <path d="M200 -100 L200 400 L350 550 L350 900" />
          <path d="M1100 -100 L1100 300 L950 450 L950 1000" />
          <path d="M600 -100 L600 250 L750 400 L750 900" />
          <path d="M850 -100 L850 500 L700 650 L700 1000" />
          <path d="M1300 -100 L1300 350 L1150 500 L1150 1000" />
          <path d="M400 -100 L400 300 L250 450 L250 1000" />
        </g>
        <g fill="none" stroke-linecap="round">
          <!-- Pulse 1 -->
          <path d="M-100 150 L500 150 L650 300 L1200 300 L1350 450 L1600 450" stroke="url(#pulse-grad-1)" stroke-width="4.5" stroke-dasharray="200 1200" stroke-dashoffset="1400">
            <animate attributeName="stroke-dashoffset" values="1400;-400" dur="8s" repeatCount="indefinite" />
          </path>
          <!-- Pulse 2 -->
          <path d="M1500 100 L1200 100 L1050 250 L400 250 L250 100 L-100 100" stroke="url(#pulse-grad-2)" stroke-width="4.5" stroke-dasharray="250 1500" stroke-dashoffset="-1500">
            <animate attributeName="stroke-dashoffset" values="-1500;250" dur="11s" repeatCount="indefinite" />
          </path>
          <!-- Pulse 3 (Vertical) -->
          <path d="M200 -100 L200 400 L350 550 L350 900" stroke="url(#pulse-grad-1)" stroke-width="3.5" stroke-dasharray="150 1000" stroke-dashoffset="1150">
            <animate attributeName="stroke-dashoffset" values="1150;-150" dur="7s" repeatCount="indefinite" />
          </path>
          <!-- Pulse 4 -->
          <path d="M-100 400 L250 400 L400 550 L1150 550 L1300 700 L1600 700" stroke="url(#pulse-grad-2)" stroke-width="4" stroke-dasharray="180 1200" stroke-dashoffset="1380">
            <animate attributeName="stroke-dashoffset" values="1380;-180" dur="10s" repeatCount="indefinite" />
          </path>
          <!-- Pulse 5 (Vertical) -->
          <path d="M600 -100 L600 250 L750 400 L750 900" stroke="url(#pulse-grad-1)" stroke-width="3.5" stroke-dasharray="120 900" stroke-dashoffset="1020">
            <animate attributeName="stroke-dashoffset" values="1020;-120" dur="9s" repeatCount="indefinite" />
          </path>
        </g>
        <g fill="currentColor" fill-opacity="0.3">
          <circle cx="500" cy="150" r="5" />
          <circle cx="650" cy="300" r="5" />
          <circle cx="1200" cy="300" r="5" />
          <circle cx="300" cy="600" r="5" />
          <circle cx="450" cy="750" r="5" />
          <circle cx="900" cy="750" r="5" />
          <circle cx="1100" cy="300" r="5" />
          <circle cx="950" cy="450" r="5" />
          <circle cx="250" cy="400" r="5" />
          <circle cx="400" cy="550" r="5" />
          <circle cx="1150" cy="550" r="5" />
          <circle cx="600" cy="250" r="5" />
          <circle cx="750" cy="400" r="5" />
          <circle cx="700" cy="650" r="5" />
        </g>
      </svg>
    `;
    document.body.insertBefore(bgContainer, document.body.firstChild);
  }

  function updateThemeBackground(isDark) {
    const rect = document.getElementById('bg-rect');
    if (rect) {
      rect.setAttribute('fill', isDark ? 'url(#bg-grad-dark)' : 'url(#bg-grad-light)');
    }
    const svg = document.querySelector('#bg-graphics-container svg');
    if (svg) {
      svg.style.color = isDark ? '#ffffff' : '#0f172a';
    }
  }

  // Initial Theme Load: Default is Light (no class), Dark adds 'dark-theme'
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isInitiallyDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  
  initBackgroundAnimation();
  
  if (isInitiallyDark) {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
    updateThemeLogos(true);
    updateThemeHeroImages(true);
    updateThemeBackground(true);
  } else {
    document.body.classList.remove('dark-theme');
    updateThemeIcon(false);
    updateThemeLogos(false);
    updateThemeHeroImages(false);
    updateThemeBackground(false);
  }

  [themeToggleBtn, mobileThemeToggleBtn].forEach(btn => {
    btn?.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
      updateThemeLogos(isDark);
      updateThemeHeroImages(isDark);
      updateThemeBackground(isDark);
      showToast(isDark ? '🌙 Dark theme activated' : '☀️ Light theme activated');
    });
  });

  // Hamburger menu toggle logic
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navLinksWrapper = document.getElementById('navLinksWrapper');
  
  menuToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navLinksWrapper.classList.toggle('active');
    const icon = menuToggleBtn.querySelector('i');
    if (icon) {
      icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  // Close menu drawer when clicking outside nav container
  document.addEventListener('click', (e) => {
    if (navLinksWrapper && navLinksWrapper.classList.contains('active') && !e.target.closest('#main-nav')) {
      navLinksWrapper.classList.remove('active');
      const icon = menuToggleBtn?.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  });


  // Custom Cursor
  const dot = document.getElementById('cursor-dot'), ring = document.getElementById('cursor-ring');
  let mouseX=0,mouseY=0,ringX=0,ringY=0;
  document.addEventListener('mousemove', (e) => { mouseX=e.clientX; mouseY=e.clientY; if(dot){ dot.style.left=mouseX+'px'; dot.style.top=mouseY+'px'; } });
  function animateRing(){ ringX+=(mouseX-ringX)*0.12; ringY+=(mouseY-ringY)*0.12; if(ring){ ring.style.left=ringX+'px'; ring.style.top=ringY+'px'; } requestAnimationFrame(animateRing); }
  animateRing();

  // Scroll Progress & Nav
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if(progressBar) progressBar.style.width = scrolled + '%';
    const nav = document.getElementById('main-nav');
    if(nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Navigation click routing
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      const target = document.getElementById(section);
      if(target) { 
        target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
        navLinks.forEach(l => l.classList.remove('active')); 
        link.classList.add('active'); 
        showToast(`📡 ${section.charAt(0).toUpperCase() + section.slice(1)} section`); 
        
        // Auto-close menu drawer on mobile links click
        if (navLinksWrapper && navLinksWrapper.classList.contains('active')) {
          navLinksWrapper.classList.remove('active');
          const icon = menuToggleBtn?.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }
      }
    });
  });

  // Speed Marquee Generator and Click Handlers
  function renderSpeedMarquee() {
    const marquee = document.getElementById('speedMarquee');
    if (!marquee) return;

    // Get unique speed keys from plansDB
    const speeds = Object.keys(plansDB); // e.g. ["40 Mbps", "100 Mbps", "200 Mbps", "500 Mbps"]

    // Clear marquee
    marquee.innerHTML = '';

    // Create element and attach handler
    const createSpan = (speed) => {
      const span = document.createElement('span');
      span.innerHTML = `<i class="fas fa-bolt"></i> ${speed}`;
      span.style.cursor = 'pointer';
      span.addEventListener('click', () => {
        const plansSection = document.getElementById('plans');
        if (plansSection) {
          plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            if (typeof window.filterBySpeed === 'function') {
              window.filterBySpeed(speed);
            }
          }, 500);
        } else {
          window.location.href = `plans.html?speed=${encodeURIComponent(speed)}`;
        }
      });
      return span;
    };

    // Render twice to ensure seamless marquee scrolling effect
    speeds.forEach(speed => marquee.appendChild(createSpan(speed)));
    speeds.forEach(speed => marquee.appendChild(createSpan(speed)));
  }

  // Slideshow
  const textSlides = document.querySelectorAll('.hero-slide'), imgSlides = document.querySelectorAll('.image-slide');
  const slideCount = textSlides.length > 0 ? textSlides.length : imgSlides.length;
  if (slideCount > 0) {
    let slideIndex=0, slideTimer=null;
    function updateSlide(index){ 
      let newIdx=(index+slideCount)%slideCount; 
      slideIndex=newIdx; 
      textSlides.forEach((s,i)=>s.classList.toggle('active',i===newIdx)); 
      imgSlides.forEach((img,i)=>img.classList.toggle('active-img',i===newIdx)); 
      document.querySelectorAll('.unified-dot').forEach((dot,i)=>dot.classList.toggle('active-dot',i===newIdx)); 
    }
    function nextSlide(){ updateSlide(slideIndex+1); resetTimer(); }
    function prevSlide(){ updateSlide(slideIndex-1); resetTimer(); }
    function resetTimer(){ clearInterval(slideTimer); slideTimer=setInterval(nextSlide,6000); }
    function buildDots(){ 
      const container=document.getElementById('dotsContainer'); 
      if(!container) return; 
      container.innerHTML=''; 
      for(let i=0;i<slideCount;i++){ 
        const dot=document.createElement('div'); 
        dot.className='unified-dot'+(i===0?' active-dot':''); 
        dot.addEventListener('click',()=>{ updateSlide(i); resetTimer(); }); 
        container.appendChild(dot); 
      } 
    }
    buildDots();
    document.getElementById('prevSlideBtn')?.addEventListener('click',()=>{ prevSlide(); resetTimer(); });
    document.getElementById('nextSlideBtn')?.addEventListener('click',()=>{ nextSlide(); resetTimer(); });
    resetTimer();
  }

  let activeSpeed = '40 Mbps';
  let activeLocation = 'Tiruppur';

  function applyLocationOverrides(speed, variant) {
    const updated = { ...variant };

    if (speed === '30 Mbps' && variant.key === 'base') {
      if (activeLocation === 'Pollachi') {
        updated.monthly = 299;
        updated.quarterly = 897;
        updated.halfyearly = 1794;
        updated.yearly = 3588;
      } else {
        updated.monthly = 399;
        updated.quarterly = 1197;
        updated.halfyearly = 2394;
        updated.yearly = 4788;
      }
    }

    if (speed === '100 Mbps' && variant.key === 'base') {
      updated.name = activeLocation === 'Pollachi' ? '100 Mbps (2000GB FUP)' : '100 Mbps';
      updated.desc = activeLocation === 'Pollachi' ? '2000GB FUP' : 'Fast for families and streamers';
    }

    if (speed === '100 Mbps' && variant.key === 'ott') {
      if (activeLocation === 'Pollachi') {
        updated.name = '100 Mbps Unlimited';
        updated.desc = 'Unlimited data plan';
        updated.benefits = 'Unlimited Data + 24/7 Support';
        updated.monthly = 899;
        updated.quarterly = 2697;
        updated.halfyearly = 5394;
        updated.yearly = 10788;
      } else {
        updated.name = '100 Mbps + OTT';
        updated.desc = '100 Mbps + Entertainment';
        updated.benefits = 'Unlimited Data + OTT Apps';
        updated.monthly = 869;
        updated.quarterly = 2607;
        updated.halfyearly = 5214;
        updated.yearly = 10428;
      }
    }

    if (speed === '150 Mbps' && variant.key === 'base') {
      if (activeLocation === 'Pollachi') {
        updated.name = '150 Mbps Unlimited';
        updated.monthly = 1299;
        updated.quarterly = 3897;
        updated.halfyearly = 7794;
        updated.yearly = 15588;
      } else {
        updated.name = '150 Mbps';
        updated.monthly = 1099;
        updated.quarterly = 3297;
        updated.halfyearly = 6594;
        updated.yearly = 13188;
      }
    }

    return updated;
  }

  function normalizePlansJsonStructure(rawData) {
    const normalized = {};
    Object.entries(rawData).forEach(([speed, plan]) => {
      const variants = [];
      if (plan.base) {
        variants.push({
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: plan.base.name || plan.name || speed,
          desc: plan.base.desc || plan.desc || speed,
          benefits: plan.base.benefits || plan.benefits || 'Unlimited Data + 24/7 Support',
          locations: plan.base.locations || [],
          monthly: plan.base.monthly,
          quarterly: plan.base.quarterly,
          halfyearly: plan.base.halfyearly,
          yearly: plan.base.yearly
        });
      }
      if (plan.ott) {
        variants.push({
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: plan.ott.name || `${speed} + OTT`,
          desc: plan.ott.desc || plan.desc || `${speed} + Entertainment`,
          benefits: plan.ott.benefits || plan.benefits || 'Unlimited Data + OTT Apps',
          locations: plan.ott.locations || [],
          monthly: plan.ott.monthly,
          quarterly: plan.ott.quarterly,
          halfyearly: plan.ott.halfyearly,
          yearly: plan.ott.yearly
        });
      }
      if (plan.tv_ott) {
        variants.push({
          key: 'iptv',
          title: 'TV + OTT Bundle',
          icon: 'fa-tv',
          name: plan.tv_ott.name || `${speed} + TV + OTT`,
          desc: plan.tv_ott.desc || plan.desc || `${speed} + TV + OTT`,
          benefits: plan.tv_ott.benefits || plan.benefits || 'Unlimited Data + IPTV + OTT',
          locations: plan.tv_ott.locations || [],
          monthly: plan.tv_ott.monthly,
          quarterly: plan.tv_ott.quarterly,
          halfyearly: plan.tv_ott.halfyearly,
          yearly: plan.tv_ott.yearly
        });
      }
      normalized[speed] = {
        name: plan.name || speed,
        desc: plan.desc || '',
        benefits: plan.benefits || '',
        variants
      };
    });
    return normalized;
  }

  let plansDB = {
    '20 Mbps': {
      name: '20 Mbps',
      desc: 'Reliable everyday browsing',
      benefits: 'Unlimited Data + 24/7 Support',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: '20 Mbps',
          desc: 'Reliable everyday browsing',
          benefits: 'Unlimited Data + 24/7 Support',
          locations: ['Tiruppur'],
          monthly: 199,
          quarterly: 597,
          halfyearly: 1194,
          yearly: 2388
        },
        {
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: '20 Mbps + OTT',
          desc: '20 Mbps + Entertainment',
          benefits: 'Unlimited Data + OTT Apps',
          locations: ['Tiruppur'],
          monthly: 359,
          quarterly: 1077,
          halfyearly: 2154,
          yearly: 4308
        },
        {
          key: 'iptv',
          title: 'TV + OTT Bundle',
          icon: 'fa-tv',
          name: '20 Mbps + IPTV + OTT',
          desc: '20 Mbps + IPTV + OTT',
          benefits: 'Unlimited Data + IPTV + OTT',
          locations: ['Tiruppur'],
          monthly: null,
          quarterly: null,
          halfyearly: null,
          yearly: null
        }
      ]
    },
    '30 Mbps': {
      name: '30 Mbps',
      desc: 'Smooth streaming and video calls',
      benefits: 'Unlimited Data + 24/7 Support',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: '30 Mbps',
          desc: 'Smooth streaming and video calls',
          benefits: 'Unlimited Data + 24/7 Support',
          locations: ['Tiruppur', 'Pollachi'],
          monthly: activeLocation === 'Pollachi' ? 299 : 399,
          quarterly: activeLocation === 'Pollachi' ? 897 : 1197,
          halfyearly: activeLocation === 'Pollachi' ? 1794 : 2394,
          yearly: activeLocation === 'Pollachi' ? 3588 : 4788
        },
        {
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: activeLocation === 'Pollachi' ? '30 Mbps' : '30 Mbps + OTT',
          desc: activeLocation === 'Pollachi' ? 'Pollachi plan' : '30 Mbps + Entertainment',
          benefits: activeLocation === 'Pollachi' ? 'Unlimited Data + 24/7 Support' : 'Unlimited Data + OTT Apps',
          locations: ['Tiruppur'],
          monthly: 469,
          quarterly: 1407,
          halfyearly: 2814,
          yearly: 5628
        },
        {
          key: 'iptv',
          title: 'TV + OTT Bundle',
          icon: 'fa-tv',
          name: '30 Mbps + IPTV + OTT',
          desc: '30 Mbps + IPTV + OTT',
          benefits: 'Unlimited Data + IPTV + OTT',
          locations: ['Tiruppur'],
          monthly: 599,
          quarterly: null,
          halfyearly: null,
          yearly: null
        }
      ]
    },
    '50 Mbps': {
      name: '50 Mbps',
      desc: 'Better for multiple users',
      benefits: 'Unlimited Data + 24/7 Support',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: '50 Mbps',
          desc: activeLocation === 'Pollachi' ? 'Better for multiple users' : 'Balanced home and work usage',
          benefits: 'Unlimited Data + 24/7 Support',
          locations: ['Tiruppur', 'Pollachi'],
          monthly: activeLocation === 'Pollachi' ? 499 : 499,
          quarterly: activeLocation === 'Pollachi' ? 1497 : 1497,
          halfyearly: activeLocation === 'Pollachi' ? 2994 : 2994,
          yearly: activeLocation === 'Pollachi' ? 5988 : 5988
        },
        {
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: '50 Mbps + OTT',
          desc: '50 Mbps + Entertainment',
          benefits: 'Unlimited Data + OTT Apps',
          locations: ['Tiruppur'],
          monthly: 569,
          quarterly: 1707,
          halfyearly: 3414,
          yearly: 6828
        },
        {
          key: 'iptv',
          title: 'TV + OTT Bundle',
          icon: 'fa-tv',
          name: '50 Mbps + TV + OTT',
          desc: '50 Mbps + TV + OTT',
          benefits: 'Unlimited Data + IPTV + OTT',
          locations: ['Tiruppur'],
          monthly: 799,
          quarterly: null,
          halfyearly: null,
          yearly: null
        }
      ]
    },
    '75 Mbps': {
      name: '75 Mbps',
      desc: 'High-speed work and entertainment',
      benefits: 'Unlimited Data + HD Streaming',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: '75 Mbps',
          desc: activeLocation === 'Pollachi' ? 'High-speed work and entertainment' : 'High-speed work and entertainment',
          benefits: 'Unlimited Data + HD Streaming',
          locations: ['Tiruppur', 'Pollachi'],
          monthly: activeLocation === 'Pollachi' ? 599 : 599,
          quarterly: activeLocation === 'Pollachi' ? 1797 : 1797,
          halfyearly: activeLocation === 'Pollachi' ? 3594 : 3594,
          yearly: activeLocation === 'Pollachi' ? 7188 : 7188
        },
        {
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: '75 Mbps + OTT',
          desc: '75 Mbps + Entertainment',
          benefits: 'Unlimited Data + OTT Apps',
          locations: ['Tiruppur'],
          monthly: 669,
          quarterly: 2007,
          halfyearly: 4014,
          yearly: 8028
        },
        {
          key: 'iptv',
          title: 'TV + OTT Bundle',
          icon: 'fa-tv',
          name: '75 Mbps + TV + OTT',
          desc: '75 Mbps + TV + OTT',
          benefits: 'Unlimited Data + IPTV + OTT',
          locations: ['Tiruppur'],
          monthly: null,
          quarterly: null,
          halfyearly: null,
          yearly: null
        }
      ]
    },
    '100 Mbps': {
      name: '100 Mbps',
      desc: 'Fast for families and streamers',
      benefits: 'Unlimited Data + HD Streaming',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: activeLocation === 'Pollachi' ? '100 Mbps (2000GB FUP)' : '100 Mbps',
          desc: activeLocation === 'Pollachi' ? '2000GB FUP' : 'Fast for families and streamers',
          benefits: 'Unlimited Data + HD Streaming',
          locations: ['Tiruppur', 'Pollachi'],
          monthly: activeLocation === 'Pollachi' ? 799 : 799,
          quarterly: activeLocation === 'Pollachi' ? 2397 : 2397,
          halfyearly: activeLocation === 'Pollachi' ? 4794 : 4794,
          yearly: activeLocation === 'Pollachi' ? 9588 : 9588
        },
        {
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: activeLocation === 'Pollachi' ? '100 Mbps Unlimited' : '100 Mbps + OTT',
          desc: activeLocation === 'Pollachi' ? 'Unlimited data plan' : '100 Mbps + Entertainment',
          benefits: activeLocation === 'Pollachi' ? 'Unlimited Data + 24/7 Support' : 'Unlimited Data + OTT Apps',
          locations: ['Tiruppur', 'Pollachi'],
          monthly: activeLocation === 'Pollachi' ? 899 : 869,
          quarterly: activeLocation === 'Pollachi' ? 2697 : 2607,
          halfyearly: activeLocation === 'Pollachi' ? 5394 : 5214,
          yearly: activeLocation === 'Pollachi' ? 10788 : 10428
        },
        {
          key: 'iptv',
          title: 'TV + OTT Bundle',
          icon: 'fa-tv',
          name: '100 Mbps + TV + OTT',
          desc: '100 Mbps + TV + OTT',
          benefits: 'Unlimited Data + IPTV + OTT',
          locations: ['Tiruppur'],
          monthly: 999,
          quarterly: null,
          halfyearly: null,
          yearly: null
        }
      ]
    },
    '125 Mbps': {
      name: '125 Mbps',
      desc: 'High-capacity plan for power users',
      benefits: 'Unlimited Data + 24/7 Support',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: '125 Mbps Unlimited',
          desc: 'High-capacity plan for power users',
          benefits: 'Unlimited Data + 24/7 Support',
          locations: ['Pollachi'],
          monthly: 999,
          quarterly: 2997,
          halfyearly: 5994,
          yearly: 11988
        }
      ]
    },
    '150 Mbps': {
      name: '150 Mbps',
      desc: 'Premium performance for heavy usage',
      benefits: 'Unlimited Data + 24/7 Support',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: activeLocation === 'Pollachi' ? '150 Mbps Unlimited' : '150 Mbps',
          desc: activeLocation === 'Pollachi' ? 'Premium performance for heavy usage' : 'Premium performance for heavy usage',
          benefits: 'Unlimited Data + 24/7 Support',
          locations: ['Tiruppur', 'Pollachi'],
          monthly: activeLocation === 'Pollachi' ? 1299 : 1099,
          quarterly: activeLocation === 'Pollachi' ? 3897 : 3297,
          halfyearly: activeLocation === 'Pollachi' ? 7794 : 6594,
          yearly: activeLocation === 'Pollachi' ? 15588 : 13188
        },
        {
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: '150 Mbps + OTT',
          desc: '150 Mbps + Entertainment',
          benefits: 'Unlimited Data + OTT Apps',
          locations: ['Tiruppur'],
          monthly: 1169,
          quarterly: 3507,
          halfyearly: 7014,
          yearly: 14028
        }
      ]
    },
    '200 Mbps': {
      name: '200 Mbps',
      desc: 'Pro gaming and smooth 4K streaming',
      benefits: 'Unlimited Data + 4K Streaming',
      variants: [
        {
          key: 'base',
          title: 'Fiber Essential',
          icon: 'fa-tower-cell',
          name: '200 Mbps',
          desc: 'Pro gaming and smooth 4K streaming',
          benefits: 'Unlimited Data + 4K Streaming',
          locations: ['Tiruppur'],
          monthly: 1299,
          quarterly: 3897,
          halfyearly: 7794,
          yearly: 15588
        },
        {
          key: 'ott',
          title: 'Premium OTT Bundle',
          icon: 'fa-film',
          name: '200 Mbps + OTT',
          desc: '200 Mbps + Entertainment',
          benefits: 'Unlimited Data + OTT Apps',
          locations: ['Tiruppur'],
          monthly: 1369,
          quarterly: 4107,
          halfyearly: 8214,
          yearly: 16428
        }
      ]
    }
  };
  
  let config = {
    whatsappNumber: "919787262228",
    whatsappGeneralText: "Hello Unilink! I am interested in your broadband services.",
    whatsappEnquiryText: "Hello Unilink! I am interested in your internet plan:\n- Plan: {plan}\n- Name: {name}\n- Mobile: {mobile}\n- Address: {address}",
    facebookPage: "https://www.facebook.com",
    instagramPage: "https://www.instagram.com",
    twitterPage: "https://www.twitter.com"
  };

  async function loadConfig() {
    if (window.location.protocol === 'file:') {
      console.log('Running locally via file:// protocol. Skipping config.json fetch to avoid CORS errors.');
      updateConfiguredLinks();
      return;
    }
    try {
      const response = await fetch('config.json');
      if (response.ok) {
        config = await response.json();
        console.log('Loaded config successfully', config);
      }
    } catch (e) {
      console.warn('Could not load config.json (using default local config)', e);
    }
    updateConfiguredLinks();
  }

  function updateConfiguredLinks() {
    // 1. WhatsApp links
    const whatsappUrls = document.querySelectorAll('a[href*="wa.me"], [data-social="whatsapp"]');
    whatsappUrls.forEach(el => {
      try {
        const currentUrl = new URL(el.href);
        const currentText = currentUrl.searchParams.get('text');
        const defaultText = currentText || config.whatsappGeneralText || "Hello Unilink! I am interested in your broadband services.";
        el.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
      } catch (e) {
        el.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappGeneralText || "Hello Unilink! I am interested in your broadband services.")}`;
      }
    });

    // 2. Facebook links
    const facebookLinks = document.querySelectorAll('a[href*="facebook.com"], a[class*="facebook"], [data-social="facebook"]');
    facebookLinks.forEach(el => { if(el.tagName === 'A') el.href = config.facebookPage; });

    // 3. Instagram links
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"], a[class*="instagram"], [data-social="instagram"]');
    instagramLinks.forEach(el => { if(el.tagName === 'A') el.href = config.instagramPage; });

    // 4. Twitter links
    const twitterLinks = document.querySelectorAll('a[href*="twitter.com"], a[class*="twitter"], [data-social="twitter"]');
    twitterLinks.forEach(el => { if(el.tagName === 'A') el.href = config.twitterPage; });
    
    // 5. Visible WhatsApp Numbers (contact page text support)
    const whatsappTexts = document.querySelectorAll('.support-whatsapp-number, .contact-link-number');
    whatsappTexts.forEach(el => {
      const cleanNum = config.whatsappNumber.slice(-10);
      el.textContent = cleanNum;
    });

    // Fallback search for old contact page markup span
    const whatsappSpans = document.querySelectorAll('.contact-detail span');
    whatsappSpans.forEach(span => {
      if (span.innerHTML.includes('WhatsApp:')) {
        span.innerHTML = `<strong>WhatsApp:</strong> ${config.whatsappNumber}`;
      }
    });
  }

  // Modal Logic
  const modal = document.getElementById('enquiryModal');
  const modalPlanName = document.getElementById('modalPlanName');
  const closeBtn = document.getElementById('closeModalBtn');
  let selectedPlanName = "";

  window.openEnquiryModal = function(planName) {
    selectedPlanName = planName;
    if (modalPlanName) modalPlanName.textContent = planName;
    if (modal) {
      modal.classList.add('active');
      document.getElementById('enquiryForm')?.reset();
    }
  };

  window.closeEnquiryModal = function() {
    if (modal) modal.classList.remove('active');
  };

  closeBtn?.addEventListener('click', window.closeEnquiryModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) window.closeEnquiryModal();
  });

  window.submitEnquiryForm = function(event) {
    event.preventDefault();
    const name = document.getElementById('usrName').value.trim();
    const mobile = document.getElementById('usrMobile').value.trim();
    const address = document.getElementById('usrAddress').value.trim();

    if (!name || !mobile || !address) {
      showToast('⚠️ Please fill in all fields!');
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      showToast('⚠️ Please enter a valid 10-digit mobile number!');
      return;
    }

    const textTemplate = config.whatsappEnquiryText || "Hello Unilink! I am interested in your internet plan:\n- Plan: {plan}\n- Name: {name}\n- Mobile: {mobile}\n- Address: {address}";
    const formattedText = textTemplate
      .replace('{plan}', selectedPlanName)
      .replace('{name}', name)
      .replace('{mobile}', mobile)
      .replace('{address}', address);

    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(formattedText)}`;
    window.open(whatsappUrl, '_blank');

    window.closeEnquiryModal();
    showToast('✅ Redirecting to WhatsApp enquiry...');
  };

  function renderPlansForSpeed(speed) {
    activeSpeed = speed;
    updateActiveSpeedTab(speed);
    const container = document.getElementById('planCards');
    if (!container) return;
    container.innerHTML = '';

    const data = plansDB[speed];
    if (!data) return;

    const availableVariants = (data.variants || [])
      .map(variant => applyLocationOverrides(speed, variant))
      .filter(variant => {
        const locations = variant.locations || [];
        return locations.includes(activeLocation);
      });

    if (!availableVariants.length) {
      container.innerHTML = `
        <div class="plan-card">
          <div class="plan-header">
            <div class="plan-name">${speed}</div>
            <p class="plan-desc">This plan is not currently available in ${activeLocation}.</p>
          </div>
        </div>`;
      return;
    }

    availableVariants.forEach((variant, index) => {
      const card = document.createElement('div');
      card.className = 'plan-card';
      const isPopular = speed === '100 Mbps' && variant.key === 'base';
      const isBestValue = speed === '150 Mbps' && variant.key === 'ott';
      if (isPopular || isBestValue) {
        card.innerHTML = `<div class="popular-badge">${isBestValue ? '🔥 BEST VALUE' : '🔥 POPULAR'}</div>`;
      }

      const isUnavailable = variant.monthly == null && variant.quarterly == null && variant.halfyearly == null && variant.yearly == null;
      const durations = [
        { key: 'monthly', name: 'Monthly', months: 1 },
        { key: 'quarterly', name: 'Quarterly', months: 3 },
        { key: 'halfyearly', name: 'Half-Yearly', months: 6 },
        { key: 'yearly', name: 'Yearly', months: 12 }
      ];

      let cardHTML = `
        <div class="plan-header">
          <div class="plan-type"><i class="fas ${variant.icon || 'fa-tower-cell'}"></i> ${variant.title || 'Fiber Plan'}</div>
          <div class="plan-name">${variant.name || speed}</div>
          <p class="plan-desc">${variant.desc || data.desc}</p>
        </div>
        <div class="plan-body">
          <div class="plan-benefits-text">
            <i class="fas fa-check-circle" style="color:var(--primary); margin-right:6px;"></i> ${variant.benefits || data.benefits}
          </div>
          <div class="duration-selector">`;

      durations.forEach((dur, durIndex) => {
        const price = variant[dur.key];
        const defaultChecked = durIndex === 0;
        const safePrice = price == null ? null : Number(price);
        const isAvailablePrice = safePrice != null && !Number.isNaN(safePrice);

        let priceHTML = '';
        if (isAvailablePrice) {
          const pricePerMonth = Math.round(safePrice / dur.months).toLocaleString('en-IN');
          priceHTML = `
            <div class="duration-info">
              <div class="duration-details">
                <div class="duration-name-wrap">
                  <span class="duration-name">${dur.name}</span>
                </div>
                <span class="duration-price-per-mo">₹${pricePerMonth}/mo</span>
              </div>
              <div class="duration-total-price-wrap">
                <span class="duration-total-price">₹${safePrice.toLocaleString('en-IN')}</span>
              </div>
            </div>`;
        } else {
          priceHTML = `
            <div class="duration-info">
              <div class="duration-details">
                <div class="duration-name-wrap">
                  <span class="duration-name">${dur.name}</span>
                </div>
                <span class="duration-price-per-mo">Not available</span>
              </div>
              <div class="duration-total-price-wrap">
                <span class="duration-total-price">—</span>
              </div>
            </div>`;
        }

        cardHTML += `
          <div class="duration-option ${defaultChecked && isAvailablePrice ? 'selected' : ''}" onclick="selectDurationOption(this, '${speed}', '${variant.key}', '${dur.key}')">
            <input type="radio" class="duration-radio" name="duration-${speed}-${variant.key}" value="${dur.key}" ${defaultChecked && isAvailablePrice ? 'checked' : ''} style="display:none;" />
            ${priceHTML}
          </div>`;
      });

      cardHTML += `</div>`;

      if (variant.key === 'ott') {
        cardHTML += `
          <div class="ott-preview-box">
            <div class="ott-badge"><i class="fas fa-tv"></i> OTT Apps Included</div>
            <img class="ott-banner-img" src="ott_platforms.png" alt="OTT Platforms" />
          </div>`;
      } else if (variant.key === 'iptv') {
        cardHTML += `
          <div class="ott-preview-box empty">
            <div class="ott-badge-muted"><i class="fas fa-tv"></i> IPTV + OTT Bundle</div>
            <div class="ott-placeholder-text">Premium entertainment with live TV and streaming apps.</div>
          </div>`;
      } else {
        cardHTML += `
          <div class="ott-preview-box empty">
            <div class="ott-badge-muted"><i class="fas fa-ban"></i> Standard Connectivity</div>
            <div class="ott-placeholder-text">High-speed data with no OTT subscription included.</div>
          </div>`;
      }

      cardHTML += `
        </div>
        <div class="plan-action">
          <button class="btn-select" onclick="handleSelectPlan('${speed}', '${variant.key}')" ${isUnavailable ? 'disabled' : ''}>${isUnavailable ? 'Coming Soon' : 'Select Plan →'}</button>
        </div>`;

      card.innerHTML += cardHTML;
      container.appendChild(card);
    });
  }

  window.selectDurationOption = function(element, speed, typeKey, durKey) {
    const selector = element.closest('.duration-selector');
    if (!selector) return;

    // Remove selected class from all options in this selector
    selector.querySelectorAll('.duration-option').forEach(opt => {
      opt.classList.remove('selected');
      const radio = opt.querySelector('.duration-radio');
      if (radio) radio.checked = false;
    });

    // Add selected class to the clicked option
    element.classList.add('selected');
    const clickedRadio = element.querySelector('.duration-radio');
    if (clickedRadio) clickedRadio.checked = true;
  };

  window.handleSelectPlan = function(speed, typeKey) {
    const radio = document.querySelector(`input[name="duration-${speed}-${typeKey}"]:checked`);
    if (!radio) return;

    const durationKey = radio.value;
    const data = plansDB[speed];
    if (!data) return;

    const variant = (data.variants || []).find(item => item.key === typeKey && (item.locations || []).includes(activeLocation));
    if (!variant) return;

    const durationLabels = {
      monthly: 'Monthly Plan',
      quarterly: 'Quarterly Plan',
      halfyearly: 'Half-Yearly Plan',
      yearly: 'Yearly Plan'
    };

    const durationMonths = { monthly: 1, quarterly: 3, halfyearly: 6, yearly: 12 };
    const months = durationMonths[durationKey];
    const price = variant[durationKey];
    if (price == null) {
      showToast('⚠️ This plan option is currently unavailable for this duration.');
      return;
    }

    const fullPlanName = `${variant.name || speed} (${speed}) - ${durationLabels[durationKey]} (₹${Number(price).toLocaleString('en-IN')})`;
    window.openEnquiryModal(fullPlanName);
    showToast('✅ Plan selected. Complete your enquiry below.');
  };

  window.filterBySpeed = function(speed) {
    activeSpeed = speed;
    updateActiveSpeedTab(speed);
    renderPlansForSpeed(speed);
  };

  function updateActiveSpeedTab(speed) {
    const speedTabs = document.querySelectorAll('.speed-tab');
    speedTabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      tab.classList.toggle('active-tab', tabText === speed);
    });
  }

  function renderSpeedTabs() {
    const tabsContainer = document.getElementById('speedTabs');
    if (!tabsContainer) return;

    const speeds = Object.keys(plansDB);
    tabsContainer.innerHTML = '';

    speeds.forEach(speed => {
      const button = document.createElement('button');
      button.className = 'speed-tab';
      button.textContent = speed;
      button.onclick = () => window.filterBySpeed(speed);
      tabsContainer.appendChild(button);
    });
  }

  function updateSpeedTabsVisibility() {
    const tabsContainer = document.getElementById('speedTabs');
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('.speed-tab');
    let firstAvailableSpeed = null;
    let activeSpeedStillAvailable = false;

    tabs.forEach(tab => {
      const speed = tab.textContent.trim();
      const planData = plansDB[speed];
      const isAvailable = planData && (planData.variants || []).some(variant => {
        const locations = variant.locations || [];
        return locations.includes(activeLocation);
      });

      if (isAvailable) {
        tab.style.display = '';
        if (!firstAvailableSpeed) firstAvailableSpeed = speed;
        if (speed === activeSpeed) activeSpeedStillAvailable = true;
      } else {
        tab.style.display = 'none';
      }
    });

    if (!activeSpeedStillAvailable && firstAvailableSpeed) {
      activeSpeed = firstAvailableSpeed;
      updateActiveSpeedTab(activeSpeed);
    }
  }

  function syncLocationToggleUI() {
    const capsule = document.querySelector('.location-toggle-capsule');
    const infoDiv = document.getElementById('locationCoverageInfo');
    const btnTiruppur = document.getElementById('locBtnTiruppur');
    const btnPollachi = document.getElementById('locBtnPollachi');
    if (!capsule) return;

    if (activeLocation === 'Tiruppur') {
      capsule.classList.remove('pollachi-active');
      btnTiruppur?.classList.add('active');
      btnPollachi?.classList.remove('active');
      if (infoDiv) {
        infoDiv.innerHTML = `<i class="fas fa-check-circle" style="color:var(--primary);"></i> Unilink High-Speed Fiber is fully active in <strong>Tiruppur</strong>!`;
      }
    } else {
      capsule.classList.add('pollachi-active');
      btnTiruppur?.classList.remove('active');
      btnPollachi?.classList.add('active');
      if (infoDiv) {
        infoDiv.innerHTML = `<i class="fas fa-check-circle" style="color:var(--primary);"></i> Unilink High-Speed Fiber is fully active in <strong>Pollachi</strong>!`;
      }
    }
  }

  // Load plans database dynamically (fallback to hardcoded db on error/CORS/file protocol)
  async function loadPlansDB() {
    activeLocation = localStorage.getItem('location') || 'Tiruppur';
    if (window.location.protocol === 'file:') {
      console.log('Running locally via file:// protocol. Skipping plans.json fetch to avoid CORS errors.');
    } else {
      try {
        const response = await fetch('plans.json');
        if (response.ok) {
          let data = await response.json();
          if (!data || Object.values(data).some(plan => plan.variants === undefined)) {
            data = normalizePlansJsonStructure(data);
          }
          plansDB = { ...plansDB, ...data };
          console.log('Loaded plans from plans.json');
        }
      } catch (e) {
        console.warn('Could not fetch plans.json (using default local plans)', e);
      }
    }

    // Check if speed parameter is specified in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const speedParam = urlParams.get('speed');
    if (speedParam && plansDB[speedParam]) {
      activeSpeed = speedParam;
    }

    syncLocationToggleUI();
    renderSpeedTabs();
    updateSpeedTabsVisibility();
    renderPlansForSpeed(activeSpeed);
    renderSpeedMarquee();
    loadConfig();
  }

  loadPlansDB();

  // Intersection Observers for animations
  const sectionObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); }); },{threshold:0.1});
  document.querySelectorAll('.section').forEach(section=>sectionObserver.observe(section));
  const aboutObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible-card'); }); },{threshold:0.2});
  document.querySelectorAll('.cinematic-card-split').forEach(card=>aboutObserver.observe(card));
  const serviceObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('animated'); }); },{threshold:0.15});
  document.querySelectorAll('.service-detailed-card, .contact-card').forEach(card=>serviceObserver.observe(card));
  const legalObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); }); },{threshold:0.15});
  document.querySelectorAll('.legal-card').forEach(card=>legalObserver.observe(card));

  // Location Selection Toggle Action
  window.selectLocation = function(location) {
    activeLocation = location;
    localStorage.setItem('location', location);
    syncLocationToggleUI();
    updateSpeedTabsVisibility();
    renderPlansForSpeed(activeSpeed);
    showToast(`📍 Switched to ${location} coverage`);
  };

  // Bind sidebar and app links
  document.querySelectorAll('.dock-download').forEach(el => el.addEventListener('click', () => showToast('📎 Unilink App Drive Link coming soon!')));
  const video=document.querySelector('video.bg-video'); if(video) video.play().catch(e=>{ video.muted=true; video.play(); });
})();
