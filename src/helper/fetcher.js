import axios from "axios";

// Define a custom fetcher function using Axios that accepts a token
const fetcher = async (url, token = undefined) => {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined // Include the token in the Authorization header
            }
        });

        // If the response status is 401, throw an error
        if (response.status === 401) {
            throw new Error("Unauthorized");
        }

        // Otherwise, return the response data
        const data = await response?.data?.data;
        return data
    } catch (error) {
        // If there's an error, throw it
        throw error;
    }
};

export default fetcher