/**
 * THE GENTLE MEN — Core JavaScript Engine
 * Handles Theme Toggling, Quick Search Command Palette (Cmd+K),
 * LocalStorage Bookmarks, and UI Interactions.
 */

(function () {
  'use strict';

  // --- 1. Search Index Data Registry ---
  const SITE_INDEX = [
    // --- Category Hubs ---
    { title: 'The Cloth', subtitle: 'Sartorial culture, tailoring architecture, and textile integrity.', url: '/categories/the-cloth.html', category: 'Category Hub', type: 'Category' },
    { title: 'The Hand', subtitle: 'Artisanal horology, workshop craft, joinery, and architectural design.', url: '/categories/the-hand.html', category: 'Category Hub', type: 'Category' },
    { title: 'The Mind', subtitle: 'Classical philosophy, literary essays, stoic discipline, and character.', url: '/categories/the-mind.html', category: 'Category Hub', type: 'Category' },
    { title: 'The Table', subtitle: 'Gastronomy, living wines, seasonal craft, and the art of fellowship.', url: '/categories/the-table.html', category: 'Category Hub', type: 'Category' },
    { title: 'The Compass', subtitle: 'Slow pilgrimage, architectural sanctuaries, and quiet topography.', url: '/categories/the-compass.html', category: 'Category Hub', type: 'Category' },

    // --- Special Reference & Protocol Pages ---
    { title: 'The Canon', subtitle: 'The 50 Perennial Objects and Ideas Tested for a Lifetime of Use.', url: '/canon.html', category: 'Reference', type: 'The Canon' },
    { title: 'The Gentle Manifesto', subtitle: 'Strength through Gentleness — The Foundational Charter of Refined Living.', url: '/manifesto.html', category: 'Philosophy', type: 'Manifesto' },
    { title: 'Editorial Research Charter', subtitle: 'Our 24-point mandatory protocol for evidence, fact-checking, and primary sources.', url: '/research-charter.html', category: 'Standards', type: 'Protocol' },
    { title: 'Colophon', subtitle: 'Publication history, typography specimens, technology stack, and masthead.', url: '/colophon.html', category: 'About', type: 'Colophon' },

    // Flagship Researched Articles (1-12)
    { title: 'The Dignity of the Unlined Jacket: Anatomy of Neapolitan Soft Tailoring', subtitle: 'Why the removal of structural padding reveals the true mastery of cutter craft.', url: '/articles/the-dignity-of-the-unlined-jacket.html', category: 'The Cloth', type: 'Article' },
    { title: 'The Thirty-Year Shoe: Mechanical Realities of the Goodyear Welt', subtitle: 'An empirical investigation into leather fatigue, resoling thresholds, and patina.', url: '/articles/the-thirty-year-shoe.html', category: 'The Cloth', type: 'Article' },
    { title: 'The Last Watchmakers of the Vallée de Joux: The Micro-Mechanics of Mortality', subtitle: 'Inside independent Swiss ateliers where hand-beveled anglage resists automation.', url: '/articles/the-last-watchmakers-of-the-vallee-de-joux.html', category: 'The Hand', type: 'Article' },
    { title: 'The Living Oak: Engineering and Philosophy of Japanese Sashimono Joinery', subtitle: 'How blind interlocking joints accommodate hygroscopic wood expansion for centuries.', url: '/articles/the-living-oak-sashimono.html', category: 'The Hand', type: 'Article' },
    { title: 'Solitude as a Daily Discipline: The Architecture of the Unplugged Hour', subtitle: 'Contrasting destructive isolation with generative otium through Seneca and Montaigne.', url: '/articles/solitude-as-a-daily-discipline.html', category: 'The Mind', type: 'Article' },
    { title: 'The Weight of the Hand-Penned Letter: Epistolary Culture as Moral Ceremony', subtitle: 'The physical ceremony of rag paper and fountain pen ink as an antidote to fast messages.', url: '/articles/the-weight-of-the-hand-penned-letter.html', category: 'The Mind', type: 'Article' },
    { title: 'Fatherhood as Moral Stewardship: The Quiet Discipline of Mentorship', subtitle: 'How children internalize ethical fortitude and emotional constancy through example.', url: '/articles/fatherhood-as-moral-stewardship.html', category: 'The Mind', type: 'Article' },
    { title: 'The Alchemy of the Seasoned Skillet: Polymerization, Iron, and Fire', subtitle: 'The precise chemical mechanisms of fatty acid bonding and thermal mass kinetics.', url: '/articles/the-alchemy-of-the-seasoned-skillet.html', category: 'The Table', type: 'Article' },
    { title: 'Living Wine: Terroir, Indigenous Yeasts, and the Fallacy of Uniformity', subtitle: 'How low-intervention biodynamic viticulture preserves vineyard microbiome memory.', url: '/articles/living-wine-terroir-and-memory.html', category: 'The Table', type: 'Article' },
    { title: 'The Architecture of the Long Evening: The Art of Civilized Hospitality', subtitle: 'The acoustic, pacing, and lighting orchestration that fosters authentic discourse.', url: '/articles/the-architecture-of-the-long-evening.html', category: 'The Table', type: 'Article' },
    { title: 'Sanctuaries of Silence: A Walking Pilgrimage Through Mount Kōya', subtitle: 'Sensory architecture and morning liturgy in temple lodgings of Wakayama.', url: '/articles/sanctuaries-of-silence-mount-koya.html', category: 'The Compass', type: 'Article' },
    { title: 'The Alpine Refuge: Architecture for Solitary Thought', subtitle: 'Examining austere gneiss stone and larch shelters in the Swiss Grisons.', url: '/articles/the-alpine-refuge.html', category: 'The Compass', type: 'Article' }
  ];

  // --- 2. Theme Management Module ---
  const ThemeModule = {
    STORAGE_KEY: 'tgm-theme',

    init: function () {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      if (savedTheme) {
        this.setTheme(savedTheme, false);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light', false);
      }
      const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
      toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });
      this.updateButtonIcons();
    },

    getTheme: function () {
      return document.documentElement.getAttribute('data-theme') || 'light';
    },
    setTheme: function (theme, save = true) {
      document.documentElement.setAttribute('data-theme', theme);
      if (save) {
        localStorage.setItem(this.STORAGE_KEY, theme);
      }
      this.updateButtonIcons();
    },

    toggle: function () {
      const current = this.getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      this.setTheme(next, true);
    },

    updateButtonIcons: function () {
      const current = this.getTheme();
      const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
      toggleButtons.forEach(btn => {
        btn.innerHTML = current === 'dark' ? '☀️' : '🌙';
        btn.setAttribute('aria-label', `Switch to ${current === 'dark' ? 'Light' : 'Dark'} Mode`);
        btn.title = `Switch to ${current === 'dark' ? 'Light' : 'Dark'} Mode`;
      });
    }
  };

  // --- 3. Command Palette Search Module ---
  const CommandPaletteModule = {
    overlay: null,
    input: null,
    resultsList: null,
    selectedIndex: 0,
    currentResults: [],
    init: function () {
      this.createModal();
      this.bindEvents();
    },
    createModal: function () {
      let overlay = document.querySelector('.command-palette-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'command-palette-overlay';
        overlay.innerHTML = `
          <div class="command-palette-modal" role="dialog" aria-modal="true" aria-label="Search The Gentle Men">
            <div class="palette-input-wrap">
              <span>🔍</span>
              <input type="text" class="palette-input" placeholder="Search essays, craft, canon, philosophy..." autocomplete="off" spellcheck="false">
            </div>
            <ul class="palette-results-list" role="listbox"></ul>
            <div class="palette-footer">
              <span>Navigate: <strong>↑</strong> <strong>↓</strong> | Select: <strong>↵</strong></span>
              <span>Close: <strong>ESC</strong></span>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);
      }
      this.overlay = overlay;
      this.input = overlay.querySelector('.palette-input');
      this.resultsList = overlay.querySelector('.palette-results-list');
    },
    bindEvents: function () {
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.open();
        } else if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        } else if (this.isOpen()) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.moveSelection(1);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.moveSelection(-1);
          } else if (e.key === 'Enter') {
            e.preventDefault();
            this.selectCurrent();
          }
        }
      });
      const triggers = document.querySelectorAll('.search-trigger');
      triggers.forEach(t => t.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      }));
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
      this.input.addEventListener('input', () => {
        this.renderResults(this.input.value.trim());
      });
    },
    open: function () {
      this.overlay.classList.add('open');
      this.input.value = '';
      this.renderResults('');
      setTimeout(() => this.input.focus(), 50);
      document.body.style.overflow = 'hidden';
    },
    close: function () {
      this.overlay.classList.remove('open');
      document.body.style.overflow = '';
    },
    isOpen: function () {
      return this.overlay.classList.contains('open');
    },
    renderResults: function (query) {
      const q = query.toLowerCase();
      this.currentResults = SITE_INDEX.filter(item => {
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      });
      this.selectedIndex = 0;
      this.resultsList.innerHTML = '';
      if (this.currentResults.length === 0) {
        this.resultsList.innerHTML = `
          <li style="padding: 2rem 1.5rem; text-align: center; color: var(--text-muted); font-style: italic;">
            No corresponding entries found in the archive.
          </li>
        `;
        return;
      }
      this.currentResults.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = `palette-result-item ${idx === 0 ? 'selected' : ''}`;
        li.setAttribute('role', 'option');
        li.innerHTML = `
          <div class="result-text">
            <span class="result-title">${item.title}</span>
            <span class="result-subtitle">${item.subtitle}</span>
          </div>
          <span class="result-cat-badge">${item.category}</span>
        `;
        li.addEventListener('click', () => {
          window.location.href = item.url;
        });
        this.resultsList.appendChild(li);
      });
    },
    moveSelection: function (delta) {
      if (this.currentResults.length === 0) return;
      const items = this.resultsList.querySelectorAll('.palette-result-item');
      if (items.length === 0) return;
      items[this.selectedIndex].classList.remove('selected');
      this.selectedIndex = (this.selectedIndex + delta + items.length) % items.length;
      items[this.selectedIndex].classList.add('selected');
      items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
    },
    selectCurrent: function () {
      if (this.currentResults.length > 0 && this.currentResults[this.selectedIndex]) {
        window.location.href = this.currentResults[this.selectedIndex].url;
      }
    }
  };

  // --- 4. Bookmarks Management Module ---
  const BookmarkModule = {
    STORAGE_KEY: 'tgm-bookmarks',

    init: function () {
      this.updateNavBadge();
      this.initArticleButtons();
    },

    getBookmarks: function () {
      try {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
      } catch (e) {
        return [];
      }
    },

    isBookmarked: function (url) {
      return this.getBookmarks().includes(url);
    },

    toggleBookmark: function (url) {
      let list = this.getBookmarks();
      if (list.includes(url)) {
        list = list.filter(u => u !== url);
      } else {
        list.push(url);
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      this.updateNavBadge();
      this.updateButtonStates();
    },

    updateNavBadge: function () {
      const count = this.getBookmarks().length;
      const badges = document.querySelectorAll('.bookmark-counter-badge');
      badges.forEach(b => {
        b.textContent = count;
        b.style.display = count > 0 ? 'inline-flex' : 'none';
      });
    },

    initArticleButtons: function () {
      const buttons = document.querySelectorAll('.bookmark-btn');
      const currentPath = window.location.pathname;
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetUrl = btn.getAttribute('data-url') || currentPath;
          this.toggleBookmark(targetUrl);
        });
      });
      this.updateButtonStates();
    },
    updateButtonStates: function () {
      const buttons = document.querySelectorAll('.bookmark-btn');
      const currentPath = window.location.pathname;
      buttons.forEach(btn => {
        const targetUrl = btn.getAttribute('data-url') || currentPath;
        const saved = this.isBookmarked(targetUrl);
        btn.classList.toggle('active', saved);
        btn.innerHTML = saved ? '★ Saved to Archive' : '☆ Save Article';
      });
    }
  };

  // --- 5. Mobile Drawer Navigation Module ---
  const MobileDrawerModule = {
    init: function () {
      const toggle = document.querySelector('.mobile-nav-toggle');
      let drawer = document.querySelector('.mobile-drawer');
      if (!drawer && toggle) {
        drawer = document.createElement('div');
        drawer.className = 'mobile-drawer';
        drawer.innerHTML = `
          <div class="mobile-drawer-content">
            <button class="mobile-drawer-close" aria-label="Close menu">&times;</button>
            <ul class="mobile-nav-list">
              <li><a href="/">Home</a></li>
              <li><a href="/categories/the-cloth.html">The Cloth</a></li>
              <li><a href="/categories/the-hand.html">The Hand</a></li>
              <li><a href="/categories/the-mind.html">The Mind</a></li>
              <li><a href="/categories/the-table.html">The Table</a></li>
              <li><a href="/categories/the-compass.html">The Compass</a></li>
              <li><a href="/canon.html">The Canon</a></li>
              <li><a href="/manifesto.html">Manifesto</a></li>
              <li><a href="/research-charter.html">Research Charter</a></li>
              <li><a href="/colophon.html">Colophon</a></li>
            </ul>
          </div>
        `;
        document.body.appendChild(drawer);
      }
      if (toggle && drawer) {
        const closeBtn = drawer.querySelector('.mobile-drawer-close');
        toggle.addEventListener('click', () => drawer.classList.add('open'));
        closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
        drawer.addEventListener('click', (e) => {
          if (e.target === drawer) drawer.classList.remove('open');
        });
      }
    }
  };

  // --- 6. DOM Ready Orchestration ---
  document.addEventListener('DOMContentLoaded', function () {
    ThemeModule.init();
    CommandPaletteModule.init();
    BookmarkModule.init();
    MobileDrawerModule.init();
  });
})();
