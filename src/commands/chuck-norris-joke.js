import axios from "axios";

const API_URL = "https://api.chucknorris.io/jokes/random";

const handler = async (messageObj, _client) => {
  try {
    const response = await axios.get(API_URL);
    const { value: joke } = response.data;
    messageObj.channel.send(joke);
  } catch (e) {
    console.error(e);
    messageObj.channel.send("Looks like I am out of jokes :sad:");
  }
};

export default { execute: handler };
