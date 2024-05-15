const LogIngestor = require("../utils/logIngestor");

const logger = new LogIngestor();
const BASE_URL = "https://reqres.in/";

const loginUser = async (req, res) => {
  const requestData = {
    method: req.method,
    url: req.url,
  };

  try {
    logger.info("api1", "Request to log in user", requestData); // Log the incoming request

    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "peter@klaven",
      }),
    });

    if (!response.ok) {
      const errorMessage = `Failed to log in user.`;
      // Log error if login fails
      logger.error("api1", errorMessage, requestData);
      return res.status(500).json({
        message: errorMessage,
      });
    }

    // Log successful login
    logger.success("api1", "User logged in successfully", requestData);
    res.status(200).json({
      message: "User logged in successfully.",
    });
  } catch (error) {
    logger.error("api1", "Error in logging in user", requestData, error); // Log any unexpected errors
    res.status(500).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
};

module.exports = {
  loginUser,
};
