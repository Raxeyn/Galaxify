import { EmbedBuilder, ButtonBuilder, ActionRowBuilder } from "discord.js";
//import pkg from "discord.js";
//const { splitMessage } = pkg;
//import { inspect } from "util";

export default {
  name: "reload",
  aliases: ["rr"],
  category: "Owner",
  desc: "Reloads a command",
  options: {
    owner: true,
    inVc: false,
    sameVc: false,
    player: {
      playing: false,
      active: false,
    },
    premium: false,
    vote: false,
  },
  run: async ({ client, message, args, player, Color, ServerData }) => {
    const cmd = args.length > 0 ? args.shift().toLowerCase() : null;

    const command =
      client.messageCommands.get(cmd) ||
      client.messageCommands.find(
        (cmds) => cmds.aliases && cmds.aliases.includes(cmd)
      );

    if (!command)
      return message.channel.send(
        `There is no command with name or alias \`${cmd}\`, ${
          message.author
        }!`
      );

    try {
      delete require.cache[require.resolve(`./${command.category}/${command.name}.js`)];

      const newCommand = require(`./${command.category}/${command.name}.js`);
      client.messageCommands.set(newCommand.name, newCommand);
      
      message.channel.send({
        content: `Successfully Reloaded **${newCommand.name}** Command`,
      });
    } catch (error) {
      console.error(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${
          error.message
        }\``
      );
    }
  },
};
