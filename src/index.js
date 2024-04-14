import { ClusterManager } from "discord-hybrid-sharding";
import express from "express";

const app = express();
const PORT = 3000;

const manager = new ClusterManager(`./src/ram.js`, {
  totalShards: "auto",
  shardsPerClusters: 2,
  totalClusters: "auto",
  mode: 'process',
  token: process.env.TOKEN, // Use process.env.TOKEN directly
});
manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });

app.get('/', (req, res) => {
  const message = `JAI SHREE RAM... \n\n ~ iShowKronix`;
  res.send(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
