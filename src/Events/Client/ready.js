import { ActivityType } from "discord.js";
import chalk from "chalk";
import reconnectAuto from "../../Models/reconnect.js";

/**
 * @param {import("../RAM/Client")} client
 */
export default async (client) => {
  try {
    const [totalGuilds, totalChannels, totalUsersArray] = await Promise.all([
      client.cluster.broadcastEval((c) => c.guilds.cache.size),
      client.cluster.broadcastEval((c) => c.channels.cache.size),
      client.cluster.broadcastEval((c) => c.users.cache.size),
    ]);

    console.log(`Kronix | JAI SIYA RAM | Total Servers - ${totalGuilds.reduce((prev, val) => prev + val, 0)}`);
    console.log(`Kronix | JAI SIYA RAM | Total Channels - ${totalChannels.reduce((prev, val) => prev + val, 0)}`);
    console.log(`Kronix | JAI SIYA RAM | Total Users - ${totalUsersArray.reduce((prev, val) => prev + val, 0)}`);

    let totalUsers = 0;
    client.guilds.cache.forEach((guild) => {
      totalUsers += guild.available ? guild.memberCount : 0;
    });

    console.log(chalk.green(`Kronix | JAI SIYA RAM | ${client.user.tag} Ready In Action!`));

    const maindata = await reconnectAuto.find();
    console.log(
      `Kronix | JAI SIYA RAM | Auto Reconnect found ${
        maindata.length
          ? `${maindata.length} queue${maindata.length > 1 ? "s" : ""}. Resuming all auto reconnect queue`
          : "0 queue"
      }`,
      "player"
    );

    for (const [index, data] of maindata.entries()) {
      setTimeout(async () => {
        const text = client.channels.cache.get(data.TextId);
        const guild = client.guilds.cache.get(data.GuildId);
        const voice = client.channels.cache.get(data.VoiceId);

        if (!guild || !text || !voice) {
          console.error(`Kronix | JAI SIYA RAM | Failed to reconnect: Invalid guild, text, or voice channel for data at index ${index}`);
          return;
        }

        try {
          const player = await client.kazagumo.createPlayer({
            guildId: guild.id,
            textId: text.id,
            voiceId: voice.id,
            deaf: true,
            shardId: guild.shardId,
          });

          // Do something with the created player if needed
        } catch (error) {
          console.error(`Kronix | JAI SIYA RAM | Failed to create player for data at index ${index}:`, error.message);
        }
      }, index * 5000);
    }

    console.log(`Kronix | JAI SIYA RAM | Reconnected to ${maindata.length} guild${maindata.length > 1 ? "s" : ""}`);
    console.log(chalk.green(`Kronix | JAI SIYA RAM | Cluster #${client.cluster.id} Is Stable!`));

    setInterval(() => {
      let statuses = [
        { name: "Ram Bhajan", type: ActivityType.Listening, details: "The Phone online" },
        { name: "Jai Siya Ram", type: ActivityType.Playing },
        { name: "Jai Siya Ram", type: ActivityType.Streaming, url: "https://twitch.tv/kronix" },
      ];

      let status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status.name, { type: status.type, url: status.url, details: status.details });
      client.user.setPresence({
        status: "dnd", // or "idle" or "dnd"
        activity: { name: status.name, type: status.type, url: status.url, details: status.details },
        clientStatus: { mobile: true },
      });
    }, 5000);
  } catch (error) {
    console.error("Kronix | JAI SIYA RAM | ", error);
  }
};
