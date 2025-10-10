const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_API_URL;

export async function handler(event, context) {
  try {
    const res = await fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      }
    });
  
    if (!res.ok) 
      throw new Error("Failed to fetch movies!")
  
    const payload = await res.json();
  
    if (payload.success === false) 
      throw new Error("Failed to fetch movies!")
    
    return {
      statusCode: 200,
      body: JSON.stringify(payload),
    };
  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ message: error.message || "Unknown error occurred" })
    };
  }
}