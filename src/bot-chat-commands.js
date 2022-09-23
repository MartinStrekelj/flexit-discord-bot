import printStatus from "./commands/print-status.js";
import anonimniName from "./anonimni-name.js";
import chuckNorrisJoke from "./commands/chuck-norris-joke.js";
import excuse from "./commands/excuse.js";
import randomMeme from "./commands/random-meme.js";
import { draw } from "radash";
import yoMamaJoke from "./commands/yo-mama-joke.js";
import help from "./commands/help.js";
import fact from "./commands/fact.js";
import topShows from "./commands/top-shows.js";
import quote from "./commands/quote.js";

const COMMANDS = {
  STATUS: "*status",
  RANDOM_NAME: "*name random",
  JOKE: "*joke",
  JOKE_CHUCK: "*joke chuck",
  JOKE_YO_MAMA: "*joke yomama",
  EXCUSE: "*excuse",
  MEME: "*meme",
  FACT: "*fact",
  TOP_SHOWS: "*tv-shows",
  QUOTE: "*quote",
  HELP: "*help",
};

const HANDLERS = {
  [COMMANDS.STATUS]: printStatus.execute,
  [COMMANDS.RANDOM_NAME]: anonimniName.commandExecute,
  [COMMANDS.JOKE]: randomJoke,
  [COMMANDS.EXCUSE]: excuse.execute,
  [COMMANDS.MEME]: randomMeme.execute,
  [COMMANDS.JOKE_CHUCK]: chuckNorrisJoke.execute,
  [COMMANDS.JOKE_YO_MAMA]: yoMamaJoke.execute,
  [COMMANDS.HELP]: (messageObj, _client) => help.execute(messageObj, COMMANDS),
  [COMMANDS.FACT]: fact.execute,
  [COMMANDS.TOP_SHOWS]: topShows.execute,
  [COMMANDS.QUOTE]: quote.execute,
};

async function randomJoke(messageObj, client) {
  const jokeCategory = draw([chuckNorrisJoke, yoMamaJoke]);
  await jokeCategory.execute(messageObj, client);
}

const isKnownCommand = (message) => {
  const allCommands = Object.values(COMMANDS);
  return allCommands.includes(message);
};

const handleCommand = async (command, messageObj, client) => await HANDLERS[command](messageObj, client);

export default { isKnownCommand, execute: handleCommand };
