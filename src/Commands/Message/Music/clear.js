import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default{
  name: "clear",
  aliases: ["clq", "cl"],
  category: "Music",
  permission: "",
   desc: "Clears The Queue!",
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
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message, player: import("kazagumo").Player }}
   */
  run: async ({ client, message, player }) => {
    if (!player) {
      const embed = new EmbedBuilder()
        .setDescription(`No Player Found For This **Guild**.`)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (!player.queue.length) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(`Queue is **empty**.`),
        ],
      });
    }
    player.queue.clear();
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setDescription(`Successfully **cleared** the queue`),
      ],
    });
  },
};










