const Utility = require('../Utility.js');
const Word = require('../words_dictionary.json');
require('dotenv').config();

module.exports = function (guild) {
    this.guild = guild,
        this.totalKata = Word.length,
        this.utilityObj = new Utility(this.guild),

        this.gameFastHand = function (message) {
            let pesan = "**FAST HAND**\nDiberikan 3 huruf, pemain harus menebak secepatnya kata apa yang benar\nPemain : \n\n";
            pesan += this.utilityObj.playerList();
            pesan += "\nTekan 🤚 untuk bergabung, tekan ✅ untuk memulai permainan";
            message.channel.send(pesan).then((m) => {
                m.react("🤚");
                m.react("✅");
                let userReact;
                let filter = (reaction, user) => {
                    userReact = user;
                    return ['✅', '🤚'].includes(reaction.emoji.name) && user.id != process.env.BOT_ID;
                };
                m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                    if (react.first().emoji.name === '✅' && userReact.id === this.guild.starterId) {
                        m.delete({ timeout: 100 });
                        message.channel.send("Permainan dimulai");
                        this.guild.gameLobby = false;
                        this.guild.gameStart = true;
                        this.guild.gameType = 1;
                        this.guild.channelId = m.channel.id;
                        this.progressFastHand(message);
                    }
                    else if (react.first().emoji.name === '🤚') {
                        let cari = this.guild.player.some(e => e.id === userReact.id);
                        if (cari) {
                            message.channel.send("Pemain sudah terdaftar").then((msg) => {
                                msg.delete({ timeout: 3000 });
                            });
                        }
                        else {
                            this.guild.player.push({ type: "player", id: userReact.id, name: userReact.username, score: 0 });
                        }
                        m.delete({ timeout: 100 });
                        this.gameFastHand(message);
                    }
                }).catch((e) => {
                    console.log(e);
                });
            });
        },

        this.progressFastHand = function (message) {
            while (this.guild.fasthand.tebakKata.length < 3) {
                let index = Math.floor(Math.random() * this.totalKata);
                this.guild.fasthand.tebakKata = Word[index];
            }
            let ambil = Math.floor(Math.random() * (this.guild.fasthand.tebakKata.length - 3));
            this.guild.fasthand.tebakKata = this.guild.fasthand.tebakKata.substring(ambil, ambil + 3);
            message.channel.send("Tebak kata yang mengandung **" + this.guild.fasthand.tebakKata + "**");
        },

        this.checkFastHand = function (message) {
            if (message.content.indexOf(this.guild.fasthand.tebakKata) != -1) {
                if (Word.findIndex((e) => {
                    return e === message.content
                }) != -1) {
                    let indexPenjawab = this.guild.player.findIndex((e) => {
                        return e.id === message.author.id;
                    });
                    if (indexPenjawab != -1) {
                        this.guild.player[indexPenjawab].score++;
                        message.channel.send("<@" + this.guild.player[indexPenjawab].id + "> benar\nSkor : " + this.guild.player[indexPenjawab].score);
                        let indexPemenang = this.guild.player.findIndex((e) => {
                            return e.score == this.guild.fasthand.maximumScore;
                        });
                        if (indexPemenang != -1) {
                            message.channel.send("<@" + this.guild.player[indexPenjawab].id + "> Menang");
                            this.utilityObj.hentikanPermainan();
                        } else {
                            this.guild.fasthand.tebakKata = "";
                            this.progressFastHand(message);
                        }
                    }
                }
            }
        }
}