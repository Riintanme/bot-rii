const { decryptMedia } = require('@open-wa/wa-decrypt')
const axios = require('axios')
const fs = require('fs-extra')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const color = require('./lib/color')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const urlShortener = require('./lib/shortener')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const google = require('google-it')
const translatte = require('translatte')
const { stdout } = require('process')
const quotedd = require('./lib/quote')
const translate = require('translatte')
const { getStickerMaker } = require('./lib/ttp')
const Math_js = require('mathjs');
const imageToBase64 = require('image-to-base64')
const bent = require('bent')
const request = require('request')
const emojiUnicode = require("emoji-unicode")
const wav = require('node-wav')
const Removebg = require('./lib/nobg');
//const cariKasar = require('./lib/kataKotor')
var canvas = require('canvacord')
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')

const { 
    downloader,
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    processTime,
    nulis
    } = require('./lib/functions')

const { 
    bahasalist,
    sewa,
    snk, 
    info, 
    sumbang, 
    readme, 
    listChannel,
    commandArray
    } = require('./lib/help')

const {
    instagram,
    tiktok,
    facebook,
    smule,
    starmaker,
    twitter
    } = require('./lib/downloader')    

const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')

const { 
    uploadImages, 
    custom
    } = require('./lib/fetcher')    

// LOAD FILE
const banned = JSON.parse(fs.readFileSync('./lib/database/banned.json'))
const nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfwz.json'))
const simi_ = JSON.parse(fs.readFileSync('./lib/database/Simsimi.json'))
const limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
const muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
const setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
const msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
const adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
const VipUser = JSON.parse(fs.readFileSync('./lib/database/VipUser.json'))

// PROTECT
let antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
let antibadword = JSON.parse(fs.readFileSync('./lib/database/antibadword.json'))
let antisticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'))
let msgBadword = JSON.parse(fs.readFileSync('./lib/database/msgBadword.json'))
//let dbbadword = JSON.parse(fs.readFileSync('./lib/database/katakasar.json'))
let badword = JSON.parse(fs.readFileSync('./lib/database/badword.json'))
let pendaftar = JSON.parse(fs.readFileSync('./lib/database/user.json'))
let stickerspam = JSON.parse(fs.readFileSync('./lib/database/stickerspam.json'))

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    barbarkey,
    vhtearkey,
	prefix,
    restartState: isRestart,
    mtc: mtcState
    } = setting
	

let state = {
    status: () => {
        if(banChats){
            return 'Nonaktif'
        }else if(mtcState){
            return 'Nonaktif'
        }else if(!mtcState){
            return 'Aktif'
        }else{
            return 'Aktif'
        }
    }
}

