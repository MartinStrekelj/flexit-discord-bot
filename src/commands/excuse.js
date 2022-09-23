import axios from "axios";

const API_URL = "https://excuser.herokuapp.com/v1/excuse";

const handler = async (messageObj, _client) => {
  try {
    const response = await axios.get(API_URL);
    const { excuse } = response.data[0];
    if (!excuse) {
      throw new Error();
    }
    messageObj.channel.send(excuse);
  } catch (e) {
    console.error(e);
    messageObj.channel.send("Looks like I am out of excuses :sad:");
  }
};

export default { execute: handler };
