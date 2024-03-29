const Axios = require('axios');
module.exports = function () {
    this.searchYoutube = function (pesan, message) {
        let youtubeTitle = "";
        let maxpage = 10;
        for (i = 1; i < pesan.length; i++) {
            if (pesan[i].substring(0, 3) === "-p=") {
                maxpage = pesan[i].substring(3);
                break;
            }
            youtubeTitle += pesan[i] + "%20";
        }
        if (youtubeTitle === "") {
            message.reply("Tolong tulis judulnya");
            return;
        }
        let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=" + maxpage + "&order=relevance&q=" + youtubeTitle + "&key=" + process.env.YOUTUBE_API_KEY;
        Axios.get(url)
            .then((res) => {
                if (res.data.pageInfo.totalResults == 0) {
                    message.channel.send("Video tidak ditemukan");
                }
                let page = 0;
                if (res.data.pageInfo.totalResults < maxpage) {
                    maxpage = res.data.pageInfo.totalResults;
                }
                this.sendYoutubeResult(res.data, message, page, maxpage);
            })
            .catch((e) => {
                message.channel.send("Maaf, ada masalah pada command yang anda kirimkan");
            });
    },
        this.sendYoutubeResult = function (data, message, page, maxpage) {
            if (page == -1) {
                page = maxpage - 1;
            } else if (page == maxpage) {
                page = 0;
            }
            let url = "https://www.youtube.com/watch?v=" + data.items[page].id.videoId;
            let messageSend = url + "\npage " + (page + 1) + "/" + maxpage;
            message.channel.send(messageSend).then((m) => {
                m.react('👈🏻');
                m.react('👉🏼');
                let filter = (reaction, user) => {
                    return ['👉🏼', '👈🏻'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] }).then((react) => {
                    if (react.first().emoji.name === '👉🏼') {
                        this.sendYoutubeResult(data, message, page + 1, maxpage);
                    }
                    else if (react.first().emoji.name === '👈🏻') {
                        this.sendYoutubeResult(data, message, page - 1, maxpage);
                    }
                    m.delete({ timeout: 100 });
                }).catch((e) => {
                    console.log(e);
                });

            }).catch((e) => {
                console.log(e)
            });
        }
}