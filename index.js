require('dotenv').config();
const { GoogleAdsApi } = require('google-ads-api');
const OpenAI = require('openai'); // Changed this line
const winston = require('winston');


// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        // Add file transport for production logs
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Instantiate the GoogleAdsApi object
const googleAdsClient = new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    developer_token: process.env.DEVELOPER_TOKEN,
});

// Configure OpenAI API
const openai = new OpenAI(process.env.OPENAI_API_KEY); // Changed this line


// Function to retrieve data from Google Ads
async function getGoogleAdsData() {
    const customer = googleAdsClient.Customer({
        customer_id: process.env.CUSTOMER_ID,
        refresh_token: process.env.REFRESH_TOKEN,
    });

    try {
        const campaigns = await customer.query(`
      SELECT campaign.id, campaign.name, metrics.impressions, metrics.clicks
      FROM campaign
      WHERE campaign.status = 'ENABLED'
      DURING LAST_30_DAYS
    `);

        return campaigns;
    } catch (error) {
        logger.error('Failed to retrieve Google Ads data', { error });
        throw error;
    }
}

// Function to send data to GPT-4 and get suggestions
async function getGPTSuggestions(data) {
    const prompt = `Here is the campaign data: ${JSON.stringify(data)}. Provide suggestions for optimization.`;

    try {
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-004",
            prompt: prompt,
            max_tokens: 150,
        });

        return gptResponse.data.choices[0].text.trim();
    } catch (error) {
        logger.error('Failed to retrieve suggestions from GPT-4', { error });
        throw error;
    }
}

// Main execution function
async function main() {
    try {
        const data = await getGoogleAdsData();
        const suggestions = await getGPTSuggestions(data);
        logger.info('Suggestions from GPT-4', { suggestions });
    } catch (error) {
        logger.error('An error occurred in the main function', { error });
    }
}

main();

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown', { error });
    process.exit(1); // Ideally, you should attempt a graceful shutdown
});

process.on('unhandledRejection', (error, promise) => {
    logger.error('Unhandled rejection at Promise', { promise, error });
});
