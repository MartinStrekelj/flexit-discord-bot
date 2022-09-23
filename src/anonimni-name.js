import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { draw } from "radash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NICKNAMES_PATH = path.join(__dirname, "..", "data", "nicknames.json");

const json = JSON.parse(fs.readFileSync(NICKNAMES_PATH, "utf8"));

const ANONIMNI = "Anonimni";

const changeName = async (member, force = false) => {
  if (!force && isAnonimni(member.displayName)) {
    return;
  }

  const { guild } = member;
  let newNickame = generateRandomAnonimniNickname();
  while (!isNicknameUnique(newNickame, guild)) {
    newNickame = generateRandomAnonimniNickname();
  }

  await member.setNickname(newNickame);
};

const generateRandomAnonimniNickname = () => {
  const { nicknames } = json;
  const nickname = draw(nicknames);
  const anonimniNickname = `${ANONIMNI} ${nickname}`;
  return anonimniNickname;
};

const isNicknameUnique = (name, discordServer) => {
  const displayNames = discordServer.members.cache.map((user) => user.displayName);
  const nameExists = displayNames.some((existingName) => existingName === name);
  return !nameExists;
};

const isAnonimni = (name) => name.includes(ANONIMNI);

const handler = async (_messageObj, client) => {
  try {
    const guild = client.guilds.cache.find((guild) => guild.id === _messageObj.guildId);
    if (!guild) return;

    const member = guild.members.cache.find((member) => member.id === _messageObj.author.id);
    if (!member) return;

    await changeName(member, true);
  } catch (e) {
    console.error(e.message);
  }
};

export default { execute: changeName, commandExecute: handler };
