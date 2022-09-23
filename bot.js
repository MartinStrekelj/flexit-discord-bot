import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";
import anonimniName from "./src/anonimni-name.js";
import botChatCommands from "./src/bot-chat-commands.js";
import flexitListener from "./src/flexit-listener.js";

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

client.on("ready", async () => {
  console.log("Bot ready!");
});

client.on("messageCreate", async (message) => {
  const only4ofAkind = isDevMode ? message.author.username === "4ofAkind" : true;

  // if (!only4ofAkind) {
  //   return;
  // }

  if (message.author.bot) {
    return;
  }

  console.log(`Message intercepted: ${JSON.stringify(message.author.username)} -> ${JSON.stringify(message.content)}`);

  flexitListener.execute(message);

  if (!botChatCommands.isKnownCommand(message.content)) {
    return;
  }

  const command = message.content;
  botChatCommands.execute(command, message, client);
});

client.on("guildMemberAdd", async (member) => {
  await anonimniName.execute(member);
});

export default { client };
