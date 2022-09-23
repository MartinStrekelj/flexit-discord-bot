import axios from "axios";
import { EmbedBuilder } from "discord.js";

const API_URL = "https://meme-api.herokuapp.com/gimme";

const handler = async (messageObj, _client) => {
  try {
    const response = await axios.get(API_URL);
    const { url, title, postLink } = response.data;
    const meme = new EmbedBuilder().setTitle(title).setURL(postLink).setImage(url);
    messageObj.channel.send({ embeds: [meme] });
  } catch (e) {
    console.error(e);
    messageObj.channel.send("Looks like I am out of memes :sad:");
  }
};

export default { execute: handler };
