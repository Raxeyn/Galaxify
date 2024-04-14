import { EmbedBuilder } from "discord.js";

export default{
  name: "stop",
  aliases: ["Stop", "destroy"],
  category: "Music",
  permission: "",
   desc: "Stops The Player!",
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
        .setDescription(`\`\`\`diff\n-No Player Found For This Guild\`\`\``)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (!player.playing) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor(client.settings.COLOR)
            .setDescription("\`\`\`fix\nI'm not playing anything right now!\`\`\`")
        ]
      });
    }
    player.destroy(); 
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setColor(client.settings.COLOR)
          .setDescription("\`\`\`fix\nStopped Playing Current Track\`\`\`")
      ]
    });
  }
};









