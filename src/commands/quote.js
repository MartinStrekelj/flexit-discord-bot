import axios from "axios";
import { EmbedBuilder } from "discord.js";

const API_URL = "https://movie-quote-api.herokuapp.com/v1/quote/";

const handler = async (messageObj, _client) => {
  try {
    const response = await axios.get(API_URL);
    const { quote, role, show } = response.data;
    const embed = new EmbedBuilder().setTitle(`${role} in ${show}`).setDescription(`${quote}`);
    messageObj.channel.send({ embeds: [embed] });
  } catch (e) {
    console.error(e);
    messageObj.channel.send("Looks like I am out of quotes :sad:");
  }
};

export default { execute: handler };
