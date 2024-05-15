const LogIngestor = require("../utils/logIngestor");

const logger = new LogIngestor();
const BASE_URL = "https://api.github.com";
const username = "devendra-dantal0";

const getUserRepositories = async (req, res) => {
  const requestData = {
    method: req.method,
    url: req.url,
    username: username,
  };

  try {
    console.log("Hello");
    logger.info("api2", "Request to fetch user repositories", requestData);

    const response = await fetch(`${BASE_URL}/users/${username}/repos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch user repositories.`;
      logger.error("api2", errorMessage, requestData);
      return res.status(500).json({
        message: errorMessage,
      });
    }

    const repositories = await response.json();
    logger.success(
      "api2",
      "User repositories fetched successfully",
      requestData
    );
    res.status(200).json({
      repositories,
    });
  } catch (error) {
    logger.error(
      "api2",
      "Error in fetching user repositories",
      requestData,
      error
    );
    res.status(500).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
};

module.exports = {
  getUserRepositories,
};
