import {
  ChannelType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  PermissionsBitField,
} from "discord.js";
import Config from "../../config.js";
import config from "../../config.js";
import ServerSchema from "../../Models/ServerData.js";
import { WebhookClient } from "discord.js";
const hook = new WebhookClient({ url: config.WEBHOOK });

/**
 * @param {import("../RAM/Client")} client
 * @param {import("discord.js").Message} message
 * @param {import("kazagumo").Player} player
 */
export default async (client, message) => {
  let noprefix = await client.db.get(`noprefix_${message.author.id}`);
  let emojis;
  let Color = Config.COLOR;
  if (!message.inGuild() || message.author.bot) return;
  if (
    message.channel.type == ChannelType.DM ||
    message.channel.type == ChannelType.GuildForum
  )
    return;
  if (message.partial) await message.fetch();

  let ServerData = async () => {
    if (await ServerSchema.findOne({ serverID: message.guild.id })) {
      return await ServerSchema.findOne({ serverID: message.guild.id });
    } else {
      return new ServerSchema({ serverID: message.guild.id }).save();
    }
  };
  ServerData = await ServerData();
  let { prefix } = ServerData;
  if(prefix) prefix = Config.PREFIX;

  const permissions = {
    userExternalEmoji: PermissionsBitField.Flags.UseExternalEmojis,
    viewChannel: PermissionsBitField.Flags.ViewChannel,
    sendMessages: PermissionsBitField.Flags.SendMessages,
    embedLinks: PermissionsBitField.Flags.EmbedLinks,
    manageChannels: PermissionsBitField.Flags.ManageChannels,
    manageServer: PermissionsBitField.Flags.ManageGuild,
    admin: PermissionsBitField.Flags.Administrator,
    voiceJoin: PermissionsBitField.Flags.Connect,
  };
  if (
    !message.guild.members.cache
      .get(client.user.id)
      .permissionsIn(message.channel)
      .has(permissions.userExternalEmoji) &&
    message.channel
      .permissionsFor(client.user)
      .has(permissions.userExternalEmoji) &&
    message.guild.roles.everyone.permissions.has(
      permissions.userExternalEmoji
    ) &&
    message.channel
      .permissionsFor(message.guild.roles.everyone)
      .has(permissions.userExternalEmoji)
  ) {
    emojis = {
      check: "✅",
      cross: "❌",
    };
  } else {
    emojis = {
      check: "✅",
      cross: "❌",
    };
  }
  let hi = "";
  const prefixMatch = "900981299022536757"
  try {
    var p1 = client.kazagumo.players.get(message.guild.id);
    if (!p1) hi = "Not In Vc";
    else {
      const cold = message.guild.channels.cache.get(p1.voiceId);
      hi = cold.rtcRegion;
    }
  } catch (e) {
    console.log(`Kronix | JAI SIYA RAM | ${e}`);
  }
  if (
    message.content === `<@!${client.user.id}>` ||
    message.content === `<@${client.user.id}>`
  ) {
    const embed = new EmbedBuilder()
			.setTitle(`Settings for this server`)
      .setDescription(
        `The prefix is set to: \`${prefix}\`\nServer ID: \`${message.guild.id}\`\n\nYou can play music by joining a voice channel and typing \`-play\`.
Type \`-help\` to get all commands help menu.`
      )
      .setColor('1e5eb9')
		  .setFooter({ text: `Thanks For Choosing RAM!`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Support Server")
        .setURL("https://discord.gg/aMC2e8zgQb")
      .setStyle(client.Buttons.link),

      new ButtonBuilder()
        .setLabel("Invite Me")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.id}&permissions=40499997671265&scope=bot+applications.commands`)
      .setStyle(client.Buttons.link),

			new ButtonBuilder()
        .setLabel("Website")
        .setStyle(client.Buttons.link)
        .setURL("https://discord.com/invite/aMC2e8zgQb")
    );
    return message.reply({ embeds: [embed], components: [row] });
  }
  if (
    client.owner.includes(message.member.id) &&
    !message.content.startsWith(prefix)
  )

    //noprefix
    if (noprefix &&
          !message.content.startsWith(prefix)) prefix = "";
  const escapeRegex = (newprefix) => {
    return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  };
  const mentionprefix = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})`
  );
  if (!mentionprefix.test(message.content)) return;
  const [content] = message.content.match(mentionprefix);
  let player = await client.kazagumo.players.get(message.guild.id);
  
  const args = message.content.slice(content.length).trim().split(/ +/);
  
  const cmd = args.length > 0 ? args.shift().toLowerCase() : null;
  const command =
    client.messageCommands.get(cmd) || 
    client.messageCommands.find(
      (cmds) => cmds.aliases && cmds.aliases.includes(cmd)
    );
  if (command) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild.name}`,
        iconURL: message.guild.iconURL({ dynamic: true }),
        url: "https://discord.gg/aMC2e8zgQb",
      })
      .setDescription(
        ` > • Command Name - **${command.name}**\n > • Used By - **${message.author.username}**\n > • In Channel - **[${message.channel.name}](https://discord.com/channels/${message.guild.id}/${message.channel.id})**\n > • User  - **${message.author.id} (${message.author})**`
      )
      .setColor(Color)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setFooter({ text: `Guild ID - ${message.guild.id}` })
      .setTimestamp();
    if (args.length > 0) {
      embed.addFields({
        name: "Arguments",
        value: args.join(" "),
        inline: true,
      });
    }
    hook.send({ embeds: [embed] });
    if (command.options.owner && !client.owner.includes(message.member.id) && !prefixMatch.includes(message.member.id)) {
      const embed = new EmbedBuilder()
        .setColor(Color)
        .setAuthor({
          name: "You are not allowed to use this command!",
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        });
      return message.reply({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
    }
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(message.channel)
        .has(permissions.viewChannel)
    )
      return;
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(message.channel)
        .has(permissions.sendMessages) ||
      !message.channel
        .permissionsFor(client.user)
        .has(PermissionsBitField.Flags.SendMessages)
    ) {
      const embed = new EmbedBuilder().setColor(client.settings.ec).setAuthor({
        name: `I don't have permission to send messages in ${message.guild.name}!`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
      return message.member.send({ embeds: [embed] }).catch(() => {});
    }
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(message.channel)
        .has(permissions.embedLinks) ||
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(message.channel)
        .has(PermissionsBitField.Flags.EmbedLinks)
    ) {
      const embed = new EmbedBuilder()
      .setColor(Color)
      .setAuthor({
        name: `I don't have Embed Links Permission in ${message.channel.name}! To Run ${command.name}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
      return message.channel.send({ embeds: [embed] }).catch(() => {});
    }
    let perms = [];
    if(command.permission) perms = command.permission;
    if (
      command.permission &&
      !message.member.permissions.has(PermissionsBitField.Flags.perms) &&
      !client.owners.includes(message.member.id)
    ) {
      const embed = new EmbedBuilder()
        .setColor(Color)
        .setAuthor({
          name: `Lack Of Permission!`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          `You need \`${command.permission}\` permission to run this command!`
        );
      return message.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    }
    if (command.options.inVc && !message.member.voice.channel) {
      const embed = new EmbedBuilder().setColor(Color).setAuthor({
        name: `You Are Not In A Voice Channel! Try After Joining A VC. `,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
      return message.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    }
    if (
      command.options.sameVc &&
      message.guild.members.cache.get(client.user.id).voice.channel &&
      message.guild.members.cache.get(client.user.id).voice.channel !==
        message.member.voice.channel
    ) {
      const embed = new EmbedBuilder()
        .setColor(Color)
        .setDescription(
          `You Must Be In <#${message.guild.me.voice.channel.id}> To Run This Command!`
        );
      return message.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    }
    if (
      command.options.player.active &&
      !player &&
      !client.owner.includes(message.member.id)
    ) {
      const embed = new EmbedBuilder()
        .setColor(Color)
        .setDescription(`**Cold Is Not Playing Anything Right Now!**`);
      return message.channel.send({ embeds: [embed] });
    }
    if (
      command.options.player.playing &&
      player &&
      !player.playing &&
      !client.owner.includes(message.member.id)
    ) {
      const embed = new EmbedBuilder()
        .setColor(Color)
        .setDescription(`**Cold Is Not Playing Anything Right Now!**`);
      return message.channel.send({ embeds: [embed] });
    }
    if (command.options.vote) {
      let voted = await topgg.hasVoted(user.id);
      if (!voted && !client.owner.includes(message.member.id)) {
        const embed = new EmbedBuilder()
          .setColor(Color)
          .setDescription(
            `You Need To Vote For Ram Bhajan On Top.gg To Run This Command!`
          );

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Vote Me")
            .setStyle(client.ButtonLink)
            .setURL(`https://top.gg/bot/${client.user.id}/vote`)
        );
        return message.channel.send({ embeds: [embed], components: [row] });
      }
    }
    if (
      command.options.premium &&
      !ServerData.premium &&
      !client.owner.includes(message.member.id)
    ) {
      const embed = new EmbedBuilder()
        .setColor(Color)
        .setAuthor({
          name: "Premium Command Discovered",
          iconURL: client.user.avatarURL({ dynamic: true }),
        })
        .setDescription(
          `**Looks Like You Found A Premium Command!** This Command Is Valid For Premium Servers Only! Buy Premium By Joining [Support Server](https://discord.gg/aMC2e8zgQb) `
        )
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Premium")
          .setEmoji("1009435997534175323")
          .setStyle(client.ButtonLink)
          .setURL(`https://discord.gg/aMC2e8zgQb`),
        new ButtonBuilder()
          .setLabel("Buy For Free")
          .setEmoji("1071384664083808346")
          .setStyle(client.ButtonLink)
          .setURL(`https://discord.gg/aMC2e8zgQb`)
      );
      return message.channel.send({ embeds: [embed], components: [row] });
    }

    command.run({ client, message, args, emojis, player ,ServerData, Color});
  }
};
















