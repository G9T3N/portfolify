const fs = require('fs');
let html = fs.readFileSync('build/client/index.html', 'utf8');
const originalHtml = html;
html = html.replace(/<link[^>]*href="\/assets\/rapier-[^"]+\.js"[^>]*>/g, '');
html = html.replace(/<link[^>]*href="\/assets\/react-three-[^"]+\.js"[^>]*>/g, '');
fs.writeFileSync('build/client/index.html', html);
console.log('Removed preload lines: ', originalHtml !== html);
