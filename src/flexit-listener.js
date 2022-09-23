import randomFlexitGif from "./commands/random-flexit-gif.js";

const listenToFlexit = (messageObj) => {
  const hasMentionedFlexit = messageObj.mentions.roles.some((mentioned_role) => mentioned_role.name.includes("League"));
  if (hasMentionedFlexit) randomFlexitGif.execute(messageObj, undefined);
};

export default { execute: listenToFlexit };
