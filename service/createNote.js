const fs = require('fs').promises;

const dir = process.env.DATA_PATH;
async function writeNote(title, content) {
  try {
    const noteDir = dir + title + '.txt';
    fs.writeFile(noteDir, content);
  } catch {
    console.error(err);
  }
}

module.exports(writeNote);
