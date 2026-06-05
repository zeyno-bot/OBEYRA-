const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `令 *Nessun prefisso trovato. Per favore, scrivi un prefisso. Esempio:* ${usedPrefix + command} !`;
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
  conn.fakeReply(m.chat, `✅️ *Prefisso aggiornato con successo. Prefisso attuale: ${text}*`, '0@s.whatsapp.net', '🌸 NUOVO PREFISSO 🌸')
};
handler.help = ['setprefix'].map((v) => v + '[prefisso]');
handler.tags = ['creatore'];
handler.command = /^(setprefix)$/i;
handler.rowner = true;
export default handler;
