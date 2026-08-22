const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update engine.js
const enginePath = path.join(rootDir, 'assets', 'js', 'engine.js');
let engineContent = fs.readFileSync(enginePath, 'utf8');

const svgIconsConsts = `
  const ICONS = {
    sun: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    moon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    search: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    bookmarkUnsaved: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',
    bookmarkSaved: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  };
`;

// Replace button icon update in engine.js
engineContent = engineContent.replace(
  /btn\.innerHTML = current === 'dark' \? '☀️' : '🌙';/g,
  `btn.innerHTML = current === 'dark' ? ICONS.sun : ICONS.moon;`
);

// Replace search modal search icon
engineContent = engineContent.replace(
  /<span>🔍<\/span>/g,
  `<span>${'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'}</span>`
);

// Replace bookmark button states
engineContent = engineContent.replace(
  /btn\.innerHTML = saved \? '★ Saved to Archive' : '☆ Save Article';/g,
  `btn.innerHTML = saved ? \`\${ICONS.bookmarkSaved} <span>Saved to Archive</span>\` : \`\${ICONS.bookmarkUnsaved} <span>Save Article</span>\`;`
);

// Replace drawer close button
engineContent = engineContent.replace(
  /<button class="mobile-drawer-close" aria-label="Close menu">&times;<\/button>/g,
  `<button class="mobile-drawer-close" aria-label="Close menu">\${ICONS.close}</button>`
);

// Insert ICONS right after 'use strict';
if (!engineContent.includes('const ICONS =')) {
  engineContent = engineContent.replace("'use strict';", `'use strict';\n${svgIconsConsts}`);
}

fs.writeFileSync(enginePath, engineContent);
console.log('✓ Updated engine.js with elegant SVG icons.');

// 2. Update all HTML files
const htmlFiles = [
  'index.html',
  'canon.html',
  'manifesto.html',
  'research-charter.html',
  'colophon.html',
  'categories/the-cloth.html',
  'categories/the-hand.html',
  'categories/the-mind.html',
  'categories/the-table.html',
  'categories/the-compass.html',
  'articles/the-dignity-of-the-unlined-jacket.html',
  'articles/the-thirty-year-shoe.html',
  'articles/the-last-watchmakers-of-the-vallee-de-joux.html',
  'articles/the-living-oak-sashimono.html',
  'articles/solitude-as-a-daily-discipline.html',
  'articles/the-weight-of-the-hand-penned-letter.html',
  'articles/fatherhood-as-moral-stewardship.html',
  'articles/the-alchemy-of-the-seasoned-skillet.html',
  'articles/living-wine-terroir-and-memory.html',
  'articles/the-architecture-of-the-long-evening.html',
  'articles/sanctuaries-of-silence-mount-koya.html',
  'articles/the-alpine-refuge.html'
];

const searchSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px; margin-right:4px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
const moonSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
const menuSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
const bookmarkUnsavedSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:5px;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>';

htmlFiles.forEach(file => {
  const fullPath = path.join(rootDir, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace search trigger icon
  content = content.replace(
    /<span>🔍<\/span>\s*<kbd>⌘K<\/kbd>/g,
    `${searchSvg} <kbd>⌘K</kbd>`
  );

  // Replace theme toggle button emoji
  content = content.replace(
    /<button class="btn-icon theme-toggle-btn" aria-label="Toggle theme">🌙<\/button>/g,
    `<button class="btn-icon theme-toggle-btn" aria-label="Toggle theme">${moonSvg}</button>`
  );

  // Replace mobile menu toggle emoji
  content = content.replace(
    /<button class="mobile-nav-toggle" aria-label="Open menu">☰<\/button>/g,
    `<button class="mobile-nav-toggle" aria-label="Open menu">${menuSvg}</button>`
  );

  // Replace bookmark button text
  content = content.replace(
    /☆ Save Article/g,
    `${bookmarkUnsavedSvg} Save Article`
  );

  fs.writeFileSync(fullPath, content);
  console.log(`✓ Updated ${file}`);
});
