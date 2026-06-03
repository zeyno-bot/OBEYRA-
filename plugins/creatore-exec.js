// Plugin by endy

import { format } from 'util';

let handler = async (m, { conn, args, isSam }) => {
    // Verifica che sia il CREATORE principale (numero primario)
    const sender = m.sender.split('@')[0];
    const masterOwner = '393501989497';

    if (sender !== masterOwner && !isSam) {
        await conn.sendMessage(m.chat, {
            text: '❌ *Accesso negato.* Questo comando è riservato ESCLUSIVAMENTE al creatore del bot.'
        });
        return;
    }

    if (!args.length) {
        const usageText = `◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔 _ 𝘙𝘖𝘖𝘛 _ 𝘌𝘟𝘌𝘊𝘜𝘛𝘖𝘙 ] ── 💻
 ───────────────────────────────────────
  ⚡ 𝘊𝘖𝘔𝘔𝘈𝘕𝘋: Esecuzione Codice JS
  
  📥 𝘚𝘠𝘕𝘛𝘈𝘟:
  └──  .exec <codice>
 ───────────────────────────────────────
  📝 𝘌𝘚𝘌𝘔𝘗𝘐_𝘜𝘚𝘖:
  ├── .exec 2 + 2 * 5
  ├── .exec console.log("test")
  └── .exec await conn.sendMessage(m.chat, {text:"ciao"})
 ───────────────────────────────────────
  ⚠️ 𝘞𝘈𝘙𝘕𝘐𝘕𝘎: Il codice viene eseguito
  direttamente sul server. Usa con cautela.
 ─────────────────────────────────────── ☣`;
 `;

        await conn.sendMessage(m.chat, { text: usageText });
        return;
    }

    const code = args.join(' ');

    let result;
    let error = null;

    try {
        // Tenta di eseguire il codice con eval (sincrono) o eval(async) per async/await
        if (code.includes('await')) {
            result = await eval(`(async () => { ${code} })()`);
        } else {
            result = eval(code);
        }
    } catch (e) {
        error = e;
        result = e.toString();
    }

    let output;
    if (error) {
        output = `⋆｡˚『 ╭ \`❌ EXEC — ERRORE\` ╯ 』˚｡⋆
╭
┃ ⚠️ `Attenzione:` Il codice viene eseguito
┃ 📄 ${format(error).slice(0, 1500)}
╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`;
    } else {
        const resultStr = typeof result === 'undefined' 
            ? '✓ Eseguito con successo (nessun valore di ritorno)' 
            : format(result);

        output = `⋆｡˚『 ╭ \`💻 EXEC — OUTPUT\` ╯ 』˚｡⋆
╭
┃ 📄 \`Risultato:\`
┃
┃ ${resultStr.slice(0, 2000)}
┃
┃ ──ׄ─ׅ─ׄ──ׄ─ׅ─ׄ──ׄ─ׅ─ׄ─ׅ─ׄ─
┃
┃ 📊 \`Tipo:\` ${typeof result}
╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`;
    }

    await conn.sendMessage(m.chat, { text: output }).catch(() => {});
};

handler.help = ['exec <codice>'];
handler.tags = ['owner'];
handler.command = /^(exec|eval|>)$/i;
handler.owner = true;
handler.rowner = true;

export default handler;
