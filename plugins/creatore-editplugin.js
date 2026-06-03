// Plugin creato by endy
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const handler = async (m, { conn, text, command }) => {
    // ── Controllo permessi ───────────────────────────────────────
    const isCreator = m.sender?.replace(/[^0-9]/g, '') === '393501989497';
    if (!isCreator && !(global.rowner || global.owner)) {
        return conn.reply(m.chat, '❌ Accesso negato: solo il creatore può usare questo comando.', m);
    }

    // ── Verifica risposta e nome plugin ───────────────────────────
    if (!m.quoted?.text) {
        return conn.reply(m.chat, '`[!] Rispondi al messaggio contenente il nuovo codice.`', m);
    }
    if (!text) {
        return conn.reply(m.chat, '`[!] Specifica il nome del plugin da modificare.`', m);
    }

    // ── Percorsi file ─────────────────────────────────────────────
    const pluginsDir = path.join(process.cwd(), 'plugins');
    const filename = `${text.trim().replace('.js', '')}.js`;
    const filePath = path.join(pluginsDir, filename);

    // ── Controllo esistenza file ─────────────────────────────────
    if (!fs.existsSync(filePath)) {
        return conn.reply(m.chat, '`[!] Errore: il plugin specificato non esiste.`', m);
    }

    try {
        // ── Sovrascrittura sicura del file ───────────────────────
        fs.writeFileSync(filePath, m.quoted.text, 'utf8');

        // ── Ricarica dinamica del modulo con timestamp per forzare il refresh
        const fileUrl = pathToFileURL(filePath).href;
        const module = await import(`${fileUrl}?update=${Date.now()}`);

        // ── Aggiornamento cache globale
        global.plugins[filename] = module.default || module;

        // ── Messaggio di conferma elegante
        await conn.reply(
            m.chat,
            `*───「 MODIFICATO 」───*\n\n` +
            `*📝 FILE:* \`${filename}\`\n` +
            `*STATUS:* \`Compilato & Sincronizzato\`\n` +
            `*────────────────*`,
            m
        );
    } catch (e) {
        // ── Gestione errori
        return conn.reply(m.chat, `\`[ERRORE]: ${e.message}\``, m);
    }
};

handler.help = ['editplugin'];
handler.tags = ['owner'];
handler.command = /^(editplugin|ep)$/i;
handler.rowner = true;
handler.owner = true;

export default handler;
