import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { draw } from "radash";
import { EmbedBuilder } from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GIF_PATH = path.join(__dirname, "..", "..", "data", "gifs.json");

const json = JSON.parse(fs.readFileSync(GIF_PATH, "utf8"));

const selectRandomFlexitGif = () => {
  const { gifs } = json;
  return draw(gifs);
};

const handler = (messageObj, _client) => {
  const gif = selectRandomFlexitGif();
  const response = new EmbedBuilder().setTitle("FLEXIT").setImage(gif);
  messageObj.channel.send({ embeds: [response] });
};

export default { execute: handler };
