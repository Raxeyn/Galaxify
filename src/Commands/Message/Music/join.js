import { EmbedBuilder, ButtonBuilder, ActionRowBuilder ,PermissionsBitField } from "discord.js";

export default{
  name: "join",
  aliases: ["j"],
  category: "Music",
  permission: "",
   desc: "Joins The Voice Channel!",
    options: {
    owner: false,
    inVc: true,
    sameVc: false,
    player: {
      playing: false,
      active: false,
    },
    premium: false,
    vote: false,
  },
  /**
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message, player: import("kazagumo").Player }}
   */
  run: async ({ client, message, player }) => {
    try{
      
    if (player && player.state === "CONNECTED") {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.settings.COLOR)
            .setDescription(
              `\`\`\`diff\n+I'm already connected in ${
                player?.voiceChannel
                  ? `<#${player.voiceChannel}>\`\`\``
                  : `\`Unknown Channel\``
              }`
            ),
        ],
      });
    }
    
    const permissions = message.guild.members.cache.get(client.user.id);
       if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(["ViewChannel"])
            )
          ){
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.settings.COLOR)
            .setDescription(
              ` \`\`\`diff\n-I don't have the permission to view your voice channel\`\`\``
            ),
        ],
      });
    }
       if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(["Connect"])
            )
          ){
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.settings.COLOR)
            .setDescription(
              `\`\`\`diff\n-I don't have the permission to **connect** to your voice channel\`\`\``
            ),
        ],
      });
    }
       if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(["Speak"])
            )
          ){
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.settings.COLOR)
            .setDescription(
              `\`\`\`diff\n-I don't have the permission to **speak** in your voice channel\`\`\``
            ),
        ],
      });
    }
    //  if (
    //    !message.guild.me.voice.channel &&
     //   !message.member.voice.channel.joinable
    //  ) {
    //    return message.channel.send({
    //      embeds: [
     //       new EmbedBuilder()
     //         .setColor(client.settings.COLOR)
      //        .setDescription(
      //          `I can't join your voice channel because it's full.`
      //        ),
       //   ],
       // });
     // }
    if (!player) {
      player = client.kazagumo.createPlayer({
        guildId: message.guild.id,
        voiceId: message.member.voice.channel.id,
        textId: message.channel.id,
        deaf: true,
      });
    }
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setDescription(
            `\`\`\`diff\n+I am Successfuly Connected to\`\`\`\n- ${message.member.voice.channel}`
          ),
      ],
    });
  }catch(err){
    console.log(err)
    message.channel.send(`\`\`\`diff\n-An error occured! While trying to join Voice Channel!\`\`\``)
  }

  },
};