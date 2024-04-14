import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default {
  name: "previous",
  aliases: ["playprevious", "back", "pichla", "prev"],
  category: "Music",
  permission: "",
  desc: "Plays Prevoius Song!",
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
    try {
      if (!player) {
        const embed = new EmbedBuilder()
          .setDescription(`No Player Found For This **Guild**.`)
          .setColor(client.settings.COLOR);
        return message.channel.send({ embeds: [embed] });
      }
      if (!player.queue.previous) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(`#FF0000`)
              .setDescription(`There are no previous songs.`),
          ],
        });
      }
      player.queue.unshift(player.queue.previous);
      player.skip();
    } catch (err) {
      console.log(err);
      message.channel.send(`Please try again later`);
    }
  },
};










