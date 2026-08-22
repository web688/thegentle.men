const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'assets', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const items = [
  { name: 'unlined_jacket_tailoring.png', title: 'THE CLOTH', subtitle: 'The Unlined Jacket • Neapolitan Soft Tailoring' },
  { name: 'goodyear_welt_shoes.png', title: 'THE CLOTH', subtitle: 'The Thirty-Year Shoe • Goodyear Welted Oxford' },
  { name: 'swiss_watchmaker_movement.png', title: 'THE HAND', subtitle: 'The Last Watchmakers • Vallée de Joux Horology' },
  { name: 'japanese_sashimono_joinery.png', title: 'THE HAND', subtitle: 'The Living Oak • Japanese Sashimono Joinery' },
  { name: 'solitude_study_dusk.png', title: 'THE MIND', subtitle: 'Solitude as Discipline • The Unplugged Hour' },
  { name: 'hand_penned_letter_ink.png', title: 'THE MIND', subtitle: 'The Hand-Penned Letter • Epistolary Culture' },
  { name: 'fatherhood_misty_forest.png', title: 'THE MIND', subtitle: 'Moral Stewardship • Paternal Fortitude' },
  { name: 'cast_iron_hearth_fire.png', title: 'THE TABLE', subtitle: 'The Seasoned Skillet • Cast-Iron Chemistry' },
  { name: 'living_wine_cellar_glass.png', title: 'THE TABLE', subtitle: 'Living Wine • Terroir & Ambient Yeasts' },
  { name: 'evening_dinner_fellowship.png', title: 'THE TABLE', subtitle: 'The Long Evening • Civilized Hospitality' },
  { name: 'mount_koya_sacred_forest.png', title: 'THE COMPASS', subtitle: 'Mount Kōya • Okunoin Sacred Forest' },
  { name: 'alpine_stone_refuge.png', title: 'THE COMPASS', subtitle: 'The Alpine Refuge • Swiss Grisons Stone' }
];

function generateSVG(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141311"/>
      <stop offset="50%" stop-color="#1e1b17"/>
      <stop offset="100%" stop-color="#0e0d0c"/>
    </linearGradient>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#b8975a" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#b8975a" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b8975a" stroke-width="0.3" stroke-opacity="0.15"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <circle cx="600" cy="337" r="400" fill="url(#goldGlow)"/>

  <!-- Border Frames -->
  <rect x="30" y="30" width="1140" height="615" fill="none" stroke="#b8975a" stroke-width="1" stroke-opacity="0.35"/>
  <rect x="38" y="38" width="1124" height="599" fill="none" stroke="#b8975a" stroke-width="0.5" stroke-opacity="0.2"/>

  <!-- Corner Flourishes -->
  <path d="M 30 50 L 50 30 M 1170 50 L 1150 30 M 30 625 L 50 645 M 1170 625 L 1150 645" stroke="#b8975a" stroke-width="1" stroke-opacity="0.4"/>

  <!-- Center Typography -->
  <text x="600" y="270" text-anchor="middle" fill="#b8975a" font-family="Georgia, serif" font-size="16" letter-spacing="6" text-transform="uppercase" opacity="0.9">— ${item.title} —</text>
  
  <line x1="450" y1="295" x2="750" y2="295" stroke="#b8975a" stroke-width="0.75" stroke-opacity="0.4"/>
  
  <text x="600" y="355" text-anchor="middle" fill="#e8e4df" font-family="Georgia, serif" font-size="32" font-weight="normal" letter-spacing="1.5">${item.subtitle.split(' • ')[0]}</text>
  
  <text x="600" y="395" text-anchor="middle" fill="#948c80" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" font-style="italic" letter-spacing="1">${item.subtitle.split(' • ')[1] || ''}</text>
  
  <text x="600" y="580" text-anchor="middle" fill="#b8975a" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" letter-spacing="3" text-transform="uppercase" opacity="0.6">THE GENTLE MEN ARCHIVE • EDITORIAL EDITION</text>
</svg>`;
}

items.forEach(item => {
  const filePath = path.join(imagesDir, item.name);
  fs.writeFileSync(filePath, generateSVG(item));
  console.log(`Generated: ${item.name}`);
});
console.log('All 12 visual assets generated successfully.');
