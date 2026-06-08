/* ============================================================
   VOYAGER — app.js
   Main init, card rendering, mood filter, search autocomplete,
   insider pick, CTA buttons, newsletter
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // RENDER DESTINATION CARDS (Navy Discover Grid)
  // ============================================================
  const destinationGrid = document.getElementById('destination-grid');

  function renderDestinationCards(destinations) {
    destinationGrid.innerHTML = '';

    destinations.forEach((dest, i) => {
      const card = createDestCard(dest);
      destinationGrid.appendChild(card);
    });

    // Re-init scroll reveal for new cards
    if (window.VoyagerAnimations) {
      window.VoyagerAnimations.reinitReveal();
    }
  }

  function createDestCard(dest) {
    const article = document.createElement('article');
    article.className = 'dest-card';
    article.dataset.destId = dest.id;
    article.dataset.moods  = dest.moods.join(' ');
    article.role = 'listitem';
    article.tabIndex = 0;
    article.setAttribute('aria-label', `${dest.name}, ${dest.country}`);

    const starFull = Math.floor(dest.rating);
    const stars    = '★'.repeat(starFull);

    article.innerHTML = `
      <div class="dest-card-img-wrap">
        <img class="dest-card-img" src="${dest.image}" alt="${dest.name}, ${dest.country}" loading="lazy" />
        <div class="dest-card-overlay"></div>
        <button class="dest-card-add-btn" data-action="add" aria-label="Add ${dest.name} to trip" title="Add to trip">+</button>
        <div class="dest-card-info">
          <div class="dest-card-region">${dest.region}</div>
          <h3 class="dest-card-name">${dest.name}</h3>
          <div class="dest-card-meta">
            <div class="dest-card-rating">
              <span class="dest-card-rating-star">${stars}</span>
              <span>${dest.rating}</span>
            </div>
            <div class="dest-card-price">$${dest.price.toLocaleString()} <span>/ person</span></div>
          </div>
        </div>
        <div class="dest-card-detail" aria-hidden="true">
          <p class="dest-card-short-desc">${dest.shortDesc}</p>
          <button class="dest-card-view-btn" data-action="view" aria-label="View ${dest.name}">
            View Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
          </button>
        </div>
      </div>
    `;

    article.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      if (btn.dataset.action === 'add') { e.stopPropagation(); VoyagerBooking.addToTrip(dest.id); }
      if (btn.dataset.action === 'view') { e.stopPropagation(); VoyagerBooking.openModal(dest.id); }
    });
    article.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); VoyagerBooking.openModal(dest.id); }
    });

    return article;
  }

  // ============================================================
  // MOOD FILTER
  // ============================================================
  const moodPills = document.getElementById('mood-pills');
  let activeMood  = 'all';

  function initMoodFilter() {
    moodPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.mood-pill');
      if (!pill) return;

      const mood = pill.dataset.mood;
      if (mood === activeMood) return;

      // Update active state
      moodPills.querySelectorAll('.mood-pill').forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      activeMood = mood;

      // Filter cards
      filterCards(mood);
    });
  }

  function filterCards(mood) {
    const cards = destinationGrid.querySelectorAll('.dest-card');
    cards.forEach(card => {
      const cardMoods = card.dataset.moods || '';
      if (mood === 'all' || cardMoods.includes(mood)) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });
  }

  // ============================================================
  // SEARCH AUTOCOMPLETE
  // ============================================================
  const searchInput     = document.getElementById('search-destination');
  const autocompleteList = document.getElementById('autocomplete-list');
  const heroSearchBtn   = document.getElementById('hero-search-btn');

  let focusedItem = -1;

  function initSearch() {
    if (!searchInput || !autocompleteList) return;
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 1) {
        hideAutocomplete();
        return;
      }
      showAutocomplete(q);
    });

    searchInput.addEventListener('keydown', (e) => {
      const items = autocompleteList.querySelectorAll('.autocomplete-item');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusedItem = Math.min(focusedItem + 1, items.length - 1);
        updateFocusedItem(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusedItem = Math.max(focusedItem - 1, -1);
        updateFocusedItem(items);
      } else if (e.key === 'Enter') {
        if (focusedItem >= 0 && items[focusedItem]) {
          items[focusedItem].click();
        } else {
          doSearch(searchInput.value);
        }
      } else if (e.key === 'Escape') {
        hideAutocomplete();
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
        hideAutocomplete();
      }
    });

    heroSearchBtn.addEventListener('click', () => {
      doSearch(searchInput.value);
    });
  }

  function showAutocomplete(query) {
    const matches = VOYAGER.destinations.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.country.toLowerCase().includes(query) ||
      d.region.toLowerCase().includes(query) ||
      d.tags.some(t => t.toLowerCase().includes(query))
    ).slice(0, 6);

    autocompleteList.innerHTML = '';
    focusedItem = -1;

    if (matches.length === 0) {
      hideAutocomplete();
      return;
    }

    matches.forEach((dest, i) => {
      const li = document.createElement('li');
      li.className = 'autocomplete-item';
      li.role = 'option';
      li.tabIndex = -1;
      li.dataset.id = dest.id;
      li.innerHTML = `
        <span>📍</span>
        <span style="color:var(--ink)">${dest.name}</span>
        <span>${dest.country}</span>
      `;
      li.addEventListener('click', () => {
        searchInput.value = dest.name;
        hideAutocomplete();
        doSearch(dest.name, dest.id);
      });
      autocompleteList.appendChild(li);
    });

    autocompleteList.classList.add('visible');
  }

  function hideAutocomplete() {
    autocompleteList.classList.remove('visible');
    focusedItem = -1;
  }

  function updateFocusedItem(items) {
    items.forEach((item, i) => {
      item.classList.toggle('focused', i === focusedItem);
    });
  }

  function doSearch(query, destId) {
    hideAutocomplete();

    if (destId) {
      // Direct destination match — open modal
      VoyagerBooking.openModal(destId);
      return;
    }

    const q = query.trim().toLowerCase();
    if (!q) {
      // Scroll to discover section
      document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Match against destinations
    const match = VOYAGER.destinations.find(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q)
    );

    if (match) {
      VoyagerBooking.openModal(match.id);
    } else {
      // Scroll to discover and show all
      document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
      VoyagerBooking.showToast(`Showing all destinations for "${query}"`);
    }
  }

  // ============================================================
  // MOSAIC GRID (top 5 featured destinations)
  // ============================================================
  function renderMosaicGrid() {
    const mosaic = document.getElementById('dest-mosaic');
    if (!mosaic) return;

    const featured = VOYAGER.destinations.slice(0, 5);
    featured.forEach((dest, i) => {
      const tile = document.createElement('div');
      tile.className = 'dest-tile';
      tile.setAttribute('data-dest-id', dest.id);
      tile.setAttribute('role', 'listitem');

      tile.innerHTML = `
        <div class="dest-tile-img-wrap">
          <img class="dest-tile-img" src="${dest.heroImage || dest.image}" alt="${dest.name}" loading="lazy" />
        </div>
        <div class="dest-tile-overlay"></div>
        <div class="dest-tile-info">
          <span class="dest-tile-label">${dest.region}</span>
          <h3 class="dest-tile-name">${dest.name}, ${dest.country}</h3>
          <div class="dest-tile-price">from $${dest.price.toLocaleString()} / person</div>
        </div>
        <button class="dest-tile-btn" aria-label="View ${dest.name}">View Details</button>
      `;

      tile.addEventListener('click', () => VoyagerBooking.openModal(dest.id));
      mosaic.appendChild(tile);
    });
  }

  // ============================================================
  // POPULATE BOOKING BAR DESTINATIONS
  // ============================================================
  function populateBookingBar() {
    const sel = document.getElementById('bb-destination');
    if (!sel) return;
    VOYAGER.destinations.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = `${d.name}, ${d.country}`;
      sel.appendChild(opt);
    });

    document.getElementById('bb-search-btn').addEventListener('click', () => {
      const destId = sel.value;
      if (destId) {
        VoyagerBooking.openModal(destId);
      } else {
        document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ============================================================
  // BOOKING BAR SCROLL VISIBILITY
  // ============================================================
  function initBookingBarVisibility() {
    const bar = document.getElementById('booking-bar');
    if (!bar) return;

    let shown = false;
    window.addEventListener('scroll', () => {
      const heroH = document.getElementById('hero').offsetHeight;
      if (window.scrollY > heroH * 0.6 && !shown) {
        bar.classList.add('visible');
        shown = true;
      } else if (window.scrollY <= heroH * 0.3 && shown) {
        bar.classList.remove('visible');
        shown = false;
      }
    }, { passive: true });
  }

  // ============================================================
  // RENDER INSIDER'S PICK
  // ============================================================
  function renderInsiderPick() {
    const pick = VOYAGER.insiderPick;
    if (!pick) return;

    const imgEl   = document.getElementById('insider-img');
    const eyebrow = document.getElementById('insider-eyebrow');
    const title   = document.getElementById('insider-title');
    const quote   = document.getElementById('insider-quote');
    const body    = document.getElementById('insider-body');
    const priceEl = document.getElementById('insider-price');
    const monthEl = document.getElementById('insider-month-label');

    if (imgEl)   { imgEl.src = pick.image; imgEl.alt = pick.destination; }
    if (eyebrow) eyebrow.textContent = pick.destination;
    if (title)   title.textContent   = pick.intro;
    if (quote)   quote.textContent   = pick.pullQuote;
    if (body)    body.textContent    = pick.body;
    if (priceEl) priceEl.innerHTML   = `$${pick.price.toLocaleString()} <span>/ person</span>`;
    if (monthEl) monthEl.textContent = pick.month;
  }

  // ============================================================
  // RENDER REVIEWS
  // ============================================================
  function renderReviews() {
    const grid = document.getElementById('stories-grid');
    if (!grid) return;

    VOYAGER.reviews.forEach(review => {
      const card = document.createElement('article');
      card.className = 'review-card';
      card.role = 'listitem';

      const stars = '★'.repeat(review.rating);

      card.innerHTML = `
        <img class="review-trip-img" src="${review.tripImage}" alt="Trip to ${review.destination}" loading="lazy" />
        <div class="review-body">
          <div class="review-stars" aria-label="${review.rating} stars">${stars}</div>
          <p class="review-text">${review.text}</p>
          <div class="review-author">
            <img class="review-avatar" src="${review.avatar}" alt="${review.name}" loading="lazy" />
            <div>
              <div class="review-author-name">${review.name}</div>
              <div class="review-author-meta">${review.location} · ${review.date}</div>
            </div>
            <span class="review-destination-badge">✦ ${review.destination}</span>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // ============================================================
  // CTA BUTTONS
  // ============================================================
  function initCTAButtons() {
    const navBookBtn = document.getElementById('nav-book-btn');
    if (navBookBtn) {
      navBookBtn.addEventListener('click', () => {
        document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
      });
    }

    const insiderBookBtn = document.getElementById('insider-book-btn');
    if (insiderBookBtn) {
      insiderBookBtn.addEventListener('click', () => {
        const pick = VOYAGER.insiderPick;
        if (pick && pick.destinationId) VoyagerBooking.openModal(pick.destinationId);
      });
    }
  }

  // ============================================================
  // NEWSLETTER FORM
  // ============================================================
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      const btn   = form.querySelector('button');

      btn.textContent = '…';
      btn.disabled = true;

      await new Promise(r => setTimeout(r, 1000));

      btn.textContent = '✓ Done';
      VoyagerBooking.showToast(`Welcome aboard! Check ${email} for a confirmation.`);

      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.disabled    = false;
        form.reset();
      }, 3000);
    });
  }

  // ============================================================
  // DATE DEFAULTS FOR SEARCH
  // ============================================================
  function setDateDefaults() {
    const checkin  = document.getElementById('search-checkin');
    const checkout = document.getElementById('search-checkout');
    const bCheckin  = document.getElementById('booking-checkin');
    const bCheckout = document.getElementById('booking-checkout');

    const today = new Date();
    const plus30 = new Date(today);
    plus30.setDate(plus30.getDate() + 30);
    const plus37 = new Date(today);
    plus37.setDate(plus37.getDate() + 37);

    const fmt = d => d.toISOString().split('T')[0];

    if (checkin)  checkin.value  = fmt(plus30);
    if (checkout) checkout.value = fmt(plus37);
    if (checkin)  checkin.min    = fmt(today);
    if (checkout) checkout.min   = fmt(today);
    if (bCheckin)  bCheckin.min  = fmt(today);
    if (bCheckout) bCheckout.min = fmt(today);

    // Keep checkout after checkin
    if (checkin && checkout) {
      checkin.addEventListener('change', () => {
        if (checkout.value <= checkin.value) {
          const d = new Date(checkin.value);
          d.setDate(d.getDate() + 7);
          checkout.value = fmt(d);
        }
        checkout.min = checkin.value;
      });
    }

    if (bCheckin && bCheckout) {
      bCheckin.addEventListener('change', () => {
        if (bCheckout.value <= bCheckin.value) {
          const d = new Date(bCheckin.value);
          d.setDate(d.getDate() + 7);
          bCheckout.value = fmt(d);
        }
        bCheckout.min = bCheckin.value;
      });
    }
  }

  // ============================================================
  // MAIN INIT
  // ============================================================
  function init() {
    renderDestinationCards(VOYAGER.destinations);
    renderMosaicGrid();
    renderInsiderPick();
    renderReviews();
    initMoodFilter();
    initSearch();
    initCTAButtons();
    initNewsletter();
    setDateDefaults();
    populateBookingBar();
    // initBookingBarVisibility(); // Disabled, booking bar is now static under hero

    if (window.VoyagerAnimations) VoyagerAnimations.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
