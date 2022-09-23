import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { cluster, shuffle } from "radash";

const API_URL = "https://catchtheshow.herokuapp.com/api/charts/hot";

const handler = async (messageObj, _client) => {
  try {
    const response = await axios.get(API_URL);
    const shows = response.data;
    const random3Shows = cluster(shuffle(shows), 3)[0];
    random3Shows.forEach((show) => {
      const { name, description, rating, imageUrl } = show;
      const showEmbed = new EmbedBuilder()
        .setTitle(name)
        .setFields({ name: "Description", value: description }, { name: "Rating", value: JSON.stringify(rating) })
        .setImage("https:" + imageUrl);
      messageObj.channel.send({ embeds: [showEmbed] });
    });
  } catch (e) {
    console.error(e);
    messageObj.channel.send("Looks like there are no good shows out there :sad:");
  }
};

export default { execute: handler };
