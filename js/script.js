/**
 * Nikah Ceremony Invitation Script
 * Nizar & Shifanath — 22 October 2026
 * Background Song: Kalam Eineh (Sherine)
 * Custom Orders & Hampers: Hamper Spot (@hamper.spot)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const heroScreen = document.getElementById('heroScreen');
  const btnOpenInvitation = document.getElementById('btnOpenInvitation');
  const envelopeSection = document.getElementById('envelopeSection');
  const interactiveEnvelope = document.getElementById('interactiveEnvelope');
  const waxSeal = document.getElementById('waxSeal');
  const siteHeader = document.getElementById('siteHeader');
  const btnToggleMusic = document.getElementById('btnToggleMusic');
  const bgAudio = document.getElementById('bgAudio');
  const btnAddToCalendar = document.getElementById('btnAddToCalendar');
  const btnCopyAddress = document.getElementById('btnCopyAddress');
  const copyBtnText = document.getElementById('copyBtnText');
  const btnScrollToTop = document.getElementById('btnScrollToTop');
  const toastNotification = document.getElementById('toastNotification');

  let isAudioPlaying = false;

  // --------------------------------------------------------------------------
  // 1. OPEN INVITATION INTERACTION
  // --------------------------------------------------------------------------
  function openInvitation() {
    // Show navigation bar
    siteHeader.classList.add('visible');

    // Open envelope
    interactiveEnvelope.classList.add('opened');

    // Smooth scroll to envelope section
    envelopeSection.scrollIntoView({ behavior: 'smooth' });

    // Start background music (Kalam Eineh)
    playMusic();

    // Trigger celebratory petals
    triggerConfettiBurst();

    showToast('✨ Welcome to the Nikah Invitation');
  }

  if (btnOpenInvitation) {
    btnOpenInvitation.addEventListener('click', openInvitation);
  }

  if (interactiveEnvelope) {
    interactiveEnvelope.addEventListener('click', (e) => {
      interactiveEnvelope.classList.toggle('opened');
      if (interactiveEnvelope.classList.contains('opened')) {
        playMusic();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. BACKGROUND AUDIO CONTROL (Kalam Eineh)
  // --------------------------------------------------------------------------
  function playMusic() {
    if (!bgAudio) return;
    bgAudio.volume = 0.65;
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      btnToggleMusic.classList.add('playing');
    }).catch((err) => {
      console.log('Audio autoplay prevented by browser policy:', err);
    });
  }

  function pauseMusic() {
    if (!bgAudio) return;
    bgAudio.pause();
    isAudioPlaying = false;
    btnToggleMusic.classList.remove('playing');
  }

  if (btnToggleMusic) {
    btnToggleMusic.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isAudioPlaying) {
        pauseMusic();
        showToast('Music paused');
      } else {
        playMusic();
        showToast('Playing Kalam Eineh • كلام عينيه 🎶');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. LIVE COUNTDOWN TIMER (22 October 2026, 12:00 PM IST)
  // --------------------------------------------------------------------------
  const targetDate = new Date('2026-10-22T12:00:00+05:30').getTime();

  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMins = document.getElementById('countMins');
  const countSecs = document.getElementById('countSecs');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (countDays) countDays.textContent = '00';
      if (countHours) countHours.textContent = '00';
      if (countMins) countMins.textContent = '00';
      if (countSecs) countSecs.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (countDays) countDays.textContent = String(days).padStart(2, '0');
    if (countHours) countHours.textContent = String(hours).padStart(2, '0');
    if (countMins) countMins.textContent = String(minutes).padStart(2, '0');
    if (countSecs) countSecs.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --------------------------------------------------------------------------
  // 4. ADD TO CALENDAR (Google Calendar)
  // --------------------------------------------------------------------------
  if (btnAddToCalendar) {
    btnAddToCalendar.addEventListener('click', () => {
      const title = encodeURIComponent('Nikah Ceremony & Wedding Feast: Nizar & Shifanath');
      const details = encodeURIComponent('You are cordially invited to celebrate the blessed Nikah of Nizar B.M and Shifanath M.K at Old Juma Masjid, Kottamudi, Kodagu at 12:00 PM, followed by celebratory Wedding Lunch at Shadhi Mahal, Cheriyaparambu. Gift & Hamper orders: @hamper.spot.');
      const location = encodeURIComponent('Old Juma Masjid, Kottamudi, Kodagu & Shadhi Mahal, Cheriyaparambu');
      const start = '20261022T063000Z'; // 12:00 PM IST is 06:30 AM UTC
      const end = '20261022T103000Z';   // 4:00 PM IST

      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
      window.open(gcalUrl, '_blank');
      showToast('Opening Google Calendar...');
    });
  }

  // --------------------------------------------------------------------------
  // 5. VENUE TABS & COPY ADDRESSES (NIKAH & LUNCH)
  // --------------------------------------------------------------------------
  const tabNikahBtn = document.getElementById('tabNikahBtn');
  const tabLunchBtn = document.getElementById('tabLunchBtn');
  const paneNikah = document.getElementById('paneNikah');
  const paneLunch = document.getElementById('paneLunch');

  if (tabNikahBtn && tabLunchBtn && paneNikah && paneLunch) {
    tabNikahBtn.addEventListener('click', () => {
      tabNikahBtn.classList.add('active');
      tabNikahBtn.setAttribute('aria-selected', 'true');
      tabLunchBtn.classList.remove('active');
      tabLunchBtn.setAttribute('aria-selected', 'false');

      paneNikah.classList.add('active');
      paneLunch.classList.remove('active');
    });

    tabLunchBtn.addEventListener('click', () => {
      tabLunchBtn.classList.add('active');
      tabLunchBtn.setAttribute('aria-selected', 'true');
      tabNikahBtn.classList.remove('active');
      tabNikahBtn.setAttribute('aria-selected', 'false');

      paneLunch.classList.add('active');
      paneNikah.classList.remove('active');
    });
  }

  // Copy Address: Nikah (Old Juma Masjid, Kottamudi, Kodagu)
  const btnCopyAddressNikah = document.getElementById('btnCopyAddressNikah');
  const copyNikahText = document.getElementById('copyNikahText');
  if (btnCopyAddressNikah) {
    btnCopyAddressNikah.addEventListener('click', () => {
      const address = 'Old Juma Masjid, Kottamudi, Kodagu (Coorg), Karnataka, India';
      navigator.clipboard.writeText(address).then(() => {
        if (copyNikahText) copyNikahText.textContent = 'Address Copied! ✨';
        showToast('Nikah venue address copied to clipboard');
        setTimeout(() => {
          if (copyNikahText) copyNikahText.textContent = 'Copy Address';
        }, 3000);
      }).catch(() => {
        showToast('Old Juma Masjid, Kottamudi, Kodagu');
      });
    });
  }

  // Copy Address: Lunch (Shadhi Mahal, Cheriyaparambu)
  const btnCopyAddressLunch = document.getElementById('btnCopyAddressLunch');
  const copyLunchText = document.getElementById('copyLunchText');
  if (btnCopyAddressLunch) {
    btnCopyAddressLunch.addEventListener('click', () => {
      const address = 'Shadhi Mahal, Cheriyaparambu, Kerala, India';
      navigator.clipboard.writeText(address).then(() => {
        if (copyLunchText) copyLunchText.textContent = 'Address Copied! ✨';
        showToast('Lunch venue address copied to clipboard');
        setTimeout(() => {
          if (copyLunchText) copyLunchText.textContent = 'Copy Address';
        }, 3000);
      }).catch(() => {
        showToast('Shadhi Mahal, Cheriyaparambu');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  let toastTimer;
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.hidden = false;
    toastNotification.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('active');
      setTimeout(() => {
        toastNotification.hidden = true;
      }, 350);
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 7. SCROLL SPY FOR NAVIGATION & HEADER VISIBILITY
  // --------------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    // If scrolled past hero section, ensure header is visible
    if (window.scrollY > 300) {
      siteHeader.classList.add('visible');
    }

    // Active link highlight
    const sections = ['welcome', 'family', 'timings', 'venue', 'hampers'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 150) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          const activeNav = document.getElementById('nav' + id.charAt(0).toUpperCase() + id.slice(1));
          if (activeNav) activeNav.classList.add('active');
          break;
        }
      }
    }
  });

  // Back to top button
  if (btnScrollToTop) {
    btnScrollToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 8. FALLING JASMINE & BLOSSOM PETALS CANVAS
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('petalsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalCount = 28;
    const petals = [];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 0.9 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.angle = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.5 + 0.35;
        this.colorType = Math.random() > 0.4 ? 'white' : 'blush';
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle * Math.PI / 180) * 0.6 + this.speedX;
        this.angle += this.spin;

        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);

        if (this.colorType === 'white') {
          ctx.fillStyle = '#fffdfa';
        } else {
          ctx.fillStyle = '#fcebe6';
        }
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    function animatePetals() {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animatePetals);
    }

    animatePetals();
  }

  // --------------------------------------------------------------------------
  // 9. CELEBRATORY CONFETTI / GOLD PETAL BURST
  // --------------------------------------------------------------------------
  function triggerConfettiBurst() {
    const burstCount = 35;
    for (let i = 0; i < burstCount; i++) {
      const particle = document.createElement('div');
      const colors = ['#f4dec7', '#ffffff', '#cca783', '#f8e4dc', '#94a68c'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 9 + 5;

      particle.style.position = 'fixed';
      particle.style.left = '50%';
      particle.style.top = '45%';
      particle.style.width = `${size}px`;
      particle.style.height = `${size * 0.7}px`;
      particle.style.backgroundColor = randomColor;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '99999';
      particle.style.opacity = '1';
      particle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      particle.style.transition = `all ${Math.random() * 1.2 + 0.8}s cubic-bezier(0.1, 0.8, 0.3, 1)`;

      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 260 + 80;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity + 60;

      requestAnimationFrame(() => {
        particle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${Math.random() * 720}deg) scale(0.6)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => {
        particle.remove();
      }, 2000);
    }
  }
});
