import {
  WebhookClient,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} from "discord.js";
const config = "../../config.js";
const hook = new WebhookClient({ url: "https://discord.com/api/webhooks/1165186741355937793/TQ7X_cUoDU0yjLT9_IlnFqBIAjKen2kCIIw7G-zpVOEZv0pigsBfrHdofyiuGw8QHfiv" });

export default async (client, guild) => {
  await client.guilds.fetch({ cache: true });
  client.cluster.broadcastEval((c) => c.guilds.cache.size);
  client.cluster.broadcastEval((c) => c.channels.cache.size);
  client.cluster.broadcastEval((c) => c.users.cache.size);
  const embed = new EmbedBuilder()
    .setDescription(
      `I Joined **${guild.name}** (Members ${guild.memberCount + 1} )`
    )
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setColor(client.settings.COLOR);
  hook.send({
    content: "**Server Joined**",
    embeds: [embed],
  });
};

