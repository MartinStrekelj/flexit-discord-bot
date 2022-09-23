import { EmbedBuilder } from "discord.js";

const handler = (messageObj, COMMANDS) => {
  const response = new EmbedBuilder()
    .setTitle("Flexit bot")
    .setColor(0x0099ff)
    .setDescription("Available commands:")
    .setThumbnail(
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Faf%2F69%2F26%2Faf6926a397ec6d2dd1394fbe61891905.jpg&f=1&nofb=1"
    );

  Object.values(COMMANDS).forEach((c) => {
    response.addFields({ name: c, value: "\u200b" });
  });

  messageObj.channel.send({ embeds: [response] });
};

export default { execute: handler };
