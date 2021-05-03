const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

const converseVendorDir = path.join(__dirname, '..', 'libs', 'vendor', 'converse.js', 'dist')
const converseSources = shell.find(converseVendorDir).filter((file) => file.match(/\.js$/))

converseSources.forEach((file) => shell.sed(
    '-i',
    'eu.siacs.conversations.axolotl',
    'com.glaciersecurity.glaciermessenger',
    file,
))
console.log('Replaced OMEMO namespace.')
