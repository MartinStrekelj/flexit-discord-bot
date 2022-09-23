import printStatus from "./commands/print-status.js";
import anonimniName from "./anonimni-name.js";

const COMMANDS = {
  STATUS: "*status",
  RANDOM_NAME: "*name random",
};

const HANDLERS = {
  [COMMANDS.STATUS]: printStatus.execute,
  [COMMANDS.RANDOM_NAME]: anonimniName.commandExecute,
};

const isKnownCommand = (message) => {
  const allCommands = Object.values(COMMANDS);
  return allCommands.includes(message);
};

const handleCommand = async (command, messageObj, client) => {
  await HANDLERS[command](messageObj, client);
};

export default { isKnownCommand, execute: handleCommand };
