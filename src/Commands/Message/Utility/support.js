import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";

export default {
  name: "support",
  aliases: ["support"],
  category: "Utility",
  permission: "",
  desc: "Get Invite Of Support Server!",
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
   * @param {{ message: import("discord.js").Message }}
   */
  run: async ({ message }) => {
    return message.reply({
      content: "https://discord.com/invite/aMC2e8zgQb",
    });
  },
};

