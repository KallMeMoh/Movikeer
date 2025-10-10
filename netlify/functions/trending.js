import { getTrendingMovies } from "../../utils/appwrite";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_API_URL;

export async function handler(event, context) {
  try {
    const trendingMovies = await getTrendingMovies();    

    return {
      statusCode: 200,
      body: JSON.stringify(trendingMovies),
    };
  } catch (_) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ message: "Unknown error occurred" })
    };
  }
}