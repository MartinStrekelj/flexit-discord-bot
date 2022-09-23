import dotenv from "dotenv";
dotenv.config();

const BOT_URL = process.env.BOT_URL || "http://localhost:3001";

const handler = async (messageObj, _client) => {
  messageObj.channel.send(`You can check my status @ ${BOT_URL}`);
};

export default { execute: handler };
