import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import chalk from 'chalk'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import NodeCache from 'node-cache'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const moduleCache = new NodeCache({ stdTTL: 300 });

/*⭑⭒━━━✦❘༻☾⋆⁺₊✧𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓✧₊⁺⋆☽༺❘✦━━━⭒⭑*/

global.sam = ['393501989497']
global.owner = [
  ['393501989497', 'Endy', true],
  ['393206032199', 'Punisher', true],
  ['447529461874', 'Elixir', true],
  ['36302315350', 'punisher2', true], 
  ['79259234139', 'laura', true],
  ['4915511008789', 'Martina', true],
  ['393930950280', 'gelattina', true],
  ['639318820059', 'vendetta', true],
  ['77787623522', 'ksav', true],
]
global.mods = ['393501989497', '447529461874', '393206032199']
global.prems = ['393501989497', '447529461874', '393206032199']

/*⭑⭒━━━✦❘༻🩸 INFO BOT 🕊️༺❘✦━━━⭒⭑*/

global.nomepack = '𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓'
global.nomebot = '𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓'
global.wm = '𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓'
global.autore = 'ꪶ𝑬𝛮𝕯𝐲ꫂ'
global.dev = 'ꪶ𝑬𝛮𝕯𝐲ꫂ'
global.testobot = `𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓`
global.versione = pkg.version
global.errore = '*ERRORE INATTESO*, UTILIZZA IL COMANDO .segnala (errore) per contattare lo sviluppatore. contatto diretto: +393501989497'

/*⭑⭒━━━✦❘༻🌐 LINK 🌐༺❘✦━━━⭒⭑*/

global.repobot ='https//wa.me/393501989497'
global.gruppo = ''
global.insta = 'https://www.instagram.com/Endy.2011_?igsh=ZGxranlrczNybHJ0'

/*⭑⭒━━━✦❘༻ MODULI ༺❘✦━━━⭒⭑*/

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

/*⭑⭒━━━✦❘🗝️ API KEYS 🌍༺❘✦━━━⭒⭑*/

global.APIKeys = { // le keys con scritto "varebot" vanno cambiate con keys valide
    spotifyclientid: 'varebot',
    spotifysecret: 'varebot',
    browserless: 'varebot',
    screenshotone: 'varebot',
    screenshotone_default: 'varebot',
    tmdb: 'varebot',
    gemini: 'varebot',
    ocrspace: 'varebot',
    assemblyai: 'varebot',
    google: 'varebot',
    googlex: 'varebot',
    googleCX: 'varebot',
    genius: 'varebot',
    unsplash: 'varebot',
    removebg: 'FEx4CYmYN1QRQWD1mbZp87jV',
    openrouter: 'varebot',
    lastfm: '36f859a1fc4121e7f0e931806507d5f9',
    sightengine_user: 'varebot',
    sightengine_secret: 'varebot'
};


/*⭑⭒━━━✦❘༻🪷 SISTEMA XP/EURO 💸༺❘✦━━━⭒⭑*/

global.multiplier = 1 // piu è alto piu è facile guardagnare euro e xp

/*⭑⭒━━━✦❘༻📦 RELOAD 📦༺❘✦━━━⭒⭑*/

let filePath = fileURLToPath(import.meta.url)
let fileUrl = pathToFileURL(filePath).href
const reloadConfig = async () => {
  const cached = moduleCache.get(fileUrl);
  if (cached) return cached;
  unwatchFile(filePath)
  console.log(chalk.bgHex('#3b0d95')(chalk.white.bold("File: 'config.js' Aggiornato")))
  const module = await import(`${fileUrl}?update=${Date.now()}`)
  moduleCache.set(fileUrl, module, { ttl: 300 });
  return module;
}
watchFile(filePath, reloadConfig)