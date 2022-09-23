import dotenv from "dotenv";
dotenv.config();

import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import selectRandomFlexitGif from "./src/random-flexit-gif.js";
import anonimniName from "./src/anonimni-name.js";

const isDevMode = process.env.NODE_ENV === "dev";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.on("ready", async () => {
  console.log("Bot ready!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  const hasMentionedFlexit = message.mentions.roles.some((mentioned_role) => mentioned_role.name.includes("League"));
  const only4ofAkind = isDevMode ? message.author.username === "4ofAkind" : true;

  if (only4ofAkind && hasMentionedFlexit) {
    const gif = selectRandomFlexitGif.execute();
    const response = new EmbedBuilder().setTitle("FLEXIT").setImage(gif);
    message.channel.send({ embeds: [response] });
  }

  if (message.content === "*name random") {
    const guild = client.guilds.cache.find((guild) => guild.id === message.guildId);
    if (!guild) return;

    const member = guild.members.cache.find((member) => member.id === message.author.id);
    if (!member) return;

    await anonimniName.execute(member, true);
  }
});

client.on("guildMemberAdd", async (member) => {
  await anonimniName.execute(member);
});
