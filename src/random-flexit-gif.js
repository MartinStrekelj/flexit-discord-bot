import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { draw } from "radash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GIF_PATH = path.join(__dirname, "..", "data", "gifs.json");

const json = JSON.parse(fs.readFileSync(GIF_PATH, "utf8"));

const selectRandomFlexitGif = () => {
  const { gifs } = json;
  return draw(gifs);
};

export default { execute: selectRandomFlexitGif };
