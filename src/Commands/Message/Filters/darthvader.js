import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default {
  name: "darthvader",
  category: "Filters",
  permission: "",
  desc: "Toggles darthvader filter!",
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
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message, player: import("kazagumo").Player, args: string[] }} ctx
   * @param {import("discord.js").Message} message
   */
  run: async ({ client, message, emojis, player, args }) => {
    try {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("on")
          .setLabel("On")
          .setStyle(client.Buttons.grey),
        new ButtonBuilder()
          .setCustomId("off")
          .setLabel("Off")
          .setStyle(client.Buttons.grey)
      );
      const embed = new EmbedBuilder()
        .setDescription(
          `<:filters:1176868443207774309> **Darth Vader Filter**`
        )
        .setColor(client.settings.COLOR);
      message.channel
        .send({ embeds: [embed], components: [row] })
        .then(async (msg) => {
          const filter = (i) => i.user.id === message.author.id;
          const collector = msg.createMessageComponentCollector({
            filter,
            time: 15000,
          });
          collector.on("collect", async (i) => {
            if (i.customId === "on") {
              const data = {
                op: "filters",
                guildId: message.guild.id,
                timescale: {
                  speed: 0.975,
                  pitch: 0.5,
                  rate: 0.8,
                },
              };
              player.send(data);

              const embed = new EmbedBuilder()
                .setDescription(
                  `<:check:1176864155303673996> | **Darth Vader Filter Turned On**`
                )
                .setColor(client.settings.COLOR);
              message.channel.send({ embeds: [embed] });
              msg.delete();
            } else if (i.customId === "off") {
              const data = {
                op: "filters",
                guildId: message.guild.id,
                timescale: {
                  speed: 1,
                  pitch: 1,
                  rate: 1,
                },
              };
              player.send(data);
              const embed = new EmbedBuilder()
                .setDescription(
                  `<:check:1176864155303673996> | **Darth Vader Filter Turned Off**`
                )
                .setColor(client.settings.COLOR);
              message.channel.send({ embeds: [embed] });
              msg.delete();
            }
          });
          collector.on("end", (collected) => {
            msg.edit({ embeds: [embed], components: [] });
          });
        });
    } catch (e) {
      console.log(e);
    }
  },
};













