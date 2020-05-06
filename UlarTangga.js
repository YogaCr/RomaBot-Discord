const Discord = require('discord.js');
const Utility = require('./Utility.js');
require('dotenv').config();

module.exports = function (guild) {
    this.guild = guild,
        this.utilityObj = new Utility(guild),
        this.petakUlarTanggaSpecial = [
            { from: 4, to: 14 },
            { from: 9, to: 31 },
            { from: 17, to: 7 },
            { from: 20, to: 38 },
            { from: 28, to: 84 },
            { from: 40, to: 59 },
            { from: 51, to: 67 },
            { from: 54, to: 34 },
            { from: 62, to: 19 },
            { from: 63, to: 81 },
            { from: 64, to: 60 },
            { from: 71, to: 91 },
            { from: 87, to: 24 },
            { from: 93, to: 73 },
            { from: 95, to: 75 },
            { from: 99, to: 78 },
        ],
        this.gameUlarTangga = function (message) {
            let pesan = "";
            this.guild.gameLobby = true;
            pesan = "**ULAR TANGGA**\nGulir dadu sampai anda menuju titik finish.\nBerikut adalah pemain dari permainan ular tangga :\n\n"
            pesan += this.utilityObj.playerList();
            pesan += "\nTekan 🤚 untuk bergabung, tekan  💻  untuk menambahkan bot, tekan ✅ untuk memulai permainan";
            message.channel.send(pesan).then((m) => {
                m.react("🤚");
                m.react("💻");
                m.react("✅");
                let userReact;
                let filter = (reaction, user) => {
                    userReact = user;
                    return ['✅', '🤚', '💻'].includes(reaction.emoji.name) && user.id != process.env.BOT_ID;
                };
                m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then((react) => {
                    if (react.first().emoji.name === '✅' && userReact.id === this.guild.starterId) {
                        m.delete({ timeout: 100 });
                        this.guild.gameLobby = false;
                        this.guild.gameStart = true;
                        this.guild.gameType = 0;
                        message.channel.send("Permainan dimulai");
                        this.progressUlarTangga(message);
                    }
                    else if (react.first().emoji.name === '🤚') {
                        let cari = this.guild.player.some(e => e.id === userReact.id);
                        if (cari) {
                            message.channel.send("Pemain sudah terdaftar").then((msg) => {
                                msg.delete({ timeout: 3000 });
                            })
                        }
                        else {
                            this.guild.player.push({ type: "player", id: userReact.id, name: userReact.username, position: 1 });
                        }
                        m.delete({ timeout: 100 });
                        this.gameUlarTangga(message);
                    }
                    else if (react.first().emoji.name === '💻') {
                        let cari = this.guild.player.some(e => e.type === "bot");
                        if (cari) {
                            message.channel.send("Pemain sudah terdaftar").then((msg) => {
                                msg.delete({ timeout: 3000 });
                            })
                        }
                        else {
                            this.guild.player.push({ type: "bot", name: "bot", position: 1 });
                        }
                        m.delete({ timeout: 100 });
                        this.gameUlarTangga(message);
                    }
                }).catch((e) => {
                    console.log(e);
                });
            });
        },
        this.progressUlarTangga = function (message) {
            if (this.guild.player[this.guild.gameTurn].type === "player") {
                message.channel.send("**Giliran <@" + this.guild.player[this.guild.gameTurn].id + ">, silahkan klik dadu di bawah**")
                    .then((m) => {
                        try {
                            m.react("🎲");
                            let filter = (reaction, user) => {
                                return ['🎲'].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                            };
                            m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then((react) => {
                                if (react.first().emoji.name === '🎲') {
                                    m.reactions.removeAll();
                                    this.rollDaduUlarTangga(m);
                                    m.delete({ timeout: 5000 });
                                }
                            }).catch((e) => {
                                console.log(e);
                            });
                        }
                        catch (e) {

                        }
                    });
            }
            else {
                message.channel.send("**Giliran bot**").then((msg) => {
                    this.rollDaduUlarTangga(message);
                    msg.delete({ timeout: 5000 });
                });
            }
        },
        this.rollDaduUlarTangga = function (message) {
            let dadu = Math.floor(Math.random() * 6) + 1;
            let pesan = "Dadu yang anda gulir bernilai " + dadu;
            this.guild.player[this.guild.gameTurn].position += dadu;
            if (this.guild.player[this.guild.gameTurn].position > 100) {
                pesan += "\nKarena posisi **" + this.guild.player[this.guild.gameTurn].name + "** melebihi 100, maka **" + this.guild.player[this.guild.gameTurn].name + "** mundur senilai " + (this.guild.player[this.guild.gameTurn].position - 100);
                this.guild.player[this.guild.gameTurn].position = 100 - (this.guild.player[this.guild.gameTurn].position - 100);
            }
            pesan += this.cekPetakUlarTangga();
            pesan += "\nLokasi **" + this.guild.player[this.guild.gameTurn].name + "** saat ini : " + this.guild.player[this.guild.gameTurn].position;
            pesan += "\n**---------------------------------------------------------**";
            message.channel.send(pesan).then((msg) => {
                msg.delete({ timeout: 5000 });
            });
            if (this.guild.player[this.guild.gameTurn].position == 100) {
                message.channel.send("<@" + this.guild.player[this.guild.gameTurn].position + "> pemenangnya");
                this.utilityObj.hentikanPermainan();
                return;
            }
            if (this.guild.gameTurn + 1 < this.guild.player.length) {
                this.guild.gameTurn++;
            } else {
                this.guild.gameTurn = 0;
            }
            this.progressUlarTangga(message);
        },
        this.cekPetakUlarTangga = function () {
            let pesan = "";
            this.petakUlarTanggaSpecial.forEach((e) => {
                if (e.from == this.guild.player[this.guild.gameTurn].position) {
                    pesan = "\nKarena **" + this.guild.player[this.guild.gameTurn].name + "** menduduki petak " + e.from;
                    if (e.from > e.to) {
                        pesan += " maka **" + this.guild.player[this.guild.gameTurn].name + "** turun menuju petak ";
                    }
                    else {
                        pesan += " maka **" + this.guild.player[this.guild.gameTurn].name + "** naik menuju petak ";
                    }
                    pesan += e.to;
                    this.guild.player[this.guild.gameTurn].position = e.to;
                }
            })
            return pesan;
        },
        this.cekPosisiUlarTangga = function (message) {
            message.channel.send("Berikut layout dari ular tangga :\nhttps://media.hitekno.com/thumbs/2018/12/22/51452-permainan-ular-tangga/o-img-51452-permainan-ular-tangga.jpg")
            let urutan = "";
            this.guild.player.forEach((e) => {
                urutan += e.name + " (position : " + e.position + ")\n";
            })
            let embedMesage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Posisi Pemain Ular Tangga')
                .setDescription(urutan);
            message.channel.send(embedMesage);
        }
}