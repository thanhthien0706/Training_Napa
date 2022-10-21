const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../file_reading.txt");

const event1 = fs.readFile(filePath, { encoding: "utf8" });
const event2 = fs.readFile(filePath, { encoding: "utf8" });
const event3 = fs.readFile(filePath, { encoding: "utf8" });
const event4 = fs.readFile(filePath, { encoding: "utf8" });
const event5 = fs.readFile(filePath, { encoding: "utf8" });
const event6 = fs.readFile(filePath, { encoding: "utf8" });
const event7 = fs.readFile(filePath, { encoding: "utf8" });
const event8 = fs.readFile(filePath, { encoding: "utf8" });
const event9 = fs.readFile(filePath, { encoding: "utf8" });
const event10 = fs.readFile(filePath, { encoding: "utf8" });
const event11 = fs.readFile(filePath, { encoding: "utf8" });
const event12 = fs.readFile(filePath, { encoding: "utf8" });
const event13 = fs.readFile(filePath, { encoding: "utf8" });
const event14 = fs.readFile(filePath, { encoding: "utf8" });
const event15 = fs.readFile(filePath, { encoding: "utf8" });
const event16 = fs.readFile(filePath, { encoding: "utf8" });
const event17 = fs.readFile(filePath, { encoding: "utf8" });
const event18 = fs.readFile(filePath, { encoding: "utf8" });
const event19 = fs.readFile(filePath, { encoding: "utf8" });
const event20 = fs.readFile(filePath, { encoding: "utf8" });

async function handleReadingFile() {
  try {
    const handle1 = await Promise.all([event1, event2, event3, event4, event5]);
    const handle2 = await Promise.all([
      event6,
      event7,
      event8,
      event9,
      event10,
    ]);
    const handle3 = await Promise.all([
      event11,
      event12,
      event13,
      event14,
      event15,
    ]);
    const handle4 = await Promise.all([
      event16,
      event17,
      event18,
      event19,
      event20,
    ]);

    console.log(handle1);
    console.log(handle2);
    console.log(handle3);
    console.log(handle4);
  } catch (error) {
    console.log(error.message);
  }
}

handleReadingFile();
