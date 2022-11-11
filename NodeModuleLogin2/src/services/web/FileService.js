const ejs = require("ejs");

class FileService {
  async readViewEjs(path, params) {
    const html = ejs.renderFile(
      `./src/views/${path}`,
      {
        ...params,
      },
      { async: true }
    );

    if (!html) {
      throw new Error("noReadingFile");
    }

    return html;
  }
}

module.exports = new FileService();
