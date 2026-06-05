import fs from 'fs';  
import path from 'path';  

let handler = async (m, { conn, isRowner }) => {
    let time = global.db.data.users[m.sender].lastmiming + 60000;
    if (new Date - global.db.data.users[m.sender].lastmiming < 60000) {
        return conn.reply(m.chat, `⛄ Devi aspettare ${msToTime(time - new Date())} per poter cambiare la foto del bot.`, m);
    }

    try {
        if (!m.quoted) {
            return m.reply('🌲 Rispondi a un messaggio contenente un\'immagine valida.');
        }

        const media = await m.quoted.download();
        if (!media) {
            return m.reply('🌲 Non è stato possibile scaricare il file. Assicurati che sia un\'immagine valida.');
        }

        if (!isImageValid(media)) {
            return m.reply('🌲 Il file inviato non è un\'immagine valida.');
        }
        const filePath = './media/5d5025d8089d17f1c24ea8fa1e10ad49.jpg';
        fs.writeFileSync(filePath, media);
        global.imagen1 = filePath;
        global.imagen2 = filePath;
        global.imagen3 = filePath;
        global.foto = filePath;

        m.reply('❄️ Il banner è stato aggiornato con successo!');
    } catch (error) {
        console.error(error);
        m.reply('✧ Si è verificato un errore durante il tentativo di cambiare il banner.');
    }
};

const isImageValid = (buffer) => {
    const magicBytes = buffer.slice(0, 4).toString('hex');
    if (magicBytes === 'ffd8ffe0' || magicBytes === 'ffd8ffe1' || magicBytes === 'ffd8ffe2') {
        return true; // JPEG
    }
    if (magicBytes === '89504e47') {
        return true; // PNG
    }
    if (magicBytes === '47494638') {
        return true; // GIF
    }

    return false; // Non è un'immagine valida
};

handler.help = ['setbanner'];
handler.tags = ['creatore'];
handler.command = ['setbanner'];
handler.rowner = true;

export default handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ' m e ' + seconds + ' s';
      }
