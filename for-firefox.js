#!/usr/bin/env/node

/**
 * Usage: node for-firefox.js
 *
 * Running this script will rewrite manifest.json to conform to Firefox specifications.
 */
const fs = require('fs');
const manifest = require('./public/manifest.json');

// Firefox doesn't support background.service_worker and wants background.scripts
manifest.background.scripts = [manifest.background.service_worker];
delete manifest.background.service_worker;

fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Rewrited');
