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
            this.guild.gameTurn = 0;
            this.guild.gameLobby = false;
            this.guild.gameStart = false;
            this.guild.gameType = -1;
            this.guild.tebakKata = "";
            this.guild.player = [];
            this.guild.maximumScore=0;
        }
}