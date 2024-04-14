import SpotiPro from "spoti-pro";
const clientId = "a63f6f18680747e39e52d10a38a080f5";
const clientSecret = "ac2a98c25c94440a8a803eab6e56c24c";
const spoti = new SpotiPro(clientId, clientSecret);
let client;
export default class Functions {
  constructor(c) {
    client = c;
  }
  static async ColdAutoplay(client, player) {
    const limit = 10;
    const country = "IN";
    const track = player.data.get("autoplayTrack");
    const q = track.author + " different Songs";
    const trackUrl = await spoti.searchSpotify(q, limit, country);
    if (trackUrl) {
      const randomIndex = Math.floor(Math.random() * trackUrl.length);
      const randomTrack = trackUrl[randomIndex];
      let res = await client.kazagumo.search(randomTrack, {
        engine: "youtube",
        requester: track.requester,
      });
      if (!res || !res.tracks.length) return;
      player.queue.add(res.tracks[0]);
      if (!player.playing && !player.paused) player.play();
    }
  }
}

