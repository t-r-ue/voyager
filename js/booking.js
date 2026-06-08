/* ============================================================
   VOYAGER — booking.js
   Destination modal, trip builder panel, booking form,
   confirmation flow
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // STATE
  // ============================================================
  let currentDestination = null;
  const tripItems = [];

  // ============================================================
  // TOAST NOTIFICATION
  // ============================================================
  const toast     = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer;

  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
  }

  // ============================================================
  // DESTINATION MODAL
  // ============================================================
  const destModal     = document.getElementById('dest-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalPanel    = document.getElementById('modal-panel');
  const modalClose    = document.getElementById('modal-close');

  // Fields
  const modalMainImg     = document.getElementById('modal-main-img');
  const modalThumbnails  = document.getElementById('modal-thumbnails');
  const modalName        = document.getElementById('modal-destination-name');
  const modalCountry     = document.getElementById('modal-destination-country');
  const modalBadges      = document.getElementById('modal-badges');
  const modalStars       = document.getElementById('modal-stars');
  const modalRatingNum   = document.getElementById('modal-rating-num');
  const modalRatingCount = document.getElementById('modal-rating-count');
  const modalDesc        = document.getElementById('modal-desc');
  const modalHighlights  = document.getElementById('modal-highlights');
  const modalIncluded    = document.getElementById('modal-included');
  const calendarGrid     = document.getElementById('calendar-grid');
  const modalFlights     = document.getElementById('modal-flights');
  const modalVisa        = document.getElementById('modal-visa');
  const modalPriceAmount = document.getElementById('modal-price-amount');
  const modalPriceDur    = document.getElementById('modal-price-duration');

  function openModal(destinationId) {
    const dest = VOYAGER.destinations.find(d => d.id === destinationId);
    if (!dest) return;

    currentDestination = dest;
    populateModal(dest);

    destModal.classList.add('open');
    modalBackdrop.classList.add('open');
    requestAnimationFrame(() => {
      modalPanel.classList.add('open');
    });

    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalPanel.classList.remove('open');
    modalBackdrop.classList.remove('open');
    setTimeout(() => {
      destModal.classList.remove('open');
      document.body.style.overflow = '';
      currentDestination = null;
    }, 450);
  }

  function populateModal(dest) {
    // Main image
    modalMainImg.src = dest.gallery[0];
    modalMainImg.alt = `${dest.name}, ${dest.country}`;

    // Thumbnails
    modalThumbnails.innerHTML = '';
    dest.gallery.forEach((src, i) => {
      const img = document.createElement('img');
      img.className = 'modal-thumb' + (i === 0 ? ' active' : '');
      img.src = src;
      img.alt = `${dest.name} photo ${i + 1}`;
      img.loading = 'lazy';
      img.role = 'button';
      img.tabIndex = 0;
      img.addEventListener('click', () => {
        modalMainImg.src = src;
        modalThumbnails.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
        img.classList.add('active');
      });
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') img.click();
      });
      modalThumbnails.appendChild(img);
    });

    // Text
    modalName.textContent    = dest.name;
    modalCountry.textContent = `${dest.country} · ${dest.region}`;
    modalDesc.textContent    = dest.description;
    modalFlights.textContent = dest.flights;
    modalVisa.textContent    = dest.visa;

    // Rating
    modalRatingNum.textContent   = dest.rating;
    modalRatingCount.textContent = `(${dest.reviewCount.toLocaleString()} reviews)`;
    renderStars(modalStars, dest.rating);

    // Badges / tags
    modalBadges.innerHTML = dest.tags
      .map(t => `<span class="modal-badge">${t}</span>`)
      .join('');

    // Highlights
    modalHighlights.innerHTML = dest.highlights
      .map(h => `<li class="modal-highlight-item">${h}</li>`)
      .join('');

    // Included
    modalIncluded.innerHTML = dest.included
      .map(i => `<div class="modal-included-item">${i}</div>`)
      .join('');

    // Price
    modalPriceAmount.textContent = `$${dest.price.toLocaleString()}`;
    modalPriceDur.textContent    = `per person · ${dest.duration}`;

    // Climate calendar
    renderCalendar(dest.climate);

    // Reset form
    document.getElementById('booking-form').reset();
  }

  function renderStars(container, rating) {
    const full  = Math.floor(rating);
    const frac  = rating - full;
    let html = '';
    for (let i = 0; i < full; i++) html += '★';
    if (frac >= 0.5) html += '½';
    container.innerHTML = html;
    container.setAttribute('aria-label', `${rating} out of 5 stars`);
  }

  function renderCalendar(climate) {
    calendarGrid.innerHTML = '';
    const maxH = 60; // max bar height in px

    climate.labels.forEach((label, i) => {
      const priceMultiplier = climate.price[i];
      const isBest = climate.best.includes(i);

      const barH = Math.round(priceMultiplier * 35) + 10; // 10–72px range

      let priceClass = 'price-med';
      if (priceMultiplier < 0.85) priceClass = 'price-low';
      if (priceMultiplier > 1.3)  priceClass = 'price-high';
      if (isBest) priceClass += ' best-month';

      const month = document.createElement('div');
      month.className = 'calendar-month' + (isBest ? ' is-best' : '');
      month.setAttribute('title', `${label}: ${priceMultiplier >= 1.3 ? 'Peak' : priceMultiplier < 0.85 ? 'Low' : 'Mid'} season${isBest ? ' · Best month to visit' : ''}`);

      month.innerHTML = `
        <div class="calendar-bar-wrap">
          <div class="calendar-best-dot" aria-hidden="true"></div>
          <div class="calendar-bar ${priceClass}" style="height:${barH}px;--bar-h:${barH}px"></div>
        </div>
        <div class="calendar-month-label">${label}</div>
      `;

      calendarGrid.appendChild(month);
    });

    // Animate bars in with delay
    const bars = calendarGrid.querySelectorAll('.calendar-bar');
    bars.forEach((bar, i) => {
      bar.style.opacity = '0';
      setTimeout(() => {
        bar.style.transition = 'opacity 0.3s, height 0.5s cubic-bezier(0.16,1,0.3,1)';
        bar.style.opacity    = '1';
      }, i * 40);
    });
  }

  // Close modal events
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && destModal.classList.contains('open')) closeModal();
    if (e.key === 'Escape' && confirmModal.classList.contains('open')) closeConfirm();
  });

  // ============================================================
  // BOOKING FORM SUBMISSION
  // ============================================================
  const bookingForm      = document.getElementById('booking-form');
  const bookingSubmitBtn = document.getElementById('booking-submit-btn');

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate
    const name  = document.getElementById('booking-name').value.trim();
    const email = document.getElementById('booking-email').value.trim();
    if (!name || !email) {
      showToast('Please fill in your name and email.');
      return;
    }

    // Simulate loading
    bookingSubmitBtn.disabled = true;
    bookingSubmitBtn.innerHTML = '<span class="spinner"></span> Sending…';

    await new Promise(r => setTimeout(r, 1800));

    bookingSubmitBtn.disabled = false;
    bookingSubmitBtn.innerHTML = 'Send Inquiry <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>';

    closeModal();

    setTimeout(() => {
      openConfirm(name);
    }, 500);
  });

  // ============================================================
  // CONFIRMATION MODAL
  // ============================================================
  const confirmModal   = document.getElementById('confirm-modal');
  const confirmBackdrop = document.getElementById('confirm-backdrop');
  const confirmClose   = document.getElementById('confirm-close');
  const confirmRef     = document.getElementById('confirm-ref');

  function openConfirm(name) {
    const ref = 'VYG-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    confirmRef.textContent = `REF — ${ref}`;

    confirmModal.classList.add('open');
    confirmBackdrop.classList.add('open');
    requestAnimationFrame(() => {
      confirmModal.querySelector('.confirm-panel').classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeConfirm() {
    confirmModal.querySelector('.confirm-panel').classList.remove('open');
    confirmBackdrop.classList.remove('open');
    setTimeout(() => {
      confirmModal.classList.remove('open');
      document.body.style.overflow = '';
    }, 400);
  }

  confirmClose.addEventListener('click', closeConfirm);
  confirmBackdrop.addEventListener('click', closeConfirm);

  // ============================================================
  // TRIP BUILDER PANEL
  // ============================================================
  const tripPanel       = document.getElementById('trip-panel');
  const tripPanelHandle = document.getElementById('trip-panel-handle');
  const tripItemsEl     = document.getElementById('trip-items');
  const tripCountBadge  = document.getElementById('trip-count-badge');
  const tripTotalEl     = document.getElementById('trip-total');
  const tripClearBtn    = document.getElementById('trip-clear-btn');
  const tripInquiryBtn  = document.getElementById('trip-inquiry-btn');

  let tripPanelOpen = false;

  function addToTrip(destinationId) {
    if (tripItems.includes(destinationId)) {
      showToast('Already in your trip!');
      return;
    }
    tripItems.push(destinationId);
    renderTripItems();
    updateAddBtns();
    tripPanel.classList.add('open');
    tripPanelOpen = true;
    tripPanelHandle.setAttribute('aria-expanded', 'true');

    // Animate badge
    tripCountBadge.classList.remove('badge-pop');
    void tripCountBadge.offsetWidth;
    tripCountBadge.classList.add('badge-pop');

    const dest = VOYAGER.destinations.find(d => d.id === destinationId);
    showToast(`${dest ? dest.name : 'Destination'} added to your trip ✦`);
  }

  function removeFromTrip(destinationId) {
    const idx = tripItems.indexOf(destinationId);
    if (idx !== -1) tripItems.splice(idx, 1);
    renderTripItems();
    updateAddBtns();

    if (tripItems.length === 0) {
      tripPanel.classList.remove('open');
      tripPanelOpen = false;
    }
  }

  function clearTrip() {
    tripItems.length = 0;
    renderTripItems();
    updateAddBtns();
    tripPanel.classList.remove('open');
    tripPanelOpen = false;
    showToast('Trip cleared');
  }

  function renderTripItems() {
    tripItemsEl.innerHTML = '';
    let total = 0;

    tripItems.forEach(id => {
      const dest = VOYAGER.destinations.find(d => d.id === id);
      if (!dest) return;
      total += dest.price;

      const item = document.createElement('div');
      item.className = 'trip-item';
      item.role = 'listitem';
      item.innerHTML = `
        <img class="trip-item-img" src="${dest.image}" alt="${dest.name}" loading="lazy" />
        <div>
          <div class="trip-item-name">${dest.name}</div>
          <div class="trip-item-country">${dest.country}</div>
        </div>
        <button class="trip-item-remove" data-id="${dest.id}" aria-label="Remove ${dest.name} from trip" title="Remove">✕</button>
      `;
      tripItemsEl.appendChild(item);
    });

    // Update count badge
    tripCountBadge.textContent = tripItems.length;
    tripCountBadge.setAttribute('aria-label', `${tripItems.length} destinations added`);

    // Update total
    tripTotalEl.textContent = '$' + total.toLocaleString();

    // Bind remove buttons
    tripItemsEl.querySelectorAll('.trip-item-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromTrip(btn.dataset.id));
    });
  }

  function updateAddBtns() {
    document.querySelectorAll('.dest-card-add-btn').forEach(btn => {
      const id = btn.closest('.dest-card').dataset.destId;
      if (tripItems.includes(id)) {
        btn.classList.add('added');
        btn.title = 'Added to trip';
        btn.textContent = '✓';
      } else {
        btn.classList.remove('added');
        btn.title = 'Add to trip';
        btn.textContent = '+';
      }
    });
  }

  // Toggle panel
  tripPanelHandle.addEventListener('click', () => {
    if (tripItems.length === 0) return;
    tripPanelOpen = !tripPanelOpen;
    tripPanel.classList.toggle('open', tripPanelOpen);
    tripPanelHandle.setAttribute('aria-expanded', String(tripPanelOpen));
  });

  tripClearBtn.addEventListener('click', clearTrip);

  tripInquiryBtn.addEventListener('click', () => {
    if (tripItems.length === 0) {
      showToast('Add destinations to your trip first.');
      return;
    }
    openConfirm('Traveler');
  });

  // ============================================================
  // INSIDER'S PICK BOOK BUTTON
  // ============================================================
  const insiderBookBtn = document.getElementById('insider-book-btn');
  if (insiderBookBtn) {
    insiderBookBtn.addEventListener('click', () => {
      const pick = VOYAGER.insiderPick;
      if (pick && pick.destinationId) {
        openModal(pick.destinationId);
      }
    });
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  window.VoyagerBooking = {
    openModal,
    closeModal,
    addToTrip,
    removeFromTrip,
    clearTrip,
    showToast,
    openConfirm,
  };

})();
