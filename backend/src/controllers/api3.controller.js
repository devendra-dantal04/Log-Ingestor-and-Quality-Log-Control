const LogIngestor = require("../utils/logIngestor");

const logger = new LogIngestor();
const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

const getCurrentBitcoinPrice = async (req, res) => {
  const requestData = {
    method: req.method,
    url: req.url,
  };

  try {
    logger.info("api3", "Request to fetch current Bitcoin price", requestData);

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch current Bitcoin price.`;
      logger.error("api3", errorMessage, requestData);
      return res.status(500).json({
        message: errorMessage,
      });
    }

    const bitcoinPriceData = await response.json();
    const bitcoinPrice = bitcoinPriceData.bpi.USD.rate;
    logger.success(
      "api3",
      "Current Bitcoin price fetched successfully",
      requestData
    );
    res.status(200).json({
      bitcoinPrice,
    });
  } catch (error) {
    logger.error(
      "api3",
      "Error in fetching current Bitcoin price",
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
  getCurrentBitcoinPrice,
};
