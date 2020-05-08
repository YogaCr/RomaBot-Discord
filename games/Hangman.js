const Utility = require('../Utility.js');
const Word = require('../words_dictionary.json');
require('dotenv').config();

module.exports = function (guild) {
    this.guild = guild,
        this.totalKata = Word.length,
        this.hangmanCharacter = [
            "___",
            ".| ",
            "😣",
            "/|\\",
            ".|",
            "/ \\"],
        this.utilityObj = new Utility(guild),
        this.gameHangMan = function (message, client) {
            let pesan = "**HANGMAN**\nPemain harus menebak kata/kalimat dari pemain lain,diberi percobaan sebanyak 5 kali\nPemain : \n\n";
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
                        if (this.guild.player.length == 1) {
                            this.guild.player.push({
                                name: "bot",
                                type: "bot",
                                id: "bot"
                            })
                            message.channel.send("Karena anda hanya sendiri, maka saya tambahkan bot");
                            this.guild.hangman.pemberiKata = "bot";
                        } else {
                            let random = Math.floor(Math.random() * this.guild.player.length);
                            this.guild.hangman.pemberiKata = this.guild.player[random].id;
                            message.guild.members.cache.get(this.guild.hangman.pemberiKata).user.send("Anda dipilih untuk menetapkan kata/kalimat yang akan ditebak\nSilahkan balas pesan ini dengan kata/kalimat yang akan ditebak.");
                        }
                        this.guild.channelId = m.channel.id;
                        this.guild.gameLobby = false;
                        this.guild.gameStart = true;
                        this.guild.gameType = 3;
                        message.channel.send("Permainan dimulai\nMenunggu kata atau kalimat yang akan ditebak.");
                        if (guild.player.findIndex((e) => {
                            return e.type === "bot";
                        }) != -1) {
                            let index = Math.floor(Math.random() * this.totalKata);
                            this.guild.hangman.tebakKata = Word[index];
                            this.guild.hangman.tebakKata.split('').forEach((e) => {
                                if (e != " ") {
                                    this.guild.hangman.sudahDitebak += "_";
                                } else {
                                    this.guild.hangman.sudahDitebak += " ";
                                }
                            });
                            message.channel.send("Kata atau kalimat yang akan ditebak sudah ditentukan, silahkan menebak");
                            this.showHangmanProgress(message);
                        }
                    }
                    else if (react.first().emoji.name === '🤚') {
                        let cari = this.guild.player.some(e => e.id === userReact.id);
                        if (cari) {
                            message.channel.send("Pemain sudah terdaftar").then((msg) => {
                                msg.delete({ timeout: 3000 });
                            });
                        }
                        else {
                            this.guild.player.push({ type: "player", id: userReact.id, name: userReact.username });
                        }
                        m.delete({ timeout: 100 });
                        this.gameHangMan(message, client);
                    }
                }).catch((e) => {
                    console.log(e);
                });
            });
        },
        this.progressHangMan = function (message) {
            if (message.author.id == this.guild.hangman.pemberiKata) {
                return;
            }
            if (this.guild.player.findIndex((e) => {
                return e.id === message.author.id;
            }) != -1) {
                if (message.content.length != 1) {
                    message.channel.send("Tolong kirim hanya 1 huruf");
                } else {
                    if (this.guild.hangman.tebakKata.includes(message.content.toLowerCase())) {
                        if (this.guild.hangman.sudahDitebak.includes(message.content.toLowerCase())) {
                            message.channel.send("Huruf ini sudah ditebak");
                        } else {
                            message.channel.send("Tebakan benar");
                            let replacement = ""
                            for (var x = 0; x < this.guild.hangman.tebakKata.length; x++) {
                                if (this.guild.hangman.tebakKata.charAt(x) === message.content.toLowerCase()) {
                                    replacement += message.content.toLowerCase();
                                } else {
                                    replacement += this.guild.hangman.sudahDitebak.charAt(x);
                                }
                            }
                            this.guild.hangman.sudahDitebak = replacement;
                            if (this.guild.hangman.sudahDitebak === this.guild.hangman.tebakKata) {
                                let pemenang = "";
                                this.guild.player.filter((e) => { return e.id != this.guild.hangman.pemberiKata; }).forEach((e) => { pemenang += "**" + e.name + "**, " });
                                pemenang += "menang";
                                this.showHangmanProgress(message);
                                message.channel.send(pemenang);
                                this.utilityObj.hentikanPermainan();
                                return;
                            }
                        }
                    } else {
                        this.guild.hangman.percobaan--;
                        message.channel.send("Tebakan salah\nSisa percobaan : " + this.guild.hangman.percobaan);
                        if (this.guild.hangman.percobaan == 0) {
                            this.showHangmanProgress(message);
                            message.channel.send("Tebakan : " + this.guild.hangman.tebakKata + "\n**" + this.guild.player.find((e) => {
                                return e.id === this.guild.hangman.pemberiKata;
                            }).name + "** pemenangnya");
                            this.utilityObj.hentikanPermainan();
                            return;
                        }

                    }
                    this.showHangmanProgress(message);
                }
            }
        },
        this.mulaiHangman = function (client) {
            client.channels.cache.get(this.guild.channelId).send("Kata atau kalimat yang akan ditebak sudah ditentukan, silahkan menebak\n" + this.guild.hangman.sudahDitebak).then((m) => {
                this.guild.hangman.tebakKata.split('').forEach((e) => {
                    if (e != " ") {
                        this.guild.hangman.sudahDitebak += "_";
                    } else {
                        this.guild.hangman.sudahDitebak += " ";
                    }
                });
                this.showHangmanProgress(m);
            });


        },
        this.showHangmanProgress = (message) => {
            let pesan = "Yang ditebak : ``";
            this.guild.hangman.sudahDitebak.split('').forEach((e) => {
                if (e != " ") {
                    pesan += e;
                } else {
                    pesan += " ";
                }
                pesan += " ";
            })
            pesan += "``\nHangman progress :```";
            let hang = "";
            for (var x = 0; x < 5 - this.guild.hangman.percobaan + 1; x++) {
                hang += "\n" + this.hangmanCharacter[x];
            }
            pesan += hang + "```";
            message.channel.send(pesan);
        }
}