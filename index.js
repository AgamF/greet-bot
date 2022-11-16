import Discord, { GatewayIntentBits, IntentsBitField } from "discord.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const client = new Discord.Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  const prefix = "~";
  let indice;
  if (msg.author.bot) return;
  else {
    const strarr = msg.content.split(" ");
    strarr.forEach((str, index) => {
      if (str === "im" || str === "i'm" || str === "I'm" || str === "I'M" || str === "IM" || str === "i`m" || str === "I`m") {
        indice = index + 1;
        msg.reply({
          content: `Hello ${strarr[indice]}, i'm Adonis 😁`
        });
      } else return;
    });
  }
  if (msg.content.startsWith(prefix + "getmeme")) {
    fetch("https://meme-api.herokuapp.com/gimme")
    .then(res => res.text())
    .then(text => {
      const data = JSON.parse(text);
      msg.channel.send(data.url);
    });
  }
}); 

client.login(process.env.TOKEN);