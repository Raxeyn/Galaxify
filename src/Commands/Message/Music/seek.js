import { EmbedBuilder } from "discord.js";

export default{
  name: "seek",
  aliases: [],
  category: "Music",
  permission: "",
   desc: "Seeks The Playing Song To The Give Time!",
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
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message, player: import("kazagumo").Player }}
   */
  run: async ({ client, message, args }) => {
    const player = client.kazagumo.players.get(message.guild.id);
    if (!player) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: "No Player Found For This Guild!",
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setColor(client.settings.COLOR);
      return message.channel.send({ embeds: [embed] });
    }
    if (!args[0]) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(
              `Use the command again, and this provide a duration to seek.`
            ),
        ],
      });
    }
    if (!player.queue.current.isSeekable) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(`\`\`\`diff\n-This track isn't seekable.\`\`\``),
        ],
      });
    }
    if (!/^[0-5]?[0-9](:[0-5][0-9]){1,2}$/.test(args[0])) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(
              `\`\`\`fix\nYou provided an invalid duration. Valid duration e.g. <1:69>\`\`\``
            ),
        ],
      });
    }
    let ms = () => {
      return (
        args[0]
          .split(":")
          .map(Number)
          .reduce((a, b) => a * 60 + b, 0) * 1000
      );
    };
    ms = ms();
    if (ms > player.queue.current.length) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(`#FF0000`)
            .setDescription(
              `\`\`\`diff\n-The duration you provided exceeds the duration of the current track.\`\`\``
            ),
        ],
      });
    }
   
    track = player.queue.current;
    player.position = ms ? ms : 0;
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.settings.COLOR)
          .setDescription(
            `\`\`\`fix\nSeeked to ${duration(ms)} of the current track.\`\`\``
          ),
      ],
    });
  }
};









