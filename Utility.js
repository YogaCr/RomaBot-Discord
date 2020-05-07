module.exports = function (guild) {
    this.guild = guild,
        this.playerList = function () {
            let playerList = ""
            this.guild.player.forEach(e => {
                playerList += " 🙂   " + e.name + "\n";
            });
            return playerList;
        },
        this.hentikanPermainan = function () {
            this.guild.player = [];
            this.guild.gameTurn = 0;
            this.guild.gameLobby = false;
            this.guild.gameStart = false;
            this.guild.gameType = -1;
            this.guild.starterId = "";
            this.guild.channelId = "";
            this.guild.fasthand = {
                tebakKata: "",
                maximumScore: 0
            };
            this.guild.hangman = {
                tebakKata: "",
                percobaan: 5,
                pemberiKata: "",
                sudahDitebak: ""
            };
            this.guild.monopoly = {
                kaliDaduKembar: 0,
                faseBangun: false,
                faseTukar: false
            };
        }
}