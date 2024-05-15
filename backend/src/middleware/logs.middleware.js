const fs = require("fs");

const determineLogFiles = (req, res, next) => {
  if (req.query.source === "all") {
    const logDirectory = "src/logs";
    const logFiles = fs.readdirSync(logDirectory);
    const logFilePaths = logFiles.map(
      (fileName) => `${logDirectory}/${fileName}`
    );

    req.logFilePaths = logFilePaths;
  } else {
    const logFileName = req.query.source;

    const logFilePath = `src/logs/${logFileName}.log`;

    const logFilePaths = [logFilePath];

    req.logFilePaths = logFilePaths;
  }

  next();
};

module.exports = determineLogFiles;
