const fs = require('fs');


fs.stat(`${process.cwd()}/config/local.js`, (err, stat) => {
  if (err && err.code === 'ENOENT') {
    console.log('[post install] local config does not exists, creating it...🍳');
    fs.copyFileSync(`${process.cwd()}/config/local.js.dist`, `${process.cwd()}/config/local.js`);
    console.log('[post install] done ✅');
  }

});
