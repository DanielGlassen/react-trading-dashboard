import axios from 'axios';
import NodeCache from 'node-cache';

const tokenCache = new NodeCache({ stdTTL: 3500 }); // Token TTL set slightly less than 3600 seconds

const CLIENT_ID = process.env.CLIENT_ID;
console.log("🚀 ~ CLIENT_ID:", CLIENT_ID)
const CLIENT_SECRET = process.env.CLIENT_SECRET;
console.log("🚀 ~ CLIENT_SECRET:", CLIENT_SECRET)
const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT;
console.log("🚀 ~ TOKEN_ENDPOINT:", TOKEN_ENDPOINT)

// Interface for Token Response
interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// Function to get the access token
export const getAccessToken = async (): Promise<string> => {
  // Check if token is in cache
  const cachedToken = tokenCache.get<string>('access_token');
  if (cachedToken) {
    return cachedToken;
  }

  // If not cached, fetch a new token
  try {
    const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    const response = await axios.post<TokenResponse>(
      TOKEN_ENDPOINT as string,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${encodedCredentials}`,
        },
      }
    );

    const { access_token, expires_in } = response.data;

    // Cache the token with TTL slightly less than actual expiry to account for delays
    tokenCache.set('access_token', access_token, expires_in - 100);

    return access_token;
  } catch (error: any) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Failed to fetch access token');
  }
};
