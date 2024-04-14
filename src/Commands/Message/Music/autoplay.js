import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default{
  name: "autoplay",
  aliases: ["ap"],
  category: "Music",
  permission: "",
   desc: "Enables/Disables Autoplay !",
    options: {
    owner: false,
    inVc: true,
    sameVc: true,
    player: {
      playing: true,
      active: true,
    },
    premium: false,
    vote: false,
  },
  /**
   * @param {import("discord.js").Message} message
   */
  run: async ({ client, message, ServerData, player }) => {
    if (!player) {
      const embed = new EmbedBuilder()
            .setDescription(`No Player Found For This **Guild**.`)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    const ap = player.data.get("autoplay");
    if (ap) {
      player.data.set("autoplay", false);
      const embed = new EmbedBuilder()
      .setDescription(`Autoplay mode is **disabled** in this server.`)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    } else {
      player.data.set("autoplay", true);
      const embed = new EmbedBuilder()
      .setDescription(`Autoplay mode is **enabled** in this server.`)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
  },
};








