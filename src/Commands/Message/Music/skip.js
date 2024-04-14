import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default {
  name: "skip",
  aliases: ["s", "next", "agla"],
  category: "Music",
  permission: "",
   desc: "Skips The Current Song!",
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
  run: async ({ client, message, args, player }) => {
    if (!player) {
      const embed = new EmbedBuilder()
        .setDescription(`\`\`\`diff\n-No Player Found For This Guild!\`\`\``)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (player.paused) {
      const embed = new EmbedBuilder()
        .setColor(client.settings.COLOR)
        .setDescription(`\`\`\`diff\n-Cannot Skip Song While Paused\`\`\``);
      return message.channel.send({ embeds: [embed] });
    }
    if (!args[0]) {
      await player.skip();
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.settings.COLOR)
            .setDescription(`\`\`\`fix\nSkipped** ( ${player.queue.current.title} )\`\`\``),
        ],
      });
    }

    if (isNaN(args[0]))
      return message.channel.send("\`\`\`fix\nPlease provide a valid number!\`\`\`");
    if (args[0] > player.queue.length)
      return message.channel.send("\`\`\`diff\n-The queue is not that long!\`\`\`");
    player.queue.remove(0, parseInt(args[0]));
    player.skip();
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setDescription(
            `\`\`\`fix\nSkipped ${args[0]} song. \`\`\``
          ),
      ],
    });
  },
};