moment.tz.setDefault('Asia/Jakarta').locale('id')
module.exports = rii = async (tobz, message) => {
    try {
        const { 
            type, 
            id, 
            from,
            t, 
            to,
            sender, 
            isGroupMsg, 
            chat, 
            chatId, 
            caption, 
            isMedia, 
            mimetype,
            quotedMsg, 
            quotedMsgObj, 
            author, 
            mentionedJidList 
            } = message
        const self = sender && sender.isMe ? to : from
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')
        
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''

        function restartAwal(client){
            setting.restartState = false
            isRestart = false
            tobz.sendText(setting.restartId, 'Restart Succesfull!')
            setting.restartId = 'undefined'
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2));
        }
 
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }

        function banChat () {
            if(banChats == true) {
            return false
        }else{
            return true
            }
        }
        function monospace(string) {
            return '```' + string + '```'
        }

        if (typeof Array.prototype.splice === 'undefined') {
            Array.prototype.splice = function (index, howmany, elemes) {
                howmany = typeof howmany === 'undefined' || this.length;
                var elems = Array.prototype.slice.call(arguments, 2), newArr = this.slice(0, index), last = this.slice(index + howmany);
                newArr = newArr.concat.apply(newArr, elems);
                newArr = newArr.concat.apply(newArr, last);
                return newArr;
            }
        }
        // FUNCTION
        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "12345ABCDE";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
        var nmr = sender.id
        var obj = pendaftar.some((val) => {
            return val.id === nmr
        })
        var cekage = pendaftar.some((val) => {
            return val.id === nmr && val.umur >= 15
        })

        function isReg(obj){
            if (obj === true){
                return false
            } else {     
                return tobz.reply(self, `
──────────────────────
Hi👋, ${pushname}
Kamu belum terdaftar sebagai Teman Rii
untuk mendaftar kirim 

${prefix}daftar |nama|umur

contoh format: 
${prefix}daftar |Rii|17

cukup gunakan nama depan/panggilan saja

_*Jika Kalian Mendaftar Di bawah 15 tahun Maka tidak bisa menggunakan bot*_
──────────────────────`, id) //if user is not registered
            }
        }

        function cekumur(obj){
            if (obj === true){
                return false
            } else {
                return tobz.reply(self, `
*Maaf ${pushname}!
*Kamu belum cukup umur untuk menggunakan Bot tobz.
Minimal Umur 16 tahun
Kamu bisa mendaftar ulang dengan cara donasi terlebih dahulu
bales 
├❏ ${prefix}donate

Hubungi Owner : wa.me/6285349607186`, id) //if user is not registered
            }
        }    

        const maukah = [
            'Mau Yuklah Yahaha hayuk;v',
            'Mau gasken;v',
            'Mauu;v',
            'Tidak mau:v',
            'Engga ah:v',
            'kgk mau lu jelek;v',
            'Ga mau lu burik kek epep',
            'Engga mau:v'
            ]

        const siapa = [
            'Adel delkodel',
            'Clowy Estrop',
            'Amarissa Florencia',
            'Delilah Fidiyah Affif',
            'Sandrina Azzahra',
            'Maulidya Kholbya',
            'Bhella Cristy',
            'bella',
            'Nabilla',
            'Anya Anjani Manzia',
            'Maria ozawa',
            'miakhalifah',
            'Kim Jisoo',
            'Roseanne Park',
            'Jennie Kim',
            'Lalisa Manoban',
            'Minami Hamabe',
            'gisellia',
            'Mei Nagano',
            'Suzu Hirose',
            'Ayami Nakajo',
            'Nana Komatsu',
            'Haruna Kawaguchi',
            'Tao Tsuchiya',
            'Kasumi Arimura',
            'Yua Shinkawa',
            'Bella Safira Alhabsy',
            'dajjal', 
            'Setan', 
            'Adel delkodel',
            'manusia',
            'kekeyi'
            ]

        const apakah = [
            'Mungkin',
            'Iya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa Jadi',
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 menit lagi',
            '2 menit lagi',
            '3 menit lagi',
            '4 menit lagi',
            '5 menit lagi',
            '6 menit lagi',
            '7 menit lagi',
            '8 menit lagi',
            '9 menit lagi',
            '10 menit lagi',
            '1 Jam lagi',
            '2 Jam lagi',
            '3 Jam lagi',
            '4 Jam lagi',
            '5 Jam lagi',
            '6 Jam lagi',
            '7 Jam lagi',
            '8 Jam lagi',
            '9 Jam lagi',
            '10 Jam lagi',
            '11 Jam lagi',
            '12 Jam lagi',
            '13 Jam lagi',
            '14 Jam lagi',
            '15 Jam lagi',
            '16 Jam lagi',
            '17 Jam lagi',
            '18 Jam lagi',
            '19 Jam lagi',
            '20 Jam lagi',
            '21 Jam lagi',
            '22 Jam lagi',
            '23 Jam lagi',
            '24 Jam lagi',
            '1 Hari lagi',
            '2 Hari lagi',
            '3 Hari lagi',
            '4 Hari lagi',
            '5 Hari lagi',
            '6 Hari lagi',
            '7 Hari lagi',
            '8 Hari lagi',
            '9 Hari lagi',
            '10 Hari lagi',
            '11 Hari lagi',
            '12 Hari lagi',
            '13 Hari lagi',
            '14 Hari lagi',
            '15 Hari lagi',
            '16 Hari lagi',
            '17 Hari lagi',
            '18 Hari lagi',
            '19 Hari lagi',
            '20 Hari lagi',
            '21 Hari lagi',
            '22 Hari lagi',
            '23 Hari lagi',
            '24 Hari lagi',
            '25 Hari lagi',
            '26 Hari lagi',
            '27 Hari lagi',
            '28 Hari lagi',
            '29 Hari lagi',
            '30 Hari lagi',
            '1 Minggu lagi',
            '2 Minggu lagi',
            '3 Minggu lagi',
            '4 Minggu lagi',
            '5 Minggu lagi',
            '6 Minggu lagi',
            '7 Minggu lagi',
            '8 Minggu lagi',
            '9 Minggu lagi',
            '10 Minggu lagi',
            '1 Bulan lagi',
            '2 Bulan lagi',
            '3 Bulan lagi',
            '4 Bulan lagi',
            '5 Bulan lagi',
            '6 Bulan lagi',
            '7 Bulan lagi',
            '8 Bulan lagi',
            '9 Bulan lagi',
            '10 Bulan lagi',
            '11 Bulan lagi',
            '12 Bulan lagi',
            '1 Tahun lagi',
            '2 Tahun lagi',
            '3 Tahun lagi',
            '4 Tahun lagi',
            '5 Tahun lagi',
            '6 Tahun lagi',
            '7 Tahun lagi',
            '8 Tahun lagi',
            '9 Tahun lagi',
            '10 Tahun lagi',
            '11 Tahun lagi',
            '12 Tahun lagi',
            ]
			
		const balas = [
			`Ada apa nyebut saya!1!1 ${pushname}?`,
			]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]            

        const mess = {
            wait: '*Sedang di Proses....*',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
            error: {
                St: `[❗] Kirim gambar dengan caption *${prefix}sticker* atau tag gambar yang sudah dikirim`,
                Ti: `[❗] Replay sticker dengan caption *${prefix}stickertoimg* atau tag sticker yang sudah dikirim`,
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const timu = moment(t * 1000).format('DD/MM/YYYY');
        const timi = moment(t * 1000).add(30, 'days').calendar();
        const botNumber = await tobz.getHostNumber()
        const blockNumber = await tobz.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await tobz.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const SN = GenerateSerialNumber("0000000000")
        const serial = sender.id
		//const prefix = `${prefix}`
        const isBadword = badword.includes(chatId)
        //const isKasar = await cariKasar(chats)    
        const GroupLinkDetector = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const stickermsg = message.type === 'sticker'
        const isCmd = command.startsWith(`${prefix}`)
		
        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = '6288802682661@c.us'
        const isOwner = ownerNumber.includes(sender.id)
		const isVipUser = VipUser.includes(sender.id)
		
        const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false
        const isWhiteList = (chatId) => {
            if(adminNumber.includes(sender.id)){
                if(muted.includes(chatId)) return false
                return true
            }else{
                return false
            }
        }
        
        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
		//const isWord = isBad.includes(sender.id)
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~@=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~@?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''
        global.pollfile = 'poll_Config_' + chat.id + '.json'
        global.voterslistfile = 'poll_voters_Config_' + chat.id + '.json'

        const tutor = 'https://i.ibb.co/Hp1XGbL/a4dec92b8922.jpg'
        const errorurl = 'https://linkpicture.com/q/20201127_075249.png'
        const errorurl2 = 'https://linkpicture.com/q/20201127_075249.png'
        // FUNCTION
                function isStickerMsg(id){
                if (isAdmin) {return false;}
                let found = false;
                for (let i of stickerspam){
                    if(i.id === id){
                        if (i.msg >= 5) {
                            found === true 
                            tobz.reply(self, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu telah SPAM STICKER di grup, kamu akan di kick otomatis oleh Rii`, id).then(() => {
                                tobz.removeParticipant(groupId, id)
                            })
                            return true;
                        }else if(i.msg >= 5){
                            found === true
                            tobz.reply(self, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu terdeteksi spam sticker!\nMohon tidak spam 5 sticker lagi atau nomor akan di kick oleh Rii!`, id)
                            return true
                        }else{
                            found === true
                            return false;
                        }   
                    }
                }
                if (found === false){
                    let obj = {id: `${id}`, msg:1};
                    stickerspam.push(obj);
                    fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                    return false;
                }  
            }
        function addStickerCount(id){
            if (isAdmin) {return;}
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if(stickerspam[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
            }
        }

        function isBadwordMsg(id){
            if (isAdmin) {return false;}
            let kasar = false;
            for (let i of msgBadword){
                if(i.id === id){
                    let msg = i.msg
                    if (msg >= 1) { // 1X BADWORD AKAN TERKENA KICK
                        kasar === true 
                        tobz.reply(self, `*「 𝗔𝗡𝗧𝗜 𝗕𝗔𝗗𝗪𝗢𝗥𝗗 」*\nPeringatan! 2x lagi berkata kasar, Rii akan kick kamu dari grup!`, id)
                        }
                    if (msg >= 3) { // 3X BADWORD AKAN TERKENA KICK
                        kasar === true 
                        tobz.reply(self, `*「 𝗔𝗡𝗧𝗜 𝗕𝗔𝗗𝗪𝗢𝗥𝗗 」*\nKamu telah berkata kasar di grup ini, kamu akan di kick otomatis oleh Rii!`, id).then(() => {
                            tobz.removeParticipant(groupId, id)
                        })
                        return true;
                    }else{
                        kasar === true
                        return false;
                    }   
                }
            }
            if (kasar === false){
                let obj = {id: `${id}`, msg:1};
                msgBadword.push(obj);
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                return false;
            }  
        }
        function addBadCount(id){
            if (isAdmin) {return;}
            var kasar = false
            Object.keys(msgBadword).forEach((i) => {
                if(msgBadword[i].id == id){
                    kasar = i
                }
            })
            if (kasar !== false) {
                msgBadword[kasar].msg += 1;
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
            }
        }        
                function isMsgLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 5) {
                                found === true 
                                tobz.reply(self, '*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!', id)
                                tobz.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 5){
                                found === true
                                tobz.reply(self, '*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!', id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
                function addMsgLimit(id){
                    if (isAdmin) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
                function isLimit(id){
                    if (isVipUser) {return false;}
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                tobz.reply(self, 'Perintah BOT anda sudah mencapai batas, coba esok hari :)', id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
                function limitAdd (id) {
                    if (isVipUser) {return false;}
                    if (isAdmin) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
                }
        
                function monospace(string) {
                    return '```' + string + '```'
                }            
                // END HELPER FUNCTION
						
       if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isAdmin && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await tobz.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    tobz.reply(self, `*「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`, id).then(() => {
                        tobz.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }

        // Anti sticker spam. bot will kick out group members while spamming sticker msg more than 12x
        if (isGroupMsg && AntiStickerSpam && !isGroupAdmins && !isAdmin && !isOwner){
            if(stickermsg === true){
                if(isStickerMsg(serial)) return
                addStickerCount(serial)
            }
        }

        if(!isCmd && isGroupMsg && isBadword && !isGroupAdmins) { 
            console.log(color('[BADWORD]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) 
            if(isBadwordMsg(serial)) return
                addBadCount(serial)
        }					
												
                if(body === `${prefix}mute` && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isAdmin) return tobz.reply(self, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Rii!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        tobz.reply(self, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute`,id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        reply(self, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute!`, id)
                    }
                }
                if(body === `${prefix}unmute` && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isAdmin) return tobz.reply(self, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Rii!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        tobz.reply(self, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        tobz.reply(self, 'Bot telah di unmute!', id)                   
                    }
                }
				
				/*if (chats.match("Rii") || chats.match("Rii") || chats.match("Rii") || chats.match("bot") || chats.match("Bot") || chats.match("BOT")) {
					const bls = balas[Math.floor(Math.random() * (balas.length))]
					await tobz.reply(self, `*${bls}* \n\n`, id)
				}*/

                if (body === `${prefix}public`) {
                    if (!isOwner) return tobz.reply(self, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner Rii!', id)
                    if(setting.banChats === false) return
                    setting.banChats = false
                    banChats = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    tobz.reply('*MODE PUBLIC!*', id)
                }

        if (isCmd && !isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))}
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {

        case `${prefix}self`:
            if (setting.banChats === true) return
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Rii!', id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
            tobz.reply('*MODE SELF!*', id)
            break
		case `prefix`:
			tobz.reply(self, `*Rii is Use ( ${prefix} ) Prefix!.* 
_Prefix adalah tanda di awal perintah._
_Contoh: ${prefix}menu_`, id)
			break
		case `${prefix}setto`:
        case `${prefix}setp`:
			if (!isOwner && !isAdmin) return tobz.reply(self, 'Maaf, Fitur ini hanya untuk OWNER dan ADMIN Rii!', id)
			if (args.length === 1) return tobz.reply(self, `*Kirim Perintah ${prefix}setto [prefix baru]*. 
Contoh: ${prefix}setto #`, id)
			const pf = body.slice(7)  
			setting.prefix = `${pf}`
			prefix = `${pf}`
			fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null,2))
			tobz.reply(self, `Change Prefix To ${pf} SUCCESS!`, id)
			break
        case `${prefix}unmute`:
            console.log(`Unmuted ${name}!`)
            await tobz.sendSeen(self)
            break
        case `${prefix}unbanchat`:
            console.log(`Banchat ${name}!`)
            await tobz.sendSeen(self)
            break
            case `${prefix}fotomissing`:
            case `${prefix}fmissing`: 
            case `${prefix}missing`:
                if (!q) return await tobz.reply(self, `Format salah! Silakan cek cara penggunaan di *${prefix}menu*.`, id)
                const atas = q.substring(0, q.indexOf('|'))
                const tengah = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|'))
                const bawah = q.substring(q.lastIndexOf('|') + 2)
                if (isMedia && type === 'image' || isQuotedImage) {
                    await tobz.reply(self, ind.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageLink = await uploadImages(mediaData)
                    fun.missing(atas, tengah, bawah, imageLink)
                        .then(async ({ result }) => {
                            await tobz.sendFileFromUrl(self, result.imgUrl, 'missing.jpg', '', id)
                                .then(() => console.log('Success sending image!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await tobz.reply(self, 'Error!', id)
                        })
                } else {
                    await tobz.reply(self, `Format salah! Silakan cek cara penggunaan di *${prefix}menu*.`, id)
                }
            break
            case `${prefix}valentine`:
            case `${prefix}vl`:
                //if (!isRegistered) return await tobz.reply(self, ind.notRegistered(), id)
                if (!q) return await tobz.reply(self, `Format salah! Silakan cek cara penggunaan di *${prefix}menu*.`, id)
                if (isMedia && type === 'image' || isQuotedImage) {
                    await tobz.reply(self, ind.wait(), id)
                    const nama = q.substring(0, q.indexOf('|'))
                    const pasangan = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const dataPasangan = await decryptMedia(encryptMedia, uaOverride)
                    const base64str = await tobz.downloadProfilePicFromMessage(message)
                    const dataMu = Buffer.from(base64str, 'base64')
                    const fotoPasangan = await uploadImages(dataPasangan)
                    const fotoMu = await uploadImages(dataMu)
                    fun.valentine(nama, pasangan, fotoMu, fotoPasangan)
                        .then(async ({ result }) => {
                            await tobz.sendFileFromUrl(self, result.imgUrl, `${nama}_${pasangan}.jpg`, '', id)
                                .then(() => console.log('Success creating image!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await tobz.reply(self, 'Error!', id)
                        })
                } else {
                    await tobz.reply(self, `Format salah! Silakan cek cara penggunaan di *${prefix}menu*.`, id)
                }
            break  
            case `${prefix}santet`: //work
                    //if(isLimit(serial)) return
                   // if(isReg(obj)) return
                   // if(cekumur(cekage)) return
                    if (!isGroupMsg) return tobz.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (mentionedJidList.length === 0) return tobz.reply(from, 'Tag member yang mau disantet', id)
                    if (args.length === 1) return tobz.reply(from, 'Masukkan alasan kenapa menyantet dia!!', id)
                        const target = args[0]
                        const alasan = args[1]
                        await tobz.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan${alasan}`)
                        //limitAdd(serial)
                break      
        case `${prefix}bass`:
                if(isLimit(serial)) return
                if (isQuotedAudio) {
                let dB = 20
                let freq = 60
                let mediaData = await decryptMedia(quotedMsg)
                let temp = './temp'
                let name = new Date() * 1
                let fileInputPath = path.join(temp, 'audio', `${name}.mp3`)
                let fileOutputPath = path.join(temp, 'audio', `${name}_2.mp3`)
                console.log(color('[fs]', 'green'), `Writing media into '${fileInputPath}'`)
                tobz.reply(self, 'tunggu ya sedang diproses', ('mp3', 'mp3', `Bass ${freq}hz: +${dB}dB`), id)
                fs.writeFile(fileInputPath, mediaData, err => {
                if (err) return tobz.sendText(self, 'Ada yang error saat menulis file', id)
                ffmpeg(fileInputPath)
                    .audioFilter('equalizer=f=' + freq + ':width_type=o:width=2:g=' + dB)
                     .format('mp3')
                    .on('start', function (commandLine) {
                        console.log(color('[FFmpeg]', 'green'), commandLine)
                        })
                    .on('progress', function (progress) {
                        console.log(color('[FFmpeg]', 'green'), progress)
                         })
                    .on('end', function () {
                        console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                            // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                            // if (err) return tobz.sendText(self, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                    tobz.sendFile(self, fileOutputPath, 'distorted.mp3', '', id)
                        // })
                         setTimeout(() => {
                             try {
                                fs.unlinkSync(fileInputPath)
                                 fs.unlinkSync(fileOutputPath)
                            } catch (e) { _err(e) }
                            }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    }
            break            
        case `${prefix}distord`:
                   if(isLimit(serial)) return
                    if (isQuotedAudio) {
                        tobz.reply(self, mess.wait, ('mp3', 'wav', 'Biar mudah ngedit audionya ketika pake format itu'), id)
                        const encryptMedia = isQuotedAudio ? quotedMsg : message
                        const _mimetype = isQuotedAudio ? quotedMsg.mimetype : mimetype
                        console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                        const mediaData = await decryptMedia(encryptMedia)
                        Utils.decodeAudioData(mediaData, (err, audioBuffer) => {
                            if (err) return tobz.sendText(self, mess.error.Yt4, ('Ada yang error saat decoding file mp3\n\n'))
                            generated = audioBuffer._data.map(channel => {
                                return channel.map(value => clampFloat(distordFX(value)))
                            })
        
                            buffer = wav.encode(generated, {
                                sampleRate: audioBuffer.sampleRate,
                                float: true,
                                bitDepth: 32
                            })
        
                            let temp = './temp'
                            let name = new Date() * 1
                            let fileInputPath = path.join(temp, 'audio', `${name}.wav`)
                            let fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                            console.log(color('[fs]', 'green'), `Writing media into '${fileInputPath}'`)
                            tobz.reply(self, mess.wait, ('wav', 'mp3', 'Nah... sekarang dikembaliin lagi formatnya'), id)
                            fs.writeFile(fileInputPath, buffer, err => {
                                if (err) return tobz.sendText(self, mess.error.Yt4, ('Ada yang error saat menulis file\n\n'))
                                ffmpeg(fileInputPath)
                                    .format('mp3')
                                    .on('start', function (commandLine) {
                                        console.log(color('[FFmpeg]', 'green'), commandLine)
                                    })
                                    .on('progress', function (progress) {
                                        console.log(color('[FFmpeg]', 'green'), progress)
                                    })
                                    .on('end', function () {
                                        console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                        // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                                        // if (err) return tobz.sendText(self, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                                        tobz.sendFile(self, fileOutputPath, 'distorted.mp3', '', id)
                                        // })
                                        setTimeout(() => {
                                            try {
                                                fs.unlinkSync(fileInputPath)
                                                fs.unlinkSync(fileOutputPath)
                                            } catch (e) { _err(e) }
                                        }, 30000)
                                    })
                                    .save(fileOutputPath)
                            })
                        })
                    }
            break                  
		case `${prefix}toimg`:
		case `${prefix}stickertoimg`:
        case `${prefix}stikertoimg`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial)
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                //tobz.reply(self, '*Sedang di Proses...*', id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.sendFile(self, imageBase64, 'imagesticker.jpg', 'Success Convert Sticker to Image!\n By : Rii:v', id)
            } else if (!quotedMsg) return tobz.reply(self, 'Mohon tag sticker yang ingin dijadikan gambar!', id)
            break
		case `${prefix}bukagc`:
		case `${prefix}open`:
            if (!groupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin Grup', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            tobz.setGroupToAdminsOnly(groupId, false)
            break
        case `${prefix}sticker`:
        case `${prefix}stiker`:
		case `${prefix}s`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await tobz.sendImageAsSticker(self, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.sendImageAsSticker(self, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await tobz.sendStickerfromUrl(self, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    tobz.reply(self, mess.error.Iv, id)
                }
            } else {
                    tobz.reply(self, mess.error.St, id)
            }
            break
                case `${prefix}stickernobg`: //error hehe
                case `${prefix}stikernobg`:
                case `${prefix}nobg`:
                    //if(isReg(obj)) return
                    //if(cekumur(cekage)) return
                    //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
                    //if (!isRegis) return tobz.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    //if (!isAdmin) return tobz.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (isMedia && type === 'image') {
                        try {
                            nobg.Removebg()
                            tobz.sendFileFromUrl(self, image, id)
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    break     
        case `${prefix}es`  :    
        case `${prefix}esticker`: //Rii
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

            await limitAdd(serial)
         //   tobz.reply(self, mess.wait, id)
            const emoji = emojiUnicode(args[1])
            tobz.sendStickerfromUrl(self, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${vhtearkey}`)
            break            
        case `${prefix}ttp`:
                if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial)    
               //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
                try
                {
                    const string = body.toLowerCase().includes(`${prefix}ttp`) ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await tobz.sendImageAsSticker(self, gasMake.base64)
                                }catch(err) {
                                    await tobz.reply(self, 'Gagal membuat.', id)
                                } 
                            }else{
                                await tobz.reply(self, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await tobz.sendImageAsSticker(self, gasMake.base64)
                                }catch(err) {
                                    await tobz.reply(self, 'Gagal membuat.', id)
                                } 
                            }else{
                                await tobz.reply(self, gasMake.reason, id)
                            }
                        }
                       
                    }else{
                        await tobz.reply(self, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }
            break;
        case `${prefix}hilih`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            //if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

           await limitAdd(serial)
            if (quotedMsg){
            const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
            const skyaaara = await get.get('http://enznoire.herokuapp.com/hilih?kata=' + quoteText).json()
            tobz.reply(self, skyaaara.result, id)
            } else {
            const daasda = body.slice(7)
            const skyaaara = await get.get('http://enznoire.herokuapp.com/hilih?kata=' + daasda).json()
            tobz.reply(self, skyaaara.result, id)
            }
            break            
        case `${prefix}ttp2`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}ttp2 [ Teks ]*, contoh *.ttp2 Rii*`, id)
            const ttp2t = body.slice(5)
            const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
            const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
            await tobz.sendStickerfromUrl(self, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${vhtearkey}`)
            break       
        case `${prefix}ttg`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
              //  if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                try {
                    if (quotedMsgObj == null) {
                        if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}ttg [ Teks ]*, contoh *#ttg aku bukan boneka*`, id)
                            await tobz.sendStickerfromUrl(self, `https://api.vhtear.com/textxgif?text=${body.slice(5)}&apikey=${vhtearkey}`)
                            limitAdd(serial)
                    } else {
                        await tobz.sendStickerfromUrl(self, `https://api.vhtear.com/textxgif?text=${quotedMsgObj}&apikey=${vhtearkey}`)
                        limitAdd(serial)
                    }
                } catch(e) {
                    console.log(e)
                    tobz.reply(self, 'Maaf, Server sedang Error')
                }
                break
        case `${prefix}3d`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
              //  if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                try {
                    if (quotedMsgObj == null) {
                        if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}3d [ Teks ]*, contoh *#ttg aku bukan boneka*`, id)
                            await tobz.sendStickerfromUrl(self, `http://api.kocakz.xyz/api/flamingtext/text3d?text=${body.slice(2)}`)
                            limitAdd(serial)
                    } else {
                        await tobz.sendStickerfromUrl(self, `http://api.kocakz.xyz/api/flamingtext/text3d?text=${quotedMsgObj}`)
                        limitAdd(serial)
                    }
                } catch(e) {
                    console.log(e)
                    tobz.reply(self, 'Maaf, Server sedang Error')
                }
                break
                case `${prefix}3d2`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
              //  if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                try {
                    if (quotedMsgObj == null) {
                        if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}3d [ Teks ]*, contoh *#ttg aku bukan boneka*`, id)
                            await tobz.sendStickerfromUrl(self, ` http://api.kocakz.xyz/api/textpro/text3d?text=${body.slice(5)}`)
                            limitAdd(serial)
                    } else {
                        await tobz.sendStickerfromUrl(self, `http://api.kocakz.xyz/api/textpro/text3d?text=${quotedMsgObj}`)
                        limitAdd(serial)
                    }
                } catch(e) {
                    console.log(e)
                    tobz.reply(self, 'Maaf, Server sedang Error')
                }
                break    
        case `${prefix}findstiker`:
        case `${prefix}wastiker`:
                if (args.length == 0) return tobz.reply(self, `Kirim perintah *${prefix}findsticker namastiker*\nContoh : *${prefix}findsticker pentol*`, id)
                await tobz.reply(self, `Sedang di proses...`, id)
                try {
                    const stck = await axios.get('https://api.vhtear.com/wasticker?query=' + body.slice(7) + `&apikey=yourApiKey`)
                    for (let i = 0; i < stck.data.result.data.length; i++) {
                    await tobz.sendStickerfromUrl(self, stck.data.result.data[i])
                    console.log('Sukses mengirim sticker finder!')
                    }
                } catch (err) {
                    console.error(err)
                    await tobz.reply(self, `Ada yang Error!\nmungkin kata kunci yang anda cari tidak ada`, id)
                }
           break                
        case `${prefix}stickergif`:
        case `${prefix}stikergif`:
        case `${prefix}sgif`:
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            tobz.reply(self, `*Sedang di proses...*`, id)
            if (isMedia && type === 'video' || mimetype === 'image/gif') {
                try {
                    const mediaData = await decryptMedia(message, uaOverride)
                    await tobz.sendMp4AsSticker(self, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
                } catch (e) {
                    tobz.reply(self, `Size media terlalu besar! mohon kurangi durasi video.`)
                }
            } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                await tobz.sendMp4AsSticker(self, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
            } else {
                tobz.reply(self, `Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik .stickergif`, id)
            } 
            break
        case `${prefix}stickerlightning`:
        case `${prefix}slightning`:
		case `${prefix}sl`:
        case `${prefix}slight`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)        
           if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
             tobz.reply(self, `*Sedang di proses...*`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await tobz.sendStickerfromUrl(self, Slight)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await tobz.sendStickerfromUrl(self, Slight)
            } else {
                await tobz.reply(self, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerlightning`, id)
            }
            break
        case `${prefix}stickerfire`:
        case `${prefix}sfire`:
		case `${prefix}bakar`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
        //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
           if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            tobz.reply(self, `*Sedang di proses...*`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await tobz.sendStickerfromUrl(self, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await tobz.sendStickerfromUrl(self, Sfire)
            } else {
                await tobz.reply(self, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerfire`, id)
            }
            break
        case `${prefix}groupinfo`:
		case `${prefix}gi`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
            isMuted(chatId) == false
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = welkom.includes(chat.id)
            var leftgrp = left.includes(chat.id)
            var ngrp = nsfw_.includes(chat.id)
            var simu = simi_.includes(chat.id)
            var antlink = antilink.includes(chat.id)
            var stprt = antisticker.includes(chat.id)
            var antbad = antibadword.includes(chat.id)
            var grouppic = await tobz.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await tobz.sendFileFromUrl(self, pfp, 'group.png', `*「 GROUP INFO 」*
*➸ *Name : ${groupname}* 
*➸ Members : ${totalMem}*
*➸ Welcome : ${welgrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ Left : ${leftgrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ NSFW : ${ngrp ? 'Aktif' : 'Tidak Aktif'}*
*➸ Simsimi : ${simu ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Sticker : ${stprt ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Link : ${antlink ? 'Aktif' : 'Tidak Aktif'}*
*➸ Anti Badword : ${antbad ? 'Aktif' : 'Tidak Aktif'}*
*➸ Group Description* 
${desc}`)
            break
        case `${prefix}quoterandom` :
        case `${prefix}quote`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            tobz.sendText(self, quotedd())
            break
        case `${prefix}tts`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
                if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@tts [ Bahasa ] [ Teks ]*, contoh *@tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return tobz.reply(self, 'Masukkan teksnya', id)
                if (dataText.length > 500) return tobz.reply(self, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts.mp3', dataText, function () {
                tobz.sendPtt(self, './media/tts.mp3', id)
                })
            } catch (err){
                console.log(err)
                tobz.reply(self, bahasa_list, id)
            }
            break
        case `${prefix}koin`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
              tobz.sendStickerfromUrl(self, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
            } else {
              tobz.sendStickerfromUrl(self, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
            }
            break
        case `${prefix}dadu`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const dice = Math.floor(Math.random() * 6) + 1
            await tobz.sendStickerfromUrl(self, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
            break
        case `${prefix}kapankah`:
        case `${prefix}kapan`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial)
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) tobz.reply(self, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await tobz.sendText(self, `
──────────────────
➥ *Pertanyaan :* _*${when}*_*
➥ *Jawaban    :* _*${ans}*_
──────────────────`)
            break
        case `${prefix}maukah`:
        case `${prefix}mauga`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial)
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nmau = args.join(' ')
            const jmau = maukah[Math.floor(Math.random() * (nmaukah.length))]
            if (!mau) tobz.reply(self, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await tobz.sendText(self, `
──────────────────
➥ *Pertanyaan :* _*${nmau}_* 
➥ *Jawaban    :* _*${jmau}*_
──────────────────`)
            break
        case `${prefix}siapa`:
        case `${prefix}siapakah`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial)
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nsiapa = args.join(' ')
            const jsiapa = siapa[Math.floor(Math.random() * (nsiapa.length))]
            if (!nsiapa) tobz.reply(self, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await tobz.sendText(self, `
──────────────────
➥ *Pertanyaan :* _*${nsiapa}*_ 
➥ *Jawaban    :* _*${jsiapa}*_
──────────────────`)
            break                       
        case `${prefix}nilai`:
        case `${prefix}rate`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial)
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            if (!rating) tobz.reply(self, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await tobz.sendText(self, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
            break
        case `${prefix}apakah`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial)
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) tobz.reply(self, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await tobz.sendText(self, `
──────────────────
➥ *Pertanyaan :* _*${nanya}*_
➥ *Jawaban    :* _*${jawab}*_
──────────────────`)
            break
         case `${prefix}bisakah`:
             //if(isReg(obj)) return
            //if(cekumur(cekage)) return
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                 await limitAdd(serial) 
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) tobz.reply(self, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
            await tobz.sendText(self, `
──────────────────
➥ *Pertanyaan :* _*${bsk}*_
➥ *Jawaban    :* _*${jbsk}*_
──────────────────`)
            break
		/*case 'Rii':
			const bls = balas[Math.floor(Math.random() * (balas.length))]
			await tobz.reply(self, `*${bls}* \n\n`, id)
			break*/
        case `${prefix}owner`:
        case `${prefix}creator`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            tobz.sendContact(chatId, `6285349607186@c.us`)
            tobz.reply(self, 'Itu Nomer Boss Ku!', id)
            break
        case `${prefix}ctc`:
            tobz.sendcontact(chatId, `@c.us`, id)
            break
        // ON OFF
        case `${prefix}nsfw`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(self, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                tobz.reply(self, `NSFW berhasil di aktifkan di group ini! kirim perintah *${prefix}nsfwMenu* untuk mengetahui menu`, id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                tobz.reply(self, 'NSFW berhasil di nonaktifkan di group ini!', id)
            } else {
                tobz.reply(self, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}pnsfw`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(self, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                tobz.reply(self, 'NSFW berhasil di aktifkan di group ini! kirim perintah *${prefix}nsfwMenu* untuk mengetahui menu', id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                tobz.reply(self, 'NSFW berhasil di nonaktifkan di group ini!', id)
            } else {
                tobz.reply(self, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}simi`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
           // if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin Rii!', id) // Hanya Admin yang bisa mengaktifkan
            if (args.length === 1) return tobz.reply(self, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                simi_.push(chat.id)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                tobz.reply(self, `Simsimi berhasil di aktifkan!, Kirim perintah *${prefix} teks]*\nContoh : *${prefix} halo*`, id)
            } else if (args[1].toLowerCase() === 'disable') {
                simi_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                tobz.reply(self, 'Simsimi berhasil di nonaktifkan!', id)
            } else {
                tobz.reply(self, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}group`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (args.length === 1) return tobz.reply(self, 'Pilih open atau close!', id)
            if (args[1].toLowerCase() === 'open') {
                tobz.setGroupToAdminsOnly(groupId, false)
                tobz.sendTextWithMentions(self, `Group telah dibuka oleh admin @${sender.id.replace('@c.us','')}\nSekarang *semua member* dapat mengirim pesan`)
            } else if (args[1].toLowerCase() === 'close') {
                tobz.setGroupToAdminsOnly(groupId, true)
                tobz.sendTextWithMentions(self, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            } else {
                tobz.reply(self, 'Pilih open atau disable close!', id)
            }
            break
        case `${prefix}left`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(self, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                left.push(chat.id)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                tobz.reply(self, 'Fitur left berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                left.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                tobz.reply(self, 'Fitur left berhasil di nonaktifkan di group ini!', id)
            } else {
                tobz.reply(self, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}welcome`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return tobz.reply(self, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                tobz.reply(self, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                tobz.reply(self, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                tobz.reply(self, 'Pilih enable atau disable udin!', id)
            }
            break
        case `${prefix}resetsticker`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isAdmin) return tobz.reply(self, `Maaf, perintah ini hanya dapat dilakukan oleh Admin Rii!`, id)
            if (!args.length === 1) return tobz.reply(self, `Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: ${prefix}resetsticker 62852262236155 / ${prefix}resetsticker @member`, id) 
            const nomebr = args[1]
            let textz = nomebr.replace(/[-\s+@c.us]/g,'')
            const cuss = textz + '@c.us'
                var found = false
                Object.keys(stickerspam).forEach((i) => {
                    if(stickerspam[i].id == cuss){
                        found = i
                    }
                })
                if (found !== false) {
                    stickerspam[found].msg = 1;
                    const result = 'DB Sticker Spam has been reset'
                    console.log(stickerspam[found])
                    fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                    tobz.reply(self, result, from)
                    limitAdd(serial)
                } else {
                        tobz.reply(self, `Maaf, Nomor itu tidak terdaftar di database!`, id)
                }
            break
        case `${prefix}resetbadword`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
                    if(isLimit(serial)) return
                    if (!isGroupAdmins) return tobz.reply(self, 'Command ini hanya dapat digunakan oleh admin grup')  
                    if (!args.length === 1) return tobz.reply(self, `Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: ${prefix}resetbadword 6285112554122 / ${prefix}resetbadword @member`) 
                    const nomer = args[1]
                    let text = nomer.replace(/[-\s+@c.us]/g,'')
                    const cus = text + '@c.us'
                        var found = false
                        Object.keys(msgBadword).forEach((i) => {
                            if(msgBadword[i].id == cus){
                                found = i
                            }
                        })
                        if (found !== false) {
                            msgBadword[found].msg = 1;
                            const result = 'DB Badword Spam has been reset'
                            console.log(msgBadword[found])
                            fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                            tobz.reply(self, result, from)
                            limitAdd(serial)
                        } else {
                                tobz.reply(self, `${monospace(`Di database ngga ada nomer itu dik`)}`, id)
                        }
                break            
        // ON OFF
        case `${prefix}antilink`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return tobz.reply(self, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antilink.includes(chatId);
                if(cek){
                    return tobz.reply(self, `*「 ANTI GROUP LINK 」*\nStatus : Sudah Aktif`, id) //if number already exists on database
                } else {
                    antilink.push(chatId)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    tobz.reply(self, `*「 ANTI GROUP LINK 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antilink.includes(chatId);
                if(!cek){
                    return tobz.reply(self, `*「 ANTI GROUP LINK 」*\nStatus : Sudah DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antilink.indexOf(chatId)
                    antilink.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.daf(antilink))
                    tobz.reply(self, `*「 ANTI GROUP LINK 」*\nStatus : Nonaktif`, id)
                }
            } else {
                tobz.reply(self, `Pilih enable atau disable udin!`, id)
            }
            break    
        case `${prefix}antisticker`:
        case `${prefix}antistiker`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return tobz.reply(self, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return tobz.reply(self, `*「 ANTI SPAM STICKER 」*\nStatus : Sudah Aktif`, id)
                 } else {
                    antisticker.push(chatId)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    tobz.reply(self, `*「 ANTI SPAM STICKER 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return tobz.reply(self, `*「 ANTI SPAM STICKER 」*\nStatus : Sudak DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antisticker.indexOf(chatId)
                    antisticker.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    tobz.reply(self, `*「 ANTI SPAM STICKER 」*\nStatus : Nonaktif`, id)
                    limitAdd(serial)
                }
            } else {
                tobz.reply(self, `Pilih enable atau disable udin!`, id)
            }
            break
        case `${prefix}antibadword`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return tobz.reply(self, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antibadword.includes(chatId);
                if(cek){
                    return tobz.reply(self, `*「 ANTI BADWORD 」*\nSudah diaktifkan di grup ini`, id)
                } else {
                    antibadword.push(chatId)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    tobz.reply(self, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau Rii Akan Kick!`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antibadword.includes(chatId);
                if(!cek){
                    return tobz.reply(self, `*「 ANTI BADWORD 」*\nSudah dinonaktifkan di grup ini`, id)
                } else {
                    let nixx = antibadword.indexOf(chatId)
                    antibadword.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    tobz.reply(self, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau Rii Akan Kick!`, id)
                }
            } else {
                tobz.reply(self, `Pilih enable atau disable udin!`, id)
            } 
            break   
        // ANIME //
        case `${prefix}otakudesu`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@otakudesu [query]*\nContoh : *@otakudesu darling in the franxx*', id)
            const animes = await axios.get('https://mhankbarbars.herokuapp.com/api/otakudesu?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animes.data.error) return tobz.reply(self, animes.data.error, id)
            const res_animes = `${animes.data.title}\n\n${animes.data.info}\n\n${animes.data.sinopsis}`
            tobz.sendFileFromUrl(self, animes.data.thumb, 'otakudesu.jpg', res_animes, id)
            break
        case `${prefix}kusonime`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@kusonime [query]*\nContoh : *@kusonime darling in the franxx*', id)
            const animeq = await axios.get('https://mhankbarbars.herokuapp.com/api/kuso?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animeq.data.error) return tobz.reply(self, animeq.data.error, id)
            const res_animeq = `${animeq.data.title}\n\n${animeq.data.info}\n\n${animeq.data.sinopsis}\n\n${animeq.data.link_dl}`
            tobz.sendFileFromUrl(self, animeq.data.thumb, 'kusonime.jpg', res_animeq, id)
            break
        case `${prefix}dewabatch`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@dewabatch [query]*\nContoh : *@dewabatch darling in the franxx*', id)
            const animek = await axios.get('https://mhankbarbars.herokuapp.com/api/dewabatch?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animek.data.error) return tobz.reply(self, animek.data.error, id)
            const res_animek = `${animek.data.result}\n\n${animek.data.sinopsis}`
            tobz.sendFileFromUrl(self, animek.data.thumb, 'dewabatch.jpg', res_animek, id)
            break
        case 'nyanyi':
            case 'nyanyi kuy':
            tobz.sendPtt(self, './media/desah.mp3', id)
            break
            case `${prefix}heroml`:
             //   if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
                
                await limitAdd(serial)
                if (args.length === 1) return tobz.reply(self, 'Kirim perintah *!heroml [nama hero]*\nContoh : *!heroml akai*', id)
                try {
                const resp = await axios.get('https://api.vhtear.com/herodetail?query=' + body.slice(8) + '&apikey=' + vhtearkey)
                if (resp.data.error) return tobz.reply(self, resp.data.error, id)
                const anm2 = `➸ Title : ${resp.data.result.title}\n➸ Quotes : ${resp.data.result.quotes}\n➸ Info : ${resp.data.result.info}\n➸ Atribut : ${resp.data.result.attributes}`
                tobz.reply(self, anm2, id)
                } catch (err) {
                    console.error(err.message)
                    await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                    tobz.sendText(ownerNumber, 'Heroml Error : ' + err)
               }
                break
        case `${prefix}komiku`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@komiku [query]*\nContoh : *@komiku darling in the franxx*', id)
            const animep = await axios.get('https://mhankbarbars.herokuapp.com/api/komiku?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animep.data.error) return tobz.reply(self, animep.data.error, id)
            const res_animep = `${animep.data.info}\n\n${animep.data.sinopsis}\n\n${animep.data.link_dl}`
            tobz.sendFileFromUrl(self, animep.data.thumb, 'komiku.jpg', res_animep, id)
            break
        case `${prefix}pinterest`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.pinterest [query]*\nContoh : *.pinterest Rii*', id)
            const ptrsq = body.slice(11)
            const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${ptrsq}&apikey=${vhtearkey}`)
            if (!ptrst.ok) throw new Error(`Error Pinterest : ${ptrst.statusText}`)
            const ptrs = await ptrst.json()
            const ptrsn = ptrs.result
            const b = JSON.parse(JSON.stringify(ptrsn))
            const ptrs2 =  b[Math.floor(Math.random() * b.length)]
            const image = await bent("buffer")(ptrs2)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            await tobz.sendImage(self, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${ptrsq}*`)
            await limitAdd(serial)
            break
        case `${prefix}nhview`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@nhview [212121]*\nContoh : *@nhview 321421*', id)
            const nhsh = body.slice(11)
            const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code='+nhsh)
            for (let i = 0; i < nhsh2.length; i++) {
                await tobz.sendImage(self, nhsh2[i].data, 'thumbserc.jpg', '', id)
                }
            break
        case `${prefix}loli`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${vhtearkey}`)
            const loly = loli.data.result
            tobz.sendFileFromUrl(self, loly.result, 'loli.jpeg', '*LOLI*', id)
            break
        case `${prefix}shota`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const imageToBase64 = require('image-to-base64')
            var shouta = ['shota anime','anime shota'];
            var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
            var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
            
            axios.get(urlshot)
            .then((result) => {
            var sht = JSON.parse(JSON.stringify(result.data));
            var shotaak =  sht[Math.floor(Math.random() * sht.length)];
            imageToBase64(shotaak)
            .then(
                (response) => {
            let img = 'data:image/jpeg;base64,'+response
            tobz.sendFile(self, img, "shota.jpg", `*SHOTA*`, id)
                    }) 
                .catch(
                    (error) => {
                        console.log(error);
                    })
            })
            break
        case `${prefix}waifu`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const waifu = await axios.get('https://tobz-api.herokuapp.com/api/waifu')
            tobz.sendFileFromUrl(self, waifu.data.image, 'Waifu.jpg', `➸ Name : ${waifu.data.name}\n➸ Description : ${waifu.data.desc}\n\n➸ Source : ${waifu.data.source}`, id)
            break
        case `${prefix}husbu`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const diti = fs.readFileSync('./lib/database/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            tobz.sendFileFromUrl(self, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            break
        case `${prefix}bokep`:    
        case `${prefix}randombokep`:    
        case `${prefix}rbokep`:    
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id) // MFARELS
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id) // MFARELS
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id) // MFARELS
            
            await limitAdd(serial) // MFARELS
            const mskkntl = fs.readFileSync('./lib/database/18+.json') // MFARELS
            const kntlnya = JSON.parse(mskkntl) // MFARELS
            const rindBkp = Math.floor(Math.random() * kntlnya.length) // MFARELS
            const rindBkep = konsolJsin[rindBkp] // MFARELS
            tobz.sendFileFromUrl(self, rindBkep.image, 'Bokep.jpg', rindBkep.teks, id) // MFARELS
            break // MFARELS
        // MFARELS          
        case `${prefix}randomnekonime`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const nekonime = await axios.get(`https://tobz-api.herokuapp.com/api/nekonime`)
            const nekon = nekonime.data
            if (nekon.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendFileFromUrl(self, nekon.result, `Nekonime${ext}`, 'Nekonime!', id)
            break
        case `${prefix}randomtrapnime`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const trapnime = await axios.get('https://tobz-api.herokuapp.com/api/nsfwtrap')
            const trapn = trapnime.data.result
            if (trapn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendImage(self, trapn.result, `trapnime${ext}`, 'Trapnime!', id)
            break
        case `${prefix}randomhentai`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const hentai = await axios.get(`https://tobz-api.herokuapp.com/api/hentai`)
            const henta = hentai.data
            if (henta.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendImage(self, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
            break
        case `${prefix}randomnsfwneko`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const nsfwneko = await axios.get('https://tobz-api.herokuapp.com/api/nsfwneko')
            const nsfwn = nsfwneko.data
            if (nsfwn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendImage(self, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
            break
        case `${prefix}randomanime`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const ranime = await axios.get('https://tobz-api.herokuapp.com/api/randomanime')
            const ranimen = ranime.data
            if (ranimen.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            tobz.sendFileFromUrl(self, ranime.result, `RandomAnime${ext}`, 'Random Anime!', id)
            break
        case `${prefix}nhder`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `*NEKOPOI DOWNLOADER*\n\nLink: ${shortener}`
                tobz.sendText(self, caption)
            } else {
                tobz.sendText(self, 'Maaf tolong masukan code nuclear')
            }
            break            
        case `${prefix}wallanime` :
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const walnime = ['https://wallpaperaccess.com/full/395986.jpg','https://wallpaperaccess.com/full/21628.jpg','https://wallpaperaccess.com/full/21622.jpg','https://wallpaperaccess.com/full/21612.jpg','https://wallpaperaccess.com/full/21611.png','https://wallpaperaccess.com/full/21597.jpg','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://wallpaperaccess.com/full/21591.jpg','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            tobz.sendFileFromUrl(self, walnimek, 'Nimek.jpg', '', id)
            break
        case `${prefix}quotesnime`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const skya = await axios.get('https://tobz-api.herokuapp.com/api/quotesnime/random')
            skya_ = skya.data
            tobz.reply(self, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
            break
        case `${prefix}meme`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            tobz.sendFileFromUrl(self, `${url}`, 'meme.jpg', `${title}`)
            break
        case `${prefix}subreddit`:
        case `${prefix}sreddit`:
        case `${prefix}sr`:
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            arg = body.trim().split(' ')
            const sr = arg[1]
            try {
            const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + sr + '/');
            const { postLink, title, subreddit, url, nsfw, spoiler } = response1.data
                if (nsfw == true) {
                    if ((isGroupMsg) && (isNsfw)) {
                        await tobz.sendFileFromUrl(self, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                    } else if ((isGroupMsg) && (!isNsfw)) {
                        await tobz.reply(self, `Nsfw belum diaktifkan di Grup *${name}*`, id)
                    }
                } else { 
                    await tobz.sendFileFromUrl(self, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                }
            } catch(err) {
                await tobz.sendFileFromUrl(self, errorurl, id) 
            }
            break            
        case `${prefix}nekopoi`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@nekopoi [linkNekopoi]*\nContoh : *@nekopoi https://nekopoi.care/tsunpuri-episode-1-subtitle-indonesia/*', id)
            try {
            tobz.reply(self, mess.wait, id)
            const nekipoi = await axios.get('https://mhankbarbars.herokuapp.com/api/nekopoi?url=' + body.slice(7) + '&apikey=' + vhtearkey)
            const nekop = nekipoi.data.result
            const nekop2 = `*Anime Ditemukan!*\n➸ Judul : ${nekop.judul}\n➸ Dilihat : ${nekop.dilihat}\n➸ Info : ${nekop.info}`
            const image = await bent("buffer")(nekop.thumbnail)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            tobz.sendImage(self, base64, judul, nekop2)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
             tobz.sendText(ownerNumber, 'Nekopoi Error : ' + err)
			}
            break
        case `${prefix}quoteanime`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
                        if(args[1]){
                            if(args[1] === 'anime'){
                                const anime = body.slice(13)
                                axios.get('https://animechanapi.xyz/api/quotes?anime='+anime).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    tobz.sendText(self, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                }).catch(err => {
                                    tobz.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }else{
                                const char = body.slice(12)
                                axios.get('https://animechanapi.xyz/api/quotes?char='+char).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    tobz.sendText(self, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                }).catch(err => {
                                    tobz.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }
                        }else{
                            axios.get('https://animechanapi.xyz/api/quotes/random').then(({ data }) => {
                                let penyanyi = data.result[0].penyanyi 
                                let judul = data.result[0].judul
                                let linkimg = data.result[0].linkImg
                                let lagu = data.result[0].linkMp3 
                                let size = data.result[0].filesize
                                let durasi = data.result[0].duration
                                tobz.sendText(self, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)                               
                            }).catch(err => {
                                console.log(err)
                            })
                        }
            break
        case `${prefix}malanime`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const keyword = message.body.replace(`${prefix}malanime`, '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            tobz.sendImage(self, base64, title, content)
           } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        case `${prefix}malcharacter`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const keywords = message.body.replace(`${prefix}malcharacter`, '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywords}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            tobz.sendImage(self, base64, name, contentt)
           } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        // PRAY //
        case `${prefix}jadwalshalat`:
        case `${prefix}jadwalsholat`:
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `[❗] Kirim perintah *@jadwalShalat [ Daerah ]*\ncontoh : *@jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *@listDaerah*`)
            const daerah = body.slice(14)
            const jadwalShalat = await axios.get(`https://api.vhtear.com/jadwalsholat?query=${daerah}&apiKey=${vhtearkey}`)
            if (jadwalShalat.data.error) return tobz.reply(self, jadwalShalat.data.error, id)
            const { Shubuh, Zduhur, Ashr, Magrib, Isya, kota } = await jadwalShalat.data
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `「 JADWAL SHALAT 」\n\nJadwal shalat di ${kota}, ${tgl}-${arrbulan[bln]}-${thn}\n\nSubuh : ${Shubuh}\nDzuhur : ${Zduhur}\nAshar : ${Ashr}\nMaghrib : ${Magrib}\nIsya : ${Isya}`
            await limitAdd(serial)
            break
        case `${prefix}quran`:
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
			if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah Surah Quran kamu dengan cara ketik perintah :\n*@quran* [ Urutan Surat ]\nContoh :\n*@quran 1*`, id)
            const qura = `https://api.vhtear.com/quran?no=${args[1]}&apikey=${vhtearkey}`
            const quraan = await axios.get(qura)
            const quraann = quraan.data
            let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
            await tobz.reply(self, `${hasqu}`, id).catch((e) => tobz.reply(self, `*Terdapat kesalahan saat mencari surat ${args[1]}*`, id))
            await limitAdd(serial)
            break
        case `${prefix}listsurah`:
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n>>_wa.me/6285349607186_<<', id)
			try {
                axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                .then((response) => {
                    let hehex = '*「 DAFTAR SURAH 」*\n\n___________________________\n'
                    let nmr = 1
                    for (let i = 0; i < response.data.data.length; i++) {
                        hehex += nmr + '. ' +  monospace(response.data.data[i].name.transliteration.id.toLowerCase()) + '\n'
                        nmr++
                            }
                        hehex += `${prefix}__________________________`
                    tobz.reply(self, hehex, id)
                })
            } catch(err) {
                tobz.reply(self, err, id)
            }
            break
        case `${prefix}infosurah`:
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
			if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return tobz.reply(self, `Kirim perintah *@infosurah [ Nama Surah ]*\nContoh : *@infosurah al-fatihah*`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
                try {
                    var pesan = "*「 INFORMASI SURAH 」*\n\n___________________________\n\n"
                    pesan = pesan + "➸ *Nama* : "+ data[idx].name.transliteration.id + "\n" + "➸ *Asma* : " +data[idx].name.short+"\n"+"➸ *Arti* : "+data[idx].name.translation.id+"\n"+"➸ *Jumlah ayat* : "+data[idx].numberOfVerses+"\n"+"➸ *Nomor surah* : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"➸ *Keterangan* : "+data[idx].tafsir.id
                    pesan += '\n\n___________________________'
                    tobz.reply(self, pesan, message.id)
                    limitAdd(serial)
                }catch{
                    tobz.reply(self, 'Data tidak ditemukan, atau nama surah salah', id)
                }
            break
        case `${prefix}tafsir`:
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return tobz.reply(self, `Kirim perintah *@tafsir [ Nama Surah ] [ Ayat ]*\nContoh : *@tafsir al-fatihah 2*`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var {data} = responsh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
            try{
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                var responsih = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[2])
                    var {data} = responsih.data
                    pesan = ""
                    pesan = pesan + "*「 TAFSIR 」*\n\nTafsir Q.S. "+data.surah.name.transliteration.id+":"+args[2]+"\n\n"
                    pesan = pesan + data.text.arab + "\n\n"
                    pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                    pesan += '\n\n___________________________'
                    tobz.reply(self, pesan, message.id)
                    limitAdd(serial)
                }
            }catch{
                tobz.reply(self, 'Data tidak ditemukan, mungkin nama surah/ayat salah', id)
            }
            break
        // MEDIA //
        case `${prefix}infogempa`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const bmkg = await axios.get('http://tobz-api.herokuapp.com/api/infogempa')
            const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg.data
            const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
            tobz.sendFileFromUrl(self, map, 'shakemap.jpg', hasil, id)
            break
        case `${prefix}ssphone`:
        case `${prefix}sshp`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.ssphone [linkWeb]*\nContoh : *.ssphone https://neonime.vip*', id)
            const sshp = body.slice(9)
            tobz.sendFileFromUrl(self, `https://api.vhtear.com/ssweb?link=${sshp}&type=phone&apikey=${vhtearkey}`, 'ssphone.jpg', '', id)
            break
        case '${prefix}sspc':
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.sspc [linkWeb]*\nContoh : *.sspc https://neonime.vip*', id)
            const sspc = body.slice(6)
            tobz.sendFileFromUrl(self, `https://api.vhtear.com/ssweb?link=${sspc}&type=pc&apikey=${vhtearkey}`, 'sspc.jpg', '', id)
            break            
        case `${prefix}ssweb`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@ssweb [linkWeb]*\nContoh : *@ssweb https://neonime.vip*', id)
            const ssw = await axios.get('https://mhankbarbars.herokuapp.com/api/url2image?url=' + body.slice(7) + '&apiKey=' + barbarkey)
            const ssww = ssw.data
            if (ssww.error) return tobz.reply(self, ssww.error, id)
            const ssw2 = `Filesize: ${ssww.filesize}`
            tobz.sendFileFromUrl(self, ssww.result, 'ssweb.jpg', ssw2, id)
            break
        case `${prefix}shorturl`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.shorturl [linkWeb]*\nContoh : *.shorturl https://neonime.vip*', id)
            const sorturl = body.slice(10)
            const surl = await axios.get('https://tobz-api.herokuapp.com/api/shorturl?url=' + sorturl)
            const surll = surl.data
            if (surll.error) return tobz.reply(self, ssww.error, id)
            const surl2 = `Link : ${sorturl}\nShort URL : ${surll.result}`
            tobz.sendText(self, surl2, id)
            break
        case `${prefix}cuaca`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@cuaca [tempat]*\nContoh : *@cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await axios.get('https://mhankbarbars.herokuapp.com/api/cuaca?q='+ tempat +'&apiKey='+ barbarkey)
            const weatherr = weather.data
            if (weatherr.error) {
                tobz.reply(self, weatherr.error, id)
            } else {
                tobz.reply(self, `➸ Tempat : ${weatherr.result.tempat}\n\n➸ Angin : ${weatherr.result.angin}\n➸ Cuaca : ${weatherr.result.cuaca}\n➸ Deskripsi : ${weatherr.result.desk}\n➸ Kelembapan : ${weatherr.result.kelembapan}\n➸ Suhu : ${weatherr.result.suhu}\n➸ Udara : ${weatherr.result.udara}`, id)
            }
            break
        case `${prefix}covid`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const country = await slicedArgs.join(' ')
            console.log(country)
            const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
            const { cases, todayCases, deaths, todayDeaths, active } = response2.data
                await tobz.sendText(self, '🌎️ Covid Info - ' + country + ' 🌍️\n\n✨️ Total Cases: ' + `${cases}` + '\n📆️ Today\'s Cases: ' + `${todayCases}` + '\n☣️ Total Deaths: ' + `${deaths}` + '\n☢️ Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️ Active Cases: ' + `${active}` + '.')
            break
        case `${prefix}spamcall`:
             if (!isOwner, !isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Owner & Admin bot', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const spam = await slicedArgs.join(' ')
            console.log(spam)
            const call2 = await axios.get('https://tobz-api.herokuapp.com/api/spamcall?no=' + spam)
            const { logs } = call2.data
                await tobz.sendText(self, `Logs : ${logs}` + '.')
            break
        case `${prefix}ytmp4`:
            return tobz.reply(self, `Fitur Sedang Dalam Perbaikan!, id`)
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
           if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *!ytmp4 [ Link Yt ]*, untuk contoh silahkan kirim perintah *!readme*`)
            let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLin) return tobz.reply(self, mess.error.Iv, id)
            try {
                tobz.reply(self, mess.wait, id)
                const ytvh = await fetch(`https://tobz-api.herokuapp.com/api/ytv?url=${args[1]}`)
                if (!ytvh.ok) throw new Error(`Error Get Video : ${ytvh.statusText}`)
                const ytvh2 = await ytvh.json()
                 if (ytvh2.status == true) {
                    tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    const { title, UrlVideo, imgUrl, size } = await ytvh2.result
                    if (Number(size.split(' MB')[0]) > 30.00) return tobz.reply(self, `Maaf durasi video sudah melebihi batas maksimal 30 MB!`, id)
                    tobz.sendFileFromUrl(self, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n➸ *Judul* : ${title}\n➸ *Filesize* : ${size}\n\n_Silahkan download video melalui link dibawah_.\n${UrlVideo}`, id)
                    await tobz.sendFileFromUrl(self, UrlVideo, `${title}.mp4`, '', id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error ytmp4 : '+ err)
                tobz.reply(self, mess.error.Yt4, id)
                console.log(err)
            }
            break          
        case `${prefix}play`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)                
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
		      ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
           if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length == 1) return tobz.reply(self, `Untuk mencari lagu dari youtube\n\nPenggunaan: @play judul lagu`, id)
            try {
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtearkey}`)
                if (!webplay.ok) throw new Error(`Error Get Video : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(webplay2.result.size.split(' MB')[0]) >= 15.00) return tobz.reply(self, 'Maaf durasi music sudah melebihi batas Minimal 10 MB!', id)
                    const { image, mp3, size, ext, title, duration } = await webplay2.result
                    const captplay = `*「 PLAY 」*\n\n➸ *Judul* : ${title}\n➸ *Durasi* : ${duration}\n➸ *Filesize* : ${size}\n➸ *Exp* : ${ext}\n\n_*Music Sedang Dikirim*_`
                    //tobz.sendFileFromUrl(self, image, `thumb.jpg`, captplay, id)
                    await tobz.sendPtt(self, mp3, `${title}.mp3`, '', id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error Play : '+ err)
                tobz.reply(self, mess.error.Yt3, id)
            }
            break
        case `${prefix}nyanyi`:
            //if (!isGroupMsg) return tobz.reply(self, menuPriv, id)
           
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.nyanyi _Lagunya_*, untuk contoh silahkan kirim perintah *.readme*')
            const quernyanyi = body.slice(8)
            try {
                tobz.reply(self, mess.wait, id)
                const datanyanyi = await get.get(`https://api.vhtear.com/music?query=${quernyanyi}&apikey=${vhtearkey}`)
               //  if (!bahannyanyi) throw new Error(`Err nyanyi :( ${bahannyanyi.statusText}`)
                // const datanyanyi = await bahannyanyi.json()
    
                 console.log(datanyanyi)
                tobz.reply(self, `_Bot sedang vn..._`)
                if (Number(datanyanyi.result[0].duration.split(':')[1]) >= 12) return tobz.reply(self, '_Mohon maaf sepertinya durasi video telah melebihi batas._', id)
                if (!datanyanyi.result[0].judul == '') {
                    tobz.sendFileFromUrl(self, datanyanyi.result[0].linkImg, 'Thumbnyanyi.jpg',`Bot nyanyi lagu : ${datanyanyi.result[0].judul}\nfrom penyanyi : ${datanyanyi.result[0].penyanyi}\nDurasinya : ${datanyanyi.result[0].duration}`)
                    await tobz.sendFileFromUrl(self, datanyanyi.result[0].linkMp3, 'Laginyanyi.mp3', '', id).catch((errs) => console.log(errs))
                } else {
                    tobz.reply(self, `_Kayanya bot gabisa nyanyi lagu itu :(_`, id)
                }
            } catch (err) {
                ERRLOG(err)
                tobz.reply(self, `_Kayanya bot gabisa nyanyi lagu itu hemm :(_`, id)
            }
            await tobz.sendSeen(self)
            break         
        case `${prefix}ytmp3`:
             return tobz.reply(self, `Fitur Sedang Dalam Perbaikan!, id`)
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
           if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *.ytmp3 [ Link Yt ]*, untuk contoh silahkan kirim perintah *.readme*`, id)
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return tobz.reply(self, mess.error.Iv, id)
            try {
                tobz.reply(self, mess.wait, id)
                const vhtearyt3 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!vhtearyt3.ok) throw new Error(`Error ytmp3 3 : ${vhtearyt3.statusText}`)
                const vhtearyt33 = await vhtearyt3.json()
                 if (vhtearyt33.status == false) {
                    tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if(Number(vhtearyt33.result.size.split(' MB')[0]) >= 20.00) return tobz.sendFileFromUrl(self, vhtearyt33.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${vhtearyt33.result.title}\n• *Filesize* : ${vhtearyt33.result.size}\n\n_Maaf, Durasi audio melebihi 10 MB. Silahkan download audio melalui link dibawah_.\n${vhtearyt33.result.UrlMp3}`, id)
                    const { title, ext, size, UrlMp3, status, imgUrl } = await vhtearyt33.result
                    console.log(`VhTear Giliran ${ext}\n${size}\n${status}`)
                    //const captions = `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    tobz.sendFileFromUrl(self, imgUrl, `thumb.jpg`, captions, id)
                    //await tobz.sendFile(self, UrlMp3, `${title}.mp3`, '', id)
                    await tobz.sendFileFromUrl(self, UrlMp3, `${title}.mp3`, '', id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                tobz.reply(self, mess.error.Yt3, id)
            }
            break    
        case `${prefix}google`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            tobz.reply(self, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return tobz.reply(self, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                tobz.reply(self, vars, id);
            }).catch(e => {
                console.log(e)
                tobz.sendText(ownerNumber, 'Google Error : ' + e);
            })
            break
        case `${prefix}translate`:
        case `${prefix}ts`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if(args[1] == undefined || args[2] == undefined) return
            if(args.length >= 2){
                var codelang = args[1]
                var text0 = body.slice(11+codelang.length);
                translatte(text0, {to: codelang}).then(res => {
                    tobz.sendText(self,res.text0);
                    limitAdd(serial)
                }).catch(err => {
                     tobz.sendText(self,`[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n~> *@bahasa* untuk melihat list kode bahasa`);
                });
            }
            break            
        case `${prefix}nhentai`: // SEARCH NHENTAI
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.nhentai* [ Query ]')
            const quernh = body.slice(9)
            tobz.reply(self, mess.wait, id)
            try {
                const resnh = await fetch(`https://api.vhtear.com/nhentaisearch?query=${encodeURIComponent(quernh)}&apikey=${vhtearkey}`)
                if (!resnh.ok) throw new Error(`unexpected response ${resnh.statusText}`)
                const jsonnh = await resnh.json()
                const { doujins } = await jsonnh.result
                let berhitung = 1
                let xixixi = `*「 NHENTAI 」*\n\n*Hasil Pencarian* : ${quernh}\n*Sort* : ${jsonnh.result.sort}\n*Total Pencarian* : ${jsonnh.result.totalResults}\n\n─────────────────\n\nKetik .getnhentai [ Angka ] untuk mengambil ID, Contoh : .getnhentai 2\n`
                for (let i = 0; i < doujins.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${doujins[i].title}\n*Bahasa* : ${doujins[i].lang}\n*Perintah download* : *.getnhentai ${doujins[i].id}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < doujins.length; ii++) {
                    xixixi += `(${prefix})${doujins[ii].id}`
                }
                await tobz.sendFileFromUrl(self, doujins[0].cover, 'thumbnh.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                tobz.sendFileFromUrl(self, errorurl, 'error.png', '💔️ Maaf, Nhentai tidak ditemukan')
                tobz.sendText(ownerNumber, 'Nhentai Error : ' + err)
            }
            break
        case `${prefix}getnhentai`: // DOWNLOADER NHENTAI PDF FROM ${prefix}NHENTAI
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getnhentai [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`, id)
                    if (!Number(args[1])) return tobz.reply(self, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *.getnhentai 1*`, id)
                    const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = dataDownmp3.split('(#)')
                    console.log(pilur[args[1]])
                    tobz.reply(self, mess.wait, id)
                    const vezasukadoujin = await fetch(`https://api.vhtear.com/nhentaidoujin?query=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!vezasukadoujin.ok) throw new Error(`Error barbaryt3 ${vezasukadoujin.statusText}`)
                    const doujinveza = await vezasukadoujin.json()
                    if (doujinveza.error) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { title, artists, categories, secondary_title, languages, images, tags, pages } = await doujinveza.result
                        console.log(`CHANGE API BARBAR : ${artists}\n${categories}\n${title}`)
                        const captions = `*「 NHENTAI DOWNLOADER 」*\n\n*Title* : ${title}\n*Secondary Title* : ${secondary_title}\n*Artist* : ${artists}\n*Categories* : ${categories}\n*Pages* : ${pages}\n*Languages* : ${languages}\n*Tags* : ${tags}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        //tobz.sendFileFromUrl(self, thumb, `thumb.jpg`, captions, id)
                        const urlnh = `https://nhder.herokuapp.com/download/nhentai/${pilur[args[1]]}/zip`
                        const shorttr = []
                        const shortenernh = await urlShortener(urlnh)
                        urlnh['short'] = shortenernh
                        shorttr.push(urlnh)
                        tobz.sendText(self, captions, id)
                        tobz.sendFileFromUrl(self, shortenernh, `${title}.zip`, '_NHENTAI DOWNLOADER Rii_', id)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    tobz.reply(self, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran nhentai.*`, id)
                } else {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getnhentai [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`)
                    if (args[1] <= 25) return tobz.reply(self, `*Apabila ingin mengambil data nhentai dengan nomor urutan, mohon tag pesan bot tentang pencarian nhentai!*`,)
                    tobz.reply(self, mess.wait, id)
                    const vezasukadoujin = await fetch(`https://api.vhtear.com/nhentaidoujin?query=${args[1]}&apikey=${vhtearkey}`)
                    if (!vezasukadoujin.ok) throw new Error(`Error barbaryt3 ${vezasukadoujin.statusText}`)
                    const doujinveza = await vezasukadoujin.json()
                    if (doujinveza.error) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        const { title, artists, categories, secondary_title, languages, images, tags, pages } = await doujinveza.result
                        console.log(`CHANGE API BARBAR : ${artists}\n${categories}\n${title}`)
                        const captions = `*「 NHENTAI DOWNLOADER 」*\n\n*Title* : ${title}\n*Secondary Title* : ${secondary_title}\n*Artist* : ${artists}\n*Categories* : ${categories}\n*Pages* : ${pages}\n*Languages* : ${languages}\n*Tags* : ${tags}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        //tobz.sendFileFromUrl(self, thumb, `thumb.jpg`, captions, id)
                        const urlnh = `https://nhder.herokuapp.com/download/nhentai/${args[1]}/zip`
                        const shorttr = []
                        const shortenernh = await urlShortener(urlnh)
                        urlnh['short'] = shortenernh
                        shorttr.push(urlnh)
                        tobz.sendText(self, captions, id)
                        tobz.sendFileFromUrl(self, shortenernh, `${title}.zip`, '_NHENTAI DOWNLOADER Rii_', id)
                        //await tobz.sendFileFromUrl(self, result, `${title}.pdf`, `*NHENTAI Rii*`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error Nhentai : '+ err)
                tobz.reply(self, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
        case `${prefix}phdl`: //thanks to rii BOT
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            if (!isAdmin) return tobz.reply(self, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
            if (isGroupMsg) {
                if (!isNsfw) return await tobz.reply(self, ind.notNsfw(), id)
                if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return tobz.reply(self, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
                await tobz.reply(self, mess.wait, id)
                try {
                    nsfww.phDl(yuerel)
                        .then(async ({ title, download_urls, thumbnail_url }) => {
                            const count = Object.keys(download_urls).length
                            if (count !== 2) {
                                const shortsLow = await shortener(download_urls['240P'])
                                const shortsMid = await shortener(download_urls['480P'])
                                const shortsHigh = await shortener(download_urls['720P'])
                                await tobz.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                    .then(() => console.log('Success sending pornhub metadata!'))
                            } else {
                                const shortsLow = await shortener(download_urls['240P'])
                                await tobz.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                    .then(() => console.log('Success sending pornhub metadata!'))
                            }
                        })
                } catch (err) {
                    console.error(err)
                    await tobz.reply(self, err, id)
                }
            } else {
                if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return tobz.reply(self, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
                await tobz.reply(self, mess.wait, id)
                try {
                    nsfww.phDl(yuerel)
                        .then(async ({ title, download_urls, thumbnail_url }) => {
                            const count = Object.keys(download_urls).length
                            if (count !== 2) {
                                const shortsLow = await shortener(download_urls['240P'])
                                const shortsMid = await shortener(download_urls['480P'])
                                const shortsHigh = await shortener(download_urls['720P'])
                                await tobz.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                    .then(() => console.log('Success sending pornhub metadata!'))
                            } else {
                                const shortsLow = await shortener(download_urls['240P'])
                                await tobz.sendFileFromUrl(self, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                    .then(() => console.log('Success sending pornhub metadata!'))
                            }
                        })
                } catch (err) {
                    console.error(err)
                    await tobz.reply(self, err, id)
                }
            }
            break            
        case `${prefix}xvideos`: // SEARCH VIDEO FROM YOUTUBE
            //if (!isAdmin) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin Rii!`, id)
            if (!isNsfw) return tobz.reply(self, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)        
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *.xvideos* [ Lagu ]`)
            const querVID = body.slice(9)
            tobz.reply(self, mess.wait, id)
            try {
                const resvid = await fetch(`https://mnazria.herokuapp.com/api/porn?search=${encodeURIComponent(querVID)}`)
                if (!resvid.ok) throw new Error(`unexpected response ${resvid.statusText}`)
                const jsonserxvid = await resvid.json()
                const { result } = await jsonserxvid
                let berhitung = 1
                let xixixi = `*「 XVIDEOS 」*\n\n*Hasil Pencarian : ${querVID}*\n\n─────────────────\n\nKetik .getxvideos [angka] untuk mengambil ID, Contoh : .getxvideos 2\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${result[i].title}\n*Actors* : ${result[i].actors}\n*Durasi* : ${result[i].duration}\n*Perintah download* : *.getxvideos ${result[i].url}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixi += `(#)${result[ii].url}`
                }
                await tobz.sendFileFromUrl(self, result[0].image, 'thumbxvid.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                tobz.sendFileFromUrl(self, errorurl, 'error.png', '💔️ Maaf, Xvideos tidak ditemukan')
                tobz.sendText(ownerNumber, 'Xvideos Error : ' + err)
            }
            break
        case `${prefix}getxvideos`: // DOWNLOADER VIDEO FROM #VIDEO
            //if (!isAdmin) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin Rii!`, id)
            if (!isNsfw) return tobz.reply(self, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)                 
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`)
                    if (!Number(args[1])) return tobz.reply(self, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *.getxvideos 1*`, id)
                    const datavideo = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = datavideo.split('(#)')
                    console.log(pilur[args[1]])
                    tobz.reply(self, mess.wait, id)
                    const vidxvid = await fetch(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`)
                    if (!vidxvid.ok) throw new Error(`Error Get Video : ${vidxvid.statusText}`)
                    const vidxvideo = await vidxvid.json()
                     if (vidxvideo.status == false) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { mp4 } = await vidxvideo
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n*Ext* : MP4\n\n*Silahkan download file media sedang melalui link yang tersedia.*\n${mp4}`
                        tobz.sendFileFromUrl(self, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                         await tobz.sendFileFromUrl(self, mp4, `${title}.mp4`, `XVIDEOS Rii`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    tobz.reply(self, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran videp.*`, id)
                } else {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`)
                    if (args[1] <= 25) return tobz.reply(self, `*Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian videp!*`,)
                    tobz.reply(self, mess.wait, id)
                    const getvide = await get.get(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`).json
                    if (getvide.error) {
                        tobz.reply(self, getvide.error, id)
                    } else {
                        const { mp4 } = await mhankyt35
                        const shortvidxv2 = await urlShortener(mp4)
                        console.log(`CHANGE API BARBAR : ${ext}\n${filesize}\n${status}`)
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n\n*Ext* : MP4\n*Link* : ${shortvidxv2}\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        tobz.sendFileFromUrl(self, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                         await tobz.sendFileFromUrl(self, result, `${title}.mp4`, `bokep telah terkirim ${pushname}`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error XVideos : '+ err)
                tobz.reply(self, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
            case `${prefix}film`:{
                if(isLimit(serial)) return
                if (args.lenght === 0) return tobz.reply(self, `Gunakan Fromat ${prefix}film [nama film]\nContoh ${prefix}film Downhill`, id)
                const animdl = body.slice(6)
                tobz.reply(self, 'Harap Ditunggu Sedang Mencaari data', id)
                const animekun = await get.get(`https://arugaz.herokuapp.com/api/sdmovie?film=${animdl}`).json()
                if (animekun.error) return tobz.reply(self, animekun.result, id)
                const { result } = animekun
                const { rating, sinopsis, thumb, title, video } = await result
                await tobz.sendFileFromUrl(self, thumb, 'animedl.jpg', `*FILM DITEMUKAN !*\n➤ Judul: ${title}\n➤ Sinopsis: ${sinopsis}\n➤ Rating: ${rating}\n➤ Link Download: ${video}`, id)
            limitAdd(serial)
            }
                break            
        case `${prefix}video`: // SEARCH VIDEO FROM YOUTUBE
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.video* [video]')
            const querv = body.slice(7)
            tobz.reply(self, mess.wait, id)
            try {
                const resmusv = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(querv)}&apikey=${vhtearkey}`)
                if (!resmusv.ok) throw new Error(`unexpected response ${resmusv.statusText}`)
                const jsonsercmuv = await resmusv.json()
                let berhitung1 = 1
                const { result } = await jsonsercmuv
                let xixixai = `*Hasil pencarian dari ${querv}*\n\nKetik .getvideo [angka] untuk mengambil ID, Contoh : .getvideo 2\n`
                for (let i = 0; i < result.length; i++) {
                    xixixai += `\n═════════════════\n\n*Urutan* : ${i+1}\n*Title* : ${result[i].title}\n*Channel* : ${result[i].channel}\n*Durasi* : ${result[i].duration}\n*Perintah download* : .getvideo ${result[i].id}\n`
                }
                    xixixai += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixai += `(#)${result[ii].id}`
                }
                await tobz.sendFileFromUrl(self, result[0].image, 'thumbserc.jpg', xixixai, id)
            } catch (err){
                console.log(err)
            }
            break
        case `${prefix}getvideo`: // DOWNLOADER VIDEO FROM #VIDEO
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.getvideo* [IdDownload], untuk contoh silahkan kirim perintah *.readme*', id)
            try {    
            if (quotedMsg && quotedMsg.type == 'image') {
                if (!Number(args[1])) return tobz.reply(self, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *.getmusik 1*`, id)
                const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                const pilur = dataDownmp3.split('(#)')
                console.log(pilur[args[1]])
                tobz.reply(self, mess.wait, id)
                const mhanky45 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${pilur[args[1]]}&apikey=${vhtearkey}`)
                if (!mhanky45.ok) throw new Error(`Error Get Video : ${mhanky45.statusText}`)
                const mhankyt45 = await mhanky45.json()
                if (mhankyt45.status == false) {
                    tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(mhankyt45.result.size.split(' MB')[0]) > 30.00) return tobz.sendFileFromUrl(self, mhankyt45.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${mhankyt45.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt45.result.size}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_\n${UrlVideo}`, id)
                    const { title, ext, imgUrl, size, UrlVideo } = await mhankyt45.result
                    const captions = `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${size}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`                  
                    tobz.sendFileFromUrl(self, imgUrl, `thumb.jpg`, captions, id)
                    await tobz.sendFileFromUrl(self, UrlVideo, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => tobz.reply(self, mess.error.Yt3, id))
                    await limitAdd(serial)
                }
            } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    tobz.reply(self, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran video.*`, id)
            } else {
                if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.getmusik [IdDownload]*, untuk contoh silahkan kirim perintah *.readme*')
                if (args[1] <= 25) return tobz.reply(self, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *.getmusik 1*`,)
                tobz.reply(self, mess.wait, id)
                const mhanky45 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${args[1]}&apikey=${vhtearkey}`)
                if (!mhanky45.ok) throw new Error(`Error Get Video : ${mhanky45.statusText}`)
                const mhankyt45 = await mhanky45.json()
                if (mhankyt45.status == false) {
                    tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(mhankyt45.result.size.split(' MB')[0]) > 30.00) return tobz.sendFileFromUrl(self, mhankyt45.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${mhankyt45.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt45.result.size}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_\n${UrlVideo}`, id)
                    const { title, ext, imgUrl, size, UrlVideo } = await mhankyt45.result
                    const captions = `*「 YOUTUBE VIDEO DOWNLOADER 」*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${size}\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`                  
                    tobz.sendFileFromUrl(self, imgUrl, `thumb.jpg`, captions, id)
                    await tobz.sendFileFromUrl(self, UrlVideo, `${title}.mp4`, `Video telah terkirim ${pushname}`, id).catch(() => tobz.reply(self, mess.error.Yt3, id))
                    await limitAdd(serial)
                    }
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error Video : '+ err)
                tobz.reply(self, mess.error.Yt4, id)
            }
            break
        case `${prefix}music`: // SEARCH MUSIC FROM YOUTUBE
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *#musik* [lagu]')
            const quer = body.slice(7)
            tobz.reply(self, mess.wait, id)
            try {
                const resmus = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(quer)}&apikey=${vhtearkey}`)
                if (!resmus.ok) throw new Error(`unexpected response ${resmus.statusText}`)
                const jsonsercmu = await resmus.json()
                const { result } = await jsonsercmu
                let berhitung = 1
                let xixixi = `*Hasil pencarian dari ${quer}*\n\nKetik .getmusik [angka] untuk mengambil ID, Contoh : .getmusik 2\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n═════════════════\n\n*Urutan* : ${berhitung+i}\n*Title* : ${result[i].title}\n*Channel* : ${result[i].channel}\n*Durasi* : ${result[i].duration}\n*Perintah download* : *.getmusik ${result[i].id}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixi += `(#)${result[ii].id}`
                }
                await tobz.sendFileFromUrl(self, result[0].image, 'thumbserc.jpg', xixixi, id)
            } catch (err){
                console.log(err)
                tobz.sendFileFromUrl(self, errorurl, 'error.png', '💔️ Maaf, Music tidak ditemukan')
                tobz.sendText(ownerNumber, 'Music Error : ' + err)
            }
            break
            case `${prefix}getmusik`:   
        case `${prefix}getmusic`: // DOWNLOADER MUSIC FROM #MUSIC
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.getmusik [IdDownload]*, untuk contoh silahkan kirim perintah *.readme*')
                    if (!Number(args[1])) return tobz.reply(self, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *.getmusik 1*`, id)
                    const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = dataDownmp3.split('(#)')
                    console.log(pilur[args[1]])
                    tobz.reply(self, mess.wait, id)
                    const mhanky35 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!mhanky35.ok) throw new Error(`Error Get Video : ${mhanky35.statusText}`)
                    const mhankyt35 = await mhanky35.json()
                     if (mhankyt35.status == false) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        if (Number(mhankyt35.result.size.split(' MB')[0]) >= 10.00) return tobz.sendFileFromUrl(self, mhankyt35.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*Title* : ${mhankyt35.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt35.result.size}\n\n*Untuk durasi lebih dari batas disajikan dalam bentuk link*\n${mhankyt35.result.UrlMp3}`, id)
                        const { title, ext, size, UrlMp3, status, imgUrl } = await mhankyt35.result
                        console.log(`CHANGE API BARBAR : ${ext}\n${size}\n${status}`)
                        const captions = `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        tobz.sendFileFromUrl(self, imgUrl, `thumb.jpg`, captions, id)
                        await tobz.sendPtt(self, UrlMp3, `${title}.mp3`, `DOWNLOADER MUSIC Rii`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    tobz.reply(self, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran musik.*`, id)
                } else {
                    if (args.length === 1) return tobz.reply(self, 'Kirim perintah *. getmusik [IdDownload]*, untuk contoh silahkan kirim perintah *.readme*')
                    if (args[1] <= 25) return tobz.reply(self, `*Apabila ingin mengambil data musik dengan nomor urutan, mohon tag pesan bot tentang pencarian musik!*`,)
                    tobz.reply(self, mess.wait, id)
                    const mhanky35 = await fetch(`https://api.vhtear.com/ytdl?link=https://youtu.be/${args[1]}&apikey=${vhtearkey}`)
                    if (!mhanky35.ok) throw new Error(`Error Get Video : ${mhanky35.statusText}`)
                    const mhankyt35 = await mhanky35.json()
                     if (mhankyt35.status == false) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(mhankyt35.result.size.split(' MB')[0]) >= 30.00) return tobz.sendFileFromUrl(self, mhankyt35.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*Title* : ${mhankyt35.result.title}\n*Ext* : MP3\n*Filesize* : ${mhankyt35.result.size}\n\n*Untuk durasi lebih dari batas disajikan dalam bentuk link*\n${mhankyt35.result.UrlMp3}`, id)
                        const { title, ext, size, UrlMp3, status, imgUrl } = await mhankyt35.result
                        console.log(`CHANGE API BARBAR : ${ext}\n${size}\n${status}`)
                        const captions = `*「 YOUTUBE MUSIC DOWNLOADER 」*\n\n*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        tobz.sendFileFromUrl(self, imgUrl, `thumb.jpg`, captions, id)
                        await tobz.sendPtt(self, UrlMp3, `${title}.mp3`, `DOWNLOADER MUSIC Rii`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error Get Music : '+ err)
                tobz.reply(self, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
        case `${prefix}youtubesearch`:
        case `${prefix}ytsearch`: // SEARCH YOUTUBE
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.youtubesearch [query]*, Contoh : .youtubesearch alan walker alone')
            const ytsher = body.slice(15)
            tobz.reply(self, mess.wait, id)
            try {
                const response2 = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(ytsher)}&apikey=${vhtearkey}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*Hasil Pencarian : ${ytsher}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n═════════════════\n\n*Judul* : ${result[i].title}\n*Ditonton* : ${result[i].views}\n*Durasi* : ${result[i].duration}\n*Channel* : ${result[i].channel}\n*URL* : ${result[i].urlyt}\n`
                }
                await tobz.sendFileFromUrl(self, result[0].image, 'thumbserc.jpg', xixixi, id)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    tobz.sendText(ownerNumber, 'YT Search Error : ' + err)
            }
            break
        case `${prefix}shopee`: // SEARCH SHOPEE PRODUCT
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}shopee [query]*, Contoh : *${prefix}shopee HP Samsul a20*`)
            const shopek = body.slice(8)
            tobz.reply(self, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/shopee?query=${shopek}&count=5&apikey=${vhtearkey}`)
                const dataplay = dataplai.data.result
                 let shopeq = `*Hasil Pencarian : ${shopek}*\n`
                for (let i = 0; i < dataplay.items.length; i++) {
                    shopeq += `\n═════════════════\n\n*Nama* : ${dataplay.items[i].nama}\nHarga* : ${dataplay.items[i].harga}\n*Terjual* : ${dataplay.items[i].terjual}\n*Lokasi Toko* : ${dataplay.items[i].shop_location}\n*Deskripsi* : ${dataplay.items[i].description}\n*Link Product : ${dataplay.items[i].link_product}*\n`
                }
                await tobz.sendFileFromUrl(self, dataplay.items[0].image_cover, `shopee.jpg`, shopeq, id)
            }   catch (err){
                console.log(err)
            }
            break
        case `${prefix}playstore`: // SEARCH PLAYSTORE
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}playstore [query]*, Contoh : *${prefix}playstore Mobile Legends*`)
            const keywotp = body.slice(11)
            tobz.reply(self, mess.wait, id)
            try {
                const dataplai = await axios.get(`https://api.vhtear.com/playstore?query=${keywotp}&apikey=${vhtearkey}`)
                const dataplay = dataplai.data
                 let keluarplay = `*Hasil Pencarian : ${keywotp}*\n`
                for (let i = 0; i < dataplay.result.length; i++) {
                    keluarplay += `\n═════════════════\n\n*Nama* : ${dataplay.result[i].title}\n*Developer* : ${dataplay.result[i].developer}\n*Deskripsi* : ${dataplay.result[i].description}\n*Paket ID* : ${dataplay.result[i].app_id}\n*Harga* : ${dataplay.result[i].price}\n*Link App* : https://play.google.com${dataplay.result[i].url}\n`
                }
                await tobz.sendFileFromUrl(self, dataplay.result[0].icon, `iconapk.webp`, keluarplay, id)
            }   catch (err){
                console.log(err)
            }
            break
        case `${prefix}neonime`: 
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)   
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}neonime [ Query ]*, Contoh : ${prefix}neonime danmachi`)
            const nenon = body.slice(9)
            tobz.reply(self, mess.wait, id)
            try {
                const response2 = await fetch('https://tobz-api.herokuapp.com/api/neonime?q=' + nenon)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*「 NEONIME 」*\n\n*Hasil Pencarian : ${nenon}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n• *Title* : ${result[i].title}\n• *Deskripsi* : ${result[i].desc}\n• *Link* : ${result[i].link}`
                }
                await tobz.sendFileFromUrl(self, result[0].image, 'neon.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
            }
            break            
        case `${prefix}animesearch`: // SEARCH ANIME
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}animesearch [query]*, Contoh : ${prefix}animesearch DXD (Hanya Bisa Satu Kata)`)
            const anser = body.slice(13)
            tobz.reply(self, mess.wait, id)
            try {
                const response2 = await fetch(`https://mnazria.herokuapp.com/api/anime?query=${encodeURIComponent(anser)}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const animeser = await response2.json()
                const { result } = await animeser
                let xixixi = `*Hasil Pencarian : ${anser}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n═════════════════\n\n*Judul* : ${result[i].title}\n*Ditonton* : ${result[i].url}\n`
                }
                await tobz.reply(self, xixixi, id)
            } catch (err) {
                    console.log(err)
                    await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                    tobz.sendText(ownerNumber, 'Anime Search Error : ' + err)
            }
            break
        case `${prefix}xnxx`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@xnxx [linkXnxx]*, untuk contoh silahkan kirim perintah *@readme*')
            if (!args[1].match(isUrl) && !args[1].includes('xnxx.com')) return tobz.reply(self, mess.error.Iv, id)
            try {
                tobz.reply(self, mess.wait, id)
                const resq = await axios.get('https://mhankbarbars.herokuapp.com/api/xnxx?url='+ args[1] +'&apiKey='+ barbarkey)
                const resp = resq.data
                 if (resp.error) {
                    tobz.reply(self, ytvv.error, id)
                } else {
                    if (Number(resp.result.size.split(' MB')[0]) > 20.00) return tobz.reply(self, 'Maaf durasi video sudah melebihi batas Minimal 20 menit!', id)
                    tobz.sendFileFromUrl(self, resp.result.thumb, 'thumb.jpg', `➸ *Judul* : ${resp.result.judul}\n➸ *Deskripsi* : ${resp.result.desc}\n➸ *Filesize* : ${resp.result.size}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await tobz.sendFileFromUrl(self, resp.result.vid, `${resp.result.title}.mp4`, '', id)}
            } catch (err) {
                console.log(err)
                await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                tobz.sendText(ownerNumber, 'Xnxx Error : ' + err)
            }
            break
            break
        case `${prefix}ramalpasangan`:
		case `${prefix}ramal`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@ramalpasangan [kamu|pasangan]*\nContoh : *@ramalpasangan ntan|Rii*', id)
            arg = body.trim().split('|')
            if (arg.length >= 2) {
            tobz.reply(self, mess.wait, id)
            const kamu = arg[0]
            const pacar = arg[1]
            const rpmn = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
            const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➸ Cinta : ${rpmn}\n➸ Jodoh : ${rpmn2}\n➸ Kemiripan : ${rpmn3}\n➸ Kesukaan : ${rpmn4}\n➸ Kesamaan : ${rpmn5}\n➸ Kebucinan ${rpmn6}`
            tobz.reply(self, rjh2, id)
            } else {
            await tobz.reply(self, 'Wrong Format!', id)
            }
            break
        case `${prefix}artinama`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@artinama [query]*\nContoh : *@artinama Tobz*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artinama?nama=' + body.slice(9) + '&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(self, resp.data.error, id)
            const anm2 = `➸ Artinama : ${resp.data.result.hasil}`
            tobz.reply(self, anm2, id)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                tobz.sendText(ownerNumber, 'Artinama Error : ' + err)
           }
            break
        case `${prefix}cerpen`:
                    const cerpen = await get.get('https://masgi.herokuapp.com/api/cerpen').json()
                    tobz.reply(self, `➸ *Cerpen*: ${cerpen.data}`, id)
                    break            
        case `${prefix}fb`:
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}fb [ Link Fb ]*\nContoh : *${prefix}fb https://www.facebook.com/24609282673/posts/10158628585367674/*`, id)
            tobz.reply(self, mess.wait, id)
            facebook(args[1]).then(async(res) => {
                let { VideoUrl } = await res
                const epbe2 = `*「 FACEBOOK DOWNLOADER 」*\n➸ *Aplikasi*: Facebook\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(self, VideoUrl, `Facebook.mp4`, epbe2, id)
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(self, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case `${prefix}tiktok`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}tiktok [linkTiktok]*\nContoh : *${prefix}tiktok https://vt.tiktok.com/yqyjPX/*`, id)
            tobz.reply(self, mess.wait, id)
            tiktok(args[1]).then(async(res) => {
                let { video, title, image, desk, dibuat, duration } = await res
                let ttiktok = `*「 TIKTOK DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ Deskripsi : ${desk}\n➸ Durasi : ${duration}\n➸ Dibuat : ${dibuat}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(self, image, 'thumb.jpg', ttiktok, id)
                await tobz.sendFileFromUrl(self, video, `${title}.mp4`, '', id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(self, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case `${prefix}tiktok`:
            //if (!isGroupMsg) return tobz.reply(self, menuPriv, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)    
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *!tiktok* _linkVideoTikTod_, untuk contoh silahkan kirim perintah *!readme*', id)
           
            try{
            tobz.reply(self, '_Mohon tunggu sebentar, sedang di proses..._', id)
            const jsontik = await get.get(`https://api.vhtear.com/tiktokdl?link=${args[1]}&apikey=Dim4z05`).json()
                // if (!restik.ok) throw new Error(`Kesalahan respon : ${restik.statusText}`)
                // const jsontik = await restik.json()
                if (jsontik.error){
                    tobz.reply(self, `Mohon maaf kesalahan saat mendownload data!`, id)
                } else {
                    const captik = `*Data berhasil Didapatkan*\n\n*Title* : ${jsontik.result.title}\n*Durasi* : ${jsontik.result.duration}\n*Deskripsi* : ${jsontik.result.desk}`
                    console.log(jsontik)
                    tobz.sendFileFromUrl(self, jsontik.result.image.toString(), `tiktod.jpg`, captik, id)
                    await tobz.sendFileFromUrl(self, jsontik.result.video.toString(), `${jsontik.result.title}.mp4`, `Video berhasil terkirim ${pushname}`, id)
                }
            } catch (err){
                ERRLOG(err)
                tobz.sendText(ownerNumber, 'Error tiktod = '+err)
                tobz.reply(self, `Terjadi kesalahan saat mengtobzes file tersebut, tidak bisa mengirim video!`)
            }
            await tobz.sendSeen(self)
            break            
        case `${prefix}wiki`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@wiki [query]*\nContoh : *@wiki asu*', id)
            const queryz_ = body.slice(6)
            const wiki = await axios.get(`https://mhankbarbars.herokuapp.com/api/wiki?q=${queryz_}&lang=id&apiKey=${barbarkey}`)

            if (wiki.data.error) {
                tobz.reply(self, wiki.data.error, id)
            } else {
                tobz.sendText(self, `➸ *Query* : ${queryz_}\n\n➸ *Result* : ${wiki.data.result}`, id)
            }
            break
        case `${prefix}kbbi`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@wiki [query]*\nContoh : *@wiki asu*', id)
            const kbbl = body.slice(6)
            const kbbl2 = await axios.get(`https://mnazria.herokuapp.com/api/kbbi?search=${kbbl}`)

            if (kbbl2.data.error) {
                tobz.reply(self, kbbl2.data.error, id)
            } else {
                tobz.sendText(self, `➸ *Query* : ${kbbl}\n\n➸ *Result* : ${kbbl2.data.result}`, id)
            }
            break
        case `${prefix}googleimage`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@googleimage [query]*\nContoh : *@googleimage Rii*', id)
            try{
                tobz.reply(self, mess.wait, id)
                const gimgg = body.slice(13)
                const gamb = `https://api.vhtear.com/googleimg?query=${gimgg}&apikey=${vhtearkey}`
                const gimg = await axios.get(gamb)
                var gimg2 = Math.floor(Math.random() * gimg.data.result.result_search.length)
                console.log(gimg2)
                await tobz.sendFileFromUrl(self, gimg.data.result.result_search[gimg2], `gam.${gimg.data.result.result_search[gimg2]}`, `*Google Image*\n\n*Hasil Pencarian : ${gimgg}*`, id)
            } catch (err) {
                console.log(err); 
                tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Gambar tidak ditemukan')
                tobz.sendText(ownerNumber, 'Google Image Error : ' + err)
            }
          break
        case `${prefix}smule`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *${prefix}smule [linkSmule]*\nContoh : *${prefix}smule https://www.smule.com/p/767512225_3062360163*', id)
            tobz.reply(self, mess.wait, id)
            smule(args[1]).then(async(res) => {
                let { Type, title, url, image } = await res
                let tsmule = `*「 SMULE DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ *Type:* ${Type}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(self, image, 'thumb.jpg', tsmule, id)
                await tobz.sendFileFromUrl(self, url, `${title}.mp3`, '', id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(self, `Maaf, Terjadi Kesalahan`, id)
            })
            break
	 case `${prefix}tulispantai`:
        case `${prefix}sandwriting`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return tobz.reply(self, 'Kirim perintah *${prefix}sandwriting [ Teks ]*\nContoh *${prefix}sandwriting Rii Cantik*', id)
            const swrt = body.slice(13)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*

*Text : ${swrt}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, swrt3)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Sand Writing Error : ' + err)
           }
          break
        case `${prefix}resepmasakan`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return tobz.reply(self, 'Kirim perintah *@resepmasakan [optional]*\nContoh *@resepmasakan rawon*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const rmk = await slicedArgs.join(' ')
            console.log(rmk)
            try {
            const resp = await axios.get('https://api.vhtear.com/resepmasakan?query=' + rmk + '&apikey=' + vhtearkey)
            const { bahan, cara, image, title  } = resp.data.result
            const rmk3 = `*Resep Ditemukan!*
➸ *Judul:* ${title}
➸ *Bahan:* ${bahan}
➸ *Cara:* ${cara}`

            const pictk = await bent("buffer")(image)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, title, rmk3)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Resep tidak ditemukan')
             tobz.sendText(ownerNumber, 'Resepmasakan Error : ' + err)
           }
           break
        case `${prefix}twitterstalk`:
        case `${prefix}twtstalk`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return tobz.reply(self, 'Kirim perintah *@twtstalk @username*\nContoh *@twtstalk @miakhalifah*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const twstalk = await slicedArgs.join(' ')
            console.log(twstalk)
            try {
            const twt = await axios.get(self, 'https://tobz-api.herokuapp.com/api/githubprofile?username=' + twstalk)
           tobz.reply(self, twt, id)
        } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Twitter Error : ' + err)
           }
          break
        case `${prefix}igstalk`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return tobz.reply(self, 'Kirim perintah *@igstalk @username*\nContoh *@igstalk duar_amjay*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const istalk = await slicedArgs.join(' ')
            console.log(istalk)
            try {
            const istalk2 = await axios.get('https://api.vhtear.com/igprofile?query=' + istalk + '&apikey=' + vhtearkey)
            const { biography, follower, follow, post_count, full_name, username, picture, is_private } = istalk2.data.result
            const istalk3 = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Nama:* ${full_name}
➸ *Bio:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Postingan:* ${post_count}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, username, istalk3)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Igstalk Error : ' + err)
           }
          break
        case `${prefix}tiktokstalk`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return tobz.reply(self, 'Kirim perintah *@tiktokstalk @username*\nContoh *@tiktokstalk @duar_amjay*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const tstalk = await slicedArgs.join(' ')
            console.log(tstalk)
            try {
            const tstalk2 = await axios.get('https://api.vhtear.com/tiktokprofile?query=' + tstalk + '&apikey=' + vhtearkey)
            const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
            const tiktod = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Judul:* ${title}
➸ *Bio:* ${bio}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *Jumlah Like*: ${like_count}
➸ *Jumlah Postingan:* ${video_post}
➸ *Deskripsi:* ${description}
➸ *Link:* ${url_account}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, title, tiktod)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Tiktokstalk : '+ err)
           }
          break
        case `${prefix}smulestalk`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@smulestalk [@username]*\nContoh : *@smulestalk loli*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const sstalk = await slicedArgs.join(' ')
            console.log(sstalk)
            try {
            const sstalk2 = await axios.get('https://api.vhtear.com/smuleprofile?query=' + sstalk + '&apikey=' + vhtearkey)
            const { username, full_name, follower, follow, biography, is_vip, picture, recording } = sstalk2.data.result
            const smule = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Full Name:* ${title}
➸ *Biografi:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *VIP*: ${is_vip}
➸ *Total Rekaman:* ${recording}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, title, smule)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Smulestalk : '+ err)
            }
          break
        case `${prefix}`:
        //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
           // if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
           // if (!isSimi) return tobz.reply(self, 'command/Perintah Simi belum di aktifkan di group ini!', id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix} [teks]*\nContoh : *${prefix} halo*`)
            const que = body.slice(2)
            const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
            const sigot = sigo.data
            tobz.reply(self, sigot.success, id)
            console.log(sigot)
            break
        case `${prefix}ig`: 
        case `${prefix}instagram`:
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}ig [ Link Instagram ]* untuk contoh silahkan kirim perintah *.readme*`)
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return tobz.reply(self, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
            //await tobz.reply(self, mess.wait, id);
            instagram(args[1]).then(async(res) => {
                let username = res.owner_username;
                for (let i = 0; i < res.post.length; i++) {
                if (res.post[i].type == "image") {
                        await tobz.sendFileFromUrl(self, res.post[i].urlDownload, "ig.jpg", `*「 INSTAGRAM 」*\n\n➸ *Username* : ${username}\n➸ *Tipe* : Image/Jpg`, id);
                        limitAdd(serial)
                    } else if (res.post[i].type == "video") {
                        await tobz.sendFileFromUrl(self, res.post[i].urlDownload, "ig.mp4", `*「 INSTAGRAM 」*\n\n➸ *Username* : ${username}\n➸ *Tipe* : Video/MP4`);
                        limitAdd(serial)
                    }
                }
            }).catch((err) => {
                console.log(err);
                tobz.reply(self, `Maaf, Terjadi Kesalahan`, id)
            })
            break     
        case `${prefix}carifoto`: {
            if(isLimit(serial)) return
                        let goo = body.slice(13)
                        if (args.length == 0) return await tobz.reply(self, `Fromat: ${prefix}carifoto [teks]\ncontoh\n${prefix}carifoto mina twice`)
                            tobz.reply(self, '⏳ Tunggu yaa, sedang proses . . . ⏳', id)
                            const tik = await get.get(`https://api.i-tech.id/dl/googlei?key=YNIMXC-7dkfja-yPQSXS-y18C7T-GDjQwh&query=${goo}`).json()
                         const {code, status, result} = tik
                         if(code != "200") return tobz.reply(self, 'Mungkin servernya sedang disable gan', id)
                         const gambar = result.slice(0, 2)
                         gambar.forEach(function(g){
                             tobz.sendFileFromUrl(self, g, 'google.jpg', ``, id)
                            })
                        }
                        limitAdd(serial)
                        break            
        case `${prefix}ig2`: 
            if(isLimit(serial)) return
            if (args.length === 0) return tobz.reply(self, `Kirim perintah *${prefix}ig [link ig]*`)
            if (!args[0].match(isUrl) && !args[0].includes('instagram.com')) return tobz.reply(self, mess.error.Iv, id)
            try {
                tobz.reply(self, mess.wait, id)
                const resp = await get.get(`https://api.i-tech.id/dl/igdl?key=hNUmuV-esllbQ-thJVVh-EUiXhC-Pk9781&link=${args[0]}`).json()
                if (resp.result.includes('.mp4')) {
                    var ext = '.mp4'
                } else {
                    var ext = '.jpg'
                }
                await tobz.sendFileFromUrl(self, resp.result, `igeh${ext}`, 'Downloader instagram Sukses By BOT zeks', id)
            } catch {
                tobz.reply(self, mess.error.Ig, id)
                }
                limitAdd(serial)
            break              
        case `${prefix}starmaker`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.starmaker [linkStarmaker]* untuk contoh silahkan kirim perintah *.readme*')
            tobz.reply(self, mess.wait, id)
            starmaker(args[1]).then(async(res) => {
                let { image, desc, url, title } = await res
                let tstarmaker = `*「 STARMAKER DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ *Deskripsi:* ${desc}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                tobz.sendFileFromUrl(self, image, 'thumb.jpg', tstarmaker, id)
                await tobz.sendFileFromUrl(self, url, `${title}.mp3`, '', id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(self, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case `${prefix}maps`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@maps [optional]*, Contoh : *@maps Jakarta*')
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const mapz = await slicedArgs.join(' ')
            console.log(mapz)
            try {
            const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
            const { gambar } = mapz2.data
            const pictk = await bent("buffer")(gambar)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Maps : '+ err)
           }
          break
        case `${prefix}twitter`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}twitter [ Link Twitter ]* untuk contoh silahkan kirim perintah *.readme*`)
            tobz.reply(self, mess.wait, id)
            twitter(args[1]).then(async(res) => {
                let { desk, urlVideo } = await res
                let ttwitter = `*「 TWITTER DOWNLOADER 」*\n\n➸ *Aplikasi:* Twitter\n➸ *Deskripsi:* ${desk}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                await tobz.sendFileFromUrl(self, urlVideo, `twit.mp3`, ttwitter, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                tobz.reply(self, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case `${prefix}joox`:
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)

                
                await limitAdd(serial)
                if (args.length === 1) return tobz.reply(self, 'Kirim perintah *!joox [optional]*\nContoh : *!joox Alan Walker*', id)
                tobz.reply(self, mess.wait, id)
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const music = await slicedArgs.join(' ')
                console.log(music)
                try {
                const music2 = await axios.get('https://api.vhtear.com/music?query=' + music + '&apikey=' + vhtearkey)
                const { penyanyi, judul, album, linkImg, linkMp3, filesize, ext, duration } = music2.data.result[0]
                const musik = `*User Ditemukan!*
    
    ➸ *Penyanyi:* ${penyanyi}
    ➸ *Judul:* ${judul}
    ➸ *Album:* ${album}
    ➸ *Ext:* ${ext}
    ➸ *Size:* ${filesize}
    ➸ *Durasi:* ${duration}`
    
                const pictk = await bent("buffer")(linkImg)
                const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                tobz.sendImage(self, base64, judul, musik)
                tobz.sendPtt(self, linkMp3, `${judul}.mp3`, '', id)
                } catch (err) {
                 console.error(err.message)
                 await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                 tobz.sendText(ownerNumber, 'Error Joox : '+ err)
               }
              break
        case `${prefix}checkip`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *.checkip [ipaddress]*\nContoh : *.checkip 182.0.144.145*', id)
            tobz.reply(self, mess.wait, id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const cekip = await slicedArgs.join(' ')
            console.log(cekip)
            try {
            const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
            const { city, continent_name, country_name, ip, latitude, location, longitude, region_name } = cekip2.data
            const cekip3 = `*User Ditemukan!*

➸ *Kota:* ${city}
➸ *Benua:* ${continent_name}
➸ *Negara:* ${country_name}
➸ *Ip Address:* ${ip}
➸ *Garis Lintang:* ${latitude}
➸ *Kode Telepon:* +${location.calling_code}
➸ *Ibu Kota:* +${location.capital}
➸ *Bahasa:* +${location.languages[0].name}
➸ *Garis Bujur:* ${longitude}
➸ *Wilayah:* +${region_name}`

            const pictk = await bent("buffer")(location.country_flag)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, city, cekip3)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Error Check IP : '+ err)
           }
          break
        //case `${prefix}nhentai`:
        case `${prefix}nh`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                tobz.reply(self, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                            tobz.sendFileFromUrl(self, pic, 'hentod.jpg', teks, id).then(() => 
                            tobz.sendFile(self, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id)).catch(() => 
                            tobz.sendFile(self, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)
                            })
                    } catch (err) {
                        tobz.reply(self, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    tobz.reply(self, '[❗] Kode nuklir Salah!')
                }
            } else {
                tobz.reply(self, '[ WRONG ] Kirim perintah *@nhentai [kode]* untuk contoh kirim perintah *@readme*')
            }
            break
     /*   case `${prefix}brainly`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return tobz.reply(self, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                tobz.reply(self, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            tobz.reply(self, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            tobz.reply(self, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                tobz.reply(self, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break*/s
        case `${prefix}brainly`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
                //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return tobz.reply(self, `Kirim perintah ${fix}brainly [queru]\nContoh : ${predix}brainly keajaiban dunia`, id)
                    try {
                    const resp = await axios.get('https://api.vhtear.com/branly?query=' + body.slice(10) + '&apikey=' + vhtearkey)
                    if (resp.data.error) return tobz.reply(self, resp.data.error, id)
                    const anm2 = `➸ Jawaban : ${resp.data.result.data}`
                        tobz.reply(self, anm2, id)
                        } catch (err) {
                        console.error(err.message)
                        await tobz.reply(self, 'Pertanyaan atau Jawaban Tidak Ditemukan!')
                        tobz.sendText(ownerNumber, 'Brainly Error : ' + err)
                        await limitAdd(serial)
						}
                        break
		case `${prefix}math`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return tobz.reply(self, '[❗] Kirim perintah *@math [ Angka ]*\nContoh : @math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
            const mtk = body.slice(6)
            if (typeof Math_js.evaluate(mtk) !== "number") {
            tobz.reply(self, `"${mtk}", bukan angka!\n[❗] Kirim perintah *@math [ Angka ]*\nContoh : @math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
        } else {
            tobz.reply(self, `*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
        }
        break
        case `${prefix}wait`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                tobz.reply(self, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        tobz.reply(self, 'Maaf, saya tidak tau ini anime apa', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *Ecchi* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    tobz.sendFileFromUrl(self, video, 'nimek.mp4', teks, id).catch(() => {
                        tobz.reply(self, teks, id)
                    })
                })
                .catch(() => {
                    tobz.reply(self, 'Error !', id)
                })
            } else {
                tobz.sendFileFromUrl(self, tutor, 'Tutor.jpg', 'Neh contoh mhank!', id)
            }
            break
        case `${prefix}ttp1`:
        case `${prefix}t`:            
                //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial)                 
                try
                {
                    const string = body.toLowerCase().includes('#ttp') ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await tobz.sendImageAsSticker(self, gasMake.base64)
                                }catch(err) {
                                    await tobz.reply(self, 'Gagal membuat.', id)
                                } 
                            }else{
                                await tobz.reply(self, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await tobz.sendImageAsSticker(self, gasMake.base64)
                                }catch(err) {
                                    await tobz.reply(self, 'Gagal membuat.', id)
                                } 
                            }else{
                                await tobz.reply(self, gasMake.reason, id)
                            }
                        }
                       
                    }else{
                        await tobz.reply(self, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }
            break;            
        case `${prefix}textmaker`:
                //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial)
                arg = body.trim().split('|')
                //tobz.reply(self, '*Sedang di Proses...*', id)
                if ((isMedia || isQuotedImage) && arg.length >= 2) {
                const top = arg[1]
                const bott = arg[2]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bott)
                await tobz.sendFile(self, ImageBase64, 'image.png','neh...')
                } else {
                await tobz.reply(self, 'Wrong Format!', id)
                }
                break
        case `${prefix}quotemaker`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            arg = body.trim().split('|')
            if (arg.length >= 4) {
                tobz.reply(self, mess.wait, id)
                const quotes = arg[1]
                const author = arg[2]
                const theme = arg[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    tobz.sendFile(self, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       tobz.reply(self, mess.error.Qm, id)
                    })
                })
            } else {
                tobz.reply(self, 'Usage: \n@quotemaker |teks|watermark|theme\n\nEx :\n@quotemaker |ini contoh|bicit|random', id)
            }
            break
        case `${prefix}listchannel`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            tobz.reply(self, listChannel, id)
            break
        case `${prefix}jadwaltv`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *@jadwalTv [channel]*', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            tobz.reply(self, jadwal, id)
            break
        case `${prefix}jadwaltvnow`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const jadwalNow = await axios.get('https://api.haipbis.xyz/jadwaltvnow')
            tobz.reply(self, `Jam : ${jadwalNow.data.jam}\n\nJadwalTV : ${jadwalNow.data.jadwalTV}`, id)
            break
        case `${prefix}nulis`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
          //  if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}nulis [teks]*, contoh *${prefix}nulis aku bukan boneka*`, id)
            const ngettik = body.slice(7)
            tobz.sendFileFromUrl(self, `https://api.vhtear.com/write?text=${ngettik}&apikey=${vhtearkey}`)
            break
                case '${prefix}inu':
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            tobz.sendFileFromUrl(self, kya, 'Dog.jpeg', 'Inu')
            break
        case `${prefix}magernulis1`: // BY MFARELS
                if (args.length === 4) return await tobz.reply(self, 'Kirim Perintah *${prefix}magernulis1 --[Nama]--[Kelas]--[Teks]*\n\n*Contoh :*\n#magernulis1 --MFarelS--7B--Subscribe MFarelS CH', id) // https://github.com/MFarelS/RajinNulis-BOT
                arg = body.trim().split('--') // INSTALL IMAGEMAGICK KALO MAU WORK
                const diNama = arg[1] // WAKTU INSTALL, CENTANG KOLOM 1,2,3,5,6
                const diKelas = arg[2] // SUBSCRIBE MFARELS CH
                const diTulis = arg[3] // FOLLOW INSTAGRAM @mfarelsyahtiawan
                await tobz.reply(self, mess.magernulissatu, id) // NAMA, KELAS, WAKTU, BY ST4RZ
                const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama = diNama.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas = diKelas.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama = panjangNama.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas = panjangKelas.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktunye = (day + ' ' + months[month] + ' ' + year)
                const harinye = (thisDay)
                spawn('convert', [
                    './mager/magernulis/magernulis1.jpg',
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    harinye,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktunye,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas, 
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris,
                    './mager/magernulis√/magernulis1√.jpg'
                ])
                .on('error', () => tobz.reply(self, 'Error Bjeer, Keknya Scriptnya Lagi Error', id))
                .on('exit', () => {
                    tobz.sendImage(self, './mager/magernulis√/magernulis1√.jpg', 'FarelZahra.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© Powered By BOT✓*', id)
                })
            break // BY MFARELS         
        case `${prefix}zodiak`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)

            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}zodiak [zodiak kamu]*\nContoh : *${prefix}zodiak scorpio*`, id)
            try {
            const resp = await axios.get('https://api.vhtear.com/zodiak?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(self, resp.data.error, id)
            const anm2 = `➸ Zodiak : ${resp.data.result.zodiak}\n➸ Ramalan : ${resp.data.result.ramalan}\n➸ Nomor Keberuntungan : ${resp.data.result.nomorKeberuntungan}\n➸ Motivasi : ${resp.data.result.motivasi}\n➸ Inspirasi : ${resp.data.result.inspirasi}`
            tobz.reply(self, anm2, id)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                tobz.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break
        case `${prefix}caklontong`:
             //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
            const resp = await axios.get('https://api.vhtear.com/funkuis&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(self, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n➸ Deskripsi : ${resp.data.result.desk}\n➸ Poin : ${resp.data.result.poin}`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            tobz.reply(self, anm2, id)
            tobz.sendText(self, `30 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(self, `20 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(self, `10 Detik Lagi...`, id)
            await sleep(10000)
            tobz.reply(self, jwban, id)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                tobz.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break            
               /* case '${prefix}inu':
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            tobz.sendFileFromUrl(self, kya, 'Dog.jpeg', 'Inu')
            break*/
        case `${prefix}qrcode`:
           //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
        if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
           if(!args.lenght >= 2) return
           let qrcodes = body.slice(8)
           await tobz.sendFileFromUrl(self, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process sukses!')
           break
        case `${prefix}cecanvideo`:
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id) 
            ////if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            //if(!isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Member Premium',id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            tobz.reply(self, mess.wait, id)
            const ditai = fs.readFileSync('./lib/asupan.json')
            const ditaiJsin = JSON.parse(ditai)
            const rindIndixa = Math.floor(Math.random() * ditaiJsin.length)
            const rindKiya = ditaiJsin[rindIndixa]
            tobz.sendFileFromUrl(self, rindKiya, 'asupan.mp4', 'Nih', id)
            break             
        case `${prefix}cecan1`:
        ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
            let pep = pptl[Math.floor(Math.random() * pptl.length)]
            tobz.sendFileFromUrl(self, pep, 'pptl.jpg', 'Nih Kak....', message.id)
            break
        case `${prefix}cogan`: 
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)  
                 //var cek = pengirim.includes(sender.id);
            //if(!cek) return tobz.reply(self, `      ── *𝐍𝐀𝐅𝐈𝐙-𝐁𝐎𝐓* ──*\n\n*Silahkan Daftar Terlebih dahulu Untuk menggunakan BOT nya*!\n\n*𝐂𝐀𝐑𝐀 𝐃𝐀𝐅𝐓𝐀𝐑* :\n Ketik .daftar 628xxxxxxx \nGanti dengan nomer Whatsapp Kalian`, id) 
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial) 
            const lista = ["https://croedil.com/wp-content/uploads/2020/04/jmet-6.jpg","https://1.bp.blogspot.com/-VgD8M3SboB4/VjrXsjMuqVI/AAAAAAAAAEw/u3XH204M-v4/s1600/emo-alay.jpg,","https://cdn.idntimes.com/content-images/qna/2020/04/1127-0e907286abdd5b121c1ba478bf438740_600x400.jpg","https://pbs.twimg.com/media/EZurOJKUYAA9SOm.jpg","https://cdn-brilio-net.akamaized.net/news/2020/05/08/184074/1223821-8-penampakan-tokoh-upin-ipin-jadi-jamet.jpg","https://i1.sndcdn.com/avatars-000563943594-kprysk-t500x500.jpg","https://4.bp.blogspot.com/-tipqBt89hso/UEp1Kbk57BI/AAAAAAAAA3I/UkCWeaubvY8/s280/531597_204824659645932_284866801_n.jpg","https://i.pinimg.com/236x/f2/cd/f2/f2cdf277b050a4177a413cbb1a3670a2.jpg","https://3.bp.blogspot.com/-fX4LAMxwtTw/T0pK9AMCk_I/AAAAAAAAADY/Vjycs-5daNk/s1600/383980_317815444909102_100000419486231_1170665_1061758354_n.jpg","https://2.bp.blogspot.com/-6ClgolefeeM/U-uDyvQRA3I/AAAAAAAALmY/sx7_-93-qac/s1600/MANUSIA%2BPALING%2BJELEK%2BSEDUNIA.jpg","https://jajanksblog.files.wordpress.com/2012/02/hikmah2bjadi2borang2bjelek.jpg"]
            let ra = lista[Math.floor(Math.random() * lista.length)]
            tobz.sendFileFromUrl(self, ra, 'cwo.jpeg', 'nih cogan !')
            limitAdd(serial)
            break
        case `${prefix}randkata`:
        case `${prefix}randomkata`:
        //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            // var cek = pengirim.includes(sender.id);
            //if(!cek) return tobz.reply(self, `      ── *𝐍𝐀𝐅𝐈𝐙-𝐁𝐎𝐓* ──*\n\n*Silahkan Daftar Terlebih dahulu Untuk menggunakan BOT nya*!\n\n*𝐂𝐀𝐑𝐀 𝐃𝐀𝐅𝐓𝐀𝐑* :\n Ketik .daftar 628xxxxxxx \nGanti dengan nomer Whatsapp Kalian`, id) 
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial) 
            const kata = ["BISA KAN NGEHARGAIN SEDIKIT ? KAYANYA DIMATA LO GUE ITU GAMPANG YA :( MENTANG MENTANG GUE TAKUT SAMA LO !","Bertubi kau rusak hati ini. Namun selalu diperbaharui oleh cinta yang tulus ini","Jangankan kamu bohongi, kamu hianatipun aku akan tetep cinta sama kamu","sudah tak usah aku berbanyak kata, tugasku hanya mencintai kamu dengan tulus dan membahagiakan kamu :D","mencari sebab serta mencari alasan supaya  tercapai hasratku","pengen nikah sama mina","jual kebab","kentang","wkwkkwkwk","hai hp gue iphone","xp lu xiaomi ya","jual odading","janda ya?","pengangguran ya?","ciee samaan","random banget","udah si kelar","nyerah terus skuy","mabar","anjay mabar","gua si owh aja","okedeh","hai cantik","ada yang baru","kewarned","nyolong sandal","bukannya sholat malah nyolong sandal","lucu banget","sampai gua ketawa","anjir lucu banget bro sampai gua ketawa terus kentut keluar tainya dikit","dahlah","ini banyak amat","sudah ibu bilang jangan absen di wa absen di kuber skul","iri bilang bossssss","lucu","segini aja udah cukup","udah puas lo","belum ya","donasi dong wkwkwk","canda ya kak","bengek","habis sudah hidup ini"]
            let ran2 = kata[Math.floor(Math.random() * kata.length)]
            tobz.reply(self, ran2, 'random !')
            break
        /*case `${prefix}katasen`:
        case `${prefix}katasenja`:
        //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            // var cek = pengirim.includes(sender.id);
            //if(!cek) return tobz.reply(self, `      ── *𝐍𝐀𝐅𝐈𝐙-𝐁𝐎𝐓* ──*\n\n*Silahkan Daftar Terlebih dahulu Untuk menggunakan BOT nya*!\n\n*𝐂𝐀𝐑𝐀 𝐃𝐀𝐅𝐓𝐀𝐑* :\n Ketik .daftar 628xxxxxxx \nGanti dengan nomer Whatsapp Kalian`, id) 
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial) 
            const kastun = ["Hampa itu seperti langkah tak berjejak, senja tapi tak jingga, cinta tapi tak dianggap","Tangannya menjadi pengganti tanganku untuk menuntunmu' Pundaknya menjadi pengganti pundakku untukmu bersandar. Biarlah gemercik gerimis, carik senja, secangkir teh, dan bait lagu menjadi penggantimu.","Kenapa aku suka senja? Karena negeri ini kebanyakan pagi, kekurangan senja, kebanyakan gairah, kurang perenungan.","Senja tak pernah salah hanya kenangan yang membuatnya basah.","Di bawah alismu hujan berteduh. Di merah matamu senja berlabuh.","Aku ingin kamu saja yang menemaniku membuka pagi hingga melepas senja, menenangkan malam dan membagi cerita.","Senja terlalu buru-buru berlalu, padahal aku baru hendak mewarnai langit untukmu dengan warna-warna rinduku yang selalu biru.","Melukiskanmu saat senja. Memanggil namamu ke ujung dunia. Tiada yang lebih pilu. Tiada yang menjawabku. Selain hatiku dan ombak berderu.","Ada yang tak tenggelam ketika senja datang: Rasa.","Senja yang retak. Kapal-kapal berlayar membawa kenangan. Airmatamu menjelma puisi paling duri, paling angin.","Tuhan, bersama tenggelamnya matahari senja ini,redakanlah kekecewaan dan kemarahan di hati ini. Sabarkanlah aku. Aamiin.","Beberapa penyair sibuk bersembunyi di balik senja, hujan, gemintang, ufuk, gunung, pantai, jingga, lembayung, kopi, renjana, juga berbagai kata romantis lainnya, untuk kemudian lupa pada fakta bahwa dunia sedang tidak baik-baik saja. Hingga akhirnya kata-kata hanyalah hiasan semata.","Maka siluetkan tubuhmu berlatar senja, karena tak sanggup kulihat airmatamu, kekasih.","Semerbak rindu kuasai udara panas ini, senja pun ikut berdebar menanti berita mu tentang perang dan cinta.","Aku hanyalah kunang-kunang dan engkau hanyalah senja. Saat gelap kita berbagi. Saat gelap kita abadi.","Disetiap senja, aku ingin melukis langit dengan warna mata kita: warna merah kerinduan.","Jika pena berganti rupa menjadi daun senja, biarlah dia mengering, lalu tersapu angin, sendiri dan dibiarkan oleh sepi.","Kupetik pipinya yang ranum,kuminum dukanya yang belum: Kekasihku, senja dan sendu telah diawetkan dalam kristal matamu.","Terkadang senja mengingatkan pada rumah, pada orang-orang yang membuat hati kita rindu untuk pulang.","Jika kamu merindukan seseorang, tataplah matahari sore. Kirimkan pesan rindumu untuknya lewat senja.","Uang, berilah aku rumah yang murah saja,yang cukup nyaman buat berteduh senja-senjaku, yang jendelanya hijau menganga seperti jendela mataku.","Kita hanyalah setitik senja yang kadang indah lalu surut dengan bermuram durja, dunia bagi masa kecil kita hanyalah mainan fana yang terus membumbung, mengitari angkasa dan membuat kita terlena akan keindahannya…","Dulu, pada suatu ketika, senja pernah indah, seindah janji-janji yang berujung menjadi sumpah serapah.","Aku melintasi kehidupan dan kala. Aku berlayar menembus senja. Kuberanikan diri menulis untuk mengabadikan momen hidup dalam lembaran kertas.","Di tengah angin senja yang mendesak, aku merasakan kekuasaan waktu, yang tanpa pandang bulu mengubah segala-galanya.","Gelisah, menampar tak basah pada senja yang bergeromis. Begitu keringkah ladang pertautan kita hingga tunas harapan enggan tumbuh lagi.","Setiap hari ada senja, tapi tidak setiap senja adalah senja keemasan, dan setiap senja keemasan itu tidaklah selalu sama.","Biarlah kunikmati kepedihan ini. Karena sesungguhnya perasaan perih disebabkan cinta yang terkulai sebelum berbunga, adalah sama sendunya dengan memeram cina itu sendiri selama bertahun-tahun. Bagai senja yang tak kunjung malam.","Begini rasanya harihari di linimasa. Wajahmu; 140 huruf yang terus menguntitku tanpa jarak hingga senja lesap dalam kita.","Percintaan itu fajar perkawinan. Perkawinan itu senja percintaan.","Usia senja bukanlah hal yang membuat sedih. Itu bisa jadi hal yang disyukuri jika kita menyelesaikan semua perkejaan kita.","Hidup seperti ini. Aku bisa merasakan senja yang bercampur bau tanah basah sepeninggal hujan."]
            let katsen = kastun[Math.floor(Math.random() * kastun.length)]
            tobz.reply(self, katsen, 'senja')
            break*/
        case `${prefix}estetik`:
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            // var cek = pengirim.includes(sender.id);
            //if(!cek) return tobz.reply(self, `      ── *RII-𝐁𝐎𝐓* ──*\n\n*Silahkan Daftar Terlebih dahulu Untuk menggunakan BOT nya*!\n\n*𝐂𝐀𝐑𝐀 𝐃𝐀𝐅𝐓𝐀𝐑* :\n Ketik .daftar 628xxxxxxx \nGanti dengan nomer Whatsapp Kalian`, id) 
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial) 
           const aestetic = ["http://wa-botstiker.my.id/images/aesthetic/aachal-6geVJeZJMg8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/abyan-athif-BCx6t5pJwVw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-UUJzCuHUfYI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-kx1r9Fgqe7s-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/alexander-popov-lXaOSpd_UQw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anders-jilden-AkUR27wtaxs-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/andrea-boschini-5Ipk8IgNpPg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/anmol-gupta-6Zpojuvyr-E-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/austin-chan-ukzHlkoz1IE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/bantersnaps-1sUs8JbGx74-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/beasty--HxIhfS_dUk-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/daniel-tseng-W9kq9suABY4-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/estee-janssens-MUf7Ly04sOI-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/fabian-moller-gI7zgb80QWY-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/florian-klauer-mk7D-4UCfmg-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/ian-dooley-aaAllJ6bmac-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/karthikeya-gs-ZMM2sVJKd3A-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/kevin-laminto-hSeh-3ID830-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/larm-rmah-CB8tGaFoW38-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/matthew-ronder-seid-GWzCpqXPNDw-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/orfeas-green-G5A5ZNjS2tE-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/pari-karra-elK1z1WcsR8-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-qEWEz-U5p8Q-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/sean-foley-z4gWzj0p93c-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/tamara-gore-ldZrvy2SOEA-unsplash.jpg","http://wa-botstiker.my.id/images/aesthetic/vanessa-serpas-S4fYv5LQ4_A-unsplash.jpg"]
           let aes = aestetic[Math.floor(Math.random() * aestetic.length)]
           tobz.sendFileFromUrl(self, aes, 'aestetic.jpg', 'aesthetic')
           break
        case `${prefix}cecan2`:
        ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            // var cek = pengirim.includes(sender.id);
           // if(!cek) return tobz.reply(self, `      ── *𝐍𝐀𝐅𝐈𝐙-𝐁𝐎𝐓* ──*\n\n*Silahkan Daftar Terlebih dahulu Untuk menggunakan BOT nya*!\n\n*𝐂𝐀𝐑𝐀 𝐃𝐀𝐅𝐓𝐀𝐑* :\n Ketik .daftar 628xxxxxxx \nGanti dengan nomer Whatsapp Kalian`, id) 
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial) 
            const itemslh = ["https://i.pinimg.com/originals/69/d7/b3/69d7b3d5a089e7cbee0250ea5da9b14b.jpg","https://i.pinimg.com/originals/78/fa/10/78fa10ab94c0dc9e19a18358a9752070.jpg","https://i.pinimg.com/originals/93/e0/a3/93e0a3816183696ff89b1ad7db2fd3c0.jpg","https://i.pinimg.com/originals/a6/34/cf/a634cfa655269069439e9476780b46fe.jpg","https://i.pinimg.com/originals/dc/f5/69/dcf569a7b08efcae64d0747b51d04a7d.jpg","https://i.pinimg.com/originals/4f/96/2b/4f962b89bd7ceb438b3e9ebbd075184c.jpg","https://i.pinimg.com/originals/c2/fb/e7/c2fbe7a6955a85c51b9ee8062a7b68d3.jpg","https://i.pinimg.com/originals/44/54/24/44542415cf206f2c041e3bbb52a69419.jpg","https://i.pinimg.com/originals/ae/3c/40/ae3c40e0a2f653811b5a67ccd6b9d8cc.jpg","https://i.pinimg.com/originals/bd/fa/33/bdfa3317d96e6cdafaf27e3b337d05b4.jpg","https://i.pinimg.com/originals/75/6a/f2/756af236ae909431567ed184c43aae6f.png","https://i.pinimg.com/originals/a5/95/d7/a595d7fe6b8dc00d1aaa7287f1dd304e.jpg","https://i.pinimg.com/originals/40/37/78/40377871ee06a4a434c39e90b1f647e1.jpg","https://i.pinimg.com/originals/45/73/ac/4573ac9484c480500872b7c91f758040.jpg","https://i.pinimg.com/originals/32/7d/0b/327d0be89cc60321128d0f0bdaadfc15.jpg","https://i.pinimg.com/originals/f4/a1/0f/f4a10ffd44aea604383be84a34f69f90.jpg","https://i.pinimg.com/originals/ec/7f/b5/ec7fb5506136f72876633aab957a755a.jpg","https://i.pinimg.com/originals/4c/e9/15/4ce915c8245586f541c4d0a8b71cc500.jpg","https://i.pinimg.com/originals/03/2a/14/032a145e96154753e33bdda30d9f41f1.jpg","https://i.pinimg.com/originals/f4/5b/07/f45b070de82acec89092eaea1b415029.jpg","https://i.pinimg.com/originals/a9/f2/da/a9f2da1277fb7bc801856c3b9c12d37d.jpg","https://i.pinimg.com/originals/af/ab/93/afab93ebbf109a601dcb77b5baa494b4.jpg","https://i.pinimg.com/originals/b9/38/df/b938dfba6c139ad45ce51203a43eac0d.jpg","https://i.pinimg.com/originals/af/10/0a/af100a49cb8f53f0dd5b48664ede9db8.jpg","https://i.pinimg.com/originals/99/18/6c/99186c2145e1223f885103f51817be78.jpg","https://i.pinimg.com/originals/3c/fd/c9/3cfdc9ba7cf79ed061808e162162f4da.jpg","https://i.pinimg.com/originals/31/95/64/319564a33b5ed46a52d30c18d2310f22.jpg","https://i.pinimg.com/originals/1c/2d/9f/1c2d9ffdd104200355bab43c9d3fad20.gif","https://i.pinimg.com/originals/4a/aa/12/4aaa12940f51fdfb1684964df3796c4c.jpg","https://i.pinimg.com/originals/37/90/bc/3790bc29be16d95174af4eff4ee3859f.jpg","https://i.pinimg.com/originals/4c/12/8f/4c128fda6e71a9f4c670a78a21d8c196.jpg","https://i.pinimg.com/originals/34/92/10/3492100b4a924458a2bf5340d68293c2.jpg","https://i.pinimg.com/originals/5a/dd/12/5add12091eafba364ec76c91d20e75ac.jpg","https://i.pinimg.com/originals/da/c3/59/dac359d1fc87193c2b9d85bb96fedcbc.jpg","https://i.pinimg.com/originals/2e/d6/a9/2ed6a9670d942220eab92b99bb0d1c09.jpg","https://i.pinimg.com/originals/f1/89/e3/f189e3d9b353f91b60060cc64e6706c9.jpg","https://i.pinimg.com/originals/8c/06/c2/8c06c22283cf98abdb8922e2f3aa0a6a.jpg","https://i.pinimg.com/originals/8b/6f/0b/8b6f0b1e213240eaad90894292a2d3c1.jpg","https://i.pinimg.com/originals/89/bf/b8/89bfb86392d39477adcd66444cf19845.jpg","https://i.pinimg.com/originals/35/e2/cc/35e2cc3c535d8f1cfeaf13cce69ac984.jpg","https://i.pinimg.com/originals/c0/01/a1/c001a16e2629872a3d7ea7fdbe5a4e98.jpg","https://i.pinimg.com/originals/b4/eb/48/b4eb486def2d413716c5fa033af9fb34.jpg","https://i.pinimg.com/originals/55/ee/7b/55ee7b5f4889cc34ec1a01d2e7875b53.jpg","https://i.pinimg.com/originals/0c/b3/0e/0cb30ea660aafbae32cc07433bf3eea2.jpg","https://i.pinimg.com/originals/1f/50/23/1f5023991f2a01cff748e84c4cf3612d.jpg","https://i.pinimg.com/originals/ab/53/07/ab5307df9234934f385eb6235aa6c2cd.jpg","https://i.pinimg.com/originals/e1/a1/7c/e1a17c5f359846741c687ef1fcadb316.jpg","https://i.pinimg.com/originals/16/1b/21/161b215ee2f8e0a040c91f18c054d705.jpg","https://i.pinimg.com/originals/da/07/1a/da071a5fafbc6487d38edd4e9f3401db.jpg","https://i.pinimg.com/originals/54/f4/26/54f42615f9ad45743e6fb08ed86623f0.jpg"]
            let cewelh = itemslh[Math.floor(Math.random() *itemslh.length)]
            tobz.sendFileFromUrl(self, cewelh, 'ptlsh.jpeg', 'Nih Kak....', id)
            break            
        case `${prefix}neko`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            tobz.sendFileFromUrl(self, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case `${prefix}pokemon`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            q7 = Math.floor(Math.random() * 890) + 1;
            tobz.sendFileFromUrl(self, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            break
        case `${prefix}quote`:
        case `${prefix}quotes`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes')
            tobz.reply(self, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
            break
        case `${prefix}quote2`:
        case `${prefix}quotes2`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const quote2 = await axios.get(`https://api.vhtear.com/quoteid&apikey=${vhtearkey}`)
            tobz.reply(self, `➸ *Quotes* : ${quote2.data.quotes}\n➸ *Author* : ${quote2.data.author}`, id)
            break            
        case `${prefix}lirik`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length == 1) return tobz.reply(self, 'Kirim perintah *@lirik [optional]*, contoh *@lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            tobz.reply(self, lirik, id)
            break
        case `${prefix}chord`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}chord [query]*, contoh *${prefix}chord aku bukan boneka*`, id)
            const query__ = body.slice(7)
            const chord = await axios.get('https://tobz-api.herokuapp.com/api/chord?q='+ query__)
            if (chord.data.error) return tobz.reply(self, chord.data.error, id)
            tobz.reply(self, chord.data.result, id)
            break
        case `${prefix}listdaerah`:
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const listDaerah = await axios.get('https://tobz-api.herokuapp.com/api/daerah')
            tobz.reply(self, listDaerah.data.result, id)
            break
        // ADMIN & OWNER
        case `${prefix}bc`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii!', id)
            if (quotedMsg && quotedMsg.type == 'image') {
            const mediaData = await decryptMedia(quotedMsg, uaOverride)
            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            let msg = body.slice(4)
            const chatz = await tobz.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await tobz.getChatById(ids)
                if (!cvk.isReadOnly) 
                await tobz.sendFile(ids, `${imageBase64}`,'bc.jpg', `[ *Rii BroadCast* ]\n\n${msg}`)
            }
            } else {
            let msg = body.slice(4)
            const chatz = await tobz.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await tobz.getChatById(ids)
                if (!cvk.isReadOnly) 
                await tobz.sendText(ids, `[ *Rii BroadCast* ]\n\n${msg}`)
            }
        }
            tobz.reply(self, 'Broadcast Success!', id)
            break
        case `${prefix}adminlist`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await tobz.sendTextWithMentions(self, mimin)
            break
        case `${prefix}ownergroup`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await tobz.sendTextWithMentions(self, `Owner Group : @${Owner_}`)
            break
        case `${prefix}otagall`: // FOR OWNER & ADMIN Rii
        case `${prefix}omentionall`:
		case `${prefix}p`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner, !isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)
            const groupMek = await tobz.getGroupMembers(groupId)
            let heho = '╭───────────────────\n'
            for (let i = 0; i < groupMek.length; i++) {
                heho += '├❏'
                heho += ` @${groupMek[i].id.replace(/@c.us/g, '')}\n`
            }
            heho += '╰───────────────────'
            await sleep(2000)
            await tobz.sendTextWithMentions(self, heho)
            break
        case `${prefix}tagall`: // FOR GROUP ADMINS
        case `${prefix}mentionall`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await tobz.getGroupMembers(groupId)
            let hehe = '╭───────────────────\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '├❏'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╰───────────────────'
            await sleep(2000)
            await tobz.sendTextWithMentions(self, hehe)
            break                                                                          
        case `${prefix}skickall`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await tobz.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (ownerNumber.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await tobz.removeParticipant(groupId, allMem[i].id)
                }
            }
            tobz.reply(self, 'Success kick all member', id)
            break
        case `${prefix}okickall`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Admin Rii', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMeq = await tobz.getGroupMembers(groupId)
            for (let i = 0; i < allMeq.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMeq[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await tobz.removeParticipant(groupId, allMeq[i].id)
                }
            }
            tobz.reply(self, 'Succes kick all member', id)
            break
        case `${prefix}kickall`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMek = await tobz.getGroupMembers(groupId)
            for (let i = 0; i < allMek.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMek[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await tobz.removeParticipant(groupId, allMek[i].id)
                }
            }
            tobz.reply(self, 'Success kick all member', id)
            break
        case `${prefix}leaveall`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)
            const allChats = await tobz.getAllChatIds()
            const allGroups = await tobz.getAllGroups()
            for (let gclist of allGroups) {
                await tobz.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await tobz.leaveGroup(gclist.contact.id)
            }
            tobz.reply(self, 'Succes leave all group!', id)
            break
        case `${prefix}clearall`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)
            const allChatz = await tobz.getAllChats()
            for (let dchat of allChatz) {
                await tobz.deleteChat(dchat.id)
            }
            tobz.reply(self, 'Succes clear all chat!', id)
            break
        case `${prefix}oadd`:
            const orang = args[1]
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return tobz.reply(self, 'Untuk menggunakan fitur ini, kirim perintah *@add* 628xxxxx', id)
            if (!isOwner, !isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Admin Rii', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await tobz.addParticipant(self,`${orang}@c.us`)
            } catch {
                tobz.reply(self, mess.error.Ad, id)
            }
            break
        case `${prefix}add`:
            const orgh = body.slice(5)
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return tobz.reply(self, 'Untuk menggunakan fitur ini, kirim perintah *@add* 628xxxxx', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await tobz.addParticipant(self,`${orgh}@c.us`)
            } catch {
                tobz.reply(self, mess.error.Ad, id)
            }
            break
        case `${prefix}okick`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(self, 'Untuk menggunakan Perintah ini, kirim perintah *@okick* @tagmember', id)
            await tobz.sendText(self, `Perintah Owner diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, ownerNumber).includes(mentionedJidList[i])) return tobz.reply(self, mess.error.Sp, id)
                await tobz.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case `${prefix}kick`:
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(self, 'Untuk menggunakan Perintah ini, kirim perintah *@kick* @tagmember', id)
            //await tobz.sendText(self, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, groupAdmins).includes(mentionedJidList[i])) return tobz.reply(self, mess.error.Sp, id)
                await tobz.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case `${prefix}pkick`:
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(self, 'Untuk menggunakan Perintah ini, kirim perintah *@kick* @tagmember', id)
            //await tobz.sendText(self, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, groupAdmins).includes(mentionedJidList[i])) return tobz.reply(self, mess.error.Sp, id)
                await tobz.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case `${prefix}oleave`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Admin Rii', id)
            await tobz.sendText(self,'Rii DIPERINTAHKAN KELUAR OLEH OWNER!!').then(() => tobz.leaveGroup(groupId))
            break
        case `${prefix}keluar`:
        case `${prefix}out`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin Rii', id)
            await tobz.sendText(self,'By Sayang:D').then(() => tobz.leaveGroup(groupId))
            break
        case `${prefix}opromote`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Admin Rii', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(self, 'Untuk menggunakan fitur ini, kirim perintah *@promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return tobz.reply(self, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return tobz.reply(self, 'Maaf, user tersebut sudah menjadi admin.', id)
            await tobz.promoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(self, `Perintah Owner diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case `${prefix}promote`:
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(self, 'Untuk menggunakan fitur ini, kirim perintah *@promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return tobz.reply(self, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return tobz.reply(self, 'Maaf, user tersebut sudah menjadi admin.', id)
            await tobz.promoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(self, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case `${prefix}odemote`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Admin Rii', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(self, 'Untuk menggunakan fitur ini, kirim perintah *@demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return tobz.reply(self, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return tobz.reply(self, 'Maaf, user tersebut tidak menjadi admin.', id)
            await tobz.demoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(self, `Perintah Owner diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case `${prefix}demote`:
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return tobz.reply(self, 'Untuk menggunakan fitur ini, kirim perintah *@demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return tobz.reply(self, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return tobz.reply(self, 'Maaf, user tersebut tidak menjadi admin.', id)
            await tobz.demoteParticipant(groupId, mentionedJidList[0])
            await tobz.sendTextWithMentions(self, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case `${prefix}join`:
            if (args.length === 1) return tobz.reply(self, 'Hanya Owner yang bisa memasukan Bot ke dalam Grup!', id)
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)
            const link = body.slice(6)
            const tGr = await tobz.getAllGroups()
            const minMem = 5
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await tobz.inviteInfo(link)
            if (!isLink) return tobz.reply(self, 'Ini link? 👊🤬', id)
            if (tGr.length > 256) return tobz.reply(self, 'Maaf jumlah group sudah Minimal!', id)
            if (check.size < minMem) return tobz.reply(self, 'Member group tidak melebihi 5, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await tobz.joinGroupViaLink(link).then(() => tobz.reply(self, 'Bot akan segera masuk!'))
            } else {
                tobz.reply(self, 'Link group tidak valid!', id)
            }
            break
        case `${prefix}odelete`:
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner && !isAdmin) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)
            if (!quotedMsg) return tobz.reply(self, 'Salah!!, kirim perintah *@delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return tobz.reply(self, 'Salah!!, Bot tidak bisa menghapus chat user lain!', id)
            tobz.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case `${prefix}delete`:
            if (!isGroupMsg) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam group', id)
            //if (!isGroupAdmins) return tobz.reply(self, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return tobz.reply(self, 'Salah!!, kirim perintah *@delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return tobz.reply(self, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            tobz.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case `${prefix}getss`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya untuk Owner Rii', id)            
            const sesPic = await tobz.getSnapshot()
            tobz.sendFile(self, sesPic, 'session.png', 'Nih SAYANG!', id)
            break
        case `${prefix}Riiadmin`:
            let admn = `This is list of Rii Admin\nTotal : ${adminNumber.length}\n`
            for (let i of adminNumber) {
                admn += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(self, admn, id)
            break
        /*case `${prefix}limit`:
			if (!isAdmin) return tobz.reply(self, 'Jika ingin cek limit bilang ke Admin atau Owner Rii ya Kak...', id)
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
                for (let lmt of limidat) {
                    if (lmt.id === mentionedJidList[0]) {
                        let limitCounts = limitCount - lmt.limit
                        if (limitCounts <= 0) return tobz.sendTextWithMentions(self, `Limit request @${mentionedJidList[0].replace('@c.us', '')} sudah habis\n\n_Note : Limit akan direset setiap jam 09:00!_`, id)
                        tobz.sendTextWithMentions(self, `Sisa limit request @${mentionedJidList[0].replace('@c.us', '')} tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 09:00!_`, id)
                        found = true
                    }
                }
                if (found === false) {
                    let obj = {
                        id: `${mentionedJidList[0]}`,
                        limit: 1
                    };
                    limit.push(obj);
                    fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit, 1));
                    tobz.sendTextWithMentions(self, `Sisa limit request @${mentionedJidList[0].replace('@c.us', '')} tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 09:00!_`, id)
				}
		            break*/
         case `${prefix}limit`:
         case `${prefix}ceklimit`: 
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return  
            var premma = isVipUser
            var found = false
            if(isVipUser) return tobz.reply(self,`
╭─────────────────── 
├─❍ *Name* : *${pushname}
├─❍ *User* : *${premma ? 'VIP' : 'Free'}*
├─❍ *Tanggal* : *${moment().format('DD/MM/YY')}*
├─❍ *Jam* : *${moment().format('HH:mm:ss')}*
├─❍ *Limit* : *999999999*
╰───────────────────`,id)        
            const limidat = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return tobz.reply(self, `
────────────────────
Hi *${pushname}!*
*Kuota Limit Kamu Sudah Habis!*
Ketik ${prefix}ceklimit Untuk Mengecek Kuota Limit Kamu
────────────────────`, id)
                    tobz.reply(self, `
╭─────────────────── 
├─❍ *Name* : *${pushname}
├─❍ *User* : *${premma ? 'VIP' : 'Free'}*
├─❍ *Tanggal* : *${moment().format('DD/MM/YY')}*
├─❍ *Jam* : *${moment().format('HH:mm:ss')}*
├─❍ *Limit* : *${limitCounts}*
╰───────────────────`, id)
                    found = true
                }
            }
            console.log(limit)
            console.log(limidat)
            if (found === false){
                let obj = {id: `${serial}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit, 1));
                tobz.reply(self, `
╭─────────────────── 
├─❍ *Name* : *${pushname}
├─❍ *User* : *${premma ? 'VIP' : 'Free'}*
├─❍ *Tanggal* : *${moment().format('DD/MM/YY')}*
├─❍ *Jam* : *${moment().format('HH:mm:ss')}*
├─❍ *Limit* : *${limitCounts}*
╰───────────────────`, id)
            }
            break                    
		case `${prefix}addlimit`:
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
			if (!isAdmin) return tobz.reply(self, 'Maaf kak, hanya untuk Admin tobz.', id)
			var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == mentionedJidList[0]){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit -= args[1];
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
						tobz.sendTextWithMentions(self, `menambahkan ${args[1]} limit ke @${mentionedJidList[0].replace('@c.us', '')}` )
                    break
                    case 'fitnah':	
                    case 'fake':          
                    arg = body.substring(body.indexOf(' ') + 1)
                    isi = arg.split(' |')[0] 
                    pesan = arg.split('|')[1] 
                    pesan2 = arg.split('|')[2] 
                    custom(pesan, isi, pesan2)
                    break
                case `${prefix}addlimit`:
                case `${prefix}giftlimit`:
                case `${prefix}gift`:
                    //if (!isGroupMsg) return tobz.reply(self, 'Gift hanya dapat dipakai didalam grup ya dik!', id); 
                    //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
                     if (!isAdmin) return tobz.reply(self, 'Maaf kak, hanya untuk Vip Rii.', id) 
                    const number = args[0]
                    if(!number) return tobz.reply(self, 'Masukkan nomor yang akan di gift, .gift [NOMOR] [Jumlah]\n=> Contoh : .gift 6281234567890 15', id)
                    let teks1 = number.replace(/[@c.us]/g,'')
                    const cus2 = teks1 + '@c.us'
                    const jml = args[1]
                    if(!jml) return tobz.reply(self, 'Masukkan Jumlah gift quota, .gift [NOMOR] [Jumlah]\n=> Contoh : .gift 6281234567890 15', id)
                    if(!jml > 20) return await tobz.reply(self, 'Gift terlalu banyak, max 20 yaa :)', id)
                        var found = false
                        Object.keys(limit).forEach((i) => {
                            if(limit[i].id == cus2){
                                found = i
                            }
                        })
                        if (found !== false) {
                            limit[found].limit = Math.max(0, limit[found].limit);
                            if(limit[found].limit <= 20) return tobz.reply(self, 'Quota bot pada nomor tersebut masih penuh\nUntuk gift pastikan quota target sudah habis', id)
                            if(limit[found].limit <= 0) {
                                return tobz.reply(self, 'Quota bot pada nomor tersebut sudah penuh :)', id)
                            }else{
                            limit[found].limit -= jml
                            const updated = limit[found]
                            const result = `Gift quota bot sukses dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
[User]: @${mentionedJidList[0].replace('@c.us', '')}
[Limit]: ${limitCounts}
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
Terima kasih. Gunakan dengan sebaik mungkin :)`
                            console.log(limit[found])
                            fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                            tobz.sendTextWithMentions(self, result)
                            }
                        } else {
                                tobz.reply(self, `${monospace(`Nomer Tidak terdaftar!`)}`, id)
                        }

                break                   
                case `${prefix}mtcstart`:
                    if (mtcState === true) return
                    if (!isOwner) return
                    setting.mtc = true
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    tobz.reply(self, 'Maintenance sudah di Umumkan!', id)
                    break
                case `${prefix}mtcstop`:
                    if (mtcState === false) return
                    if (!isOwner) return
                    setting.mtc = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    tobz.reply(self, 'Maintenance sudah di Umumkan!', id)
                    break     
                   // kondisi ketik seseorang menembak api
             case `b` :
                   if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                   await limitAdd(serial)
                const Api = "85349607186@c.us"
                await tobz.sendTextWithMention(self, `${Api} Kamu Sama Seperti Dia + ${sender.id}.replace@c.us`, id)  
             break              
        case `${prefix}restart`: // WORK IF YOU RUN USING PM2
            if(isOwner){
                tobz.sendText(self, '*Bot Sedang Di Restart*\n\n_*Mohon Tunggu 20 Detik!*_')
                setting.restartState = true
                setting.restartId = chatId
                var obj = []
                //fs.writeFileSync('./lib/database/setting.json', JSON.stringify(obj, null,2));
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
                const spawn = require('child_process').exec;
                function os_func() {
                    this.execCommand = function (command) {
                        return new Promise((resolve, reject)=> {
                        spawn(command, (error, stdout, stderr) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(stdout)
                        });
                    })
                }}
                var oz = new os_func();
                oz.execCommand('pm2 restart index').then(res=> {
                }).catch(err=> {
                    console.log("os >>>", err);
                })
            }
            break
		case `${prefix}addbadword`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
			if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin group', id)
			if (args.length == 1) return tobz.reply(self, `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`,id)
                const bw = body.slice(12)
				bad.push(bw)
			fs.writeFileSync('./lib/database/bad.json', JSON.stringify(bad))
                tobz.reply(self, 'Success Menambahkan Bad Word!', id)
				break
		case `${prefix}delbadword`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
			if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin group', id)
			if (args.length == 1) return tobz.reply(self, `Kirim perintah ${prefix}delbadword [kata kasar]. contoh ${prefix}delbadword bego`,id)
				let dbw = body.slice(12)
				bad.splice(dbw)
				fs.writeFileSync('./lib/database/bad.json', JSON.stringify(bad))
				tobz.reply(self, 'Success Menghapus BAD WORD!', id)
			break
        case `${prefix}say`:
            ////if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)

            await limitAdd(serial)
            const doto = fs.readFileSync('./lib/say.json')
            const dotoJson = JSON.parse(doto)
            const rondIndox = Math.floor(Math.random() * dotoJson.length)
            const rondKoy = dotoJson[rondIndox]
            tobz.reply(self, rondKoy, id)
            break
        case `${prefix}addsay`:
            ////if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            if (args.length == 1) return tobz.reply(self, `Kirim perintah *!addsay [teks]*, contoh *${prefix}addsay anjay*`, id)
            const says = body.slice(8)
            say.push(says)
            fs.writeFileSync('./lib/say.json', JSON.stringify(say))
            tobz.reply(self, `Add ${says} sukses!`, id)
            break
        case `${prefix}delsay`:
            ////if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            if (args.length == 1) return tobz.reply(self, `Kirim perintah *!addsay [teks]*, contoh *${prefix}addsay anjay*`, id)
            const sayso = body.slice(8)
            let delsayso = say.indexOf(sayso)
            say.splice(delsayso, 1)
            fs.writeFileSync('./lib/say.json', JSON.stringify(say))
            tobz.reply(self, `Delete ${sayso} sukses!`, id)
            break
        case `${prefix}saylist`:
            ////if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            let saylisto = `Random say list\nTotal : ${say.length}\n`
            for (let i of say) {
                saylisto += `☛ ${i}\n`
            }
            await tobz.reply(self, saylisto, id)
            break            
		/*case `${prefix}addvip`:
			if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin Rii', id)
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
				for (let i = 0; i < mentionedJidList.length; i++) {
				VipUser.push(mentionedJidList[i])
				fs.writeFileSync('./lib/database/VipUser.json', JSON.stringify(VipUser))
				tobz.reply(self, 'Success Menambahkan User VIP Rii!', id)
				}
            break  */         
         case `${prefix}daftar`:  // NAMBAHIN NOMOR DI DATABASE
                argz = body.trim().split('|')
                if (argz.length >= 2) {
                const no = sender.id
                const nem = argz[1]
                const mur = argz[2]
                    if(isNaN(mur)) return await tobz.reply(self, 'Umur harus berupa angka!!', id)
                    if(mur >= 40) return await tobz.reply(self, `
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
Hi ${pushname}
Kamu terlalu tua, kembali lagi ke masa muda untuk menggunakan Bot Rii
`, id)
                    const jenenge = nem.replace(' ','')
                    var cek = no
                        var obj = pendaftar.some((val) => {
                            return val.id === cek
                        })
                        if (obj === true){
                            return tobz.reply(self, 'kamu sudah terdaftar', id) // BAKAL RESPON JIKA NO UDAH ADA
                        } else {
                            const mentah = await tobz.checkNumberStatus(no) // PENDAFTARAN
                            const msg = monospace(`Pendaftaran berhasil dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
[Nama]: ${jenenge} [@${no.replace(/[@c.us]/g, '')}]
[Nomor]: wa.me/${no.replace('@c.us', '')}
[Umur]: ${mur}
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
Untuk menggunakan bot silahkan kirim ${prefix}menu
Total Pengguna yang telah terdaftar ${pendaftar.length}`)
                            const hasil = mentah.canReceiveMessage ? msg : false
                            if (!hasil) return tobz.reply(self, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                            {
                            const register = ({
                                id: mentah.id._serialized,
                                nama: jenenge,
                                umur: mur
                            })
                            pendaftar.push(register)
                            fs.writeFileSync('./lib/database/user.json', JSON.stringify(pendaftar)) // DATABASE
                                tobz.sendTextWithMentions(self, hasil)
                            }
                        }
                    } else {
                        await tobz.reply(self, `
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
Format yang kamu masukkan salah!
kirim ${prefix}daftar |nama|umur

contoh format: ${prefix}daftar |ahmad|17

cukup gunakan nama depan/panggilan saja
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋`, id) //if user is not registered
                    }
                break
             case `${prefix}daftarulang`:
                    if (!isOwner) return tobz.reply(self, 'Command ini hanya dapat digunakan oleh Owner Rii', id)  
                    const daftar = args[1]
                    let text1 = daftar.replace(/[-\s+@c.us]/g,'')
                    const cus1 = text1 + '@c.us'
                    const umur = args[2]
                    if(umur >= 40) return await tobz.reply(self, 'Umur terlalu tua kak, max 40 yaa :D', id)
                        var found = false
                        Object.keys(pendaftar).forEach((i) => {
                            if(pendaftar[i].id == cus1){
                                found = i
                            }
                        })
                        if (found !== false) {
                            pendaftar[found].umur = umur;
                            const updated = pendaftar[found]
                            const result = monospace(`Update data berhasil dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
[Nama]: ${updated.nama} | @${updated.id.replace(/[@c.us]/g, '')}
[Nomor]: wa.me/${updated.id.replace('@c.us', '')}
[Umur]: ${updated.umur}
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
Total Pengguna yang telah terdaftar ${pendaftar.length}`)
                            console.log(pendaftar[found])
                            fs.writeFileSync('./lib/database/user.json',JSON.stringify(pendaftar));
                            tobz.sendTextWithMentions(self, result, id)
                        } else {
                                tobz.reply(self, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
                        }
                break            
        case `${prefix}addbadword`:
            if (!isAdmin) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin Rii!`, id)
            if (!args.length >= 1) return tobz.reply(self, `Masukkan kata kasar yang akan di blacklist `, id) 
            const word = body.slice(12)
            var cek = dbbadword.includes(word);
            if(cek){
                return tobz.reply(self, `Badword Sudah Ada Di Database`, id)
            } else { 
                dbbadword.push(word)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                tobz.reply(self, `Success Menambahkan Blacklist Badword\nTotal Data Badword Sekarang : *${dbbadword.length - 1}*`, id)
            }
            break
       case `${prefix}delbadword`:
            if (!isOwner) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Owner Rii!`, id)
                const delbd = dbbadword.indexOf(body.slice(12))
                dbbadword.splice(delbd, 1)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                tobz.reply(self, `Success Menghapus Badword!`, id)
            break
        case `${prefix}listbadword`:
            if (!isAdmin) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin Rii!`, id)
                const bad = fs.readFileSync('./lib/database/katakasar.json')
                const liste = JSON.parse(bad)
                let listz = '*「 LIST BADWORD 」*\n'
                listz += `*Total : ${liste.length}*\n`
                let nomre = 1
                     for (let i = 0; i < liste.length; i++){
                        listz += `\n*${nomre}.* ${liste[i]}`
                        nomre++
                    }
                    tobz.sendText(self, listz) 
                    break    
        case `${prefix}addvip`: //asumsikan admin itu premium member ya!
            if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin Rii', id)
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
            //var sia = mentionedJidList.name
            for (let i = 0; i < mentionedJidList.length; i++) {
                VipUser.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/VipUser.json', JSON.stringify(VipUser))
                tobz.reply(self, `
──────────────────  
            *VIP USER👑*
•┃➥ *Number*\t  : ${mentionedJidList[i].replace(/@c.us/g,'')}
•┃➥ *Status*\t\t  : *ACTIVE*
•┃➥ *Since*\t\t\t: ${timu}
•┃➥ *Expired*\t\t: ${timi}
──────────────────
Jangan Lupa Cek Masa VIP Kamu!
Caranya? ketik ${prefix}cekvip`, id)
                }
            break            
        case `${prefix}delvip`:
            if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Admin Rii', id)
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
                let dv = VipUser.indexOf(mentionedJidList[0])
                VipUser.splice(dv, 1)
                fs.writeFileSync('./lib/database/VipUser.json', JSON.stringify(VipUser))
            tobz.reply(self, `
──────────────────  
            *VIP USER👑*
•┃➥ *Number* : ${mentionedJidList[0].replace(/@c.us/g,'')}
•┃➥ *Status* : *DEACTIVE*
──────────────────`, id)
            break   
        case `${prefix}listvip`:
            let lv = `Ini adalah list User VIP Rii\nTotal : ${VipUser.length}\n`
            for (let i of VipUser) {
                lv += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(self, lv, id)
            break
        case `${prefix}listbadword`:
            let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
            for (let i of bad) {
                lbw += `➸ ${i.replace(bad)}\n`
            }
            await tobz.reply(self, lbw, id)
            break          
       /* case `${prefix}listvip`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            let lv = `  「 *VIP USER* 」\n\nTotal : ${VipUser.length}\n`
            for (let i of VipUser) {
                lv += `\n ➥ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(self, lv, id)
            break */           
		case `${prefix}addadmin`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                adminNumber.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                tobz.reply(self, 'Success Menambahkan Admin Rii!', id)
				}
            break
        case `${prefix}deladmin`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
                let inq = adminNumber.indexOf(mentionedJidList[0])
                adminNumber.splice(inq, 1)
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                tobz.reply(self, 'Success Menghapus Admin Rii!', id)
            break
        case `${prefix}block`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await tobz.contactBlock(unblock).then((a)=>{
                    console.log(a)
                    tobz.reply(self, `Success block ${args[1]}!`, id)
                })
            }
            break
        case `${prefix}unblock`:
            if (!isOwner) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh Owner Rii!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await tobz.contactUnblock(unblock).then((a)=>{
                    console.log(a)
                    tobz.reply(self, `Success unblok ${args[1]}!`, id)
                })
            } 
            break
        case `${prefix}ban`:
            if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin Rii!', id)
            //if (!isVipUser) return tobz.reply(self, '*Perintah ini hanya untuk User VIP👑*', id)    
                for (let i = 0; i < mentionedJidList.length; i++) {
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                tobz.reply(self, 'Succes ban target!',id)
            }
            break
        case `${prefix}unban`:
            if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh admin Rii!', id)
            //if (!isVipUser) return tobz.reply(self, '*Perintah ini hanya untuk User VIP👑*', id)         
                let inz = banned.indexOf(mentionedJidList[0])
                banned.splice(inz, 1)
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                tobz.reply(self, 'Unbanned User!', id)
            break
        case `${prefix}listgroup`:
                tobz.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                tobz.reply(self, gc, id)
            })
            break
        case `${prefix}listbanned`:
            let bened = `This is list of banned number\nTotal : ${banned.length}\n`
            for (let i of banned) {
                bened += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(self, bened, id)
            break
        case `${prefix}listblock`:
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await tobz.reply(self, hih, id)
            break     
       case `${prefix}runtime`:
            function format(seconds){
            function pad(s){
            return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
             var minutes = Math.floor(seconds % (60*60) / 60);
             var seconds = Math.floor(seconds % 60);

             return pad(hours) + ' Jam,' + pad(minutes) + ' Menit,' + pad(seconds) + ' Detik';
              }

            var uptime = process.uptime();
            tobz.reply(self, `Bot telah berjalan selama ${format(uptime)}`, id)
            break           
       case `${prefix}ping`:
        case `${prefix}speed`:
        case `${prefix}stat`:
            const isCas = await tobz.getIsPlugged() ? "Charging ⚡" : "Not Charged ❌"
            const loadedMsg = await tobz.getAmountOfLoadedMessages()
            const chatIds = await tobz.getAllChatIds()
            const groups = await tobz.getAllGroups()
            const timestamp = speed();
            const latensi = speed() - timestamp
            const MyPhone = await tobz.getMe()
            const { battery, plugged, phone } = MyPhone
            const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model, os_build_number } = phone
            // console.log(os.hostname())
            tobz.reply(self, `        〘 Server Info 〙
*HOST* : _${os.hostname()}_
*PLATFORM* : _${os.platform()}_
*CPU* : _${os.cpus()[0].model}_
*SPEED* : _${os.cpus()[0].speed} MHz_ 
*CORE* : _${os.cpus().length}_
*Penggunaan RAM* : _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
*Pesan masuk* : _${loadedMsg}_ 
*Group* : _${groups.length}_ 
*Private Chat* : _${chatIds.length - groups.length}_ 
*Total* : _${chatIds.length}_ 
*Latensi* : _${latensi.toFixed(4)} detik/req_
         〘 Phone Info 〙
*Baterai* : _${battery} ${isCas}_
*Versi WhatsApp* : _${wa_version}_
*MCC* : _${mcc}_
*MNC* : _${mnc}_
*Versi OS* : _${os_version}_
*Tipe Perangkat* : _${device_manufacturer}_
*Model Perangkat* : _${device_model}_
*OS Build Number* : _${os_build_number}_`, id)
            break     
        case `${prefix}runtime`:
        case `${prefix}start`:  
            const tanda = '```'
            const titit1 = moment().millisecond()
            function format(seconds){
            function pad(s){
            return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
            var minutes = Math.floor(seconds % (60*60) / 60);
            var seconds = Math.floor(seconds % 60);

             return pad(hours) + ' Jam, ' + pad(minutes) + ' Menit, ' + pad(seconds) + ' Detik';
              }

            var uptime = process.uptime();  
                tobz.reply(self, `${monospace(`
❏ Speed :
    ${latensi.toFixed(4)} Detik   

❏ Latency :
    ${titit1} Ms

❏ Running : 
${format(uptime)}
`)}`, id)
/*            break  
        case `${prefix}statswa`:
        case `${prefix}swa`:
            const loadedMsg = await tobz.getAmountOfLoadedMessages()
            const chatIds = await tobz.getAllChatIds()
            const groups = await tobz.getAllGroups()
            const blok = await tobz.getBlockedIds()
            const me = await tobz.getMe() 
                tobz.reply(self, `${monospace(`
  ❏ 『 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐁𝐎𝐓 』 
❍ ${loadedMsg} : Pesan Masuk
❍ ${groups.length} : Pesan Grup
❍ ${chatIds.length - groups.length} : Chat Pribadi
❍ ${blok.length} : Kontak Diblokir
❍ ${chatIds.length} : Jumlah Chat
`)}`, id)     
            break
        case `${prefix}statspc`:
        case `${prefix}spc`:  
            const used = process.memoryUsage()
            const titit = moment().millisecond()
                tobz.reply(self, `${monospace(`
  ❏ 『 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 』
❍ HOST : ${os.hostname()}
❍ PLATFORM : ${os.platform()}
❍ SPEED : ${os.cpus()[0].speed} MHz
❍ CORE : ${os.cpus().length}
❍ RAM : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
❍ N.Latency : ${titit} Ms
`)}`, id) 
            break                
        case `${prefix}statshp`:
        case `${prefix}shp`:    
            const tanda2 = '```'    
            const isCas = await tobz.getIsPlugged() ? "Charging ⚡" : "Not Charged"
            const MyPhone = await tobz.getMe()
            const { battery, plugged, phone } = MyPhone
            const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model, os_build_number } = phone
                tobz.reply(self, `${monospace(`
 ❏ 『 𝐒𝐓𝐀𝐓𝐈𝐒𝐓𝐈𝐊 𝐇𝐏 』
❍ Baterai : ${battery}%
❍ Charger : ${isCas}
❍ V.WhatsApp : ${wa_version}
❍ MCC : ${mcc}
❍ MNC : ${mnc}
❍ Versi OS : ${os_version}
❍ Merk HP : _${device_manufacturer}_
❍ Versi HP : _${device_model}_
`)}`, id)
            break  */    
        case `${prefix}bugreport`:
            if (args.length === 1) return tobz.reply(self, '[❗] Kirim perintah *@bugreport [teks]*\ncontoh : *@bugreport Permisi Owner, Ada bug pada command @otakudesu, Tolong diperbaiki*')
            const bug = body.slice(11)
            if(!bug) return
            if(isGroupMsg){
                tobz.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                tobz.reply(self, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggappi.' ,id)
            }else{
                tobz.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
                tobz.reply(self, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggappi.', id)
            }
            break
		case `${prefix}getpp`:
			if (!isGroupMsg) return tobz.reply(self, 'Hanya untuk di grup!.', id)
				var pik = await tobz.getProfilePicFromServer(mentionedJidList[0])
				await tobz.sendFileFromUrl(self, pik, 'pik.jpg', 'Nih Kak...', id)
				break
		case `${prefix}getprofile`:
	    case `${prefix}you`:
			if (!isAdmin) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan oleh AdminRii!', id)
			if (isBanned, isBlocked) return false
			if (isGroupMsg) {
            if (!quotedMsg) {
            for (let i = 0; i < mentionedJidList.length; i++) {
            var block = blockNumber.includes(mentionedJidList[i])
            var bend = banned.includes(mentionedJidList[i])
            var pic = await tobz.getProfilePicFromServer(mentionedJidList[i])
            var namae = mentionedJidList[i]
            var sts = await tobz.getStatus(mentionedJidList[i])
            var adm = groupAdmins.includes(mentionedJidList[i])
            var donate =  adminNumber.includes(mentionedJidList[i])
            const { status } = sts
            if (pic == undefined) {
                var pfp = errorurl 
            } else {
                var pfp = pic
            } 
            await tobz.sendFileFromUrl(self, pfp, 'pfp.jpg', `*PROFILE :* \n☛ *User: ${namae}* \n☛ *Info: ${status}* \n☛ *Block : ${block}* \n☛ *Banned : ${bend}* \n☛ *Admin Group: ${adm}* \n☛ *AdminRii: ${donate}*`)
         } if (quotedMsg) {
         var qmid = quotedMsgObj.sender.id
         var block = blockNumber.includes(qmid)
         var bend = banned.includes(mentionedJidList[i])
         var pic = await tobz.getProfilePicFromServer(qmid)
         var namae = quotedMsgObj.sender.name
         var sts = await tobz.getStatus(qmid)
         var adm = isGroupAdmins
         var donate = isAdmin
         const { status } = sts
			if (pic == undefined) {
			var pfp = errorurl 
			} else {
			var pfp = pic
			} 
			await tobz.sendFileFromUrl(self, pfp, 'pfp.jpg', `*User Profile* ✨ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *AdminRii: ${donate}*`)
			tobz.sendContact(self, serial)
		 }
        }
    }
        break
        case `${prefix}profile`:
		 case `${prefix}me`:
            if (isBanned, isBlocked) return false
            if (isGroupMsg) {
                if (!quotedMsg) {
                var block = blockNumber.includes(author)
                var bend = banned.includes(author)
                var pic = await tobz.getProfilePicFromServer(author)
                var namae = pushname
                var sts = await tobz.getStatus(author)
                var adm = isGroupAdmins
                var donate = isAdmin
                const { status } = sts
                if (pic == undefined) {
                    var pfp = errorurl 
                } else {
                    var pfp = pic
                } 
                await tobz.sendFileFromUrl(self, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *Admin Rii: ${donate}*`)
             } else if (quotedMsg) {
             var qmid = quotedMsgObj.sender.id
             var block = blockNumber.includes(qmid)
             var bend = banned.includes(author)
             var pic = await tobz.getProfilePicFromServer(qmid)
             var namae = quotedMsgObj.sender.name
             var sts = await tobz.getStatus(qmid)
             var adm = isGroupAdmins
             var donate = isAdmin
             const { status } = sts
              if (pic == undefined) {
              var pfp = errorurl 
              } else {
              var pfp = pic
              } 
              await tobz.sendFileFromUrl(self, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *Admin Rii: ${donate}*`)
             }
            }
            break
      case `${prefix}profile`:
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            if (isBanned, isBlocked) return false
            if (isGroupMsg) {
                if (!quotedMsg) {
                     var block = blockNumber.includes(author)
                     var bend = banned.includes(author)
                    var pic = await tobz.getProfilePicFromServer(author)
                    var namae = pushname
                    var premm = isVipUser
                    var sts = await tobz.getStatus(author)
                    var adm = isGroupAdmins
                    const { status } = sts
                    if (pic == undefined) {
                        var pfp = errorurl
                    } else {
                        var pfp = pic
                    }
                    await tobz.sendFileFromUrl(self, pfp, 'pfp.jpg',
                        `*User Profile* ✨️
➸ *Username 🐷 : ${namae}*
➸ *User Info 💫 : ${status}*
➸ *Tipe Account 👑: ${premm ? 'Premium' : 'Free'}*
➸ *Block 🚫 : ${block ? 'Yes' : 'No'}*
➸ *Banned 🔒 : ${bend ? 'Yes' : 'No'}*
➸ *Admin Group 🔰 : ${adm}*`)
                    } else if (quotedMsg) {
                        var qmid = quotedMsgObj.sender.id
                        var block = blockNumber.includes(qmid)
                        var bend = banned.includes(author)
                        var pic = await tobz.getProfilePicFromServer(qmid)
                        var namae = quotedMsgObj.sender.name
                        var premm = quotedMsgObj.isVipUser
                        var sts = await tobz.getStatus(qmid)
                        var adm = isGroupAdmins
                        const { status } = sts
                        if (pic == undefined) {
                            var pfp = errorurl
                        } else {
                            var pfp = pic
                        }
                        await tobz.sendFileFromUrl(self, pfp, 'pfp.jpg', 
                        `*User Profile* ✨️ 
➸ *Username 🐷 : ${namae}*
➸ *User Info 💫 : ${status}*
➸ *Tipe Account 👑: ${premm ? 'Premium' : 'Free'}*
➸ *Block 🚫 : ${block ? 'Yes' : 'No'}*
➸ *Banned 🔒 : ${bend ? 'Yes' : 'No'}*
➸ *Admin Group 🔰 : ${adm ? 'Yes' : 'No'}*`)
                    }
                }
            break           
        case `${prefix}profile`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (isGroupMsg) {
                if (!quotedMsg) {
                    var block = blockNumber.includes(author)
                    var bend = banned.includes(author)
                    var sts = await tobz.getStatus(author)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    var ctt = await tobz.getContact(author)
                    const { status } = sts
                    var found = false
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == author){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = author;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await tobz.reply(self, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await tobz.getProfilePicFromServer(author)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                        await tobz.sendContact(chatId, author)
                        tobz.sendFileFromUrl(self, pfp, 'pfp.jpg', `*「 PROFILE 」*\n\n• *Username: ${namae}*\n• *User Info: ${status}*\n*• Block : ${block}*\n*• Banned : ${bend}*\n• *Admin Group: ${adm}*\n• *Admin Rii: ${donate}*\n• *Registered User :* ${registe}`)
                    }
                } else if (quotedMsg) {
                    var qmid = quotedMsgObj.sender.id
                    var block = blockNumber.includes(qmid)
                    var bend = banned.includes(qmid)
                    var gpic = await tobz.getProfilePicFromServer(qmid)
                    var namae = quotedMsgObj.sender.name
                    var sts = await tobz.getStatus(qmid)
                    var ctt = await tobz.getContact(qmid)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    const { status } = sts
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == qmid){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = qmid;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await tobz.reply(self, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await tobz.getProfilePicFromServer(qmid)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                    await tobz.sendContact(chatId, qmid)
                    tobz.sendFileFromUrl(self, pfp, 'pfp.jpg', `
*「 PROFILE 」*
──────────────────
• *Username: ${namae}*
• *User Info: ${status}*
• *Block : ${block}*
• *Banned : ${bend}*
• *Admin Group: ${adm}*
• *Admin Rii: ${donate}*
• *Registered User :* ${registe}
──────────────────`)
                    }
                }
            }
            break             
        case `${prefix}cekvip`:
        case `${prefix}vipcek`:
        case `${prefix}vipstatus`:
            if (!isVipUser) return tobz.reply(self, 'Anda bukan Member Premium, silakan hubungi owner untuk membeli akses Premium!', id)
            var pic = await tobz.getProfilePicFromServer(author)
            if (pic == undefined) {
                var pfpp = errorurl
            } else {
                var pfpp = pic
            }
            tobz.sendFileFromUrl(self, pfpp, 'photo.jpg', `
──────────────────
        『 *𝐕𝐈𝐏 USER* 』
──────────────────
• *Name*      : ${pushname}
• *Number*   : ${serial.replace(/@c.us/g,'')}
• *Since*\t\t\t : ${timu}
• *Expired*\t\t: ${timi}
• *Status*    : *ACTIVE*
──────────────────
*Tanggal / Jam* : *${time}*
──────────────────`, id)
            break     
                case `${prefix}fitnah`:  
                case `${prefix}fakereply`:  // tuh costum reply
              costum('Ini', '6285349607186@s.whatsapp.com')
                  break 
                if (!isOwner) return reply(self, `Hanya Owner yang bisa Menggunakan!`, id)
                if (!isGroup) return reply(self, `Hanya Bisa Digunakan Di GRUP!`)
                //if (!isGroupAdmins) return reply(mess.only.admin) 
                if (!isBotGroupAdmins) return reply(self, `Bot Harus Menjadi Admin!`, id)
                 const linkgc = await conn.groupInviteCode (self) 
                 reply (linkgc)
                 break                   
        // LIST MENU
        case `${prefix}menu`:
        case `${prefix}help`: //edit sendiri deh menu nya
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan !regis |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            const tanda1 = '```'
            function format(seconds){
            function pad(s){
            return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
             var minutes = Math.floor(seconds % (60*60) / 60);
             var seconds = Math.floor(seconds % 60);

             return pad(hours) + ' Jam, ' + pad(minutes) + ' Menit, ' + pad(seconds) + ' Detik';
              }

            var uptime = process.uptime();
            var premma = isVipUser
            var found = false
            //const limedd = JSON.parse(fs.readFileSync('./lib/medialimit.json'))
const userReg = JSON.parse(fs.readFileSync('./lib/database/user.json'))
for(let userRegs of userReg){
if(userRegs.id === serial){
const userName = userRegs.nama
const userAge = userRegs.umur
            const limidatt = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
            for (let lmt of limidatt) {
                if (lmt.id === serial) {
                    let limitCounts = limitCount - lmt.limit     
                    tobz.reply(self, `${monospace(`
╭❍ 𝐔𝐒𝐄𝐑 𝐒𝐓𝐀𝐓𝐔𝐒
├──────────────────
├❍ Name : ${userName}
├❍ User : ${premma ? 'VIP' : 'Free'}
├❍ Tanggal : ${moment().format('DD/MM/YY')}
├❍ Jam : ${moment().format('HH:mm:ss')}
├❍ User BOT : ${pendaftar.length} User
╰───────────────────
            
  ╭❍ Menu 𝐁𝐎𝐓 
 •├❍ Perintah BOT : 「 ${prefix} 」
 •├❍ Limit BOT : ${premma ? '999999' : '50 Limit'}
 •├──────────────────
 •├❍ ${prefix}listmenu
 •├❍ ${prefix}listbanned
 •├❍ ${prefix}listblock
 •├❍ ${prefix}listgroup
 •├❍ ${prefix}listblock
 •├❍ ${prefix}daftarvip
 •├❍ ${prefix}addvip
 •├❍ ${prefix}cekvip
 •├❍ ${prefix}ceklimit
 •├❍ ${prefix}addlimit   
 •├❍ ${prefix}panduan
 •├❍ ${prefix}snk
 •├❍ ${prefix}owner
  ╰───────────────────
────────────────────
    ❍ Running : 
${format(uptime)}
────────────────────
`)}`, id)
var found = true
                }
            }
            if (found === false) {
                let obj = { id: `${serial}`, limit: 1 };
                limit.push(obj);
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit, 1));
                tobz.reply(self, `${monospace(`
╭❍ 𝐔𝐒𝐄𝐑 𝐒𝐓𝐀𝐓𝐔𝐒
├──────────────────
├❍ Name : ${userName}
├❍ User : ${premma ? 'VIP' : 'Free'}
├❍ Tanggal : ${moment().format('DD/MM/YY')}
├❍ Jam : ${moment().format('HH:mm:ss')}
├❍ User BOT : ${pendaftar.length} User
╰───────────────────
            
  ╭❍ RII 𝐁𝐎𝐓 
 •├❍ Perintah BOT : 「 ${prefix} 」
 •├❍ Limit BOT : ${premma ? '999999' : '50 Limit'}
 •├──────────────────
 •├❍ ${prefix}listmenu
 •├❍ ${prefix}listbanned
 •├❍ ${prefix}listblock
 •├❍ ${prefix}listgroup
 •├❍ ${prefix}listblock
 •├❍ ${prefix}daftarvip
 •├❍ ${prefix}addvip
 •├❍ ${prefix}cekvip
 •├❍ ${prefix}ceklimit
 •├❍ ${prefix}addlimit   
 •├❍ ${prefix}panduan
 •├❍ ${prefix}snk
 •├❍ ${prefix}owner
  ╰───────────────────
────────────────────
    ❍ Running : 
${format(uptime)}
────────────────────
`)}`, id)
        }
    }
}
            break           
		case `${prefix}menuvip`:
        case `${prefix}vipmenu`:
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
		    tobz.sendText(self, vipmenu)
            break
        case `${prefix}rulesgc`:
        if (!isBotGroupAdmins)
        if (!isGroupAdmins) return tobz.reply(self, `
*SAVE NO OWNER*

RULES IN Ａｍｂｙａｒ アンビャル :

⚠️Newmem intro.
⚠️Free badword dan tidak sara.
⚠️No spam jika tidak perlu/tidak ada percakapan sesama member.
⚠️Dilarang promosi link dan phising.
⚠️ PANSOS? Silahkan kalo siap dibully
⚠️ Dilarang keluar masuk GC.
⚠️Dilarang Flamming.
⚠️ Dilarang share hal yang berbau 18+ dan menjijikan.
⚠️ Dilarang nabung ya kontol.
⚠️ Jangan nge Dark Joke Bro
⚠️ Drama? Gas slur biar rame.
⚠️Jumpscare auto kick

*Langgar auto Kick* kecuali owner`, id)
            break            
        case `${prefix}Riigroup`:
        case `${prefix}Riigrup`:
            tobz.reply(self, `Link Group : https://chat.whatsapp.com/CSYI4Ut6jtP3Cu5KG576kK\nJangan Lupa Join Ya Kak ${pushname}`, id)
            break   
      /*  case `${prefix}daftarvip`:
           return tobz.reply(self, `
*HARGA DAFTAR VIP :*
-Rp. 5K > Akses Fitur ViP
-Rp. 10K > Fitur VIP + Masukin Bot KeGrup Kalian!

*JIKA INGIN DAFTAR VIP* :
*Chat Owner BOT :*
_wa.me/6285349607186_

            break*/
        case `${prefix}listmenu`:
        case `${prefix}daftarmenu`:
        case `${prefix}menubot`:
            const tanda4 ='```'
            tobz.reply(self, `${monospace(`
Tanggal : ${moment().format('DD/MM/YY')}
Jam : ${moment().format('HH:mm:ss')}
     
◪ OWNER BOT
    │
    ├❏ *${prefix}block*
    ├❏ *${prefix}unblock*
    ├❏ *${prefix}addadmin*
    ├❏ *${prefix}deladmin*
    ├❏ *${prefix}restart*
    ├❏ *${prefix}ekickall*
    ├❏ *${prefix}banchat*
    ├❏ *${prefix}unbanchat*
    ├❏ *${prefix}changepf*
    ├❏ *${prefix}addvip*
    ├❏ *${prefix}delvip*
    ├❏ *${prefix}addlimit*
    ├❏ *${prefix}ping*
    ├❏ *${prefix}Riigroup*
    ├❏ *${prefix}Riiadmin*
    ├❏ *${prefix}addlimit* 

◪ ADMIN BOT 
    │
    ├❏ *${prefix}mute*
    ├❏ *${prefix}unmute*
    ├❏ *${prefix}ban*
    ├❏ *${prefix}unban*
    ├❏ *${prefix}spamcall*
    ├❏ *${prefix}kickall*
    ├❏ *${prefix}oleave*
    ├❏ *${prefix}opromote*
    ├❏ *${prefix}odemote*
    ├❏ *${prefix}odelete*
    ├❏ *${prefix}oadd*
    ├❏ *${prefix}kick*
    ├❏ *${prefix}okickall*
    ├❏ *${prefix}otagall*
    ├❏ *${prefix}changepf*

◪ GROUP
    │    
    ├─❏ *${prefix}snk*
    ├─❏ *${prefix}intro*
    ├─❏ *${prefix}setlink*
    ├─❏ *${prefix}setname*
    ├─❏ *${prefix}setpic*
    ├─❏ *${prefix}setdesk*
    ├─❏ *${prefix}groupinfo*
    ├─❏ *${prefix}linkgroup*
    ├─❏ *${prefix}bukagc*
    ├─❏ *${prefix}tutupgc*
    ├─❏ *${prefix}profile*
    ├─❏ *${prefix}getprofile*
    ├─❏ *${prefix}add*
    ├─❏ *${prefix}promote*
    ├─❏ *${prefix}demote*
    ├─❏ *${prefix}tagall*
    ├─❏ *${prefix}adminList*
    ├─❏ *${prefix}ownerGroup*
    ├─❏ *${prefix}leave*
    ├─❏ *${prefix}delete*
    ├─❏ *${prefix}kickAll*
    ├─❏ *${prefix}NSFW*
    ├─❏ *${prefix}left*
    ├─❏ *${prefix}welcome*
    ├─❏ *${prefix}simi*     

◪ EDUKASI
    │
    ├❏ *${prefix}sandwriting*
    ├❏ *${prefix}nulis*
    ├❏ *${prefix}brainlysearch*
    ├❏ *${prefix}kbbi*
    ├❏ *${prefix}wiki*
    ├❏ *${prefix}translate*
    ├❏ *${prefix}brainly*
    ├❏ *${prefix}bahasa*

 ◪ MEDIA   
    │
    ├─❏ *${prefix}igstalk*
    ├─❏ *${prefix}ramalpasangan*        
    ├─❏ *${prefix}tiktokstalk*
    ├─❏ *${prefix}smulestalk*
    ├─❏ *${prefix}artinama*
    ├─❏ *${prefix}covid*
    ├─❏ *${prefix}quotemaker*
    ├─❏ *${prefix}jadwalTv*
    ├─❏ *${prefix}cuaca*
    ├─❏ *${prefix}resepmasakan*
    ├─❏ *${prefix}tts*
    ├─❏ *${prefix}googleimage*
    ├─❏ *${prefix}google*
    ├─❏ *${prefix}playstore*
    ├─❏ *${prefix}shopee*
    ├─❏ *${prefix}pinterest*
    ├─❏ *${prefix}youtubesearch*
    ├─❏ *${prefix}lirik*
    ├─❏ *${prefix}chord*
    ├─❏ *${prefix}qrcode*
    ├─❏ *${prefix}maps*
    ├─❏ *${prefix}textmaker*
    ├─❏ *${prefix}checkip*
    ├─❏ *${prefix}ssweb*
    ├─❏ *${prefix}sspc*
    ├─❏ *${prefix}ssphone*
    ├─❏ *${prefix}shorturl*
    ├─❏ *${prefix}neko*
    ├─❏ *${prefix}pokemon*
    ├─❏ *${prefix}inu*
    ├─❏ *${prefix}infoGempa*
    ├─❏ *${prefix}quotes*
    ├─❏ *${prefix}dadu*
    ├─❏ *${prefix}koin*
    ├─❏ *${prefix}quoterandom*
    ├─❏ *${prefix}nyimak*

◪ ANIME
    │
    ├─❏ *${prefix}loli*
    ├─❏ *${prefix}shota*
    ├─❏ *${prefix}waifu*
    ├─❏ *${prefix}husbu*
    ├─❏ *${prefix}randomNekoNime*
    ├─❏ *${prefix}randomTrapNime*
    ├─❏ *${prefix}randomAnime*
    ├─❏ *${prefix}quotesnime*
    ├─❏ *${prefix}wait*
    ├─❏ *${prefix}koin*
    ├─❏ *${prefix}malanime*
    ├─❏ *${prefix}malcharacter*
    ├─❏ *${prefix}kusonime*
    ├─❏ *${prefix}otakudesu*
    ├─❏ *${prefix}dewabatch*
    ├─❏ *${prefix}komiku*
    ├─❏ *${prefix}animesearch*   
    
◪ PRAY
    │
    ├─❏ *${prefix}quran*
    ├─❏ *${prefix}tafsir*
    ├─❏ *${prefix}jadwalsholat*
    ├─❏ *${prefix}listdaerah*
    ├─❏ *${prefix}listsurah*
    ├─❏ *${prefix}infosurah*   

◪ KERANG AJAIB
    │
    ├❏ *${prefix}apakah*
    ├❏ *${prefix}rate*
    ├❏ *${prefix}bisakah*
    ├❏ *${prefix}kapankah*
    ├❏ *${prefix}bisakah*
    ├❏ *${prefix}maukah* 

◪ STICKER MAKER
    │    
    ├─❏ *${prefix}sticker*
    ├─❏ *${prefix}stickertoimg*
    ├─❏ *${prefix}harta*
    ├─❏ *${prefix}hartasticker*
    ├─❏ *${prefix}glowmaker*
    ├─❏ *${prefix}lovemaker*
    ├─❏ *${prefix}partyteks*
    ├─❏ *${prefix}romanceteks*
    ├─❏ *${prefix}silkteks*
    ├─❏ *${prefix}glitchteks*
    ├─❏ *${prefix}thunder*
    ├─❏ *${prefix}Thundersticker*
    ├─❏ *${prefix}blackpink*
    ├─❏ *${prefix}waterteks*
    ├─❏ *${prefix}fssarah*
    ├─❏ *${prefix}slidingteks*
    ├─❏ *${prefix}searchteks*
    ├─❏ *${prefix}cogan*
    ├─❏ *${prefix}cecan1*
    ├─❏ *${prefix}cecan2*
    ├─❏ *${prefix}ttp    

◪ DOWNLOADER
    │    
    ├─❏ ${prefix}ytmp3
    ├─❏ ${prefix}ytmp4
    ├─❏ ${prefix}ig
    ├─❏ ${prefix}fb
    ├─❏ ${prefix}twitter
    ├─❏ ${prefix}smule
    ├─❏ ${prefix}tiktok
    ├─❏ ${prefix}starmaker

◪ VIP MENU   
    │ 
   ▪├❍ *${prefix}afk*
   ▪├❍ *${prefix}sgif*
   ▪├❍ *${prefix}play*
   ▪├❍ *${prefix}cecanvideo*
   ▪├❍ *${prefix}video*
   ▪├❍ *${prefix}getvideo*
   ▪├❍ *${prefix}music lagu*
   ▪├❍ *${prefix}getmusic*
   ▪├❍ *${prefix}ytsearch*
   ▪├❍ *${prefix}joox*
   ▪├❍ *${prefix}tekshub*
   ▪├❍ *${prefix}sfire*
   ▪├❍ *${prefix}slight*
   ▪├❍ *${prefix}xnxx*
   ▪├❍ *${prefix}xvideos*
   ▪├❍ *${prefix}getxvideos*
   ▪├❍ *${prefix}nhentai*
   ▪├❍ *${prefix}getnhentai*
   ▪├❍ *${prefix} teks (simi)*

◪ Running : 
${format(uptime)}`)}`, id)
            break            
        // INFORMATION
        case `${prefix}donate`:
            tobz.sendText(self, sumbang)
            break
        case `${prefix}readme`:
        case `${prefix}panduan`:
            tobz.reply(self, readme, id)
            break
        case `${prefix}infomenu`:
            tobz.sendText(self, infomenu)
            break
        case `${prefix}bahasa`:
            tobz.sendText(self, bahasalist)
            break
        case `${prefix}snk`:
            tobz.reply(self, snk, id)
            break
			
		//	NEW CASE
		
		case `${prefix}stylewriting`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)

            await limitAdd(serial)
            if (args.length === 1)  return tobz.reply(self, `Kirim perintah *${prefix}sandwriting [ Teks ]*\nContoh *${prefix}sandwriting Rii*`, id)
            const swrt1 = body.slice(13)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt1 + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*
   *Text : ${swrt1}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, swrt3)
          } catch (err) {
            console.error(err.message)
            await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔 Maaf, User tidak ditemukan')
            tobz.sendText(ownerNumber, 'Sand Writing Error : ' + err)
              }
            break
		case `${prefix}sarah`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return tobz.reply(self, 'Kirim perintah *_sarah [query]*\nContoh : *_sarah ZeroTwo*', id)
            const txtsarah = body.slice(7)
            const sapi = await sarahfs(txtsarah)
            await tobz.sendFile(self, sapi, 'ss.jpg', 'cekrek', id)
            .catch(() => {
                tobz.reply(self, 'Ada yang Error!', id)
            })
            break
		case `${prefix}slap`:
            arg = body.trim().split(' ')
            const jejiik = author.replace('@c.us', '')
            await tobz.sendGiphyAsSticker(self, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            tobz.sendTextWithMentions(self, `${prefix}` + jejiik + ' *slapped* ' + arg[1])
            break
        case 'Assalamualaikum':    
        case 'Assalamu Alaikum':
        case 'assalamu Alaikum':
        case 'assalamualaikum':  
            tobz.reply(self, '*WA-BOT*\n_Walaikum Sallam Kakak :)_', id)
            break
        case 'p': 
        case 'P':  
            tobz.reply(self, '*WA-BOT*\n_pa pe pa pe salam doang woi!!_', id)
            break   
        case 'admin':
            tobz.reply(self, '*WA-BOT*\nAda Yang Bisa Admin Bantu Kak?', id)
            break                                          
        case `minta link grup`:
        case `linkgrup dong`: 
            tobz.reply(self, `*WA-BOT*\n*Ini Kak Link Grup Nya*\n_https://chat.whatsapp.com/CyXJFp3DRxp5SILs1y6lGD_`, id)
            break  
        case `salken`:  
            tobz.reply(self, `*WA-BOT*\n_Hi Salken Kak, Aku Robot Whatsappnya Rii:v_`, id)
            break      
       /* case 'Rii':     
        case 'napiz':
        case 'Rii':
        case 'napuz':
        case 'napus':
            tobz.reply(self, '*WA-BOT*\nNgapain Manggil" Boss Gua;v', id)   
            break*/
        case '@+62 812-2043-9155':
        case '@+62 812-2043-9155':
            tobz.reply(self, '*WA-BOT*\nNgapain Manggil" Boss Gua;v', id)   
            break                
        case `${prefix}hug`:
                arg = body.trim().split(' ')
                const janjing = author.replace('@c.us', '')
                await tobz.sendGiphyAsSticker(self, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                tobz.sendTextWithMentions(self, `${prefix}` + janjing + ' *peyuuuk* ' + arg[1])
                break
        case `${prefix}nye`:
                arg = body.trim().split('')
                const jancuk7 = author.replace('@c.us', '')
                await tobz.sendGiphyAsSticker(self, 'https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif')
                tobz.sendTextWithMentions(self, `${prefix}` + jancuk7 +' *nye nye ' + arg[1])
                break
        case `${prefix}pat`:
                arg = body.trim().split(' ')
                const jartod = author.replace('@c.us', '')
                await tobz.sendGiphyAsSticker(self, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                tobz.sendTextWithMentions(self, `${prefix}` + jartod + ' *👈 Si Mengelu-elus si👉* ' + arg[1])
                break

		case 'kiss':
			tobz.sendPtt(self,'./media/yamete.mp3', id)
			break
		case 'ohayou':
			tobz.sendPtt(self, './media/ohayou.mp3', id)
            tobz.reply(self, 'Ohayo daling', id)
            break
		case 'konichiwa':
			tobz.sendPtt(self, './media/konichiwa.mp3',id)
			break
		case 'p':
			tobz.sendPtt(self, './media/senpai.mp3', id)
			break
		case 'tarekses':
		case 'tariksis':
		case 'tarek ses':
		case 'tarik sis':
			tobz.sendPtt(self, './media/tarekses.mp3', id)
			break
		case 'sad':
		case 'Sad':
		case 'SAD':
			tobz.sendPtt(self, './media/sad.mp3', id)
			break
        case `p`:
        case `helo`:
        case `hai`:
        case `bot`:
        case `hi`:
        case `hallo`:
        case `wey`:
        case `woy`:
            if (args.length === 1) return tobz.reply(self, `Hai, *${pushname}!*👋
Terima kasih telah menghubungi. Ketik *!help* untuk melihat perintah yang tersedia. 
        
Jangan lupa follow ya!🍻
Instagram: https://instagram.com/nfz.01`)
            break
        case `nyimak`:
            tobz.sendPtt(self, './media/bacot.mp3', id)
            break
        case `iri?`:
        case `iri`:
            tobz.sendPtt(self, './media/iri.mp3', id)
            break
        case 'palepale':
        case 'pale':
            tobz.sendPtt(self, './media/pale.mp3', id)
            break
        case 'tapiboong':
            tobz.sendPtt(self, './media/tb.mp3', id)
            break            
        case `abgjago`:
        case `abangjago`:
            tobz.sendPtt(self, './media/bgjg.mp3', id)
        case `anjay`:
        case `dasarloanjay`:
        case `loanjay`:
            tobz.sendPtt(self, './media/dasarloanjay.mp3', id)             
            break 
        case `manise`:
        case `nonamanise`:
        case `kakamainsalah`:
            tobz.sendPtt(self, './media/manise.mp3', id)             
            break        
        case `pota`:
        case `potapota`:
            tobz.sendPtt(self, './media/pota.mp3', id)             
            break               
        case `playforme`:
        case `djforme`:
            tobz.sendPtt(self, './media/playforme.mp3', id)             
            break                   
        case `ladaladi`:
        case `lada`:
            tobz.sendPtt(self, './media/ladaladi.mp3', id)             
            break                                                  
        case `tarekses`:
        case `tariksis`:
        case `tareksis`:
        case `tareeksis`:
        case `tareekses`:
            tobz.sendPtt(self, './media/tarekses.mp3', id)
            break
        case `welotka`:
        case `welutka`:
        case `kangcopet`:
            tobz.sendPtt(self, './media/welot.mp3', id)
            break
       case `${prefix}randomblowjob`:
       case `${prefix}rblowjob`:
       case `${prefix}blowjob`:
       case `${prefix}rblow`:
           // if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            //if (!isNsfw) return tobz.reply(self, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            await limitAdd(serial)
            const sblow = await axios.get('https://tobz-api.herokuapp.com/api/nsfwblowjob')
            const rblow = sblow.data
            tobz.sendFileFromUrl(self, rblow.result, `RandoBlow${ext}`, 'Random Blowjob!', id)
            break
        case `${prefix}randomhug`:
        case `${prefix}rhug`:
        case `${prefix}hug`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug')
            const rhug = shug.data
            tobz.sendFileFromUrl(self, rhug.result, `RandomHug${ext}`, 'Random Hug!', id)
            break
        case `${prefix}randomcry`:
        case `${prefix}rcry`:
        case `${prefix}cry`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry')
            const rcry = scry.data
            tobz.sendFileFromUrl(self, rcry.result, `RandomCry${ext}`, 'Random Cry!', id)
            break
        case `${prefix}randomkiss`:
        case `${prefix}rkiss`:
        case `${prefix}kiss`:
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss')
            const rkiss = skiss.data
            tobz.sendFileFromUrl(self, rkiss.result, `RandomKiss${ext}`, 'Random Kiss!', id)
            break                      
		case `${prefix}tutupgc`:
		case `${prefix}close`:
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan Oleh Admin Grup!', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            tobz.setGroupToAdminsOnly(groupId, true)
            break
		case `${prefix}bukagc`:
		case `${prefix}open`:
            if (!isGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan Oleh Admin Grup!', id)
            if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            tobz.setGroupToAdminsOnly(groupId, false)
            break
		case `${prefix}setlink`:
			if(!isGroupMsg) return tobz.sendText(self, 'Maaf, Perintah ini hanya dapat digunakan didslam group!.', id)
			if(!isOwner) return tobz.sendTextWithMentions(self, `Maaf kak perintah ini hanya untuk Kak @${sender.id.replace('@c.us','')}!.`, id)
		    if(!isGroupAdmins) tobz.sendTextWithMentions(self, `Maaf kak perintah ini hanya bisa dilakukan oleh Admin Kak @${sender.id.replace('@c.us','')}!.`, id)
					await tobz.revokeGroupInviteLink(chat.id);
					tobz.sendText(self, 'Tautan undangan berhasil di tarik')
			break
// By Gimenz
        case `${prefix}wa.me`:
        case `${prefix}wame` :
            await tobz.reply(self, `*Neh Mhank Link Nomor Wa Lu ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*Atau*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*`)
            break            
		/*case `${prefix}setlink`:
			if(isGroupMsg){
			if(isOwner)
		    if(isAdmin)
			var wkk = `${from.split('-')[0]}@c.us`
			if(message.author == wkk) {
				try {
					await tobz.revokeGroupInviteLink(chat.id);
					tobz.sendText(self, 'Tautan undangan berhasil di tarik')
					} catch (e) {
						tobz.reply(self, 'Sepertinya bot belum menjadi admin', id)
					}
			} else {
					tobz.reply(self, 'Maaf. fitur ini hanya untuk owner grup', id)
			} else {
				tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam grup', id)
			}
            break*/
        case `${prefix}cersex`:
            const sex = await get.get(`https://api.vhtear.com/cerita_sex&apikey=${vhtearkey}`).json()
            tobz.reply(self, `➸ *Cersex*: ${sex.judul.data}`, id)
            break      
        case `${prefix}setgcicon`:
        case `${prefix}seticon`:    
            if (!isGroupMsg) return tobz.reply(self, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return tobz.reply(self, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return tobz.reply(self, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setGroupIcon(self, imageBase64)
                tobz.sendTextWithMentions(self, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setGroupIcon(self, imageBase64)
                tobz.sendTextWithMentions(self, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else {
                tobz.reply(self, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}setgroupicon`, id)
            }
            break            
		case `${prefix}setname`:
        case `${prefix}setgcname`:
            if (!isGroupMsg) return tobz.reply(self, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return tobz.reply(self, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return tobz.reply(self, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(12)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await tobz.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            tobz.sendTextWithMentions(self, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
		case `${prefix}setpic`:
        case `${prefix}setpp`:
        case `${prefix}changepf`:
            if (!isOwner) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Owner Rii!`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setProfilePic(imageBase64)
                tobz.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await tobz.setProfilePic(imageBase64)
                tobz.sendTextWithMentions(self, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else {
                tobz.reply(self, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}setprofilepic`, id)
            }
            break
		case `${prefix}setdesk`:
        case `${prefix}sdesk`:
			if(!isGroupMsg) 
            if(!isBotGroupAdmins)    
            if(!isGroupAdmins) {
				var wkk = `${from.split('-')[0]}@c.us`
				if(message.author == wkk || message.author == '6285349607186@c.us') {
					try {
						const desk = body.slice(9)
						await tobz.setGroupDescription(self, `${desk}`)
					} catch {
						tobz.reply(self, 'Terjadi kesalahan, tidak dapat mengubah deskripsi grup', message)
					}
				}else{
					tobz.reply(self, 'Maaf, fitur ini hanya untuk owner grup', message)
				}
			}else{
				tobz.reply(self, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
                    break
                
		case `${prefix}linkgroup`:
		case `${prefix}getlink`:
        case `${prefix}glink`:
			if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
			if (!isBotGroupAdmins) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const inviteLink = await tobz.getGroupInviteLink(groupId);
            tobz.sendLinkWithAutoPreview(self, inviteLink, `\nLink group *${name}*`)
   			break
    //POLL MENU
                //poll menu--------------------------------------------------------------------------------------------------------------------------

        case `${prefix}pollresult`:
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            feature.getpoll(tobz, message, pollfile, voterslistfile)
            break    
        case `${prefix}vote`:
           // if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            feature.voteadapter(tobz, message, pollfile, voterslistfile)
            break
        case `${prefix}addpoll`:
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
            feature.adminpollreset(tobz, message, message.body.slice(9), pollfile, voterslistfile)
            break
        case `${prefix}addv`:
            //if (!isRegis) return tobz.reply(self, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user tobz, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id) 
            feature.addcandidate(tobz, message, message.body.slice(6), pollfile, voterslistfile)
            break            
    //VIP                             
        case `${prefix}pornhub`:    
        case `${prefix}pornhubteks`:  
        case `${prefix}tekshub`: 
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)       
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *.pornhub [ |Teks1|Teks2 ]*, contoh *.pornhub |Rii|Bot*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                tobz.reply(self, mess.wait, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]
                if (lpornhub.length > 10) return tobz.reply(self, '*Teks1 Terlalu Panjang!*\n_Minimal 10 huruf!_', id)
                if (lpornhub2.length > 10) return tobz.reply(self, '*Teks2 Terlalu Panjang!*\n_Minimal 10 huruf!_', id)
                tobz.sendFileFromUrl(self, `https://api.vhtear.com/pornlogo?text1=${lpornhub}&text2=${lpornhub2}&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(self, `Wrong Format!\n[❗] Kirim perintah *.pornhub [ |Teks1|Teks2 ]*, contoh *.pornhub |Rii|Bot*`, id)
            }
            break             
        case `${prefix}coolteks`:
        case `${prefix}cteks`:
            if(isLimit(serial)) return
           if (args.length === 0) return tobz.reply(self, 'Kirim perintah .coolteks kata kata\nContoh .coolteks rafi ganteng')
            const cool1 = body.slice(10)
            tobz.reply(self, mess.wait, id)
            limitAdd(serial)
            const cool = await get.get(`https://api.i-tech.id/tools/cool?key=i19gcX-c9gkud-MS7Ia1-LvGVTB-sIXCQLxt=${cool1}`).json()
             if (cool.error) return tobz.reply(self, 'wadoh error :(', id)
            await tobz.sendFileFromUrl(self, `${cool.result}`,'cool.jpg', 'Sukses membuat cool teks', id)
            break             
		case `${prefix}blackpink`:
        case `${prefix}bpink`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return        
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            //if (!isGroupMsg) return tobz.sendText(self, 'Maaf kak, hanya untuk didalam grup', id)
            if (args.length === 1) return tobz.reply(self, `kirim perintah ${prefix}blackpink [text]. Contoh: *${prefix}blackpink Rii*`, id)
			//if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis.`, id)
			const black = body.slice(11)
            const pink = `https://api.vhtear.com/blackpinkicon?text=${black}&apikey=${vhtearkey}`
            if (pink.error) return tobz.reply(self, pink.error, id)
            tobz.reply(self, 'Tunggu sebentar!.', id)
            await tobz.sendFileFromUrl(self, pink, 'blackpink.jpg', '*Logo blackpink*\n*By : Rii :v', id)
            await limitAdd(serial)
			break

        case `${prefix}watercolor`:
        case `${prefix}wcolor`:
        case `${prefix}waterteks`: 
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return          
             ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)    
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ~limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return tobz.reply(self, 'Kirim perintah ~watercolor [ Teks ]\nContoh ${prefix}watercolor Rii Ganteng', id)
            //tobz.reply(self, '*Sedang di Proses...*', id)
            const txt1 = body.slice(8)
            try {
            const txt3 = await axios.get('https://api.vhtear.com/watercolour_text?text1=' + txt1 + '&apikey=' + vhtearkey)
            const { imgUrl } = txt3.data.result
            const txt4 = `「 WATER WRITING 」
Text : ${txt1}`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            tobz.sendImage(self, base64, txt4, '*Watercolor Teks*\n*By : Rii*', id)
            } catch (err) {
             console.error(err.message)
             await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔 Maaf, User tidak ditemukan')
             tobz.sendText(ownerNumber, 'Sand Writing Error : ' + err)
           }
          break                           
		case `${prefix}thunder`:
        case `${prefix}th`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
			//if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya dapat digunakan didalam Group', id)
			////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (args.length === 1)return tobz.reply(self, `Kirim perintah ${prefix}thunder [text].\nContoh: ${prefix}thunder Rii`, id)
			//if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis.`, id)
			const th = body.slice(9)
			const tu = `https://api.vhtear.com/thundertext?text=${th}&apikey=${vhtearkey}`
			tobz.reply(self, 'Tunggu sebentar!.', id)
			await tobz.sendFileFromUrl(self, tu, 'Thunder.jpg', '*Thunder Teks*\n*By : Rii*', id)
            await limitAdd(serial)
            break
        case `${prefix}thundersticker`:   
        case `${prefix}thunderstiker`:  
        case `${prefix}thunders`:
        case `${prefix}thsticker`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
              ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)         
           if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const thunders = args.join(' ')
            if (args[1].toLowerCase() == args[1].toLowerCase()){
            const gledek = body.slice(14)
            const thunders = `https://api.vhtear.com/thundertext?text=${args[1]}&apikey=${vhtearkey}`
                    await tobz.sendStickerfromUrl(self, thunders, { method: 'get' })
            }
            break
        case `${prefix}hartastiker`:
        case `${prefix}hartasticker`:
        case `${prefix}sharta`:      
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return       
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const tahtas = args.join(' ')
            if (args[1].toLowerCase() == args[1].toLowerCase()){
            const hartas = body.slice(12)
            const tahtas = `https://api.vhtear.com/hartatahta?text=${args[1]}&apikey=${vhtearkey}`
                    await tobz.sendStickerfromUrl(self, tahtas, { method: 'get' })
            }
            break                
        case `${prefix}slidingteks`:
        case `${prefix}slidteks`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return
              ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            //if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
    
            await limitAdd(serial)
             const sleding = body.slice(8)
             if (!sleding) return tobz.reply(self, 'Kirim perintah *!slidingtext [teks]*\n\nContoh *!slidingtext ah mantap*', id)
             tobz.sendText(self, '_Sedang diproses, mohon tunggu sebentar!..._', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/slidingtext?text=${sleding}&apikey=${vhtearkey}`,`${sleding}.mp4`,`slidingtext ${sleding}`, id)        
             break 
        case `${prefix}searchteks`: 
         case `${prefix}googleteks`:
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)       
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *${prefix}searchteks [ |Teks1|Teks2|teks3 ]*, contoh *${prefix}searchteks |Rii||Banget*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                tobz.reply(self, mess.wait, id)
                const missing = argz[1]
                const missing2 = argz[2]
                const missing3 = argz[3]
                if (missing.length > 8) return tobz.reply(self, '*Teks1 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id)
                if (missing2.length > 8) return tobz.reply(self, '*Teks2 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id)
                if (missing3.length > 8) return tobz.reply(self, '*Teks2 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id)    
                tobz.sendFileFromUrl(self, `https://api.vhtear.com/googletext?text1=${missing}&text2=${missing2}&text3=${missing3}&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(self, `Wrong Format!\n[❗] Kirim perintah *.pornhub [ |Teks1|Teks2 ]*, contoh *.pornhub |Rii|Bot*`, id)
            }
            break                                                        
         case `${prefix}harta`:
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const jreng = body.slice(7)
             if (!jreng) return tobz.reply(self, `Kirim perintah *${prefix}tahta [teks]*\n\nContoh *${prefix}tahta Rii*`, id)
             if (jreng.length > 7) return tobz.reply(self, 'Minimal 7 Huruf!!', id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/hartatahta?text=${jreng}&apikey=${vhtearkey}`,`${jreng}.jpg`,`*Harta Tahta*\n _*By Rii*_`, id)        
             break  
         case `${prefix}silkteks`:
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const silktext = body.slice(10)
             if (!silktext) return tobz.reply(self, `Kirim perintah *${prefix}silkteks [teks]*\n\nContoh *${prefix}silkteks Rii*`, id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/silktext?text=${silktext}&apikey=${vhtearkey}`,`${silktext}.jpg`,`────────────────\n*Di Buat pada* : \n *${moment().format('DD/MM/YY HH:mm:ss')}*\n────────────────\n _*By Rii*_`, id)        
             break          
         case `${prefix}partytext`:
         case `${prefix}partyteks`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return         
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const partytext = body.slice(10)
             if (!partytext) return tobz.reply(self, `Kirim perintah *${prefix}partyteks [teks]*\n\nContoh *${prefix}partyteks Rii*`, id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/partytext?text=${partytext}&apikey=${vhtearkey}`,`${partytext}.jpg`,`────────────────\n*Di Buat pada* : \n *${moment().format('DD/MM/YY HH:mm:ss')}*\n────────────────\n _*By Rii*_`, id)        
             break  
         case `${prefix}romancetext`:
         case `${prefix}romanceteks`:
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const romancetext = body.slice(10)
             if (!romancetext) return tobz.reply(self, `Kirim perintah *${prefix}romanceteks [teks]*\n\nContoh *${prefix}romanceteks Rii*`, id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/romancetext?text=${romancetext}&apikey=${vhtearkey}`,`${romancetext}.jpg`,`────────────────\n*Di Buat pada* : \n *${moment().format('DD/MM/YY HH:mm:ss')}*\n────────────────\n _*By Rii*_`, id)        
             break   
         case `${prefix}teksmaker`:
         case `${prefix}textmaker`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return         
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const teksmaker1 = body.slice(10)
             if (!teksmaker1) return tobz.reply(self, `Kirim perintah *#teksmaker1 [teks]*\n\nContoh *#teksmaker1 Rii*`, id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/textmaker?text=${teksmaker1}&warna=green&apikey=${vhtearkey}`,`${teksmaker1}.jpg`,`────────────────\n*Di Buat pada* : \n *${moment().format('DD/MM/YY HH:mm:ss')}*\n────────────────\n _*By Rii*_`, id)        
             break      
         case `${prefix}lovemaker`:
         case `${prefix}textlove`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return         
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const love = body.slice(11)
             if (!love) return tobz.reply(self, 'Kirim perintah *#lovemaker [teks]*\n\nContoh *#lovemaker Rii*', id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/lovemessagetext?text=${love}&apikey=${vhtearkey}`,`${love}.jpg`,`────────────────\n*Di Buat pada* : \n *${moment().format('DD/MM/YY HH:mm:ss')}*\n────────────────\n _*By Rii*_`, id)        
             break      
         case `${prefix}glowmaker`:
         case `${prefix}textglow`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return         
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const glow = body.slice(11)
             if (!glow) return tobz.reply(self, 'Kirim perintah *.glowmaker [teks]*\n\nContoh *.glowmaker Rii*', id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/glowtext?text=${glow}&apikey=${vhtearkey}`,`${glow}.jpg`,`────────────────\n*Di Buat pada* : \n *${moment().format('DD/MM/YY HH:mm:ss')}*\n────────────────\n _*By Rii*_`, id)        
             break             
        case `${prefix}glitchtext`: 
        case `${prefix}glitchteks`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return         
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)       
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *.glitchteks  |Teks1|Teks2*, contoh *.glitchteks  |Teks1|Teks2*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                tobz.reply(self, mess.wait, id)
                const glitch1 = argz[1]
                const glitch2 = argz[2]
                if (glitch1.length > 8) return tobz.reply(self, '*Teks1 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id)
                if (glitch2.length > 8) return tobz.reply(self, '*Teks2 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id) 
                tobz.sendFileFromUrl(self, `https://api.vhtear.com/glitchtext?text1=${glitch1}&text2=${glitch2}}&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(self, `Wrong Format!\n[❗] Kirim perintah *.glitchteks  |Teks1|Teks2*, contoh *.glitchteks |Rii|Bot*`, id)
            }
            break   
        case `${prefix}lion`: 
        case `${prefix}logolion`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return         
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)       
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *.Lion  |Teks1|Teks2*, contoh *.lion  |Teks1|Teks2*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                tobz.reply(self, mess.wait, id)
                const glitch1 = argz[1]
                const glitch2 = argz[2]
                tobz.sendFileFromUrl(self, ` https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${glitch1}&text2=${glitch2}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(self, `Wrong Format!\n[❗] Kirim perintah *.glitchteks  |Teks1|Teks2*, contoh *.glitchteks |Rii|Bot*`, id)
            }
            break   
        case `${prefix}valentinetext`: 
        case `${prefix}valentinemaker`:
        case `${prefix}valenmaker`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return         
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)       
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *#valentinemaker  |Teks1|Teks2*, contoh *#valentinemaker  |Teks1|Teks2*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                tobz.reply(self, mess.wait, id)
                const valent1 = argz[1]
                const valent2 = argz[2]
                if (valent1.length > 8) return tobz.reply(self, '*Teks1 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id)
                if (valent2.length > 8) return tobz.reply(self, '*Teks2 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id) 
                tobz.sendFileFromUrl(self, `https://api.vhtear.com/valentine?t1=${valent1}&t2=${valent2}&l1=https://obs-sg.line-apps.com/os/p/u3ef45bfb65e4c101f9126ea9b5d3b1e5&l2=https://obs-sg.line-apps.com/os/p/ue69deccc9ec05714297bc08184f75a15&apikey=${vhtearkey}`)
                await limitAdd(serial)
            } else {
                await tobz.reply(self, `Wrong Format!\n[❗] Kirim perintah *#valentinemaker  |Teks1|Teks2*, contoh *#valentinemaker |Rii|Bot*`, id)
            }
            break                                                                          
        case `${prefix}fssarah`:
        case `${prefix}fsviloid`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return        
              ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)         
             tobz.reply(self, mess.wait, id)
             const srhe = body.slice(10)
             if (!srhe) return tobz.reply(self, 'Masukan nama!\nMax 8 huruf biar bagus!', id)
             await tobz.sendFileFromUrl(self, `https://rest.farzain.com/api/special/fansign/indo/viloid.php?apikey=ppqeuy&text=${srhe}`, `tytyd.jpg`, `nih..`, id)
             limitAdd(serial)
                break                                                   
         case `${prefix}waktuindo`:
          case `${prefix}jamindo`:
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            await tobz.sendText(self, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
            await limitAdd(serial)
            break 
        case `${prefix}reqfitur`:
        case `${prefix}requestfitur`:    
            if (args.length === 1) return tobz.reply(self, '[❗] Kirim perintah *!bugreport [teks]*\ncontoh : *!bugreport Permisi Owner, Ada bug pada command !otakudesu, Tolong diperbaiki*')
            const req = body.slice(11)
            if(!req) return
            if(isGroupMsg){
                tobz.sendText(ownerNumber, `*[REQ FITURE]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${req}`)
                tobz.reply(self, 'Request telah di sampaikan\nrequest aneh" tidak akan di tanggapi.' ,id)
            }else{
                tobz.sendText(ownerNumber, `*[REQ FITURE]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${req}`)
                tobz.reply(self, 'Request telah di sampaikan\nrequest aneh" tidak akan di tanggapi.', id)
            }
            break  
		case `${prefix}online`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return        
            //if (!isOwner) return tobz.reply(self, 'Perintah Hanya bisa digunakan oleh Owner!', id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)                
            try {
                let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : self
                let online = [(conn.chats.get(id).presences), conn.user.jid]
                tobz.sendTextWithMentions(self, `List Online:\n${online} ${id}`)
            } catch(err) {
                console.log(err)
                tobz.reply(self, `Maaf, Belum Ada Yang online`, id)    
            }
            break                                      
		case `${prefix}nyimak`:
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return        
            //if (!isOwner) return tobz.reply(self, 'Perintah Hanya bisa digunakan oleh Owner!', id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)                
            if (!quotedMsg) return tobz.reply(self, `Tolong Reply Pesan Bot`, id)
            if (!quotedMsgObj.fromMe) return tobz.reply(self, `Tolong Reply Pesan Bot`, id)
            try {
                const reader = await tobz.getMessageReaders(quotedMsgObj.id)
                let list = ''
                for (let pembaca of reader) {
                list += `- @${pembaca.id.replace(/@c.us/g, '')}\n` 
            }
                tobz.sendTextWithMentions(self, `Ciee, Ngeread...\n${list}`)
            } catch(err) {
                console.log(err)
                tobz.reply(self, `Maaf, Belum Ada Yang Membaca Pesan Bot atau Mereka Menonaktifkan Read Receipts`, id)    
            }
            break
        case `${prefix}tebakgambar`:  
            //if(isReg(obj)) return
            //if(cekumur(cekage)) return          
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
            const resp = await axios.get('https://api.vhtear.com/tebakgambar&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(self, resp.data.error, id)
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            tobz.sendFileFromUrl(self, resp.data.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Mtobzud Dari Gambar Ini_', id)
            tobz.sendText(self, `30 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(self, `20 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(self, `10 Detik Lagi...`, id)
            await sleep(10000)
            tobz.reply(self, jwban, id)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                tobz.sendText(ownerNumber, 'Tebak Gambar Error : ' + err)
           }
           break
        case `${prefix}family100`:   
            //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
            const resp = await axios.get('https://api.vhtear.com/family100&apikey=' + vhtearkey)
            if (resp.data.error) return tobz.reply(self, resp.data.error, id)
            const anm2 = `➸ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
            const jwban = `➸ Jawaban : ${resp.data.result.jawaban}`
            tobz.reply(self, anm2, id)
            tobz.sendText(self, `30 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(self, `20 Detik Lagi...`, id)
            await sleep(10000)
            tobz.sendText(self, `10 Detik Lagi...`, id)
            await sleep(10000)
            tobz.reply(self, jwban, id)
            } catch (err) {
                console.error(err.message)
                await tobz.sendFileFromUrl(self, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                tobz.sendText(ownerNumber, 'Family100 Error : ' + err)
           }
           break                                       
     /*  case `${prefix}pornhub`:
            ////if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
             //if (!isGroupMsg) return tobz.reply(self, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis!*\nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const pornhub = body.slice(10)
             if (!pornhub) return tobz.reply(self, 'Kirim perintah *.pornhub [teks]*\n\nContoh *.pornhub Rii*', id)
             if (pornhub.length > 10) return tobz.reply(self, '𝐌𝐚𝐤𝐬𝐢𝐦𝐚𝐥 10 𝐇𝐮𝐫𝐮𝐟!', id)
             //tobz.sendText(self, '*Sedang di proses*...', id)
             await tobz.sendFileFromUrl(self, `https://api.vhtear.com/pornlogo?text1=${pornhub}&text2=${pornhub}apikey=${vhtearkey}`,`${pornhub}.jpg`,`𝐍𝐢𝐡 𝐁𝐨𝐬𝐬!!`, id)        
             break            */
        case `${prefix}xxx`:
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (!isNsfw) return tobz.reply(self, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *#xxx* [ Judul ]`)
            const querXXX = body.slice(9)
            tobz.reply(self, mess.wait, id)
            try {
                const resxxx = await fetch(`https://api.vhtear.com/xxxsearch?query=${encodeURIComponent(querXXX)}&apikey=${vhtearkey}`)
                if (!resxxx.ok) throw new Error(`unexpected response ${resxxx.statusText}`)
                const resxxx2 = await resxxx.json()
                const { data } = await resxxx2.result
                let berhitung = 1
                let xixixi = `*「 XVIDEOS 」*\n\n*Hasil Pencarian : ${querXXX}*\n\n─────────────────\n\nKetik .getxxx [angka] untuk mengambil ID, Contoh : .getxxx 2\n`
                for (let i = 0; i < data.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${data[i].title}\n*Duration* : ${data[i].duration}\n*Perintah download* : *.getxxx ${data[i].url}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < data.length; ii++) {
                    xixixi += `(#)${data[ii].url}`
                }
                await tobz.sendFileFromUrl(self, data[0].image, 'thumbxxx.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                tobz.sendFileFromUrl(self, errorurl, 'error.png', '💔️ Maaf, XXX tidak ditemukan')
                tobz.sendText(ownerNumber, 'XXX Error : ' + err)
            }
            break
        case `${prefix}getxxx`:
            //if (!isAdmin) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin Rii!`, id)
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
			if (!isNsfw) return tobz.reply(self, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getxxx [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`)
                    if (!Number(args[1])) return tobz.reply(self, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *.getxxx 1*`, id)
                    const datavideo = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = datavideo.split('(#)')
                    console.log(pilur[args[1]])
                    tobz.reply(self, mess.wait, id)
                    const getxxx = await fetch(`https://api.vhtear.com/xxxdownload?link=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!getxxx.ok) throw new Error(`Error XXX : ${getxxx.statusText}`)
                    const getxxx2 = await getxxx.json()
                     if (getxxx2.status == false) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { title, urlVideo, response } = await getxxx2.result
                        console.log(`STATUS API : ${response}`)
                        let xixixi = `*「 XXX DOWNLOADER 」*\n\n${title}`
                        for (let i = 0; i < urlVideo.length; i++) {
                            xixixi += `\n─────────────────\n\n*Title* : ${urlVideo[i].title}\n*Default Quality* : ${urlVideo[i].defaultQuality}\n*Format* : ${urlVideo[i].format}\n*Quality* : ${urlVideo[i].quality}\n*Url Video* : ${urlVideo[i].videoUrl}\n\n`
                        }
                        const captions = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}\n\n*Ext* : MP4\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        tobz.sendFileFromUrl(self, `https://thumbs.dreamstime.com/b/xxx-neon-sign-dark-background-xxx-neon-sign-dark-background-vector-illustration-129829099.jpg`, `xxx.jpg`, xixixi, id)
                         await tobz.sendFileFromUrl(self, result, `${title}.mp4`, `Music telah terkirim ${pushname}`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    tobz.reply(self, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran videp.*`, id)
                } else {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`)
                    if (args[1] <= 25) return tobz.reply(self, `*Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian video!*`,)
                    tobz.reply(self, mess.wait, id)
                    const getxxx = await fetch(`https://api.vhtear.com/xxxsearch?link=${pilur[args[1]]}&apikey=${vhtearkey}`)
                    if (!getxxx.ok) throw new Error(`Error XXX : ${getxxx.statusText}`)
                    const getxxx2 = await getxxx.json()
                     if (getxxx2.status == false) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(getxxx2.result.data.duration.split(':')[0]) > 5) return tobz.sendFileFromUrl(self, imgUrl, `thumb.jpg`, `*「 XXX DOWNLOADER 」*\n\n*Website* : XVideos\n\n*Ext* : MP4\n*Link* : ${shortvidxv2}\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`, id)
                        const { title, urlVideo, response } = await getxxx2.result
                        console.log(`STATUS API : ${response}`)
                        let xixixi = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}`
                        for (let i = 0; i < urlVideo.length; i++) {
                            xixixi += `\n─────────────────\n\n*Default Quality* : ${urlVideo[i].defaultQuality}\n*Format* : ${urlVideo[i].format}\n*Quality* : ${urlVideo[i].quality}\n*Url Video* : ${urlVideo[i].videoUrl}\n\n`
                        }
                        const captions = `*「 XXX DOWNLOADER 」*\n\n*Title* : ${title}\n\n*Ext* : MP4\n\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        tobz.sendFileFromUrl(self, `https://thumbs.dreamstime.com/b/xxx-neon-sign-dark-background-xxx-neon-sign-dark-background-vector-illustration-129829099.jpg`, `xxx.jpg`, xixixi, id)
                        await tobz.sendFileFromUrl(self, result, `${title}.mp4`, `Music telah terkirim ${pushname}`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error XVideos : '+ err)
                tobz.reply(self, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break
      /* case `${prefix}xvideos`:
            //if (!isVipUser) return tobz.reply(self, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6285349607186_ ', id)
            if (!isNsfw) return tobz.reply(self, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return tobz.reply(self, `Kirim perintah *#xvideos* [ Lagu ]`)
            const querVID = body.slice(9)
            tobz.reply(self, mess.wait, id)
            try {
                const resvid = await fetch(`https://mnazria.herokuapp.com/api/porn?search=${encodeURIComponent(querVID)}`)
                if (!resvid.ok) throw new Error(`unexpected response ${resvid.statusText}`)
                const jsonserxvid = await resvid.json()
                const { result } = await jsonserxvid
                let berhitung = 1
                let xixixi = `*「 XVIDEOS 」*\n\n*Hasil Pencarian : ${querVID}*\n\n─────────────────\n\nKetik .getxvideos [angka] untuk mengambil ID, Contoh : .getxvideos 2\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n*Urutan* : ${berhitung+i}\n*Title* : ${result[i].title}\n*Actors* : ${result[i].actors}\n*Durasi* : ${result[i].duration}\n*Perintah download* : *.getxvideos ${result[i].url}*\n`
                }
                    xixixi += `\n\n`
                for (let ii = 0; ii < result.length; ii++) {
                    xixixi += `(#)${result[ii].url}`
                }
                await tobz.sendFileFromUrl(self, result[0].image, 'thumbxvid.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
                tobz.sendFileFromUrl(self, errorurl, 'error.png', '💔️ Maaf, Xvideos tidak ditemukan')
                tobz.sendText(ownerNumber, 'Xvideos Error : ' + err)
            }
            break*/
       /* case `${prefix}getxvideos`:
            if (!isAdmin) return tobz.reply(self, `Perintah ini hanya bisa di gunakan oleh Admin Rii!`, id)
            if (!isNsfw) return tobz.reply(self, `command/Perintah NSFW belum di aktifkan di group ini!`, id)
            if (!isGroupMsg) return tobz.reply(self, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return tobz.reply(self, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsg && quotedMsg.type == 'image') {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`)
                    if (!Number(args[1])) return tobz.reply(self, `*Apabila ditag hanya cantumkan nomer urutan bukan ID Download!*\nContoh : *.getxvideos 1*`, id)
                    const datavideo = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    const pilur = datavideo.split('(#)')
                    console.log(pilur[args[1]])
                    tobz.reply(self, mess.wait, id)
                    const vidxvid = await fetch(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`)
                    if (!vidxvid.ok) throw new Error(`Error Get Video : ${vidxvid.statusText}`)
                    const vidxvideo = await vidxvid.json()
                     if (vidxvideo.status == false) {
                        tobz.reply(self, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        try{
                        const { mp4 } = await vidxvideo
                        const shortvidxv = await urlShortener(mp4)
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n*Ext* : MP3\n\n*Silahkan download file media sedang melalui link yang tersedia.*\n${shortvidxv}`
                        tobz.sendFileFromUrl(self, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                        // await tobz.sendFileFromUrl(self, result, `${title}.mp3`, `XVIDEOS Rii`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                        } catch (err){
                            console.log(err)
                        }
                    }    
                } else if (quotedMsg && quotedMsg.type == 'chat') { 
                    tobz.reply(self, `*Salah tag! hanya tag pesan berisi data hasil dari penelusuran videp.*`, id)
                } else {
                    if (args.length === 1) return tobz.reply(self, `Kirim perintah *.getxvideos [ Id Download ]*, untuk contoh silahkan kirim perintah *.readme*`)
                    if (args[1] <= 25) return tobz.reply(self, `*Apabila ingin mengambil data video dengan nomor urutan, mohon tag pesan bot tentang pencarian videp!*`,)
                    tobz.reply(self, mess.wait, id)
                    const getvide = await get.get(`https://mnazria.herokuapp.com/api/porndownloadxvideos?url=${pilur[args[1]]}`).json
                    if (getvide.error) {
                        tobz.reply(self, getvide.error, id)
                    } else {
                        const { mp4 } = await mhankyt35
                        const shortvidxv2 = await urlShortener(mp4)
                        console.log(`CHANGE API BARBAR : ${ext}\n${filesize}\n${status}`)
                        const captions = `*「 XVIDEOS DOWNLOADER 」*\n\n*Website* : XVideos\n\n*Ext* : MP4\n*Link* : ${shortvidxv2}\n*Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit*`
                        tobz.sendFileFromUrl(self, `https://sensorstechforum.com/wp-content/uploads/2019/07/xvideos-virus-image-sensorstechforum-com.jpg`, ``, captions, id)
                        // await tobz.sendFileFromUrl(self, result, `${title}.mp3`, `Music telah terkirim ${pushname}`, id).catch(() => tobz.reply(self, mess.error.Yt4, id))
                        await limitAdd(serial)
                   }
                }
            } catch (err) {
                tobz.sendText(ownerNumber, 'Error XVideos : '+ err)
                tobz.reply(self, `*Kesalahan! Pastikan id download sudah benar.*`, id)
                console.log(err)
            }
            break*/
		/*case `${prefix}klasemen`:
		case `${prefix}klasmen`:
			if (!isGroupMsg) return tobz.reply(self, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
			const klasemen = db.get('group').filter({id: groupId}).map('members').value()[0]
            let urut = Object.entries(klasemen).map(([key, val]) => ({id: key, ...val})).sort((a, b) => b.denda - a.denda);
            let textKlas = "*Klasemen Denda Sementara*\n"
            let i = 1;
            urut.forEach((klsmn) => {
            textKlas += i+". @"+klsmn.id.replace('@c.us', '')+" ➤ Rp"+formatin(klsmn.denda)+"\n"
            i++
            });
            await tobz.sendTextWithMentions(self, textKlas)
			break*/
						
		default:
            //if (!isGroupMsg) return tobz.reply(self, `Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup tobz, Link Ada Di Bio atau Bisa Mengetik ${prefix}Riigroup!`, id)
            if (command.startsWith(`${prefix}`)) {
                tobz.reply(self, `
──────────────────                    
Hei ${pushname}! 
Command / Perintah *${args[0]}* 
Tidak Terdaftar Di Dalam *${prefix}menu*
──────────────────`, id)
            }
            //await tobz.sendSeen(self) 
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //tobz.kill().then(a => console.log(a))
    }
}

