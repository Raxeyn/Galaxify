import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default{
  name: "remove",
  aliases: ["rm"],
  category: "Music",
  permission: "",
   desc: "Removes The Song From The Queue!",
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
  run: async ({ client, message, args, player }) => {
    if (!player) {
      const embed = new EmbedBuilder()
        .setAuthor(`No Player Found For This **Guild**.`)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (!args[0]) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(
              `Use the command again, and this time provide the position of the track you want to remove.`
            ),
        ],
      });
    }
    if (isNaN(args[0]) || args[0] > player.queue.length) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#1e5eb9`)
            .setDescription(`Invalid track.`),
        ],
      });
    }
    player.queue.remove(args[0] - 1);
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setDescription(
            `Removed`
          ),
      ],
    });
  },
};





