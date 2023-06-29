import axios from "axios";

const BASE_URL = "http://localhost:8080";

const API = axios.create(
    {
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        }
    }
);

export const registerService = {
    register: async(username, email, password) => {
        let payload = { username: username, email: email, password: password };
        try {
            let response = await API.post('/auth/signup', payload);
            console.log(response.data.message);
            //console.log(response.data);
            //console.log(response.status);
            if (response.status === 201) {
                return response;
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            return {error: error}
        }
    }
}