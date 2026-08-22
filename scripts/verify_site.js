const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const pages = [
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

let errors = 0;

pages.forEach(page => {
  const fullPagePath = path.join(rootDir, page);
  if (!fs.existsSync(fullPagePath)) {
    console.error(`[MISSING PAGE] ${page}`);
    errors++;
    return;
  }

  const content = fs.readFileSync(fullPagePath, 'utf8');

  // Check CSS and JS assets
  const cssMatches = content.match(/href="([^"]+\.css)"/g) || [];
  cssMatches.forEach(m => {
    const cssPath = m.replace('href="', '').replace('"', '');
    const fullCss = path.resolve(path.dirname(fullPagePath), cssPath);
    if (!fs.existsSync(fullCss)) {
      console.error(`[BROKEN CSS] in ${page} -> ${cssPath}`);
      errors++;
    }
  });

  const jsMatches = content.match(/src="([^"]+\.js)"/g) || [];
  jsMatches.forEach(m => {
    const jsPath = m.replace('src="', '').replace('"', '');
    const fullJs = path.resolve(path.dirname(fullPagePath), jsPath);
    if (!fs.existsSync(fullJs)) {
      console.error(`[BROKEN JS] in ${page} -> ${jsPath}`);
      errors++;
    }
  });

  // Check Image assets
  const imgMatches = content.match(/src="([^"]+\.(png|jpg|svg|webp))"/g) || [];
  imgMatches.forEach(m => {
    const imgPath = m.replace('src="', '').replace('"', '');
    const fullImg = path.resolve(path.dirname(fullPagePath), imgPath);
    if (!fs.existsSync(fullImg)) {
      console.error(`[BROKEN IMG] in ${page} -> ${imgPath}`);
      errors++;
    }
  });

  // Check internal href links
  const hrefMatches = content.match(/href="([^"#:]+\.html)"/g) || [];
  hrefMatches.forEach(m => {
    const hrefPath = m.replace('href="', '').replace('"', '');
    const fullHref = path.resolve(path.dirname(fullPagePath), hrefPath);
    if (!fs.existsSync(fullHref)) {
      console.error(`[BROKEN LINK] in ${page} -> ${hrefPath}`);
      errors++;
    }
  });
});

if (errors === 0) {
  console.log(`SUCCESS: All ${pages.length} pages, stylesheets, scripts, images, and cross-links verified perfectly!`);
} else {
  console.log(`FAILURE: ${errors} errors detected.`);
  process.exit(1);
}
