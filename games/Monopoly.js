const Utility = require('../Utility.js');
const Discord = require('discord.js');

module.exports = function (guild) {
    this.guild = guild,

        this.utilityObj = new Utility(this.guild),

        this.landType = {
            LAND: 1,
            COMMUNITY_CHEST: 2,
            TAX: 3,
            SERVICE: 4,
            CHANCE: 5,
            JAIL: 6,
            FREE_PARKING: 7,
            START: 8,
            GO_TO_JAIL: 9,
            RAILROAD: 10
        },

        this.props = [
            {
                name: "GO",
                type: this.landType.START
            },
            {
                name: "Mediterranean Avenue",
                price: 60,
                building: { house: 0, hotel: 0 }, buildingCost: 50,
                mortgage: 30,
                type: this.landType.LAND,
                owner: -1,
                rent: {
                    land: 2,
                    house: [10, 30, 90, 160],
                    hotel: 250
                }
            },
            {
                name: "Community Chest",
                type: this.landType.COMMUNITY_CHEST
            },
            {
                name: "Baltic Avenue",
                price: 60,
                building: { house: 0, hotel: 0 }, buildingCost: 50,
                mortgage: 30,
                type: this.landType.LAND,
                owner: -1,
                rent: {
                    land: 4,
                    house: [20, 60, 180, 320],
                    hotel: 450
                }
            },
            {
                name: "Income Tax",
                cost: 200,
                type: this.landType.TAX
            },
            {
                name: "Reading Railroad",
                price: 200,
                mortgage: 100,
                type: this.landType.RAILROAD, owner: -1,
            },
            {
                name: "Oriental Avenue",
                price: 100,
                building: { house: 0, hotel: 0 }, buildingCost: 50,
                mortgage: 50,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 6,
                    house: [30, 90, 270, 400],
                    hotel: 550
                }
            },
            {
                name: "Chance",
                type: this.landType.CHANCE
            },
            {
                name: "Vermont Avenue",
                price: 100,
                building: { house: 0, hotel: 0 }, buildingCost: 50,
                mortgage: 50,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 6,
                    house: [30, 90, 270, 400],
                    hotel: 550
                }
            },
            {
                name: "Connecticut Avenue",
                price: 120,
                building: { house: 0, hotel: 0 }, buildingCost: 50,
                mortgage: 60,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 8,
                    house: [40, 100, 300, 450],
                    hotel: 600
                }
            },
            {
                name: "Jail",
                type: this.landType.JAIL
            },
            {
                name: "St. Charles Place",
                price: 140,
                building: { house: 0, hotel: 0 }, buildingCost: 100,
                mortgage: 70,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 10,
                    house: [50, 150, 450, 625],
                    hotel: 750
                }
            },
            {
                name: "Electric Company",
                price: 150,
                mortgage: 75,
                type: this.landType.SERVICE, owner: -1

            },
            {
                name: "States Avenue",
                price: 140,
                building: { house: 0, hotel: 0 }, buildingCost: 100,
                mortgage: 70,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 10,
                    house: [50, 150, 450, 625],
                    hotel: 750
                }
            },
            {
                name: "Virginia Avenue",
                price: 160,
                building: { house: 0, hotel: 0 }, buildingCost: 100,
                mortgage: 80,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 12,
                    house: [60, 180, 500, 700],
                    hotel: 900
                }
            },
            {
                name: "Reading Railroad",
                price: 200,
                mortgage: 100,
                type: this.landType.RAILROAD, owner: -1,
            },
            {
                name: "St. James Place",
                price: 180,
                building: { house: 0, hotel: 0 }, buildingCost: 100,
                mortgage: 90,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 14,
                    house: [70, 200, 550, 750],
                    hotel: 950
                }
            },
            {
                name: "Community Chest",
                type: this.landType.COMMUNITY_CHEST
            },
            {
                name: "Tennesse Avenue",
                price: 180,
                building: { house: 0, hotel: 0 }, buildingCost: 100,
                mortgage: 90,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 14,
                    house: [70, 200, 550, 750],
                    hotel: 950
                }
            },
            {
                name: "New York Avenue",
                price: 200,
                building: { house: 0, hotel: 0 }, buildingCost: 100,
                mortgage: 100,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 16,
                    house: [80, 220, 600, 800],
                    hotel: 1000
                }
            },
            {
                name: "Free Parking",
                type: this.landType.FREE_PARKING
            },
            {
                name: "Kentucky Avenue",
                price: 220,
                building: { house: 0, hotel: 0 }, buildingCost: 150,
                mortgage: 110,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 18,
                    house: [90, 250, 700, 875],
                    hotel: 1050
                }
            },
            {
                name: "Chance",
                type: this.landType.CHANCE
            },
            {
                name: "Indiana Avenue",
                price: 220,
                building: { house: 0, hotel: 0 }, buildingCost: 150,
                mortgage: 110,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 18,
                    house: [90, 250, 700, 875],
                    hotel: 1050
                }
            },
            {
                name: "Illinois Avenue",
                price: 240,
                building: { house: 0, hotel: 0 }, buildingCost: 150,
                mortgage: 120,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 20,
                    house: [100, 300, 750, 925],
                    hotel: 1100
                }
            },
            {
                name: "B&O Railroad",
                price: 200,
                mortgage: 100,
                type: this.landType.RAILROAD, owner: -1
            },
            {
                name: "Atlantic Avenue",
                price: 260,
                building: { house: 0, hotel: 0 }, buildingCost: 150,
                mortgage: 130,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 22,
                    house: [110, 330, 800, 975],
                    hotel: 1150
                }
            },
            {
                name: "Ventnor Avenue",
                price: 260,
                building: { house: 0, hotel: 0 }, buildingCost: 150,
                mortgage: 130,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 22,
                    house: [110, 330, 800, 975],
                    hotel: 1150
                }
            },
            {
                name: "Water Company",
                price: 150,
                mortgage: 75,
                type: this.landType.SERVICE, owner: -1

            },
            {
                name: "Marvin Gardens",
                price: 280,
                building: { house: 0, hotel: 0 }, buildingCost: 150,
                mortgage: 140,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 24,
                    house: [120, 360, 850, 1025],
                    hotel: 1200
                }
            },
            {
                name: "Go to Jail",
                type: this.landType.GO_TO_JAIL
            },
            {
                name: "Pacific Avenue",
                price: 300,
                building: { house: 0, hotel: 0 }, buildingCost: 200,
                mortgage: 150,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 26,
                    house: [130, 390, 900, 1100],
                    hotel: 1275
                }
            },
            {
                name: "North Carolina Avenue",
                price: 300,
                building: { house: 0, hotel: 0 }, buildingCost: 200,
                mortgage: 150,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 26,
                    house: [130, 390, 900, 1100],
                    hotel: 1275
                }
            },
            {
                name: "Community Chest",
                type: this.landType.COMMUNITY_CHEST
            },
            {
                name: "Pennsylvania Avenue",
                price: 320,
                building: { house: 0, hotel: 0 }, buildingCost: 200,
                mortgage: 160,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 28,
                    house: [150, 450, 1000, 1200],
                    hotel: 1400
                }
            },
            {
                name: "Short Line",
                price: 200,
                mortgage: 100,
                type: this.landType.RAILROAD, owner: -1,
            },
            {
                name: "Chance",
                type: this.landType.CHANCE
            },
            {
                name: "Park Place",
                price: 350,
                building: { house: 0, hotel: 0 }, buildingCost: 200,
                mortgage: 175,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 35,
                    house: [175, 500, 1100, 1300],
                    hotel: 1500
                }
            },
            {
                name: "Luxury Tax",
                type: this.landType.TAX,
                cost: 75
            },
            {
                name: "Broadwalk",
                price: 400,
                building: { house: 0, hotel: 0 }, buildingCost: 200,
                mortgage: 200,
                type: this.landType.LAND, owner: -1,
                rent: {
                    land: 50,
                    house: [200, 600, 1400, 1700],
                    hotel: 2000
                }
            }
        ],

        this.communityChest = [
            //1:hadiah/bayar,2:kartu bebas penjara,3:pergi ke penjara,4:dapat uang dari tiap pemain,5:biaya perbaikan jalan
            {
                title: "Menuju ke GO",
                reward: 0,
                type: 1
            },
            {
                title: "Ada masalah pada bank",
                reward: 200,
                type: 1
            },
            {
                title: "Bayar biaya berobat",
                reward: -50,
                type: 1
            },
            {
                title: "Hasil dari penjualan anda",
                reward: 50,
                type: 1
            },
            {
                title: "Mendapat kesempatan keluar dari penjara",
                type: 2,
                owner: -1
            },
            {
                title: "Pergi ke penjara",
                type: 3
            },
            {
                title: "Hari ini adalah malam Grand Opera Night, dapatkan uang dari tiap pemain",
                reward: 50,
                type: 4
            },
            {
                title: "Hadiah hari natal",
                reward: 100,
                type: 1
            },
            {
                title: "Pengembalian biaya pajak",
                reward: 20,
                type: 1
            },
            {
                title: "Hasil ini hari ulang tahunmu, dapatkan uang dari tiap pemain",
                reward: 10,
                type: 4
            },
            {
                title: "Mendapatkan uang dari asuransi jiwa",
                reward: 100,
                type: 1
            },
            {
                title: "Bayar biaya pengobatan",
                reward: -50,
                type: 1
            },
            {
                title: "Bayar biaya pendidikan",
                reward: -50,
                type: 1
            },
            {
                title: "Mendapatkan biaya konsultasi",
                reward: 25,
                type: 1
            },
            {
                title: "Bayar biaya perbaikan jalan",
                cost: { house: 40, hotel: 115 },
                type: 5
            },
            {
                title: "Memenangkan hadiah kedua pada kontes kecantikan",
                reward: 10,
                type: 1
            },
            {
                title: "Mendapatkan 100",
                reward: 100,
                type: 1
            }
        ],

        this.chance = [
            {
                title: "Menuju ke Go",
                reward: 0,
                type: 1
            },
            {
                title: "Menuju Illinois Ave",
                index: 24,
                type: 6
            },
            {
                title: "Menuju St. Charles",
                index: 11,
                type: 6
            },
            {
                title: "Mendapat kesempatan keluar dari penjara",
                type: 2,
                owner: -1
            },
            {
                title: "Pergi ke penjara",
                type: 3
            },
            {
                title: "Bayar biaya perbaikan jalan",
                cost: { house: 40, hotel: 115 },
                type: 5
            },
            {
                title: "Bank membayar anda 50",
                reward: 50,
                type: 1
            },
            {
                title: "Bayar pajak sebesar 15",
                reward: -15,
                type: 1
            },
            {
                title: "Menuju Reading Railroad",
                index: 5,
                type: 6
            },
            {
                title: "Terpilih menjadi walikota, bayar setiap pemain sebesar 50",
                reward: -50,
                type: 4
            },
            {
                title: "Anda memenangkan sebuah kompetisi",
                reward: 100,
                type: 1
            },
            {
                title: "Pinjaman bangunan anda jatuh tempo, mendapatkan 150",
                reward: 150,
                type: 1
            },
            {
                title: "Menuju Broadwalk",
                index: 39,
                type: 6
            }

        ],

        this.gameMonopoly = (message) => {
            let pesan = "";
            this.guild.gameLobby = true;
            pesan = "**MONOPOLY**\nBuat lawanmu bangkrut dengan membeli tanah, membangun rumah atau hotel.\nBerikut adalah pemain dari permainan monopoly :\n\n"
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
                m.awaitReactions(filter, { max: 1, time: 6000000, errors: ['time'] }).then((react) => {
                    if (react.first().emoji.name === '✅' && userReact.id === this.guild.starterId) {
                        m.delete({ timeout: 100 });
                        this.guild.gameLobby = false;
                        this.guild.gameStart = true;
                        this.guild.gameType = 2;
                        this.guild.monopoly.faseBangun = false;
                        this.guild.monopoly.faseTukar = false;
                        this.guild.channelId = m.channel.id;
                        this.guild.monopoly.kaliDaduKembar = 0;
                        message.channel.send("Permainan dimulai");
                        this.progressMonopoly(message);
                    }
                    else if (react.first().emoji.name === '🤚') {
                        let cari = this.guild.player.some(e => e.id === userReact.id);
                        if (cari) {
                            message.channel.send("Pemain sudah terdaftar").then((msg) => {
                                msg.delete({ timeout: 3000 });
                            })
                        }
                        else {
                            this.guild.player.push({ type: "player", id: userReact.id, name: userReact.username, position: 0, money: 2000, penjara: false, turnPenjara: 0 });
                        }
                        m.delete({ timeout: 100 });
                        this.gameMonopoly(message);
                    }
                    else if (react.first().emoji.name === '💻') {
                        let cari = this.guild.player.some(e => e.type === "bot");
                        if (cari) {
                            message.channel.send("Pemain sudah terdaftar").then((msg) => {
                                msg.delete({ timeout: 3000 });
                            })
                        }
                        else {
                            this.guild.player.push({ type: "bot", name: "bot", position: 0, money: 2000, penjara: false, turnPenjara: 0 });
                        }
                        m.delete({ timeout: 100 });
                        this.gameMonopoly(message);
                    }
                }).catch((e) => {
                    console.log(e);
                });
            });
        },

        this.progressMonopoly = (message) => {
            if (this.guild.player[this.guild.gameTurn].penjara) {
                if (this.guild.player[this.guild.gameTurn].turnPenjara == 3) {
                    message.channel.send("**" + this.guild.player[this.guild.gameTurn].name + "** bebas dari penjara");
                    this.guild.player[this.guild.gameTurn].turnPenjara = 0;
                    this.guild.player[this.guild.gameTurn].penjara = false;
                } else {
                    this.cobaKeluarPenjara(message);
                }
            } else {
                if (this.guild.player[this.guild.gameTurn].type === "player") {
                    message.channel.send("**Giliran <@" + this.guild.player[this.guild.gameTurn].id + ">, silahkan klik dadu di bawah**")
                        .then((m) => {
                            try {
                                m.react("🎲");
                                let filter = (reaction, user) => {
                                    return ['🎲'].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                                };
                                m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                                    if (react.first().emoji.name === '🎲') {
                                        m.reactions.removeAll();
                                        this.rollDadu(m);
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
                        this.rollDadu(message);
                        msg.delete({ timeout: 5000 });
                    });
                }
            }
        },

        this.rollDadu = (message) => {
            let dadu1 = Math.floor(Math.random() * 6) + 1;
            let dadu2 = Math.floor(Math.random() * 6) + 1;
            this.guild.player[this.guild.gameTurn].position += dadu1 + dadu2;
            let pesan = "**" + this.guild.player[this.guild.gameTurn].name + "** menggulir dadu bernilai " + dadu1 + " dan " + dadu2;
            if (this.guild.player[this.guild.gameTurn].position >= this.props.length) {
                this.guild.player[this.guild.gameTurn].position -= this.props.length;
                this.guild.player[this.guild.gameTurn].money += 200;
                pesan += "\nKarena pemain melewati tanda GO, maka pemain mendapatkan uang 200";
            }
            console.log(this.props[this.guild.player[this.guild.gameTurn]]);
            pesan += "\nLokasi saat ini adalah " + this.props[this.guild.player[this.guild.gameTurn].position].name;
            message.channel.send(pesan);
            this.cekPosisi(message, dadu1 + dadu2);

            if (!this.guild.player[this.guild.gameTurn].penjara) {
                if (dadu1 == dadu2) {
                    this.guild.monopoly.kaliDaduKembar++;
                    if (this.guild.monopoly.kaliDaduKembar === 3) {
                        message.channel.send("**" + this.guild.player[this.guild.gameTurn].name + "** dikirim ke penjara");
                        this.guild.player[this.guild.gameTurn].position = 10;
                    }
                    message.channel.send("**" + this.guild.player[this.guild.gameTurn].name + "** mendapat kesempatan untuk melempar dadu lagi");
                    this.progressMonopoly(message);
                }
            }
            this.guild.monopoly.kaliDaduKembar = 0;

        },

        this.cekPosisi = (message, dadu) => {
            switch (this.props[this.guild.player[this.guild.gameTurn].position].type) {
                case this.landType.LAND:
                    this.beliTanah(message, this.props[this.guild.player[this.guild.gameTurn].position], dadu)
                    break;
                case this.landType.TAX:
                    message.channel.send("**" + this.guild.player[this.guild.gameTurn].name + "*** membayar pajak sebesar " + this.props[this.guild.player[this.guild.gameTurn].position].cost);
                    break;
                case this.landType.COMMUNITY_CHEST:
                    this.kartuKesempatan(message, this.landType.COMMUNITY_CHEST);
                    break;
                case this.landType.SERVICE:
                    this.beliTanah(message, this.props[this.guild.player[this.guild.gameTurn].position], dadu)
                    break;
                case this.landType.CHANCE:
                    this.kartuKesempatan(message, this.landType.CHANCE);
                    break;
                case this.landType.JAIL:
                    break;
                case this.landType.FREE_PARKING:
                    break;
                case this.landType.START:
                    break;
                case this.landType.GO_TO_JAIL:
                    message.channel.send(this.guild.player[this.guild.gameTurn].name + " dikirim ke penjara");
                    this.guild.player[this.guild.gameTurn].penjara = true;
                    this.guild.player[this.guild.gameTurn].turnPenjara = 0;
                    this.guild.player[this.guild.gameTurn].position = 10;
                    this.endTurn(message);
                    break;
                case this.landType.RAILROAD:
                    this.beliTanah(message, this.props[this.guild.player[this.guild.gameTurn].position], dadu)
                    break;
            }
        },

        this.beliTanah = (message, prop, dadu) => {
            message.channel.send("tes+");
            let pesan = "**" + this.guild.player[this.guild.gameTurn].name + "** berhenti di " + prop.name;
            if (prop.owner == -1) {
                if (this.guild.player[this.guild.gameTurn].money >= prop.price) {
                    pesan += "\nApakah anda ingin membeli tanah ini?";
                    message.channel.send(pesan).then((m) => {
                        m.react("❌");
                        m.react("✅");
                        let filter = (reaction, user) => {
                            return ["✅", "❌"].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                        };
                        m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                            if (react.first().emoji.name === '✅') {
                                m.reactions.removeAll();
                                prop.owner = this.guild.gameTurn;
                                this.guild.player[this.guild.gameTurn].money -= prop.price;
                                message.channel.send(prop.name + " telah dibeli oleh " + this.guild.player[this.guild.gameTurn].name);
                            }
                        }).catch((e) => {
                            console.log(e);
                        });
                    }).catch((e) => {

                    })
                } else {
                    pesan += "\nUang **" + this.guild.player[this.guild.gameTurn].name + "** tidak cukup untuk membeli tanah ini";
                    message.channel.send(pesan);
                }
            }
            else {
                if (prop.type === this.landType.LAND) {
                    pesan += this.berhentiDiLand(prop);
                } else if (prop.type === this.landType.SERVICE) {
                    pesan += this.berhentiDiService(prop, dadu);
                } else if (prop.type === this.landType.RAILROAD) {
                    pesan += this.berhentiDiRailroad(prop);
                }
                message.channel.send(pesan);
            }
        },

        this.berhentiDiLand = (prop) => {
            let biaya = 0;
            if (prop.building.house == 0 && prop.building.hotel == 0) {
                biaya = prop.rent.land;
            } else {
                if (prop.building.hotel == 0) {
                    biaya = prop.rent.house[prop.building.house - 1];
                } else {
                    biaya = prop.rent.hotel;
                }
            }
            this.guild.player[this.guild.gameTurn].money -= biaya;
            this.guild.player[prop.owner].money += biaya;
            let pesan = "\n**" + this.guild.player[this.guild.gameTurn].name + "** membayar kepada **" + this.guild.player[prop.owner].name + "** sebesar " + biaya;
            return pesan;
        },

        this.berhentiDiService = (prop, dadu) => {
            let biaya = 0;
            let banyakService = this.props.filter((e) => {
                return e.type === this.landType.SERVICE && e.owner === prop.owner;
            }).length;
            if (banyakService == 1) {
                biaya = 4 * dadu;
            }
            else if (banyakService == 2) {
                biaya = 10 * dadu;
            }
            this.guild.player[this.guild.gameTurn].money -= biaya;
            this.guild.player[prop.owner].money += biaya;
            let pesan = "\n**" + this.guild.player[this.guild.gameTurn].name + "** membayar kepada **" + this.guild.player[prop.owner].name + "** sebesar " + biaya;
            return pesan;

        },

        this.berhentiDiRailroad = (prop) => {
            let biaya = 0;
            let banyakRailroad = this.props.filter((e) => {
                return e.type === this.landType.RAILROAD && e.owner === prop.owner;
            }).length;
            biaya = 25 * Math.pow(2, banyakRailroad - 1);
            this.guild.player[this.guild.gameTurn].money -= biaya;
            this.guild.player[prop.owner].money += biaya;
            let pesan = "\n**" + this.guild.player[this.guild.gameTurn].name + "** membayar kepada **" + this.guild.player[prop.owner].name + "** sebesar " + biaya;
            return pesan;
        },

        this.kartuKesempatan = (message, type) => {
            let card;
            if (type == this.landType.CHANCE) {
                let random = Math.floor(Math.random * this.chance.length + 1);
                card = this.chance[random];
                message.channel.send("Mendapatkan kartu kesempatan '**" + card.title + "**'");
            }
            else if (type == this.landType.COMMUNITY_CHEST) {
                let random = Math.floor(Math.random * this.chance.length + 1);
                card = this.communityChest[random];
                message.channel.send("Mendapatkan kartu '**" + card.title + "**'");
            }
            switch (card.type) {
                case 1:
                    if (card.reward < 0) {
                        message.channel.send("Membayar sebesar " + (card.reward * -1));
                    }
                    else if (card.reward > 0) {
                        message.channel.send("Mendapatkan uang sebesar " + card.reward);
                    }
                    this.guild.player[this.guild.gameTurn].money += card.reward
                    break;
                case 2:
                    card.owner = this.guild.gameTurn;
                    break;
                case 3:
                    message.channel.send("Anda harus pergi ke penjara");
                    this.guild.player[this.guild.gameTurn].position = 10;
                case 4:
                    if (card.reward < 0) {
                        message.channel.send("Membayar tiap pemain sebesar " + (card.reward * -1));
                    }
                    else if (card.reward > 0) {
                        message.channel.send("Mendapatkan uang dari tiap pemain sebesar " + card.reward);
                    }
                    for (var x = 0; x < this.guild.player.length; x++) {
                        if (x == this.guild.gameTurn) continue;
                        this.guild.player[x].money -= card.reward;
                    }
                    this.guild.player[this.guild.gameTurn].money += card.reward;
                    break;
                case 5:
                    let properti = this.props.filter((e) => {
                        return e.owner === this.guild.gameTurn && e.type === this.landType.LAND;
                    });
                    let biaya = 0;
                    properti.forEach((e) => {

                    })
                    break;
                case 6:
                    if (this.guild.player[this.guild.gameTurn].position >= card.index) {
                        message.channel.send("Karena pemain melewati tanda GO, pemain mendapatkan 200");
                        this.guild.player[this.guild.gameTurn].reward += 200;
                    }
                    this.guild.player[this.guild.gameTurn].position = card.index;
                    break;
            }
        },

        this.cobaKeluarPenjara = (message) => {
            let bebas = false;
            if (this.communityChest.findIndex((e) => {
                return e.type == 2 && e.owner == this.guild.gameTurn;
            }) != -1) {
                message.channel.send("Apakah anda ingin menggunakan kartu keluar penjara?").then((m) => {
                    m.react("❌");
                    m.react("✅ ");
                    let filter = (reaction, user) => {
                        return ["✅ ", "❌"].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                    };
                    m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                        if (react.first().emoji.name === '✅ ') {
                            m.reactions.removeAll();
                            bebas = true;
                        } else {

                        }
                    }).catch((e) => {
                        console.log(e);
                    });
                })
            } else {
                if (this.chance.findIndex((e) => {
                    return e.type == 2 && e.owner == this.guild.gameTurn;
                }) != -1) {
                    message.channel.send("Apakah anda ingin menggunakan kartu keluar penjara?").then((m) => {
                        m.react("❌");
                        m.react("✅ ");
                        let filter = (reaction, user) => {
                            return ["✅ ", "❌"].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                        };
                        m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                            if (react.first().emoji.name === '✅ ') {
                                m.reactions.removeAll();
                                bebas = true;
                            } else {

                            }
                        }).catch((e) => {
                            console.log(e);
                        });
                    })
                }
            }
            let percobaan = 0;
            while (!bebas) {
                if (percobaan == 3) {
                    break;
                }
                message.channel.send("**<@" + this.guild.player[this.guild.gameTurn].id + ">, coba roll dadu, jika angka yang keluar kembar, maka anda bebas dari penjara**")
                    .then((m) => {
                        try {
                            m.react("🎲");
                            let filter = (reaction, user) => {
                                return ['🎲'].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                            };
                            m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                                if (react.first().emoji.name === '🎲') {
                                    m.reactions.removeAll();
                                    let dadu1 = Math.floor(Math.random() * 6) + 1;
                                    let dadu2 = Math.floor(Math.random() * 6) + 1;
                                    if (dadu1 === dadu2) {
                                        bebas = true;
                                    } else {
                                        m.channel.send("Percobaan " + (percobaan + 1) + " gagal");
                                    }
                                }
                            }).catch((e) => {
                                console.log(e);
                            });
                        }
                        catch (e) {

                        }
                    });
            }
            if (bebas) {
                message.channel.send("Anda keluar dari penjara");
                this.player[this.guild.gameTurn].penjara = false;
                this.player[this.guild.gameTurn].turnPenjara = 0;
                this.progressMonopoly(message);
            } else {
                message.channel.send("Anda gagal keluar dari penjara");
                this.player[this.guild.gameTurn].turnPenjara++;
                this.endTurn(message);
            }
        },

        this.postTurn = (message) => {
            message.channel.send("Apa langkah anda selanjutnya?\n🤝 Melakukan pertukaran dengan pemain lain\n🏘 Membangun rumah atau hotel\n✅ Akhiri giliran").then((m) => {
                m.react("🤝");
                m.react("🏘");
                m.react("✅");
                let filter = (reaction, user) => {
                    return ['🤝', '🏘', '✅'].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                };
                m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                    if (react.first().emoji.name === '🤝') {
                        m.reactions.removeAll();
                        this.guild.monopoly.faseTukar = true;
                        let pesan = "";

                        for (var x = 1; x <= this.guild.player.length; x++) {
                            pesan += "\n **" + x + ". " + this.guild.player[x - 1].name + "**";
                            let daftarTanah = this.props.filter((e) => {
                                return e.owner == x - 1;
                            })
                            for (var y = 1; y <= daftarTanah.length; y++) {
                                pesan += "\n\t" + y + ". " + daftarTanah[y - 1].name;
                                if (daftarTanah[y - 1].type == this.landType.LAND) {
                                    pesan += " (Rumah : " + daftarTanah[y - 1].building.house + ",hotel : " + daftarTanah[y - 1].building.hotel + ")";
                                }
                            }
                        }
                        pesan += "\nketik y*monopoly trade=(nomor pemain,nomor properti) me=(bayar) you=(bayar)\nContoh : y*monopoly trade=1,2 me=100 you=0\ntekan ❌ untuk membatalkan";
                        let embedMesage = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Daftar pemain serta tanah yang mereka miliki : ')
                            .setDescription(pesan);
                        message.channel.send(embedMesage).then((msg) => {
                            msg.react("❌");
                            let flt = (reaction, user) => {
                                return ['❌'].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                            };
                            m.awaitReactions(flt, { max: 1, time: 600000, errors: ['time'] }).then((rct) => {
                                if (rct.first().emoji.name === '❌') {
                                    msg.reactions.removeAll();
                                    this.guild.monopoly.faseTukar = false;
                                    this.postTurn(message);
                                }
                            });
                        });
                    }
                    else if (react.first().emoji.name === '🏘') {
                        m.reactions.removeAll();
                        this.guild.monopoly.faseBangun = true;
                        let daftarTanah = this.props.filter((e) => {
                            return e.type === this.landType.LAND && e.owner === this.guild.gameTurn;
                        });
                        let pesan = "";

                        for (var x = 1; x <= daftarTanah.length; x++) {
                            pesan = "\n " + x + ". " + daftarTanah[x - 1].name + " (Rumah : " + daftarTanah[x].building.house + ", Hotel : " + daftarTanah[x].building.hotel + ")";
                        }
                        pesan += "\nketik y*monopoly build=(nomor) (house/hotel)=(jumlah)\nContoh : y*monopoly hotel=1 house=3\n(hotel hanya boleh dibangun saat sudah ada 4 rumah di tanah tersebut)nTekan ❌ untuk membatalkan";
                        let embedMesage = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Tanah yang anda miliki : ')
                            .setDescription(pesan);
                        message.channel.send(embedMesage).then((msg) => {
                            msg.react("❌");
                            let flt = (reaction, user) => {
                                return ['❌'].includes(reaction.emoji.name) && user.id === this.guild.player[this.guild.gameTurn].id;
                            };
                            m.awaitReactions(flt, { max: 1, time: 600000, errors: ['time'] }).then((rct) => {
                                if (rct.first().emoji.name === '❌') {
                                    msg.reactions.removeAll();
                                    this.guild.monopoly.faseBangun = false;
                                    this.postTurn(message);
                                }
                            });
                        });
                    }
                    else if (react.first().emoji.name === '✅') {
                        this.endTurn(message);
                    }
                }).catch((e) => {
                    console.log(e);
                });

            })
        },

        this.endTurn = (message) => {
            message.channel.send("**-------------------------------------------**");
            if (this.guild.gameTurn < this.guild.player.length)
                this.guild.gameTurn++;
            else this.guild.gameTurn = 0;

            this.guild.monopoly.kaliDaduKembar = 0;
            this.progressMonopoly(message);
        }
}