const fs = require('fs-extra')

module.exports = welcome = async (tobz, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await tobz.getChatById(event.chat)
            const pChat = await tobz.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const intru = (`
╭════•›ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙‹•════
│          NEW MEMBER INTRO✨   
│ Nama    : 
│ Umur    : 
¦ Status  : 
| Askot   : 
│           S a l k e n    
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙═════╯`)
            const pepe = await tobz.getProfilePicFromServer(event.who) 
            const capt = `Halo @${event.who.replace('@c.us', '')} ${intru}`
            if (pepe == '' || pepe == undefined) {
                await tobz.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg')
            } else {
                await tobz.sendFileFromUrl(event.chat, pepe, 'profile.jpg')
                tobz.sendTextWithMentions(event.chat, capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
