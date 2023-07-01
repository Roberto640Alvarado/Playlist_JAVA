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

const songServices = {
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
    addSongToPlaylist: async (token, id, song) => {
        try {
          const response = await API.post(`/playlist_song/playlist/${id}`, song, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 201) {
            return response.data; // Devuelve solo el cuerpo de la respuesta
          } else {
            throw new Error(response.status);
          }
        } catch (error) {
          console.log(error);
          return { error: error };
        }
      }
      
}

export default songServices;