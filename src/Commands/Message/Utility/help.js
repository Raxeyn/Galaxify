import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} from "discord.js";

export default {
  name: "help",
  aliases: ["h"],
  category: 'Utility',
  permission: "",
  desc: "!",
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
  run: async ({ client, message, args }) => {
    if (!args[0]) {
      let flexx = new EmbedBuilder()
        .setColor("#000000") // Add your desired color manually here
        .setAuthor({ name: `${client.user.username} HelpDesk`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`Hey ${message.author}! I am ${client.user.username}, A Feature-Rich Music Bot Built To Deliver The Best Music Experience To User In Discord.\n\n <a:arrow_kastro:1064408073478869002> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) | [Support](https://discord.com/invite/aMC2e8zgQb)`)
        .addFields({
          name: `Command Categories`,
          value: `<:music__kastro:1064440924190539888> \`:\` Music \n <:stars_kastro:1064433446044315728> \`:\` Filters \n <:Icons_utility:1069995603381211146> \`:\` Utility`,
        })
        .setFooter({ text: `Jai Siya Ram..!`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

      let b1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`music`).setEmoji('1064440924190539888');
      let b2 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`filters`).setEmoji('1064433446044315728');
      let b3 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`utility`).setEmoji('1069995603381211146');

      let row = new ActionRowBuilder().addComponents(b1, b2, b3);

      const messageResponse = await message.reply({ embeds: [flexx], components: [row] });

      const collector = messageResponse.createMessageComponentCollector({
        filter: i => i.user.id === message.author.id,
        time: 60000, // 1 minute timeout
      });

      collector.on('collect', async interaction => {
        const category = interaction.customId;

        let commands;
        let categoryTitle;

        switch (category) {
          case 'music':
            commands = ['247', 'Autoplay', 'Clear', 'Disconnect', 'Grab', 'Join', 'Loop', 'Lyrics', 'Pause', 'Play', 'Previous', 'Queue', 'Remove', 'Resume', 'Search', 'Seek', 'Shuffle', 'Skip', 'Soundcloud', 'Spotify', 'Stop', 'Volume'];
            categoryTitle = 'Music Commands';
            break;

          case 'filters':
            commands = ['8d', 'Bass', 'Basboost', 'Chimpuk', 'China', 'Dance', 'Darthvader', 'Daycore', 'Doubletime', 'Treblebass'];
            categoryTitle = 'Filter Commands';
            break;

          case 'utility':
            commands = ['Invite', 'Ping', 'Prefix', 'Stats', 'Support', 'Uptime', 'Vote'];
            categoryTitle = 'Utility Commands';
            break;

          default:
            commands = [];
            categoryTitle = '';
            break;
        }

        const categoryEmbed = new EmbedBuilder()
          .setColor("#000000") // Add your desired color manually here
          .setTitle(categoryTitle)
          .setDescription(commands.join(', '));

        await interaction.reply({ embeds: [categoryEmbed], ephemeral: true });
      });

      collector.on('end', collected => {
        if (collected.size > 0) {
          // If any buttons were clicked, update the original message with no components
          messageResponse.edit({ components: [] });
        }
      });
    }
  }
};
