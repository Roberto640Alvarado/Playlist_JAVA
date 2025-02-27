import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const SongxPlaylistServices = {
  findAllSongByPlaylist: async (token, id) => {
    try {
      const response = await API.get(`/playlist_song/playlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
      return {
        hasError: true,
      };
    }
  },

  fetchAllSongs: async (token, page = 0, size = 5, title = '') => {
    try {
      const response = await API.get('/song/song', {
        params: { page, size, title },
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }); 

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
      return {
        hasError: true,
      };
    }
  },
};

export default SongxPlaylistServices;