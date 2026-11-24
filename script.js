// VECTOR Prints · fit to print — zero dependencies.
// <section class="vp" data-assets="assets/"></section> becomes the whole app: home and print settings.
// "Fill the paper" lets a square photo run past the top and bottom of a 10 × 15 sheet (the ears go);
// "Whole photo" shrinks it inside the same sheet: the ears come back, white borders appear left and right.
;(() => {
  'use strict';

  const svg = (d, o = {}) => `<svg width="${o.s || 18}" height="${o.s || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${o.w || 1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const P = {
    home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
    photos: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/>',
    albums: '<path d="M4 7h16v12H4zM7 4h10"/>',
    prints: '<path d="M7 9V3h10v6M6 17H4v-7h16v7h-2M7 14h10v7H7z"/>',
    frames: '<rect x="4" y="4" width="16" height="16"/><rect x="8" y="8" width="8" height="8"/>',
    books: '<path d="M4 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-7M20 5v12h-7"/>',
    orders: '<path d="M5 7h14l-1 13H6zM9 7a3 3 0 0 1 6 0"/>',
    gifts: '<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 20h16"/>',
    cart: '<path d="M3 4h3l2 11h11l2-8H7"/><circle cx="10" cy="19" r="1.4"/><circle cx="18" cy="19" r="1.4"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>',
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>',
  };
  const NAV = [['home', 'Home'], ['photos', 'Photos'], ['albums', 'Albums'], ['prints', 'Prints'], ['frames', 'Frames'], ['books', 'Photo books'], ['orders', 'Orders'], ['gifts', 'Gifts']];
  const READY = [
    ['biscuit', 'Biscuit in the park', 'Nov 16 · square photo', 'Biscuit the dog sitting on the grass'],
    ['lake', 'Lake Orta at 7 am', 'Nov 19 · 4:3 photo', 'Lake at dawn with mountains'],
    ['cake', 'Grandma’s 80th', 'Nov 21 · 3:2 photo', 'Birthday cake with candles'],
    ['tram', 'Tram 12, late', 'Nov 22 · 4:3 photo', 'Yellow tram on a night street'],
  ];
  const WEEK = [['beach', 'Beach'], ['coffee', 'Coffee cup'], ['snow', 'Snowy street'], ['sunflowers', 'Sunflower field'], ['forest', 'Forest path'], ['lake', 'Lake'], ['cake', 'Candles']];
  const FIT = {
    fill: 'Fill the paper · top and bottom 2.5 cm cut off',
    whole: 'Whole photo · white borders 2.5 cm left and right',
  };

  class PrintsApp {
    constructor(root) {
      this.root = root;
      const A = root.dataset.assets || 'assets/';
      const img = (n, alt = '') => `<img src="${A}${n}.jpg" alt="${alt}">`;
      root.innerHTML = `
<nav class="vp-side" aria-label="Main">
  <div class="vp-logo"><svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="6" width="17" height="15" rx="2" fill="none" stroke="#3FA7D6" stroke-width="2"/><path d="M7 3h16v14" fill="none" stroke="#EDEAE3" stroke-width="2"/></svg><b>VECTOR</b><span>Prints</span></div>
  ${NAV.map(([k, t]) => `<a class="vp-nav" href="#" data-nav="${k}">${svg(P[k])}${t}${k === 'orders' ? '<span class="vp-count">1</span>' : ''}</a>`).join('')}
  <div class="vp-side-foot">
    <div class="vp-lib"><div class="vp-small">Mac library</div><div class="vp-strong" style="margin-top:2px">2,418 photos</div><div class="vp-bar"><span style="width:62%"></span></div></div>
    <div class="vp-me"><span class="vp-av a1">MH</span><div><div style="font-size:13.5px;font-weight:600">Mira Holt</div><div style="font-size:12px;color:var(--vp-muted)">Family plan</div></div></div>
  </div>
</nav>
<div class="vp-col">
  <header class="vp-top">
    <label class="vp-search">${svg(P.search, { s: 16, w: 2 })}<span class="vp-sr">Search</span><input type="search" placeholder="Search photos, places, dates"></label>
    <div class="vp-top-r">
      <button class="vp-ghost" type="button">${svg(P.upload, { s: 16, w: 2 })}Upload</button>
      <button class="vp-ib" type="button" aria-label="Cart, 3 prints" data-cart>${svg(P.cart, { s: 19 })}<span class="vp-dot" data-cart-n>3</span></button>
      <button class="vp-ib" type="button" aria-label="Notifications">${svg(P.bell, { s: 19 })}</button>
      <span class="vp-av a1">MH</span>
    </div>
  </header>
  <div class="vp-views">
    <div class="vp-view vp-home" data-view="home">
      <main class="vp-home-main">
        <div><h1 class="vp-h1">Good afternoon, Mira</h1><p class="vp-sub">4 photos from this week will look great on paper</p></div>
        <section aria-label="Ready to print">
          <div class="vp-sec-h"><h2>Ready to print</h2><a class="vp-link" href="#">See all 12</a></div>
          <div class="vp-ready">${READY.map(([n, t, m, alt], i) => `
            <article class="vp-card">
              <div class="vp-shot">${img(n, alt)}${i === 0 ? '<span class="vp-new">New</span>' : ''}</div>
              <div><div class="vp-t">${t}</div><div class="vp-m">${m}</div></div>
              <button class="vp-pr" type="button" ${i === 0 ? 'data-print' : ''} aria-label="Print ${t}">${svg(P.prints, { s: 14, w: 2 })}Print</button>
            </article>`).join('')}
          </div>
        </section>
        <section aria-label="This week">
          <div class="vp-sec-h"><h2>This week</h2><span class="vp-small" style="font-size:13px">48 new photos</span></div>
          <div class="vp-week">${WEEK.map(([n, alt]) => img(n, alt)).join('')}<div class="vp-more">+41</div></div>
        </section>
        <section aria-label="Albums">
          <div class="vp-sec-h"><h2>Albums</h2><a class="vp-link" href="#">All albums</a></div>
          <div class="vp-albums">
            <a class="vp-card vp-album" href="#">${img('biscuit')}<span><span class="vp-t" style="display:block">Biscuit</span><span class="vp-m" style="display:block">154 photos · since 2023</span></span></a>
            <a class="vp-card vp-album" href="#">${img('lake')}<span><span class="vp-t" style="display:block">Lake Orta, November</span><span class="vp-m" style="display:block">86 photos · 3 shared</span></span></a>
            <a class="vp-card vp-album" href="#">${img('cake')}<span><span class="vp-t" style="display:block">Holt family</span><span class="vp-m" style="display:block">312 photos · 5 people</span></span></a>
          </div>
        </section>
      </main>
      <aside class="vp-home-side" aria-label="Order and sharing">
        <section class="vp-card vp-box">
          <div class="vp-sec-h" style="margin:0"><h2>Your order</h2><span class="vp-small">3 prints</span></div>
          <div class="vp-line-item">${img('lake')}<div><div class="vp-li-t">Lake Orta</div><div class="vp-li-m">13 × 18 cm · Lustre · 1</div></div><span style="font-size:13.5px">$0.90</span></div>
          <div class="vp-line-item">${img('cake')}<div><div class="vp-li-t">Grandma’s 80th</div><div class="vp-li-m">10 × 15 cm · Matte · 2</div></div><span style="font-size:13.5px">$0.80</span></div>
          <div class="vp-total"><span style="color:var(--vp-muted)">Subtotal</span><b>$1.70</b></div>
          <button class="vp-wide" type="button">Review order</button>
        </section>
        <section class="vp-card vp-box vp-ship"><i>${svg(P.truck, { s: 22 })}</i><div><div class="vp-strong">Arrives Fri, Nov 29</div><div class="vp-small" style="margin-top:2px">Courier · free delivery from $15</div></div></section>
        <section class="vp-card vp-box">
          <div class="vp-sec-h" style="margin:0"><h2>Holt family album</h2><span class="vp-small">312 photos</span></div>
          <div class="vp-feed"><span class="vp-av s a2">LH</span><span>Lea added 12 photos</span><span>2 h</span></div>
          <div class="vp-feed"><span class="vp-av s a3">OH</span><span>Oskar liked Lake Orta</span><span>5 h</span></div>
          <div class="vp-feed"><span class="vp-av s a4">DK</span><span>Daria ordered a photo book</span><span>1 d</span></div>
        </section>
      </aside>
    </div>

    <div class="vp-view vp-print" data-view="print">
      <main class="vp-print-main">
        <div class="vp-head">
          <div>
            <div class="vp-crumbs"><a href="#" data-back>Home</a><span>/</span><span>Ready to print</span></div>
            <h1>Biscuit in the park</h1>
            <div class="vp-m">Nov 16 · Riverside Park · 3024 × 3024</div>
          </div>
          <div class="vp-head-r"><button type="button">Edit photo</button><button type="button">Print preview</button></div>
        </div>
        <div class="vp-table">
          <div class="vp-stage">
            <img class="vp-ghost-photo" src="${A}biscuit.jpg" alt="">
            <div class="vp-sheet"><img class="vp-photo" src="${A}biscuit.jpg" alt="Biscuit the dog sitting on the grass"></div>
            <div class="vp-cut" style="top:94px"></div><div class="vp-cut" style="top:474px"></div>
            <div class="vp-chip" role="status">${svg(P.scissors, { s: 15, w: 2 })}Ears will be cut off in print</div>
          </div>
        </div>
        <div class="vp-strip">
          <span>In this order</span>
          <button class="vp-thumb is-on" type="button" aria-label="Biscuit in the park, selected">${img('biscuit')}</button>
          <button class="vp-thumb" type="button" aria-label="Lake Orta at 7 am">${img('lake')}</button>
          <button class="vp-thumb" type="button" aria-label="Grandma’s 80th">${img('cake')}</button>
          <button class="vp-add" type="button" aria-label="Add photos">+</button>
          <span class="vp-caption" aria-live="polite" data-caption></span>
        </div>
      </main>
      <aside class="vp-set" aria-label="Print settings">
        <div><h2>Print settings</h2><div class="vp-small" style="margin-top:4px">biscuit-in-the-park.jpg · Excellent quality</div></div>
        <div><div class="vp-label">Size</div>
          <div class="vp-sizes">
            <button class="vp-size" type="button" aria-pressed="false">9 × 13 cm<span>$0.32</span></button>
            <button class="vp-size" type="button" aria-pressed="true">10 × 15 cm<span>$0.40</span></button>
            <button class="vp-size" type="button" aria-pressed="false">13 × 18 cm<span>$0.90</span></button>
            <button class="vp-size" type="button" aria-pressed="false">15 × 20 cm<span>$1.40</span></button>
          </div>
        </div>
        <fieldset><legend class="vp-label">Fit on paper</legend>
          <div class="vp-fits">
            <label class="vp-fit" data-fit="fill"><input type="radio" name="vp-fit" value="fill">
              <svg width="34" height="24" viewBox="0 0 34 24" aria-hidden="true"><rect x="1" y="3" width="32" height="18" fill="#E9E4D8"/><rect x="1" y="1" width="32" height="22" fill="#6F8D4A" opacity=".85"/></svg>
              <span><b>Fill the paper</b><small>Edges may be cut</small></span></label>
            <label class="vp-fit" data-fit="whole"><input type="radio" name="vp-fit" value="whole">
              <svg width="34" height="24" viewBox="0 0 34 24" aria-hidden="true"><rect x="1" y="3" width="32" height="18" fill="#E9E4D8"/><rect x="10" y="3" width="14" height="18" fill="#6F8D4A"/></svg>
              <span><b>Whole photo</b><small>White borders</small></span></label>
          </div>
        </fieldset>
        <div><div class="vp-label">Paper</div>
          <div class="vp-segs"><button class="vp-seg" type="button" aria-pressed="true">Matte</button><button class="vp-seg" type="button" aria-pressed="false">Lustre</button><button class="vp-seg" type="button" aria-pressed="false">Gloss</button></div>
        </div>
        <div class="vp-copies"><span>Copies</span><div class="vp-step"><button type="button" aria-label="Fewer copies">−</button><output>1</output><button type="button" aria-label="More copies">+</button></div></div>
        <div class="vp-quality">
          <div><span style="color:var(--vp-muted)">Print quality</span><span style="color:var(--vp-ink-soft);font-weight:600">Excellent · 300 dpi</span></div>
          <div class="vp-bar"><span style="width:92%"></span></div>
          <div><span style="color:var(--vp-muted)">Back of print</span><span style="color:var(--vp-text-2)">Biscuit · Nov 16</span></div>
        </div>
        <div class="vp-buy">
          <div class="vp-price"><span style="font-size:13.5px;color:var(--vp-muted)">1 print · 10 × 15 cm</span><b>$0.40</b></div>
          <button class="vp-add-order" type="button" data-add><span class="vp-add-idle">Add to order</span><span class="vp-add-done">${svg(P.check, { s: 18, w: 2.4 })}Added to order</span></button>
          <div class="vp-note"><span class="vp-add-idle">Arrives Fri, Nov 29 · free delivery from $15</span><span class="vp-add-done">4 prints in your order · subtotal $2.10</span></div>
        </div>
      </aside>
    </div>
  </div>
</div>`;
      this.views = [...root.querySelectorAll('.vp-view')];
      this.navs = [...root.querySelectorAll('.vp-nav')];
      this.caption = root.querySelector('[data-caption]');
      this.radios = [...root.querySelectorAll('.vp-fit input')];
      this.cart = root.querySelector('[data-cart]');
      this.cartN = root.querySelector('[data-cart-n]');
      root.querySelector('[data-add]').addEventListener('click', () => this.addToOrder());
      root.querySelector('[data-print]').addEventListener('click', () => this.go('print'));
      root.querySelector('[data-back]').addEventListener('click', e => { e.preventDefault(); this.go('home'); });
      root.querySelector('[data-nav="home"]').addEventListener('click', e => { e.preventDefault(); this.go('home'); });
      root.querySelector('[data-nav="prints"]').addEventListener('click', e => { e.preventDefault(); this.go('print'); });
      this.radios.forEach(r => r.addEventListener('change', () => this.setFit(r.value)));
      // the demo cursor clicks the card itself; a real click on the card reaches the radio through the label
      root.querySelectorAll('.vp-fit').forEach(l => l.addEventListener('click', () => this.setFit(l.dataset.fit)));
      root.querySelectorAll('.vp-size, .vp-seg').forEach(b => b.addEventListener('click', () => {
        b.parentElement.querySelectorAll('[aria-pressed]').forEach(x => x.setAttribute('aria-pressed', x === b));
      }));
      this.reset();
    }

    go(view, quiet = false) {
      if (quiet) this.root.classList.add('is-instant');
      this.root.dataset.view = view;
      this.views.forEach(v => v.classList.toggle('is-on', v.dataset.view === view));
      this.navs.forEach(n => n.classList.toggle('is-on', n.dataset.nav === (view === 'print' ? 'prints' : 'home')));
      if (quiet) requestAnimationFrame(() => requestAnimationFrame(() => this.root.classList.remove('is-instant')));
    }

    // the photo and its faded overflow share one transform, so the ears travel down onto the paper
    setFit(fit, quiet = false) {
      if (fit !== 'fill' && fit !== 'whole') return;
      if (quiet) this.root.classList.add('is-instant');
      this.root.dataset.fit = fit;
      this.radios.forEach(r => { r.checked = r.value === fit; });
      this.caption.textContent = FIT[fit];
      if (quiet) requestAnimationFrame(() => requestAnimationFrame(() => this.root.classList.remove('is-instant')));
    }

    // the print goes into the order once: the button turns into "Added to order", the cart counts 3 → 4
    addToOrder(on = true) {
      this.root.dataset.added = on;
      this.cartN.textContent = on ? 4 : 3;
      this.cart.setAttribute('aria-label', `Cart, ${on ? 4 : 3} prints`);
    }

    reset() {
      this.addToOrder(false);
      this.setFit('fill', true);
      this.go('home', true);
    }
  }

  document.querySelectorAll('.vp').forEach(el => { el.printsApp = new PrintsApp(el); });
})();
