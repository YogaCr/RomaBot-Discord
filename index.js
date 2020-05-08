const Discord = require('discord.js');
const UlarTangga = require("./games/UlarTangga.js");
const Utility = require('./Utility.js');
const FastHand = require('./games/FastHand.js');
const SearchYoutube = require('./SearchYoutube.js');
const Monopoly = require('./games/Monopoly.js');
const HangMan = require('./games/Hangman.js');
require('dotenv').config();

const prefix = "r*";
const client = new Discord.Client();

var serverList = [
    /*{
        guildId: '',
        player: [],
        gameTurn: 0,
        gameLobby: false,
        gameStart: false,
        gameType: -1,
        channelId:"",
        starterId: "",
        fasthand:{
            tebakKata:"",
            maximumScore:0,
        },
        hangman:{
            tebakKata:"",
            percobaan:5,
            pemberiKata:"",
            sudahDitebak:""
        },
        monopoly:{
            kaliDaduKembar:0,
            faseBangun:false,
            faseTukar:false
        }
    }*/
]

client.once('ready', () => {
    console.log('Ready!');
    client.user.setStatus('available')
    client.user.setActivity('r*help for guide | Escaping From Depression | https://github.com/YogaCr');
});

client.on('message', (message) => {
    if (message.channel.type == "dm" && message.author.id != process.env.BOT_ID) {
        let guildIndex = serverList.findIndex((e) => {
            return e.hangman.pemberiKata === message.author.id && e.gameType == 3 && e.gameStart == true;
        })
        console.log(guildIndex);
        if (guildIndex != -1) {
            serverList[guildIndex].hangman.tebakKata = message.content.toLowerCase();
        }
        let hangManObj = new HangMan(serverList[guildIndex]);
        hangManObj.mulaiHangman(client);
        return;
    }
    else if (message.channel.type === "text") {
        checkServer(message);

        let guild = serverList.find((e) => {
            return e.guildId === message.guild.id;
        });
        if (message.content.toLowerCase() === "lmoa") {
            message.channel.send("https://media1.tenor.com/images/3ca6458de2780680eb1b956dfe234a15/tenor.gif");
        }
        if (message.content.toLowerCase() === "nonono") {
            message.channel.send("https://media.tenor.com/images/bc112882a77db08c53e072765be4fe1e/tenor.gif");
        }
        if (message.content.toLowerCase().startsWith(prefix)) {
            let pesan = message.content.toLowerCase().split(" ");
            if (pesan[0] === prefix + "search") {
                let searchYoutubeObj = new SearchYoutube();
                searchYoutubeObj.searchYoutube(pesan, message);
            }
            else if (pesan[0] === prefix + "help") {
                sendHelpCommand(message);
            }
            else if (pesan[0] === prefix + "ulartangga") {
                let ularTanggaObj = new UlarTangga(guild);
                if (pesan[1] === "-position") {
                    if (!guild.gameStart) {
                        return message.channel.send("Permainan belum dimulai");
                    }
                    ularTanggaObj.cekPosisiUlarTangga(message);
                } else {
                    if (guild.gameLobby || guild.gameStart) {
                        message.channel.send("Masih ada game yang berjalan");
                    } else {
                        guild.starterId = message.author.id;
                        guild.player.push({ type: "player", id: message.author.id, name: message.author.username, position: 1 });
                        ularTanggaObj.gameUlarTangga(message);
                    }
                }
            }
            else if (pesan[0] === prefix + "monopoly") {
                let monopolyObj = new Monopoly(guild);
                if (pesan[1] === "-position") {
                    if (!guild.gameStart) {
                        return message.channel.send("Permainan belum dimulai");
                    }
                } else {
                    if (guild.gameLobby || guild.gameStart) {
                        message.channel.send("Masih ada game yang berjalan");
                    } else {
                        guild.starterId = message.author.id;
                        guild.player.push({ type: "player", id: message.author.id, name: message.author.username, position: 0, money: 2000, penjara: false, turnPenjara: 0 });
                        monopolyObj.gameMonopoly(message);
                    }
                }
            }
            else if (pesan[0] === prefix + "fasthand") {
                if (guild.gameLobby || guild.gameStart) {
                    return message.channel.send("Ada game yang sedang berjalan");
                }
                let maxScoreIndex = pesan.findIndex((e) => {
                    return e.substring(0, 10) === "-maxscore=";
                });
                if (maxScoreIndex != -1) {
                    try {
                        guild.fasthand.maximumScore = pesan[maxScoreIndex].substring(10) / 1;
                        message.channel.send("Skor maksimum diubah menjadi " + pesan[maxScoreIndex].substring(10));
                    }
                    catch (e) {
                        return message.channel.send("Tolong masukkan skor maksimum yang valid (angka)");
                    }
                } else {
                    guild.fasthand.maximumScore = 10;
                }
                let fastHandObj = new FastHand(guild);
                guild.gameLobby = true;
                guild.starterId = message.author.id;
                guild.player.push({ id: message.author.id, name: message.author.username, score: 0 });
                fastHandObj.gameFastHand(message);
            }
            else if (pesan[0] == prefix + "hangman") {
                if (guild.gameLobby || guild.gameStart) {
                    return message.channel.send("Ada game yang sedang berjalan");
                }
                let hangManObj = new HangMan(guild);
                guild.gameLobby = true;
                guild.starterId = message.author.id;
                guild.player.push({ id: message.author.id, name: message.author.username, type: "player" });
                hangManObj.gameHangMan(message, client);
            }
            else if (pesan[0] == prefix + "stop" && message.author.id === guild.starterId) {
                let utilityObj = new Utility(guild);
                utilityObj.hentikanPermainan();
                message.channel.send("Semua permainan dihentikan");
            }
        }
        else {
            if (guild.gameStart && message.channel.id === guild.channelId) {
                if (guild.gameType == 1) {
                    let fastHandObj = new FastHand(guild);
                    fastHandObj.checkFastHand(message);
                }
                else if (guild.gameType == 3) {
                    let hangManObj = new HangMan(guild);
                    hangManObj.progressHangMan(message);
                }
            }
        }
    }
})

