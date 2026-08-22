const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'unlined_jacket_tailoring.png',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85' // Bespoke tailoring / suit
  },
  {
    name: 'goodyear_welt_shoes.png',
    url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85' // Oxford leather shoes
  },
  {
    name: 'swiss_watchmaker_movement.png',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85' // Mechanical watch movement
  },
  {
    name: 'japanese_sashimono_joinery.png',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85' // Woodworking & craft
  },
  {
    name: 'solitude_study_dusk.png',
    url: 'https://images.unsplash.com/photo-1507842229452-3392478546b9?auto=format&fit=crop&w=1200&q=85' // Library study at dusk
  },
  {
    name: 'hand_penned_letter_ink.png',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=85' // Fountain pen and letter
  },
  {
    name: 'fatherhood_misty_forest.png',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85' // Misty forest trail
  },
  {
    name: 'cast_iron_hearth_fire.png',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85' // Cast iron cooking / hearth
  },
  {
    name: 'living_wine_cellar_glass.png',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85' // Wine glass cellar
  },
  {
    name: 'evening_dinner_fellowship.png',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85' // Candlelit dining table
  },
  {
    name: 'mount_koya_sacred_forest.png',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85' // Japanese temple / forest
  },
  {
    name: 'alpine_stone_refuge.png',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85' // Alpine mountain stone
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  const imagesDir = path.join(__dirname, '..', 'assets', 'images');
  for (const img of images) {
    const dest = path.join(imagesDir, img.name);
    console.log(`Downloading real photograph for: ${img.name}...`);
    try {
      await download(img.url, dest);
      console.log(`✓ Saved ${img.name} (${fs.statSync(dest).size} bytes)`);
    } catch (err) {
      console.error(`✗ Error downloading ${img.name}:`, err.message);
    }
  }
}

run();
