const loggerConfig = require("../config/logger.js");
const fs = require("fs");
const path = require("path");

class LogIngestor {
  constructor() {}

  // Method to log messages
  log(
    level,
    logString,
    sourceFile,
    srcFileName,
    requestData = {},
    error = null
  ) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      level,
      log_string: logString,
      timestamp,
      metadata: {
        source: srcFileName,
        request_data: requestData,
      },
    };

    // Include error stack trace if an error is provided
    if (error) {
      logEntry.error = {
        message: error.message,
        stack: error.stack,
      };
    }

    // Convert log entry to JSON string
    const logEntryString = JSON.stringify(logEntry);

    // Append log entry to the provided source file
    fs.appendFile(sourceFile, logEntryString + "\n", (err) => {
      if (err) {
        console.error("Error appending log to file:", err);
      } else {
        console.log("Log appended to file successfully:", sourceFile);
      }
    });
  }

  // Method to log information messages
  info(source, logString, requestData = {}) {
    const srcFilePath = loggerConfig[source].logFilePath;
    const srcFileName = loggerConfig[source].srcFileName;
    console.log(srcFilePath, srcFileName);
    this.log("info", logString, srcFilePath, srcFileName, requestData);
  }

  // Method to log error messages
  error(source, logString, requestData = {}, error) {
    const srcFilePath = loggerConfig[source].logFilePath;
    const srcFileName = loggerConfig[source].srcFileName;

    console.log(srcFilePath, srcFileName);
    this.log("error", logString, srcFilePath, srcFileName, requestData, error);
  }

  // Method to log success messages
  success(source, logString, requestData = {}) {
    const srcFilePath = loggerConfig[source].logFilePath;
    const srcFileName = loggerConfig[source].srcFileName;
    this.log("success", logString, srcFilePath, srcFileName, requestData);
  }
}

module.exports = LogIngestor;
