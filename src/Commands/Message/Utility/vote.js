import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default {
  name: "vote",
  category: "Utility",
  permission: "",
  desc: "Voting Link!",
  options: {
    owner: false,
    inVc: false,
    sameVc: false,
    player: {
      playing: false,
      active: false,
    },
    premium: false,
    vote: false,
  },
  /**
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message }}
   */
  run: async ({ client, message }) => {
    return message.reply({
      content: "\u200b",
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setTitle("Here Is The Vote Link")
          .setDescription("Thanks For Choosing **iShowKronix!** \`❤️\`"),],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(client.Buttons.link)
            .setLabel("Vote")
            .setURL(`https://discord.com/invite/aMC2e8zgQb`)
        ),
      ],
    });
  },
};





