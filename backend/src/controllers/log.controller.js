const fs = require("fs");
const readline = require("readline");

const fetchRecordsFromFile = (filePath, filters) => {
  return new Promise((resolve, reject) => {
    const filteredRecords = [];

    // Create a readline interface to read the log file line by line
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      const logEntry = JSON.parse(line);

      if (
        (!filters.level || logEntry.level === filters.level) &&
        (!filters.logString ||
          logEntry.log_string.includes(filters.logString)) &&
        (!filters.startTime ||
          new Date(logEntry.timestamp) >= new Date(filters.startTime)) &&
        (!filters.endTime ||
          new Date(logEntry.timestamp) <= new Date(filters.endTime))
      ) {
        filteredRecords.push(logEntry);
      }
    });

    rl.on("close", () => {
      resolve(filteredRecords);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
};

const fetchLogRecords = async (req, res) => {
  try {
    const filters = {
      level: req.query.level || "",
      logString: req.query.q || "",
      startTime: req.query.startTime || "",
      endTime: req.query.endTime || "",
    };

    const logFilePaths = req.logFilePaths;

    const allRecords = [];

    for (const filePath of logFilePaths) {
      const fileRecords = await fetchRecordsFromFile(filePath, filters);
      allRecords.push(...fileRecords);
    }

    res.status(200).json({
      response: "ok",
      logs: allRecords,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

module.exports = {
  fetchLogRecords,
};
