import axios from "axios";

const API_URL = "https://uselessfacts.jsph.pl/random.json?language=en";

const handler = async (messageObj, _client) => {
  try {
    const response = await axios.get(API_URL);
    const { text: fact } = response.data;
    messageObj.channel.send(fact);
  } catch (e) {
    console.error(e);
    messageObj.channel.send("Looks like I am out of facts :sad:");
  }
};

export default { execute: handler };
