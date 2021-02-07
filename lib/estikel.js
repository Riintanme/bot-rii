const fetch = require('node-fetch')
const emojiUnicode = require("emoji-unicode")

const estikel = emojiUnicode((emoji) => new Promise((resolve, reject) => {
    fetch('https://api.vhtear.com/emojitopng?code=' + encodeURIComponent(emoji) + '&apikey=Ixyzovskvgakhafalriintanickh', {
            method: 'GET',
        })
        .then(async res => {
            const text = await res.json()

            resolve(text)

        })
        .catch(err => reject(err))
}));
exports.estikel = estikel