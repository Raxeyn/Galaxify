import { ButtonBuilder, ActionRowBuilder, EmbedBuilder } from "discord.js";
import os from "os";
import fs from "fs";
const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf8"));

export default {
  name: "stats",
  aliases: ["st"],
  desc: "Ram Ji Ka Stats!",
  category: "Utility",
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
  run: async ({ client, message }) => {
    let totalUsers = 0;
    client.guilds.cache.forEach((guild) => {
      totalUsers += guild.available ? guild.memberCount : 0;
    });
    const totalShards1 = client.cluster.info.TOTAL_SHARDS;
    const clusterId = client.cluster.id;
    const cachedUser = client.users.cache.size;
    const guildCount = client.guilds.cache.size;
    const channelCount = client.channels.cache.size;
    const uptime = Math.round((Date.now() - message.client.uptime) / 1000);
    const djsversion = packageJSON.dependencies["discord.js"];
    const nodeversion = process.version;
    const databaseVersion = packageJSON.dependencies["mongoose"];
    const hybrid = packageJSON.dependencies["discord-hybrid-sharding"];
    const totalCommands = client.messageCommands.size;
    const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
    const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
      2
    );
    const cpuUsage = process.cpuUsage().system / 1024 / 1024;
    const cpuCount = os.cpus().length;
    const cpuModel = os.cpus()[0].model;
    const cpuSpeed = os.cpus()[0].speed;
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("bot")
        .setLabel("Bot Stats")
        .setStyle(client.Buttons.grey)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("system")
        .setLabel("System Stats")
        .setStyle(client.Buttons.grey)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("Dev")
        .setLabel("Devs Info")
        .setStyle(client.Buttons.grey)
        .setDisabled(false)
    );
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${client.user.username}'s Stats!`,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setDescription(
        `- Bot Tag **${client.user.tag}**\n` +
          `- Servers **${guildCount}**\n` +
          `- Users **${totalUsers}** (Cached : ${cachedUser})\n` +
          `- Channels **${channelCount}**\n` +
          `- Commands **${totalCommands}**\n` +
          `- Shards Count **${totalShards1}**\n` +
          `- Discord.js **${djsversion}**\n` +
          `- Uptime <t:${uptime}:R>`
      )
      .setColor(client.settings.COLOR)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
      .setTimestamp()
      .setFooter({
        text: `Requested By ${message.author.username}`,
        iconURL: message.member.user.displayAvatarURL({ dynamic: true }),
      });
    const msg = await message.channel.send({
      embeds: [embed],
      components: [row],
    });
    let collector = msg.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else
          b.reply({
            content: `Only ${message.author} can use this button!`,
            ephemeral: true,
          });
      },
    });
    collector.on("collect", async (i) => {
      if (i.customId === "system") {
        await i.deferUpdate();
        const row1 = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("bot")
            .setLabel("Bot Stats")
            .setStyle(client.Buttons.grey)
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("system")
            .setLabel("System Stats")
            .setStyle(client.Buttons.grey)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId("Dev")
            .setLabel("Devs Info")
            .setStyle(client.Buttons.grey)
            .setDisabled(false)
        );

        const systemEmbed = new EmbedBuilder()
          .setAuthor({
            name: `${client.user.username}'s System Stats!`,
            iconURL: i.guild.iconURL({ dynamic: true }),
          })
          .setDescription(
              `- Total Ram **${totalMemory} MB**\n` +
              `- Ram Usage **${memoryUsage} MB**\n` +
              `- Memory Left **${freeMemory} MB**\n` +
              `- CPU Model **${cpuModel}**\n` +
              `- CPU Usage **${cpuUsage.toFixed(2)}%**\n` +
              `- CPU Cores **${cpuCount / 2}**\n` +
              `- CPU Speed **${cpuSpeed} MHz**`
          )
          .setColor(client.settings.COLOR)
          .setTimestamp()
          .setFooter({
            text: `Requested By ${message.author.username}`,
            iconURL: message.member.user.displayAvatarURL({ dynamic: true }),
          })
          .setThumbnail(
            client.user.displayAvatarURL({ dynamic: true, size: 2048 })
          );
        await msg.edit({ embeds: [systemEmbed], components: [row1] });
      } else if (i.customId === "Devs") {
        await i.deferUpdate();
        const row2 = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("bot")
            .setLabel("Bot Stats")
            .setStyle(client.Buttons.grey)
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("system")
            .setLabel("System Stats")
            .setStyle(client.Buttons.grey)
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("Devs")
            .setLabel("Devs Info")
            .setStyle(client.Buttons.grey)
            .setDisabled(true),
        );
        const guild = client.guilds.cache.get("1124739194208661514");
        const roleid = "1124739194208661514"
        const managerRole = guild.roles.cache.get(roleid);
        if(!managerRole) return;
        const membersWithRole = managerRole.members;
        const mappedServerMangers = membersWithRole.map((member) => {
            const discordTag = `${member.user.username}`;
            const discordProfileLink = `https://discord.com/users/${member.user.id}`;
            return `[${discordTag}](${discordProfileLink})`;
          })
          .join("\n");
        const devEmbed = new EmbedBuilder()
          .setAuthor({
            name: "Developer Details",
            iconURL: i.guild.iconURL({ dynamic: true }),
          })
          .setDescription(
            `Shree Ram, Mata Sita, Shree Lakshman, Shree Hanuman, Aur Vanar Sena`
          )
          .setTimestamp()
          .setColor(client.settings.COLOR)
          .setFooter({
            text: `Requested By ${message.author.username}`,
            iconURL: message.member.user.displayAvatarURL({ dynamic: true }),
          })
          .setThumbnail(
            client.user.displayAvatarURL({ dynamic: true, size: 2048 })
          );
        await msg.edit({ embeds: [devEmbed], components: [row2] });
      } else if (i.customId === "bot") {
        await i.deferUpdate();
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("bot")
            .setLabel("Bot Stats")
            .setStyle(client.Buttons.grey)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId("system")
            .setLabel("System Stats")
            .setStyle(client.Buttons.grey)
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("Dev")
            .setLabel("Devs Info")
            .setStyle(client.Buttons.grey)
            .setDisabled(false)
        );
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `${client.user.username}'s Stats!`,
            iconURL: i.guild.iconURL({ dynamic: true }),
          })
          .setDescription(
            `- Bot Tag **${client.user.tag}**\n` +
              `- Servers **${guildCount}**\n` +
              `- Users **${totalUsers}** (Cached : ${cachedUser})\n` +
              `- Channels **${channelCount}**\n` +
              `- Commands **${totalCommands}**\n` +
              `- Shards Count **${totalShards1}**\n` +
              `- Discord.js **${djsversion}**\n` +
              `- Uptime <t:${uptime}:R>`
          )
          .setColor(client.settings.COLOR)
          .setThumbnail(
            client.user.displayAvatarURL({ dynamic: true, size: 2048 })
          )
          .setTimestamp()
          .setFooter({
            text: `Requested By ${message.author.username}`,
            iconURL: message.member.user.displayAvatarURL({ dynamic: true }),
          });
        await msg.edit({ embeds: [embed], components: [row] });
      }
    });
  },
};












