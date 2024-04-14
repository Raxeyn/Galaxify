import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default{
  name: "resume",
  aliases: ["unpause", "continue","wapis"],
  category: "Music",
  permission: "",
   desc: "Resumes The Player!",
    options: {
    owner: false,
    inVc: true,
    sameVc: true,
    player: {
      playing: false,
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
        .setAuthor(`No Player Found For This **Guild**.`)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (!player.paused) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(`The player isn't **paused**.`),
        ],
      });
    }
    player.pause(false);
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setDescription(`**Resumed** Current Track.`),
      ],
    });
  },
};






