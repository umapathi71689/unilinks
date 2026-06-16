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

  // Initial Theme Load: Default is Light (no class), Dark adds 'dark-theme'
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark-theme');
    updateThemeIcon(false);
  }

  [themeToggleBtn, mobileThemeToggleBtn].forEach(btn => {
    btn?.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
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

  // Loader
  window.addEventListener('load', () => { setTimeout(() => { const loader = document.getElementById('page-loader'); if(loader) loader.classList.add('hidden'); }, 1800); });

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
  const navLinks = document.querySelectorAll('.nav-link');
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

  // Speed Marquee Click Handlers
  const speedItems = document.querySelectorAll('#speedMarquee span');
  speedItems.forEach(item => {
    item.addEventListener('click', () => {
      const speedText = item.textContent.trim().split(' ')[0] + ' Mbps';
      const plansSection = document.getElementById('plans');
      if(plansSection) plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const speedIndexMap = { '40 Mbps': 0, '100 Mbps': 2, '200 Mbps': 4, '500 Mbps': 6 };
        const cardIndex = speedIndexMap[speedText];
        if (cardIndex !== undefined) {
          const container = document.getElementById('planCards');
          const cards = container?.querySelectorAll('.plan-card');
          if (cards && cards[cardIndex]) {
            const containerLeft = container.getBoundingClientRect().left;
            const cardLeft = cards[cardIndex].getBoundingClientRect().left;
            const scrollOffset = container.scrollLeft + (cardLeft - containerLeft) - 20;
            container.scrollTo({ left: scrollOffset, behavior: 'smooth' });
          }
        }
      }, 500);
      showToast(`📡 Scrolled to ${speedText} plans`);
    });
  });

  // Slideshow
  const textSlides = document.querySelectorAll('.hero-slide'), imgSlides = document.querySelectorAll('.image-slide');
  let slideIndex=0, slideTimer=null;
  function updateSlide(index){ let newIdx=(index+textSlides.length)%textSlides.length; slideIndex=newIdx; textSlides.forEach((s,i)=>s.classList.toggle('active',i===newIdx)); imgSlides.forEach((img,i)=>img.classList.toggle('active-img',i===newIdx)); document.querySelectorAll('.unified-dot').forEach((dot,i)=>dot.classList.toggle('active-dot',i===newIdx)); }
  function nextSlide(){ updateSlide(slideIndex+1); resetTimer(); }
  function prevSlide(){ updateSlide(slideIndex-1); resetTimer(); }
  function resetTimer(){ clearInterval(slideTimer); slideTimer=setInterval(nextSlide,6000); }
  function buildDots(){ const container=document.getElementById('dotsContainer'); if(!container) return; container.innerHTML=''; for(let i=0;i<textSlides.length;i++){ const dot=document.createElement('div'); dot.className='unified-dot'+(i===0?' active-dot':''); dot.addEventListener('click',()=>{ updateSlide(i); resetTimer(); }); container.appendChild(dot); } }
  buildDots();
  document.getElementById('prevSlideBtn')?.addEventListener('click',()=>{ prevSlide(); resetTimer(); });
  document.getElementById('nextSlideBtn')?.addEventListener('click',()=>{ nextSlide(); resetTimer(); });
  resetTimer();

  // Plans Database with local fallback values
  let plansDB = {
    '40 Mbps': { name: 'Starter Link', desc: 'Social Media & Browsing', benefits: 'Unlimited Data + 24/7 Support', base:{monthly:399,quarterly:1197,halfyearly:2394,yearly:4788}, ott:{monthly:499,quarterly:1497,halfyearly:2994,yearly:5988} },
    '100 Mbps': { name: 'Value Link', desc: 'Families & Students', benefits: 'Unlimited Data + HD Streaming', base:{monthly:599,quarterly:1797,halfyearly:3594,yearly:7188}, ott:{monthly:699,quarterly:2097,halfyearly:4194,yearly:8388} },
    '200 Mbps': { name: 'Turbo Link', desc: 'Pro Gamers & Streamers', benefits: 'Unlimited Data + 4K Streaming', base:{monthly:899,quarterly:2697,halfyearly:5394,yearly:10788}, ott:{monthly:999,quarterly:2997,halfyearly:5994,yearly:11988} },
    '500 Mbps': { name: 'Giga Link', desc: 'Power Users & Large Homes', benefits: 'Priority Routing + Ultra-Low Latency', base:{monthly:1399,quarterly:4197,halfyearly:8394,yearly:16788}, ott:{monthly:1499,quarterly:4497,halfyearly:8994,yearly:17988} }
  };
  
  let config = {
    whatsappNumber: "919787262228",
    whatsappEnquiryText: "Hello Unilink! I am interested in your internet plan:\n- Plan: {plan}\n- Name: {name}\n- Mobile: {mobile}\n- Address: {address}",
    facebookPage: "https://www.facebook.com",
    instagramPage: "https://www.instagram.com",
    twitterPage: "https://www.twitter.com"
  };

  async function loadConfig() {
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
    const whatsappUrls = document.querySelectorAll('a[href*="wa.me"]');
    whatsappUrls.forEach(el => {
      el.href = `https://wa.me/${config.whatsappNumber}`;
    });

    const facebookLinks = document.querySelectorAll('a[href*="facebook.com"], a[class*="facebook"]');
    facebookLinks.forEach(el => { if(el.tagName === 'A') el.href = config.facebookPage; });

    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"], a[class*="instagram"]');
    instagramLinks.forEach(el => { if(el.tagName === 'A') el.href = config.instagramPage; });

    const twitterLinks = document.querySelectorAll('a[href*="twitter.com"], a[class*="twitter"]');
    twitterLinks.forEach(el => { if(el.tagName === 'A') el.href = config.twitterPage; });
    
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
  
  function renderAllPlanCards(){
    const container=document.getElementById('planCards'); if(!container) return;
    container.innerHTML='';
    
    Object.keys(plansDB).forEach(speed=>{
      const data=plansDB[speed];
      const basePrice=data.base.monthly, ottPrice=data.ott.monthly;
      
      // Card 1: Essential Plan
      const card1=document.createElement('div'); card1.className='plan-card'; if(speed==='100 Mbps') card1.innerHTML='<div class="popular-badge">🔥 POPULAR</div>';
      card1.innerHTML+=`
        <div class="plan-header">
          <div class="plan-type"><i class="fas fa-tower-cell"></i> Fiber Essential</div>
          <div class="plan-name">${data.name}</div>
          <p class="plan-desc">${data.desc}</p>
        </div>
        <div class="plan-price-block">
          <div class="price-display">₹${basePrice}<small> / mo</small></div>
          <div class="price-breakdown"><span>Speed Capacity:</span><span><strong>${speed}</strong></span></div>
        </div>
        <div class="plan-body">
          <div class="plan-benefits-text"><i class="fas fa-check-circle" style="color:var(--primary); margin-right:6px;"></i> ${data.benefits}</div>
          <div class="ott-preview-box empty">
            <div class="ott-badge-muted"><i class="fas fa-ban"></i> No OTT Apps Included</div>
            <div class="ott-placeholder-text">Standard high-speed data connectivity without streaming media subscriptions.</div>
          </div>
        </div>
        <div class="plan-action">
          <button class="btn-select" data-plan="${data.name} Essential (${speed})">Select Plan →</button>
        </div>`;
      container.appendChild(card1);
      
      // Card 2: OTT Bundle
      const card2=document.createElement('div'); card2.className='plan-card'; if(speed==='200 Mbps') card2.innerHTML='<div class="popular-badge">🔥 BEST VALUE</div>';
      card2.innerHTML+=`
        <div class="plan-header">
          <div class="plan-type"><i class="fas fa-film"></i> Premium OTT Bundle</div>
          <div class="plan-name">${data.name} + OTT</div>
          <p class="plan-desc">${data.desc} + Entertainment</p>
        </div>
        <div class="plan-price-block">
          <div class="price-display">₹${ottPrice}<small> / mo</small></div>
          <div class="price-breakdown"><span>Speed Capacity:</span><span><strong>${speed}</strong></span></div>
        </div>
        <div class="plan-body">
          <div class="plan-benefits-text"><i class="fas fa-check-circle" style="color:var(--primary); margin-right:6px;"></i> ${data.benefits}</div>
          <div class="ott-preview-box">
            <div class="ott-badge"><i class="fas fa-tv"></i> 20+ OTT Apps Included</div>
            <img class="ott-banner-img" src="ott_platforms.png" alt="OTT Platforms" />
          </div>
        </div>
        <div class="plan-action">
          <button class="btn-select" data-plan="${data.name} OTT Bundle (${speed})">Select Plan →</button>
        </div>`;
      container.appendChild(card2);
    });
    
    document.querySelectorAll('.btn-select').forEach(btn=>btn.addEventListener('click',(e)=>{
      const planName = btn.getAttribute('data-plan');
      window.openEnquiryModal(planName);
    }));
    initPlansSlider();
  }

  // Speed Selection Filter Action
  window.filterBySpeed = function(speed) {
    const speedIndexMap = { '40 Mbps': 0, '100 Mbps': 2, '200 Mbps': 4, '500 Mbps': 6 };
    const cardIndex = speedIndexMap[speed];
    if (cardIndex !== undefined) {
      const container = document.getElementById('planCards');
      const cards = container?.querySelectorAll('.plan-card');
      if (cards && cards[cardIndex]) {
        const containerLeft = container.getBoundingClientRect().left;
        const cardLeft = cards[cardIndex].getBoundingClientRect().left;
        const scrollOffset = container.scrollLeft + (cardLeft - containerLeft) - 20;
        container.scrollTo({ left: scrollOffset, behavior: 'smooth' });
        updateActiveSpeedTab(speed);
      }
    }
  };

  function updateActiveSpeedTab(speed) {
    const speedTabs = document.querySelectorAll('.speed-tab');
    speedTabs.forEach(tab => {
      const tabText = tab.textContent.trim();
      tab.classList.toggle('active-tab', tabText === speed);
    });
  }

  let plansSliderTimer = null;
  function initPlansSlider() {
    const container = document.getElementById('planCards');
    const prevBtn = document.getElementById('plansPrevBtn');
    const nextBtn = document.getElementById('plansNextBtn');
    const dotsContainer = document.getElementById('plansDotsContainer');
    if (!container) return;

    const cards = container.querySelectorAll('.plan-card');
    const cardCount = cards.length;
    if (cardCount === 0) return;

    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < cardCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'unified-dot' + (i === 0 ? ' active-dot' : '');
        dot.addEventListener('click', () => {
          scrollToCard(i);
          resetPlansTimer();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function scrollToCard(index) {
      if (index < 0 || index >= cardCount) return;
      const card = cards[index];
      const containerLeft = container.getBoundingClientRect().left;
      const cardLeft = card.getBoundingClientRect().left;
      const scrollOffset = container.scrollLeft + (cardLeft - containerLeft) - 20; // 20px padding adjustment
      container.scrollTo({ left: scrollOffset, behavior: 'smooth' });
      updateActiveDot(index);
    }

    function updateActiveDot(index) {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.unified-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active-dot', idx === index);
      });
    }

    // Determine which card is currently in view during scroll
    container.addEventListener('scroll', () => {
      const containerLeft = container.getBoundingClientRect().left;
      let minDiff = Infinity;
      let activeIdx = 0;
      cards.forEach((card, idx) => {
        const diff = Math.abs(card.getBoundingClientRect().left - containerLeft);
        if (diff < minDiff) {
          minDiff = diff;
          activeIdx = idx;
        }
      });
      updateActiveDot(activeIdx);

      // Scroll-sync with top speed filter tabs
      let activeSpeed = '40 Mbps';
      if (activeIdx >= 6) activeSpeed = '500 Mbps';
      else if (activeIdx >= 4) activeSpeed = '200 Mbps';
      else if (activeIdx >= 2) activeSpeed = '100 Mbps';
      
      updateActiveSpeedTab(activeSpeed);
    });

    prevBtn?.addEventListener('click', () => {
      const activeDot = dotsContainer?.querySelector('.active-dot');
      const currentIndex = activeDot ? Array.from(dotsContainer.children).indexOf(activeDot) : 0;
      scrollToCard(currentIndex - 1);
      resetPlansTimer();
    });

    nextBtn?.addEventListener('click', () => {
      const activeDot = dotsContainer?.querySelector('.active-dot');
      const currentIndex = activeDot ? Array.from(dotsContainer.children).indexOf(activeDot) : 0;
      scrollToCard((currentIndex + 1) % cardCount);
      resetPlansTimer();
    });

    function autoScroll() {
      const activeDot = dotsContainer?.querySelector('.active-dot');
      const currentIndex = activeDot ? Array.from(dotsContainer.children).indexOf(activeDot) : 0;
      scrollToCard((currentIndex + 1) % cardCount);
    }

    function resetPlansTimer() {
      clearInterval(plansSliderTimer);
      plansSliderTimer = setInterval(autoScroll, 5000); // Auto scroll every 5s
    }

    resetPlansTimer();
    
    // Pause auto-scroll on hover or touch
    container.addEventListener('mouseenter', () => clearInterval(plansSliderTimer));
    container.addEventListener('mouseleave', resetPlansTimer);
    container.addEventListener('touchstart', () => clearInterval(plansSliderTimer));
    container.addEventListener('touchend', resetPlansTimer);
  }

  // Load plans database dynamically (fallback to hardcoded db on error/CORS/file protocol)
  async function loadPlansDB() {
    try {
      const response = await fetch('plans.json');
      if (response.ok) {
        const data = await response.json();
        plansDB = data;
        console.log('Loaded plans from plans.json');
      }
    } catch (e) {
      console.warn('Could not fetch plans.json (using default local plans)', e);
    }
    renderAllPlanCards();
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
    const capsule = document.querySelector('.location-toggle-capsule');
    const infoDiv = document.getElementById('locationCoverageInfo');
    const btnTiruppur = document.getElementById('locBtnTiruppur');
    const btnPollachi = document.getElementById('locBtnPollachi');
    
    if (location === 'Tiruppur') {
      capsule?.classList.remove('pollachi-active');
      btnTiruppur?.classList.add('active');
      btnPollachi?.classList.remove('active');
      if (infoDiv) {
        infoDiv.innerHTML = `<i class="fas fa-check-circle" style="color:var(--primary);"></i> Unilink High-Speed Fiber is fully active in <strong>Tiruppur</strong>!`;
      }
      showToast('📍 Switched to Tiruppur coverage');
    } else {
      capsule?.classList.add('pollachi-active');
      btnTiruppur?.classList.remove('active');
      btnPollachi?.classList.add('active');
      if (infoDiv) {
        infoDiv.innerHTML = `<i class="fas fa-check-circle" style="color:var(--primary);"></i> Unilink High-Speed Fiber is fully active in <strong>Pollachi</strong>!`;
      }
      showToast('📍 Switched to Pollachi coverage');
    }
  };

  // Bind sidebar and app links
  document.querySelectorAll('.dock-download').forEach(el => el.addEventListener('click', () => showToast('📎 Unilink App Drive Link coming soon!')));
  const video=document.querySelector('.bg-video'); if(video) video.play().catch(e=>{ video.muted=true; video.play(); });
})();
