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

export const songServices = {
    createSong: async (content, playload) => {
        try {
            const response = await API.post('/song/save', playload,{
                headers: {
                    Authorization: `Bearer ${content}`
                }
            });
            if (response) {
                console.log(response.data);
                return response.data;
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            return {error: error}
        }
    },
    addSongToPlaylist: async (content, id,song) =>{
        //let payload = code_song;
        console.log(id);
        console.log(song);
        try {
            const response = await API.post(`/playlist_song/playlist/${id}`, song,{
                headers: {
                    Authorization: `Bearer ${content}`
                }
            });
            if (response) {
                console.log(response.data);
                return response.data;
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
            return {error: error}
        }
    }
}