function checkServer(message) {
    if (serverList.findIndex((e) => {
        return e.guildId === message.guild.id;
    }) == -1) {
        serverList.push(
            {
                guildId: message.guild.id,
                player: [],
                gameTurn: 0,
                gameLobby: false,
                gameStart: false,
                gameType: -1,
                starterId: "",
                channelId: "",
                fasthand: {
                    tebakKata: "",
                    maximumScore: 0,
                },
                hangman: {
                    tebakKata: "",
                    percobaan: 5,
                    pemberiKata: "",
                    sudahDitebak: ""
                },
                monopoly: {
                    kaliDaduKembar: 0,
                    faseBangun: false,
                    faseTukar: false
                }
            }
        )
    }
}

function sendHelpCommand(message) {
    const embedMessage = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Command List')
        .addFields(
            { name: "**r*help**", value: "Menampilkan list command\n**-----------------------------------------------**" },
            { name: "**r*search {judul} {optional:-p=(number)}**", value: "Menampilkan video Youtube berdasarkan pencarian\n\noptional :\n-p {maxpage} batas video yang dicari (default:10)\n\ncontoh :\nr*search Minecraft Pewdiepie -p=5\n**-----------------------------------------------**" },
            { name: "**r*ulartangga {optional:-position}**", value: "Bermain permainan ular tangga\n\noptional:\n-position : menampilkan posisi pemain\n**-----------------------------------------------**" },
            { name: "**r*fasthand {optional:-maxscore=(number)}**", value: "Bermain tebakan kata (dalam bahasa inggris), siapa cepat dia pemenangnya\n\noptional:\n-maxscore : mengubah maximum score yang harus dicapai (default:10)\n**-----------------------------------------------**" },
            { name: "**r*hangman**", value: "Bermain hangman, diberikan 5 kali percobaan untuk menebak huruf yang tepat sehingga membentuk kata atau kalimat yang benar\n**-----------------------------------------------**" },
            { name: "Gif Reaction", value: "Beberapa pesan berikut akan direspon oleh bot berupa gif image:\nlmoa\nnonono" }
        )

    message.channel.send(embedMessage);
}

client.login(process.env.TOKEN);