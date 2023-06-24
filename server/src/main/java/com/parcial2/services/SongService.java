package com.parcial2.services;

import java.util.UUID;

import org.springframework.data.domain.Page;

import com.parcial2.models.dtos.SaveSongDTO;
import com.parcial2.models.entities.Song;

public interface SongService {
	void save(String title, String duration) throws Exception;
	void deleteById(String id) throws Exception;
	Song findOneById(UUID id); //Cuando queremos encontrar uno por id el tipo de función debe de ser del mismo tipo de lo que queremos buscar
	public Page<Song> findAll(int page, int size);
	void update(UUID id, SaveSongDTO updatedSong) throws Exception;
}
