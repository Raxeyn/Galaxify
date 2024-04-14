import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default{
  name: "shuffle",
  aliases: ["mix"],
  category: "Music",
  permission: "",
   desc: "Shuffles The Queue!",
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
  run: async ({ client, message }) => {
    const player = client.kazagumo.players.get(message.guild.id);
    if (!player) {
      const embed = new EmbedBuilder()
        .setDescription(`\`\`\`diff\n-No Player Found For This Guild!\`\`\``)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (player.queue.length < 3) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(
              `\`\`\`fix\nNot enough songs in the queue to shuffle.\`\`\``
            ),
        ],
      });
    }
    player.queue.shuffle();
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setDescription("\`\`\`fix\n🔀 Shuffled the whole queue.\`\`\`"),
      ],
    });
  },
};





