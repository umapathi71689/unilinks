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
        const tabs = document.querySelectorAll('.speed-tab');
        tabs.forEach(tab => {
          if(tab.textContent === speedText) tab.click();
        });
      }, 500);
      showToast(`📡 ${speedText} plan selected`);
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
  let currentSpeed='100 Mbps', currentDuration='monthly';
  const durationLabels={monthly:'Monthly',quarterly:'3 Months',halfyearly:'6 Months',yearly:'1 Year'};
  
  function renderSpeedTabs(){
    const container=document.getElementById('speedTabs'); if(!container) return; container.innerHTML='';
    Object.keys(plansDB).forEach(speed=>{ const tab=document.createElement('div'); tab.className=`speed-tab ${speed===currentSpeed?'active-tab':''}`; tab.textContent=speed; tab.addEventListener('click',()=>{ document.querySelectorAll('.speed-tab').forEach(t=>t.classList.remove('active-tab')); tab.classList.add('active-tab'); currentSpeed=speed; renderPlanCards(); }); container.appendChild(tab); });
  }
  function renderPlanCards(){
    const container=document.getElementById('planCards'); if(!container) return;
    const data=plansDB[currentSpeed]; const months={monthly:1,quarterly:3,halfyearly:6,yearly:12}[currentDuration];
    const basePrice=data.base[currentDuration], ottPrice=data.ott[currentDuration];
    container.innerHTML='';
    
    // Card 1: Essential Plan
    const card1=document.createElement('div'); card1.className='plan-card'; if(currentSpeed==='100 Mbps'&&currentDuration==='monthly') card1.innerHTML='<div class="popular-badge">🔥 POPULAR</div>';
    card1.innerHTML+=`<div class="plan-type"><i class="fas fa-tower-cell"></i> Fiber Essential</div>
      <div>
        <div class="plan-name">${data.name}</div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">${data.desc}</p>
      </div>
      <div class="price-display">₹${basePrice}<small> / ${durationLabels[currentDuration]}</small></div>
      <div class="price-breakdown"><span>Effective Monthly</span><span>₹${Math.round(basePrice/months)}/mo</span></div>
      <div class="ott-info"><div>${data.benefits}</div></div>
      <button class="btn-select" data-plan="${data.name} Essential">Select Plan →</button>`;
    container.appendChild(card1);
    
    // Card 2: OTT Bundle
    const card2=document.createElement('div'); card2.className='plan-card'; if(currentSpeed==='200 Mbps'&&currentDuration==='monthly') card2.innerHTML='<div class="popular-badge">🔥 BEST VALUE</div>';
    card2.innerHTML+=`<div class="plan-type"><i class="fas fa-film"></i> Premium OTT Bundle</div>
      <div>
        <div class="plan-name">${data.name} + OTT</div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">${data.desc} + Entertainment</p>
      </div>
      <div class="price-display">₹${ottPrice}<small> / ${durationLabels[currentDuration]}</small></div>
      <div class="price-breakdown"><span>Effective Monthly</span><span>₹${Math.round(ottPrice/months)}/mo</span></div>
      <div class="ott-info">
        <div>20+ OTT Apps Included</div>
        <img class="ott-banner-img" src="ott_platforms.png" alt="OTT Platforms" />
        <div class="ott-icons" style="margin-top:10px;">
          <span class="ott-icon">SonyLiv</span><span class="ott-icon">Hotstar</span><span class="ott-icon">Zee5</span><span class="ott-icon">+17 more</span>
        </div>
        ${currentDuration==='yearly'?'<div style="margin-top:8px;color:var(--primary);font-weight:600;">Yearly Bonus: Amazon Prime Lite!</div>':''}
      </div>
      <button class="btn-select" data-plan="${data.name} OTT Bundle">Select Plan →</button>`;
    container.appendChild(card2);
    
    document.querySelectorAll('.btn-select').forEach(btn=>btn.addEventListener('click',(e)=>showToast(`✅ Enquiry sent for ${btn.getAttribute('data-plan')}!`)));
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
    renderSpeedTabs();
    renderPlanCards();
  }

  loadPlansDB();

  document.querySelectorAll('.duration-tab').forEach(tab=>{ tab.addEventListener('click',()=>{ document.querySelectorAll('.duration-tab').forEach(t=>t.classList.remove('active-duration')); tab.classList.add('active-duration'); currentDuration=tab.getAttribute('data-duration'); renderPlanCards(); }); });

  // Intersection Observers for animations
  const sectionObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); }); },{threshold:0.1});
  document.querySelectorAll('.section').forEach(section=>sectionObserver.observe(section));
  const aboutObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible-card'); }); },{threshold:0.2});
  document.querySelectorAll('.cinematic-card-split').forEach(card=>aboutObserver.observe(card));
  const serviceObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('animated'); }); },{threshold:0.15});
  document.querySelectorAll('.service-detailed-card, .contact-card').forEach(card=>serviceObserver.observe(card));
  const legalObserver=new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); }); },{threshold:0.15});
  document.querySelectorAll('.legal-card').forEach(card=>legalObserver.observe(card));

  // Pincode Search Action
  window.checkPincode = function() {
    const pinVal = document.getElementById('pincodeInput').value.trim();
    if (!pinVal) {
      showToast('⚠️ Please enter a pincode!');
      return;
    }
    if (pinVal.length !== 6 || isNaN(pinVal)) {
      showToast('⚠️ Please enter a valid 6-digit pincode!');
      return;
    }
    if (pinVal.startsWith('641') || pinVal.startsWith('642')) {
      showToast('✅ Yes! Unilink Fiber is available in your street!');
    } else {
      showToast('📡 Coming soon to your region! Request check sent.');
    }
  }

  // Bind sidebar and app links
  document.querySelectorAll('.dock-download').forEach(el => el.addEventListener('click', () => showToast('📎 Unilink App Drive Link coming soon!')));
  const video=document.querySelector('.bg-video'); if(video) video.play().catch(e=>{ video.muted=true; video.play(); });
})();
