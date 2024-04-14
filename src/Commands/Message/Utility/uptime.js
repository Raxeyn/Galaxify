import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";


export default {
  name: "uptime",
  aliases: ["up"],
  category: "Utility",
  permission: "",
  desc: "Ram Ji!",
  options : {
    owner:false,
    inVc: false,
    sameVc:false,
    player:{
      playing:false,
      active:false,
    },
    premium :false,
    vote :false,
  },
  /**
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message }}
   * @returns {Promise<void>}
   */
  run: async ({ client, message }) => {
    const duration1 = Math.round((Date.now() - message.client.uptime) / 1000);
    const embed = new EmbedBuilder();
    embed.setColor(client.settings.COLOR);
    embed.setTitle("Uptime Of Ram Bhajan");  
    embed.setThumbnail(client.user.displayAvatarURL());
    embed.setDescription(`**Ram Was Launched** <t:${duration1}:R>`);
    message.channel.send({ embeds: [embed] });
  },
};








