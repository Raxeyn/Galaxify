import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default{
  name: "pause",
  aliases: ["freeze","ruk"],
  category: "Music",
  permission: "",
   desc: "This Will Pause The Player!",
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
  run: async ({ client, message, player, ServerData }) => {
    if (!player) {
      const embed = new EmbedBuilder()
        .setDescription(`\`\`\`diff\n-No Player Found For This Guild!\`\`\``)
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (player.paused) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(`\`\`\`fix\nThe player is already paused.\`\`\``),
        ],
      });
    }
    player.pause(true);
    const embed = new EmbedBuilder()
    .setColor(client.settings.COLOR)
    .setDescription(`**Paused** the player.`)
    const resumebutton = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("resume")
        //.setEmoji(`1177594143703310336`)
        .setLabel("Resume")
        .setStyle(client.Buttons.grey)
    )
    return message.channel.send({ embeds: [embed], components: [resumebutton] }).then((msg) => {
      const filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter});
      collector.on("collect", async (button) => {
        if (button.customId === "resume") {
          if (player.paused) {
            player.pause(false);
            embed.setDescription(`Resumed the player`)
            button.update({ embeds: [embed], components: [] });
          } else {
            embed.setDescription(`The player is already resumed`)
            button.update({ embeds: [embed], components: [] });
          }
        }
      });
    });
  },
};













	