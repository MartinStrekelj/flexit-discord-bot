import axios from "axios";

const API_URL = "https://api.adviceslip.com/advice";

const handler = async (messageObj, _client) => {
  try {
    const response = await axios.get(API_URL);
    const { advice } = response.data.slip;
    messageObj.channel.send(advice);
  } catch (e) {
    console.error(e);
    messageObj.channel.send("Looks like I am out of advices :sad:");
  }
};

export default { execute: handler };
