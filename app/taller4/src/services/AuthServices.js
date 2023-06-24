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

const authService = {
    login: async (identifier, password)=>{
        let payload = { identifier: identifier, password: password };
        try {

            let response = await API.post('/auth/login', payload);

            if (response.statusText === "OK") {
                return response.data;
            } else {
                throw new Error(response.statusText);
            }

        } catch (error) {
            return {
                hasError: true,
            };
        }
    },
    verifyToken: async (token) => {
        try {
            let response = await API.get('/auth/whoami', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.statusText === "OK") {
                return response.data;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return {
                hasError: true,
            };
        }
    }
}