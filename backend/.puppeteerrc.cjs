/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  skipDownload: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
};
