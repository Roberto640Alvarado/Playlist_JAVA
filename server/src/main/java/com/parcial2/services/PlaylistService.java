package com.parcial2.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.parcial2.models.dtos.SavePlaylistDTO;
import com.parcial2.models.entities.Playlist;
import com.parcial2.models.entities.User;

public interface PlaylistService {
    void save(SavePlaylistDTO info, User user) throws Exception;
    void deleteById(String id) throws Exception;
    Playlist findOneById(UUID id);
    public Page<Playlist> findAll(int page, int size);
    void updatePlaylist(UUID playlistCode, String newTitle, String newDescription) throws Exception;
    Playlist findOneTitle(String title);
}

