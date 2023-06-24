package com.parcial2.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parcial2.models.dtos.SavePlaylistXSongDTO;
import com.parcial2.models.entities.PlaylistXSong;

public interface PlaylistXSongRepository extends JpaRepository<PlaylistXSong, UUID>{
	PlaylistXSong save(SavePlaylistXSongDTO info);
}
