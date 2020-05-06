const Discord = require('discord.js');
const UlarTangga = require("./UlarTangga.js");
const Utility = require('./Utility.js');
const FastHand = require('./FastHand.js');
const SearchYoutube = require('./SearchYoutube.js');
const Monopoly = require('./Monopoly.js');
require('dotenv').config();

const prefix = "y*";
const client = new Discord.Client();

var serverList = [
    /*{
        guildId: '',
        player: [],
        gameTurn: 0,
        gameLobby: false,
        gameStart: false,
        gameType: -1,
        tebakKata: "",
        starterId: "",
        maximumScore:0,
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
    client.user.setActivity('Escaping From Depression | https://github.com/YogaCr');
});

client.on('message', (message) => {
    checkServer(message);

    let guild = serverList.find((e) => {
        return e.guildId === message.guild.id;
    });
    if(message.content==="lmoa"){
        message.channel.send("https://tenor.com/bcN98.gif");
    }
    if (message.content.startsWith(prefix)) {
        let pesan = message.content.split(" ");
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
                    guild.maximumScore = pesan[maxScoreIndex].substring(10) / 1;
                    message.channel.send("Skor maksimum diubah menjadi " + pesan[maxScoreIndex].substring(10));
                }
                catch (e) {
                    return message.channel.send("Tolong masukkan skor maksimum yang valid (angka)");
                }
            } else {
                guild.maximumScore = 10;
            }
            let fastHandObj = new FastHand(guild);
            guild.gameLobby = true;
            guild.starterId = message.author.id;
            guild.player.push({ id: message.author.id, name: message.author.username, score: 0 });
            fastHandObj.gameFastHand(message);
        }
        else if (pesan[0] == prefix + "stop" && message.author.id === guild.starterId) {
            let utilityObj = new Utility(guild);
            utilityObj.hentikanPermainan();
            message.channel.send("Semua permainan dihentikan");
            clearTimeout();
        }
    }
    else {
        if (guild.gameStart && guild.gameType == 1) {
            let fastHandObj = new FastHand(guild);
            fastHandObj.checkFastHand(message);
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
                tebakKata: "",
                starterId: "",
                maximumScore: 0,
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
        .setColor('#0099ff')
        .setTitle('List Command')
        .addFields(
            { name: "**y*help**", value: "Menampilkan list command" },
            { name: "**y*search {judul} {optional:-p}**", value: "Menampilkan video Youtube berdasarkan pencarian\n\noptional :\n-p {maxpage} batas video yang dicari (default:10)\n\ncontoh :\ny*search Minecraft Pewdiepie -p 5" },
            { name: "**y*ulartangga {optional:-position}**", value: "Bermain permainan ular tangga\n\noptional:\n-position : menampilkan posisi pemain" },
            { name: "**y*fasthand {optional:-maxscore}**", value: "Bermain permainan ular tangga\n\noptional:\n-maxscore : mengubah maximum score yang harus dicapai (default:10)" }
        );
    message.channel.send(embedMessage);
}

client.login(process.env.TOKEN);