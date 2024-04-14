import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";
import pkg from "discord.js";
const prime = ['1057674644905279498']

export default {
  name: "noprefixadd",
  aliases: ["npadd"],
  category: "Owner",
  permission: "Administrator",
  desc: "add np to user!",
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
  run: async ({ client, message, args }) => {

        if(!prime.includes(message.author.id)) return;

    const embed = new EmbedBuilder()
    .setColor(client.settings.COLOR)
    if(args[0]){
    try {
      await client.users.fetch(args[0])
    } catch (error) {
      return message.channel.send({embeds: [embed.setDescription(`Invalid User Id`)]});
    }
    const use = await client.db.get(`noprefix_${args[0]}`)
    if(use){
    return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Is Already In My No Prefix List`)]})
    }
      //let added = await client.db.get(`noprefix_${client.user.id}`) ? await client.db.get(`noprefix_${client.user.id}`) : [];
    client.db.set(`noprefix_${args[0]}`, `true`)
    return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Has Been Added To My No Prefix List`)]})
    }
    else return message.channel.send({embeds: [embed.setDescription(`Please Give The User Id`)]}).catch(err => console.log(err));

        
      }
    }