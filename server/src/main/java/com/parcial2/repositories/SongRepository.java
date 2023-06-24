package com.parcial2.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parcial2.models.dtos.SaveSongDTO;
import com.parcial2.models.entities.Song;

public interface SongRepository extends JpaRepository<Song, UUID> {
	Song save(SaveSongDTO info);
}
