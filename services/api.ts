// services/api.ts
import axios from 'axios';
import Price from '../models/price';

// Define the symbols you want to track
const symbols = ['GOOG', 'BTC']; // Add your symbols here

// Function to fetch price data from an external API
const fetchPriceData = async (symbol: string) => {
  try {
    // Replace with the actual API endpoint and key
    const response = await axios.get(`API_ENDPOINT_FOR_${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
};

// Function to save price data to the database
const savePriceData = async (symbol: string, priceData: any) => {
  try {
    const newPrice = new Price({
      symbol,
      price: priceData.price, // Adjust according to the actual API response
    });
    await newPrice.save();
  } catch (error) {
    console.error(`Error saving data for ${symbol}:`, error);
    throw error;
  }
};

// Function to fetch and save data for all symbols
const fetchAndSaveAllPrices = async () => {
  for (const symbol of symbols) {
    try {
      const priceData = await fetchPriceData(symbol);
      await savePriceData(symbol, priceData);
    } catch (error) {
      console.error(`Error processing data for ${symbol}:`, error);
    }
  }
};

// Schedule the fetchAndSaveAllPrices function to run every few seconds
setInterval(fetchAndSaveAllPrices, 5000);

export { fetchPriceData, savePriceData, fetchAndSaveAllPrices };
