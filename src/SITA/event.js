import fs from "fs";
import chalk from "chalk";

export default class EventLoader{
  constructor(client) {
    this.client = client;
  }
  async LoadEvents() {
    let eventcount = 0;
    const events = fs.readdirSync("./src/Events/Client").filter((file) => file.endsWith(".js"));
    for (let file of events) {
      let event = (await import(`../Events/Client/${file}`)).default;
      this.client.on(file.split(".")[0], event.bind(null, this.client));
      eventcount++;
    }
    console.log(chalk.green(`Kronix | JAI SIYA RAM | Client Events Loaded - ${eventcount}`));
  }
}
