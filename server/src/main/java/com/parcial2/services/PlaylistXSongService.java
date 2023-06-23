package com.parcial2.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import com.parcial2.models.dtos.SavePlaylistXSongDTO;
import com.parcial2.models.entities.PlaylistXSong;

public interface PlaylistXSongService {
	void save( SavePlaylistXSongDTO info) throws Exception;
	List<PlaylistXSong> findAll();
	PlaylistXSong findOneById(UUID id);
	void delete(String insertion_code) throws Exception;
	
}
