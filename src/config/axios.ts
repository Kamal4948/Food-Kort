import axios from "axios";
const BASE_URL ="https://staging.fastor.ai/v1/";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 20000, // 20 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});
